import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import { embeddingBuffer } from "../server/embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const CASE_DIR = path.join(DATA_DIR, "cases", "C19-connect-east-cleveland");
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
const relations = read("relations_v1.0.json").relations as any[];
const nativeConcepts = read("native_concepts.json").native_concepts as any[];
const candidates = read("concepts/shared_concept_candidates.json").candidates as any[];
const mappings = read("concepts/concept_mapping.json").mappings as any[];
const network = read("concepts/knowledge_network_C19_update.json");

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = path.join(DATA_DIR, "_backup", `community-renewal.db.before-c19-${stamp}.db`);
fs.mkdirSync(path.dirname(backup), { recursive: true });
db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
console.log("backup:", backup);

const entityIdMap = new Map<string, string>();
const counters: Record<string, number> = {};
for (const e of entities) {
  const t = e.entity_type as string;
  counters[t] = (counters[t] ?? 0) + 1;
  entityIdMap.set(e.entity_id, `C19-${t}-${String(counters[t]).padStart(3, "0")}`);
}
const evMap = (id: string) => `C19-${id}`;
const relMap = (id: string) => `C19-${id}`;
const factMap = (id: string) => `C19-${id}`;
const json = (v: any) => JSON.stringify(v ?? []);

const PRED_LABELS: Record<string, string> = {
  produced: "产出", provides: "提供", used: "使用", includes: "包含",
  participated_in: "参与", organized: "组织", located_at: "位于", planned: "计划",
  funded: "资助", context_for: "情境支撑", targeted: "面向", has_jurisdiction_over: "管辖",
  completed: "完成", measured_preference_for: "测量偏好", defined_target_area: "界定目标区",
  acts_as_master_developer_of: "担任主导开发商", targets: "指向", acquired: "取得",
  partnered_in: "合作参与", established: "组建", hired: "聘请",
  set_priorities_for: "设定优先级", informed: "形成输入", visualized: "可视化",
  prompted: "提示", generated: "生成", supplied: "提供平台", co_hosted: "共同主办",
  ranked: "排序", leads: "牵头", operationalized_by: "落实为", reports_reach_of: "报告覆盖",
  installed: "安装", cleared_and_planted: "清表种植", supports: "支持", granted: "授予",
  contributes_to: "参与贡献", renovated: "改造", opened: "开业", locked_out: "锁闭（争议）",
  sued: "起诉", settled_with: "和解", attempted_to_buy: "尝试购买", broke_ground: "破土",
  demanded: "要求", challenged: "质疑", constrains: "约束", part_of: "属于",
  contains: "包含空间", adjacent_to: "邻近", guides: "指导", complements: "互补",
  proposes: "提出", scheduled: "安排", specifies: "指定", administered_to: "施测于"
};

const KIND_MAP: Record<string, string> = {
  project_report: "项目报告", project_article: "项目文章", project_retrospective: "项目回顾",
  project_press_release: "项目新闻稿", project_marketing_blog: "项目营销文",
  project_news: "项目新闻", project_news_repost: "项目新闻转载",
  website_archive: "网页存档", vendor_case_study: "供应商案例", vendor_blog: "供应商文章",
  ngo_blog: "社区组织博客", institutional_retrospective: "机构回顾",
  independent_tv_news: "独立电视新闻", independent_local_news: "独立地方新闻",
  independent_alt_weekly: "独立周报", independent_nonprofit_news: "独立非营利新闻",
  certifier_case_study: "认证机构案例", advocacy_polemic: "倡导/争议文章",
  prior_plan: "前置规划", prior_plan_webpage: "前置规划说明"
};

const CASE_SUMMARY = "东克利夫兰 Connect East Cleveland（Connect EC）是 Cuyahoga Land Bank 主导、Seventh Hill 等执行的场所营造参与过程：2023 年通过公共活动、步行踏勘、3D 模型、AR 壁画与 UrbanistAI 生成图像形成 30 项行动，2024–2025 进入绿道、街道家具、Mickey’s 改造与 Phase 1 建设。";
const CASE_TAGS = ["场所营造", "社区参与", "AI辅助设计", "美国"];

