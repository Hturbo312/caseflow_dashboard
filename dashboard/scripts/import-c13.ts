import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import { embeddingBuffer } from "../server/embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const CASE_DIR = path.join(DATA_DIR, "cases", "C13-detroit-mcm");
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
const relations = read("relations.json").relations as any[];
const nativeConcepts = read("l2_native_concepts.json").concepts as any[];
const sharedConcepts = read("l2_shared_concepts_v1.0.json").sharedConcepts as any[];
const mappings = read("l2_concept_mapping.json").mappings as any[];

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = path.join(DATA_DIR, "_backup", `community-renewal.db.before-c13-${stamp}.db`);
fs.mkdirSync(path.dirname(backup), { recursive: true });
db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
console.log("backup:", backup);

const entityIdMap = new Map<string, string>();
const counters: Record<string, number> = {};
for (const e of entities) {
  const t = e.type as string;
  counters[t] = (counters[t] ?? 0) + 1;
  entityIdMap.set(e.id, `C13-${t}-${String(counters[t]).padStart(3, "0")}`);
}

const evMap = (id: string) => `C13-${id}`;
const relMap = (id: string) => `C13-${id}`;
const factMap = (id: string) => `C13-${id}`;
const matMap = (id: string) => `C13-${id}`;
const json = (v: any) => JSON.stringify(v ?? []);

const KIND_MAP: Record<string, string> = {
  task_force_report: "任务组报告",
  project_website_archive: "项目官网存档",
  project_blog: "项目博客",
  training_material: "培训材料",
  partner_retrospective: "合作机构回顾",
  independent_media: "独立媒体",
  dataset_metadata: "数据集元数据",
  data_product: "数据产品",
  project_platform: "项目平台"
};

const CASE_SUMMARY =
  "底特律 Motor City Mapping 是 2013–2014 年由 DBRTF、D3 与 Loveland 合作完成的全市地块普查：150 名居民调查员用 Blexting 采集 37.8 万个地块，形成 84,641 个需干预地块口径，并通过 MCI/SATT、公开平台与社区复核把数据转成拆除优先级。";
const CASE_TAGS = ["城市地块普查", "破败数据", "开放数据", "美国"];
const RESEARCH_QUESTION =
  "全市地块普查如何被组织成可用的诊断基础设施？Blexting 与平台能力在普查、公开查询、社区复核与拆除决策中被实际使用到什么程度？破败定义与分级如何影响干预排序？开放数据与社区复核形成了什么关系？技术影响在 2015 年后是沉淀还是衰减？";

