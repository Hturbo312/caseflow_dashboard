# Case Knowledge Contract

三个 skill 共用的数据与交接契约。编码手册中的「专家」在本契约中统一称为「研究者」。

## 1. 案例单位

- 一个 `case_id` = 一次社区更新事件的完整过程。
- 案例边界由研究者确认：事件起止、涉及范围、排除项、证据截止时间和研究问题。
- 不预设固定生命周期阶段；过程段落依据证据与事件联系重建。

## 2. 四层结构

| 层 | 内容 | 用途 |
|---|---|---|
| 证据层 | 原始材料、证据、过程段落、原子事实 | 可核验、可恢复 |
| 原生知识层 | 案例自己的实体、关系谓词和概念 | 保留案例特异性 |
| 共享概念层 | 经研究者确认的跨案例概念与映射 | 支持比较 |
| 因果层 | 机制假设、因果主张、因果结论 | 支持解释，不与基础关系混写 |

原则：**比较走共享层，解释回证据层。** 共享概念不能覆盖原生节点或证据。

## 3. 编号

| 对象 | 编号 | 说明 |
|---|---|---|
| 案例 | `Cxx` | 一个更新事件一个编号 |
| 原始材料 | `Mxx` | 案例内管理 |
| 证据 | `Mxx-Exx` | 按材料与片段组织 |
| 过程段落 | `Cxx-Pxx` | 按事件联系和时间顺序组织 |
| 原子事实 | `Fxxx` | 可独立核验 |
| 关系 | `Rxxx` | 头实体—谓词→尾实体 |
| 原生概念 | `NC-Cxx-xxx` | 案例自己的概念 |
| 共享概念候选 | `SC-Cxx-xxx` | 首案或新案提出的候选 |
| 共享概念 | `SC-xxx` | 经研究者确认 |
| 概念映射 | `MAP-xxx` | 原生概念到共享概念 |
| 因果主张 | `CC-xxx` | 只存在于因果层 |
| 比较任务 | `CMP-xxx` | 一次跨案例比较 |
| 追问记录 | `Q-xxx` | 一次引导式追问 |

编号在所属案例或研究任务内唯一。证据、过程、事实和关系允许一对多或多对多关联，不要求一一对应。

## 4. 基础字段

### 4.1 材料记录

`material_id, case_id, name, source_type, author_or_org, date, link, scope, reliability, verification_status, notes`

### 4.2 证据记录

`evidence_id, material_id, statement, locator, quote_or_span, context, verification_status, linked_process_ids, linked_fact_ids`

证据必须能回到原文位置。无法取得原文或无法定位的内容，记录核验状态，不作为已核实证据使用。

### 4.3 过程段落

`process_id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision`

过程段落应能恢复事件顺序、主体关系、状态变化和来源冲突。

### 4.4 原子事实

`fact_id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review`

### 4.5 关系

`relation_id, case_id, head_entity, head_type, predicate, tail_entity, tail_type, fact_status, qualifiers, evidence_ids, process_ids, review, version`

`fact_status` 取值：

- `implemented` 已实施
- `planned` 计划
- `reported_or_opinion` 观点/报道
- `disputed` 争议
- `unconfirmed` 未确认

关系谓词保持开放，不预设封闭清单。基础关系表不写未经证实的因果判断。

## 5. 概念与映射

### 5.1 原生概念

`native_concept_id, case_id, label, entity_type, definition, examples, source_relation_ids, status`

### 5.2 共享概念候选

`candidate_id, label, definition, entity_type, supporting_native_ids, supporting_case_ids, status`

首案只能产生候选，不产生正式共享概念。默认至少两个案例提供原生实例支持，才能提交研究者确认；例外必须记录理由。

### 5.3 共享概念

`shared_concept_id, label, definition, scope, supporting_case_ids, supporting_native_ids, negative_examples, version, review`

### 5.4 概念映射

`mapping_id, case_id, native_concept_id, shared_concept_id_or_null, mapping_type, basis, scope, evidence_ids, decision, version`

`mapping_type` 严格使用手册四类：

- `semantic_equivalent` 语义等同
- `native_hyponym` 原生为下位
- `partial_or_approximate` 部分或近似映射
- `no_map` 暂不映射

`no_map` 是合法结果。部分映射只映射有依据的语义成分，原生节点的其余属性和关系不自动继承。

## 6. 因果层

因果主张只存在于 `contracts/causal-claim-schema.md` 定义的 `CC-xxx` 记录中，不写入 `Rxxx` 基础关系表。

## 7. 硬约束

