# C15 L2 研究者决定日志

> 只追加，不覆盖。每条记录对应 `scalable-concept-framework` 的一个 gate。

## 2026-11-13 / L2-G1 / `RP-C15-L2-G1-v0.1`

- 状态：已确认
- 候选产物：`native_concept_inventory.md`/`native_concept_inventory.json`（14 个重点概念、109 个原生节点）
- 待裁决：
  1. 是否接受 14 个重点原生概念
  2. 是否确认 109 个实体为完整原生节点
  3. 是否确认各概念类型
  4. 是否拆分美丽家园一期/二期
  5. 是否保留 2021/2023 平台、微网格/格里厢/自管队、三会/四单制分列
- 研究者动作：`accept_with_split`
- 理由：接受 14 个重点概念、109 个原生节点；确认类型；美丽家园一期/二期拆分；边界分列。
- 修改内容：
  - `NC-C15-11` 拆分为 `NC-C15-11 美丽家园一期` 与 `NC-C15-15 美丽家园二期`。
  - 重点概念由 14 个变为 15 个。
  - 类型与边界分列确认。
- 是否允许进入 L2-G2：`yes`
- 冻结产物：`native_concept_inventory.*` v1.0、`native_concepts.*` v1.1、`native_concepts_v1.0.*`、`RP-C15-L2-G1-v1.0`（md）

## 2026-11-13 / L2-G2 / `RP-C15-L2-G2-v0.1`

- 状态：已确认
- 候选产物：`concept_disambiguation.md`、`concept_mapping.md`/`concept_mapping.json`（15 条映射、5 个候选）
- 映射统计：0 语义等同、4 下位、5 部分、6 暂不映射
- 待裁决：
  1. 是否接受 15 条映射
  2. 是否接受 5 个新增共享概念候选
  3. 是否确认部分映射不扩展既有共享概念
  4. 是否确认 6 个 no_map 保留原生概念
  5. 是否允许 L2-G3 历史映射回查
- 研究者动作：`accept`
- 理由：接受 15 条映射、5 个新增候选；部分映射不扩展既有共享概念；no_map 保留原生概念；进入 L2-G3。
- 修改内容：
  - 15 条映射全部保留。
  - 5 个新增候选保留为单案例候选。
  - 部分映射只用有依据的语义成分。
  - 6 个 no_map 不强行归并。
- 是否允许进入 L2-G3：`yes`
- 冻结产物：`concept_disambiguation.md` 确认版、`concept_mapping.*` v1.0、`concept_mapping_v0.1.*`、`RP-C15-L2-G2-v1.0`（md）

## 2026-11-13 / L2-G3 / `RP-C15-L2-G3-v0.1`

- 状态：已确认
- 候选产物：`historical_mapping_review.md`、`network_delta.md`/`network_delta.json`
- 回查：7 个共享概念、125 条历史映射、14 个案例；0 修改
- 增量：109 实体、122 关系、15 概念、15 映射、5 候选
- 待裁决：
  1. 是否接受历史回查结果
  2. 是否接受文件级网络增量
  3. 4 条 hyponym 是否保留或改 partial
  4. 是否给 SC-C01-156 增加负例
  5. 是否接受文件级 delta、本体 V4、案例层 L2-C15-v1.0 并进入 L2-G4
- 研究者动作：`accept`
- 理由：接受历史回查、文件级增量；保留 4 条 hyponym；给 SC-C01-156 增加负例；文件级 delta 进入 L2-G4。
- 修改内容：
  - 7 个共享概念、125 条历史映射、14 个案例回查；0 修改。
  - 109 实体、122 关系、15 概念、15 映射、5 候选。
  - 4 条 native_hyponym 保留。
  - SC-C01-156 增加负例“不含居民自主点单/评单的闭环处置”。
  - 本体 V4 不变；案例层 L2-C15-v1.0。
- 是否允许进入 L2-G4：`yes`
- 冻结产物：`historical_mapping_review.md` v1.0、`network_delta.*` v1.1、`network_delta_v0.1.*`、`RP-C15-L2-G3-v1.0`（md）

## 2026-11-13 / L2-G4 / `RP-C15-L2-G4-v0.1`

- 状态：已确认
- 候选产物：`L2_pack.md`/`L2_pack.json`、`ontology_delta.*`、`version_record.*`、`shared_concept_amendments.*`、`concept_mapping_v1.1.*`
- 版本：本体 V4 不变；案例层 L2-C15-v1.0
- 候选对账：活跃 SC-C15-01/03/06/07/08；held SC-C15-02/04/05
- 共享概念修订：SC-C01-156 增加负例“不含居民自主点单/评单的闭环处置”
- 待裁决：
  1. 是否确认版本号
  2. 是否接受候选编号对账
  3. 是否接受 mapping v1.1
  4. 是否接受 SC-C01-156 负例
  5. 是否发布并交接
- 研究者动作：`accept`
- 理由：确认 V4 不变；案例层 L2-C15-v1.0；接受候选编号对账、mapping v1.1、SC-C01-156 负例；发布并交接。
- 修改内容：
  - 本体 V4 不变。
  - 案例层 L2-C15-v1.0。
  - 活跃 SC-C15-01/03/06/07/08；held SC-C15-02/04/05。
  - SC-C01-156 增加负例。
  - 文件级 delta，不写 dashboard SQLite。
- 是否允许发布并交接：`yes`
- 冻结产物：`L2_pack.*`、`ontology_delta.*`、`version_record.*`、`shared_concept_amendments.*`、`concept_mapping_v1.1.*`、`network_delta.*` v1.1、`RP-C15-L2-G4-v1.0`（md）
