# Review Packet

- packet_id: `RP-C19-G5-v0.1`
- skill: `case-knowledge-construction`
- gate: `G5 关系编码`
- case_id: `C19`
- scope: Connect East Cleveland 的实体关系、谓词、方向、状态与限定
- generated_at: 2026-11-13

## 1. 本轮处理范围

- 输入材料/案例: G4 冻结的 85 个实体、47 条事实、70 条证据。
- 已处理: 106 条关系候选，含头/尾实体、谓词、方向、状态、时空/数量限定、证据、过程与事实关联。
- 未处理: 关系审校（G6）——重复、遗漏、方向错误、谓词合并与最终冻结。
- 证据截止时间: 2026-11-13

## 2. 候选摘要

### 2.1 数量与状态

| 指标 | 数量 |
|---|---|
| 关系总数 | 106 |
| 使用实体 | 85 / 85 |
| 引用事实 | 47 / 47 |
| implemented | 90 |
| planned | 9 |
| disputed | 5 |
| reported_or_opinion | 2 |
| 不同谓词 | 61 |

### 2.2 关系簇

| 簇 | 代表关系 | 说明 |
|---|---|---|
| 项目情境 | X03→X02、A01→X04、X04→G01、A01→G01 | 前置规划、master developer、30 英亩目标区 |
| 团队与本地知识 | A01→A19、A19→A07、A07→C05 | 项目团队、带薪 Street Team Leader |
| 2023 参与 | A19→N02/N03/N04/N08/N09、A08→N02/N03/N04 | 四场活动与参与者 |
| 参与技术 | N03→T03、N05→T02、N06→T01、N07→T04/T05 | AR、3D 模型、UrbanistAI、问卷/故事 |
| 行动清单 | A19→O01、O01→G06/G05、A01→G06、A02/A16→G06 | 30 项行动、牵头/管辖 |
| 2024 实施 | A01→N11/N12/N16、A12/A02→N13、A13→O06 | 花箱、绿道清表、资金、长椅、Mickey’s |
| Loiter 争议 | A01→A14、A14→A01、A01→A14（和解） | 换锁/诉讼/和解，状态分别为 reported/implemented |
| 2025–2026 | A01→N19/N20/N14、A03→A01/X04 | Phase 1 破土/剪彩、市议会争议 |

### 2.3 状态敏感关系

| 编号 | 关系 | 状态 | 处理 |
|---|---|---|---|
| R068 | A01 锁闭/换锁 A14 | reported_or_opinion | 保留“据诉状称”，不得写成法院认定 |
| R069 | A14 起诉 A01 | reported_or_opinion | 保留诉状/报道口径 |
| R079 | A03 要求 A01 停止运营 | disputed | 仅单一来源，待决议原件 |
| R080 | A03 质疑 X04 授权 | disputed | 同上 |
| R081 | X06 约束 X04 | disputed | 同上 |
| R101 | A03 产生 O13 决议争议 | disputed | 同上 |
| R102 | A19 安排 K02 时间 | disputed | 1–8 月 vs 4 月起 |

## 3. 冲突、缺口与不确定项

- **谓词增殖**
  - 106 条关系使用 61 个谓词，其中大量为一次性（`held`、`organized`、`included`、`includes`、`participated_in`、`participates_in`、`planned`、`plans` 等）。G6 应合并同义谓词，但不关闭谓词集合。
- **方向不一致**
  - 多数实施关系为 actor→action（A01→N11），部分参与关系为 action→actor（N02→A08）。G6 应统一：实施/组织关系用 actor→action；参与关系用 actor→action（A08→N04），避免 action→actor。
- **近重复**
  - `A01 planned N14`（2024 待招标）与 `A01 completed N14`（2026 建成）：同一行动的不同时间/状态，保留但需在 qualifiers 明确。
  - `O01 guides K04` 与 `O01 specifies G06`：前者是报告指导实施，后者是行动表指定地点，语义不同，暂保留。
  - `A01 leads G06` 与 `A02/A16 co_governs G06`：主体不同，保留；G6 可把 `co_governs` 改为 `has_jurisdiction_over`。
- **缺口**
  - 缺 30 项行动的逐项负责人/状态关系（当前只有汇总级 leads/co_governs）。
  - 缺 2025 年 Verdynt 交易失败、Loiter 迁址等后续关系（材料不足）。
  - 缺市议会决议/合同原件，争议关系无法升级为 implemented。
- **因果边界**
  - `produced` 仅表示行动产出，不表示因果机制；`O02 reports_reach_of K02` 不写成“参与导致 150 人”。
  - 未写“AI 提升参与质量”“绿道提升健康”等未经证实的效果关系。

## 4. 需要研究者裁决的事项

1. **106 条关系是否整体接受？** 建议接受，交由 G6 做重复/方向/谓词审校。
2. **是否在 G6 合并同义谓词？** 建议合并 `held/organized`、`included/includes`、`participated_in/participates_in`、`planned/plans` 等，保留开放谓词集。
3. **是否在 G6 统一方向？** 建议实施/组织关系统一 actor→action；参与关系统一 actor→action（参与者为主语）。
4. **`A01 planned N14` 与 `A01 completed N14` 是否保留为两条？** 建议保留，qualifiers 分别写“2024 待招标”与“2026-07 建成”。
5. **`A02/A16 co_governs G06` 是否改为 `has_jurisdiction_over`？** 建议 G6 改名，避免“共同治理”过强。
6. **`A19 scheduled K02` 是否保留为 disputed？** 建议保留为时间口径冲突，不写成已实施。

## 5. 历史影响

- 是否影响既有共享概念: 否。
- 是否影响历史映射: 否。
- 是否触发历史案例回查: 否。
- 影响范围: 新增 C19 关系层；不修改 C01–C18。

## 6. 研究者决定

- 动作: accept / modify / delete / discuss / supplement
- 理由:
- 修改内容:
- 是否允许进入下一阶段: yes / no
- 决定时间:

## 7. 锁定记录

- 冻结产物: 无（等待研究者确认）
- 版本: `relations.md` / `relations.json` v0.1（候选）
- 未决事项: 整体接受、谓词合并、方向统一、N14 双状态、co_governs 改名、K02 时间冲突
