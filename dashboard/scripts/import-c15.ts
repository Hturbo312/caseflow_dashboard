import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import { embeddingBuffer } from "../server/embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const CASE_DIR = path.join(DATA_DIR, "cases", "C15-chunjiang");
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
const nativeConcepts = read("native_concepts.json").native_concepts as any[];
const mappingData = read("concept_mapping_v1.1.json");
const mappings = mappingData.mappings as any[];
const activeCandidates = mappingData.active_shared_concept_candidates as any[];
const amendments = read("shared_concept_amendments.json").amendments as any[];

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = path.join(DATA_DIR, "_backup", `community-renewal.db.before-c15-${stamp}.db`);
fs.mkdirSync(path.dirname(backup), { recursive: true });
db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
console.log("backup:", backup);

const entityIdMap = new Map<string, string>();
const counters: Record<string, number> = {};
for (const e of entities) {
  const t = e.entity_type as string;
  counters[t] = (counters[t] ?? 0) + 1;
  entityIdMap.set(e.entity_id, `C15-${t}-${String(counters[t]).padStart(3, "0")}`);
}

const evMap = (id: string) => `C15-${id}`;
const relMap = (id: string) => `C15-${id}`;
const factMap = (id: string) => `C15-${id}`;
const matMap = (id: string) => `C15-${id}`;
const json = (v: any) => JSON.stringify(v ?? []);

const KIND_MAP: Record<string, string> = {
  official_media_street_material: "官方媒体/街道材料",
  central_media: "中央媒体",
  city_media: "城市媒体",
  official_media: "官方媒体",
  independent_media: "独立媒体"
};

const CASE_SUMMARY =
  "春江小区位于上海市黄浦区五里桥街道龙华居民区，是建于20世纪80年代的老旧小区。2021年起，上海“最小管理单元”试点与美丽家园实体更新并行进入春江；2023年上线“智慧春江”小程序，形成居民点单、微网格长派单、微网格员接单、居民评单的四单制，并与三会、自管队、微网格、格里厢和春江数治网相互衔接。";
const CASE_TAGS = ["最小管理单元", "智慧春江", "四单制", "微网格", "上海"];
const RESEARCH_QUESTION =
  "数字系统如何进入老旧小区更新？春江部署了哪些技术、能力和行动，哪些进入日常使用？四单制如何运转？数字平台与三会、自管队、物业、党总支是什么关系？更新效果与可持续性如何？数字化是独立目标还是实体更新、物业服务和基层治理的工具？";

const ACTOR_LABEL_MAP: Record<string, string[]> = {
  "上海市城运中心": ["A13"],
  "业委会": ["A08"],
  "久禄国际贸易有限公司": ["A29"],
  "五里桥街道": ["A05"],
  "党员志愿者": ["A28"],
  "党建/平安/管理/城运中心": ["A05"],
  "共建单位": ["A22"],
  "养老顾问": ["A24"],
  "区房管局": ["A16"],
  "区消防支队": ["A16"],
  "华为": ["A15"],
  "周沪": ["A10"],
  "商铺联盟": ["A22"],
  "居委会": ["A04"],
  "居民代表": ["A01"],
  "居民区党总支": ["A03"],
  "居民林先生": ["A01"],
  "张丞俊": ["A12"],
  "微网格员": ["A20"],
  "微网格长": ["A19"],
  "快递小哥": ["A21"],
  "恒丰银行资金运营中心党支部": ["A11"],
  "新就业群体": ["A21"],
  "施工/监理": ["A17"],
  "施工方": ["A17"],
  "春江小区居民": ["A01"],
  "春江小区物业": ["A06"],
  "春江微网格": ["A18"],
  "春江自治团队": ["A02"],
  "春江自管队": ["A09"],
  "格里厢党群服务站": ["A27"],
  "楼组长": ["A28"],
  "永理置业物业经理岳阳": ["A07"],
  "清运公司": ["A25"],
  "物业": ["A06"],
  "王锐": ["A11"],
  "社区工作者": ["A04"],
  "社区民警": ["A23"],
  "绿化": ["A26"],
  "自治能人": ["A28"],
  "路政": ["A26"],
  "迪古里拉涂料有限公司": ["A30"],
  "黄浦区政府": ["A14"],
  "龙华居民区党总支": ["A03"],
  "龙华居民区党总支/居委会": ["A03", "A04"]
};

