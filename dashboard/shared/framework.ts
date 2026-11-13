import type { OntologyVersion } from "./types";

export const FRAMEWORK_VERSIONS: OntologyVersion[] = [
  {
    id: "v0",
    version: "V0",
    title: "初始概括框架",
    structure: "主体 — 措施 — 结果",
    adjustment: "以统一线索提取案例整体内容",
    problem: "初步回答谁实施了何种措施、形成什么成果",
    chapter: "3.1.3"
  },
  {
    id: "v1",
    version: "V1",
    title: "行动细化框架",
    structure: "主体 — 行动 — 作用对象 — 结果",
    adjustment: "将综合性措施拆解为具体行动，区分行动及其指向对象",
    problem: "表达措施内部的活动与过程差异",
    chapter: "3.2.1"
  },
  {
    id: "v2",
    version: "V2",
    title: "情境与任务扩展框架",
    structure: "情境、主体、任务、行动、作用对象、结果（六类）",
    adjustment: "区分行动发生条件与希望完成的任务",
    problem: "比较相近行动为何出现于不同背景、服务不同目标",
    chapter: "3.2.2"
  },
  {
    id: "v3",
    version: "V3",
    title: "技术作用知识框架",
    structure: "情境、主体、任务、技术、能力、行动、作用对象、结果（八类）",
    adjustment: "将技术和能力独立识别，并完善开放关系、时空属性与证据关联",
    problem: "分析技术通过何种功能、经由什么行动参与社区更新",
    chapter: "3.2.2-3.3"
  },
  {
    id: "v4",
    version: "V4",
    title: "可扩展案例知识框架",
    structure: "固定八类实体 + 开放关系 + 案例原生知识 + 共享概念及映射",
    adjustment: "增加概念对齐、逐案扩展和历史映射一致性维护",
    problem: "在保留案例差异的同时积累跨案例可比较知识",
    chapter: "3.4"
  }
];
