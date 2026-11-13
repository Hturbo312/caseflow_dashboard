# C16 Red Hook WiFi 案例知识包 v1.0

> 状态：G0–G6 已完成；案例包冻结。未确认任何共享概念。
> 冻结时间：2026-11-13
> 案例单位：布鲁克林红钩 Red Hook WiFi 社区 mesh 网络（2011-11 – 2023-05，核心期至 2019-12）

## 1. 案例边界

- 核心期：2011-11 – 2019-12（试验网络、Sandy 应急、Digital Stewards、RISE:NYC 扩张、运营移交）。
- 观察期：2020-01 – 2023-05（疫情、施工扰动、Big Apple Connect 替代、站点收缩、农场新用途）。
- 核心空间：布鲁克林红钩半岛；Red Hook Houses 作为“目标但未覆盖”范围。
- 排除：NYC Mesh 全市网络、RISE:NYC 其他社区项目、Sky Packets 商业业务、NYCHA/Big Apple Connect 完整政策过程。
- 证据截止：2026-11-13。

## 2. 交付清单

| 层 | 文件 | 内容 |
|---|---|---|
| 边界 | `case_scope.md` | G0 确认版 v1.0 |
| 材料 | `materials.md`、`materials.json` | 18 份材料（M01–M18） |
| 证据 | `evidence.md`、`evidence.json` | 100 条证据（Mxx-Exx） |
| 过程 | `process.md`、`process.json` | 10 个过程段落（C16-P01–P10） |
| 实体 | `entities.md`、`entities.json` | 89 个实体 |
| 事实 | `facts.md`、`facts.json` | 53 条原子事实（F001–F053） |
| 关系 | `relations_v2.0.md`、`relations_v2.0.json` | 110 条冻结关系（R001–R110） |
| 原生概念 | `native_concepts.md`、`native_concepts.json` | 9 个原生概念（NC-C16-01–09） |
| 审核 | `review/RP-C16-G0…G6`、`review/decision-log.md`、`G6-audit.md` | 各 gate 候选、决定与修改记录 |

## 3. 规模

| 对象 | 数量 |
|---|---|
| 材料 | 18 |
| 证据 | 100 |
| 过程段落 | 10 |
| 实体 | 89（actor 23、technology 14、action 16、outcome 11、target 7、context 7、task 6、capability 5） |
| 原子事实 | 53（implemented 42、planned 3、reported 7、disputed 1） |
| 关系 | 110（implemented 93、planned 4、reported 12、disputed 1） |
| 原生概念 | 9 |
| 共享概念 | 0（本 skill 不确认） |

## 4. 过程主干

| 段落 | 时间 | 内容 |
|---|---|---|
| C16-P01 | 2011 秋–2012 初 | RHI 接触 OTI；引荐 Baldwin；调查显示手机为主、终端不足 |
| C16-P02 | 2011 末–2012 春 | RHI 首节点；splash page/Shout Box；Coffey Park 第二节点；GuruPlug 本地服务 |
| C16-P03 | 2012 春–10 | 社区工作坊；Tidepools；B61 与 Stop & Frisk 上线；RHI Radio 开发中 |
| C16-P04 | 2012-10-29–11 | Sandy；RHI 恢复据点；RHI Status；FEMA 卫星；汽修店与 Brooklyn Fiber 网关 |
| C16-P05 | 2012-11–2013-12 | 灾后扩展；2013-01 Digital Stewards 启动；8 名青年；近两打路由器 |
| C16-P06 | 2013–2015-04 | 日常运营；约 100 用户/周；维护与知识传递；NYCHA 包围策略 |
| C16-P07 | 2015-05–2017-12 | RISE:NYC 获奖；约 20 站点；2017 年 38 家宿主、17,901 次访问 |
| C16-P08 | 2016–2019 | 人员流失；一次性资助结束；2019 年移交 Sky Packets |
| C16-P09 | 2020–2023 | 疫情撤点；施工破坏；约 10 个活跃站点；Big Apple Connect 首期排除 Houses |
| C16-P10 | 2018–2023 | 农场温度/空气质量传感；残余 splash page；2022 政策报告评价 |

## 5. 关键发现

