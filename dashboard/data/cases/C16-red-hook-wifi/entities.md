# C16 Red Hook WiFi 实体与语义角色（v1.0 确认版）

> 状态：研究者已于 2026-11-13 确认 89 个实体与角色标注；允许进入 G5。
> 生成时间：2026-11-13
> 依据：`facts.md` v0.1（53 条事实）。同一实体可在不同事实中承担不同角色。

## 主体（actor，23）

### A01｜Red Hook Initiative (RHI)
- 定义：布鲁克林红钩的社区非营利组织，Red Hook WiFi 的发起者与 2019 年前的运营/所有权主体。
- 别名：RHI、红钩倡议
- 角色：F001:actor；F005:actor；F006:actor；F011:actor；F013:actor；F014:actor；F015:actor；F016:actor；F023:actor；F027:actor；F031:actor；F033:actor；F035:actor；F041:actor；F042:actor
- 证据：M01-E01、M01-E04、M01-E05、M11-E03、M15-E03、M01-E11、M01-E12、M02-E06、M01-E14、M01-E15、M01-E16、M02-E09、M15-E04、M01-E23、M01-E24、M02-E13、M03-E01、M03-E04、M12-E02、M15-E06、M15-E09、M15-E10

### A02｜Open Technology Institute (OTI, New America)
- 定义：New America 旗下的技术研究与实践机构，提供 Commotion、Digital Stewards 课程与技术方向。
- 别名：OTI、New America OTI、开放技术研究所
- 角色：F001:actor；F002:actor；F013:actor；F018:actor；F023:actor；F033:actor；F035:actor
- 证据：M01-E01、M01-E02、M01-E14、M01-E18、M01-E23、M03-E01、M03-E04、M12-E02、M15-E06

### A03｜Tony Schloss
- 定义：RHI 媒体项目负责人/技术主任，项目共同发起人。
- 别名：Anthony Schloss
- 角色：F002:target；F041:actor
- 证据：M01-E02、M15-E09

### A04｜Alyx Baldwin
- 定义：Parsons 设计学院毕业生，mesh 网络研究者与 Tidepools 开发者，后加入 OTI。
- 别名：Jonathan Baldwin、JR Baldwin
- 角色：F002:target；F006:actor；F008:actor；F011:actor
- 证据：M01-E02、M01-E05、M11-E03、M15-E03、M01-E07、M01-E11、M01-E12、M02-E06

### A05｜Red Hook Digital Stewards
- 定义：RHI 与 OTI 培训的本地青年维护者群体，承担网络安装、维护、推广与社区技术支持。
- 别名：Digital Stewards、数字管家
- 角色：F024:actor；F025:actor；F030:actor；F039:actor；F043:actor
- 证据：M02-E14、M11-E01、M11-E02、M02-E12、M04-E05、M04-E01、M04-E02、M08-E02

### A06｜Robert Smith
- 定义：2013 年加入 Digital Stewards 的红钩青年，后成为 RHI 网络系统管理员。
- 别名：Robert Earl Smith
- 角色：F032:actor；F041:actor
- 证据：M10-E01、M10-E02、M15-E09

### A07｜Brooklyn Fiber
- 定义：红钩本地互联网服务商，为网络提供可负担的带宽与额外网关。
- 别名：本地 ISP
- 角色：F020:actor；F027:actor
- 证据：M01-E21、M01-E24

### A08｜FEMA
- 定义：美国联邦应急管理署，Sandy 后提供卫星链路与 Innovation Fellow 支持。
- 别名：联邦应急管理署
- 角色：F019:actor；F027:actor
- 证据：M01-E19、M01-E20、M02-E10、M01-E24

### A09｜Sky Packets
- 定义：社区 Wi-Fi 安装与运营公司，2019 年后接管 Red Hook WiFi 的日常运营与维护。
- 别名：SkyPackets
- 角色：F042:actor
- 证据：M15-E10

### A10｜NYCHA
- 定义：纽约市公共住宅管理机构，对 Red Hook Houses 的设点与准入拥有决定权。
- 别名：纽约市房屋局
- 角色：F026:actor；F040:actor
- 证据：M02-E15、M15-E08

