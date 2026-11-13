# C16 Red Hook WiFi 案例知识包（v1.0 冻结）

本目录保存布鲁克林红钩 Red Hook WiFi 案例从 G0 到 G6 的候选内容、审核包、研究者决定与冻结知识包。

## 目录

- `case_scope.md`：G0 案例边界（v1.0 已确认）
- `materials.md` / `materials.json`：G1 材料登记（18 份，v1.0 已确认）
- `evidence.md` / `evidence.json`：G2 证据索引（100 条，v1.0 已确认）
- `process.md` / `process.json`：G3 过程重建（10 段，v1.0 已确认）
- `facts.md` / `facts.json`：G4 原子事实（53 条，v1.0 已确认）
- `entities.md` / `entities.json`：G4 实体与语义角色（89 个，v1.0 已确认）
- `relations.md` / `relations.json`：G5 关系集合（101 条，v1.0 已确认）
- `relations_v0.2_candidate.md` / `.json`：G6 审校候选（110 条）
- `G6-audit.md`：G6 去重、补漏、方向与状态审校记录
- `relations_v2.0.md` / `.json`：G6 冻结关系（110 条）
- `native_concepts.md` / `.json`：原生概念候选（9 个）
- `case_pack.md` / `.json`：案例包与交接清单
- `concepts/native_concept_inventory_v0.1.md` / `.json`：L2-G1 原生概念盘点（9 + 2 补充候选）
- `concepts/shared_concept_candidates_v1.0.md` / `.json`：L2-G2 候选（4 个单案例）
- `concepts/concept_mappings_v1.0.md` / `.json`：L2-G2 映射（9 条）
- `concepts/concept_network_v0.1.md` / `.json`：L2-G3 增量网络（18 节点 / 18 边）
- `concepts/historical_review.md`：L2-G3 历史一致性回查
- `concepts/concept_network_v1.0.md` / `.json`：L2-G3 确认版网络
- `concepts/ontology_delta_v1.0.md` / `.json`：L2-G4 本体增量
- `concepts/version_record.md`：L2-G4 版本记录（候选发布）
- `materials/`：踏勘阶段获取的原始网页与 PDF（`S01–S20`，尚未登记为 `Mxx`）
- `extracted/`：从原始材料提取的纯文本，便于定位
- `review/`：每个 gate 的 Review Packet、决定日志与踏勘记录
- 后续：`materials.md`、`evidence.md`、`process.md`、`facts.md`、`relations.md`、`case_pack.json`

## 状态

- 当前 gate：L2 完成 + SQLite 导入完成
- 当前状态：`L2-C16-concepts-v1.0` 已发布并写入 `caseflow-c01-c17`；4 个候选仍为单案例，未确认正式共享概念
- 证据截止：2026-11-13

## 规则

- 所有 AI 输出均为候选；研究者确认后才冻结。
- 每个 gate 的 packet 未获 `yes` 前，不开始下一阶段。
- 不覆盖历史版本与审核记录。
