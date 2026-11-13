import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import {
  CORE_ENTITY_DEFINITIONS,
  type CoreEntityType,
  type FactStatus
} from "../shared/ontology";
import type { Strength } from "../shared/types";
import { SEED_VERSION } from "./seed";
import { FRAMEWORK_VERSIONS } from "../shared/framework";
import { embeddingBuffer, VECTOR_DIMENSIONS } from "./embed";
import { buildCaseflowConceptLayer } from "./caseflow-concept-layer";
import { techTagsForCase } from "../shared/case-tags";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const JSON_PATH = path.join(DATA_DIR, "caseflow", "c01-c11.json");
const REPORT_JSON = path.join(DATA_DIR, "caseflow", "disambiguation-report.json");
const REPORT_MD = path.join(DATA_DIR, "caseflow", "C01-C11_消歧报告.md");
const CONCEPT_REPORT_JSON = path.join(DATA_DIR, "caseflow", "concept-candidates.json");
const CONCEPT_REPORT_MD = path.join(DATA_DIR, "caseflow", "C01-C11_概念映射审核包.md");
const DATASET_ID = "caseflow-c01-c11";
const VERSION_TAG = "caseflow-c01-c11@2026-11-13";

type Json = any;

interface EntityRow {
  id: string;
  caseId: string;
  name: string;
  nameEn: string;
  type: CoreEntityType;
  roles: CoreEntityType[];
  description: string;
  definition: string;
  aliases: string[];
  mentions: number;
  firstIndex: number;
}

interface CaseRow {
  id: string;
  code: string;
  idx: number;
  name: string;
  nameEn: string;
  country: string;
  city: string;
  year: string;
  period: string;
  accent: string;
  cover: string;
  tags: string[];
  summary: string;
  rebuild: string[];
  scope?: string;
  evidenceCutoff?: string;
  status: string;
}

interface RelationRow {
  id: string;
  caseId: string;
  source: string;
  target: string;
  type: string;
  label: string;
  weight: number;
  factStatus: FactStatus;
  qualifiers?: string;
  processIds: string[];
  evidenceIds: string[];
  headRole: CoreEntityType;
  tailRole: CoreEntityType;
  review?: string;
  version: string;
  factGroupId?: string;
  verifiedEvidenceIds: string[];
  candidateEvidenceIds: string[];
  traceStatus: string;
}

interface ProcessRow {
  id: string;
  caseId: string;
  title: string;
  timeRange: string;
  narrative: string;
  actorIds: string[];
  eventIds: string[];
  evidenceIds: string[];
  status: string;
  revision: number;
}

interface FactRow {
  id: string;
  caseId: string;
  statement: string;
  entityRoles: string[];
  evidenceIds: string[];
  factStatus: FactStatus;
  timeScope?: string;
  spaceScope?: string;
  confidence: Strength;
  review: string;
}

interface MaterialRow {
  id: string;
  caseId: string;
  title: string;
  kind: string;
  author: string;
  date: string;
  source: string;
  excerpt: string;
  sourceType?: string;
  verificationStatus?: string;
  scope?: string;
  link?: string;
  reliability?: string;
  notes?: string;
}

interface EvidenceRow {
  id: string;
  caseId: string;
  claim: string;
  quote: string;
  source: string;
  locator: string;
  strength: Strength;
  entityIds: string[];
  context?: string;
  factStatus?: FactStatus;
  verificationStatus?: string;
  processIds: string[];
  factIds: string[];
  materialId?: string;
}

interface SearchDocRow {
  kind: "case" | "entity" | "material" | "evidence";
  refId: string;
  caseId: string | null;
  entityId: string | null;
  title: string;
  subtitle: string;
  body: string;
}

interface Model {
  cases: CaseRow[];
  entities: EntityRow[];
  relations: RelationRow[];
  processes: ProcessRow[];
  facts: FactRow[];
  materials: MaterialRow[];
  evidence: EvidenceRow[];
  searchDocs: SearchDocRow[];
  conceptLayer: ReturnType<typeof buildCaseflowConceptLayer>;
  report: any;
}

const TYPE_MAP: Record<string, CoreEntityType> = {
  情境: "context",
  主体: "actor",
  任务: "task",
  技术: "technology",
  能力: "capability",
  行动: "action",
  作用对象: "target",
  结果: "outcome"
};

const GENERIC_CROSS_CASE = new Set([
  "居民", "社区居民", "居民、商户和游客", "项目团队", "项目方",
  "基层工作人员", "政府", "地方政府", "社区组织", "地方组织",
  "社区工作人员", "工作人员", "物业", "物业公司", "商户", "游客",
  "专家", "研究者", "技术人员", "社区", "社区委员会", "居委会",
  "业委会", "社区中心"
]);

const DISTINCT_SUFFIXES = [
  "建设", "更新", "改造", "开发", "项目", "项目方", "系统", "平台",
  "服务", "工作坊", "过程", "方案", "实施", "延迟", "完成", "使用",
  "协商", "活动", "培训", "收集", "讨论", "意见", "阶段", "试点",
  "重点区域", "问题", "需求", "结果", "记录", "计划", "设计", "评估",
  "安装", "部署", "运营", "管理", "参与", "决策", "条件", "情况",
  "数据", "信息", "内容", "渠道", "机制", "支持机制", "支持条件"
];

function mapType(raw: string): CoreEntityType {
  const type = TYPE_MAP[raw.trim()];
  if (!type) throw new Error(`Unknown entity type: ${raw}`);
  return type;
}

function normalizeName(raw: string): string {
  return raw
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\s\u3000]+/g, "")
    .replace(/[，。；、,.;:：!?！？"'“”‘’（）()\[\]【】《》<>·•\-—_/\\]+/g, "");
}

function pad(index: number, length = 3): string {
  return String(index).padStart(length, "0");
}

function firstSentence(value: string, limit = 240): string {
  const compact = value.replace(/\s+/g, " ").trim();
  if (!compact) return "";
  const match = compact.match(/^.*?[。！？!?](?:\s|$)/);
  return (match ? match[0] : compact).slice(0, limit).trim();
}

function firstSentences(value: string, count = 2, limit = 280): string {
  const compact = value.replace(/\s+/g, " ").trim();
  if (!compact) return "";
  return compact.split(/(?<=[。！？!?])/).slice(0, count).join("").trim().slice(0, limit);
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = new Array<number>(b.length + 1).fill(0);
    current[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    previous = current;
  }
  return 1 - previous[b.length] / Math.max(a.length, b.length);
}

function mapStatus(relation: Json): FactStatus {
  const raw =
    String(relation.statusCode || "").trim() ||
    String(relation.statusTimeScope || "").split(/[；;｜|]/)[0]?.trim() ||
    "";
  if (raw.startsWith("已实施")) return "implemented";
  if (raw.startsWith("计划")) return "planned";
  if (raw.includes("观点") || raw.includes("报道")) return "reported_or_opinion";
  if (raw.startsWith("争议")) return "disputed";
  return "unconfirmed";
}

function aggregateStatus(counts: Map<FactStatus, number>): FactStatus {
  if (counts.size === 0) return "unconfirmed";
  const priority: FactStatus[] = [
    "disputed", "reported_or_opinion", "planned", "implemented", "unconfirmed"
  ];
  return [...counts.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return priority.indexOf(a[0]) - priority.indexOf(b[0]);
  })[0][0];
}

function isLikelyDistinct(a: EntityRow, b: EntityRow): boolean {
  const aActionLike = ["action", "outcome"].includes(a.type);
  const bActionLike = ["action", "outcome"].includes(b.type);
  if (a.type !== b.type && aActionLike !== bActionLike) return true;
  const longer = a.name.length >= b.name.length ? a.name : b.name;
  const shorter = a.name.length >= b.name.length ? b.name : a.name;
  if (!longer.startsWith(shorter)) return false;
  return DISTINCT_SUFFIXES.some((suffix) => longer.slice(shorter.length).startsWith(suffix));
}

