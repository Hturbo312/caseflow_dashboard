import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import { embeddingBuffer } from "../server/embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const CASE_DIR = path.join(DATA_DIR, "cases", "C16-red-hook-wifi");
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
const relations = read("relations_v2.0.json").relations as any[];
const nativeConcepts = read("native_concepts.json").concepts as any[];
const candidateData = read(path.join("concepts", "shared_concept_candidates_v1.0.json"));
const candidates = candidateData.candidates as any[];
const mappings = read(path.join("concepts", "concept_mappings_v1.0.json")).mappings as any[];

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = path.join(DATA_DIR, "_backup", `community-renewal.db.before-c16-${stamp}.db`);
fs.mkdirSync(path.dirname(backup), { recursive: true });
db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
console.log("backup:", backup);

const entityIdMap = new Map<string, string>();
const counters: Record<string, number> = {};
for (const e of entities) {
  const t = e.type as string;
  counters[t] = (counters[t] ?? 0) + 1;
  entityIdMap.set(e.entityId, `C16-${t}-${String(counters[t]).padStart(3, "0")}`);
}

const evMap = (id: string) => `C16-${id}`;
const relMap = (id: string) => `C16-${id}`;
const factMap = (id: string) => `C16-${id}`;
const matMap = (id: string) => `C16-${id}`;
const json = (v: any) => JSON.stringify(v ?? []);

const KIND_MAP: Record<string, string> = {
  partner_case_study: "合作机构案例研究",
  participant_interview: "参与者访谈",
  institutional_press_release: "机构新闻稿",
  annual_report: "机构年报",
  project_website: "项目官网",
  project_website_press_index: "项目官网媒体索引",
  independent_media: "独立媒体",
  local_media: "地方媒体",
  local_history_portal: "地方史页面",
  government_program_page: "政府项目页",
  encyclopedia: "百科",
  secondary_case_compilation: "二次汇编",
};

const CASE_SUMMARY =
  "红钩社区无线网络（Red Hook WiFi）是 RHI 与 OTI 在布鲁克林红钩共同发起的社区 mesh 网络。2011 年末起以屋顶节点与本地服务器提供本地信息与上网；Sandy 期间 RHI 成为恢复据点；2013 年起以 Digital Stewards 培训本地青年维护；2015 年 RISE:NYC 资助后扩展到约 20 站点与 38 家商户宿主；2019 年移交 Sky Packets，2023 年约剩 10 个活跃站点，Red Hook Houses 室内接入仍未实现。";
const CASE_TAGS = ["社区无线网络", "mesh", "数字管家", "灾害韧性", "纽约"];
const RESEARCH_QUESTION =
  "社区组织如何把通用 mesh 技术转化为可运营的本地通信基础设施？Sandy 前后网络能力与使用如何变化？Digital Stewards 如何连接维护劳动与青年就业？本地应用与本地优先通信在多大程度上成立？从 RHI 运营到 Sky Packets 接管、从 RISE:NYC 到 Big Apple Connect，所有权与资金结构如何改变覆盖、公共性与可持续性？";

// Process actors are labels in process.json; map exact labels/aliases plus variants.
const actorLookup = new Map<string, string>();
for (const e of entities) {
  actorLookup.set(e.label, e.entityId);
  for (const alias of e.aliases ?? []) actorLookup.set(alias, e.entityId);
}
const ACTOR_VARIANTS: Record<string, string> = {
  "Red Hook 居民": "G03",
  "居民": "G03",
  "社区工作坊参与者": "G03",
  "RHI 媒体项目参与者": "G03",
  "Coffey Park 公寓楼住户": "G03",
  "本地商户": "A17",
  "本地小企业": "A17",
  "本地小商户": "A17",
  "MIT 研究者": "A21",
  "急救与救援人员": "G03",
  "Visitation Church Rectory": "G05",
};

