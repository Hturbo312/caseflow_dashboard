import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import { embeddingBuffer } from "../server/embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const CASE_DIR = path.join(DATA_DIR, "cases", "C18-asknearby");
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
const nativeConcepts = read("native_concept_inventory.json").concepts as any[];
const candidateData = read("shared_concept_candidates_v1.0.json");
const activeCandidates = candidateData.active_candidates as any[];
const heldCandidates = candidateData.held_candidates as any[];
const mappingData = read("concept_mapping_v1.0.json");
const mappings = mappingData.mappings as any[];

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = path.join(DATA_DIR, "_backup", `community-renewal.db.before-c18-${stamp}.db`);
fs.mkdirSync(path.dirname(backup), { recursive: true });
db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
console.log("backup:", backup);

const entityIdMap = new Map<string, string>();
const entityByLabel = new Map<string, string>();
const counters: Record<string, number> = {};
for (const e of entities) {
  const t = e.type as string;
  counters[t] = (counters[t] ?? 0) + 1;
  const id = `C18-${t}-${String(counters[t]).padStart(3, "0")}`;
  entityIdMap.set(e.id, id);
  entityByLabel.set(e.label, id);
  for (const alias of e.aliases ?? []) entityByLabel.set(alias, id);
}

const evMap = (id: string) => `C18-${id}`;
const relMap = (id: string) => `C18-${id}`;
const factMap = (id: string) => `C18-${id}`;
const matMap = (id: string) => `C18-${id}`;
const json = (v: any) => JSON.stringify(v ?? []);
const strength = (v: string | undefined) =>
  v?.includes("high") ? "high" : v?.includes("medium") ? "medium" : "low";

const KIND_MAP: Record<string, string> = {
  academic_article: "学术论文",
  mainstream_media_event_report: "主流媒体",
  local_media_event_report: "地方媒体",
  feature_repost: "深度报道",
  local_media_award_report: "地方媒体",
  news_agency_award_report: "通讯社",
  institutional_promotion: "机构宣传"
};

const ACTOR_LABEL_MAP: Record<string, string[]> = {
  "论文作者/研究团队": ["c18-actor-research-team"],
  "论文作者/平台团队": ["c18-actor-research-team"],
  "北京大学深圳研究生院新生": ["c18-actor-pku-new-students"],
  "国际留学生": ["c18-actor-intl-student"],
  "南头古城居民": ["c18-actor-nantou-residents"],
  "管理端/网格化系统": ["c18-actor-nantou-management"],
  "北京大学方元问问项目团队": ["c18-actor-asknearby-team"],
  "南山区民政局": ["c18-actor-nanshan-civil-affairs"],
  "舒琦青创领航慈善信托": ["c18-actor-charity-trust"],
  "北京大学方元问问团队/邓稚澄": ["c18-actor-asknearby-team", "c18-actor-deng-zhicheng"],
  "桃源街道/大学城社区": ["c18-actor-taoyuan-street"],
  "社区居民、高校师生、国际留学生": ["c18-actor-open-day-participants"]
};

const CASE_SUMMARY =
  "方元问问（AskNearby）是论文作者团队开发的LLM社区信息服务平台，2024年秋季在北京大学深圳研究生院面向新生试运行，并在南头古城开展高密度混合社区试运行；2025年又以小程序形式参与桃源街道校社开放日。";
const CASE_TAGS = ["大语言模型", "社区信息服务平台", "校社联动", "深圳"];
const RESEARCH_QUESTION =
  "LLM、RAG与时空知识图谱如何转化为社区信息服务和治理能力？高校新生与南头古城两类试点的使用与作者报告效果是什么？APP与小程序、项目团队与论文作者团队是什么关系？获奖资助与后续校社活动能证明什么？";

