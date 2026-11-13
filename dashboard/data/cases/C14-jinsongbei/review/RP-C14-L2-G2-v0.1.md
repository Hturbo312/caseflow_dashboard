# Review Packet

- packet_id: `RP-C14-L2-G2-v0.1`
- skill: `scalable-concept-framework`
- gate: `L2-G2 共享概念候选与概念映射`
- case_id: `C14`
- scope: 劲松北社区原生概念到既有共享概念/新候选的映射
- generated_at: 2026-11-13
- status: `awaiting_researcher_decision`

## 1. 基线检查

| 项 | 结果 |
|---|---|
| JSON 实际节点 | 54（C01–C11 44 + C12 2 + C13 8） |
| 历史记录计数 | 53（C01–C11 43 + C12 2 + C13 8） |
| 差异 | `SC-C01-103 社会经济差异与参与排斥` 在 JSON 中但未计入审核包/版本记录 |
| 本轮处理 | 按 JSON 实际 54 检索；C14 未映射到 SC-C01-103；请研究者裁定基线计数 |

## 2. 映射结论

- 原生概念：14
- 映射：20 条
  - 已有概念映射：8 条（7 条部分映射 + 1 条下位映射）
  - 新候选映射：10 条
  - `no_map`：2 条
- 新增共享概念候选：10 个（全部单案例，不确认）

### 2.1 已有概念映射（8）

| 映射 | 原生概念 | 共享概念 | 类型 | 范围 |
|---|---|---|---|---|
| MAP-C14-001 | NC-C14-01 五方联动 | SC-C01-155 跨组织协作与信息协调 | partial | 只取协作/协调成分 |
| MAP-C14-003 | NC-C14-02 双过半与先尝后买 | SC-C01-152 方案共制与居民协商决策 | partial | 只取居民投票/协商成分 |
| MAP-C14-005 | NC-C14-03 微利可持续 | SC-C01-104 资源成本与运维条件约束 | partial | 只取成本/运维约束成分 |
| MAP-C14-009 | NC-C14-06 HEDATA | SC-C01-132 社区治理与行政平台 | partial | 只取社区信息/数据平台成分 |
| MAP-C14-013 | NC-C14-09 党建共同体 | SC-C01-155 跨组织协作与信息协调 | partial | 只取跨组织协作成分 |
| MAP-C14-014 | NC-C14-10 责任规划师沉浸式设计 | SC-C01-159 监测评估与反馈调整 | partial | 只取反馈调整成分 |
| MAP-C14-016 | NC-C14-11 社区共建者与手机班 | SC-C01-158 技术试验与能力建设 | native_hyponym | 手机班是能力建设下位类型 |
| MAP-C14-018 | NC-C14-13 智能门禁/人脸识别 | SC-C01-133 传感监测与异常识别设备 | partial | 只取身份识别/图像感知成分 |

### 2.2 新候选（10）

| 编号 | 名称 | 类型 | 支持原生概念 | 状态 |
|---|---|---|---|---|
| SC-C14-101 | 多主体协同更新机制 | action | NC-C14-01 | candidate_single_case |
| SC-C14-102 | 物业引入的居民表决与先尝后买 | action | NC-C14-02 | candidate_single_case |
| SC-C14-103 | 社会资本微利可持续条件 | context | NC-C14-03 | candidate_single_case |
| SC-C14-104 | 低效空间运营权置换更新投入 | action | NC-C14-04 | candidate_single_case |
| SC-C14-105 | 物业服务嵌入居家养老 | action | NC-C14-05 | candidate_single_case |
| SC-C14-106 | 电动自行车充电车棚 | technology | NC-C14-07 | candidate_single_case |
| SC-C14-107 | 适老化辅助器具租借服务 | action | NC-C14-08 | candidate_single_case |
| SC-C14-108 | 责任规划师陪伴式设计 | action | NC-C14-10 | candidate_single_case |
| SC-C14-109 | 社区出入口身份识别设备 | technology | NC-C14-13 | candidate_single_case |
| SC-C14-110 | 企业运营的社区智慧治理平台 | technology | NC-C14-06 | candidate_single_case_evidence_weak |

### 2.3 `no_map`（2）

| 映射 | 原生概念 | 理由 |
|---|---|---|
| MAP-C14-017 | NC-C14-12 智慧社区六维度 | 项目目标框架，未被现有概念覆盖；保留原生 |
| MAP-C14-020 | NC-C14-14 扫码自动面条机 | 不构成治理技术概念，仅“智能”标签例证 |

## 3. 历史影响

| 检查项 | 结果 |
|---|---|
| 受影响已有共享概念 | SC-C01-104、132、133、152、155、158、159（仅新增部分/下位映射） |
| 定义是否修改 | 否 |
| 是否修改 `supporting_case_ids` | 否（沿用 C13 做法，只在映射表记录 C14 支持） |
| 是否触发历史案例回查 | 否；无既有映射改判 |
| C13 候选是否获第二案例 | 否 |
| C12 概念是否获第二案例 | 否 |

## 4. 需要研究者裁决

1. 是否接受 20 条映射（8 条已有概念、10 条新候选、2 条 `no_map`）？
2. 是否接受 10 个新候选均为单案例候选，不确认正式共享概念？
3. 是否接受 NC-C14-12 与 NC-C14-14 的 `no_map`？
4. 是否同意暂不修改既有概念的 `supporting_case_ids`，只在映射表记录 C14 支持？
5. 是否以 `L2-C14-shared-v0.1` 作为本轮版本号，并裁定 `SC-C01-103` 是否计入正式基线（53 vs 54）？

## 5. 研究者决定

- 动作：accept / modify / delete / discuss / supplement
- 理由：
- 修改内容：
- 是否允许进入 G3：yes / no
- 决定时间：
