# C13 Motor City Mapping 案例知识包

本目录保存底特律 Motor City Mapping（MCM）案例从 G0 到 G6 的候选内容、审核包、研究者决定与修改记录。

## 目录

- `case_scope.md`：G0 案例边界（v1.0 已确认）
- `materials.md`：G1 材料登记表（17 份，已确认）
- `evidence.md`：G2 证据索引（66 条，候选）
- `process.md`：G3 过程重建（9 段，候选）
- `facts.md`：G4 原子事实（58 条，候选）
- `entities.json`：G4 实体与语义角色（75 个，候选）
- `relations.md`：G5 关系候选（84 条，候选）
- `relations.json`：G5 关系全字段数据
- `case_pack.md` / `case_pack.json`：案例知识包清单（v1.0 冻结）
- `l2_native_concepts.md` / `.json`：L2 G1 原生概念清单
- `l2_concept_mapping.md` / `.json`：L2 G2 映射与共享概念候选（v0.1 候选）
- `l2_shared_concepts_v1.0.json`：L2 新增 8 个共享概念候选
- `l2_ontology_delta.md` / `.json`：本体增量
- `l2_version_record.md` / `.json`：版本记录
- `l2_network_update.md`：增量网络更新与数据库导入步骤
- `l2_import_record.md`：dashboard 导入与图片验证记录
- `materials/`：踏勘阶段获取的原始材料（HTML/PDF），尚未登记为 Mxx
- `extracted/`：从原始材料提取的纯文本，便于定位
- `review/`：每个 gate 的 Review Packet、决定日志与踏勘记录
- 后续：`materials.md`、`evidence.md`、`process.md`、`facts.md`、`relations.md`、`case_pack.json`

## 状态

- 当前 gate：L2 已完成并导入
- 当前状态：`L2-C13-shared-v1.0` 已发布；dashboard 已导入 C13（含图片）
- 证据截止：2026-11-13

## 规则

- 所有 AI 输出均为候选；研究者确认后才冻结。
- 每个 gate 的 packet 未获 `yes` 前，不开始下一阶段。
- 不覆盖历史版本与审核记录。
