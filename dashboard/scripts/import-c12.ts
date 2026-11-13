import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import { embeddingBuffer } from "../server/embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const CASE_DIR = path.join(DATA_DIR, "cases", "C12-eastserve");
const read = (p: string) => JSON.parse(fs.readFileSync(path.join(CASE_DIR, p), "utf8"));

const db = new Database(DB_PATH);
sqliteVec.load(db);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = OFF");

const entities = read("entities.json").entities as any[];
const materials = read("materials_v0.3.json").materials as any[];
const evidence = read("evidence.json").evidence as any[];
const processes = read("process.json").processes as any[];
const facts = read("facts.json").facts as any[];
const relations = read("relations_v1.1.json").relations as any[];
const nativeConcepts = read(path.join("concepts", "native_concepts_v0.3.json")).active_concepts as any[];
const sharedConcepts = read(path.join("concepts", "shared_concepts_v1.0.json")).shared_concepts as any[];
const mappings = read(path.join("concepts", "concept_mappings_v1.0.json")).mappings as any[];

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = path.join(DATA_DIR, "_backup", `community-renewal.db.before-c12-${stamp}.db`);
fs.mkdirSync(path.dirname(backup), { recursive: true });
db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
console.log("backup:", backup);

const entityIdMap = new Map<string, string>();
const counters: Record<string, number> = {};
for (const e of entities) {
  const t = e.entity_type as string;
  counters[t] = (counters[t] ?? 0) + 1;
  entityIdMap.set(e.entity_id, `C12-${t}-${String(counters[t]).padStart(3, "0")}`);
}
const evMap = (id: string) => `C12-${id}`;
const relMap = (id: string) => `C12-${id}`;
const factMap = (id: string) => `C12-${id}`;
const json = (v: any) => JSON.stringify(v ?? []);

const PRED_LABELS: Record<string, string> = {
  established_under: "设立于", funded_by: "资助方", submitted_bid_to: "提交投标", targets: "面向",
  deploys: "部署", launches: "发布", leads_private_partnership_for: "牵头私营合作", provides: "提供",
  plans: "计划", offers: "提供选项", establishes: "建立", accountable_for: "问责", distributes: "分发",
  provides_loans_for: "提供贷款", contracts_with: "签约", installs: "安装", prices: "定价",
  trains: "培训", records: "记录", ends_funding_for: "结束资助", covers: "覆盖", employs: "雇佣",
  advises: "建议", supports: "支持", states_reason: "陈述理由", manages: "管理", operates: "运营",
  enters_liquidation: "进入清算", shares_insolvency_practitioner_with: "共用清算人", concludes: "结束",
  dissolves: "解散", acquires: "收购", upgrades: "升级", operates_under_brand: "品牌运营",
  addresses_task: "对应任务", has_capability: "具备能力", supplies: "供应", uses: "使用",
  legal_continuity_with: "法人连续性"
};

const CASE_SUMMARY = "东曼彻斯特 Eastserve 是以 NDC/Beacons 与 DfES Wired Up Communities 为制度起点，面向 Beswick、Clayton、Openshaw 的家庭数字接入与社区无线宽带项目。";
const CASE_TAGS = ["数字包容", "社区无线网络", "Eastserve", "英国"];

