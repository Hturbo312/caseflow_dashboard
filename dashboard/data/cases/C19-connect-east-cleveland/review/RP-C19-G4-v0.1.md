# Review Packet

- packet_id: `RP-C19-G4-v0.1`
- skill: `case-knowledge-construction`
- gate: `G4 事实拆解`
- case_id: `C19`
- scope: Connect East Cleveland 的实体类别、角色与原子事实
- generated_at: 2026-11-13

## 1. 本轮处理范围

- 输入材料/案例: G3 冻结的 10 个过程段落与 70 条证据。
- 已处理: 85 个实体、47 条原子事实；每条事实含实体角色、证据、状态、时空/数量限定与置信度。
- 未处理: 关系谓词、方向与关系审校（G5/G6）。
- 证据截止时间: 2026-11-13

## 2. 候选摘要

### 2.1 实体

| 类型 | 数量 | 说明 |
|---|---|---|
| context | 6 | 社区背景、30 英亩区位、前置规划、再开发计划、University Circle 邻近性、资金/治理环境 |
| actor | 19 | 土地银行、市府、市议会、三家顾问、Street Team Leader、居民、青年、3MB、UrbanistAI、县、慈善机构、Loiter、Verdynt、GCRTA、建设方、Ingeniosity/Pozo、Connect EC 项目团队 |
| task | 5 | placemaking 建议、社区参与、行动转译、资金/实施、补充住房再开发 |
| technology | 6 | UrbanistAI、3D 模型、AR、问卷、故事记录、记分卡 |
| capability | 6 | 文本生成图像、3D 空间定位、AR 叠加、多通道收集、本地知识动员、设计与活动组织 |
| action | 20 | 2023 参与活动、2024 实施、2025 Phase 1、2026 剪彩等 |
| target | 10 | 30 英亩区、Euclid 走廊、Mickey’s、绿道、口袋公园、公共空间、居民、青年、Loiter 店面、Phase 1 地块 |
| outcome | 13 | 30 项行动/报告、150 人参与、花箱、绿道、长椅、Mickey’s、Loiter、诉讼和解、Phase 1 等 |

### 2.2 事实

| 指标 | 数量 |
|---|---|
| 事实总数 | 47 |
| implemented | 37 |
| planned | 6 |
| disputed | 3 |
| reported_or_opinion | 1 |
| 高置信度 | 43 |
| 中置信度 | 3 |
| 低置信度 | 1 |

### 2.3 重点事实

| 编号 | 事实 | 状态 | 建议动作 |
|---|---|---|---|
| F002/F003 | 30 英亩、403 地块、74/329 分布；约 150 户 | implemented | accept |
| F004 | 土地银行取得 200+ 住宅空地与 18 商业地块 | implemented | accept，保留 180+ 冲突 |
| F006/F007 | 团队 1–7 月工作；参与期 1–8 月 vs 4 月起 | implemented/disputed | accept，保留冲突 |
| F008 | 聘请 Najae 为带薪 Street Team Leader | implemented | accept |
| F010–F018 | 四场活动与 3D/AR/UrbanistAI/故事/问卷/记分卡 | implemented | accept |
| F020–F022 | 30 项行动、五类、牵头方与时限 | implemented | accept |
| F025–F035 | 2024 花箱、绿道清表/种树、资金、长椅、Mickey’s 剪彩、Loiter | implemented/planned | accept |
| F036–F038 | Loiter 换锁主张、法院阻止出售、和解 | reported/implemented | accept，保留诉状措辞 |
| F039–F042 | Phase 1 破土、套数冲突、NGBS 公园计划 | implemented/disputed/planned | accept |
| F043 | 2025-10 市议会决议 | disputed | 仅争议，待原件 |
| F044–F046 | 2026-07 首期剪彩、18 户修缮、绿道建成 | implemented | 仅回溯 |

## 3. 冲突、缺口与不确定项

- **实体身份**
  - A19 Connect EC 项目团队 vs A01 Cuyahoga Land Bank：前者是参与过程的直接实施者，后者是主导机构、土地取得者与部分行动牵头方；不得合并。
  - A01 在 F004 是 master developer，在 F036/F037 是 Mickey’s 业主/出售方，在 F043 是被市议会质疑的对象；同一实体多角色。
  - A08 居民既是参与者（actor），也是场所营造/住房改善的作用对象（target）；同一实体双重角色。
  - A11 UrbanistAI 供应商 vs T01 UrbanistAI 平台：前者是 actor，后者是 technology。
- **事实粒度**
  - F014 保留“七个站点”的事件级事实；3D、AI、故事、问卷分别由 F015–F018 及 G5 关系细化。
  - F020 保留“30 项行动/五类”的清单级事实；单项行动由 G5 关系逐一连接。
  - F036–F038 已拆分为“换锁主张”“法院阻止出售”“和解”三条，避免把诉状主张与程序事实混写。
- **状态**
  - F007、F040、F043 为 disputed；F036 为 reported_or_opinion；不得在 G5 写成 implemented。
  - F044–F046 为 2026-07 回溯，不能倒推 2025 年状态。
- **证据缺口**
  - 缺 UrbanistAI 提示词、生成图像清单与选择/淘汰记录。
  - 缺 30 项行动的逐项实施状态、施工/验收记录。
  - 缺市议会决议与 2016 年协议原件。
  - 缺活动签到与问卷原始数据。

## 4. 需要研究者裁决的事项

1. **85 个实体、47 条事实是否整体接受？** 建议接受。
2. **A19 Connect EC 项目团队是否保留为独立 actor？** 建议保留，避免把参与过程全部归因于土地银行。
3. **A05 Agnes Studio 与 A06 Layer Cake Design 是否合并为“设计顾问”？** 建议分开，保留组织身份。
4. **A08 居民是否保留 actor/target 双重角色？** 建议保留；G5 按具体关系判定角色。
5. **F007、F040、F043 是否保留在事实表？** 建议保留为 disputed 事实，但 G5 不据此生成已实施关系。
6. **F014 是否需要按工具拆成四条事实？** 建议不拆；G5 以“Open House—采用→工具”的关系表达，避免事实过度拆分。

## 5. 历史影响

- 是否影响既有共享概念: 否。
- 是否影响历史映射: 否。
- 是否触发历史案例回查: 否。
- 影响范围: 新增 C19 实体/事实层；不修改 C01–C18。

## 6. 研究者决定

- 动作: accept / modify / delete / discuss / supplement
- 理由:
- 修改内容:
- 是否允许进入下一阶段: yes / no
- 决定时间:

## 7. 锁定记录

- 冻结产物: 无（等待研究者确认）
- 版本: `entities.md/json`、`facts.md/json` v0.1（候选）
- 未决事项: 整体接受、A19 独立性、A05/A06 是否合并、A08 双角色、冲突事实去留、F014 粒度
