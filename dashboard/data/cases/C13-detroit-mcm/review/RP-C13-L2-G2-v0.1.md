# Review Packet

- packet_id: `RP-C13-L2-G2-v0.1`
- skill: `scalable-concept-framework`
- gate: `G2 共享概念候选 / 概念映射`
- case_id: `C13`
- scope: 10 个原生概念对 C01–C12 共享概念层的映射与新增候选
- generated_at: 2026-11-13

## 1. 本轮处理范围

- 输入材料/案例: `case_pack` v1.0、`l2_native_concepts` v1.0、C01–C12 共享概念 45 个
- 已处理: 10 个原生概念盘点、45 个共享概念检索、14 条映射、8 个新候选、历史影响草案
- 未处理: G3 增量网络更新、G4 版本发布
- 基线版本: `L2-C01-C11-shared-v0.2` + `L2-C12-shared-v1.0`

## 2. 候选摘要

| 编号 | 原生概念 | 映射类型 | 目标 | 决定 |
|---|---|---|---|---|
| MAP-C13-01 | 全市地块外业普查 | native_hyponym | SC-C13-101 城市地块状况普查（新） | candidate_created |
| MAP-C13-02 | 移动端地块编码 | native_hyponym | SC-C13-102 移动地块采集与编码工具（新） | candidate_created |
| MAP-C13-03 | 地块状况字段体系 | partial | SC-C01-142 数据监测与环境诊断能力 | accepted_partial |
| MAP-C13-04 | 破败十项判定 | partial | SC-C01-121 社区问题与需求识别 | accepted_partial |
| MAP-C13-05 | 破败十项判定 | native_hyponym | SC-C13-103 破败判定规则（新） | candidate_created |
| MAP-C13-06 | 需干预地块口径 | native_hyponym | SC-C13-104 地块干预需求口径（新） | candidate_created |
| MAP-C13-07 | 临界点优先级分析 | native_hyponym | SC-C01-143 信息服务与空间分析能力 | accepted |
| MAP-C13-08 | 单栋分级评估 | native_hyponym | SC-C13-105 单栋干预分级工具（新） | candidate_created |
| MAP-C13-09 | 公开地块数据平台 | partial | SC-C01-132 社区治理与行政平台 | accepted_partial |
| MAP-C13-10 | 公开地块数据平台 | native_hyponym | SC-C13-106 地块数据公开平台（新） | candidate_created |
| MAP-C13-11 | 社区复核小额资助 | partial | SC-C01-151 社区参与与意见收集 | accepted_partial |
| MAP-C13-12 | 社区复核小额资助 | native_hyponym | SC-C13-107 社区数据复核资助（新） | candidate_created |
| MAP-C13-13 | 数据基础设施跨场景复用 | partial | SC-C01-154 数字服务运营与迭代 | accepted_partial |
| MAP-C13-14 | 数据基础设施跨场景复用 | native_hyponym | SC-C13-108 数据基础设施跨场景复用（新） | candidate_created |

## 3. 冲突、缺口与不确定项

- 来源冲突: 无；L1 内部的数字与时间冲突已在原生层并列，不影响概念映射。
- 证据缺口:
  - 8 个新候选均只有 C13 一个案例支持，不能确认正式共享概念。
  - "数据基础设施的维护与衰减"仍缺 2016–2017 证据，未形成候选。
- 概念边界:
  - SC-C01-121（问题识别）与"破败判定"只部分重叠，不能整体并入。
  - SC-C01-132（治理平台）与"公开数据平台"只共享"整合社区信息"成分。
  - SC-C01-142（监测诊断）与"字段编码"只共享"采集/解释状态"成分。
  - SC-C01-151（参与意见）与"数据复核"只共享"组织居民参与"成分。
  - SC-C01-154（运营迭代）与"跨场景复用"只共享"持续使用/调整"成分。
- 需要补充的材料: 第二案例中出现同类地块普查/公开平台/社区复核的证据。

## 4. 需要研究者裁决的事项

1. **已有映射**：6 条（1 条下位 + 5 条部分）是否接受？
2. **新增候选**：8 个单案例候选是否接受？是否全部保持 `candidate_single_case`，不确认？
3. **NC-03**：是否只保留对 SC-C01-142 的部分映射，不新增"字段标准化"候选？
4. **支持案例**：是否暂不修改已有共享概念的 `supporting_case_ids`，只在映射表记录 C13 支持？
5. **版本**：是否采用 `L2-C13-shared-v0.1`，确认后升 v1.0？

## 5. 历史影响

- 是否影响既有共享概念: 6 个被部分引用，但定义与范围不变。
- 是否影响历史映射: 否；无既有映射需要改判。
- 是否触发历史案例回查: 否。
- 影响范围: 新增 8 个候选与 14 条映射；不修改 C01–C12 任何原生节点。

## 6. 研究者决定

- 动作: accept / modify / delete / discuss / supplement
- 理由:
- 修改内容:
- 是否允许进入 G3: yes / no
- 决定时间:

## 7. 锁定记录

- 冻结产物: 无（等待研究者确认）
- 版本: `l2_concept_mapping` v0.1
- 未决事项: 6 条已有映射、8 个新候选、NC-03 处理、支持案例、版本号
