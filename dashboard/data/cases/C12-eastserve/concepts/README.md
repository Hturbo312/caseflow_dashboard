# C12 Eastserve 概念层工作区

本目录保存 L2 `scalable-concept-framework` 的产物：

- `native_concept_inventory.md` / `.json`：G1 原生概念盘点
- `shared_concept_candidates.md` / `.json`：G2 共享概念候选
- `concept_mappings.md` / `.json`：G2 概念映射草表
- `ontology_delta.md` / `.json`：G3 本体增量
- `version_record.md`：G4 版本记录
- `review/`：各 gate 的 Review Packet 与决定

当前状态：L2 G1–G4 已完成；版本 `L2-C12-shared-v1.0` 已发布并写入 SQLite。

## 规则

- 不覆盖 C01–C11 的原生节点、共享概念与历史映射。
- 单案例概念可以 `no_map`。
- 部分映射只映射有依据的语义成分。