### A11｜NYCEDC
- 定义：纽约市经济发展公司，RISE:NYC 的实施机构。
- 别名：New York City Economic Development Corporation
- 角色：F034:actor；F035:actor
- 证据：M12-E01、M03-E05、M15-E06

### A12｜U.S. Department of Housing and Urban Development (HUD)
- 定义：美国住房与城市发展部，为 RISE:NYC 提供 CDBG-DR 资金。
- 别名：HUD
- 角色：F034:actor；F035:actor
- 证据：M12-E01、M03-E05、M15-E06

### A13｜NYC Office of Technology and Innovation (NYC OTI)
- 定义：纽约市技术与创新办公室，负责 Big Apple Connect 等市政宽带事务；不得与 New America 的 OTI 合并。
- 别名：NYC OTI、市府 OTI
- 角色：F048:actor
- 证据：M15-E14

### A14｜de Blasio 政府
- 定义：2014–2021 年纽约市政府，推动普遍宽带并支持小型本地 ISP。
- 别名：Bill de Blasio 政府
- 角色：F047:actor
- 证据：M15-E13

### A15｜Adams 政府
- 定义：2022 年起纽约市政府，以 Big Apple Connect 取代前任宽带计划。
- 别名：Eric Adams 政府
- 角色：F047:actor
- 证据：M15-E13

### A16｜Red Hook Farms
- 定义：RHI 运营的社区农场，使用 mesh 网络监测温室温度与空气质量。
- 别名：红钩农场、Columbia Street Farm
- 角色：F049:actor；F050:actor
- 证据：M15-E15

### A17｜本地商户宿主
- 定义：在屋顶或店内承载网关/接入点的红钩商户与机构；2017 年报告称 38 家。
- 别名：小企业伙伴、business partners、热点宿主
- 角色：F022:actor；F038:actor；F044:actor
- 证据：M02-E11、M11-E07、M04-E03、M08-E01、M15-E11

### A18｜灾后技术志愿者组织
- 定义：Sandy 后参与红钩网络扩展的技术志愿组织集合，包括 NYC Mesh、HacDC 与 ITDRC。
- 别名：NYC Mesh、HacDC、ITDRC
- 角色：F019:actor
- 证据：M01-E19、M01-E20、M02-E10

### A19｜Greta Byrum
- 定义：New America Resilient Communities 项目前主任，参与 RISE:NYC，后对 mesh 规模化提出反思。
- 别名：New America Resilient Communities 前主任
- 角色：F053:actor
- 证据：M15-E16、M15-E18

### A20｜NYC 主计长与 Urban Ocean Lab
- 定义：2022 年发布报告、把红钩 mesh 网络列为社区基础设施案例的政策机构组合。
- 别名：Brad Lander、Urban Ocean Lab
- 角色：F052:actor
- 证据：M15-E17

### A21｜MIT 研究团队
- 定义：2016 年夏与 Digital Stewards 合作开展参与式行动研究的研究者。
- 别名：MIT 博士生、participatory action research
- 角色：F039:actor
- 证据：M04-E05

### A22｜汽修店店主
- 定义：红钩汽修店经营者，灾前不愿设点，灾后同意在屋顶安装路由器。
- 别名：auto body shop owner
- 角色：F019:actor；F022:actor
- 证据：M01-E19、M01-E20、M02-E10、M02-E11、M11-E07

### A23｜纽约市劳动力发展项目
- 定义：为 2013 年 Digital Stewards 培训提供资金支持的市级就业项目。
- 别名：NYC Workforce Development
- 角色：F023:actor
- 证据：M01-E23

## 任务（task，6）

### K01｜提供免费可靠互联网接入
- 定义：为红钩居民提供可负担或免费的互联网接入。
- 角色：F005:task
- 证据：M01-E04

### K02｜建立社区所有本地通信平台
- 定义：建设社区控制、服务本地信息与组织的通信基础设施。
- 角色：F001:task；F011:task；F012:task
- 证据：M01-E01、M01-E11、M01-E12、M02-E06

### K03｜灾后恢复社区通信
- 定义：在 Sandy 造成通信中断时恢复居民与救援机构的信息连接。
- 角色：F015:task
- 证据：M01-E16、M02-E09