1. **组合式干预而非单一技术项目**：Red Hook WiFi 由社区组织、外部技术伙伴、本地 ISP、青年维护者与本地应用共同构成；网络只是其中一层（R001、R021、R031、R040、R102–R105）。
2. **灾前预置与组织锚点是核心条件**：Sandy 前已有 RHI 与 Coffey Park 节点，RHI 保有电力，才使核心据点继续提供联网与信息（R027–R029）。但这是“核心据点持续运行”，不是“整个网络完整幸存”；许多节点仍断电离线（R038）。
3. **Digital Stewards 把维护劳动与青年就业连接起来**：培训覆盖安装、维护、推广与社区技术支持；2017 年报告称 77% 学员六个月内就业或继续求学（R042、R043、R068）。培训周期在不同年份有一年期与 8 个月两种版本。
4. **RISE:NYC 带来规模跃升，但也是一次性资助**：网络扩展到约 20 站点、38 家商户宿主、2017 年 17,901 次访问（R056–R059）。单项金额（New America 400 万、RHI 约 100 万）仅 The Verge 一个来源（R055）。
5. **运营移交把所有权与日常运营分开**：2019 年 RHI 将网络移交 Sky Packets，后者承担约 3,000 美元/月的数据与电力成本及维护（R065–R067）。该事实同样主要依赖单一来源。
6. **Houses 的“目标但未覆盖”是长期结构**：网络从早期就希望进入 Red Hook Houses，但 NYCHA 要求 RHI 自付；2022 年 Houses 未进入 Big Apple Connect 首期，部分原因是 Sky Packets 已提供户外覆盖（R045、R062、R071、R076、R077）。户外覆盖反而降低了室内接入的政策优先级。
7. **网络收缩由多因素叠加**：疫情中商户撤点、住宅区施工破坏旗杆节点、设备老化、资助结束与人员离开共同导致 2023 年约剩 10 个活跃站点（R069–R073）。现有证据不足以把收缩归因于单一原因。
8. **核心期后出现新用途**：Red Hook Farms 用 mesh 监测温室温度、停电与空气质量，并把数据接入全国空气质量地图（R078–R081、R093）。这是新用途，不代表原目标已被替代。

## 6. 完整性与审校

### 6.1 回溯覆盖

- 53/53 条事实至少进入一条关系；无独立未编码事实。
- 89/89 个实体进入关系网络；无孤立实体。
- 110 条关系中，未发现完全重复；7 组近重复经 G6 审校保留并加限定。
- 100 条证据中，全部至少被一条事实引用；M09（Press 索引）未提取独立证据。

### 6.2 G6 修订

| 类型 | 数量 | 内容 |
|---|---:|---|
| 删除 | 0 | 近重复保留，避免行动/任务节点失去入网路径 |
| 修改 | 8 | R030、R038、R061、R067、R075、R077、R084、R091 |
| 新增 | 9 | R102–R110 |
| 最终关系 | 110 | `relations_v2.0.json` |

### 6.3 未解决状态

- R030：Sandy 后使用量 300/1,000/1,200 人/日三口径，保留 `disputed`。
- R055：RISE:NYC 单项金额，`reported_or_opinion`，单一来源。
- R065–R067：2019 年移交与月成本，`implemented`，单一来源提示。

## 7. 原生概念候选

| 编号 | 概念 | 类别 | 来源关系 |
|---|---|---|---|
| NC-C16-01 | 社区组织锚点 | actor | R001、R008、R027、R106 |
| NC-C16-02 | 本地数字管家 | actor | R040、R042、R043、R050、R051、R068 |
| NC-C16-03 | 断网本地通信 | capability | R016、R019、R049 |
| NC-C16-04 | 社区 mesh 网络 | technology | R009、R014、R017、R044、R056 |
| NC-C16-05 | 灾时通信据点 | outcome | R027、R028、R029 |
| NC-C16-06 | 商户宿主网络 | action | R039、R059、R061、R070、R092 |
| NC-C16-07 | 一次性资助后的维护断层 | outcome | R055、R065、R067、R110 |
| NC-C16-08 | 户外覆盖替代室内接入 | outcome | R071、R073、R077、R108 |
| NC-C16-09 | 环境传感复用 | action | R078、R079、R080、R081、R093 |

## 8. 未决问题

1. Sky Packets 在 2019 年前的参与（M15 提到 Willis 连接商户与 Sky Packets、Stewards 以实习生参与）尚未进入事实层。
2. RHI 与 Digital Stewards 的治理/决策关系缺一手文件；现有关系主要覆盖培训与维护。
3. 住宅区施工方未作为实体登记，R072 以 Red Hook Houses 作为空间代理。
4. Red Hook Houses 居民内部差异（实际使用者、未接入者、商户顾客）尚未区分。
5. 2021–2022 年市府、NYCHA 与 Sky Packets 的政策过程缺一手文件。
6. RISE:NYC 单项拨款合同、2019 年移交协议、2018–2023 节点清单与访问数据仍缺。
7. NYT 2014 全文、TechPresident 2012 原文、redhookwifi.org 历史快照尚未取得。

## 9. 交接

向 `scalable-concept-framework` 交接：

- **原生节点**：`entities.json`（89 个，含角色）。
- **关系**：`relations_v2.0.json`（110 条，含事实/证据/过程指针）。
- **原生概念**：`native_concepts.json`（9 个，状态 `native_retained_pending_L2`）。
- **证据指针**：`evidence.json`（100 条，Mxx-Exx）。
- **审核记录**：`review/decision-log.md`、`review/RP-C16-G0…G6`、`G6-audit.md`。
- **未决问题**：本文件第 8 节。

本 skill 未确认任何跨案例共享概念；L2 不得把 NC-C16-01–09 自动当作正式共享概念。
