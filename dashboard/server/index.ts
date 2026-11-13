import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import express from "express";
import { isReviewAction } from "../shared/ontology";
import {
  createReviewDecision,
  getBootstrap,
  getCaseDetail,
  getComparisonRecords,
  getEntityDetail,
  getMeta,
  getReviewDecisions,
  getReviewPackets,
  ReviewWriteError,
  searchAtlas
} from "./db";

const app = express();
const port = Number(process.env.PORT ?? 8788);
const distDir = path.resolve(process.cwd(), "dist");
const allowedOrigins = new Set([
  `http://127.0.0.1:${port}`,
  `http://localhost:${port}`,
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  ...(process.env.CASEFLOW_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
]);

app.disable("x-powered-by");
app.use(express.json({ limit: "64kb" }));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.has(origin)) {
    res.status(403).json({ error: "Origin not allowed" });
    return;
  }
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ...getMeta() });
});

app.get("/favicon.ico", (_req, res) => {
  res.status(204).end();
});

app.get("/api/bootstrap", (_req, res) => {
  res.json(getBootstrap());
});

app.get("/api/cases/:id", (req, res) => {
  const detail = getCaseDetail(req.params.id);
  if (!detail) {
    res.status(404).json({ error: "Case not found" });
    return;
  }
  res.json(detail);
});

app.get("/api/comparisons", (_req, res) => {
  res.json(getComparisonRecords());
});

app.get("/api/review-packets", (_req, res) => {
  res.json(getReviewPackets());
});

app.get("/api/review-decisions", (_req, res) => {
  res.json(getReviewDecisions());
});

app.post("/api/review-decisions", (req, res, next) => {
  try {
    const body = req.body as Record<string, unknown>;
    const packetId =
      typeof body.packetId === "string" ? body.packetId.trim() : "";
    const action = typeof body.action === "string" ? body.action.trim() : "";
    const id =
      typeof body.id === "string" && body.id.trim()
        ? body.id.trim()
        : `RD-${randomUUID()}`;
    const rationale =
      typeof body.rationale === "string" ? body.rationale.trim() : undefined;
    const modifiedContent =
      typeof body.modifiedContent === "string"
        ? body.modifiedContent
        : body.modifiedContent === undefined
          ? undefined
          : JSON.stringify(body.modifiedContent);

    if (!packetId || packetId.length > 200) {
      res.status(400).json({ error: "packetId is required" });
      return;
    }
    if (!isReviewAction(action)) {
      res.status(400).json({ error: "Unsupported review action" });
      return;
    }
    if (rationale && rationale.length > 4000) {
      res.status(400).json({ error: "rationale is too long" });
      return;
    }
    if (modifiedContent && modifiedContent.length > 50000) {
      res.status(400).json({ error: "modifiedContent is too large" });
      return;
    }
    if (!/^[A-Za-z0-9._:-]{1,200}$/.test(id)) {
      res.status(400).json({ error: "Invalid review decision id" });
      return;
    }

    const decision = createReviewDecision({
      id,
      packetId,
      action,
      rationale,
      modifiedContent,
      allowNextGate: body.allowNextGate === true
    });
    res.status(201).json(decision);
  } catch (error) {
    if (error instanceof ReviewWriteError) {
      const status =
        error.code === "packet_not_found"
          ? 404
          : error.code === "duplicate_id"
            ? 409
            : 400;
      res.status(status).json({ error: error.message, code: error.code });
      return;
    }
    next(error);
  }
});

app.get("/api/entities/:id", (req, res) => {
  const detail = getEntityDetail(req.params.id);
  if (!detail) {
    res.status(404).json({ error: "Entity not found" });
    return;
  }
  res.json(detail);
});

app.get("/api/search", (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "";
  res.json(searchAtlas(query));
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (
      req.method !== "GET" ||
      req.path.startsWith("/api/") ||
      !req.accepts("html")
    ) {
      next();
      return;
    }
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : 500;
    if (status >= 500) {
      console.error("[atlas] request failed", error);
    }
    res.status(status).json({
      error: status === 404 ? "Not found" : "Internal server error"
    });
  }
);

app.listen(port, "127.0.0.1", () => {
  console.log(`[atlas] API listening on http://127.0.0.1:${port}`);
  if (fs.existsSync(distDir)) {
    console.log(`[atlas] serving build from ${distDir}`);
  } else {
    console.log("[atlas] dev UI is served by Vite on http://127.0.0.1:5173");
  }
});