### K04｜培养本地网络维护者
- 定义：培训本地青年安装、维护与推广网络，形成可再生产的维护能力。
- 角色：F023:task；F024:task；F043:task
- 证据：M01-E23、M02-E14、M11-E01、M04-E01、M04-E02、M08-E02

### K05｜扩展覆盖至 Red Hook Houses
- 定义：把网络覆盖扩展到 NYCHA 公共住宅区内部。
- 角色：F026:task；F040:task
- 证据：M02-E15、M15-E08

### K06｜维持网络长期运营
- 定义：维持节点、带宽、维护人员与资金的长期可持续。
- 角色：F027:task；F030:task；F031:task；F041:task；F053:task
- 证据：M01-E24、M02-E12、M02-E13、M15-E09、M15-E16、M15-E18

## 技术（technology，14）

### T01｜Red Hook WiFi
- 定义：红钩社区无线 mesh 网络/项目/品牌，2011 年末起建设。
- 别名：RHI WiFi、Red Hook Wi-Fi、红钩 WiFi
- 角色：F005:technology；F007:technology；F010:technology；F015:technology；F017:technology；F021:technology；F025:technology；F028:technology；F031:technology；F032:technology；F036:technology；F037:technology；F039:technology；F042:technology；F045:technology；F046:technology；F051:technology；F052:technology；F053:technology
- 证据：M01-E04、M01-E06、M02-E05、M01-E09、M10-E02、M01-E16、M02-E09、M15-E04、M11-E06、M18-E02、M11-E02、M01-E22、M02-E13、M10-E01、M15-E07、M13-E01、M04-E04、M04-E05、M15-E10、M15-E12、M15-E15、M05-E02、M15-E17、M15-E16、M15-E18

### T02｜Ubiquiti Nanostation
- 定义：用于屋顶节点与无线回传的 Ubiquiti 无线设备系列。
- 别名：Nanostation、Nanostation Loco、nano station
- 角色：F006:technology；F008:technology；F020:technology；F027:technology
- 证据：M01-E05、M11-E03、M15-E03、M01-E07、M01-E21、M01-E24

### T03｜Linksys 路由器
- 定义：首个节点室内使用、连接中心调制解调器的路由器。
- 角色：F006:technology
- 证据：M01-E05、M11-E03、M15-E03

### T04｜Commotion Wireless
- 定义：OTI 开发的自由开源 mesh 固件，运行于 Ubiquiti 路由器。
- 别名：Commotion、Commotion 固件
- 角色：F010:technology
- 证据：M01-E09、M10-E02

### T05｜GuruPlug Server
- 定义：Coffey Park 节点早期使用的低功耗本地服务器。
- 角色：F009:technology
- 证据：M01-E08

### T06｜Tidepools
- 定义：开源可定制本地地图平台，用于本地通信、地方营造与社区资产组织。
- 角色：F012:technology；F029:technology
- 证据：M01-E11、M02-E08

### T07｜Red Hook HUB
- 定义：Red Hook WiFi 官网上提供本地信息获取与分享的入口。
- 角色：F051:technology
- 证据：M15-E15、M05-E02

### T08｜RHI Status
- 定义：Sandy 后开发的短信转地图插件，把居民位置与需求映射到 Tidepools。
- 角色：F018:technology
- 证据：M01-E18

### T09｜Where's the B61 Bus?
- 定义：使用 MTA BusTime API 的 B61 巴士实时位置与到站应用。
- 角色：F013:technology
- 证据：M01-E14

### T10｜Stop & Frisk Survey
- 定义：记录红钩警察拦截与搜查经历的调查应用。
- 角色：F013:technology
- 证据：M01-E14

### T11｜RHI Radio
- 定义：由 RHI 青年广播组制作内容的在线电台，2012 年时仍在开发。
- 角色：F014:technology
- 证据：M01-E15

### T12｜备电系统（太阳能/UPS）
- 定义：为节点提供停电时继续运行的太阳能备电与不间断电源。
- 别名：solar backup、UPS、resilient hotspots
- 角色：F020:technology；F036:technology
- 证据：M01-E21、M15-E07

