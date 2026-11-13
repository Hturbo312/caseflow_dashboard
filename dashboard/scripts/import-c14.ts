import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import { embeddingBuffer } from "../server/embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const CASE_DIR = path.join(DATA_DIR, "cases", "C14-jinsongbei");
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
const nativeConcepts = read("concepts/native_concept_inventory.json").native_concepts as any[];
const sharedConcepts = read("concepts/shared_concepts_v1.0.json").shared_concepts as any[];
const mappings = read("concepts/concept_mapping_v1.0.json").mappings as any[];

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = path.join(DATA_DIR, "_backup", `community-renewal.db.before-c14-${stamp}.db`);
fs.mkdirSync(path.dirname(backup), { recursive: true });
db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
console.log("backup:", backup);

const entityIdMap = new Map<string, string>();
const counters: Record<string, number> = {};
for (const e of entities) {
  const t = e.type as string;
  counters[t] = (counters[t] ?? 0) + 1;
  entityIdMap.set(e.entity_id, `C14-${t}-${String(counters[t]).padStart(3, "0")}`);
}

const evMap = (id: string) => `C14-${id}`;
const relMap = (id: string) => `C14-${id}`;
const factMap = (id: string) => `C14-${id}`;
const matMap = (id: string) => `C14-${id}`;
const json = (v: any) => JSON.stringify(v ?? []);

const KIND_MAP: Record<string, string> = {
  government_case: "政府案例",
  government_interpretation: "政府规划解读",
  official_media: "官方媒体",
  media: "媒体",
  self_media_repost: "自媒体转载",
  central_media_repost: "中央媒体转载",
  media_repost: "媒体转载",
  project_material: "项目方材料",
  government_edu_video: "政府科普视频"
};

const CASE_SUMMARY =
  "北京劲松北社区（一区、二区）2018–2023 年以社会资本参与、五方联动和物业服务为组织载体，推进示范区更新、物业收费、适老化服务与智能设备部署；HEDATA 智慧社区平台仅见企业方陈述，智慧治理体系仍待验证。";
const CASE_TAGS = ["智慧治理", "老旧小区更新", "社会资本", "中国"];
const RESEARCH_QUESTION =
  "劲松北社区如何把社会资本、低效空间运营权、物业费与政府扶持组合成更新与运营闭环？五方联动与居民参与如何转化为方案、物业引入和收费？智能设备与 HEDATA 平台实际部署、使用到什么程度？智慧化是目标、运营工具还是品牌叙事？更新效果在 2020–2023 年是否可持续？";