const tx = db.transaction(() => {
  db.prepare("DELETE FROM relation_evidence_links WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM relation_process_links WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM relations WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM facts WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM processes WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM evidence WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM materials WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM native_concepts WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM concept_mappings WHERE id LIKE 'MAP-C15-%'").run();
  db.prepare("DELETE FROM shared_concepts WHERE id LIKE 'SC-C15-%'").run();
  db.prepare("DELETE FROM entity_roles WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM case_entities WHERE case_id = 'C15'").run();
  db.prepare("DELETE FROM entities WHERE id LIKE 'C15-%'").run();
  db.prepare("DELETE FROM cases WHERE id = 'C15'").run();
  db.prepare("DELETE FROM vec_search WHERE rowid IN (SELECT rowid FROM search_docs WHERE case_id = 'C15')").run();
  db.prepare("DELETE FROM search_docs WHERE case_id = 'C15'").run();

  db.prepare(`INSERT INTO cases
    (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild, event_start, event_end, scope, evidence_cutoff, research_question, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run("C15", "C15", 15, "上海五里桥街道春江小区数字化更新",
      "Digital Renewal of Chunjiang Community, Wuliqiao Subdistrict, Huangpu District, Shanghai",
      "中国", "上海", "2021—2023", "2021—2023年", "#5b6f7a", "network",
      json(CASE_TAGS), CASE_SUMMARY, json(processes.map((p) => p.narrative.join("\n\n"))),
      "2021-02", "2023-12",
      "春江小区及其专属最小管理单元；不含瞿溪路商铺单元、其他小区充电桩和其他最小管理单元",
      "2026-11-13", RESEARCH_QUESTION, "frozen");

  const insEntity = db.prepare(`INSERT INTO entities (id, name, name_en, type, description, definition, role_types) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insRole = db.prepare(`INSERT OR REPLACE INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`);
  const insCaseEntity = db.prepare(`INSERT OR REPLACE INTO case_entities (case_id, entity_id) VALUES (?, ?)`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    insEntity.run(id, e.label, e.label, e.entity_type, e.definition, e.definition, json(e.roles));
    for (const r of e.roles) insRole.run("C15", id, r);
    insCaseEntity.run("C15", id);
  }

  const insMat = db.prepare(`INSERT INTO materials
    (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of materials) {
    insMat.run(matMap(m.material_id), "C15", m.name, KIND_MAP[m.source_type] ?? m.source_type,
      m.author_or_org, m.date, "C15 案例知识包", (m.scope ?? "").slice(0, 500),
      m.source_type, m.verification_status, m.scope, m.link, m.reliability, m.notes);
  }

  const entityIdsByEvidence = new Map<string, Set<string>>();
  const statusByEvidence = new Map<string, Map<string, number>>();
  const addEvEnt = (eid: string, dbid: string) => {
    if (!entityIdsByEvidence.has(eid)) entityIdsByEvidence.set(eid, new Set());
    entityIdsByEvidence.get(eid)!.add(dbid);
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
      addEvEnt(ev, entityIdMap.get(r.head_entity)!);
      addEvEnt(ev, entityIdMap.get(r.tail_entity)!);
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
    const mid = e.material_id;
    const mat = matById.get(mid);
    const st = statusByEvidence.get(e.evidence_id);
    let status: string | null = null;
    if (st && st.size) status = [...st.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const strength = e.verification_status === "verified_text" ? "high"
      : e.verification_status === "verified_text_syndicated" ? "medium" : "low";
    insEv.run(evMap(e.evidence_id), "C15", e.statement, e.quote_or_span, mat?.name ?? "C15 材料",
      e.locator, strength, json([...(entityIdsByEvidence.get(e.evidence_id) ?? [])]),
      `C15；${mid}；${e.locator}`, status, e.verification_status,
      json([...(processIdsByEvidence.get(e.evidence_id) ?? [])]),
      json([...(factIdsByEvidence.get(e.evidence_id) ?? [])].map(factMap)),
      matMap(mid));
  }

  const insProc = db.prepare(`INSERT INTO processes (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of processes) {
    const actorIds = (p.actor_labels as string[]).flatMap((n) => ACTOR_LABEL_MAP[n] ?? []).map((a) => entityIdMap.get(a)).filter(Boolean);
    insProc.run(p.process_id, "C15", p.title, p.time_range, p.narrative.join("\n\n"),
      json([...new Set(actorIds)]), json(p.event_ids), json(p.evidence_ids.map(evMap)), "frozen", 1);
  }

  const insFact = db.prepare(`INSERT INTO facts (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of facts) {
    const roles = f.entity_roles.map((r: string) => {
      const [eid, role] = r.split(":");
      return `${entityIdMap.get(eid)}:${role}`;
    });
    insFact.run(factMap(f.fact_id), "C15", f.statement, json(roles), json(f.evidence_ids.map(evMap)),
      f.fact_status, f.time_scope, f.space_scope, f.quantity_scope, f.confidence,
      "G4 researcher_confirmed; C15");
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
    insRel.run(id, "C15", entityIdMap.get(r.head_entity), entityIdMap.get(r.tail_entity),
      r.predicate, r.predicate_label, 1.6, r.fact_status, r.qualifiers, json(r.process_ids),
      json(evids), r.head_role, r.tail_role, "G6 researcher_confirmed; C15",
      "L2-C15-v1.0", fids[0] ?? null, json(evids), json([]), "verified_text_syndicated");
    for (const pid of r.process_ids) insRPL.run(id, "C15", pid, fids[0] ?? null, json(evids), json([]), "verified_text_syndicated");
    for (const ev of evids) insREL.run(id, "C15", ev);
  }

  const insNC = db.prepare(`INSERT INTO native_concepts (id, case_id, label, entity_type, definition, examples, source_relation_ids, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of nativeConcepts) {
    insNC.run(c.native_concept_id, "C15", c.label, c.entity_type, c.definition,
      json(c.examples), json(c.source_relation_ids.map(relMap)), "researcher_confirmed");
  }

  const insSC = db.prepare(`INSERT INTO shared_concepts (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of activeCandidates) {
    insSC.run(c.candidate_id, c.label, c.definition, c.entity_type, c.boundary ?? "",
      json(["C15"]), json(c.supporting_native_ids), json([]), "L2-C15-v1.0",
      "candidate_single_case");
  }

  for (const a of amendments) {
    if (a.shared_concept_id !== "SC-C01-156") continue;
    const row = db.prepare("SELECT negative_examples FROM shared_concepts WHERE id = ?").get("SC-C01-156") as { negative_examples: string } | undefined;
    if (!row) continue;
    const negs = JSON.parse(row.negative_examples || "[]") as string[];
    if (!negs.includes(a.negative_example)) negs.push(a.negative_example);
    db.prepare("UPDATE shared_concepts SET negative_examples = ? WHERE id = ?").run(json(negs), "SC-C01-156");
  }

  const insMap = db.prepare(`INSERT INTO concept_mappings (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope, evidence_ids, decision, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of mappings) {
    insMap.run(m.mapping_id, "C15", m.native_concept_id, m.shared_concept_id ?? null,
      m.mapping_type, m.basis, m.scope, json(m.evidence_ids.map(evMap)),
      "researcher_confirmed", "L2-C15-v1.0");
  }

  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset', 'caseflow-c01-c15')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_note', 'C01–C11 冻结版 + C12 Eastserve + C13 Motor City Mapping + C14 劲松北 + C15 春江小区（G0–G6 与 L2 已完成）')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_imported_at', ?)").run(new Date().toISOString());
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c15_import_version', 'L2-C15-v1.0')").run();

  const insDoc = db.prepare(`INSERT INTO search_docs (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const addDoc = (kind: string, refId: string, caseId: string | null, entityId: string | null, title: string, subtitle: string, body: string) => {
    const info = db.prepare("INSERT INTO vec_search (embedding) VALUES (?)").run(embeddingBuffer(`${title} ${subtitle} ${body}`));
    insDoc.run(Number(info.lastInsertRowid), kind, refId, caseId, entityId, title, subtitle, body);
  };
  addDoc("case", "C15", "C15", null, "上海五里桥街道春江小区数字化更新", "案例 · 中国 · 2021—2023", `${CASE_SUMMARY} ${CASE_TAGS.join("，")} ${processes.map((p) => p.narrative.join(" ")).join(" ")}`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    addDoc("entity", id, "C15", id, e.label, `实体 · ${e.entity_type}`, `${e.label} ${e.definition} ${(e.aliases ?? []).join(" ")}`);
  }
  for (const e of evidence) {
    const mat = matById.get(e.material_id);
    addDoc("evidence", evMap(e.evidence_id), "C15", null, `${mat?.name ?? "C15"} · ${e.evidence_id}`, `证据 · ${e.verification_status}`, `${e.statement} ${e.quote_or_span} ${e.locator}`);
  }
  for (const m of materials) {
    addDoc("material", matMap(m.material_id), "C15", null, m.name, `材料 · ${KIND_MAP[m.source_type] ?? m.source_type} · ${m.date}`, `${m.scope} ${m.link} ${m.notes}`);
  }
  for (const p of processes) {
    addDoc("process", p.process_id, "C15", null, p.title, `过程 · ${p.time_range}`, p.narrative.join(" "));
  }
  for (const f of facts) {
    addDoc("fact", factMap(f.fact_id), "C15", null, f.statement.slice(0, 80), `事实 · ${f.fact_status}`, f.statement);
  }
  for (const c of nativeConcepts) {
    addDoc("native_concept", c.native_concept_id, "C15", null, c.label, `原生概念 · ${c.entity_type}`, `${c.definition} ${(c.examples ?? []).join(" ")}`);
  }
});

tx();
db.pragma("wal_checkpoint(TRUNCATE)");
console.log("C15 import committed");
db.close();
