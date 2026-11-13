# C16 概念层（L2 v1.0）

> 状态：`L2-C16-concepts-v1.0` 已发布（文件层）。未确认正式共享概念。

## 目录

- `native_concept_inventory_v1.0.md` / `.json`：9 个原生概念盘点。
- `shared_concept_candidates_v1.0.md` / `.json`：4 个单案例候选。
- `concept_mappings_v1.0.md` / `.json`：9 条映射（3 下位、2 部分、4 no_map）。
- `concept_network_v1.0.md` / `.json`：18 节点 / 18 边增量网络。
- `historical_review.md`：历史一致性回查。
- `ontology_delta_v1.0.md` / `.json`：本体增量。
- `version_record.md`：版本记录与发布边界。
- `review/`：L2-G1–G4 审核包与决定日志。

## 状态

- 正式共享概念：0。
- 单案例候选：4（SC-C16-201–204）。
- 既有层修改：0。
- SQLite：已写入（`caseflow-c01-c17`；C16 实体 89、证据 100、关系 110、候选 4、映射 9）。

## 规则

- 候选概念不得在页面或接口中标为正式 `SC-xxx`。
- 至少第二个案例支持后，才能提交正式共享概念。
- 不覆盖 C01–C12 的原生概念与历史映射。