const tx = db.transaction(() => {
  db.prepare("DELETE FROM relation_evidence_links WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM relation_process_links WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM relations WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM facts WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM processes WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM evidence WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM materials WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM native_concepts WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM concept_mappings WHERE id LIKE 'MAP-C16-%'").run();
  db.prepare("DELETE FROM shared_concepts WHERE id LIKE 'SC-C16-%'").run();
  db.prepare("DELETE FROM entity_roles WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM case_entities WHERE case_id = 'C16'").run();
  db.prepare("DELETE FROM entities WHERE id LIKE 'C16-%'").run();
  db.prepare("DELETE FROM cases WHERE id = 'C16'").run();
  db.prepare("DELETE FROM vec_search WHERE rowid IN (SELECT rowid FROM search_docs WHERE case_id = 'C16')").run();
  db.prepare("DELETE FROM search_docs WHERE case_id = 'C16'").run();

  db.prepare(`INSERT INTO cases
    (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild, event_start, event_end, scope, evidence_cutoff, research_question, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(
      "C16", "C16", 16, "红钩社区无线网络（Red Hook WiFi）",
      "Red Hook WiFi, Brooklyn",
      "美国", "纽约市布鲁克林区红钩", "2011—2023", "2011—2023年",
      "#b23a2f", "network", json(CASE_TAGS), CASE_SUMMARY,
      json(processes.map((p) => p.narrative)),
      "2011-11", "2023-05",
      "布鲁克林红钩半岛；Red Hook Houses 作为目标但未覆盖范围；核心期 2011-11–2019-12，2020-01–2023-05 为观察期",
      "2026-11-13", RESEARCH_QUESTION, "frozen",
    );

  const insEntity = db.prepare(`INSERT INTO entities (id, name, name_en, type, description, definition, role_types) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insRole = db.prepare(`INSERT OR REPLACE INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`);
  const insCaseEntity = db.prepare(`INSERT OR REPLACE INTO case_entities (case_id, entity_id) VALUES (?, ?)`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entityId)!;
    const roleTypes = [...new Set((e.roles ?? []).map((r: any) => r.role))];
    insEntity.run(id, e.label, e.label, e.type, e.definition, e.definition, json(roleTypes));
    for (const role of roleTypes) insRole.run("C16", id, role);
    insCaseEntity.run("C16", id);
  }

  const insMat = db.prepare(`INSERT INTO materials
    (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of materials) {
    insMat.run(
      matMap(m.materialId), "C16", m.name, KIND_MAP[m.sourceType] ?? m.sourceType,
      m.authorOrOrg, m.date, "C16 案例知识包", (m.scope ?? "").slice(0, 500),
      m.sourceType, m.verificationStatus, m.scope, m.link, m.reliability, m.notes,
    );
  }

  const entityIdsByEvidence = new Map<string, Set<string>>();
  const statusByEvidence = new Map<string, Map<string, number>>();
  const addEvEnt = (eid: string, dbid: string) => {
    if (!entityIdsByEvidence.has(eid)) entityIdsByEvidence.set(eid, new Set());
    entityIdsByEvidence.get(eid)!.add(dbid);
  };
  for (const f of facts) {
    for (const eid of Object.keys(f.entityRoles as Record<string, string>)) {
      const dbid = entityIdMap.get(eid);
      if (!dbid) throw new Error(`Unknown fact entity ${eid} in ${f.factId}`);
      for (const ev of f.evidenceIds) addEvEnt(ev, dbid);
    }
    for (const ev of f.evidenceIds) {
      if (!statusByEvidence.has(ev)) statusByEvidence.set(ev, new Map());
      const m = statusByEvidence.get(ev)!;
      m.set(f.factStatus, (m.get(f.factStatus) ?? 0) + 1);
    }
  }
  for (const r of relations) {
    const head = entityIdMap.get(r.head_entity);
    const tail = entityIdMap.get(r.tail_entity);
    if (!head || !tail) throw new Error(`Unknown relation endpoint in ${r.relation_id}`);
    for (const ev of r.evidence_ids) {
      addEvEnt(ev, head);
      addEvEnt(ev, tail);
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
    factIdsByEvidence.get(ev)!.add(f.factId);
  }

  const matById = new Map(materials.map((m) => [m.materialId, m]));
  const insEv = db.prepare(`INSERT INTO evidence
    (id, case_id, claim, quote, source, locator, strength, entity_ids, context, fact_status, verification_status, process_ids, fact_ids, material_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const e of evidence) {
    const mat = matById.get(e.materialId);
    const st = statusByEvidence.get(e.id);
    let status: string | null = null;
    if (st && st.size) status = [...st.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const confidence = String(e.confidence ?? "").toLowerCase();
    const strength = confidence === "high" ? "high"
      : confidence === "medium-high" || confidence === "medium" ? "medium" : "low";
    const verificationStatus = e.verificationStatus ?? mat?.verificationStatus ?? null;
    insEv.run(
      evMap(e.id), "C16", e.statement, e.quote, mat?.name ?? "C16 材料", e.locator, strength,
      json([...(entityIdsByEvidence.get(e.id) ?? [])]), `C16；${e.materialId}；${e.locator}`,
      status, verificationStatus, json([...(processIdsByEvidence.get(e.id) ?? [])]),
      json([...(factIdsByEvidence.get(e.id) ?? [])].map(factMap)), matMap(e.materialId),
    );
  }

  const insProc = db.prepare(`INSERT INTO processes (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of processes) {
    const actorIds = (p.actors as string[])
      .map((label) => ACTOR_VARIANTS[label] ?? actorLookup.get(label))
      .filter(Boolean)
      .map((eid) => entityIdMap.get(eid!))
      .filter(Boolean);
    const eventIds = (p.events as any[]).map((ev) => `${ev[0]} ${ev[1]}`);
    insProc.run(
      p.processId, "C16", p.title, p.timeRange, p.narrative, json([...new Set(actorIds)]),
      json(eventIds), json(p.evidenceIds.map(evMap)), "frozen", 1,
    );
  }

  const insFact = db.prepare(`INSERT INTO facts (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of facts) {
    const roles = Object.entries(f.entityRoles as Record<string, string>).map(
      ([eid, role]) => `${entityIdMap.get(eid)}:${role}`,
    );
    insFact.run(
      factMap(f.factId), "C16", f.statement, json(roles), json(f.evidenceIds.map(evMap)),
      f.factStatus, f.timeScope, f.spaceScope, f.quantityScope, f.confidence,
      "G4 researcher_confirmed; C16 Red Hook WiFi",
    );
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
    insRel.run(
      id, "C16", entityIdMap.get(r.head_entity), entityIdMap.get(r.tail_entity),
      r.predicate, r.predicate, 1.6, r.fact_status, r.qualifiers, json(r.process_ids),
      json(evids), r.head_type, r.tail_type, "G6 researcher_confirmed; C16 Red Hook WiFi",
      "L2-C16-concepts-v1.0", fids[0] ?? null, json(evids), json([]), "verified_text",
    );
    for (const pid of r.process_ids) insRPL.run(id, "C16", pid, fids[0] ?? null, json(evids), json([]), "verified_text");
    for (const ev of evids) insREL.run(id, "C16", ev);
  }

  const insNC = db.prepare(`INSERT INTO native_concepts (id, case_id, label, entity_type, definition, examples, source_relation_ids, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of nativeConcepts) {
    insNC.run(
      c.nativeConceptId, "C16", c.label, c.entityType, c.definition,
      json(c.examples), json(c.sourceRelationIds.map(relMap)), "researcher_confirmed",
    );
  }

  const insSC = db.prepare(`INSERT INTO shared_concepts (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of candidates) {
    insSC.run(
      c.candidate_id, c.label, c.definition, c.entity_type, c.boundary ?? "",
      json(c.supporting_case_ids ?? ["C16"]), json(c.supporting_native_ids ?? []),
      json(c.negative_examples ?? []), "L2-C16-concepts-v1.0", "candidate_single_case",
    );
  }

  const insMap = db.prepare(`INSERT INTO concept_mappings (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope, evidence_ids, decision, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of mappings) {
    insMap.run(
      m.mapping_id, "C16", m.native_concept_id, m.shared_concept_id ?? null,
      m.mapping_type, m.basis, m.scope, json(m.evidence_ids.map(evMap)),
      m.decision, "L2-C16-concepts-v1.0",
    );
  }

  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset', 'caseflow-c01-c17')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_note', 'C01–C11 冻结版 + C12 Eastserve + C13 Motor City Mapping + C14 劲松北 + C15 春江小区 + C16 Red Hook WiFi + C17 Ramani Huria（G0–G6 与 L2 已完成）')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_imported_at', ?)").run(new Date().toISOString());
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c16_import_version', 'L2-C16-concepts-v1.0')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c16_import_candidates', ?)").run(String(candidates.length));
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c16_import_mappings', ?)").run(String(mappings.length));

  const insDoc = db.prepare(`INSERT INTO search_docs (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const addDoc = (kind: string, refId: string, caseId: string | null, entityId: string | null, title: string, subtitle: string, body: string) => {
    const info = db.prepare("INSERT INTO vec_search (embedding) VALUES (?)").run(embeddingBuffer(`${title} ${subtitle} ${body}`));
    insDoc.run(Number(info.lastInsertRowid), kind, refId, caseId, entityId, title, subtitle, body);
  };
  addDoc("case", "C16", "C16", null, "红钩社区无线网络（Red Hook WiFi）", "案例 · 美国 · 2011—2023", `${CASE_SUMMARY} ${CASE_TAGS.join("，")}`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entityId)!;
    addDoc("entity", id, "C16", id, e.label, `实体 · ${e.type}`, `${e.label} ${e.definition} ${(e.aliases ?? []).join(" ")}`);
  }
  for (const e of evidence) {
    const mat = matById.get(e.materialId);
    addDoc("evidence", evMap(e.id), "C16", null, `${mat?.name ?? "C16"} · ${e.id}`, `证据 · ${e.verificationStatus}`, `${e.statement} ${e.quote} ${e.locator}`);
  }
  for (const m of materials) {
    addDoc("material", matMap(m.materialId), "C16", null, m.name, `材料 · ${KIND_MAP[m.sourceType] ?? m.sourceType} · ${m.date}`, `${m.scope} ${m.link} ${m.notes}`);
  }
  for (const p of processes) {
    addDoc("process", p.processId, "C16", null, p.title, `过程 · ${p.timeRange}`, p.narrative);
  }
  for (const f of facts) {
    addDoc("fact", factMap(f.factId), "C16", null, f.statement.slice(0, 80), `事实 · ${f.factStatus}`, f.statement);
  }
  for (const c of nativeConcepts) {
    addDoc("native_concept", c.nativeConceptId, "C16", null, c.label, `原生概念 · ${c.entityType}`, `${c.definition} ${(c.examples ?? []).join(" ")}`);
  }
  for (const c of candidates) {
    addDoc("shared_concept_candidate", c.candidate_id, "C16", null, c.label, `共享概念候选 · ${c.entity_type}`, `${c.definition} ${c.boundary ?? ""}`);
  }
});

tx();
db.pragma("wal_checkpoint(TRUNCATE)");
console.log("C16 import committed");
db.close();
