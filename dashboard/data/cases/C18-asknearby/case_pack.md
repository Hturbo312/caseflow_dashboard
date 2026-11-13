# C18 方元问问（AskNearby）案例包

> 状态：**v1.1 已冻结，含 L2-C18-v1.0 文件级发布**（2026-11-13）
> 案例单位：一次平台研发与深圳双社区试运行事件
> 交接对象：`scalable-concept-framework`

## 1. 基本信息

| 字段 | 内容 |
|---|---|
| 案例编号 | C18 |
| 中文名称 | 方元问问（AskNearby）大语言模型社区信息服务平台研发与深圳双社区试运行 |
| 英文名称 | AskNearby: An LLM-enabled Community Information Service Platform in Shenzhen |
| 核心期 | 2024 年秋季—2025-03-15 |
| 扩展观察期 | 2025-04—2026-11-13 |
| 空间 | 北京大学深圳研究生院、南头古城；扩展观察为桃源街道大学城社区 |

## 2. 交付计数

| 对象 | 数量 |
|---|---:|
| 材料 | 7 |
| 证据 | 51 |
| 过程 | 7 |
| 原子事实 | 56 |
| 实体 | 83 |
| 关系 | 101 |
| 原生概念 | 10 |
| 共享概念候选 | 7 活跃 + 1 保留 |

关系状态：已实施 23、作者报告/观点 71、计划 3、争议 4。

## 2.1 L2 概念层

- 案例层版本：`L2-C18-v1.0`
- 本体版本：`V4` 不变
- 映射：16 条（7 hyponym、6 partial、3 no_map）
- 活跃单案候选：7；保留候选：1
- 既有共享概念支持增量：6
- 增量后活跃共享概念：64
- 发布范围：文件级；未写 SQLite

## 2.2 数据库与图片

- SQLite：已导入 `dashboard/data/community-renewal.db`。
- 导入脚本：`dashboard/scripts/import-c18.ts`。
- 图片：`C18-1.jpg`（四层架构）、`C18-2.jpg`（RAG框架）、`C18-3.jpg`（APP三类场景）。
- 媒体索引：`dashboard/shared/case-media.ts`。
- 导入与验证记录：`import_record.md`。

## 3. 核心结构

- **平台**：四层架构，整合时空知识图谱、地理邻近性多模态 RAG、垂域大模型、时空向量库与时空分析引擎。
- **高校试点**：2024 年秋季面向新生约 30 天；作者报告渗透率 46%、活跃峰值 1500、信息获取耗时 15→3 分钟等。
- **南头试点**：高密度混合社区；作者报告工单响应 +67%、23 项痛点、导视两周更新、1472 次线下交互、359 条在地知识等。
- **获奖与资助**：2024 年益创星赛道金奖；资助受助组合存在 M05/M06/M07 三种不一致口径。
- **扩展期**：2025-10 社区开放日中使用同名小程序进行线上打卡、分享体验；不能证明核心试点持续运行。

## 4. 质量检查

- G0–G6 共 7 个关口均有研究者确认记录。
- 证据引文：51/51 通过空白归一化回查；网页 16/16 精确匹配。
- 事实证据覆盖：56/56。
- 关系端点、角色、证据、过程引用：0 错误。
- 重复三元组：0；孤立实体：0；未引用事实：0。

## 5. 交付文件

- 边界：`case_scope.md`
- 材料：`materials.md`、`materials.json`
- 证据：`evidence.md`、`evidence.json`
- 过程：`process.md`、`process.json`
- 事实：`facts.md`、`facts.json`
- 实体：`entities.json`
- 关系：`relations.md`、`relations.json`、`relations_v1.0.md`、`relations_v1.0.json`
- 概念：`l2_native_concepts.md`、`l2_native_concepts.json`
- 概念层：`native_concept_inventory.*`、`shared_concept_candidates_v1.0.*`、`concept_mapping_v1.0.*`、`historical_mapping_review.*`、`network_delta_v1.0.*`、`ontology_delta.*`、`l2_version_record.*`、`l2_shared_concepts_v1.0.json`
- 审核：`review/decision-log.md`、`review/relation-review.md`、`review/RP-C18-G0-v1.0-confirmed.md` … `review/RP-C18-G6-v1.0-frozen.md`

## 6. 未决问题

1. APP 与小程序是否为同一客户端/技术版本。
2. 论文作者团队与北京大学方元问问团队是否为同一主体。
3. 20 万元资助的受助项目组合与奖项层级。
4. 南头古城试运行起止时间和管理方身份。
5. 指标分母、基线、统计期与原始数据。
6. 2025-11 之后的持续运行与维护。
7. 更大范围多类型社区验证。

## 7. 交接说明

本案例已完成 `scalable-concept-framework` 的 L2-G1—G4：7 个 C18 候选仍为单案，不确认正式共享概念；6 个既有概念仅增加 C18 支持。当前交接对象为 `cross-case-causal-analysis`。
