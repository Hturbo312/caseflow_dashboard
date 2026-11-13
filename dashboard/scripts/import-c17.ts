import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import { embeddingBuffer } from "../server/embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const CASE_DIR = path.join(DATA_DIR, "cases", "C17-ramani-huria");
const read = (p: string) => JSON.parse(fs.readFileSync(path.join(CASE_DIR, p), "utf8"));
const json = (v: any) => JSON.stringify(v ?? []);

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
const nativeConcepts = read("concepts/native_concept_inventory.json").concepts as any[];
const sharedConcepts = read("concepts/shared_concept_candidates.json").sharedConceptCandidates as any[];
const mappings = read("concepts/concept_mappings.json").mappings as any[];
const caseScope = read("case_pack.json");

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = path.join(DATA_DIR, "_backup", `community-renewal.db.before-c17-${stamp}.db`);
fs.mkdirSync(path.dirname(backup), { recursive: true });
db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`);
console.log("backup:", backup);

const entityIdMap = new Map<string, string>();
const counters: Record<string, number> = {};
for (const e of entities) {
  const t = e.type as string;
  counters[t] = (counters[t] ?? 0) + 1;
  entityIdMap.set(e.id, `C17-${t}-${String(counters[t]).padStart(3, "0")}`);
}
const evMap = (id: string) => `C17-${id}`;
const factMap = (id: string) => `C17-${id}`;
const relMap = (id: string) => `C17-${id}`;
const matMap = (id: string) => `C17-${id}`;

const PRED_TYPES: Record<string, string> = {
  影响: "affect", 共建: "co_establish", 支持: "support", 指导实施: "guide_implementation",
  承办: "host", 召集: "convene", 签发许可: "issue_permit", 共同确定: "co_determine",
  开展: "conduct", 参与: "participate", 先于: "precede", 招募: "recruit",
  实施: "implement", 覆盖: "cover", 培训: "train", 组织: "organize",
  提供场地: "provide_venue", 使用: "use", 制图: "map", 产出: "produce",
  交付: "deliver", 授权: "authorize", 执行: "execute", 上传: "upload",
  编制: "compile", 发布: "publish", 管理: "manage", 收到: "receive",
  建立: "establish", "与…签署 MoU": "sign_mou", 启动: "launch", 需要: "require",
  移交管理权: "transfer_management", "由…组成": "comprise", 合作: "cooperate",
  承接自: "absorb_from", 继承: "inherit", 具备: "has_capability", 复制: "replicate",
  采集: "collect", 验证: "validate", 用于验证: "used_to_validate", 提升: "improve",
  补充: "supplement", 辅助: "assist", 支撑: "underpin", 保障: "ensure",
  作为输入: "input_to", 接收: "receive_maps", 提供: "provide", 生成: "generate",
  识别: "identify", 运用: "apply", 牵头: "lead"
};

const ACTOR_MAP: Record<string, string[]> = {
  HOT: ["E-A01"], "Tandale 社区成员": ["E-A24"], 学生志愿者: ["E-A23"], 世界银行: ["E-A02"],
  GFDRR: ["E-A04"], DFID: ["E-A03"], 红十字会: ["E-A05"], COSTECH: ["E-A08"],
  "Ardhi University": ["E-A06"], UDSM: ["E-A07"], 达累斯萨拉姆市议会: ["E-A09"],
  "Ilala/Kinondoni/Temeke 市议会": ["E-A10"], TODI: ["E-A11"], "BUNI Hub": ["E-A12"],
  "约 15 名实习生": ["E-A23"], "Ndugumbi/Tandale/Mchikichini 社区": ["E-A24"],
  "150 名学生": ["E-A23"], "15 名学生督导": ["E-A23"], 红十字会志愿者: ["E-A25"],
  "ward 政府与社区": ["E-A26", "E-A24"], "Vingunguti ward 办公室": ["E-A26"],
  "Vingunguti 社区成员": ["E-A24"], 坦桑尼亚红十字会志愿者: ["E-A25"],
  "Ardhi/UDSM 学生": ["E-A23"], 世界银行代表: ["E-A02"],
  "20 名制图员与 2 名督导": ["E-A27"], 排水制图队: ["E-A27"],
  "MapGive（美国国务院）": [], "36 个外围 ward 的社区与政府": ["E-A24", "E-A10"],
  "达累斯萨拉姆市议会与市辖区": ["E-A09", "E-A10"], "21 个社区 ward": ["E-A24"],
  "印刷与数据使用者": [], 政府官员: ["E-A26"], 学生: ["E-A23"], "450+ 学生": ["E-A23"],
  "社区成员与 ward 领导": ["E-A24", "E-A26"], Deltares: ["E-A18"], "Nipe Fagio": ["E-A19"],
  "Tanzania Resilience Academy": ["E-A13"], SUZA: ["E-A14"], "University of Turku": ["E-A15"],
  OMDTZ: ["E-A16"], DarMAERT: ["E-A20"], 三所大学: ["E-A07", "E-A06", "E-A14"],
  "200 名学生": ["E-A23"], "20 个 ward 的社区成员": ["E-A24"],
  "HOT/OMDTZ 技术人员": ["E-A01", "E-A16"], "Spatial Collective": ["E-A17"], IRDP: ["E-A21"],
  "St. Augustine University of Tanzania": ["E-A22"], "Mwanza 社区与地方政府": ["E-A24"]
};

const tx = db.transaction(() => {
  for (const table of ["relation_evidence_links", "relation_process_links", "relations", "facts", "processes", "evidence", "materials", "native_concepts", "concept_mappings", "entity_roles", "case_entities"]) {
    db.prepare(`DELETE FROM ${table} WHERE case_id = 'C17'`).run();
  }
  db.prepare("DELETE FROM entities WHERE id LIKE 'C17-%'").run();
  db.prepare("DELETE FROM shared_concepts WHERE id LIKE 'SC-C17-%'").run();
  db.prepare("DELETE FROM review_decisions WHERE packet_id LIKE 'RP-C17-%'").run();
  db.prepare("DELETE FROM review_packets WHERE id LIKE 'RP-C17-%'").run();
  db.prepare("DELETE FROM cases WHERE id = 'C17'").run();
  db.prepare("DELETE FROM vec_search WHERE rowid IN (SELECT rowid FROM search_docs WHERE case_id = 'C17')").run();
  db.prepare("DELETE FROM search_docs WHERE case_id = 'C17'").run();

  db.prepare(`INSERT INTO cases
    (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild, event_start, event_end, scope, evidence_cutoff, research_question, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(
      "C17", "C17", 17,
      "达累斯萨拉姆参与式洪涝韧性制图（Ramani Huria）",
      "Ramani Huria",
      "坦桑尼亚", "达累斯萨拉姆",
      "2015—2021", "2015—2021年",
      "#2f6b66", "network",
      json(["洪涝韧性", "参与式制图", "OpenStreetMap", "社区参与", "坦桑尼亚"]),
      "Ramani Huria（斯瓦希里语“达市开放地图”）是 2015—2021 年在达累斯萨拉姆开展的社区参与式制图项目：以大学生与社区成员为主体制图 65 个 ward，生产 OSM 开放数据与洪水风险图集，2017 年进入排水重测与 228 个 subward 资产—威胁制图，2019 年移交坦桑尼亚韧性学院。",
      json(processes.map((p) => p.narrative)),
      caseScope.eventStart, caseScope.eventEnd, caseScope.scope, caseScope.evidenceCutoff,
      "参与式制图技术如何进入达累斯萨拉姆的洪涝韧性治理，并在哪些主体—任务—能力配置下转化为可用的洪水风险知识？数据在项目移交后如何被维护或衰减？",
      "frozen"
    );

  const insEntity = db.prepare(`INSERT INTO entities (id, name, name_en, type, description, definition, role_types) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insRole = db.prepare(`INSERT OR REPLACE INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`);
  const insCaseEntity = db.prepare(`INSERT OR REPLACE INTO case_entities (case_id, entity_id) VALUES (?, ?)`);
  for (const e of entities) {
    const id = entityIdMap.get(e.id)!;
    insEntity.run(id, e.label, e.labelEn, e.type, e.definition, e.definition, json(e.roles));
    for (const r of e.roles) insRole.run("C17", id, r);
    insCaseEntity.run("C17", id);
  }

  const kindMap: Record<string, string> = {
    project_atlas: "项目图集", project_website: "项目官网", project_blog: "项目博客",
    implementer_project_page: "实施机构项目页", third_party_case_library: "第三方案例库",
    peer_reviewed_article: "同行评议论文", masters_thesis: "学位论文"
  };
  const insMat = db.prepare(`INSERT INTO materials
    (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of materials) {
    insMat.run(matMap(m.materialId), "C17", m.name, kindMap[m.sourceType] ?? m.sourceType,
      m.authorOrOrg, m.date, "C17 案例知识包", (m.scope ?? "").slice(0, 500),
      m.sourceType, m.verificationStatus, m.scope, m.link, m.reliability, m.notes);
  }

  const entityIdsByEvidence = new Map<string, Set<string>>();
  const statusByEvidence = new Map<string, Map<string, number>>();
  const addEvEnt = (ev: string, entity: string) => {
    if (!entityIdsByEvidence.has(ev)) entityIdsByEvidence.set(ev, new Set());
    entityIdsByEvidence.get(ev)!.add(entity);
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
    const status = st && st.size ? [...st.entries()].sort((a, b) => b[1] - a[1])[0][0] : null;
    const strength = e.verificationStatus === "verified_full_text" ? "high"
      : e.verificationStatus === "abstract_only" ? "low" : "medium";
    insEv.run(evMap(e.id), "C17", e.statement, e.quote, mat?.name ?? "C17 材料",
      e.locator, strength, json([...(entityIdsByEvidence.get(e.id) ?? [])]),
      `C17；${e.materialId}；${e.locator}`, status, e.verificationStatus,
      json([...(processIdsByEvidence.get(e.id) ?? [])]),
      json([...(factIdsByEvidence.get(e.id) ?? [])].map(factMap)),
      matMap(e.materialId));
  }

  const insProc = db.prepare(`INSERT INTO processes (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of processes) {
    const actorIds = (p.actors as string[]).flatMap((n) => ACTOR_MAP[n] ?? []).map((a) => entityIdMap.get(a)).filter(Boolean);
    insProc.run(p.processId, "C17", p.title, p.timeRange, p.narrative,
      json([...new Set(actorIds)]), json(p.events), json(p.evidenceIds.map(evMap)), "frozen", p.revision ?? 1);
  }

  const insFact = db.prepare(`INSERT INTO facts (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of facts) {
    const roles = f.entityRoles.map((r: string) => {
      const [eid, role] = r.split(":");
      return `${entityIdMap.get(eid)}:${role}`;
    });
    insFact.run(factMap(f.id), "C17", f.statement, json(roles), json(f.evidenceIds.map(evMap)),
      f.factStatus, f.timeScope, f.spaceScope, f.quantityScope, f.confidence, "G4 researcher_confirmed; C17 Ramani Huria");
  }

  const insRel = db.prepare(`INSERT INTO relations
    (id, case_id, source, target, type, label, weight, fact_status, qualifiers, process_ids, evidence_ids, head_role, tail_role, review, version, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insRPL = db.prepare(`INSERT OR REPLACE INTO relation_process_links (relation_id, case_id, process_id, fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insREL = db.prepare(`INSERT OR REPLACE INTO relation_evidence_links (relation_id, case_id, evidence_id) VALUES (?, ?, ?)`);
  for (const r of relations) {
    const id = relMap(r.id);
    const evids = r.evidenceIds.map(evMap);
    insRel.run(id, "C17", entityIdMap.get(r.head), entityIdMap.get(r.tail),
      PRED_TYPES[r.predicate] ?? "related", r.predicate, 1.4, r.factStatus, r.qualifiers,
      json(r.processIds), json(evids), r.headType, r.tailType,
      "G6 researcher_confirmed; C17 Ramani Huria", "L2-C17-shared-v1.0", null,
      json(evids), json([]), "verified_full_text");
    for (const pid of r.processIds) insRPL.run(id, "C17", pid, null, json(evids), json([]), "verified_full_text");
    for (const ev of evids) insREL.run(id, "C17", ev);
  }

  const insNC = db.prepare(`INSERT INTO native_concepts (id, case_id, label, entity_type, definition, examples, source_relation_ids, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of nativeConcepts) {
    insNC.run(c.id, "C17", c.label, c.entityType, c.definition, json(c.examples),
      json(c.sourceRelationIds.map(relMap)), "researcher_confirmed");
  }

  const insSC = db.prepare(`INSERT INTO shared_concepts (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of sharedConcepts) {
    insSC.run(c.id, c.label, c.definition, c.entityType, c.scope,
      json(c.supportingCaseIds), json(c.supportingNativeIds), json(c.negativeExamples),
      "L2-C17-shared-v1.0", "candidate_awaiting_second_case");
  }

  const insMap = db.prepare(`INSERT INTO concept_mappings (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope, evidence_ids, decision, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const m of mappings) {
    insMap.run(m.mapping_id, "C17", m.native_concept_id, m.shared_concept_id ?? null, m.mapping_type,
      m.basis, m.scope, json(m.evidence_ids.map(evMap)), m.decision, m.version);
  }

  const packetsDir = path.join(CASE_DIR, "review");
  const packetFiles = fs.readdirSync(packetsDir).filter((f) => f.startsWith("RP-C17-") && f.endsWith(".json"));
  const insPacket = db.prepare(`INSERT OR REPLACE INTO review_packets (id, skill, gate, case_id, scope, payload, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const f of packetFiles) {
    const p = JSON.parse(fs.readFileSync(path.join(packetsDir, f), "utf8"));
    insPacket.run(p.packetId, p.skill, p.gate, p.caseId, p.scope ?? "", json(p), "accepted", "2026-11-13");
  }

  const decisions: any[] = [
    ["RP-C17-G0-v0.1", "modify+accept", "编号 C17；时间边界 C；21 ward 核心；新增第 6 问；数据再利用入结果", "case_scope v1.0", 1],
    ["RP-C17-G1-v0.1", "accept", "全部纳入，按推荐", "M01–M17；M15 交叉核对；M17 摘要级", 1],
    ["RP-C17-G2-v0.1", "accept", "全部接受，按推荐，先推进", "116 条证据接受；感知数据双重标注", 1],
    ["RP-C17-G3-v0.1", "accept", "接受，按推荐", "12 段过程接受", 1],
    ["RP-C17-G4-v0.1", "accept", "接受，按推荐", "78 事实 / 105 实体接受", 1],
    ["RP-C17-G5-v0.1", "accept", "接受，按推荐", "106 条关系接受", 1],
    ["RP-C17-G6-v0.1", "accept_all_proposals", "同意全部处理", "删 R105；改 7；补 R107", 1],
    ["RP-C17-L2-G1-v0.1", "accept", "接受，按推荐", "11 个原生概念接受", 1],
    ["RP-C17-L2-G2-v0.1", "accept", "接受，按推荐", "7 候选 / 19 映射接受", 1],
    ["RP-C17-L2-G3-v0.1", "accept", "接受，按推荐", "7 候选保持 candidate", 1],
    ["RP-C17-L2-G4-v0.1", "accept", "接受，按推荐", "发布 L2-C17-shared-v1.0", 1]
  ];
  const insDec = db.prepare(`INSERT INTO review_decisions (id, packet_id, action, rationale, decided_at, modified_content, allow_next_gate) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  decisions.forEach((d, i) => {
    insDec.run(`RD-C17-${String(i + 1).padStart(2, "0")}`, d[0], d[1], d[2], "2026-11-13", d[3], d[4]);
  });

  const insDoc = db.prepare(`INSERT INTO search_docs (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const addDoc = (kind: string, refId: string, caseId: string | null, entityId: string | null, title: string, subtitle: string, body: string) => {
    const info = db.prepare("INSERT INTO vec_search (embedding) VALUES (?)").run(embeddingBuffer(`${title} ${subtitle} ${body}`));
    insDoc.run(Number(info.lastInsertRowid), kind, refId, caseId, entityId, title, subtitle, body);
  };
  addDoc("case", "C17", "C17", null, "Ramani Huria", "案例 · 坦桑尼亚 · 2015—2021",
    "达累斯萨拉姆参与式洪涝韧性制图。社区与大学生制图 65 个 ward，开放 OSM 数据，2016 图集，2019 移交 Resilience Academy。");
  for (const e of entities) {
    const id = entityIdMap.get(e.id)!;
    addDoc("entity", id, "C17", id, e.label, `实体 · ${e.type}`, `${e.label} ${e.definition} ${(e.aliases ?? []).join(" ")}`);
  }
  for (const e of evidence) {
    addDoc("evidence", evMap(e.id), "C17", null, `${e.id} · ${matById.get(e.materialId)?.name ?? "C17"}`,
      `证据 · ${e.verificationStatus}`, `${e.statement} ${e.quote} ${e.locator}`);
  }
  for (const m of materials) {
    addDoc("material", matMap(m.materialId), "C17", null, m.name,
      `材料 · ${kindMap[m.sourceType] ?? m.sourceType} · ${m.date}`, `${m.scope} ${m.link} ${m.notes}`);
  }
  for (const c of nativeConcepts) {
    addDoc("concept", c.id, "C17", null, c.label, "原生概念", `${c.definition} ${(c.examples ?? []).join(" ")}`);
  }

  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset', 'caseflow-c01-c15-c17')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_note', 'C01–C15 冻结版 + C17 Ramani Huria（G0–G6 与 L2 已完成）')").run();
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('dataset_imported_at', ?)").run(new Date().toISOString());
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('c17_import_version', 'L2-C17-shared-v1.0')").run();
  const media = [
    { file: "/case-media/C17.jpg", caption: "社区居民展示制图完成的印刷地图", page: 5, credit: "Ramani Huria Atlas (World Bank, 2016)" },
    { file: "/case-media/C17-2.jpg", caption: "达累斯萨拉姆制图覆盖范围与无人机影像对比", page: 18, credit: "Ramani Huria Atlas (World Bank, 2016)" },
    { file: "/case-media/C17-3.jpg", caption: "安装 Trimble 设备的街景采集 bajaj", page: 20, credit: "Ramani Huria Atlas (World Bank, 2016)" },
    { file: "/case-media/C17-4.jpg", caption: "Ubungo ward 洪水风险地图（建筑淹没与排水）", page: 102, credit: "Ramani Huria Atlas (World Bank, 2016)" },
    { file: "/case-media/C17-5.jpg", caption: "非正规住区中被压缩和堵塞的排水沟", page: 3, credit: "Ramani Huria Atlas (World Bank, 2016)" }
  ];
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('case_media:C17', ?)").run(json(media));
});

tx();
db.pragma("wal_checkpoint(TRUNCATE)");
console.log("C17 import committed");
db.close();
