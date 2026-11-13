# C14 劲松北社区案例知识包

本目录保存北京劲松北社区（劲松一区、二区）有机更新与智慧治理案例从 G0 到 G6 的候选内容、审核包、研究者决定与修改记录。

## 目录

- `case_scope.md`：G0 案例边界（v1.0 确认版）
- `materials.md` / `materials.json`：G1 材料登记（M01–M17）
- `evidence.md` / `evidence.json`：G2 证据索引（56 条）
- `process.md` / `process.json`：G3 过程重建（7 个过程段落）
- `entities.md` / `entities.json`：G4 实体表（62 个）
- `facts.md` / `facts.json`：G4 原子事实（58 条）
- `relations.md` / `relations.json`：G5/G6 关系表（69 条，v1.1）
- `case_pack.md` / `case_pack.json`：最终案例知识包
- `materials/`：已获取的原始页面/HTML（工作副本）
- `extracted/`：从原始页面提取的纯文本，便于定位
- `review/`：每个 gate 的 Review Packet、研究者决定与修改记录
- `_scratch/`：检索与抓取脚本、原始检索结果（不作为证据）

## 状态

- 当前 gate：G0–G6 全部完成
- 当前状态：G6 已冻结；`case_pack` v1.0 已生成；已导入数据库
- 证据截止：2026-11-13
- 当前产出：`case_scope.md` v1.0、`materials.md` / `materials.json` v1.0、`evidence.md` / `evidence.json` v1.0、`process.md` / `process.json` v1.0、`entities.md` / `entities.json` v1.1、`facts.md` / `facts.json` v1.0、`relations.md` / `relations.json` v1.1、`case_pack.md` / `case_pack.json`、`review/G6-audit-v0.1.md`、`review/G6-change-log.md`、`IMPORT_RECORD.md`

## 规则

- 所有 AI 输出均为候选；研究者确认后才冻结。
- 每个 gate 的 packet 未获 `yes` 前，不开始下一阶段。
- 不覆盖历史版本与审核记录。
- 区分技术、能力与行动；技术具备某种能力，不代表该能力已进入实际使用。
- 不把计划、观点、企业宣传或媒体报道写成已实施事实。

## 下一步

向 `scalable-concept-framework` 交接：62 个原生实体、69 条关系、14 个原生概念、5 个共享概念候选、证据指针、审核记录与未决问题。不要在本包内确认正式共享概念。

## L2 概念层

- 当前状态：L2-G1–G4 已完成；`L2-C14-shared-v1.0` 已发布（文件层）
- `concepts/native_concept_inventory.md` / `.json`：14 个原生概念盘点
- `concepts/concept_mapping.md` / `.json`：20 条映射、10 个新候选、2 个 `no_map`
- `concepts/concept_mapping_v1.0.md` / `.json`：发布版映射
- `concepts/shared_concepts_v1.0.json`：10 个单案例候选
- `concepts/network_update.md`、`concepts/ontology_delta_v1.0.json`、`concepts/version_record.md`：G3/G4 交付
- `concepts/handoff.md`：向 `cross-case-causal-analysis` 的交接说明