const tx = db.transaction(() => {
  db.prepare("DELETE FROM relation_evidence_links WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM relation_process_links WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM relations WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM facts WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM processes WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM evidence WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM materials WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM native_concepts WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM concept_mappings WHERE id LIKE 'MAP-C12-%'").run();
  db.prepare("DELETE FROM shared_concepts WHERE id IN ('SC-C12-101','SC-C12-102')").run();
  db.prepare("DELETE FROM entity_roles WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM case_entities WHERE case_id = 'C12'").run();
  db.prepare("DELETE FROM entities WHERE id LIKE 'C12-%'").run();
  db.prepare("DELETE FROM cases WHERE id = 'C12'").run();
  db.prepare("DELETE FROM vec_search WHERE rowid IN (SELECT rowid FROM search_docs WHERE case_id = 'C12')").run();
  db.prepare("DELETE FROM search_docs WHERE case_id = 'C12'").run();

  db.prepare(`INSERT INTO cases
    (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild, event_start, event_end, scope, evidence_cutoff, research_question, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run("C12", "C12", 12, "Eastserve", "Eastserve", "英国", "曼彻斯特", "2000—2017", "2000—2017年", "#4f6d7a", "network",
      json(CASE_TAGS), CASE_SUMMARY, json(processes.map((p) => p.narrative)),
      "2000", "2017", "东曼彻斯特 Beswick、Clayton、Openshaw；核心实施 2000–2010，2011–2017 为服务延续、组织退出与基础设施转移",
      "2026-11-13", "Eastserve 如何组合设备、培训、本地内容与社区支持？无线宽带如何进入？参与机制如何运作？公共项目如何转向私营/社会企业运营？", "frozen");

  const insEntity = db.prepare(`INSERT INTO entities (id, name, name_en, type, description, definition, role_types) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insRole = db.prepare(`INSERT OR REPLACE INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`);
  const insCaseEntity = db.prepare(`INSERT OR REPLACE INTO case_entities (case_id, entity_id) VALUES (?, ?)`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    insEntity.run(id, e.label, e.label, e.entity_type, e.definition, e.definition, json(e.roles));
    for (const r of e.roles) insRole.run("C12", id, r);
    insCaseEntity.run("C12", id);
  }

  const kindMap: Record<string, string> = {
    project_document: "项目文件", independent_evaluation: "独立评估", academic_conference_paper: "学术论文",
    academic_book_chapter: "学术专著章节", government_case_library: "政府案例", local_media: "地方媒体",
    national_media: "全国媒体", regional_business_media: "区域商业媒体", official_registry: "官方登记",
    web_archive: "网页存档", policy_essay: "政策评论", programme_report: "项目报告",
    local_government_trade_media: "行业媒体", community_media: "社区媒体", regeneration_magazine: "更新杂志",
    telecom_trade_media: "电信行业媒体", regional_news: "区域新闻"
  };
  const insMat = db.prepare(`INSERT INTO materials
    (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of materials) {
    insMat.run(`C12-${m.material_id}`, "C12", m.name, kindMap[m.source_type] ?? m.source_type, m.author_or_org, m.date,
      "C12 案例知识包", (m.scope ?? "").slice(0, 500), m.source_type, m.verification_status, m.scope, m.link, m.reliability, m.notes);
  }

  const entityIdsByEvidence = new Map<string, Set<string>>();
  const statusByEvidence = new Map<string, Map<string, number>>();
  const addEvEnt = (eid: string, eidb: string) => {
    if (!entityIdsByEvidence.has(eid)) entityIdsByEvidence.set(eid, new Set());
    entityIdsByEvidence.get(eid)!.add(eidb);
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
    const strength = e.verification_status === "verified_full_text" ? "high"
      : e.verification_status.startsWith("partial") ? "medium" : "low";
    insEv.run(evMap(e.evidence_id), "C12", e.statement, e.quote_or_span, mat?.name ?? "C12 材料",
      e.locator, strength, json([...(entityIdsByEvidence.get(e.evidence_id) ?? [])]),
      `C12；${mid}；${e.locator}`, status, e.verification_status,
      json([...(processIdsByEvidence.get(e.evidence_id) ?? [])]),
      json([...(factIdsByEvidence.get(e.evidence_id) ?? [])].map(factMap)),
      `C12-${mid}`);
  }

  const actorNameMap: Record<string, string[]> = {
    "Manchester City Council": ["A08"], "New Deal for Communities / Beacons for a Brighter Future": ["A09", "A10"],
    "New East Manchester Ltd": ["A09"], "ClicksandLinks Ltd": ["A12"], "East Manchester residents": ["A23"],
    "Eastserve project team": ["A01"], "Eastserve steering group / Eastserve Partnership": ["A01"],
    "Residents' Panel": ["A14"], "Community champions": ["A15"], "ITEM": ["A16"], "MANCAT": ["A17"],
    "local credit union": ["A18"], "BT": ["A19"], "Eastserve": ["A01"], "17 schools": ["A24"],
    "8 UK Online / online centres": ["A25"], "UK Online centres": ["A25"], "local schools": ["A24"],
    "residents": ["A23"], "NWDA": ["A21"], "IntelCities": ["A26"], "Symera Technologies": ["A04"],
    "Symera Eastserve Ltd": ["A04"], "CityServe (999) Ltd": ["A05"], "ITS Technology": ["A07"],
    "CityServe": ["A06"], "CityServe business": ["A06"], "Ian Michael Rose (liquidator)": ["A22"],
    "SMEs": ["G06"], "Manchester City Council / New East Manchester (context)": ["A08", "A09"],
    "Symera Eastserve Ltd (shell)": ["A04"]
  };
  const insProc = db.prepare(`INSERT INTO processes (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of processes) {
    const actorIds = (p.actor_ids as string[]).flatMap((n) => actorNameMap[n] ?? []).map((a) => entityIdMap.get(a)).filter(Boolean);
    insProc.run(p.process_id, "C12", p.title, p.time_range, p.narrative, json([...new Set(actorIds)]), json(p.event_ids.map((x: string) => x)), json(p.evidence_ids.map(evMap)), "frozen", 1);
  }

  const insFact = db.prepare(`INSERT INTO facts (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of facts) {
    const roles = f.entity_roles.map((r: string) => {
      const [eid, role] = r.split(":");
      return `${entityIdMap.get(eid)}:${role}`;
    });
    insFact.run(factMap(f.fact_id), "C12", f.statement, json(roles), json(f.evidence_ids.map(evMap)),
      f.fact_status, f.time_scope, f.space_scope, f.quantity_scope, f.confidence, "G4 researcher_confirmed; C12 Eastserve");
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
    const label = PRED_LABELS[r.predicate] ?? r.predicate;
    insRel.run(id, "C12", entityIdMap.get(r.head_entity), entityIdMap.get(r.tail_entity), r.predicate, label, 1.6,
      r.fact_status, r.qualifiers, json(r.process_ids), json(evids), r.head_type, r.tail_type,
      "G6 researcher_confirmed; C12 Eastserve", "L2-C12@2026-11-13", fids[0] ?? null, json(evids), json([]), "verified_full_text");
    for (const pid of r.process_ids) insRPL.run(id, "C12", pid, fids[0] ?? null, json(evids), json([]), "verified_full_text");
    for (const ev of evids) insREL.run(id, "C12", ev);
  }

  const insNC = db.prepare(`INSERT INTO native_concepts (id, case_id, label, entity_type, definition, examples, source_relation_ids, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of nativeConcepts) {
    insNC.run(c.native_concept_id, "C12", c.label, c.entity_type, c.definition, json(c.examples), json(c.source_relation_ids.map(relMap)), "researcher_confirmed");
  }

  const insSC = db.prepare(`INSERT INTO shared_concepts (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of sharedConcepts) {
    insSC.run(c.id, c.label, c.definition, c.entity_type, c.scope, json(c.supporting_case_ids), json(c.supporting_native_ids), json(c.negative_examples), c.version, "researcher_confirmed");
  }

  const insMap = db.prepare(`INSERT INTO concept_mappings (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope, evidence_ids, decision, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of mappings) {
    const evids = (m.evidence_ids as string[]).map((e) => e.startsWith("M") ? evMap(e) : e);
    insMap.run(m.mapping_id, m.case_id, m.native_concept_id, m.shared_concept_id ?? null, m.mapping_type, m.basis, m.scope, json(evids), m.decision, m.version);
  }

  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset', 'caseflow-c01-c12')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_note', 'C01–C11 冻结版 + C12 Eastserve（G0–G6 与 L2 已完成）')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_imported_at', ?)").run(new Date().toISOString());
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c12_import_version', 'L2-C12-shared-v1.0')").run();

  const insDoc = db.prepare(`INSERT INTO search_docs (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const addDoc = (kind: string, refId: string, caseId: string | null, entityId: string | null, title: string, subtitle: string, body: string) => {
    const info = db.prepare("INSERT INTO vec_search (embedding) VALUES (?)").run(embeddingBuffer(`${title} ${subtitle} ${body}`));
    insDoc.run(Number(info.lastInsertRowid), kind, refId, caseId, entityId, title, subtitle, body);
  };
  addDoc("case", "C12", "C12", null, "Eastserve", "案例 · 英国 · 2000—2017", `${CASE_SUMMARY} ${CASE_TAGS.join("，")} ${processes.map((p) => p.narrative).join(" ")}`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    addDoc("entity", id, "C12", id, e.label, `实体 · ${e.entity_type}`, `${e.label} ${e.definition} ${(e.aliases ?? []).join(" ")}`);
  }
  for (const e of evidence) {
    const mat = matById.get(e.material_id);
    addDoc("evidence", evMap(e.evidence_id), "C12", null, `${mat?.name ?? "C12"} · ${e.evidence_id}`, `证据 · ${e.verification_status}`, `${e.statement} ${e.quote_or_span} ${e.locator}`);
  }
  for (const m of materials) {
    addDoc("material", `C12-${m.material_id}`, "C12", null, m.name, `材料 · ${kindMap[m.source_type] ?? m.source_type} · ${m.date}`, `${m.scope} ${m.link} ${m.notes}`);
  }
});
tx();
db.pragma("wal_checkpoint(TRUNCATE)");
console.log("C12 import committed");
db.close();
