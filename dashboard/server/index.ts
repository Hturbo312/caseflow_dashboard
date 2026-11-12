import fs from "node:fs";
import path from "node:path";
import express from "express";
import {
  getBootstrap,
  getCaseDetail,
  getComparisonRecords,
  getEntityDetail,
  getMeta,
  searchAtlas
} from "./db";

const app = express();
const port = Number(process.env.PORT ?? 8788);
const distDir = path.resolve(process.cwd(), "dist");

app.disable("x-powered-by");
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
