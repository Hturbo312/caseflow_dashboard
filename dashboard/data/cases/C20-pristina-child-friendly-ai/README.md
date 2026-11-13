# C20 普里什蒂纳儿童友好公共空间人工智能共创案例知识包

本目录保存普里什蒂纳（Prishtinë/Priština）儿童友好公共空间 AI 共创案例从 G0 到 G6 的候选内容、审核包、研究者决定与修改记录。

## 目录

- `case_scope.md`：G0 案例边界（v1.0，G0 已确认）
- `materials/`：已获取的原始材料（HTML/文本）
- `extracted/`：从原始材料提取的纯文本，便于定位
- `materials.md` / `materials.json`：G1 材料登记（v1.0）
- `evidence.md` / `evidence.json`：G2 证据索引（43 条）
- `process.md` / `process.json`：G3 过程段落（C20-P01–P07）
- `entities.json`：G4 实体表（39 个）
- `facts.md` / `facts.json`：G4 原子事实（47 条）
- `relations.md` / `relations.json`：G5/G6 关系集合（54 冻结 + R038 待讨论）
- `relations_v0.1.*`：G5 确认版快照
- `relations_frozen_v0.2.*`：G6 冻结版快照
- `case_pack.md` / `case_pack.json`：最终案例知识包与 L2 交接清单
- `l2_native_concepts.md` / `l2_native_concepts.json`：L2-G1 原生概念盘点（7 个条目）
- `l2_concept_mapping.md` / `.json`：L2-G2 映射表（G3 更正为 9 条）
- `l2_shared_candidates.md` / `.json`：L2-G2 候选（G3 撤回 SC-C20-01）
- `l2_historical_mapping_review.md` / `.json`：L2-G3 历史映射回查
- `l2_network_delta.md` / `.json`：L2-G3 增量网络更新
- `l2_concept_mapping_v1.0.md` / `.json`：最终 9 条映射（候选发布）
- `l2_shared_concepts_v1.0.json`：C20 共享概念增量（SC-C19-102 晋升、SC-C20-02 候选、SC-C20-01 撤回）
- `l2_ontology_delta.md` / `.json`：本体增量（V4 不变）
- `l2_version_record_candidate.md` / `.json`：`L2-C20-v1.0` 候选版本记录
- `l2_version_record.md` / `.json`：`L2-C20-v1.0` 正式版本记录（released）
- `l2_release_summary.md` / `.json`：发布摘要与 L3 交接清单
- `C:\Users\zhaosiqi02\.hermes\shared-knowledge\projects\caseflow_dashboard\dashboard\scripts\import-c20.ts`：SQLite 导入脚本（含备份、事务、审核包）
- `review/`：每个 gate 的 Review Packet 与决定日志

## 状态

- 当前 gate：L2-G4（已发布）
- 当前状态：G0–G6 全部确认；`case_pack v1.0`；L2-G1–G4 全部确认；`L2-C20-v1.0` 已发布并导入 SQLite
- 证据截止：2026-11-13
- 未决项：R038（许可主体）、设计—地点对应、1 个公园位置、AI 输出记录、儿童直接反馈、年龄口径；C18“64 个活跃概念”与当前库 102 条记录（含单案/待二案/held）的口径差异

## 数据库与图片

- C20 已导入 `dashboard/data/community-renewal.db`；导入前备份在 `data/_backup/community-renewal.db.before-c20-*.db`。
- 导入计数：39 实体、13 材料、43 证据、7 过程、47 事实、54 冻结关系、7 原生概念、9 映射、11 审核包/决定。
- 图片：`public/case-media/C20-1..7.jpg`，媒体清单在 `shared/case-media.ts#C20`；已通过 `/case-media/C20-1.jpg` 验证可访问。
- 数据库实际共享概念计数：102 条记录、48 `researcher_confirmed`、45 单案候选、7 待二案、1 evidence_weak、1 held；版本记录已加“导入校正”说明。

## 规则

- 所有 AI 输出均为候选；研究者确认后才冻结。
- 每个 gate 的 packet 未获 `yes` 前，不开始下一阶段。
- 不覆盖历史版本与审核记录。
- 不把“启动实施”写成“已建成”，不把供应商效果表述写成技术效果结论。
