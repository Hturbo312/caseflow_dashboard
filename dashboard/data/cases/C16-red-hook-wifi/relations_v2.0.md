# C16 Red Hook WiFi 关系集合（v2.0 冻结版）

> 状态：**研究者已于 2026-11-13 确认 G6 修订**；冻结 110 条关系。
> 生成时间：2026-11-13
> 依据：`relations.md` v1.0、`G6-audit.md`、`facts.md` v1.0、`entities.json` v1.0。
> 变更明细见 `G6-audit.md`；G5 基线见 `relations.md` v1.0。

## 1. 汇总

| 项 | 数量 |
|---|---|
| 关系 | 110 |
| 已实施 | 93 |
| 计划 | 4 |
| 观点/报道 | 12 |
| 争议 | 1 |
| 未确认 | 0 |

**按过程**：C16-P01 10；C16-P02 11；C16-P03 11；C16-P04 16；C16-P05 12；C16-P06 6；C16-P07 12；C16-P08 9；C16-P09 10；C16-P10 13。

## C16-P01 社区问题识别与外部技术引荐（10）

- `R001` Red Hook Initiative (RHI)(actor) —接触→ Open Technology Institute (OTI, New America)(actor)｜已实施｜2011 秋；Red Hook, Brooklyn｜M01-E01
- `R002` Open Technology Institute (OTI, New America)(actor) —引荐→ Tony Schloss(actor)｜已实施｜2011 秋；New York City｜M01-E02
- `R003` Open Technology Institute (OTI, New America)(actor) —引荐→ Alyx Baldwin(actor)｜已实施｜2011 秋；New York City｜M01-E02
- `R004` 红钩地理隔离(context) —构成情境→ 建立社区所有本地通信平台(task)｜已实施｜2011–2012；Red Hook, Brooklyn｜M01-E03、M02-E02
- `R005` Red Hook 居民(target) —面临→ 宽带市场集中与单一供应商(context)｜已实施｜2011 前后；Red Hook, Brooklyn｜M02-E03、M02-E04
- `R006` Red Hook Initiative (RHI)(actor) —规划→ 提供免费可靠互联网接入(task)｜计划｜2011；RHI 建筑周边｜M01-E04
- `R007` 提供免费可靠互联网接入(task) —初始作用于→ 屋顶/建筑(target)｜计划｜2011；RHI 建筑周边｜M01-E04
- `R008` Red Hook Initiative (RHI)(actor) —提出→ 建立社区所有本地通信平台(task)｜已实施｜2011 秋；Red Hook, Brooklyn｜M01-E01
- `R094` Red Hook Initiative (RHI)(actor) —开展→ 接触 OTI 并建立合作(action)｜已实施｜2011 秋；Red Hook, Brooklyn｜M01-E01
- `R101` 数字鸿沟与手机依赖(context) —构成情境→ 提供免费可靠互联网接入(task)｜已实施｜2011 前后；Red Hook, Brooklyn｜M02-E03、M02-E04

## C16-P02 首个节点、Coffey Park 节点与本地信息原型（11）

- `R009` Red Hook Initiative (RHI)(actor) —安装→ Ubiquiti Nanostation(technology)｜已实施｜2011 末；RHI 屋顶；设备投入低于 US$300；RHI 屋顶首节点｜M01-E05、M11-E03、M15-E03
- `R010` Alyx Baldwin(actor) —安装→ Linksys 路由器(technology)｜已实施｜2011 末；RHI 屋顶；设备投入低于 US$300｜M01-E05、M11-E03、M15-E03
- `R011` Ubiquiti Nanostation(technology) —连接→ Linksys 路由器(technology)｜已实施｜2011 末；RHI 屋顶；设备投入低于 US$300；设备连接关系，非完整拓扑｜M01-E05、M11-E03、M15-E03
- `R012` Red Hook WiFi(technology) —提供→ 本地信息发布与留言(capability)｜已实施｜2011–2012；RHI 建筑｜M01-E06、M02-E05
- `R013` 本地信息发布与留言(capability) —服务→ Red Hook 居民(target)｜已实施｜2011–2012；RHI 建筑｜M01-E06、M02-E05
- `R014` Alyx Baldwin(actor) —安装→ Ubiquiti Nanostation(technology)｜已实施｜2012-03；Coffey Park 周边公寓楼；1 个节点；Coffey Park 第二节点｜M01-E07
- `R015` Red Hook 居民(target) —捐赠→ 安装试验节点(action)｜已实施｜2012-03；Coffey Park 周边公寓楼；1 个节点；住户捐赠电力与屋顶准入｜M01-E07
- `R016` GuruPlug Server(technology) —提供→ 断网本地通信(capability)｜已实施｜2012-03 起；Coffey Park｜M01-E08
- `R017` Red Hook WiFi(technology) —采用→ Commotion Wireless(technology)｜已实施｜2012 起；Red Hook｜M01-E09、M10-E02
- `R018` Commotion Wireless(technology) —提供→ 自愈 mesh 路由(capability)｜已实施｜2012 起；Red Hook｜M01-E09、M10-E02
- `R019` Commotion Wireless(technology) —支持→ 断网本地通信(capability)｜已实施｜2012 起；Red Hook｜M01-E09、M10-E02

