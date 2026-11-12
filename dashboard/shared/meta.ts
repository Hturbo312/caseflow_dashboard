import {
  CORE_ENTITY_DEFINITIONS,
  CORE_ENTITY_TYPES,
  type CoreEntityType,
  type EntityType
} from "./ontology";

export const TYPE_META: Record<
  EntityType,
  { label: string; labelEn: string; color: string; soft: string }
> = {
  case: {
    label: "案例",
    labelEn: "CASE",
    color: "#20242a",
    soft: "#e9e5dc"
  },
  context: {
    label: CORE_ENTITY_DEFINITIONS.context.label,
    labelEn: CORE_ENTITY_DEFINITIONS.context.labelEn,
    color: "#8a7543",
    soft: "#f0eadb"
  },
  actor: {
    label: CORE_ENTITY_DEFINITIONS.actor.label,
    labelEn: CORE_ENTITY_DEFINITIONS.actor.labelEn,
    color: "#98683d",
    soft: "#f1e7dc"
  },
  task: {
    label: CORE_ENTITY_DEFINITIONS.task.label,
    labelEn: CORE_ENTITY_DEFINITIONS.task.labelEn,
    color: "#315f8a",
    soft: "#e4ebf2"
  },
  technology: {
    label: CORE_ENTITY_DEFINITIONS.technology.label,
    labelEn: CORE_ENTITY_DEFINITIONS.technology.labelEn,
    color: "#2f6b66",
    soft: "#e1ece9"
  },
  capability: {
    label: CORE_ENTITY_DEFINITIONS.capability.label,
    labelEn: CORE_ENTITY_DEFINITIONS.capability.labelEn,
    color: "#6b5b8a",
    soft: "#eae6f1"
  },
  action: {
    label: CORE_ENTITY_DEFINITIONS.action.label,
    labelEn: CORE_ENTITY_DEFINITIONS.action.labelEn,
    color: "#b8442f",
    soft: "#f4e6e1"
  },
  target: {
    label: CORE_ENTITY_DEFINITIONS.target.label,
    labelEn: CORE_ENTITY_DEFINITIONS.target.labelEn,
    color: "#5c7a8a",
    soft: "#e7edf0"
  },
  outcome: {
    label: CORE_ENTITY_DEFINITIONS.outcome.label,
    labelEn: CORE_ENTITY_DEFINITIONS.outcome.labelEn,
    color: "#5f7f4a",
    soft: "#e8efe2"
  }
};

export const ENTITY_TYPES: CoreEntityType[] = [...CORE_ENTITY_TYPES];

export const STRENGTH_META = {
  high: { label: "强证据", color: "#2f6b66" },
  medium: { label: "中证据", color: "#8a7543" },
  low: { label: "弱证据", color: "#9a9a93" }
} as const;

export const CHANGE_META = {
  add: { label: "新增", color: "#2f6b66" },
  refine: { label: "修订", color: "#8a7543" },
  link: { label: "关联", color: "#315f8a" },
  remove: { label: "移除", color: "#b8442f" }
} as const;