1. 无证据不立事实。
2. 无研究者裁决不冻结候选。
3. 无第二个案例支持，不确认正式共享概念；例外须记录。
4. 不把观点、报道或计划状态写成已实施事实。
5. 不把未经证实的因果判断写入基础关系表。
6. 不覆盖原生知识、历史映射或审核记录。
7. 不强制知识网络连通；孤立关系可以保留。
8. 不为了提高 Jaccard 或概念重合度而合并概念。
9. 同一对象可在不同关系中承担不同角色；不得仅因名称相似而合并不同身份或范围的对象。
10. 技术、能力、行动必须区分：技术具备某种能力，不代表该能力已经进入实际使用。

## 8. 审核动作

研究者对每个候选选择：

- `accept` 接受
- `modify` 修改
- `delete` 删除
- `discuss` 待讨论
- `supplement` 补充

所有动作保留原始候选、研究者判断、修改前后内容和理由。未完成审核的候选不得进入最终冻结集合。

## 9. 交接

- L1 → L2：原生节点、关系、概念清单、证据指针、审核记录、未决问题。
- L2 → L3：共享概念层、原生知识层、证据溯源层、映射表、版本记录。
- L3 → L2：新概念候选、边界调整建议、历史映射回查请求。
- L3 → L1：缺证清单、需补材料或需补充过程的请求。

## 10. 本体单一来源与数据库对齐

机器可读本体定义：

`../dashboard/shared/ontology.ts`

展示元数据（中英文标签、颜色、图形）在该项目的 `shared/meta.ts`；SQLite schema 在 `server/db.ts`。三处不得各自维护一套类型清单。

### 10.1 八类核心实体

| 类型 | 中文 | 编码问题 |
|---|---|---|
| `context` | 情境 | 什么背景条件使行动成为必要、可能或受到限制？ |
| `actor` | 主体 | 谁在行动、决策、使用或被影响？ |
| `task` | 任务 | 这一阶段要完成什么工作？ |
| `technology` | 技术 | 使用了什么工具、平台、设备或方法？ |
| `capability` | 能力 | 该技术或组织具备什么功能？它是否真的被使用？ |
| `action` | 行动 | 谁在何时做了什么？ |
| `target` | 作用对象 | 行动直接作用于什么对象？ |
| `outcome` | 结果 | 行动产生了什么可观察的产出或变化？ |

`case` 只是图谱中的案例容器，不是第九类核心实体。

### 10.2 角色多样性

同一对象可以在不同案例、事实或关系中承担不同角色。例如「社区居民」在某个关系中可作为 `actor`，在另一个关系中可作为 `target`。角色记录在 `entity_roles` 表和事实的 `entityRoles` 字段中；不得因为对象名称相同而把它固定成单一类型。

### 10.3 数据库表对齐

| 契约对象 | SQLite 表 | 关键字段 |
|---|---|---|
| 案例 | `cases` | `event_start / event_end / scope / evidence_cutoff / research_question / status` |
| 材料 | `materials` | `source_type / verification_status / reliability / notes` |
| 证据 | `evidence` | `material_id / process_ids / fact_ids / fact_status` |
| 过程 | `processes` | `actor_ids / event_ids / evidence_ids / revision` |
| 事实 | `facts` | `entity_roles / fact_status / time_scope / space_scope / quantity_scope / confidence` |
| 关系 | `relations` | `case_id / fact_status / qualifiers / process_ids / evidence_ids / head_role / tail_role` |
| 原生概念 | `native_concepts` | `entity_type / source_relation_ids / status` |
| 共享概念 | `shared_concepts` | `entity_type / supporting_case_ids / supporting_native_ids / version` |
| 概念映射 | `concept_mappings` | `mapping_type / basis / evidence_ids / decision / version` |
| 因果主张 | `causal_claims` | `mechanism_chain / alternative_explanations / boundary_conditions / what_would_change_mind` |
| 追问 | `causal_questions` | `type / question / evidence_ids / status` |
| 审核包 | `review_packets` | `skill / gate / payload / status` |
| 审核决定 | `review_decisions` | `action / rationale / modified_content / allow_next_gate` |

### 10.4 引用完整性

- 关系编号使用 `R001`、`R002` 形式；原生概念的 `sourceRelationIds` 必须指向真实存在的关系编号。
- 证据的 `materialId` 必须指向同案例的材料；过程、事实和关系引用的证据编号必须存在。
- 过程引用的 `actorIds` 必须指向真实实体；事实中的 `entityRoles` 使用 `entityId:role`，且该实体必须拥有对应角色。
- 新增或修改本体时，先改 `shared/ontology.ts`，再同步 `shared/meta.ts`、`server/db.ts` 和本契约，并提升本体版本号。
- 不得在 skill 中临时引入第九类核心实体；如确需扩展，按 L2 的本体增量流程由研究者确认并记录版本。