## C16-P03 社区工作坊、Tidepools 与首批本地应用（11）

- `R020` Red Hook Initiative (RHI)(actor) —开展→ 开展工作坊与需求识别(action)｜已实施｜2011–2012；RHI；6 类需求｜M01-E11、M01-E12、M02-E06
- `R021` Alyx Baldwin(actor) —开发→ Tidepools(technology)｜已实施｜2012；Red Hook｜M01-E11
- `R022` Tidepools(technology) —提供→ 本地信息发布与留言(capability)｜已实施｜2012；Red Hook｜M01-E11
- `R023` Red Hook Initiative (RHI)(actor) —上线→ Where's the B61 Bus?(technology)｜已实施｜2012-10-09 / 2012-10-17；Red Hook；2 个应用｜M01-E14
- `R024` Open Technology Institute (OTI, New America)(actor) —上线→ Stop & Frisk Survey(technology)｜已实施｜2012-10-09 / 2012-10-17；Red Hook；2 个应用｜M01-E14
- `R025` Red Hook Initiative (RHI)(actor) —开发→ RHI Radio(technology)｜计划｜2013-02；RHI｜M01-E15
- `R095` Alyx Baldwin(actor) —开展→ 开发 Tidepools(action)｜已实施｜2012；Red Hook｜M01-E11
- `R096` Red Hook Initiative (RHI)(actor) —开展→ 上线本地应用(action)｜已实施｜2012-10-09 / 2012-10-17；Red Hook；2 个应用｜M01-E14
- `R102` Tidepools(technology) —部署于→ Red Hook WiFi(technology)｜已实施｜2012；Red Hook｜M01-E11
- `R104` Where's the B61 Bus?(technology) —运行于→ Tidepools(technology)｜已实施｜2012-10-09 / 2012-10-17；Red Hook；2 个应用｜M01-E14
- `R105` Stop & Frisk Survey(technology) —运行于→ Tidepools(technology)｜已实施｜2012-10-09 / 2012-10-17；Red Hook；2 个应用｜M01-E14

## C16-P04 Sandy 应急通信与 RHI 恢复据点（16）

- `R026` 超级风暴 Sandy(context) —冲击→ Red Hook Initiative (RHI)(actor)｜已实施｜2012-10-29 起；RHI｜M01-E16、M02-E09
- `R027` Red Hook Initiative (RHI)(actor) —维持→ Sandy 期间核心据点持续联网(outcome)｜已实施｜2012-10-29 起；RHI｜M01-E16、M02-E09
- `R028` Sandy 期间维持 RHI 通信据点(action) —实现→ Sandy 期间核心据点持续联网(outcome)｜已实施｜2012-10-29 起；RHI｜M01-E16、M02-E09
- `R029` Red Hook Initiative (RHI)(actor) —接待→ Red Hook 居民(target)｜已实施｜2012-10–11；RHI / Coffey Park｜M02-E09、M15-E04
- `R030` 超级风暴 Sandy(context) —之后使用量上升→ 灾后使用量激增(outcome)｜争议｜2012-10–11；Red Hook；300 / 1,000 / 1,200 人/日；300/1,000/1,200 三口径并列｜M01-E16、M15-E04、M11-E06
- `R031` Open Technology Institute (OTI, New America)(actor) —开发→ RHI Status(technology)｜已实施｜2012-11；Red Hook｜M01-E18
- `R032` RHI Status(technology) —提供→ 短信位置/需求映射(capability)｜已实施｜2012-11；Red Hook｜M01-E18
- `R033` FEMA(actor) —提供→ FEMA 卫星链路(technology)｜已实施｜2012-11；RHI 与汽修店屋顶；30 天；带宽有限｜M01-E19、M01-E20、M02-E10
- `R034` 灾后技术志愿者组织(actor) —参与→ 灾后扩展网络(action)｜已实施｜2012-11；RHI 与汽修店屋顶；30 天；带宽有限｜M01-E19、M01-E20、M02-E10
- `R035` 汽修店店主(actor) —提供→ 屋顶/建筑(target)｜已实施｜2012-11；RHI 与汽修店屋顶；30 天；带宽有限；汽修店屋顶｜M01-E19、M01-E20、M02-E10
- `R036` Brooklyn Fiber(actor) —安装→ 安装 Brooklyn Fiber 网关(action)｜已实施｜2012-11–12；Visitation Church Rectory；12 小时备电｜M01-E21
- `R037` 备电系统（太阳能/UPS）(technology) —支持→ Ubiquiti Nanostation(technology)｜已实施｜2012-11–12；Visitation Church Rectory；12 小时备电｜M01-E21
- `R038` Red Hook WiFi(technology) —风暴前未完整部署→ 超级风暴 Sandy(context)｜观点/报道｜2012-10；Red Hook；许多节点断电离线；不再表述为“网络部分失效→核心据点联网”｜M18-E02
- `R089` Sandy 期间维持 RHI 通信据点(action) —服务→ 灾后恢复社区通信(task)｜已实施｜2012-10-29 起；RHI｜M01-E16、M02-E09
- `R097` Open Technology Institute (OTI, New America)(actor) —开展→ 开发 RHI Status(action)｜已实施｜2012-11；Red Hook｜M01-E18
- `R103` RHI Status(technology) —扩展→ Tidepools(technology)｜已实施｜2012-11；Red Hook；RHI Status 为 Tidepools 插件｜M01-E18