### T13｜FEMA 卫星链路
- 定义：Sandy 后为网络提供临时互联网上行的卫星链路。
- 角色：F019:technology
- 证据：M01-E19、M01-E20、M02-E10

### T14｜环境传感器
- 定义：连接 mesh 网络、监测温室温度与户外空气质量的传感器。
- 别名：temperature sensors、air quality sensors、air quality monitors
- 角色：F049:technology；F050:technology
- 证据：M15-E15

## 能力（capability，5）

### C01｜断网本地通信
- 定义：即使没有互联网上行，网络仍可提供社区内部通信与本地服务。
- 角色：F009:capability；F010:capability；F029:capability
- 证据：M01-E08、M01-E09、M10-E02、M02-E08

### C02｜自愈 mesh 路由
- 定义：路由器故障时其他节点自动重配，维持网络覆盖。
- 角色：F010:capability；F032:capability
- 证据：M01-E09、M10-E02、M10-E01

### C03｜本地信息发布与留言
- 定义：通过 splash page、留言板与本地页面发布社区信息并收集回应。
- 角色：F007:capability；F012:capability；F051:capability
- 证据：M01-E06、M02-E05、M01-E11、M15-E15、M05-E02

### C04｜短信位置/需求映射
- 定义：把居民短信中的位置与需求自动映射到本地地图并形成讨论。
- 角色：F018:capability
- 证据：M01-E18

### C05｜环境监测
- 定义：通过联网传感器监测温室温度、停电与空气质量。
- 角色：F049:capability；F050:capability
- 证据：M15-E15

## 行动（action，16）

### AC01｜接触 OTI 并建立合作
- 定义：RHI 于 2011 年秋接触 OTI，并经引荐与 Baldwin 合作。
- 角色：F002:action
- 证据：M01-E02

### AC02｜安装试验节点
- 定义：2011 年末至 2012 年春在 RHI 与 Coffey Park 安装首批节点。
- 角色：F006:action；F007:action；F008:action
- 证据：M01-E05、M11-E03、M15-E03、M01-E06、M02-E05、M01-E07

### AC03｜开展工作坊与需求识别
- 定义：与社区成员举办工作坊，识别本地需求并收集设计想法。
- 角色：F011:action
- 证据：M01-E11、M01-E12、M02-E06

### AC04｜开发 Tidepools
- 定义：开发并试点本地地图平台 Tidepools。
- 角色：F012:action
- 证据：M01-E11

### AC05｜上线本地应用
- 定义：上线 B61 巴士与 Stop & Frisk 应用，开发 RHI Radio。
- 角色：F013:action；F014:action
- 证据：M01-E14、M01-E15

### AC06｜Sandy 期间维持 RHI 通信据点
- 定义：在风暴期间维持 RHI 的网络与电力，接待居民充电与联网。
- 角色：F015:action；F016:action
- 证据：M01-E16、M02-E09、M15-E04

### AC07｜开发 RHI Status
- 定义：灾后数日内开发短信转地图工具。
- 角色：F018:action
- 证据：M01-E18

### AC08｜灾后扩展网络
- 定义：借助 FEMA 卫星、志愿者与汽修店等新宿主扩展网络。
- 角色：F019:action；F022:action
- 证据：M01-E19、M01-E20、M02-E10、M02-E11、M11-E07

### AC09｜安装 Brooklyn Fiber 网关
- 定义：在 Visitation Church Rectory 安装光纤接收与接入设备。
- 角色：F020:action
- 证据：M01-E21

### AC10｜启动 Digital Stewards
- 定义：2013 年 1 月启动本地青年网络维护培训。
- 角色：F023:action；F024:action；F043:action
- 证据：M01-E23、M02-E14、M11-E01、M04-E01、M04-E02、M08-E02

### AC11｜维护与扩展网络
- 定义：持续安装节点、维护设备、招募宿主与推广网络。
- 角色：F025:action；F026:action；F038:action
- 证据：M11-E02、M02-E15、M04-E03、M08-E01

### AC12｜申请并获 RISE:NYC
- 定义：New America 与 RHI 的 Red Hook 网络获得 RISE:NYC 资助。
- 角色：F033:action；F036:action
- 证据：M03-E01、M03-E04、M12-E02、M15-E07

