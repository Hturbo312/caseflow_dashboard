import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import { embeddingBuffer } from "../server/embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const CASE_DIR = path.join(DATA_DIR, "cases", "C20-pristina-child-friendly-ai");
const read = (p: string) => JSON.parse(fs.readFileSync(path.join(CASE_DIR, p), "utf8"));

const db = new Database(DB_PATH);
sqliteVec.load(db);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = OFF");

const entities = read("entities.json").entities as any[];
const materials = read("materials.json").materials as any[];
const evidence = read("evidence.json").evidence as any[];
const processes = read("process.json").processes as any[];
const facts = read("facts.json").facts as any[];
const relationsAll = read("relations.json").relations as any[];
const frozenIds = new Set(read("relations.json").frozen_relation_ids as string[]);
const relations = relationsAll.filter((r) => frozenIds.has(r.relation_id));
const nativeConcepts = read("l2_native_concepts.json").native_concepts as any[];
const mappings = read("l2_concept_mapping_v1.0.json").mappings as any[];
const sharedLayer = read("l2_shared_concepts_v1.0.json");

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = path.join(DATA_DIR, "_backup", `community-renewal.db.before-c20-${stamp}.db`);
fs.mkdirSync(path.dirname(backup), { recursive: true });
db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
console.log("backup:", backup);

const norm = (s: string) => String(s ?? "").replace(/\s+/g, "").replace(/[（）()]/g, "");
const json = (v: any) => JSON.stringify(v ?? []);

const entityIdMap = new Map<string, string>();
const entityByLabel = new Map<string, string>();
const counters: Record<string, number> = {};
for (const e of entities) {
  const t = e.candidate_type as string;
  counters[t] = (counters[t] ?? 0) + 1;
  const id = `C20-${t}-${String(counters[t]).padStart(3, "0")}`;
  entityIdMap.set(e.entity_id, id);
  for (const key of [e.label, ...(e.aliases ?? [])]) entityByLabel.set(norm(key), id);
}

const actorOverrides: Record<string, string> = {
  "普里什蒂纳儿童（含10–17岁参与者）": "E011",
  "50+名11–17岁儿童": "E011",
  "专业设计师（儿童中心设计与城市规划）": "E012",
  "评估者Ilir Hoxha": "E039",
  "Assembly of Children / Children Councils": "E010"
};

const entityIdForLabel = (label: string): string | undefined => {
  if (actorOverrides[label]) return entityIdMap.get(actorOverrides[label]);
  return entityByLabel.get(norm(label));
};

const evMap = (id: string) => `C20-${id}`;
const relMap = (id: string) => `C20-${id}`;
const factMap = (id: string) => `C20-${id}`;

const KIND_MAP: Record<string, string> = {
  project_story: "项目故事",
  project_story_duplicate: "项目通稿",
  evaluation_report: "评估报告",
  procurement_notice: "采购公告",
  project_page: "项目页",
  institutional_retrospective: "机构回顾",
  institutional_blog: "机构博客",
  vendor_case_page: "供应商案例",
  partner_case_page: "合作机构案例",
  social_media_post: "社交媒体",
  programme_page: "项目页"
};

const CASE_SUMMARY =
  "普里什蒂纳儿童友好公共空间人工智能共创是 UNDP Kosovo 的 CEF 与 Healthier Kosovo 2 于 2023 年联合发起的参与式设计试点：10–17 岁儿童经 Children Councils 参与选址、愿景与方案评估，使用 UrbanistAI 辅助空间想法生成/可视化；最终形成 3 份方案，UNDP 启动其中 2 份实施，2023-09-27 发布 RFQ。评估报告称市政许可已取得、2 个批准设计/3 个地点、1 个公园完成更新，但两份设计是否全部建成仍未确认。";
const CASE_TAGS = ["儿童友好", "公共空间", "AI辅助设计", "科索沃"];

const packetFiles = [
  "review/RP-C20-G0-v0.1.json",
  "review/RP-C20-G1-v0.1.json",
  "review/RP-C20-G2-v0.1.json",
  "review/RP-C20-G3-v0.1.json",
  "review/RP-C20-G4-v0.1.json",
  "review/RP-C20-G5-v0.1.json",
  "review/RP-C20-G6-v0.1.json",
  "review/RP-C20-L2-G1-v0.1.json",
  "review/RP-C20-L2-G2-v0.1.json",
  "review/RP-C20-L2-G3-v0.1.json",
  "review/RP-C20-L2-G4-v0.1.json"
];