## C16-P05 灾后扩展与 Digital Stewards 制度化（12）

- `R039` 本地商户宿主(actor) —参与→ 灾后扩展网络(action)｜已实施｜2012-11 起；Red Hook｜M02-E11、M11-E07
- `R040` Red Hook Initiative (RHI)(actor) —启动→ 启动 Digital Stewards(action)｜已实施｜2013-01；RHI｜M01-E23
- `R041` 纽约市劳动力发展项目(actor) —资助→ 启动 Digital Stewards(action)｜已实施｜2013-01；RHI｜M01-E23
- `R042` 启动 Digital Stewards(action) —培训→ Red Hook Digital Stewards(actor)｜已实施｜2013-09；Red Hook；8 人；19–24 岁；一年｜M02-E14、M11-E01
- `R043` Red Hook Digital Stewards(actor) —维护→ Red Hook WiFi(technology)｜已实施｜2015-01；Red Hook；近 24 台路由器｜M11-E02
- `R044` Red Hook WiFi(technology) —覆盖→ Red Hook 社区(target)｜已实施｜2015-01；Red Hook；近 24 台路由器｜M11-E02
- `R045` NYCHA(actor) —管辖→ Red Hook Houses(target)｜已实施｜2013；Red Hook Houses 周边｜M02-E15
- `R046` Red Hook Initiative (RHI)(actor) —采取→ 维护与扩展网络(action)｜已实施｜2013；Red Hook Houses 周边；包围 Red Hook Houses 的过渡策略｜M02-E15
- `R047` 扩展覆盖至 Red Hook Houses(task) —目标→ Red Hook Houses(target)｜已实施｜2013；Red Hook Houses 周边｜M02-E15
- `R090` 启动 Digital Stewards(action) —实现→ 培养本地网络维护者(task)｜已实施｜2013-09；Red Hook；8 人；19–24 岁；一年｜M02-E14、M11-E01
- `R100` NYCHA 对 Red Hook Houses 的管辖(context) —限定→ 扩展覆盖至 Red Hook Houses(task)｜已实施｜2013；Red Hook Houses 周边｜M02-E15
- `R110` 维持网络长期运营(task) —受成本约束→ Ubiquiti Nanostation(technology)｜已实施｜2013；Red Hook；US$50–85/台；3–5 小时/2 人；硬件约 US$50–85/台，安装 3–5 小时/2 人｜M01-E24

## C16-P06 日常运营、维护与本地服务（RISE 前）（6）