### AC13｜移交 Sky Packets
- 定义：2019 年 RHI 把网络运营移交给 Sky Packets。
- 角色：F042:action
- 证据：M15-E10

### AC14｜疫情撤点与网络收缩
- 定义：2020 年商户撤下节点，施工与设备老化导致站点减少。
- 角色：F044:action；F045:action
- 证据：M15-E11、M15-E12

### AC15｜安装农场环境传感器
- 定义：在 Red Hook Farms 安装温度与空气质量传感器并接入 mesh。
- 角色：F049:action；F050:action
- 证据：M15-E15

### AC16｜市府政策替代（Big Apple Connect）
- 定义：2022 年 Adams 政府以 Big Apple Connect 取代原宽带计划。
- 角色：F047:action；F048:action
- 证据：M15-E13、M15-E14

## 作用对象（target，7）

### G01｜Red Hook 社区
- 定义：布鲁克林红钩半岛及其居民、商户与公共空间。
- 别名：红钩社区、Red Hook neighborhood
- 角色：F003:target；F025:target；F030:target；F036:target；F039:target；F046:target；F052:target
- 证据：M01-E03、M02-E02、M11-E02、M02-E12、M15-E07、M04-E05、M15-E12、M15-E17

### G02｜Red Hook Houses
- 定义：布鲁克林最大的公共住宅区之一，网络长期希望覆盖但未能进入室内。
- 别名：NYCHA Red Hook Houses、红钩公共住宅
- 角色：F026:target；F040:target；F045:target；F047:target；F048:target
- 证据：M02-E15、M15-E08、M15-E12、M15-E13、M15-E14

### G03｜Red Hook 居民
- 定义：红钩居民，网络的用户、参与者与服务对象。
- 别名：居民、residents、社区成员
- 角色：F003:target；F004:target；F007:target；F008:target；F011:target；F013:target；F016:target；F017:target；F018:target；F024:target；F028:target；F029:target；F037:target；F044:target；F051:target
- 证据：M01-E03、M02-E02、M02-E03、M02-E04、M01-E06、M02-E05、M01-E07、M01-E11、M01-E12、M02-E06、M01-E14、M02-E09、M15-E04、M01-E16、M11-E06、M01-E18、M02-E14、M11-E01、M01-E22、M02-E08、M13-E01、M04-E04、M15-E11、M15-E15、M05-E02

### G04｜本地商户
- 定义：红钩商业街廊的商户，作为网络宿主、服务对象与培训合作方。
- 别名：小企业、local businesses
- 角色：F019:target；F022:target；F038:target
- 证据：M01-E19、M01-E20、M02-E10、M02-E11、M11-E07、M04-E03、M08-E01

### G05｜屋顶/建筑
- 定义：承载路由器、天线与网关的屋顶与建筑。
- 别名：屋顶、rooftops、buildings
- 角色：F005:target；F006:target；F008:target；F009:target；F020:target；F032:target
- 证据：M01-E04、M01-E05、M11-E03、M15-E03、M01-E07、M01-E08、M01-E21、M10-E01、M10-E02

### G06｜农场/温室
- 定义：Red Hook Farms 的温室与农产品冷藏设施。
- 别名：Red Hook Farms 温室、greenhouses
- 角色：F049:target
- 证据：M15-E15

### G07｜空气质量数据
- 定义：由传感器采集并上传到全国空气质量地图的污染读数。
- 别名：air quality readings、pollution data
- 角色：F050:target
- 证据：M15-E15

## 结果（outcome，11）

### O01｜Sandy 期间核心据点持续联网
- 定义：RHI 与部分节点在风暴期间维持网络，成为居民联网与报平安的据点。
- 角色：F015:outcome；F016:outcome；F021:outcome；F053:outcome
- 证据：M01-E16、M02-E09、M15-E04、M18-E02、M15-E16、M15-E18

### O02｜灾后使用量激增
- 定义：Sandy 后网络使用量显著上升，现有材料给出 300/1,000/1,200 人/日三种口径。
- 角色：F017:outcome
- 证据：M01-E16、M15-E04、M11-E06

### O03｜网络峰值约 20 站点
- 定义：RISE:NYC 扩张后网络覆盖约 20 个站点（另有约 40 节点的冲突口径）。
- 角色：F025:outcome；F036:outcome
- 证据：M11-E02、M15-E07