function paragraphIdFromSentence(sentenceId: string): string | null {
  const match = sentenceId.match(/(C\d+-P\d+)/);
  return match ? match[1] : null;
}

function parseTimeRange(title: string): string {
  const match = title.match(/[（(]([^）)]+)[）)]/);
  return match ? match[1].trim() : "见正文";
}

function buildModel(data: Json): Model {
  const cases: CaseRow[] = [];
  const entities: EntityRow[] = [];
  const relations: RelationRow[] = [];
  const processes: ProcessRow[] = [];
  const facts: FactRow[] = [];
  const materials: MaterialRow[] = [];
  const evidence: EvidenceRow[] = [];
  const searchDocs: SearchDocRow[] = [];
  const entityRegistry: any[] = [];
  const exactMerges: any[] = [];
  const typeConflicts: any[] = [];
  const nearNameCandidates: any[] = [];
  const crossCaseMap = new Map<string, { names: Set<string>; cases: Set<string>; types: Set<string> }>();
  const mappingStatus: Record<string, number> = {};
  const statusDistribution: Record<string, number> = {};
  let rawMentions = 0;
  let aliasesCollapsed = 0;

  for (const [caseIndex, item] of data.cases.entries()) {
    const groups = new Map<string, {
      key: string;
      nameCounts: Map<string, number>;
      nameFirst: Map<string, number>;
      typeCounts: Map<CoreEntityType, number>;
      typeFirst: Map<CoreEntityType, number>;
      firstIndex: number;
      mentions: number;
      id?: string;
      name?: string;
      primaryType?: CoreEntityType;
      roles?: CoreEntityType[];
      aliases?: string[];
    }>();
    let mentionIndex = 0;

    for (const relation of item.relations) {
      for (const [name, type] of [
        [relation.subject, mapType(relation.subjectType)],
        [relation.object, mapType(relation.objectType)]
      ] as Array<[string, CoreEntityType]>) {
        const key = normalizeName(name);
        if (!key) throw new Error(`Empty normalized entity name in ${relation.id}`);
        let group = groups.get(key);
        if (!group) {
          group = {
            key,
            nameCounts: new Map(),
            nameFirst: new Map(),
            typeCounts: new Map(),
            typeFirst: new Map(),
            firstIndex: mentionIndex,
            mentions: 0
          };
          groups.set(key, group);
        }
        if (!group.nameCounts.has(name)) group.nameFirst.set(name, mentionIndex);
        group.nameCounts.set(name, (group.nameCounts.get(name) ?? 0) + 1);
        if (!group.typeCounts.has(type)) group.typeFirst.set(type, mentionIndex);
        group.typeCounts.set(type, (group.typeCounts.get(type) ?? 0) + 1);
        group.mentions += 1;
        rawMentions += 1;
        mentionIndex += 1;
      }
    }

    const sorted = [...groups.values()].sort((a, b) => a.firstIndex - b.firstIndex);
    const sequence = new Map<CoreEntityType, number>();
    for (const group of sorted) {
      const nameEntries = [...group.nameCounts.entries()].sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return (group.nameFirst.get(a[0]) ?? 0) - (group.nameFirst.get(b[0]) ?? 0);
      });
      const typeEntries = [...group.typeCounts.entries()].sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return (group.typeFirst.get(a[0]) ?? 0) - (group.typeFirst.get(b[0]) ?? 0);
      });
      const primaryType = typeEntries[0][0];
      const roles = [...group.typeCounts.keys()].sort(
        (a, b) => (group.typeFirst.get(a) ?? 0) - (group.typeFirst.get(b) ?? 0)
      );
      const next = (sequence.get(primaryType) ?? 0) + 1;
      sequence.set(primaryType, next);
      group.id = `${item.id}-${primaryType}-${pad(next)}`;
      group.name = nameEntries[0][0];
      group.primaryType = primaryType;
      group.roles = roles;
      group.aliases = nameEntries.slice(1).map(([name]) => name);
      aliasesCollapsed += group.aliases.length;
    }

    const keyToGroup = new Map(sorted.map((group) => [group.key, group]));
    for (const group of sorted) {
      if (!group.id || !group.name || !group.primaryType || !group.roles) continue;
      const roleLabels = group.roles.map((role) => CORE_ENTITY_DEFINITIONS[role].label).join("、");
      const aliasText = group.aliases && group.aliases.length > 0
        ? ` 同一实体的规范化写法：${group.aliases.join("、")}。`
        : "";
      const entity: EntityRow = {
        id: group.id,
        caseId: item.id,
        name: group.name,
        nameEn: group.name,
        type: group.primaryType,
        roles: group.roles,
        description: `${group.name} 在案例 ${item.id} 中出现 ${group.mentions} 次，承担${roleLabels}角色。${aliasText}`.trim(),
        definition: CORE_ENTITY_DEFINITIONS[group.primaryType].definition,
        aliases: group.aliases ?? [],
        mentions: group.mentions,
        firstIndex: group.firstIndex
      };
      entities.push(entity);
      entityRegistry.push({
        caseId: item.id, id: entity.id, name: entity.name, aliases: entity.aliases,
        types: entity.roles, mentions: entity.mentions
      });
      if (entity.aliases.length > 0 || entity.roles.length > 1) {
        exactMerges.push({
          caseId: item.id, id: entity.id, name: entity.name,
          aliases: entity.aliases, types: entity.roles, mentions: entity.mentions
        });
      }
      if (entity.roles.length > 1) {
        typeConflicts.push({
          caseId: item.id, id: entity.id, name: entity.name, types: entity.roles,
          decision: "同案精确同名、角色类型不同；保留一个实体并在 entity_roles 中记录多重角色，关系端保留原角色。"
        });
      }
    }

    for (let i = 0; i < sorted.length; i += 1) {
      for (let j = i + 1; j < sorted.length; j += 1) {
        const aGroup = sorted[i];
        const bGroup = sorted[j];
        if (!aGroup.name || !bGroup.name || !aGroup.primaryType || !bGroup.primaryType) continue;
        if (aGroup.key === bGroup.key) continue;
        const score = similarity(aGroup.key, bGroup.key);
        const contained = aGroup.key.includes(bGroup.key) || bGroup.key.includes(aGroup.key);
        if (!contained && score < 0.82) continue;
        if (Math.min(aGroup.key.length, bGroup.key.length) < 3) continue;
        const aEntity: EntityRow = {
          id: aGroup.id ?? "", caseId: item.id, name: aGroup.name, nameEn: aGroup.name,
          type: aGroup.primaryType, roles: aGroup.roles ?? [], description: "", definition: "",
          aliases: [], mentions: aGroup.mentions, firstIndex: aGroup.firstIndex
        };
        const bEntity: EntityRow = {
          id: bGroup.id ?? "", caseId: item.id, name: bGroup.name, nameEn: bGroup.name,
          type: bGroup.primaryType, roles: bGroup.roles ?? [], description: "", definition: "",
          aliases: [], mentions: bGroup.mentions, firstIndex: bGroup.firstIndex
        };
        nearNameCandidates.push({
          caseId: item.id, a: aGroup.name, b: bGroup.name,
          score: Number(score.toFixed(3)),
          classification: isLikelyDistinct(aEntity, bEntity) ? "likely-distinct" : "review"
        });
      }
    }

    const qMeta = new Map<string, {
      caseId: string;
      text: string;
      factGroupId: string;
      sourceDocument: string;
      traceStatus: string;
      mappingStatus: string;
      relationIds: Set<string>;
      entityIds: Set<string>;
      processIds: Set<string>;
      statusCounts: Map<FactStatus, number>;
    }>();
    for (const group of item.factGroups) {
      for (const sentence of group.sentences) {
        const traces = data.qTrace[sentence.id] ?? [];
        const exact = traces.filter((trace: Json) => trace.status === "逐字定位");
        const candidate = traces.filter((trace: Json) => trace.status !== "逐字定位");
        qMeta.set(sentence.id, {
          caseId: item.id,
          text: sentence.text,
          factGroupId: group.id,
          sourceDocument: group.sourceDocument,
          traceStatus: exact.length > 0 ? "逐字定位" : candidate.length > 0 ? "待审核候选" : "未建立句级映射",
          mappingStatus: exact.length > 0 && candidate.length === 0 ? "exact" : exact.length > 0 ? "partial" : "candidate",
          relationIds: new Set(),
          entityIds: new Set(),
          processIds: new Set(),
          statusCounts: new Map()
        });
      }
    }

    const relationsByFactGroup = new Map<string, Json[]>();
    const processActors = new Map<string, Set<string>>();
    const processEvidence = new Map<string, Set<string>>();
    for (const relation of item.relations) {
      const sourceGroup = keyToGroup.get(normalizeName(relation.subject));
      const targetGroup = keyToGroup.get(normalizeName(relation.object));
      if (!sourceGroup?.id || !targetGroup?.id) throw new Error(`Entity mapping failed for ${relation.id}`);
      const headRole = mapType(relation.subjectType);
      const tailRole = mapType(relation.objectType);
      const factStatus = mapStatus(relation);
      statusDistribution[factStatus] = (statusDistribution[factStatus] ?? 0) + 1;
      const mappingKey = relation.mappingStatus || "未标注";
      mappingStatus[mappingKey] = (mappingStatus[mappingKey] ?? 0) + 1;
      const reviewText = [
        relation.mappingStatus ? `mapping=${relation.mappingStatus}` : "",
        relation.adjudication ? `adjudication=${relation.adjudication}` : "",
        relation.traceStatus ? `trace=${relation.traceStatus}` : "",
        relation.reviewIssue ? `review=${relation.reviewIssue}/${relation.reviewStatus}` : "",
        relation.sourceExpertDocument ? `source=${relation.sourceExpertDocument}` : ""
      ].filter(Boolean).join("；");
      relations.push({
        id: relation.id,
        caseId: item.id,
        source: sourceGroup.id,
        target: targetGroup.id,
        type: relation.predicate === "涉及" ? "关联涉及" : relation.predicate,
        label: relation.predicate,
        weight: 1.6,
        factStatus,
        qualifiers: [relation.statusTimeScope, relation.statusNote, relation.statusBasis].filter(Boolean).join("；") || undefined,
        processIds: relation.processIds,
        evidenceIds: relation.evidenceSentenceIds,
        headRole,
        tailRole,
        review: reviewText || undefined,
        version: VERSION_TAG,
        factGroupId: relation.factGroupId || undefined,
        verifiedEvidenceIds: relation.verifiedFrozenSentenceIds ?? [],
        candidateEvidenceIds: relation.candidateFrozenSentenceIds ?? [],
        traceStatus:
          relation.traceStatus ||
          relation.mappingStatus ||
          "未建立逐字定位"
      });
      const list = relationsByFactGroup.get(relation.factGroupId) ?? [];
      list.push(relation);
      relationsByFactGroup.set(relation.factGroupId, list);
      for (const qid of relation.evidenceSentenceIds) {
        const meta = qMeta.get(qid);
        if (!meta) continue;
        meta.relationIds.add(relation.id);
        meta.entityIds.add(sourceGroup.id);
        meta.entityIds.add(targetGroup.id);
        meta.statusCounts.set(factStatus, (meta.statusCounts.get(factStatus) ?? 0) + 1);
        for (const pid of relation.processIds) meta.processIds.add(pid);
      }
      for (const pid of relation.processIds) {
        if (headRole === "actor") {
          const set = processActors.get(pid) ?? new Set<string>();
          set.add(sourceGroup.id);
          processActors.set(pid, set);
        }
        if (tailRole === "actor") {
          const set = processActors.get(pid) ?? new Set<string>();
          set.add(targetGroup.id);
          processActors.set(pid, set);
        }
        const evidenceSet = processEvidence.get(pid) ?? new Set<string>();
        for (const qid of relation.evidenceSentenceIds) evidenceSet.add(qid);
        processEvidence.set(pid, evidenceSet);
      }
    }

    for (const paragraph of item.paragraphs) {
      processes.push({
        id: paragraph.id,
        caseId: item.id,
        title: paragraph.title,
        timeRange: parseTimeRange(paragraph.title),
        narrative: paragraph.text,
        actorIds: [...(processActors.get(paragraph.id) ?? new Set<string>())],
        eventIds: [],
        evidenceIds: [...(processEvidence.get(paragraph.id) ?? new Set<string>())],
        status: "frozen",
        revision: 1
      });
    }

    for (const group of item.factGroups) {
      const groupRelations = relationsByFactGroup.get(group.id) ?? [];
      const statusCounts = new Map<FactStatus, number>();
      for (const relation of groupRelations) {
        const status = mapStatus(relation);
        statusCounts.set(status, (statusCounts.get(status) ?? 0) + 1);
      }
      const entityRoles: string[] = [];
      for (const relation of groupRelations) {
        const sourceGroup = keyToGroup.get(normalizeName(relation.subject));
        const targetGroup = keyToGroup.get(normalizeName(relation.object));
        if (sourceGroup?.id) entityRoles.push(`${sourceGroup.id}:${mapType(relation.subjectType)}`);
        if (targetGroup?.id) entityRoles.push(`${targetGroup.id}:${mapType(relation.objectType)}`);
      }
      const timeScopes = unique(groupRelations.map((relation: Json) => relation.statusTime));
      const spaceScopes = unique(groupRelations.map((relation: Json) => relation.statusScope));
      const statusSummary = [...statusCounts.entries()].map(([status, count]) => `${status}:${count}`).join(",");
      facts.push({
        id: group.id,
        caseId: item.id,
        statement: group.evidenceText || group.sentences.map((sentence: Json) => sentence.text).join(" "),
        entityRoles: unique(entityRoles),
        evidenceIds: group.evidenceSentenceIds,
        factStatus: aggregateStatus(statusCounts),
        timeScope: timeScopes.join("；") || (groupRelations[0]?.statusTimeScope ?? undefined),
        spaceScope: spaceScopes.join("；") || undefined,
        confidence: group.mappingStatus.includes("全部事实组证据句已在冻结文本逐字定位")
          ? "medium"
          : group.mappingStatus.includes("部分") ? "medium" : "low",
        review: [
          "专家协商事实组",
          `mapping=${group.mappingStatus}`,
          `reference=${group.referenceStatus}`,
          `relations=${statusSummary || "none"}`,
          group.sourceDocument ? `source=${group.sourceDocument}` : ""
        ].filter(Boolean).join("；")
      });
    }

    for (const [qid, meta] of qMeta.entries()) {
      evidence.push({
        id: qid,
        caseId: item.id,
        claim: firstSentence(meta.text, 240),
        quote: meta.text,
        source: "专家协商事实组引用原文",
        locator: `${meta.factGroupId} · ${meta.sourceDocument || "专家协商材料"}`,
        strength: meta.mappingStatus === "exact" ? "high" : meta.mappingStatus === "partial" ? "medium" : "low",
        entityIds: [...meta.entityIds],
        context: `案例 ${item.id}；事实组 ${meta.factGroupId}；${meta.traceStatus}`,
        factStatus: aggregateStatus(meta.statusCounts),
        verificationStatus: meta.traceStatus,
        processIds: [...meta.processIds],
        factIds: [meta.factGroupId],
        materialId: undefined
      });
    }

    const materialById = new Map<string, Json>(item.materials.map((material: Json) => [material.id, material]));
    for (const material of item.materials) {
      materials.push({
        id: `${item.id}-${material.id}`,
        caseId: item.id,
        title: material.title,
        kind: material.kind,
        author: material.author,
        date: material.date,
        source: "CaseFlow 原材料列表",
        excerpt: material.rawRecord,
        sourceType: material.kind,
        verificationStatus: material.verification,
        scope: material.sourceVersion,
        link: material.originalUrl || undefined,
        reliability: material.originalUrl ? "旧档案；URL 未逐条在线核验" : "旧档案；未提供可提取 URL",
        notes: `原始编号 ${material.id}；${material.sourceVersion}；${material.verification}`
      });
    }

    for (const record of item.materialEvidence) {
      const material = materialById.get(record.materialId);
      evidence.push({
        id: `${item.id}-${record.id}`,
        caseId: item.id,
        claim: firstSentence(record.record, 240),
        quote: record.record,
        source: material?.title ?? `材料 ${record.materialId}`,
        locator: `${item.id}-${record.materialId} · ${record.sourceVersion}`,
        strength: "medium",
        entityIds: [],
        context: `原材料证据记录${material ? `；${material.kind}；${material.verification}` : ""}`,
        factStatus: undefined,
        verificationStatus: material?.verification,
        processIds: [],
        factIds: [],
        materialId: `${item.id}-${record.materialId}`
      });
    }

    const rebuild = item.paragraphs
      .map((paragraph: Json) => firstSentences(paragraph.text, 2, 280))
      .filter(Boolean);
    cases.push({
      id: item.id,
      code: item.code,
      idx: caseIndex + 1,
      name: item.name,
      nameEn: item.nameEn,
      country: item.country,
      city: item.city,
      year: item.year,
      period: item.period,
      accent: item.accent,
      cover: item.cover,
      tags: techTagsForCase(item.id, item.tags),
      summary: item.summary,
      rebuild,
      scope: "CaseFlow C01–C11 实验冻结版；专家协商候选关系",
      evidenceCutoff: "2026-11-13",
      status: "frozen"
    });
  }

  for (const entity of entities) {
    const key = normalizeName(entity.name);
    const item = crossCaseMap.get(key) ?? { names: new Set<string>(), cases: new Set<string>(), types: new Set<string>() };
    item.names.add(entity.name);
    item.cases.add(entity.caseId);
    for (const type of entity.roles) item.types.add(type);
    crossCaseMap.set(key, item);
  }
  const crossCaseCandidates: any[] = [];
  for (const [key, item] of crossCaseMap.entries()) {
    if (item.cases.size < 2) continue;
    const name = [...item.names][0];
    const generic = GENERIC_CROSS_CASE.has(name) || (name.length <= 4 && /^[\u3400-\u9fff]+$/.test(name));
    crossCaseCandidates.push({
      key, name, variants: [...item.names], cases: [...item.cases].sort(),
      types: [...item.types], classification: generic ? "generic-keep-local" : "specific-review"
    });
  }
  crossCaseCandidates.sort((a, b) => b.cases.length - a.cases.length || a.name.localeCompare(b.name));

  for (const item of cases) {
    const source = data.cases.find((entry: Json) => entry.id === item.id);
    searchDocs.push({
      kind: "case", refId: item.id, caseId: item.id, entityId: null,
      title: item.name, subtitle: `案例 · ${item.country} · ${item.year}`,
      body: [item.summary, ...item.rebuild, techTagsForCase(item.id, item.tags).join("，"), source?.paragraphs.map((paragraph: Json) => paragraph.text).join(" ") ?? ""].join(" ")
    });
  }
  for (const entity of entities) {
    searchDocs.push({
      kind: "entity", refId: entity.id, caseId: entity.caseId, entityId: entity.id,
      title: entity.name,
      subtitle: `实体 · ${CORE_ENTITY_DEFINITIONS[entity.type].label} · ${entity.caseId}`,
      body: `${entity.nameEn} ${entity.description} ${entity.definition} ${entity.aliases.join(" ")}`
    });
  }
  for (const material of materials) {
    searchDocs.push({
      kind: "material", refId: material.id, caseId: material.caseId, entityId: null,
      title: material.title, subtitle: `材料 · ${material.caseId} · ${material.kind}`,
      body: `${material.author} ${material.source} ${material.excerpt} ${material.link ?? ""}`
    });
  }
  for (const item of evidence) {
    searchDocs.push({
      kind: "evidence", refId: item.id, caseId: item.caseId, entityId: null,
      title: item.claim, subtitle: `证据 · ${item.caseId} · ${item.id}`,
      body: `${item.quote} ${item.source} ${item.locator}`
    });
  }

  nearNameCandidates.sort((a, b) => Number(a.classification === "review") - Number(b.classification === "review") || b.score - a.score);

  const qEvidence = evidence.filter((item) => item.factIds.length > 0);
  const conceptLayer = buildCaseflowConceptLayer({
    cases: data.cases,
    entities
  });
  const report = {
    dataset: DATASET_ID,
    sourceVersion: data.sourceVersion,
    generatedAt: new Date().toISOString(),
    summary: {
      cases: cases.length, relations: relations.length, rawMentions, entities: entities.length,
      exactMergedNames: entities.filter((entity) => entity.aliases.length > 0 || entity.roles.length > 1).length,
      aliasesCollapsed,
      typeConflicts: typeConflicts.length,
      nearNameCandidates: nearNameCandidates.length,
      nearNameReview: nearNameCandidates.filter((item) => item.classification === "review").length,
      crossCaseRepeated: crossCaseCandidates.length,
      crossCaseSpecific: crossCaseCandidates.filter((item) => item.classification === "specific-review").length,
      materials: materials.length,
      materialEvidence: evidence.filter((item) => item.materialId).length,
      expertEvidence: qEvidence.length,
      facts: facts.length,
      processes: processes.length,
      nativeConcepts: conceptLayer.nativeConcepts.length,
      sharedConceptCandidates: conceptLayer.sharedConcepts.length,
      conceptMappings: conceptLayer.conceptMappings.length
    },
    rules: [
      "先做 NFKC、大小写、空白与标点规范化，再按“案例 + 规范名”建立实体。",
      "同案例内规范名完全相同者合并为一个实体；原始写法差异登记为 aliases。",
      "同案例同名但类型不同者保留一个实体，在 entity_roles 中记录多重角色，关系端保留原角色。",
      "同案例近名、简称、包含关系不自动合并，只进入候选报告，避免把行动/结果误当成主体。",
      "跨案例默认不合并；居民、项目团队、政府等泛称保持案例内实体。",
      "只有明确指同一对象且具语义依据的跨案例专名才建议人工复核，不在本次自动合并。",
      "关系保留原 relation_id、predicate、状态、证据句 ID 与过程段落 ID；语义候选不升级为确定事实。"
    ],
    entityRegistry, exactMerges, typeConflicts, nearNameCandidates, crossCaseCandidates,
    traceability: {
      relationsWithEvidence: relations.filter((item) => item.evidenceIds.length > 0).length,
      relationsWithProcess: relations.filter((item) => item.processIds.length > 0).length,
      relationsWithoutProcess: relations.filter((item) => item.processIds.length === 0).length,
      relationsWithVerbatimSentence: relations.filter(
        (item) => item.verifiedEvidenceIds.length > 0
      ).length,
      reviewRelations: data.cases.reduce((sum: number, item: Json) => sum + item.relations.filter((relation: Json) => relation.reviewIssue).length, 0),
      qEvidence: qEvidence.length,
      qExact: qEvidence.filter((item) => item.verificationStatus === "逐字定位").length,
      qCandidate: qEvidence.filter((item) => item.verificationStatus === "待审核候选").length,
      materialsWithoutUrl: materials.filter((item) => !item.link).length,
      mappingStatus, statusDistribution
    }
  };

  return {
    cases,
    entities,
    relations,
    processes,
    facts,
    materials,
    evidence,
    searchDocs,
    conceptLayer,
    report
  };
}

