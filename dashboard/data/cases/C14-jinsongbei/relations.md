# C14 关系数据表（G6 冻结 v1.1）

> 状态：G6 审校完成，研究者已接受修改；关系层冻结。
> 生成时间：2026-11-13
> 版本说明：v1.1 按 G6-01 至 G6-05 修改状态、谓词、方向与 CAP04 定义；G6-06/G6-07 保留项不变。

## 1. 概览

- 关系：69 条
- 状态分布：{'implemented': 24, 'reported_or_opinion': 41, 'planned': 1, 'disputed': 3}
- 谓词种类：44
- 未使用事实：F001, F003
- 未使用证据：M01-E01, M03-E01, M05-E04, M09-E02, M11-E03
- 校验问题：无

## 2. 关系表

| 编号 | 头实体（类型） | 谓词 | 尾实体（类型） | 状态 | 限定 | 事实 | 证据 | 过程 |
|---|---|---|---|---|---|---|---|---|
| R001 | 劲松北社区（context） | 包含 | 项目空间范围（一区、二区）（context） | implemented | time=2021；space=劲松1—8区；scope=北社区=1—2区 | F053 | M02-E10 | C14-P01, C14-P06 |
| R002 | 劲松北社区（context） | 呈现 | 社区人口与老龄化结构（context） | implemented | time=2021年前后；space=劲松北社区；quantity=4199户；9494人；39.6%；52% | F002 | M02-E01 | C14-P01 |
| R003 | 劲松街道（actor） | 与…签订战略合作协议 | 愿景集团（actor） | implemented | time=2018-07；space=劲松北社区 | F004 | M02-E02, M03-E02 | C14-P01, C14-P06 |
| R004 | 责任规划师/规划设计团队（actor） | 实施 | 规划诊断与三层规划（action） | implemented | time=2018—2019；space=劲松1—8区；劲松北社区；scope=三个分层规划 | F005 | M02-E02 | C14-P01 |
| R005 | 规划诊断与三层规划（action） | 形成 | 老旧小区综合整治与有机更新（task） | implemented | time=2018—2020；space=劲松北社区；scope=一带两园三街四区多点 | F005, F054 | M02-E02, M02-E04 | C14-P01 |
| R006 | 责任规划师/规划设计团队（actor） | 实施 | 需求调研（action） | implemented | time=2018—2019；space=劲松北社区；quantity=2300多份问卷 | F006 | M02-E03 | C14-P01, C14-P06 |
| R007 | 社区党委/居委会（actor） | 组织 | 需求调研（action） | implemented | time=2018—2019；space=劲松北社区；quantity=10余场问需会 | F008 | M04-E04 | C14-P01, C14-P06 |
| R008 | 居民/业主（actor） | 参与 | 需求调研（action） | reported_or_opinion | time=2018—2019；space=劲松北社区；quantity=2300+问卷；2380人访谈；10+问需会 | F006, F007, F008 | M02-E03, M04-E04, M05-E02 | C14-P01, C14-P06 |
| R009 | 居民/业主（actor） | 参与 | 居民议事/方案调整（action） | reported_or_opinion | time=2018—2020；space=劲松北社区；劲松大公园；quantity=20+次议事会；21类51项 | F009, F050, F051 | M04-E05, M05-E02, M06-E05 | C14-P01, C14-P06 |
| R010 | 楼门长/党员（actor） | 参与 | 居民议事/方案调整（action） | reported_or_opinion | time=2018—2019；space=劲松一区、二区；quantity=143位楼门长 | F009 | M05-E02 | C14-P06 |
| R011 | 愿景集团（actor） | 实施 | 示范区建设（action） | implemented | time=2019-05-06—2019-08-02；space=示范区；scope=社会资本先行实施 | F010, F011, F055 | M02-E05, M02-E11 | C14-P01 |
| R012 | 示范区建设（action） | 完成 | 示范区完工（outcome） | implemented | time=2019-08-02；space=示范区 | F010 | M02-E05 | C14-P01 |
| R013 | 示范区建设（action） | 改造 | 劲松北社区（context） | implemented | time=2019；space=示范区；scope=架空线/公园/配套用房/无障碍 | F011 | M02-E05 | C14-P01 |
| R014 | 示范区建设（action） | 引入 | 商户/便民业态（actor） | implemented | time=2019；space=示范区；scope=理发/匠心工坊/食堂/百年义利 | F012 | M02-E05 | C14-P01 |
| R015 | 商户/便民业态（actor） | 入驻 | 低效空间/配套用房（target） | implemented | time=2019—2021；space=示范区；美好会客厅等 | F012, F028 | M02-E05, M07-E04 | C14-P01, C14-P03 |
| R016 | 居民/业主（actor） | 投票 | 物业引入/双过半投票（action） | reported_or_opinion | time=2019-06；space=劲松一区、二区；scope=双过半；先尝后买 | F014, F015 | M01-E04, M02-E09, M03-E07, M05-E03 | C14-P02 |
| R017 | 物业引入/双过半投票（action） | 引入 | 愿景物业（actor） | reported_or_opinion | time=2019-06；space=劲松一区、二区 | F014, F015 | M01-E04, M02-E09, M03-E07, M05-E03 | C14-P02 |
| R018 | 愿景物业（actor） | 入驻 | 劲松北社区（context） | reported_or_opinion | time=2019-06；space=劲松北社区 | F014 | M05-E03 | C14-P02 |
| R019 | 劲松街道（actor） | 给予 | 愿景物业（actor） | implemented | time=2019—2022；space=劲松北社区；quantity=3年 | F017 | M06-E02 | C14-P02 |
| R020 | 愿景物业（actor） | 实施 | 物业费收取（action） | reported_or_opinion | time=2020；space=劲松北社区；quantity=0.43/1.42元 | F018, F019 | M06-E04 | C14-P02 |
| R021 | 物业费收取（action） | 收取 | 物业费（target） | implemented | time=2020；space=劲松北社区；quantity=多层0.43；高层1.42元/㎡/月 | F018 | M06-E04 | C14-P02 |
| R022 | 物业费收取（action） | 产生 | 物业费收缴率（outcome） | reported_or_opinion | time=2020-06；2020-11；space=劲松北社区；quantity=60%；75% | F019, F020 | M04-E06, M06-E04 | C14-P02 |
| R023 | 愿景物业（actor） | 承诺 | 物业快速响应（capability） | reported_or_opinion | time=2020；space=劲松北社区；quantity=3分钟受理；10分钟上门 | F021 | M06-E03 | C14-P02 |
| R024 | 愿景物业（actor） | 实施 | 物业+养老试点（action） | reported_or_opinion | time=2020；space=劲松北社区 | F022 | M08-E01 | C14-P03 |
| R025 | 物业+养老试点（action） | 服务 | 老年人（target） | reported_or_opinion | time=2020；space=劲松北社区；scope=为老服务；手机班 | F022, F024, F033 | M04-E03, M08-E01 | C14-P03 |
| R026 | 物业+养老试点（action） | 建立 | 为老服务清单（outcome） | reported_or_opinion | time=2020；space=劲松北社区 | F024 | M08-E01 | C14-P03 |
| R027 | 第三方养老机构（actor） | 响应 | 老年人（target） | reported_or_opinion | time=2020；space=劲松北社区；scope=第一时间响应 | F024 | M08-E01 | C14-P03 |
| R028 | 愿景物业（actor） | 实施 | 适老化设备部署（action） | reported_or_opinion | time=2020—2021；space=劲松北社区；劲松社区 | F023, F025, F027, F032, F057 | M04-E07, M07-E02, M07-E03, M07-E04, M08-E01 | C14-P03 |
| R029 | 适老化设备部署（action） | 部署 | 紧急呼叫器（technology） | reported_or_opinion | time=2020—2021；space=劲松北社区；scope=有需要的老人家庭 | F023 | M04-E07, M08-E01 | C14-P03 |
| R030 | 适老化设备部署（action） | 部署 | 安全扶手/无障碍坡道（technology） | reported_or_opinion | time=2020—2021；space=劲松北社区；scope=扶手/坡道/防撞条 | F023, F027, F032 | M04-E07, M07-E04, M08-E01 | C14-P03 |
| R031 | 适老化设备部署（action） | 引入 | 爬楼机（technology） | reported_or_opinion | time=2020；space=劲松社区；quantity=9台 | F025, F057 | M07-E02, M07-E03 | C14-P03 |
| R032 | 适老化设备部署（action） | 引入 | 电动轮椅（technology） | reported_or_opinion | time=2020；space=劲松社区；quantity=12台 | F025, F026 | M07-E03 | C14-P03 |
| R033 | 爬楼机（technology） | 提供 | 辅助上下楼/出行（capability） | implemented | time=2020；space=劲松社区；scope=需志愿者协助 | F057 | M07-E02 | C14-P03 |
| R034 | 电动轮椅（technology） | 提供 | 辅助上下楼/出行（capability） | reported_or_opinion | time=2020；space=劲松社区；scope=租借使用 | F026 | M07-E03 | C14-P03 |
| R035 | 紧急呼叫器（technology） | 提供紧急呼叫 | 紧急呼叫能力（capability） | reported_or_opinion | time=2020—2021；space=劲松北社区；scope=紧急呼叫；第三方响应 | F023, F024 | M04-E07, M08-E01 | C14-P03 |
| R036 | 愿景物业（actor） | 实施 | 智能设备部署（action） | reported_or_opinion | time=2019—2021；space=劲松北社区 | F029, F030, F031 | M04-E01, M05-E01, M07-E04 | C14-P03 |
| R037 | 智能设备部署（action） | 部署 | 智能门禁（technology） | reported_or_opinion | time=2020—2021；space=劲松北社区；scope=社区入口 | F029 | M07-E04 | C14-P03 |
| R038 | 智能设备部署（action） | 部署 | 人脸识别系统（technology） | reported_or_opinion | time=2019-10；space=社区入口 | F031 | M05-E01 | C14-P03 |
| R039 | 智能设备部署（action） | 改造 | 智能车棚（technology） | reported_or_opinion | time=2020；space=209号楼车棚 | F030 | M04-E01 | C14-P03 |
| R040 | 智能门禁（technology） | 提供 | 身份识别与门禁控制（capability） | reported_or_opinion | time=2020—2021；space=劲松北社区；scope=门禁控制 | F029 | M07-E04 | C14-P03 |
| R041 | 人脸识别系统（technology） | 提供 | 身份识别与门禁控制（capability） | reported_or_opinion | time=2019-10；space=社区入口；scope=人脸识别 | F031 | M05-E01 | C14-P03 |
| R042 | 智能车棚（technology） | 提供 | 电动自行车充电（capability） | reported_or_opinion | time=2020；space=209号楼车棚；scope=充电 | F030 | M04-E01 | C14-P03 |
| R043 | 智能车棚（technology） | 服务 | 电动自行车（target） | reported_or_opinion | time=2020；space=209号楼车棚 | F030 | M04-E01 | C14-P03 |
| R044 | 自动面条机（technology） | 部署于 | 209号楼车棚（target） | reported_or_opinion | time=2019；space=车棚 | F035 | M05-E07 | C14-P03 |
| R045 | 愿景和家（actor） | 提供 | HEDATA平台（technology） | reported_or_opinion | time=2022-05；space=劲松北社区等项目 | F036 | M09-E01 | C14-P04 |
| R046 | HEDATA平台（technology） | 声称覆盖 | 劲松北社区（context） | reported_or_opinion | time=2022-05；space=劲松北社区；scope=居民/物业/街道多领域 | F036 | M09-E01 | C14-P04 |
| R047 | HEDATA平台（technology） | 声称提供 | 平台数据整合/多领域服务（声称）（capability） | reported_or_opinion | time=2022-05；space=劲松北社区；scope=多领域服务需求 | F036 | M09-E01 | C14-P04 |
| R048 | 愿景集团（actor） | 将智慧社区列为更新维度 | 智慧社区/智慧治理（task） | reported_or_opinion | time=2020；space=劲松北社区；scope=六维度之一 | F037 | M10-E02 | C14-P04 |
| R049 | 愿景集团（actor） | 获得 | 最佳实践入选（outcome） | reported_or_opinion | time=2022-07；space=北京市 | F038 | M11-E01 | C14-P05 |
| R050 | 愿景集团（actor） | 被概括为 | 引入社会资本与长效物业（task） | reported_or_opinion | time=2020—2022；space=劲松北社区；scope=党建引领/社会资本/微利可持续/一体化 | F039 | M03-E04, M06-E01, M11-E02 | C14-P05 |
| R051 | 劲松街道（actor） | 授权长期运营 | 愿景集团（actor） | implemented | time=2019—2022；space=劲松北社区；scope=存量低效空间 | F040 | M03-E05 | C14-P07 |
| R052 | 愿景集团（actor） | 实施 | 低效空间盘活/业态引入（action） | implemented | time=2019—2021；space=劲松北社区 | F040, F041 | M03-E05, M04-E02 | C14-P07 |
| R053 | 低效空间盘活/业态引入（action） | 改造 | 低效空间/配套用房（target） | implemented | time=2019—2021；space=劲松北社区；quantity=千余平方米 | F041 | M03-E05, M04-E02 | C14-P07 |
| R054 | 低效空间盘活/业态引入（action） | 产生 | 千余平方米空间激活（outcome） | implemented | time=2019—2021；space=劲松北社区；quantity=千余平方米 | F041 | M03-E05, M04-E02 | C14-P07 |
| R055 | 愿景集团（actor） | 采用多元收入结构 | 引入社会资本与长效物业（task） | implemented | time=2019—2022；space=劲松北社区；scope=空间经营/物业费/停车/养老/政府购买 | F042 | M02-E07, M03-E05 | C14-P07 |
| R056 | 愿景集团（actor） | 测算 | 投资回收（测算）（outcome） | planned | time=2019—2033（测算）；space=劲松北社区；quantity=10年左右；14年 | F043, F044 | M02-E07, M05-E05 | C14-P07 |
| R057 | 愿景集团（actor） | 投入自有资金 | 引入社会资本与长效物业（task） | disputed | time=2018—2022；space=劲松北社区；quantity=3000万元；45% | F045 | M03-E02 | C14-P07 |
| R058 | 愿景集团（actor） | 投入项目总投资 | 引入社会资本与长效物业（task） | disputed | time=2020；space=劲松一区、二区；quantity=2.9亿元；20万㎡ | F046 | M10-E01 | C14-P07 |
| R059 | 愿景集团（actor） | 投入二区示范区 | 引入社会资本与长效物业（task） | disputed | time=2019；space=二区示范区；quantity=4000余万元 | F047 | M05-E06 | C14-P07 |
| R060 | 市区财政部门（actor） | 资助基础类改造 | 引入社会资本与长效物业（task） | implemented | time=2018—2020；space=劲松北社区；scope=市区两级财政 | F058 | M10-E03 | C14-P07 |
| R061 | 劲松街道（actor） | 牵头建立 | 五方联动/党建共同体（action） | implemented | time=2018—2023；space=劲松北社区；scope=五方联动 | F048 | M01-E02, M02-E06, M11-E02 | C14-P06 |
| R062 | 社区党委/居委会（actor） | 牵头组建 | 五方联动/党建共同体（action） | implemented | time=2018—2023；space=劲松北社区；scope=党建共同体 | F049 | M02-E06, M03-E08 | C14-P06 |
| R063 | 愿景集团（actor） | 提出 | 老旧小区综合整治与有机更新（task） | reported_or_opinion | time=2019—2022；space=劲松北社区；scope=软硬兼顾；设计-施工-运营一体化 | F052 | M02-E08, M03-E06 | C14-P05 |
| R064 | 居民/业主（actor） | 投票决定 | 居民议事/方案调整（action） | reported_or_opinion | time=2019—2020；space=劲松北社区；scope=改造内容；入驻行业 | F051 | M06-E05 | C14-P06 |
| R065 | 愿景集团（actor） | 将智能化列为改造类别 | 示范区建设（action） | reported_or_opinion | time=2020—2022；space=示范区；一、二区；scope=四大类之一 | F013 | M01-E03, M03-E03 | C14-P01 |
| R066 | 适老化设备部署（action） | 声称改善 | 居民出行频率提高（声称）（outcome） | reported_or_opinion | time=2019—2021；space=劲松北社区；scope=出行频率；室外活动与社交 | F034 | M02-E12 | C14-P03 |
| R067 | 愿景物业（actor） | 被报道为利用 | 智慧社区/智慧治理（task） | reported_or_opinion | time=2020-11；space=劲松北社区；scope=智慧科技改善老人宜居体验 | F056 | M07-E01 | C14-P03 |
| R068 | 愿景集团（actor） | 投资实施 | 项目空间范围（一区、二区）（context） | implemented | time=2019；space=示范区 | F055 | M02-E11 | C14-P01 |
| R069 | 劲松北社区（context） | 以双过半引入 | 愿景物业（actor） | reported_or_opinion | time=2019；space=北京市；scope=北京市首个 | F016 | M02-E09 | C14-P02 |

## 3. G6 修改摘要

- R034/R040/R041/R042/R043：`implemented` → `reported_or_opinion`，区分设备能力与报道部署。
- R063：谓词“强调” → “提出”，状态改为 `reported_or_opinion`。
- R050：谓词“形成” → “被概括为”。
- R055：谓词“通过多元收入回收投入” → “采用多元收入结构”。
- R067：谓词“利用” → “被报道为利用”。
- R069：改为“劲松北社区 —以双过半引入（北京市首个）→ 愿景物业”。
- R035：谓词改为“提供紧急呼叫”；CAP04 定义改为“紧急呼叫能力（是否联网未确认）”。
- 保留：R033/R034、R040/R041、R037/R038、R057–R059、F001/F003、M09-E02/M11-E03。

## 4. 冻结说明

- 本表为 C14 关系层最终冻结版本，不再覆盖；后续如修改，另起 v1.2 并保留本版。
- 投资三条仍为 `disputed`；HEDATA 平台仍为 `reported_or_opinion`。
- 适老化子图独立，不进入智慧治理主图。