### O04｜2023 年约 10 个活跃站点
- 定义：2023 年报道时约剩 10 个活跃 Wi-Fi 位置，Coffey Park 已退出。
- 角色：F045:outcome；F046:outcome
- 证据：M15-E12

### O05｜访问量统计
- 定义：2016 年上半年 15,624 次访问/3,000+ 用户；2017 年 17,901 次访问。
- 角色：F028:outcome；F037:outcome
- 证据：M01-E22、M13-E01、M04-E04

### O06｜2017 年 38 家商户宿主
- 定义：2017 年 Red Hook WIFI 招募 38 家本地商户作为热点宿主。
- 角色：F038:outcome
- 证据：M04-E03、M08-E01

### O07｜Stewards 就业/教育成果
- 定义：2017 年报告中 77% 的 Digital Stewards 在六个月内就业或继续求学。
- 角色：F043:outcome
- 证据：M04-E01、M04-E02、M08-E02

### O08｜Red Hook Houses 室内未覆盖
- 定义：尽管有户外覆盖与政策讨论，Red Hook Houses 居民室内接入仍未实现。
- 角色：F048:outcome
- 证据：M15-E14

### O09｜移交后 Sky Packets 运营与月成本
- 定义：2019 年后 Sky Packets 承担约 3,000 美元/月的数据与电力成本及日常维护。
- 角色：F042:outcome
- 证据：M15-E10

### O10｜2022 年政策报告认可
- 定义：NYC 主计长与 Urban Ocean Lab 报告把该网络列为城市应支持的社区基础设施案例。
- 角色：F052:outcome
- 证据：M15-E17

### O11｜农场传感与空气质量监测
- 定义：Red Hook Farms 通过 mesh 监测温室温度、停电与空气质量。
- 角色：F049:outcome；F050:outcome
- 证据：M15-E15

## 情境（context，7）

### X01｜红钩地理隔离
- 定义：红钩位于布鲁克林西北端，被 Gowanus Expressway 与水域隔开，缺少地铁服务，形成空间与信息上的隔离。
- 别名：Red Hook 半岛、被高速与水域隔开
- 角色：F001:context；F003:context
- 证据：M01-E01、M01-E03、M02-E02

### X02｜宽带市场集中与单一供应商
- 定义：红钩居民可获得的宽带选择有限；Red Hook Houses 居民在数年前只能选择一家服务商。
- 别名：一家服务商、宽带垄断
- 角色：F004:context
- 证据：M02-E03、M02-E04

### X03｜超级风暴 Sandy
- 定义：2012-10-29 登陆纽约的超级风暴，造成红钩大面积停电、通信中断与洪水。
- 别名：Hurricane Sandy、Sandy
- 角色：F015:context；F017:context；F021:context；F022:context
- 证据：M01-E16、M02-E09、M15-E04、M11-E06、M18-E02、M02-E11、M11-E07

### X04｜NYCHA 对 Red Hook Houses 的管辖
- 定义：NYCHA 对 Red Hook Houses 的屋顶与室内设点拥有最终决定权，构成网络扩展的制度条件。
- 别名：NYCHA 管辖、公共住宅管理
- 角色：F026:context；F040:context
- 证据：M02-E15、M15-E08

### X05｜RISE:NYC 计划
- 定义：NYCEDC 在 HUD 资助下实施的 Sandy 韧性技术竞赛与资助计划。
- 别名：Resiliency Innovations for a Stronger Economy
- 角色：F033:context；F034:context
- 证据：M03-E01、M03-E04、M12-E02、M12-E01、M03-E05

### X06｜COVID-19 疫情
- 定义：2020 年起影响纽约的公共卫生危机，使学校、医疗与基本服务转向线上。
- 别名：新冠疫情、pandemic
- 角色：F044:context
- 证据：M15-E11

### X07｜数字鸿沟与手机依赖
- 定义：居民上网以手机为主、终端与家庭路由器不足，构成本地网络项目的需求背景。
- 别名：digital divide、手机为主上网
- 角色：F004:context
- 证据：M02-E03、M02-E04