const tx = db.transaction(() => {
  db.prepare("DELETE FROM relation_evidence_links WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM relation_process_links WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM relations WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM facts WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM processes WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM evidence WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM materials WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM native_concepts WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM concept_mappings WHERE id LIKE 'MAP-C14-%'").run();
  db.prepare("DELETE FROM shared_concepts WHERE id LIKE 'SC-C14-%'").run();
  db.prepare("DELETE FROM entity_roles WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM case_entities WHERE case_id = 'C14'").run();
  db.prepare("DELETE FROM entities WHERE id LIKE 'C14-%'").run();
  db.prepare("DELETE FROM cases WHERE id = 'C14'").run();
  db.prepare("DELETE FROM vec_search WHERE rowid IN (SELECT rowid FROM search_docs WHERE case_id = 'C14')").run();
  db.prepare("DELETE FROM search_docs WHERE case_id = 'C14'").run();

  db.prepare(`INSERT INTO cases
    (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild, event_start, event_end, scope, evidence_cutoff, research_question, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run("C14", "C14", 14, "劲松北社区智慧治理与有机更新", "Jinsongbei Community Smart Governance", "中国", "北京市朝阳区", "2018—2023", "2018—2023年",
      "#b45a3c", "network", json(CASE_TAGS), CASE_SUMMARY, json(processes.map((p) => p.narrative)),
      "2018-07", "2023-12",
      "劲松北社区（劲松一区、二区），0.26 平方公里/26 公顷，43 栋居民楼，19.4 万平方米",
      "2026-11-13", RESEARCH_QUESTION, "frozen");

  const roleMap = new Map<string, Set<string>>();
  for (const f of facts) {
    for (const r of f.entity_roles) {
      const [eid, role] = r.split(":");
      if (!roleMap.has(eid)) roleMap.set(eid, new Set());
      roleMap.get(eid)!.add(role);
    }
  }

  const insEntity = db.prepare(`INSERT INTO entities (id, name, name_en, type, description, definition, role_types) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insRole = db.prepare(`INSERT OR REPLACE INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`);
  const insCaseEntity = db.prepare(`INSERT OR REPLACE INTO case_entities (case_id, entity_id) VALUES (?, ?)`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    const roles = [...(roleMap.get(e.entity_id) ?? new Set([e.type]))];
    insEntity.run(id, e.label, e.label, e.type, e.definition, e.definition, json(roles));
    for (const r of roles) insRole.run("C14", id, r);
    insCaseEntity.run("C14", id);
  }

  const insMat = db.prepare(`INSERT INTO materials
    (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of materials) {
    insMat.run(matMap(m.material_id), "C14", m.name, KIND_MAP[m.source_type] ?? m.source_type, m.author_or_org, m.date,
      "C14 案例知识包", (m.scope ?? "").slice(0, 500), m.source_type, m.verification_status, m.scope, m.link, m.reliability, m.notes);
  }

  const entityIdsByEvidence = new Map<string, Set<string>>();
  const statusByEvidence = new Map<string, Map<string, number>>();
  const addEvEnt = (ev: string, eid: string) => {
    if (!entityIdsByEvidence.has(ev)) entityIdsByEvidence.set(ev, new Set());
    entityIdsByEvidence.get(ev)!.add(eid);
  };
  for (const f of facts) {
    for (const r of f.entity_roles) {
      const [eid] = r.split(":");
      const dbid = entityIdMap.get(eid);
      if (!dbid) continue;
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
      addEvEnt(ev, entityIdMap.get(r.head_entity_id)!);
      addEvEnt(ev, entityIdMap.get(r.tail_entity_id)!);
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
    const status = st && st.size ? [...st.entries()].sort((a, b) => b[1] - a[1])[0][0] : (e.status_hint ?? null);
    const vs = e.verification_status ?? "";
    const strength = vs.includes("full") || vs.includes("quoted_from_source") ? "high" : vs.includes("metadata") ? "low" : "medium";
    insEv.run(evMap(e.evidence_id), "C14", e.statement, e.quote_or_span, mat?.name ?? "C14 材料", e.locator, strength,
      json([...(entityIdsByEvidence.get(e.evidence_id) ?? [])]), `C14；${e.material_id}；${e.locator}；${e.context ?? ""}`,
      status, e.verification_status, json([...(processIdsByEvidence.get(e.evidence_id) ?? [])]),
      json([...(factIdsByEvidence.get(e.evidence_id) ?? [])].map(factMap)), matMap(e.material_id));
  }

  const ACTOR_ALIAS: Record<string, string | null> = {
    "社区居民": "居民/业主",
    "社区党委": "社区党委/居委会",
    "业主/居民": "居民/业主",
    "社区居委会": "社区党委/居委会",
    "老年人/居民": "居民/业主",
    "物业": "愿景物业",
    "居民": "居民/业主",
    "市区政府": "朝阳区政府/区级部门",
    "媒体": null,
    "区级部门": "朝阳区政府/区级部门",
    "居民党支部": "社区党委/居委会",
    "物业党支部": "愿景物业",
    "企业党支部": "愿景集团",
    "居民/楼门长": "楼门长/党员",
    "市区财政": "市区财政部门",
    "社区": "社区党委/居委会",
    "商户/便民业态": "商户/便民业态"
  };
  const entityByLabel = new Map(entities.map((e) => [e.label, e.entity_id]));
  const insProc = db.prepare(`INSERT INTO processes (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of processes) {
    const actorIds = (p.actor_labels as string[])
      .map((name) => ACTOR_ALIAS[name] ?? entityByLabel.get(name))
      .filter((x): x is string => Boolean(x))
      .map((eid) => entityIdMap.get(eid))
      .filter((x): x is string => Boolean(x));
    insProc.run(p.process_id, "C14", p.title, p.time_range, p.narrative, json([...new Set(actorIds)]),
      json(p.event_labels), json(p.evidence_ids.map(evMap)), p.status, 1);
  }

  const normalizeConfidence = (v: string) =>
    v.startsWith("high") ? "high" : v.startsWith("low") ? "low" : "medium";
  const insFact = db.prepare(`INSERT INTO facts (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of facts) {
    const roles = f.entity_roles.map((r: string) => {
      const [eid, role] = r.split(":");
      return `${entityIdMap.get(eid)}:${role}`;
    });
    insFact.run(factMap(f.fact_id), "C14", f.statement, json(roles), json(f.evidence_ids.map(evMap)),
      f.fact_status, f.time_scope, f.space_scope, f.quantity_scope, normalizeConfidence(f.confidence),
      "G4 researcher_confirmed; C14 劲松北社区");
  }

  const insRel = db.prepare(`INSERT INTO relations
    (id, case_id, source, target, type, label, weight, fact_status, qualifiers, process_ids, evidence_ids, head_role, tail_role, review, version, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insRPL = db.prepare(`INSERT OR REPLACE INTO relation_process_links (relation_id, case_id, process_id, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insREL = db.prepare(`INSERT OR REPLACE INTO relation_evidence_links (relation_id, case_id, evidence_id) VALUES (?, ?, ?)`);
  for (const r of relations) {
    const id = relMap(r.relation_id);
    const evids = r.evidence_ids.map(evMap);
    const fg = r.fact_ids.length ? factMap(r.fact_ids[0]) : null;
    insRel.run(id, "C14", entityIdMap.get(r.head_entity_id), entityIdMap.get(r.tail_entity_id),
      r.predicate, r.predicate, 1.6, r.fact_status, json(r.qualifiers), json(r.process_ids), json(evids),
      r.head_type, r.tail_type, "G6 researcher_confirmed; C14 劲松北社区", "L2-C14-shared-v1.0",
      fg, json(evids), json([]), "verified_full_text");
    for (const pid of r.process_ids) insRPL.run(id, "C14", pid, fg, json(evids), json([]), "verified_full_text");
    for (const ev of evids) insREL.run(id, "C14", ev);
  }

  const relById = new Map(relations.map((r) => [r.relation_id, r]));
  const insNC = db.prepare(`INSERT INTO native_concepts (id, case_id, label, entity_type, definition, examples, source_relation_ids, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of nativeConcepts) {
    const examples = c.source_relation_ids
      .map((rid: string) => relById.get(rid))
      .filter(Boolean)
      .slice(0, 3)
      .map((r: any) => `${r.head_entity} —${r.predicate}→ ${r.tail_entity}`);
    insNC.run(c.native_concept_id, "C14", c.label, c.core_type, c.definition, json(examples),
      json(c.source_relation_ids.map(relMap)), "researcher_confirmed");
  }

  const insSC = db.prepare(`INSERT INTO shared_concepts (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of sharedConcepts) {
    insSC.run(c.id, c.label, c.definition, c.entity_type, c.scope, json(c.supporting_case_ids),
      json(c.supporting_native_ids), json(c.negative_examples), c.version, c.review);
  }

  const insMap = db.prepare(`INSERT INTO concept_mappings (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope, evidence_ids, decision, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of mappings) {
    insMap.run(m.mapping_id, "C14", m.native, m.shared ?? null, m.type, m.basis, m.scope,
      json((m.evidence_ids ?? []).map(evMap)), m.decision, "L2-C14-shared-v1.0");
  }

  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset', 'caseflow-c01-c14')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_note', 'C01–C13 + C14 劲松北社区智慧治理与有机更新（G0–G6 与 L2 已完成）')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_imported_at', ?)").run(new Date().toISOString());
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c14_import_version', 'L2-C14-shared-v1.0')").run();

  const insDoc = db.prepare(`INSERT INTO search_docs (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const addDoc = (kind: string, refId: string, caseId: string | null, entityId: string | null, title: string, subtitle: string, body: string) => {
    const info = db.prepare("INSERT INTO vec_search (embedding) VALUES (?)").run(embeddingBuffer(`${title} ${subtitle} ${body}`));
    insDoc.run(Number(info.lastInsertRowid), kind, refId, caseId, entityId, title, subtitle, body);
  };
  addDoc("case", "C14", "C14", null, "劲松北社区智慧治理与有机更新", "案例 · 中国 · 2018—2023",
    `${CASE_SUMMARY} ${CASE_TAGS.join("，")} ${processes.map((p) => p.narrative).join(" ")}`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    addDoc("entity", id, "C14", id, e.label, `实体 · ${e.type}`, `${e.label} ${e.definition}`);
  }
  for (const e of evidence) {
    const mat = matById.get(e.material_id);
    addDoc("evidence", evMap(e.evidence_id), "C14", null, `${mat?.name ?? "C14"} · ${e.evidence_id}`,
      `证据 · ${e.locator}`, `${e.statement} ${e.quote_or_span}`);
  }
  for (const m of materials) {
    addDoc("material", matMap(m.material_id), "C14", null, m.name,
      `材料 · ${KIND_MAP[m.source_type] ?? m.source_type} · ${m.date}`, `${m.scope} ${m.link} ${m.notes}`);
  }
});

tx();
db.pragma("wal_checkpoint(TRUNCATE)");
console.log("C14 import committed");
db.close();