- `R048` Red Hook WiFi(technology) —服务→ Red Hook 居民(target)｜已实施｜2013 初；Red Hook；约 100 用户/周｜M01-E22
- `R049` Tidepools(technology) —支持→ 断网本地通信(capability)｜已实施｜2013；Red Hook｜M02-E08
- `R050` Red Hook Digital Stewards(actor) —维护→ Red Hook WiFi(technology)｜观点/报道｜2013；Red Hook｜M02-E12
- `R051` Robert Smith(actor) —维护→ Red Hook WiFi(technology)｜已实施｜2014-08；Miccio Community Center｜M10-E01、M10-E02
- `R052` Red Hook Digital Stewards(actor) —承担→ 维持网络长期运营(task)｜观点/报道｜2013；Red Hook｜M02-E12
- `R109` 维持网络长期运营(task) —计划向居民收费→ Red Hook 居民(target)｜计划｜2013；Red Hook；300 人 × US$5/月；300 人 × US$5/月为设想，未见实施｜M02-E13

## C16-P07 RISE:NYC 获奖与网络规模扩张（12）

- `R053` Open Technology Institute (OTI, New America)(actor) —获得→ 申请并获 RISE:NYC(action)｜已实施｜2015-05；New York City｜M03-E01、M03-E04、M12-E02
- `R054` Red Hook Initiative (RHI)(actor) —获得→ 申请并获 RISE:NYC(action)｜已实施｜2015-05；New York City｜M03-E01、M03-E04、M12-E02
- `R055` RISE:NYC 计划(context) —资助→ Red Hook Initiative (RHI)(actor)｜观点/报道｜2015；New York City；US$4M / 约 US$1M；单项金额为单一来源｜M15-E06
- `R056` 申请并获 RISE:NYC(action) —扩展→ Red Hook WiFi(technology)｜已实施｜2015–2017；Red Hook；约 20 站点｜M15-E07
- `R057` Red Hook WiFi(technology) —达到→ 网络峰值约 20 站点(outcome)｜已实施｜2015–2017；Red Hook；约 20 站点｜M15-E07
- `R058` Red Hook WiFi(technology) —产生→ 访问量统计(outcome)｜已实施｜2016 H1；2017；Red Hook；15,624 次/3,000+ 用户；17,901 次｜M13-E01、M04-E04
- `R059` 本地商户宿主(actor) —形成→ 2017 年 38 家商户宿主(outcome)｜已实施｜2017；Red Hook 商业街；38 家｜M04-E03、M08-E01
- `R060` MIT 研究团队(actor) —合作→ Red Hook Digital Stewards(actor)｜已实施｜2016 夏；Red Hook / MIT / Detroit｜M04-E05
- `R061` Red Hook WiFi(technology) —由…承载→ 本地商户宿主(actor)｜已实施｜2017；Red Hook 商业街；38 家；网络由商户宿主承载；不写单向依赖的因果判断｜M04-E03、M08-E01
- `R087` NYCEDC(actor) —实施→ RISE:NYC 计划(context)｜已实施｜2015-04/05；New York City；11 项；最高 US$30M；27 个入围｜M12-E01、M03-E05
- `R088` U.S. Department of Housing and Urban Development (HUD)(actor) —资助→ RISE:NYC 计划(context)｜已实施｜2015-04/05；New York City；11 项；最高 US$30M；27 个入围｜M12-E01、M03-E05
- `R092` 本地商户宿主(actor) —服务→ 本地商户(target)｜已实施｜2017；Red Hook 商业街；38 家｜M04-E03、M08-E01

## C16-P08 维护压力、人员流失与运营移交（9）

- `R062` NYCHA(actor) —要求→ Red Hook Initiative (RHI)(actor)｜观点/报道｜2015–2019；Red Hook Houses｜M15-E08
- `R063` Robert Smith(actor) —离开→ Red Hook Initiative (RHI)(actor)｜已实施｜2016 / 2017；RHI；2 名关键人员｜M15-E09
- `R064` Tony Schloss(actor) —离开→ Red Hook Initiative (RHI)(actor)｜已实施｜2016 / 2017；RHI；2 名关键人员｜M15-E09
- `R065` Red Hook Initiative (RHI)(actor) —移交→ Sky Packets(actor)｜已实施｜2019；Red Hook；约 US$3,000/月｜M15-E10
- `R066` Sky Packets(actor) —运营→ Red Hook WiFi(technology)｜已实施｜2019；Red Hook；约 US$3,000/月｜M15-E10
- `R067` Sky Packets(actor) —形成→ 移交后 Sky Packets 运营与月成本(outcome)｜已实施｜2019；Red Hook；约 US$3,000/月｜M15-E10
- `R068` 启动 Digital Stewards(action) —产生→ Stewards 就业/教育成果(outcome)｜已实施｜2017；Red Hook；8 个月；77%｜M04-E01、M04-E02、M08-E02
- `R098` Red Hook Initiative (RHI)(actor) —开展→ 移交 Sky Packets(action)｜已实施｜2019；Red Hook；约 US$3,000/月｜M15-E10
- `R106` Red Hook Initiative (RHI)(actor) —移交前运营→ Red Hook WiFi(technology)｜已实施｜2019；Red Hook；约 US$3,000/月｜M15-E10

