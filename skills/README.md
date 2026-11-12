# Community Case Knowledge

面向社区更新跨案例比较的三层案例知识管线。案例单位是「一次社区更新事件的完整过程」。

## 三个 Skill

1. **case-knowledge-construction** — 从多源材料构建单案例的 M/E/P/F/R 知识包。每个阶段由智能体生成候选，研究者确认后冻结。
2. **scalable-concept-framework** — 管理原生概念、共享概念候选、概念映射和增量知识网络。首案只产候选；通常至少两个案例支持才确认共享概念。
3. **cross-case-causal-analysis** — 在混合知识图谱上识别比较对象、关系模式，开展引导式因果追问，形成机制假设与因果结论。

## 共享契约

- `contracts/case-knowledge-contract.md` — 编号、字段、分层、硬约束和交接协议。
- `contracts/review-packet.md` — 每个阶段的确认包格式。
- `contracts/causal-claim-schema.md` — 因果主张、证据标准和引导式追问规范。

## 编码手册

`references/coding-manual.md` 是附录 A 的原始编码手册，是 L1/L2 的事实来源。SKILL.md 不重复整本手册，只引用对应章节。

## 人机分工

智能体负责材料检索、证据定位、过程整理、事实拆解、关系候选、概念映射建议、统计与模式检索。研究者负责来源核验、事实确认、粒度判断、概念边界、关系裁定和因果结论。

所有阶段都遵循：**智能体生成候选 → 研究者裁决 → 产物锁定**。未确认的候选不得进入下一阶段。

## 非目标

- 不把未经证实的因果判断写入基础关系表。
- 不为了提高概念重合度而合并概念。
- 不覆盖案例原生知识或历史映射。
- 不强制知识网络连通。

## 与 dashboard 的同一套本体

三层 skill 与社区更新图谱共用一套机器可读本体：

`../dashboard/shared/ontology.ts`

数据库、API 和页面都从该定义派生八类核心实体、事实状态、映射类型和审核动作。skill 产出写入 SQLite 后再由 dashboard 呈现；不得在 skill 或页面中各自新增一套实体清单。字段与表的对应关系见 `contracts/case-knowledge-contract.md` 第 10 节。
