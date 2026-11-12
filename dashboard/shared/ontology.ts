export const ONTOLOGY_VERSION = "0.1";

export const CORE_ENTITY_TYPES = [
  "context",
  "actor",
  "task",
  "technology",
  "capability",
  "action",
  "target",
  "outcome"
] as const;

export type CoreEntityType = (typeof CORE_ENTITY_TYPES)[number];
export type EntityType = CoreEntityType | "case";

export interface CoreEntityDefinition {
  type: CoreEntityType;
  label: string;
  labelEn: string;
  definition: string;
  codingQuestion: string;
}

export const CORE_ENTITY_DEFINITIONS: Record<
  CoreEntityType,
  CoreEntityDefinition
> = {
  context: {
    type: "context",
    label: "情境",
    labelEn: "CONTEXT",
    definition: "影响更新目标、行动选择与结果解释的环境、社会、制度或技术条件。",
    codingQuestion: "什么背景条件使该行动成为必要、可能或受到限制？"
  },
  actor: {
    type: "actor",
    label: "主体",
    labelEn: "ACTOR",
    definition: "参与、决策、实施、使用或受影响的人、群体与组织。",
    codingQuestion: "谁在行动、决策、使用或被影响？"
  },
  task: {
    type: "task",
    label: "任务",
    labelEn: "TASK",
    definition: "需要被完成的目标性工作、研究任务或过程目标。",
    codingQuestion: "这一阶段要完成什么工作？"
  },
  technology: {
    type: "technology",
    label: "技术",
    labelEn: "TECHNOLOGY",
    definition: "被引入、配置或使用的工具、平台、设备、数据系统与方法。",
    codingQuestion: "使用了什么工具、平台、设备或方法？"
  },
  capability: {
    type: "capability",
    label: "能力",
    labelEn: "CAPABILITY",
    definition: "技术或组织能够提供、但未必已经进入实际使用的功能与行动潜能。",
    codingQuestion: "该技术或组织具备什么功能？它是否真的被使用？"
  },
  action: {
    type: "action",
    label: "行动",
    labelEn: "ACTION",
    definition: "在具体过程中实际发生的操作、互动、沟通或决策。",
    codingQuestion: "谁在何时做了什么？"
  },
  target: {
    type: "target",
    label: "作用对象",
    labelEn: "TARGET",
    definition: "被观察、处理、服务、连接或改变的人、物、数据与空间。",
    codingQuestion: "行动直接作用于什么对象？"
  },
  outcome: {
    type: "outcome",
    label: "结果",
    labelEn: "OUTCOME",
    definition: "具有证据依据的产出、状态变化、后果与后续行动基础。",
    codingQuestion: "行动产生了什么可观察的产出或变化？"
  }
};

export const FACT_STATUSES = [
  "implemented",
  "planned",
  "reported_or_opinion",
  "disputed",
  "unconfirmed"
] as const;

export type FactStatus = (typeof FACT_STATUSES)[number];

export const FACT_STATUS_LABELS: Record<FactStatus, string> = {
  implemented: "已实施",
  planned: "计划",
  reported_or_opinion: "观点/报道",
  disputed: "争议",
  unconfirmed: "未确认"
};

export const MAPPING_TYPES = [
  "semantic_equivalent",
  "native_hyponym",
  "partial_or_approximate",
  "no_map"
] as const;

export type MappingType = (typeof MAPPING_TYPES)[number];

export const MAPPING_TYPE_LABELS: Record<MappingType, string> = {
  semantic_equivalent: "语义等同",
  native_hyponym: "原生为下位",
  partial_or_approximate: "部分或近似映射",
  no_map: "暂不映射"
};

export const REVIEW_ACTIONS = [
  "accept",
  "modify",
  "delete",
  "discuss",
  "supplement"
] as const;

export type ReviewAction = (typeof REVIEW_ACTIONS)[number];

export const CAUSAL_STATUSES = [
  "hypothesis",
  "supported",
  "conclusion",
  "refuted"
] as const;

export type CausalStatus = (typeof CAUSAL_STATUSES)[number];

export const CONFIDENCE_LEVELS = ["low", "medium", "high"] as const;
export type Confidence = (typeof CONFIDENCE_LEVELS)[number];

export const ID_PREFIXES = {
  case: "C",
  material: "M",
  evidence: "E",
  process: "P",
  fact: "F",
  relation: "R",
  nativeConcept: "NC",
  sharedConcept: "SC",
  mapping: "MAP",
  causalClaim: "CC",
  comparison: "CMP",
  question: "Q"
} as const;

export function isCoreEntityType(value: string): value is CoreEntityType {
  return (CORE_ENTITY_TYPES as readonly string[]).includes(value);
}

export function isFactStatus(value: string): value is FactStatus {
  return (FACT_STATUSES as readonly string[]).includes(value);
}

export function isMappingType(value: string): value is MappingType {
  return (MAPPING_TYPES as readonly string[]).includes(value);
}

export function isReviewAction(value: string): value is ReviewAction {
  return (REVIEW_ACTIONS as readonly string[]).includes(value);
}

export function isCausalStatus(value: string): value is CausalStatus {
  return (CAUSAL_STATUSES as readonly string[]).includes(value);
}

export function isConfidence(value: string): value is Confidence {
  return (CONFIDENCE_LEVELS as readonly string[]).includes(value);
}