## C16-P09 疫情、施工扰动与网络收缩（10）

- `R069` COVID-19 疫情(context) —伴随→ 疫情撤点与网络收缩(action)｜已实施｜2020；Red Hook｜M15-E11
- `R070` 本地商户宿主(actor) —撤下→ Ubiquiti Nanostation(technology)｜已实施｜2020；Red Hook｜M15-E11
- `R071` Red Hook Houses(target) —未被覆盖→ Red Hook WiFi(technology)｜已实施｜2020；Red Hook｜M15-E11
- `R072` Red Hook WiFi(technology) —受施工扰动→ Red Hook Houses(target)｜已实施｜2020–2023；Red Hook Houses｜M15-E12
- `R073` Red Hook WiFi(technology) —收缩至→ 2023 年约 10 个活跃站点(outcome)｜已实施｜2023-05；Red Hook；约 10 个站点｜M15-E12
- `R074` de Blasio 政府(actor) —有条件批准→ 扩展覆盖至 Red Hook Houses(task)｜已实施｜2021–2022；New York City / Red Hook Houses；2021 年批准，未实施｜M15-E13
- `R075` Adams 政府(actor) —实施→ 市府政策替代（Big Apple Connect）(action)｜已实施｜2021–2022；New York City / Red Hook Houses｜M15-E13
- `R076` NYC Office of Technology and Innovation (NYC OTI)(actor) —未纳入首期→ Red Hook Houses(target)｜观点/报道｜2022–2023；Red Hook Houses｜M15-E14
- `R077` Red Hook Houses(target) —在政策上处于→ Red Hook Houses 室内未覆盖(outcome)｜观点/报道｜2022–2023；Red Hook Houses｜M15-E14
- `R108` NYC Office of Technology and Innovation (NYC OTI)(actor) —实施→ 市府政策替代（Big Apple Connect）(action)｜观点/报道｜2022–2023；Red Hook Houses｜M15-E14

## C16-P10 农场传感器、残余服务与政策评价（13）

- `R078` Red Hook Farms(actor) —使用→ 环境传感器(technology)｜已实施｜2018 后；Red Hook Farms｜M15-E15
- `R079` 环境传感器(technology) —监测→ 农场/温室(target)｜已实施｜2018 后；Red Hook Farms｜M15-E15
- `R080` 环境传感器(technology) —监测→ 空气质量数据(target)｜已实施｜2018 后；Red Hook / Columbia Street Farm｜M15-E15
- `R081` 环境传感器(technology) —提供→ 环境监测(capability)｜已实施｜2018 后；Red Hook Farms｜M15-E15
- `R082` Red Hook WiFi(technology) —承载→ 本地信息发布与留言(capability)｜已实施｜2023；Red Hook｜M15-E15、M05-E02
- `R083` NYC 主计长与 Urban Ocean Lab(actor) —产生→ 2022 年政策报告认可(outcome)｜观点/报道｜2022；New York City｜M15-E17
- `R084` 2022 年政策报告认可(outcome) —认可→ Red Hook WiFi(technology)｜观点/报道｜2022；New York City｜M15-E17
- `R085` Greta Byrum(actor) —评价→ Red Hook WiFi(technology)｜观点/报道｜2023；Red Hook；认为不适合作为规模化方案｜M15-E16、M15-E18
- `R086` Greta Byrum(actor) —强调→ Red Hook Digital Stewards(actor)｜观点/报道｜2023；Red Hook；强调受训人员的价值｜M15-E16、M15-E18
- `R091` Red Hook WiFi(technology) —提供入口→ Red Hook HUB(technology)｜已实施｜2023；Red Hook｜M15-E15、M05-E02
- `R093` 环境传感器(technology) —产生→ 农场传感与空气质量监测(outcome)｜已实施｜2018 后；Red Hook Farms｜M15-E15
- `R099` Red Hook Farms(actor) —开展→ 安装农场环境传感器(action)｜已实施｜2018 后；Red Hook Farms｜M15-E15
- `R107` Red Hook Farms(actor) —接入→ Red Hook WiFi(technology)｜已实施｜2018 后；Red Hook Farms｜M15-E15