const tx = db.transaction(() => {
  db.prepare("DELETE FROM relation_evidence_links WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM relation_process_links WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM relations WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM facts WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM processes WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM evidence WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM materials WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM native_concepts WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM concept_mappings WHERE id LIKE 'MAP-C13-%'").run();
  db.prepare("DELETE FROM shared_concepts WHERE id LIKE 'SC-C13-%'").run();
  db.prepare("DELETE FROM entity_roles WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM case_entities WHERE case_id = 'C13'").run();
  db.prepare("DELETE FROM entities WHERE id LIKE 'C13-%'").run();
  db.prepare("DELETE FROM cases WHERE id = 'C13'").run();
  db.prepare("DELETE FROM vec_search WHERE rowid IN (SELECT rowid FROM search_docs WHERE case_id = 'C13')").run();
  db.prepare("DELETE FROM search_docs WHERE case_id = 'C13'").run();

  db.prepare(`INSERT INTO cases
    (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild, event_start, event_end, scope, evidence_cutoff, research_question, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run("C13", "C13", 13, "Motor City Mapping", "Motor City Mapping", "美国", "底特律", "2013—2015", "2013—2015年",
      "#a35d3a", "lattice", json(CASE_TAGS), CASE_SUMMARY, json(processes.map((p) => p.narrative)),
      "2013-09", "2015-12",
      "底特律市域 139 平方英里、380,233 个地块；Highland Park/Hamtramck 为方法扩散",
      "2026-11-13", RESEARCH_QUESTION, "frozen");

  const insEntity = db.prepare(`INSERT INTO entities (id, name, name_en, type, description, definition, role_types) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insRole = db.prepare(`INSERT OR REPLACE INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`);
  const insCaseEntity = db.prepare(`INSERT OR REPLACE INTO case_entities (case_id, entity_id) VALUES (?, ?)`);
  for (const e of entities) {
    const id = entityIdMap.get(e.id)!;
    insEntity.run(id, e.label, e.labelEn ?? e.label, e.type, e.definition, e.definition, json(e.roles));
    for (const r of e.roles) insRole.run("C13", id, r);
    insCaseEntity.run("C13", id);
  }

  const insMat = db.prepare(`INSERT INTO materials
    (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of materials) {
    insMat.run(matMap(m.materialId), "C13", m.name, KIND_MAP[m.sourceType] ?? m.sourceType, m.authorOrOrg, m.date,
      "C13 案例知识包", (m.scope ?? "").slice(0, 500), m.sourceType, m.verificationStatus, m.scope, m.link, m.reliability, m.notes);
  }

  const entityIdsByEvidence = new Map<string, Set<string>>();
  const statusByEvidence = new Map<string, Map<string, number>>();
  const addEvEnt = (ev: string, eid: string) => {
    if (!entityIdsByEvidence.has(ev)) entityIdsByEvidence.set(ev, new Set());
    entityIdsByEvidence.get(ev)!.add(eid);
  };
  for (const f of facts) {
    for (const r of f.entityRoles) {
      const [eid] = r.split(":");
      const dbid = entityIdMap.get(eid);
      if (!dbid) continue;
      for (const ev of f.evidenceIds) addEvEnt(ev, dbid);
    }
    for (const ev of f.evidenceIds) {
      if (!statusByEvidence.has(ev)) statusByEvidence.set(ev, new Map());
      const m = statusByEvidence.get(ev)!;
      m.set(f.factStatus, (m.get(f.factStatus) ?? 0) + 1);
    }
  }
  for (const r of relations) {
    for (const ev of r.evidenceIds) {
      addEvEnt(ev, entityIdMap.get(r.head)!);
      addEvEnt(ev, entityIdMap.get(r.tail)!);
    }
  }

  const processIdsByEvidence = new Map<string, Set<string>>();
  const factIdsByEvidence = new Map<string, Set<string>>();
  for (const p of processes) for (const ev of p.evidenceIds) {
    if (!processIdsByEvidence.has(ev)) processIdsByEvidence.set(ev, new Set());
    processIdsByEvidence.get(ev)!.add(p.processId);
  }
  for (const f of facts) for (const ev of f.evidenceIds) {
    if (!factIdsByEvidence.has(ev)) factIdsByEvidence.set(ev, new Set());
    factIdsByEvidence.get(ev)!.add(f.id);
  }

  const matById = new Map(materials.map((m) => [m.materialId, m]));
  const insEv = db.prepare(`INSERT INTO evidence
    (id, case_id, claim, quote, source, locator, strength, entity_ids, context, fact_status, verification_status, process_ids, fact_ids, material_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const e of evidence) {
    const mat = matById.get(e.materialId);
    const st = statusByEvidence.get(e.id);
    const status = st && st.size ? [...st.entries()].sort((a, b) => b[1] - a[1])[0][0] : (e.factStatus ?? null);
    const strength = ["high", "medium-high"].includes(e.confidence) ? "high" : e.confidence === "medium" ? "medium" : "low";
    const verification = ["composite", "reconstructed"].includes(e.quoteType) ? "verified_composite" : "verified_text";
    insEv.run(evMap(e.id), "C13", e.statement, e.quote, mat?.name ?? "C13 材料", e.locator, strength,
      json([...(entityIdsByEvidence.get(e.id) ?? [])]), `C13；${e.materialId}；${e.locator}`, status, verification,
      json([...(processIdsByEvidence.get(e.id) ?? [])]), json([...(factIdsByEvidence.get(e.id) ?? [])].map(factMap)),
      matMap(e.materialId));
  }

  const ACTOR_ALIAS: Record<string, string | null> = {
    "奥巴马政府/联邦政府": "E-A01",
    "奥巴马政府代表": "E-A01",
    "DBRTF": "E-A02",
    "MNA": "E-A10",
    "D3": "E-A08",
    "MCM团队": "E-A08",
    "数据提供方": null,
    "DLBA": "E-A14",
    "MHPN": "E-A16",
    "55名以上志愿者": "E-A18",
    "公众/居民": "E-A24",
    "质检人员": "E-A13",
    "质检团队": "E-A13",
    "mission control助理": "E-A13",
    "居民调查员": "E-A11",
    "志愿司机": "E-A11",
    "Site Control": "E-A09"
  };
  const entityByLabel = new Map(entities.map((e) => [e.label, e.id]));
  const insProc = db.prepare(`INSERT INTO processes (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of processes) {
    const actorIds = (p.actors as string[])
      .map((name) => ACTOR_ALIAS[name] ?? entityByLabel.get(name))
      .filter((x): x is string => Boolean(x))
      .map((eid) => entityIdMap.get(eid))
      .filter((x): x is string => Boolean(x));
    insProc.run(p.processId, "C13", p.title, p.timeRange, p.narrative, json([...new Set(actorIds)]), json(p.events),
      json(p.evidenceIds.map(evMap)), p.status, p.revision ?? 1);
  }

  const insFact = db.prepare(`INSERT INTO facts (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of facts) {
    const roles = f.entityRoles.map((r: string) => {
      const [eid, role] = r.split(":");
      return `${entityIdMap.get(eid)}:${role}`;
    });
    insFact.run(factMap(f.id), "C13", f.statement, json(roles), json(f.evidenceIds.map(evMap)),
      f.factStatus, f.timeScope, f.spaceScope, f.quantityScope, f.confidence, "G4 researcher_confirmed; C13 Motor City Mapping");
  }

  const factByEv = new Map<string, string[]>();
  for (const f of facts) for (const ev of f.evidenceIds) {
    if (!factByEv.has(ev)) factByEv.set(ev, []);
    factByEv.get(ev)!.push(f.id);
  }
  const insRel = db.prepare(`INSERT INTO relations
    (id, case_id, source, target, type, label, weight, fact_status, qualifiers, process_ids, evidence_ids, head_role, tail_role, review, version, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insRPL = db.prepare(`INSERT OR REPLACE INTO relation_process_links (relation_id, case_id, process_id, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insREL = db.prepare(`INSERT OR REPLACE INTO relation_evidence_links (relation_id, case_id, evidence_id) VALUES (?, ?, ?)`);
  for (const r of relations) {
    const id = relMap(r.id);
    const evids = r.evidenceIds.map(evMap);
    const fids = [...new Set(r.evidenceIds.flatMap((ev: string) => factByEv.get(ev) ?? []))];
    const fg = fids.length ? factMap(fids[0]) : null;
    insRel.run(id, "C13", entityIdMap.get(r.head), entityIdMap.get(r.tail), r.predicate, r.predicate, 1.6,
      r.factStatus, r.qualifiers, json(r.processIds), json(evids), r.headType, r.tailType,
      "G6 researcher_confirmed; C13 Motor City Mapping", "L2-C13-shared-v1.0", fg, json(evids), json([]), "verified_full_text");
    for (const pid of r.processIds) insRPL.run(id, "C13", pid, fg, json(evids), json([]), "verified_full_text");
    for (const ev of evids) insREL.run(id, "C13", ev);
  }

  const insNC = db.prepare(`INSERT INTO native_concepts (id, case_id, label, entity_type, definition, examples, source_relation_ids, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of nativeConcepts) {
    insNC.run(c.id, "C13", c.label, c.type, c.definition, json([c.examples]), json(c.sourceRelationIds.map(relMap)), "researcher_confirmed");
  }

  const insSC = db.prepare(`INSERT INTO shared_concepts (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of sharedConcepts) {
    insSC.run(c.id, c.label, c.definition, c.entityType, c.scope, json(c.supportingCaseIds), json(c.supportingNativeIds),
      json(c.negativeExamples), c.version, "candidate_single_case");
  }

  const insMap = db.prepare(`INSERT INTO concept_mappings (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope, evidence_ids, decision, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of mappings) {
    insMap.run(m.id, "C13", m.nativeId, m.sharedId ?? null, m.mappingType, m.basis, m.scope, json([]), m.decision, "L2-C13-shared-v1.0");
  }

  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset', 'caseflow-c01-c13')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_note', 'C01–C12 + C13 Motor City Mapping（G0–G6 与 L2 已完成）')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_imported_at', ?)").run(new Date().toISOString());
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c13_import_version', 'L2-C13-shared-v1.0')").run();

  const insDoc = db.prepare(`INSERT INTO search_docs (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const addDoc = (kind: string, refId: string, caseId: string | null, entityId: string | null, title: string, subtitle: string, body: string) => {
    const info = db.prepare("INSERT INTO vec_search (embedding) VALUES (?)").run(embeddingBuffer(`${title} ${subtitle} ${body}`));
    insDoc.run(Number(info.lastInsertRowid), kind, refId, caseId, entityId, title, subtitle, body);
  };
  addDoc("case", "C13", "C13", null, "Motor City Mapping", "案例 · 美国 · 2013—2015",
    `${CASE_SUMMARY} ${CASE_TAGS.join("，")} ${processes.map((p) => p.narrative).join(" ")}`);
  for (const e of entities) {
    const id = entityIdMap.get(e.id)!;
    addDoc("entity", id, "C13", id, e.label, `实体 · ${e.type}`, `${e.label} ${e.definition} ${(e.aliases ?? []).join(" ")}`);
  }
  for (const e of evidence) {
    const mat = matById.get(e.materialId);
    addDoc("evidence", evMap(e.id), "C13", null, `${mat?.name ?? "C13"} · ${e.id}`, `证据 · ${e.locator}`, `${e.statement} ${e.quote}`);
  }
  for (const m of materials) {
    addDoc("material", matMap(m.materialId), "C13", null, m.name, `材料 · ${KIND_MAP[m.sourceType] ?? m.sourceType} · ${m.date}`, `${m.scope} ${m.link} ${m.notes}`);
  }
});

tx();
db.pragma("wal_checkpoint(TRUNCATE)");
console.log("C13 import committed");
db.close();
