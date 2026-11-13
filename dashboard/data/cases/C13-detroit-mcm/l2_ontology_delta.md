# C13 本体增量（L2 G3/G4）

> 版本：`L2-C13-shared-v1.0`
> 基线：`L2-C01-C11-shared-v0.2` + `L2-C12-shared-v1.0`（45 个共享概念）
> 日期：2026-11-13

## 1. 增量摘要

| 类型 | 数量 | 说明 |
|---|---|---|
| 新增共享概念候选 | 8 | 全部为 C13 单案例候选，不确认 |
| 新增概念映射 | 14 | 6 条对已有概念，8 条对新候选 |
| 修改已有共享概念 | 0 | 定义、范围、负例均未改 |
| 删除共享概念 | 0 | — |
| 历史案例改判 | 0 | — |
| 新增支持案例 | 0 | 暂不修改 `supporting_case_ids` |

增量后概念层：45 个既有概念 + 8 个候选 = 53 个节点；其中正式确认仍为 45 个。

## 2. 新增候选

| 编号 | 名称 | 类别 | 支持案例 | 状态 |
|---|---|---|---|---|
| SC-C13-101 | 城市地块状况普查 | action | C13 | candidate_single_case |
| SC-C13-102 | 移动地块采集与编码工具 | technology | C13 | candidate_single_case |
| SC-C13-103 | 破败判定规则 | task | C13 | candidate_single_case |
| SC-C13-104 | 地块干预需求口径 | outcome | C13 | candidate_single_case |
| SC-C13-105 | 单栋干预分级工具 | technology | C13 | candidate_single_case |
| SC-C13-106 | 地块数据公开平台 | technology | C13 | candidate_single_case |
| SC-C13-107 | 社区数据复核资助 | action | C13 | candidate_single_case |
| SC-C13-108 | 数据基础设施跨场景复用 | action | C13 | candidate_single_case |

## 3. 新增映射

| 映射 | 原生概念 | 共享概念 | 类型 | 决定 |
|---|---|---|---|---|
| MAP-C13-01 | NC-C13-01 | SC-C13-101 | native_hyponym | candidate_created |
| MAP-C13-02 | NC-C13-02 | SC-C13-102 | native_hyponym | candidate_created |
| MAP-C13-03 | NC-C13-03 | SC-C01-142 | partial_or_approximate | accepted_partial |
| MAP-C13-04 | NC-C13-04 | SC-C01-121 | partial_or_approximate | accepted_partial |
| MAP-C13-05 | NC-C13-04 | SC-C13-103 | native_hyponym | candidate_created |
| MAP-C13-06 | NC-C13-05 | SC-C13-104 | native_hyponym | candidate_created |
| MAP-C13-07 | NC-C13-06 | SC-C01-143 | native_hyponym | accepted |
| MAP-C13-08 | NC-C13-07 | SC-C13-105 | native_hyponym | candidate_created |
| MAP-C13-09 | NC-C13-08 | SC-C01-132 | partial_or_approximate | accepted_partial |
| MAP-C13-10 | NC-C13-08 | SC-C13-106 | native_hyponym | candidate_created |
| MAP-C13-11 | NC-C13-09 | SC-C01-151 | partial_or_approximate | accepted_partial |
| MAP-C13-12 | NC-C13-09 | SC-C13-107 | native_hyponym | candidate_created |
| MAP-C13-13 | NC-C13-10 | SC-C01-154 | partial_or_approximate | accepted_partial |
| MAP-C13-14 | NC-C13-10 | SC-C13-108 | native_hyponym | candidate_created |

## 4. 历史回查

对 6 个被引用的既有概念回查其全部历史映射：

- SC-C01-121：19 条历史部分映射（C02/C04/C05/C06/C07/C08/C09），均为“问题识别/需求”成分；C13 的破败判定只取“界定问题”成分，不改变既有边界。
- SC-C01-132：17 条历史部分映射（C04/C05/C07/C09/C10/C12），均为治理/行政/门户平台；C13 的公开地块平台只取“整合社区信息”成分，不并入工单与行政业务。
- SC-C01-142：9 条历史部分映射（C04/C05/C06/C08/C09），均为监测/识别/记录能力；C13 的字段体系只取“采集/解释状态”成分，不等同于传感监测。
- SC-C01-143：10 条历史部分映射（C01/C03/C07/C08/C09/C12），均为信息/空间服务；C13 的 MCI 作为空间分析的下位类型，边界兼容。
- SC-C01-151：40 条历史部分映射（C01/C02/C03/C05/C06/C07/C08/C09/C11/C12），均为参与/意见活动；C13 的社区复核只取“组织居民参与”成分，不并入意见收集。
- SC-C01-154：6 条历史部分映射（C01/C08/C09/C10/C11），均为运营/维护/升级；C13 的跨场景复用只取“持续使用/调整”成分，不并入日常运营。

结论：无历史映射需要改判，无案例需要回查重分类。

## 5. 未纳入本体的内容

- “数据基础设施的维护与衰减”：2016–2017 证据不足，未形成候选，保留为未决概念。
- 8 个新候选均无第二案例支持，不能确认正式共享概念。
- 既有概念的 `supporting_case_ids` 未追加 C13；C13 的支持只记录在映射表与候选的 `supportingCaseIds`。