const tx = db.transaction(() => {
  db.prepare("DELETE FROM relation_evidence_links WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM relation_process_links WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM relations WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM facts WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM processes WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM evidence WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM materials WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM native_concepts WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM concept_mappings WHERE id LIKE 'MAP-C19-%'").run();
  db.prepare("DELETE FROM shared_concepts WHERE id LIKE 'SC-C19-%'").run();
  db.prepare("DELETE FROM entity_roles WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM case_entities WHERE case_id = 'C19'").run();
  db.prepare("DELETE FROM entities WHERE id LIKE 'C19-%'").run();
  db.prepare("DELETE FROM cases WHERE id = 'C19'").run();
  db.prepare("DELETE FROM vec_search WHERE rowid IN (SELECT rowid FROM search_docs WHERE case_id = 'C19')").run();
  db.prepare("DELETE FROM search_docs WHERE case_id = 'C19'").run();

  db.prepare(`INSERT INTO cases
    (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild, event_start, event_end, scope, evidence_cutoff, research_question, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run("C19", "C19", 19, "Connect East Cleveland", "Connect East Cleveland", "美国", "东克利夫兰",
      "2023—2025", "2023—2025年", "#a45a3a", "network", json(CASE_TAGS), CASE_SUMMARY,
      json(processes.map((p) => p.narrative)),
      "2023-01", "2025-12",
      "东克利夫兰 Circle East District，约 30 英亩，沿 Euclid Avenue，跨东克利夫兰/克利夫兰边界；核心 2023 参与与报告，2024–2025 实施",
      "2026-11-13",
      "参与技术组合（3D 模型、AR、UrbanistAI、问卷/故事）如何进入场所营造？带薪本地 Street Team Leader 如何制度化地方知识？居民偏好如何转译为 30 项行动？2023 年后哪些行动进入资金、设计与建设？",
      "frozen");

  const insEntity = db.prepare(`INSERT INTO entities (id, name, name_en, type, description, definition, role_types) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insRole = db.prepare(`INSERT OR REPLACE INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`);
  const insCaseEntity = db.prepare(`INSERT OR REPLACE INTO case_entities (case_id, entity_id) VALUES (?, ?)`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    insEntity.run(id, e.label, e.label, e.entity_type, e.definition, e.definition, json(e.roles));
    for (const r of e.roles) insRole.run("C19", id, r);
    insCaseEntity.run("C19", id);
  }

  const insMat = db.prepare(`INSERT INTO materials
    (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of materials) {
    insMat.run(`C19-${m.material_id}`, "C19", m.name, KIND_MAP[m.source_type] ?? m.source_type,
      m.author_or_org, m.date, "C19 案例知识包", (m.scope ?? "").slice(0, 500),
      m.source_type, m.verification_status, m.scope, m.link, m.reliability, m.notes);
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
    const mat = matById.get(e.material_id);
    const st = statusByEvidence.get(e.evidence_id);
    let status: string | null = null;
    if (st && st.size) status = [...st.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const vs = String(e.verification_status ?? "");
    const strength = vs.includes("verified") ? "high" : vs.includes("partial") ? "medium" : "low";
    insEv.run(evMap(e.evidence_id), "C19", e.statement, e.quote_or_span, mat?.name ?? "C19 材料",
      e.locator, strength, json([...(entityIdsByEvidence.get(e.evidence_id) ?? [])]),
      `C19；${e.material_id}；${e.locator}`, status, e.verification_status,
      json([...(processIdsByEvidence.get(e.evidence_id) ?? [])]),
      json([...(factIdsByEvidence.get(e.evidence_id) ?? [])].map(factMap)),
      `C19-${e.material_id}`);
  }

  const actorLookup: Array<[string, string]> = [
    ["Cuyahoga Land Bank", "A01"], ["City of East Cleveland", "A02"], ["East Cleveland City Council", "A03"],
    ["Seventh Hill", "A04"], ["Agnes Studio", "A05"], ["Layer Cake Design", "A06"],
    ["Najae Jackson", "A07"], ["East Cleveland residents", "A08"], ["East Cleveland youth", "A09"],
    ["3MB Mentoring Program", "A10"], ["UrbanistAI", "A11"], ["Cuyahoga County", "A12"],
    ["Cuyahoga Land Bank Charities", "A13"], ["Loiter Cafe", "A14"], ["Verdynt Bio Labs", "A15"],
    ["GCRTA", "A16"], ["Phase 1 private builders", "A17"], ["four private builders", "A17"],
    ["Ingenuity Cleveland", "A18"], ["Connect EC 项目团队", "A19"]
  ];
  const actorId = (name: string) => {
    const hit = actorLookup.find(([k]) => name.includes(k) || k.includes(name));
    return hit ? entityIdMap.get(hit[1]) : undefined;
  };

  const insProc = db.prepare(`INSERT INTO processes (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of processes) {
    const actorIds = [...new Set((p.actor_ids as string[]).map(actorId).filter(Boolean))];
    insProc.run(p.process_id, "C19", p.title, p.time_range, p.narrative, json(actorIds),
      json(p.event_ids), json(p.evidence_ids.map(evMap)), "frozen", 1);
  }

  const insFact = db.prepare(`INSERT INTO facts (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of facts) {
    const roles = f.entity_roles.map((r: string) => {
      const [eid, role] = r.split(":");
      return `${entityIdMap.get(eid)}:${role}`;
    });
    insFact.run(factMap(f.fact_id), "C19", f.statement, json(roles), json(f.evidence_ids.map(evMap)),
      f.fact_status, f.time_scope, f.space_scope, f.quantity_scope, f.confidence, "G4 researcher_confirmed; C19 Connect EC");
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
    insRel.run(id, "C19", entityIdMap.get(r.head_entity), entityIdMap.get(r.tail_entity), r.predicate, label,
      1.6, r.fact_status, r.qualifiers, json(r.process_ids), json(evids), r.head_type, r.tail_type,
      "G6 researcher_confirmed; C19 Connect EC", "L2-C19-v1.0", fids[0] ?? null, json(evids), json([]), "verified_full_text");
    for (const pid of r.process_ids) insRPL.run(id, "C19", pid, fids[0] ?? null, json(evids), json([]), "verified_full_text");
    for (const ev of evids) insREL.run(id, "C19", ev);
  }

  const insNC = db.prepare(`INSERT INTO native_concepts (id, case_id, label, entity_type, definition, examples, source_relation_ids, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of nativeConcepts) {
    insNC.run(c.native_concept_id, "C19", c.label, c.entity_type, c.definition,
      json([c.examples]), json(c.source_relation_ids.map(relMap)), "researcher_confirmed");
  }

  const insSC = db.prepare(`INSERT INTO shared_concepts (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of candidates) {
    insSC.run(c.candidate_id, c.label, c.definition, c.entity_type, c.scope,
      json(c.supporting_case_ids), json(c.supporting_native_ids), json(c.negative_examples),
      "L2-C19-v1.0", "candidate_single_case");
  }
  const updSC = db.prepare(`UPDATE shared_concepts SET supporting_case_ids = ?, supporting_native_ids = ?, version = ?, review = ? WHERE id = ?`);
  for (const u of network.existing_concept_updates) {
    const row = db.prepare("SELECT supporting_case_ids, supporting_native_ids FROM shared_concepts WHERE id = ?").get(u.shared_concept_id) as any;
    if (!row) continue;
    const oldCases: string[] = JSON.parse(row.supporting_case_ids || "[]").filter((x: string) => x !== "C19");
    const oldNats: string[] = JSON.parse(row.supporting_native_ids || "[]").filter((x: string) => !x.startsWith("NC-C19-"));
    const newCases = [...new Set([...oldCases, "C19"])];
    const newNats = [...new Set([...oldNats, ...u.appended_native_ids])];
    updSC.run(json(newCases), json(newNats), "L2-C19-v1.0", "researcher_confirmed", u.shared_concept_id);
  }

  const insMap = db.prepare(`INSERT INTO concept_mappings (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope, evidence_ids, decision, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of mappings) {
    const evids = (m.evidence_ids as string[]).map((e) => e.startsWith("M") ? evMap(e) : e);
    insMap.run(m.mapping_id, "C19", m.native_concept_id, m.shared_concept_id ?? null, m.mapping_type,
      m.basis, m.scope, json(evids), m.decision, m.version);
  }

  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset', 'caseflow-c01-c19')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_note', 'C01–C18 + C19 Connect East Cleveland（G0–G6 与 L2 已完成）')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_imported_at', ?)").run(new Date().toISOString());
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c19_import_version', 'L2-C19-v1.0')").run();

  const insDoc = db.prepare(`INSERT INTO search_docs (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const addDoc = (kind: string, refId: string, caseId: string | null, entityId: string | null, title: string, subtitle: string, body: string) => {
    const info = db.prepare("INSERT INTO vec_search (embedding) VALUES (?)").run(embeddingBuffer(`${title} ${subtitle} ${body}`));
    insDoc.run(Number(info.lastInsertRowid), kind, refId, caseId, entityId, title, subtitle, body);
  };
  addDoc("case", "C19", "C19", null, "Connect East Cleveland", "案例 · 美国 · 2023—2025", `${CASE_SUMMARY} ${CASE_TAGS.join("，")} ${processes.map((p) => p.narrative).join(" ")}`);
  for (const e of entities) {
    const id = entityIdMap.get(e.entity_id)!;
    addDoc("entity", id, "C19", id, e.label, `实体 · ${e.entity_type}`, `${e.label} ${e.definition} ${(e.aliases ?? []).join(" ")}`);
  }
  for (const e of evidence) {
    const mat = matById.get(e.material_id);
    addDoc("evidence", evMap(e.evidence_id), "C19", null, `${mat?.name ?? "C19"} · ${e.evidence_id}`, `证据 · ${e.verification_status}`, `${e.statement} ${e.quote_or_span} ${e.locator}`);
  }
  for (const m of materials) {
    addDoc("material", `C19-${m.material_id}`, "C19", null, m.name, `材料 · ${KIND_MAP[m.source_type] ?? m.source_type} · ${m.date}`, `${m.scope} ${m.link} ${m.notes}`);
  }
});

tx();
db.pragma("wal_checkpoint(TRUNCATE)");
console.log("C19 import committed");
db.close();