const tx = db.transaction(() => {
  db.prepare("DELETE FROM relation_evidence_links WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM relation_process_links WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM relations WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM facts WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM processes WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM evidence WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM materials WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM native_concepts WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM concept_mappings WHERE id LIKE 'MAP-C20-%'").run();
  db.prepare("DELETE FROM shared_concepts WHERE id LIKE 'SC-C20-%'").run();
  db.prepare("DELETE FROM entity_roles WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM case_entities WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM entities WHERE id LIKE 'C20-%'").run();
  db.prepare("DELETE FROM cases WHERE id = 'C20'").run();
  db.prepare("DELETE FROM vec_search WHERE rowid IN (SELECT rowid FROM search_docs WHERE case_id = 'C20')").run();
  db.prepare("DELETE FROM search_docs WHERE case_id = 'C20'").run();
  db.prepare("DELETE FROM review_decisions WHERE packet_id LIKE 'RP-C20-%'").run();
  db.prepare("DELETE FROM review_packets WHERE id LIKE 'RP-C20-%'").run();

  db.prepare(`INSERT INTO cases
    (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild, event_start, event_end, scope, evidence_cutoff, research_question, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run("C20", "C20", 20, "普里什蒂纳儿童友好公共空间人工智能共创",
      "Co-designing Child-Friendly Public Spaces with Children Using AI in Prishtinë/Priština",
      "科索沃", "普里什蒂纳", "2023—2026", "2023 年共创；2023-09—2026-11 实施观察",
      "#5f7f6a", "network", json(CASE_TAGS), CASE_SUMMARY,
      json(processes.map((p) => p.narrative)),
      "2023", "2026-11-13",
      "普里什蒂纳市域三个地点（主邮局附近、City Park、Park of Taukbahce）；2023 年共创，2023-09 以后实施观察；排除 Blloku 1、Kosovo Architecture Festival、HK1 与其他 CEF 城市",
      "2026-11-13",
      "AI 如何进入儿童共创流程？儿童的安全、隐私与绿色社交需求如何转译为设计？UNDP、市政府、NGO、供应商与 Children Councils 的分工如何形成？两份方案从启动实施到落地经历了哪些阶段？",
      "frozen");

  const insEntity = db.prepare(`INSERT INTO entities (id, name, name_en, type, description, definition, role_types) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insRole = db.prepare(`INSERT OR REPLACE INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`);
  const insCaseEntity = db.prepare(`INSERT OR REPLACE INTO case_entities (case_id, entity_id) VALUES (?, ?)`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    insEntity.run(id, e.label, e.label, e.candidate_type, e.definition, e.definition, json(e.roles));
    for (const r of e.roles) insRole.run("C20", id, r);
    insCaseEntity.run("C20", id);
  }

  const insMat = db.prepare(`INSERT INTO materials
    (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of materials) {
    insMat.run(`C20-${m.material_id}`, "C20", m.name, KIND_MAP[m.source_type] ?? m.source_type,
      m.author_or_org, m.date, "C20 案例知识包", String(m.scope ?? "").slice(0, 500),
      m.source_type, m.verification_status, m.scope, m.link, m.reliability, m.notes);
  }

  const entityIdsByEvidence = new Map<string, Set<string>>();
  const statusByEvidence = new Map<string, Map<string, number>>();
  const addEvEnt = (eid: string, dbid: string | undefined) => {
    if (!dbid) return;
    if (!entityIdsByEvidence.has(eid)) entityIdsByEvidence.set(eid, new Set());
    entityIdsByEvidence.get(eid)!.add(dbid);
  };
  for (const f of facts) {
    for (const r of f.entity_roles) {
      const [eid] = r.split(":");
      const dbid = entityIdMap.get(eid);
      for (const ev of f.evidence_ids) addEvEnt(ev, dbid);
    }
    for (const ev of f.evidence_ids) {
      if (!statusByEvidence.has(ev)) statusByEvidence.set(ev, new Map());
      const m = statusByEvidence.get(ev)!;
      m.set(f.fact_status, (m.get(f.fact_status) ?? 0) + 1);
    }
  }
  for (const r of relations) {
    for (const ev of r.evidence_ids) {
      addEvEnt(ev, entityIdForLabel(r.head_entity));
      addEvEnt(ev, entityIdForLabel(r.tail_entity));
    }
  }

  const processIdsByEvidence = new Map<string, Set<string>>();
  const factIdsByEvidence = new Map<string, Set<string>>();
  for (const p of processes) for (const ev of p.evidence_ids) {
    if (!processIdsByEvidence.has(ev)) processIdsByEvidence.set(ev, new Set());
    processIdsByEvidence.get(ev)!.add(p.process_id);
  }
  for (const f of facts) for (const ev of f.evidence_ids) {
    if (!factIdsByEvidence.has(ev)) factIdsByEvidence.set(ev, new Set());
    factIdsByEvidence.get(ev)!.add(f.fact_id);
  }

  const matById = new Map(materials.map((m) => [m.material_id, m]));
  const insEv = db.prepare(`INSERT INTO evidence
    (id, case_id, claim, quote, source, locator, strength, entity_ids, context, fact_status, verification_status, process_ids, fact_ids, material_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const e of evidence) {
    const mat = matById.get(e.material_id);
    const st = statusByEvidence.get(e.evidence_id);
    let status: string | null = null;
    if (st && st.size) status = [...st.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const vs = String(e.verification_status ?? "");
    const strength = vs.includes("vendor") || vs.includes("institutional") || vs.includes("duplicate")
      ? "medium"
      : vs.includes("proxy") ? "medium" : "high";
    insEv.run(evMap(e.evidence_id), "C20", e.statement, e.quote_or_span, mat?.name ?? "C20 材料",
      e.locator, strength, json([...(entityIdsByEvidence.get(e.evidence_id) ?? [])]),
      `C20；${e.material_id}；${e.locator}`, status, e.verification_status,
      json([...(processIdsByEvidence.get(e.evidence_id) ?? [])]),
      json([...(factIdsByEvidence.get(e.evidence_id) ?? [])].map(factMap)),
      `C20-${e.material_id}`);
  }

  const insProc = db.prepare(`INSERT INTO processes (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of processes) {
    const actorIds = [...new Set((p.actor_labels ?? []).map((label: string) => entityIdForLabel(label)).filter(Boolean))];
    insProc.run(p.process_id, "C20", p.title, p.time_range, p.narrative, json(actorIds),
      json(p.event_ids), json(p.evidence_ids.map(evMap)), "frozen", 1);
  }

  const insFact = db.prepare(`INSERT INTO facts (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of facts) {
    const roles = f.entity_roles.map((r: string) => {
      const [eid, role] = r.split(":");
      return `${entityIdMap.get(eid)}:${role}`;
    });
    insFact.run(factMap(f.fact_id), "C20", f.statement, json(roles), json(f.evidence_ids.map(evMap)),
      f.fact_status, f.time_scope, f.space_scope, f.quantity_scope, f.confidence,
      "G4 researcher_confirmed; C20 Pristina child-friendly AI co-design");
  }

  const insRel = db.prepare(`INSERT INTO relations
    (id, case_id, source, target, type, label, weight, fact_status, qualifiers, process_ids, evidence_ids, head_role, tail_role, review, version, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insRPL = db.prepare(`INSERT OR REPLACE INTO relation_process_links (relation_id, case_id, process_id, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insREL = db.prepare(`INSERT OR REPLACE INTO relation_evidence_links (relation_id, case_id, evidence_id) VALUES (?, ?, ?)`);
  for (const r of relations) {
    const id = relMap(r.relation_id);
    const evids = r.evidence_ids.map(evMap);
    const fids = r.fact_ids.map(factMap);
    insRel.run(id, "C20", entityIdForLabel(r.head_entity), entityIdForLabel(r.tail_entity),
      r.predicate, r.predicate, 1.6, r.fact_status, json(r.qualifiers),
      json(r.process_ids), json(evids), r.head_type, r.tail_type,
      "G6 researcher_confirmed; C20 Pristina child-friendly AI co-design",
      "L2-C20-v1.0", fids[0] ?? null, json(evids), json([]), "verified_full_text");
    for (const pid of r.process_ids) insRPL.run(id, "C20", pid, fids[0] ?? null, json(evids), json([]), "verified_full_text");
    for (const ev of evids) insREL.run(id, "C20", ev);
  }

  const insNC = db.prepare(`INSERT INTO native_concepts (id, case_id, label, entity_type, definition, examples, source_relation_ids, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of nativeConcepts) {
    insNC.run(c.native_concept_id, "C20", c.label, c.entity_type, c.definition,
      json(c.examples), json(c.source_relation_ids.map(relMap)),
      c.native_concept_id === "NC-C20-005" ? "researcher_confirmed_no_map" : "researcher_confirmed");
  }

  const insSC = db.prepare(`INSERT INTO shared_concepts (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of sharedLayer.new_candidates) {
    insSC.run(c.id, c.label, c.definition, c.entity_type, c.scope,
      json(c.supporting_case_ids), json(c.supporting_native_ids), json(c.negative_examples),
      "L2-C20-v1.0", "candidate_single_case");
  }

  const updSC = db.prepare(`UPDATE shared_concepts SET supporting_case_ids = ?, supporting_native_ids = ?, version = ?, review = ? WHERE id = ?`);
  const updateSupport = (sharedId: string, addCases: string[], addNatives: string[], review: string) => {
    const row = db.prepare("SELECT supporting_case_ids, supporting_native_ids FROM shared_concepts WHERE id = ?").get(sharedId) as any;
    if (!row) throw new Error(`missing shared concept: ${sharedId}`);
    const oldCases: string[] = JSON.parse(row.supporting_case_ids || "[]").filter((x: string) => !addCases.includes(x));
    const oldNatives: string[] = JSON.parse(row.supporting_native_ids || "[]").filter((x: string) => !addNatives.includes(x));
    updSC.run(json([...new Set([...oldCases, ...addCases])]), json([...new Set([...oldNatives, ...addNatives])]), "L2-C20-v1.0", review, sharedId);
  };
  for (const p of sharedLayer.promoted) {
    updateSupport(p.id, p.supporting_case_ids, p.supporting_native_ids, "researcher_confirmed");
  }
  for (const s of sharedLayer.support_additions) {
    updateSupport(s.shared_concept_id, ["C20"], s.add_native_ids, "researcher_confirmed");
  }

  const insMap = db.prepare(`INSERT INTO concept_mappings (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope, evidence_ids, decision, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of mappings) {
    const evids = (m.evidence_ids as string[]).map(evMap);
    insMap.run(m.mapping_id, "C20", m.native_concept_id, m.shared_concept_id ?? null, m.mapping_type,
      m.basis, m.scope, json(evids), m.decision, "L2-C20-v1.0");
  }

  const insPacket = db.prepare(`INSERT INTO review_packets (id, skill, gate, case_id, scope, payload, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const insDecision = db.prepare(`INSERT INTO review_decisions (id, packet_id, action, rationale, modified_content, allow_next_gate, decided_at) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  for (const rel of packetFiles) {
    const full = path.join(CASE_DIR, rel);
    if (!fs.existsSync(full)) continue;
    const p = JSON.parse(fs.readFileSync(full, "utf8"));
    const status = p.status ?? "accepted";
    insPacket.run(p.packet_id, p.skill ?? "case-knowledge-construction", p.gate, "C20",
      p.scope ?? "", JSON.stringify(p), status, p.generated_at ?? new Date().toISOString());
    const d = p.decision ?? {};
    const action = d.action ?? "accept";
    const allow = d.allow_next_gate ?? d.allow_freeze ?? (status.startsWith("accepted") ? 1 : 0);
    insDecision.run(`RD-${p.packet_id}`, p.packet_id, action,
      d.rationale ?? "研究者确认", d.modified_content == null ? null : JSON.stringify(d.modified_content),
      allow ? 1 : 0, d.decided_at ?? p.generated_at ?? new Date().toISOString());
  }

  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset', 'caseflow-c01-c20')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_note', 'C01–C19 + C20 普里什蒂纳儿童友好公共空间 AI 共创（G0–G6 与 L2 已完成）')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_imported_at', ?)").run(new Date().toISOString());
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c20_import_version', 'L2-C20-v1.0')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c20_open_relation', 'R038')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c20_media_manifest', 'shared/case-media.ts#C20')").run();

  const insDoc = db.prepare(`INSERT INTO search_docs (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const addDoc = (kind: string, refId: string, caseId: string | null, entityId: string | null, title: string, subtitle: string, body: string) => {
    const info = db.prepare("INSERT INTO vec_search (embedding) VALUES (?)").run(embeddingBuffer(`${title} ${subtitle} ${body}`));
    insDoc.run(Number(info.lastInsertRowid), kind, refId, caseId, entityId, title, subtitle, body);
  };
  addDoc("case", "C20", "C20", null, "普里什蒂纳儿童友好公共空间人工智能共创",
    "案例 · 科索沃 · 2023—2026", `${CASE_SUMMARY} ${CASE_TAGS.join("，")} ${processes.map((p) => p.narrative).join(" ")}`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    addDoc("entity", id, "C20", id, e.label, `实体 · ${e.candidate_type}`, `${e.label} ${e.definition} ${(e.aliases ?? []).join(" ")}`);
  }
  for (const e of evidence) {
    const mat = matById.get(e.material_id);
    addDoc("evidence", evMap(e.evidence_id), "C20", null, `${mat?.name ?? "C20"} · ${e.evidence_id}`,
      `证据 · ${e.verification_status}`, `${e.statement} ${e.quote_or_span} ${e.locator}`);
  }
  for (const m of materials) {
    addDoc("material", `C20-${m.material_id}`, "C20", null, m.name,
      `材料 · ${KIND_MAP[m.source_type] ?? m.source_type} · ${m.date}`, `${m.scope} ${m.link} ${m.notes}`);
  }
});

tx();
db.pragma("wal_checkpoint(TRUNCATE)");
console.log("C20 import committed");
db.close();