function assertModelIntegrity(model: Model): void {
  const checks: Array<[string, string[]]> = [
    ["case", model.cases.map((item) => item.id)],
    ["entity", model.entities.map((item) => item.id)],
    ["relation", model.relations.map((item) => item.id)],
    ["process", model.processes.map((item) => item.id)],
    ["fact", model.facts.map((item) => item.id)],
    ["material", model.materials.map((item) => item.id)],
    ["evidence", model.evidence.map((item) => item.id)],
    ["native concept", model.conceptLayer.nativeConcepts.map((item) => item.id)],
    ["shared concept", model.conceptLayer.sharedConcepts.map((item) => item.id)],
    ["concept mapping", model.conceptLayer.conceptMappings.map((item) => item.id)]
  ];
  const errors: string[] = [];

  for (const [kind, ids] of checks) {
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    for (const id of ids) {
      if (!id) errors.push(`${kind}: empty id`);
      if (seen.has(id)) duplicates.add(id);
      seen.add(id);
    }
    if (duplicates.size > 0) {
      errors.push(
        `${kind}: duplicate global ids ${[...duplicates].slice(0, 8).join(", ")}`
      );
    }
  }

  const processIds = new Set(model.processes.map((item) => item.id));
  const evidenceIds = new Set(model.evidence.map((item) => item.id));
  for (const relation of model.relations) {
    for (const processId of relation.processIds) {
      if (!processIds.has(processId)) {
        errors.push(`${relation.id}: missing process ${processId}`);
      }
    }
    for (const evidenceId of relation.evidenceIds) {
      if (!evidenceIds.has(evidenceId)) {
        errors.push(`${relation.id}: missing evidence ${evidenceId}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`CaseFlow model integrity check failed:\n- ${errors.join("\n- ")}`);
  }
}

function md(value: unknown): string {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\n+/g, " ");
}

function writeReport(report: any): void {
  fs.mkdirSync(path.dirname(REPORT_JSON), { recursive: true });
  fs.writeFileSync(REPORT_JSON, JSON.stringify(report, null, 2), "utf8");
  const lines: string[] = [];
  lines.push("# CaseFlow C01–C11 导入与实体消歧报告");
  lines.push("");
  lines.push(`- 数据源：${report.sourceVersion}`);
  lines.push(`- 生成时间：${report.generatedAt}`);
  lines.push(`- 数据集标识：\`${report.dataset}\``);
  lines.push("");
  lines.push("## 数据规模");
  lines.push("");
  lines.push("| 项目 | 数量 |");
  lines.push("| --- | ---: |");
  const summary = report.summary;
  lines.push(`| 案例 | ${summary.cases} |`);
  lines.push(`| 过程段落 | ${summary.processes} |`);
  lines.push(`| 专家关系 | ${summary.relations} |`);
  lines.push(`| 实体提及 | ${summary.rawMentions} |`);
  lines.push(`| 消歧后实体 | ${summary.entities} |`);
  lines.push(`| 精确同名合并实体 | ${summary.exactMergedNames} |`);
  lines.push(`| 折叠别名 | ${summary.aliasesCollapsed} |`);
  lines.push(`| 类型冲突实体 | ${summary.typeConflicts} |`);
  lines.push(`| 近名候选对 | ${summary.nearNameCandidates} |`);
  lines.push(`| 跨案例重复名 | ${summary.crossCaseRepeated} |`);
  lines.push(`| 材料 | ${summary.materials} |`);
  lines.push(`| 材料证据 | ${summary.materialEvidence} |`);
  lines.push(`| 专家引文证据 | ${summary.expertEvidence} |`);
  lines.push(`| 事实组 | ${summary.facts} |`);
  lines.push("");
  lines.push("## 消歧规则");
  lines.push("");
  for (const rule of report.rules as string[]) lines.push(`- ${rule}`);
  lines.push("");
  lines.push("## 同案精确同名合并");
  lines.push("");
  lines.push("只合并在同一案例内规范化后完全相同的名称。名称相近但语义可能不同的对象不自动合并。");
  lines.push("");
  lines.push("| 案例 | 实体 ID | 规范名 | 别名 | 类型 | 提及 |");
  lines.push("| --- | --- | --- | --- | --- | ---: |");
  for (const item of (report.exactMerges as any[]).slice(0, 160)) {
    lines.push(`| ${item.caseId} | ${md(item.id)} | ${md(item.name)} | ${md(item.aliases.join("、")) || "—"} | ${md(item.types.join("、"))} | ${item.mentions} |`);
  }
  if (report.exactMerges.length > 160) lines.push(`| … | … | 其余 ${report.exactMerges.length - 160} 条见 JSON | | | |`);
  lines.push("");
  lines.push("## 同案同名类型冲突");
  lines.push("");
  if (report.typeConflicts.length === 0) {
    lines.push("无。");
  } else {
    lines.push("| 案例 | 实体 ID | 名称 | 类型 | 处理 |");
    lines.push("| --- | --- | --- | --- | --- |");
    for (const item of report.typeConflicts as any[]) {
      lines.push(`| ${item.caseId} | ${md(item.id)} | ${md(item.name)} | ${md(item.types.join("、"))} | ${md(item.decision)} |`);
    }
  }
  lines.push("");
  lines.push("## 近名候选（未合并）");
  lines.push("");
  lines.push("`likely-distinct` 表示名称差异更像行动、结果或限定语，不应合并；`review` 供研究者人工判断。");
  lines.push("");
  lines.push("| 案例 | 名称 A | 名称 B | 相似度 | 判断 |");
  lines.push("| --- | --- | --- | ---: | --- |");
  for (const item of (report.nearNameCandidates as any[]).slice(0, 140)) {
    lines.push(`| ${item.caseId} | ${md(item.a)} | ${md(item.b)} | ${item.score.toFixed(3)} | ${item.classification} |`);
  }
  lines.push("");
  lines.push("## 跨案例重复名（默认不合并）");
  lines.push("");
  lines.push("泛称保持案例内实体；`specific-review` 是可能指同一对象的专名，建议人工确认。");
  lines.push("");
  lines.push("| 名称 | 案例 | 类型 | 判断 |");
  lines.push("| --- | --- | --- | --- |");
  for (const item of (report.crossCaseCandidates as any[]).slice(0, 80)) {
    lines.push(`| ${md(item.name)} | ${md(item.cases.join("、"))} | ${md(item.types.join("、"))} | ${item.classification} |`);
  }
  lines.push("");
  lines.push("## 追溯完整性");
  lines.push("");
  const trace = report.traceability;
  lines.push(`- 有关系证据句的关系：${trace.relationsWithEvidence} / ${summary.relations}`);
  lines.push(`- 有过程段落定位的关系：${trace.relationsWithProcess} / ${summary.relations}`);
  lines.push(`- 无过程段落定位的关系：${trace.relationsWithoutProcess}（主要是 152 条语义候选）`);
  lines.push(`- 需复核关系：${trace.reviewRelations}`);
  lines.push(`- 专家引文：${trace.qEvidence} 条；逐字定位 ${trace.qExact} 条；待审核候选 ${trace.qCandidate} 条`);
  lines.push(`- 无 URL 材料：${trace.materialsWithoutUrl} / ${summary.materials}`);
  lines.push("");
  lines.push("### 关系映射状态");
  lines.push("");
  for (const [key, value] of Object.entries(trace.mappingStatus)) lines.push(`- ${key}: ${value}`);
  lines.push("");
  lines.push("### 事实状态分布");
  lines.push("");
  for (const [key, value] of Object.entries(trace.statusDistribution)) lines.push(`- ${key}: ${value}`);
  lines.push("");
  lines.push("## 使用边界");
  lines.push("");
  lines.push("- 本报告只做实体消歧和数据入库，不把专家协商候选关系升级为因果结论。");
  lines.push("- 152 条语义候选、100 条待审核引文和 24 条部分定位引文保留原有状态，需在后续研究中人工复核。");
  lines.push("- 跨案例专名（如 SmartEnCity 项目）未自动合并；如需共享节点，应在比较研究阶段显式确认。");
  fs.writeFileSync(REPORT_MD, lines.join("\n"), "utf8");
}

function writeConceptReport(
  layer: ReturnType<typeof buildCaseflowConceptLayer>
): void {
  fs.mkdirSync(path.dirname(CONCEPT_REPORT_JSON), { recursive: true });
  fs.writeFileSync(CONCEPT_REPORT_JSON, JSON.stringify(layer, null, 2), "utf8");

  const mapped = layer.conceptMappings.filter(
    (item) => item.mappingType !== "no_map"
  );
  const noMap = layer.conceptMappings.filter(
    (item) => item.mappingType === "no_map"
  );
  const mappedNativeIds = new Set(
    mapped.map((item) => item.nativeConceptId)
  );
  const noMapNativeIds = new Set(
    noMap.map((item) => item.nativeConceptId)
  );
  const partialMappings = mapped.filter(
    (item) => item.mappingType === "partial_or_approximate"
  );
  const curatedNativeCount = layer.nativeConcepts.filter(
    (item) => item.status === "candidate"
  ).length;
  const supplementalNativeCount = layer.nativeConcepts.filter(
    (item) => item.status === "candidate_auto_group"
  ).length;
  const version = layer.conceptMappings[0]?.version ?? "candidate";
  const caseIds = unique(layer.nativeConcepts.map((item) => item.caseId));
  const lines: string[] = [];
  lines.push("# C01–C11 原生实体映射单元与共享概念候选审核包");
  lines.push("");
  lines.push(`- packet_id: ${version}`);
  lines.push("- skill: scalable-concept-framework");
  lines.push("- gate: G1 原生概念盘点 / G2 共享概念候选与映射");
  lines.push("- case_id / comparison_id: C01–C11");
  lines.push("- scope: 原生实体映射单元；跨案例共享概念候选");
  lines.push(`- generated_at: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## 1. 本轮处理范围");
  lines.push("");
  lines.push(`- 已处理案例：${caseIds.join("、")}`);
  lines.push(`- 原生实体映射单元候选：${layer.nativeConcepts.length}`);
  lines.push(`- 其中逐案精读语义单元：${curatedNativeCount}`);
  lines.push(`- 其中关系覆盖补全候选：${supplementalNativeCount}`);
  lines.push(`- 共享概念候选：${layer.sharedConcepts.length}`);
  lines.push(`- 共享映射记录：${mapped.length}`);
  lines.push(`- 已映射原生实体单元：${mappedNativeIds.size}`);
  lines.push(`- 暂不映射原生实体单元：${noMapNativeIds.size}`);
  lines.push("- 历史状态：此前概念表为空，因此本轮无既有共享概念或历史映射被覆盖。");
  lines.push("");
  lines.push("## 2. 候选摘要");
  lines.push("");
  lines.push("| 编号 | 共享概念候选 | 类别 | 支持案例 | 原生实例 | 审核状态 |");
  lines.push("| --- | --- | --- | --- | ---: | --- |");
  for (const item of layer.sharedConcepts) {
    const typeLabel = item.entityType
      ? CORE_ENTITY_DEFINITIONS[item.entityType].label
      : "未分类";
    lines.push(
      `| ${item.id} | ${md(item.label)} | ${typeLabel} | ${item.supportingCaseIds.join("、")} | ${item.supportingNativeIds.length} | 待研究者确认 |`
    );
  }
  lines.push("");
  lines.push("## 3. 冲突、缺口与不确定项");
  lines.push("");
  lines.push("- 图谱原生层直接使用案例实体；以下映射单元只用于生成共享概念，不作为额外图节点。");
  lines.push("- 原生映射单元以同类别实体为锚点，且只能映射到同类别共享概念。");
  lines.push("- 类别补全概念按主实体类别接入共享候选，属于部分或近似映射，不继承其他属性。");
  lines.push("- 共享概念均为 AI 候选，未由研究者冻结为正式 `SC-xxx`。");
  lines.push("- `no_map` 不代表概念没有价值，而是现有共享边界无法准确覆盖，继续保留在原生层。");
  lines.push("- 部分或近似映射只确认有依据的表达转译成分，不自动继承原生概念的全部属性。");
  lines.push("");
  lines.push("## 4. 需要研究者裁决的事项");
  lines.push("");
  lines.push(
    `1. 是否确认 ${layer.sharedConcepts.length} 个共享概念候选的名称与定义边界。`
  );
  lines.push("2. 是否确认各共享候选的支持案例和原生实例范围。");
  lines.push(
    `3. 是否接受 ${partialMappings.length} 条“部分或近似映射”的适用范围。`
  );
  lines.push(
    `4. 是否接受 ${noMapNativeIds.size} 条 \`no_map\` 继续保留为案例原生概念。`
  );
  lines.push("");
  lines.push("## 5. 历史影响");
  lines.push("");
  lines.push("- 是否影响既有共享概念：否，原概念表为空。");
  lines.push("- 是否影响历史映射：否，原映射表为空。");
  lines.push("- 是否触发历史案例回查：本轮建立首版概念层，后续边界调整时回查。");
  lines.push("");
  lines.push("## 6. 研究者决定");
  lines.push("");
  lines.push("- 动作: discuss");
  lines.push("- 理由: 等待研究者审核候选边界与映射。");
  lines.push("- 是否允许进入下一阶段: no");
  lines.push("");
  lines.push("## 7. 锁定记录");
  lines.push("");
  lines.push("- 冻结产物: `data/caseflow/concept-candidates.json`");
  lines.push(`- 版本: \`${version}\``);
  lines.push("- 未决事项: 共享概念边界、部分映射与 `no_map` 清单。");
  fs.writeFileSync(CONCEPT_REPORT_MD, lines.join("\n"), "utf8");
}

function ensureSchema(db: any): void {
  const required = [
    "cases",
    "entities",
    "relations",
    "materials",
    "evidence",
    "processes",
    "facts",
    "native_concepts",
    "shared_concepts",
    "concept_mappings",
    "review_packets",
    "review_decisions",
    "search_docs",
    "vec_search",
    "meta"
  ];
  const rows = db.prepare("SELECT name FROM sqlite_master WHERE type IN ('table','view')").all() as Array<{ name: string }>;
  const names = new Set(rows.map((row) => row.name));
  const missing = required.filter((name) => !names.has(name));
  if (missing.length > 0) {
    throw new Error(`数据库结构不完整，缺少：${missing.join(", ")}。请先运行一次 npm start 初始化数据库，再执行导入。`);
  }

  const ontologyColumns = db
    .prepare("PRAGMA table_info(ontology_versions)")
    .all() as Array<{ name: string }>;
  if (ontologyColumns.length && !ontologyColumns.some((column) => column.name === "structure")) {
    db.exec("DROP TABLE ontology_versions");
  }
  const ensureColumn = (table: string, column: string, definition: string) => {
    const columns = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{
      name: string;
    }>;
    if (columns.some((item) => item.name === column)) return;
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  };
  ensureColumn("relations", "fact_group_id", "TEXT");
  ensureColumn(
    "relations",
    "verified_evidence_ids",
    "TEXT NOT NULL DEFAULT '[]'"
  );
  ensureColumn(
    "relations",
    "candidate_evidence_ids",
    "TEXT NOT NULL DEFAULT '[]'"
  );
  ensureColumn("relations", "trace_status", "TEXT");
  db.exec(`
    CREATE TABLE IF NOT EXISTS ontology_versions (
      id TEXT PRIMARY KEY,
      version TEXT NOT NULL,
      title TEXT NOT NULL,
      structure TEXT NOT NULL,
      adjustment TEXT NOT NULL,
      problem TEXT NOT NULL,
      chapter TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS relation_process_links (
      relation_id TEXT NOT NULL,
      case_id TEXT NOT NULL,
      process_id TEXT NOT NULL,
      fact_group_id TEXT,
      verified_evidence_ids TEXT NOT NULL DEFAULT '[]',
      candidate_evidence_ids TEXT NOT NULL DEFAULT '[]',
      trace_status TEXT NOT NULL DEFAULT 'unconfirmed',
      PRIMARY KEY (relation_id, process_id)
    );

    CREATE TABLE IF NOT EXISTS relation_evidence_links (
      relation_id TEXT NOT NULL,
      case_id TEXT NOT NULL,
      evidence_id TEXT NOT NULL,
      PRIMARY KEY (relation_id, evidence_id)
    );
  `);
}

function backupDatabase(db: any): string {
  const backupDir = path.join(DATA_DIR, "_backup");
  fs.mkdirSync(backupDir, { recursive: true });
  const fixed = path.join(backupDir, "community-renewal.db.before-c01-c11");
  const target = fs.existsSync(fixed)
    ? path.join(backupDir, `community-renewal.db.before-c01-c11-${new Date().toISOString().replace(/[:.]/g, "-")}`)
    : fixed;
  db.pragma("wal_checkpoint(TRUNCATE)");
  fs.copyFileSync(DB_PATH, target);
  return target;
}

function insertSearchDoc(db: any, doc: SearchDocRow): void {
  const info = db
    .prepare("INSERT INTO vec_search (embedding) VALUES (?)")
    .run(embeddingBuffer(`${doc.title} ${doc.subtitle} ${doc.body}`));
  const rowid = Number(info.lastInsertRowid);
  db.prepare(
    `INSERT INTO search_docs
      (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(rowid, doc.kind, doc.refId, doc.caseId, doc.entityId, doc.title, doc.subtitle, doc.body);
}

function importDatabase(model: Model): { backup: string } {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  sqliteVec.load(db);
  ensureSchema(db);
  const backup = backupDatabase(db);

  const insertCase = db.prepare(
    `INSERT INTO cases
      (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild,
       event_start, event_end, scope, evidence_cutoff, research_question, status)
     VALUES
      (@id, @code, @idx, @name, @nameEn, @country, @city, @year, @period, @accent, @cover, @tags, @summary, @rebuild,
       @eventStart, @eventEnd, @scope, @evidenceCutoff, @researchQuestion, @status)`
  );
  const insertEntity = db.prepare(
    `INSERT INTO entities (id, name, name_en, type, description, definition, role_types)
     VALUES (@id, @name, @nameEn, @type, @description, @definition, @roleTypes)`
  );
  const insertCaseEntity = db.prepare("INSERT INTO case_entities (case_id, entity_id) VALUES (?, ?)");
  const insertEntityRole = db.prepare("INSERT INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)");
  const insertMaterial = db.prepare(
    `INSERT INTO materials
      (id, case_id, title, kind, author, date, source, excerpt, source_type, verification_status, scope, link, reliability, notes)
     VALUES (@id, @caseId, @title, @kind, @author, @date, @source, @excerpt, @sourceType, @verificationStatus, @scope, @link, @reliability, @notes)`
  );
  const insertEvidence = db.prepare(
    `INSERT INTO evidence
      (id, case_id, claim, quote, source, locator, strength, entity_ids, context, fact_status, verification_status, process_ids, fact_ids, material_id)
     VALUES (@id, @caseId, @claim, @quote, @source, @locator, @strength, @entityIds, @context, @factStatus, @verificationStatus, @processIds, @factIds, @materialId)`
  );
  const insertRelation = db.prepare(
    `INSERT INTO relations
      (id, case_id, source, target, type, label, weight, fact_status, qualifiers,
       process_ids, evidence_ids, head_role, tail_role, review, version,
       fact_group_id, verified_evidence_ids, candidate_evidence_ids, trace_status)
     VALUES (@id, @caseId, @source, @target, @type, @label, @weight, @factStatus,
             @qualifiers, @processIds, @evidenceIds, @headRole, @tailRole,
             @review, @version, @factGroupId, @verifiedEvidenceIds,
             @candidateEvidenceIds, @traceStatus)`
  );
  const insertRelationProcessLink = db.prepare(
    `INSERT INTO relation_process_links
      (relation_id, case_id, process_id, fact_group_id,
       verified_evidence_ids, candidate_evidence_ids, trace_status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const insertRelationEvidenceLink = db.prepare(
    `INSERT INTO relation_evidence_links
      (relation_id, case_id, evidence_id)
     VALUES (?, ?, ?)`
  );
  const insertProcess = db.prepare(
    `INSERT INTO processes
      (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
     VALUES (@id, @caseId, @title, @timeRange, @narrative, @actorIds, @eventIds, @evidenceIds, @status, @revision)`
  );
  const insertFact = db.prepare(
    `INSERT INTO facts
      (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
     VALUES (@id, @caseId, @statement, @entityRoles, @evidenceIds, @factStatus, @timeScope, @spaceScope, @quantityScope, @confidence, @review)`
  );
  const insertOntology = db.prepare(
    `INSERT INTO ontology_versions (id, version, title, structure, adjustment, problem, chapter)
     VALUES (@id, @version, @title, @structure, @adjustment, @problem, @chapter)`
  );
  const insertNativeConcept = db.prepare(
    `INSERT INTO native_concepts
      (id, case_id, label, entity_type, definition, examples, source_relation_ids, status)
     VALUES
      (@id, @caseId, @label, @entityType, @definition, @examples, @sourceRelationIds, @status)`
  );
  const insertSharedConcept = db.prepare(
    `INSERT INTO shared_concepts
      (id, label, definition, entity_type, scope, supporting_case_ids, supporting_native_ids,
       negative_examples, version, review)
     VALUES
      (@id, @label, @definition, @entityType, @scope, @supportingCaseIds, @supportingNativeIds,
       @negativeExamples, @version, @review)`
  );
  const insertConceptMapping = db.prepare(
    `INSERT INTO concept_mappings
      (id, case_id, native_concept_id, shared_concept_id, mapping_type, basis, scope,
       evidence_ids, decision, version)
     VALUES
      (@id, @caseId, @nativeConceptId, @sharedConceptId, @mappingType, @basis, @scope,
       @evidenceIds, @decision, @version)`
  );
  const insertReviewPacket = db.prepare(
    `INSERT INTO review_packets
      (id, skill, gate, case_id, scope, payload, status, created_at)
     VALUES
      (@id, @skill, @gate, @caseId, @scope, @payload, @status, @createdAt)
     ON CONFLICT(id) DO UPDATE SET
      skill = excluded.skill,
      gate = excluded.gate,
      case_id = excluded.case_id,
      scope = excluded.scope,
      payload = excluded.payload`
  );

  const transaction = db.transaction(() => {
    db.exec(`
      DELETE FROM vec_search;
      DELETE FROM search_docs;
      DELETE FROM evidence;
      DELETE FROM materials;
      DELETE FROM facts;
      DELETE FROM processes;
      DELETE FROM native_concepts;
      DELETE FROM concept_mappings;
      DELETE FROM shared_concepts;
      DELETE FROM causal_questions;
      DELETE FROM causal_claims;
      DELETE FROM comparisons;
      DELETE FROM relation_process_links;
      DELETE FROM relation_evidence_links;
      DELETE FROM entity_roles;
      DELETE FROM case_entities;
      DELETE FROM relations;
      DELETE FROM ontology_versions;
      DELETE FROM cases;
      DELETE FROM entities;
      DELETE FROM meta;
    `);

    for (const item of model.cases) {
      insertCase.run({
        ...item,
        tags: JSON.stringify(techTagsForCase(item.id, item.tags)),
        rebuild: JSON.stringify(item.rebuild),
        eventStart: null,
        eventEnd: null,
        researchQuestion: null
      });
    }
    for (const entity of model.entities) {
      insertEntity.run({
        ...entity,
        roleTypes: JSON.stringify(entity.roles)
      });
      insertCaseEntity.run(entity.caseId, entity.id);
      for (const role of entity.roles) insertEntityRole.run(entity.caseId, entity.id, role);
    }
    for (const material of model.materials) {
      insertMaterial.run({
        ...material,
        sourceType: material.sourceType ?? null,
        verificationStatus: material.verificationStatus ?? null,
        scope: material.scope ?? null,
        link: material.link ?? null,
        reliability: material.reliability ?? null,
        notes: material.notes ?? null
      });
    }
    for (const item of model.evidence) {
      insertEvidence.run({
        ...item,
        entityIds: JSON.stringify(item.entityIds),
        context: item.context ?? null,
        factStatus: item.factStatus ?? null,
        verificationStatus: item.verificationStatus ?? null,
        processIds: JSON.stringify(item.processIds),
        factIds: JSON.stringify(item.factIds),
        materialId: item.materialId ?? null
      });
    }
    for (const item of model.relations) {
      insertRelation.run({
        ...item,
        qualifiers: item.qualifiers ?? null,
        processIds: JSON.stringify(item.processIds),
        evidenceIds: JSON.stringify(item.evidenceIds),
        review: item.review ?? null,
        factGroupId: item.factGroupId ?? null,
        verifiedEvidenceIds: JSON.stringify(item.verifiedEvidenceIds),
        candidateEvidenceIds: JSON.stringify(item.candidateEvidenceIds),
        traceStatus: item.traceStatus
      });
    }
    for (const item of model.processes) {
      insertProcess.run({
        ...item,
        actorIds: JSON.stringify(item.actorIds),
        eventIds: JSON.stringify(item.eventIds),
        evidenceIds: JSON.stringify(item.evidenceIds)
      });
    }
    for (const item of model.relations) {
      for (const processId of item.processIds) {
        insertRelationProcessLink.run(
          item.id,
          item.caseId,
          processId,
          item.factGroupId ?? null,
          JSON.stringify(item.verifiedEvidenceIds),
          JSON.stringify(item.candidateEvidenceIds),
          item.traceStatus
        );
      }
      for (const evidenceId of item.evidenceIds) {
        insertRelationEvidenceLink.run(item.id, item.caseId, evidenceId);
      }
    }
    for (const item of model.facts) {
      insertFact.run({
        ...item,
        entityRoles: JSON.stringify(item.entityRoles),
        evidenceIds: JSON.stringify(item.evidenceIds),
        timeScope: item.timeScope ?? null,
        spaceScope: item.spaceScope ?? null,
        quantityScope: null
      });
    }
    const conceptVersion =
      model.conceptLayer.conceptMappings[0]?.version ?? "candidate";
    const conceptAccepted = Boolean(
      db
        .prepare(
          "SELECT 1 FROM review_decisions WHERE packet_id = ? AND action = 'accept' AND allow_next_gate = 1"
        )
        .get(`RP-${conceptVersion}`)
    );
    for (const item of model.conceptLayer.nativeConcepts) {
      insertNativeConcept.run({
        ...item,
        examples: JSON.stringify(item.examples),
        sourceRelationIds: JSON.stringify(item.sourceRelationIds)
      });
    }
    for (const item of model.conceptLayer.sharedConcepts) {
      insertSharedConcept.run({
        ...item,
        entityType: item.entityType ?? null,
        scope: item.scope ?? null,
        supportingCaseIds: JSON.stringify(item.supportingCaseIds),
        supportingNativeIds: JSON.stringify(item.supportingNativeIds),
        negativeExamples: JSON.stringify(item.negativeExamples),
        review: conceptAccepted
          ? "researcher_confirmed"
          : item.review
      });
    }
    for (const item of model.conceptLayer.conceptMappings) {
      insertConceptMapping.run({
        ...item,
        sharedConceptId: item.sharedConceptId ?? null,
        scope: item.scope ?? null,
        evidenceIds: JSON.stringify(item.evidenceIds),
        decision: conceptAccepted ? "accepted" : item.decision
      });
    }
    insertReviewPacket.run({
      id: `RP-${conceptVersion}`,
      skill: "scalable-concept-framework",
      gate: "G1-G2",
      caseId: "C01-C11",
      scope: "逐案语义单元原生概念与跨案例共享概念候选",
      payload: JSON.stringify({
        packetId: conceptVersion,
        status: "candidate_pending_researcher",
        nativeConcepts: model.conceptLayer.nativeConcepts,
        sharedConceptCandidates: model.conceptLayer.sharedConcepts,
        conceptMappings: model.conceptLayer.conceptMappings
      }),
      status: "pending",
      createdAt: new Date().toISOString()
    });
    for (const version of FRAMEWORK_VERSIONS) insertOntology.run(version);
    for (const doc of model.searchDocs) insertSearchDoc(db, doc);

    const meta = db.prepare("INSERT INTO meta (key, value) VALUES (?, ?)");
    meta.run("seed_version", String(SEED_VERSION));
    meta.run("dataset", DATASET_ID);
    meta.run("dataset_source", JSON.parse(fs.readFileSync(JSON_PATH, "utf8")).sourceFile);
    meta.run("dataset_imported_at", new Date().toISOString());
    meta.run("dataset_note", "C01–C11 专家协商候选关系；语义候选不等于确定事实");
    meta.run(
      "review_decisions_preserved",
      String(
        (
          db.prepare("SELECT COUNT(*) AS count FROM review_decisions").get() as {
            count: number;
          }
        ).count
      )
    );
  });
  transaction();
  db.close();
  return { backup };
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run");
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8")) as Json;
  const model = buildModel(data);
  assertModelIntegrity(model);
  writeReport(model.report);
  writeConceptReport(model.conceptLayer);
  console.log(
    JSON.stringify(
      {
        mode: dryRun ? "dry-run" : "import",
        report: { json: REPORT_JSON, markdown: REPORT_MD },
        conceptReview: {
          json: CONCEPT_REPORT_JSON,
          markdown: CONCEPT_REPORT_MD
        },
        cases: model.cases.length,
        entities: model.entities.length,
        relations: model.relations.length,
        processes: model.processes.length,
        facts: model.facts.length,
        materials: model.materials.length,
        evidence: model.evidence.length,
        nativeConcepts: model.conceptLayer.nativeConcepts.length,
        sharedConceptCandidates: model.conceptLayer.sharedConcepts.length,
        conceptMappings: model.conceptLayer.conceptMappings.length,
        searchDocs: model.searchDocs.length,
        disambiguation: model.report.summary,
        traceability: model.report.traceability
      },
      null,
      2
    )
  );
  if (dryRun) return;
  const result = importDatabase(model);
  console.log(JSON.stringify({ imported: true, backup: result.backup, database: DB_PATH }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