const tx = db.transaction(() => {
  db.prepare("DELETE FROM relation_evidence_links WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM relation_process_links WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM relations WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM facts WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM processes WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM evidence WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM materials WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM native_concepts WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM concept_mappings WHERE case_id = 'C18' OR id LIKE 'MAP-C18-%'").run();
  db.prepare("DELETE FROM shared_concepts WHERE id LIKE 'SC-C18-%'").run();
  db.prepare("DELETE FROM entity_roles WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM case_entities WHERE case_id = 'C18'").run();
  db.prepare("DELETE FROM entities WHERE id LIKE 'C18-%'").run();
  db.prepare("DELETE FROM cases WHERE id = 'C18'").run();
  db.prepare("DELETE FROM vec_search WHERE rowid IN (SELECT rowid FROM search_docs WHERE case_id = 'C18')").run();
  db.prepare("DELETE FROM search_docs WHERE case_id = 'C18'").run();

  db.prepare(`INSERT INTO cases
    (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild, event_start, event_end, scope, evidence_cutoff, research_question, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(
      "C18",
      "C18",
      18,
      "方元问问（AskNearby）LLM社区信息服务平台与深圳双社区试运行",
      "AskNearby: An LLM-enabled Community Information Service Platform in Shenzhen",
      "中国",
      "深圳",
      "2024—2025",
      "2024年秋季—2025年（扩展观察至2026-11）",
      "#5d6b8a",
      "network",
      json(CASE_TAGS),
      CASE_SUMMARY,
      json(processes.map((p) => p.narrative)),
      "2024年秋季",
      "2025年",
      "北京大学深圳研究生院、南头古城；2025-10/11桃源街道大学城社区为扩展观察",
      "2026-11-13",
      RESEARCH_QUESTION,
      "frozen"
    );

  const insEntity = db.prepare(
    `INSERT INTO entities (id, name, name_en, type, description, definition, role_types) VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const insRole = db.prepare(
    `INSERT OR REPLACE INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`
  );
  const insCaseEntity = db.prepare(
    `INSERT OR REPLACE INTO case_entities (case_id, entity_id) VALUES (?, ?)`
  );
  for (const e of entities) {
    const id = entityIdMap.get(e.id)!;
    insEntity.run(id, e.label, e.label, e.type, e.definition, e.definition, json(e.roles));
    for (const role of e.roles) insRole.run("C18", id, role);
    insCaseEntity.run("C18", id);
  }

  const insMat = db.prepare(`INSERT INTO materials
    (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of materials) {
    insMat.run(
      matMap(m.materialId),
      "C18",
      m.name,
      KIND_MAP[m.sourceType] ?? m.sourceType,
      m.authorOrOrg,
      m.date,
      "C18 案例知识包",
      String(m.scope ?? "").slice(0, 500),
      m.sourceType,
      m.verificationStatus,
      m.scope,
      m.link,
      m.reliability,
      m.notes
    );
  }

  const entityIdsByEvidence = new Map<string, Set<string>>();
  const statusByEvidence = new Map<string, Map<string, number>>();
  const addEvEnt = (eid: string, dbid: string) => {
    if (!entityIdsByEvidence.has(eid)) entityIdsByEvidence.set(eid, new Set());
    entityIdsByEvidence.get(eid)!.add(dbid);
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
  for (const p of processes) {
    for (const ev of p.evidenceIds) {
      if (!processIdsByEvidence.has(ev)) processIdsByEvidence.set(ev, new Set());
      processIdsByEvidence.get(ev)!.add(p.id);
    }
  }
  for (const f of facts) {
    for (const ev of f.evidenceIds) {
      if (!factIdsByEvidence.has(ev)) factIdsByEvidence.set(ev, new Set());
      factIdsByEvidence.get(ev)!.add(f.id);
    }
  }

  const matById = new Map(materials.map((m) => [m.materialId, m]));
  const insEv = db.prepare(`INSERT INTO evidence
    (id, case_id, claim, quote, source, locator, strength, entity_ids, context, fact_status, verification_status, process_ids, fact_ids, material_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const e of evidence) {
    const mat = matById.get(e.materialId);
    const st = statusByEvidence.get(e.id);
    const status = st && st.size ? [...st.entries()].sort((a, b) => b[1] - a[1])[0][0] : e.factStatus ?? null;
    insEv.run(
      evMap(e.id),
      "C18",
      e.statement,
      e.quote,
      mat?.name ?? "C18 材料",
      e.locator,
      strength(e.confidence),
      json([...(entityIdsByEvidence.get(e.id) ?? [])]),
      `C18；${e.materialId}；${e.locator}`,
      status,
      e.verificationStatus,
      json([...(processIdsByEvidence.get(e.id) ?? [])]),
      json([...(factIdsByEvidence.get(e.id) ?? [])].map(factMap)),
      matMap(e.materialId)
    );
  }

  const insProc = db.prepare(`INSERT INTO processes (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of processes) {
    const actorIds = (p.actorLabels ?? [])
      .flatMap((label: string) => (ACTOR_LABEL_MAP[label] ?? []).map((id) => entityIdMap.get(id)))
      .filter(Boolean);
    insProc.run(
      p.id,
      "C18",
      p.title,
      p.timeRange,
      p.narrative,
      json([...new Set(actorIds)]),
      json(p.eventIds),
      json(p.evidenceIds.map(evMap)),
      "frozen",
      p.revision ?? 1
    );
  }

  const insFact = db.prepare(`INSERT INTO facts (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of facts) {
    const roles = f.entityRoles.map((r: string) => {
      const [eid, role] = r.split(":");
      return `${entityIdMap.get(eid)}:${role}`;
    });
    insFact.run(
      factMap(f.id),
      "C18",
      f.statement,
      json(roles),
      json(f.evidenceIds.map(evMap)),
      f.factStatus,
      f.timeScope,
      f.spaceScope,
      f.quantityScope,
      f.confidence,
      "G4 researcher_confirmed; C18"
    );
  }

  const insRel = db.prepare(`INSERT INTO relations
    (id, case_id, source, target, type, label, weight, fact_status, qualifiers, process_ids, evidence_ids, head_role, tail_role, review, version, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insRPL = db.prepare(`INSERT OR REPLACE INTO relation_process_links
    (relation_id, case_id, process_id, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status)
    VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insREL = db.prepare(`INSERT OR REPLACE INTO relation_evidence_links
    (relation_id, case_id, evidence_id) VALUES (?, ?, ?)`);
  for (const r of relations) {
    const id = relMap(r.id);
    const evids = r.evidenceIds.map(evMap);
    const fids = r.factIds.map(factMap);
    insRel.run(
      id,
      "C18",
      entityIdMap.get(r.head),
      entityIdMap.get(r.tail),
      r.predicate,
      r.predicate,
      1.6,
      r.factStatus,
      r.qualifiers,
      json(r.processIds),
      json(evids),
      r.headRole,
      r.tailRole,
      "G6 researcher_confirmed; C18",
      "L2-C18-v1.0",
      fids[0] ?? null,
      json(evids),
      json([]),
      "verified_text"
    );
    for (const pid of r.processIds) {
      insRPL.run(id, "C18", pid, fids[0] ?? null, json(evids), json([]), "verified_text");
    }
    for (const ev of evids) insREL.run(id, "C18", ev);
  }

  const insNC = db.prepare(`INSERT INTO native_concepts
    (id, case_id, label, entity_type, definition, examples, source_relation_ids, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of nativeConcepts) {
    insNC.run(
      c.native_concept_id,
      "C18",
      c.label,
      c.entity_type,
      c.definition,
      json(c.examples),
      json(c.source_relation_ids.map(relMap)),
      "researcher_confirmed"
    );
  }

  const insSC = db.prepare(`INSERT INTO shared_concepts
    (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of activeCandidates) {
    insSC.run(
      c.candidate_id,
      c.label,
      c.definition,
      c.entity_type,
      c.boundary ?? "",
      json(["C18"]),
      json(c.supporting_native_ids),
      json([]),
      "L2-C18-v1.0",
      "candidate_single_case"
    );
  }
  for (const c of heldCandidates) {
    insSC.run(
      c.candidate_id,
      c.label,
      c.definition,
      c.entity_type,
      c.reason ?? "",
      json(["C18"]),
      json(c.supporting_native_ids),
      json([]),
      "L2-C18-v1.0",
      "held_not_carried_forward"
    );
  }

  const supportAdditions = mappingData.proposed_support_additions as any[];
  const nativeByShared = new Map<string, string[]>();
  for (const m of mappings) {
    if (!m.shared_concept_id || !m.shared_concept_id.startsWith("SC-C01-")) continue;
    if (!nativeByShared.has(m.shared_concept_id)) nativeByShared.set(m.shared_concept_id, []);
    nativeByShared.get(m.shared_concept_id)!.push(m.native_concept_id);
  }
  for (const addition of supportAdditions) {
    const row = db.prepare("SELECT supporting_case_ids, supporting_native_ids FROM shared_concepts WHERE id = ?")
      .get(addition.shared_concept_id) as { supporting_case_ids: string; supporting_native_ids: string } | undefined;
    if (!row) {
      console.warn("missing shared concept for support addition:", addition.shared_concept_id);
      continue;
    }
    const caseIds = new Set<string>(JSON.parse(row.supporting_case_ids || "[]"));
    const nativeIds = new Set<string>(JSON.parse(row.supporting_native_ids || "[]"));
    caseIds.add("C18");
    for (const n of nativeByShared.get(addition.shared_concept_id) ?? []) nativeIds.add(n);
    db.prepare("UPDATE shared_concepts SET supporting_case_ids = ?, supporting_native_ids = ? WHERE id = ?")
      .run(json([...caseIds]), json([...nativeIds]), addition.shared_concept_id);
  }

  const insMap = db.prepare(`INSERT INTO concept_mappings
    (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope, evidence_ids, decision, version)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of mappings) {
    insMap.run(
      m.mapping_id,
      "C18",
      m.native_concept_id,
      m.shared_concept_id ?? null,
      m.mapping_type,
      m.basis,
      m.scope,
      json((m.evidence_ids ?? []).map(evMap)),
      "researcher_confirmed",
      "L2-C18-v1.0"
    );
  }

  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset', 'caseflow-c01-c18')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_note', 'C01–C17 + C18 方元问问（G0–G6 与 L2 已完成）')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_imported_at', ?)").run(new Date().toISOString());
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c18_import_version', 'L2-C18-v1.0')").run();

  const insDoc = db.prepare(`INSERT INTO search_docs
    (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const addDoc = (
    kind: string,
    refId: string,
    caseId: string | null,
    entityId: string | null,
    title: string,
    subtitle: string,
    body: string
  ) => {
    const info = db.prepare("INSERT INTO vec_search (embedding) VALUES (?)")
      .run(embeddingBuffer(`${title} ${subtitle} ${body}`));
    insDoc.run(Number(info.lastInsertRowid), kind, refId, caseId, entityId, title, subtitle, body);
  };
  addDoc("case", "C18", "C18", null, "方元问问（AskNearby）", "案例 · 中国 · 2024—2025",
    `${CASE_SUMMARY} ${CASE_TAGS.join("，")} ${processes.map((p) => p.narrative).join(" ")}`);
  for (const e of entities) {
    const id = entityIdMap.get(e.id)!;
    addDoc("entity", id, "C18", id, e.label, `实体 · ${e.type}`, `${e.label} ${e.definition} ${(e.aliases ?? []).join(" ")}`);
  }
  for (const e of evidence) {
    const mat = matById.get(e.materialId);
    addDoc("evidence", evMap(e.id), "C18", null, `${mat?.name ?? "C18"} · ${e.id}`, "证据",
      `${e.statement} ${e.quote} ${e.locator}`);
  }
  for (const m of materials) {
    addDoc("material", matMap(m.materialId), "C18", null, m.name,
      `材料 · ${KIND_MAP[m.sourceType] ?? m.sourceType} · ${m.date}`,
      `${m.scope} ${m.link} ${m.notes}`);
  }
  for (const p of processes) {
    addDoc("process", p.id, "C18", null, p.title, `过程 · ${p.timeRange}`, p.narrative);
  }
  for (const f of facts) {
    addDoc("fact", factMap(f.id), "C18", null, f.statement.slice(0, 80), `事实 · ${f.factStatus}`, f.statement);
  }
  for (const c of nativeConcepts) {
    addDoc("native_concept", c.native_concept_id, "C18", null, c.label, `原生概念 · ${c.entity_type}`,
      `${c.definition} ${(c.examples ?? []).join(" ")}`);
  }
});

tx();
db.pragma("wal_checkpoint(TRUNCATE)");
console.log("C18 import committed");
db.close();
