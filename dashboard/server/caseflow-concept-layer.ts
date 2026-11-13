import fs from "node:fs";
import path from "node:path";
import type { CoreEntityType } from "../shared/ontology";
import type {
  ConceptMappingRecord,
  NativeConceptRecord,
  SharedConceptRecord
} from "../shared/types";

const DEFAULT_SHARED_FILE = "C01-C11-shared-concepts-v0.2.json";

interface ConceptRelation {
  id: string;
  subject: string;
  subjectType: string;
  predicate: string;
  object: string;
  objectType: string;
  evidenceSentenceIds?: string[];
}

interface ConceptEntity {
  id: string;
  caseId: string;
  name: string;
  type: CoreEntityType;
  description: string;
  definition: string;
}

interface ConceptDataset {
  cases: Array<{ id: string; relations: ConceptRelation[] }>;
  entities: ConceptEntity[];
}

interface SharedConceptRule {
  id: string;
  label: string;
  definition: string;
  entityType: CoreEntityType;
  scope: string;
  negativeExamples: string[];
  matchTerms: string[];
}

interface SharedRuleFile {
  packetId: string;
  status: string;
  sharedConcepts: SharedConceptRule[];
}

export interface CaseflowConceptLayer {
  nativeConcepts: NativeConceptRecord[];
  sharedConcepts: SharedConceptRecord[];
  conceptMappings: ConceptMappingRecord[];
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function rulePath(): string {
  return path.resolve(
    process.cwd(),
    process.env.CASEFLOW_SHARED_CONCEPTS ?? DEFAULT_SHARED_FILE
  );
}

function conceptId(entityId: string): string {
  return `NC-${entityId}`;
}

function matchScore(text: string, terms: string[]): number {
  return terms.reduce(
    (score, term) => score + (text.includes(term) ? term.length : 0),
    0
  );
}

export function buildCaseflowConceptLayer(
  data: ConceptDataset
): CaseflowConceptLayer {
  const filePath = rulePath();
  if (!fs.existsSync(filePath)) {
    throw new Error(`缺少共享概念规则文件：${filePath}`);
  }
  const rules = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  ) as SharedRuleFile;
  const relationsByCase = new Map(
    data.cases.map((item) => [item.id, item.relations])
  );
  const relationById = new Map<string, ConceptRelation>();
  for (const item of data.cases) {
    for (const relation of item.relations) {
      relationById.set(relation.id, relation);
    }
  }

  const nativeConcepts: NativeConceptRecord[] = [];
  const sourceRelationIdsByNative = new Map<string, string[]>();
  const contextByNative = new Map<string, string>();
  const nativeById = new Map<string, NativeConceptRecord>();

  for (const entity of data.entities) {
    const relations = relationsByCase.get(entity.caseId) ?? [];
    const involving = relations.filter(
      (relation) =>
        relation.subject === entity.name || relation.object === entity.name
    );
    const id = conceptId(entity.id);
    const examples = involving.slice(0, 3).map(
      (relation) =>
        `${relation.subject} —${relation.predicate}→ ${relation.object}`
    );
    const context = unique(
      involving.map((relation) =>
        relation.subject === entity.name
          ? `${relation.predicate} ${relation.object}`
          : `${relation.subject} ${relation.predicate}`
      )
    ).join(" ");
    const native: NativeConceptRecord = {
      id,
      caseId: entity.caseId,
      label: entity.name,
      entityType: entity.type,
      definition: entity.description || entity.definition,
      examples,
      sourceRelationIds: involving.map((relation) => relation.id),
      status: "candidate"
    };
    nativeConcepts.push(native);
    nativeById.set(id, native);
    sourceRelationIdsByNative.set(id, native.sourceRelationIds);
    contextByNative.set(
      id,
      `${entity.name} ${native.definition} ${context}`
    );
  }

  const rulesByType = new Map<CoreEntityType, SharedConceptRule[]>();
  for (const rule of rules.sharedConcepts) {
    const values = rulesByType.get(rule.entityType) ?? [];
    values.push(rule);
    rulesByType.set(rule.entityType, values);
  }

  const matchedRuleByNative = new Map<string, SharedConceptRule>();
  for (const native of nativeConcepts) {
    const candidates = rulesByType.get(native.entityType) ?? [];
    const text = contextByNative.get(native.id) ?? native.label;
    const ranked = candidates
      .map((rule) => ({ rule, score: matchScore(text, rule.matchTerms) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.rule.id.localeCompare(b.rule.id));
    if (ranked[0]) matchedRuleByNative.set(native.id, ranked[0].rule);
  }

  const casesByRule = new Map<string, Set<string>>();
  for (const [nativeId, rule] of matchedRuleByNative) {
    const native = nativeById.get(nativeId);
    if (!native) continue;
    const cases = casesByRule.get(rule.id) ?? new Set<string>();
    cases.add(native.caseId);
    casesByRule.set(rule.id, cases);
  }
  const validRuleIds = new Set(
    [...casesByRule.entries()]
      .filter(([, caseIds]) => caseIds.size >= 2)
      .map(([ruleId]) => ruleId)
  );

  for (const [nativeId, rule] of [...matchedRuleByNative]) {
    if (!validRuleIds.has(rule.id)) matchedRuleByNative.delete(nativeId);
  }

  const nativeIdsByRule = new Map<string, string[]>();
  for (const [nativeId, rule] of matchedRuleByNative) {
    const values = nativeIdsByRule.get(rule.id) ?? [];
    values.push(nativeId);
    nativeIdsByRule.set(rule.id, values);
  }

  const conceptMappings: ConceptMappingRecord[] = [];
  for (const native of nativeConcepts) {
    const rule = matchedRuleByNative.get(native.id);
    const relations = native.sourceRelationIds
      .map((relationId) => relationById.get(relationId))
      .filter((relation): relation is ConceptRelation => Boolean(relation));
    const evidenceIds = unique(
      relations.flatMap((relation) => relation.evidenceSentenceIds ?? [])
    );
    conceptMappings.push({
      id: `MAP-${native.id.replace(/^NC-/, "")}`,
      caseId: native.caseId,
      nativeConceptId: native.id,
      sharedConceptId: rule?.id,
      mappingType: rule ? "partial_or_approximate" : "no_map",
      basis: rule
        ? `实体名称、定义与关系语境命中“${rule.label}”的候选语义边界；需研究者复核。`
        : "现有共享概念无法准确覆盖该实体的案例语义。",
      scope: rule?.scope ?? "保留全部案例原生语义",
      evidenceIds,
      decision: "candidate",
      version: rules.packetId
    });
  }

  const sharedConcepts: SharedConceptRecord[] = rules.sharedConcepts
    .filter((rule) => validRuleIds.has(rule.id))
    .map((rule) => {
      const supportingNativeIds = nativeIdsByRule.get(rule.id) ?? [];
      const supportingCaseIds = unique(
        supportingNativeIds.map(
          (nativeId) => nativeById.get(nativeId)?.caseId ?? ""
        )
      ).sort();
      return {
        id: rule.id,
        label: rule.label,
        definition: rule.definition,
        entityType: rule.entityType,
        scope: rule.scope,
        supportingCaseIds,
        supportingNativeIds,
        negativeExamples: rule.negativeExamples,
        version: rules.packetId,
        review: "candidate_pending_researcher"
      };
    });

  return { nativeConcepts, sharedConcepts, conceptMappings };
}
