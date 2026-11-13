# C16 Red Hook WiFi 原子事实（v0.1 候选）

> 状态：待研究者核查事实完整性、粒度、证据覆盖与限定信息。未确认前不作为 G5 的既成前提。
> 生成时间：2026-11-13
> 依据：`process.md` v1.0（C16-P01–P10）与 `evidence.md` v1.0（100 条）。
> 规则：一条事实只承载一个可独立核验的陈述；实体角色按 8 类本体标注，同一实体可有多种角色。

## 1. 汇总

| 项 | 数量 |
|---|---|
| 原子事实 | 53 |
| 实体 | 89 |
| 已实施 | 42 |
| 计划 | 3 |
| 观点/报道 | 7 |
| 争议 | 1 |
| 未确认 | 0 |

**实体类型分布**：主体 23；任务 6；技术 14；能力 5；行动 16；作用对象 7；结果 11；情境 7。

## 2. 原子事实表

| 编号 | 原子事实 | 实体角色 | 证据 | 状态 | 限定 | 置信度 |
|---|---|---|---|---|---|---|
| F001 | 2011 年秋，RHI 就社区无线网络合作接触 OTI，目标是联系社区中心周边居民。 | A01:actor；A02:actor；K02:task；X01:context | M01-E01 | 已实施 | 2011 秋；Red Hook, Brooklyn | high |
| F002 | OTI 最初无法直接支持，将 RHI 的 Schloss 引荐给在 Parsons 研究无线 mesh 的 Baldwin。 | A02:actor；A03:target；A04:target；AC01:action | M01-E02 | 已实施 | 2011 秋；New York City | high |
| F003 | 红钩被高速与水域隔开、缺少本地信息中心，构成本地网络项目的空间与信息背景。 | X01:context；G01:target；G03:target | M01-E03、M02-E02 | 已实施 | 2011–2012；Red Hook, Brooklyn | high |
| F004 | 调查显示红钩居民上网以手机为主、家庭路由器与电脑不足；Red Hook Houses 居民当时只有一家服务商可选。 | G03:target；X02:context；X07:context | M02-E03、M02-E04 | 已实施 | 2011 前后；Red Hook, Brooklyn | medium |
| F005 | RHI 的初始计划仅是为 RHI 建筑及其周边提供无线上网，并非立即覆盖全社区。 | A01:actor；T01:technology；G05:target；K01:task | M01-E04 | 计划 | 2011；RHI 建筑周边 | high |
| F006 | 2011 年末，RHI 屋顶安装首个 Ubiquiti Nanostation 与室内 Linksys 路由器，并接入中心既有网络。 | A01:actor；A04:actor；T02:technology；T03:technology；G05:target；AC02:action | M01-E05、M11-E03、M15-E03 | 已实施 | 2011 末；RHI 屋顶；设备投入低于 US$300 | high |
| F007 | 首节点通过 splash page 与 Shout Box 提供本地信息发布与留言功能。 | T01:technology；C03:capability；G03:target；AC02:action | M01-E06、M02-E05 | 已实施 | 2011–2012；RHI 建筑 | high |
| F008 | 2012 年 3 月，第二个 Nanostation 安装在俯瞰 Coffey Park 的公寓楼顶；住户捐赠电力与屋顶准入。 | A04:actor；T02:technology；G05:target；G03:target；AC02:action | M01-E07 | 已实施 | 2012-03；Coffey Park 周边公寓楼；1 个节点 | high |
| F009 | Coffey Park 节点最初不接互联网，只以 GuruPlug 本地服务器提供本地网页与留言板。 | T05:technology；C01:capability；G05:target | M01-E08 | 已实施 | 2012-03 起；Coffey Park | high |
| F010 | Red Hook WiFi 在 Ubiquiti 路由器上运行 Commotion 固件，支持去中心化 mesh 与断网本地运行。 | T04:technology；T01:technology；C01:capability；C02:capability | M01-E09、M10-E02 | 已实施 | 2012 起；Red Hook | high |
| F011 | 2011–2012 年，Baldwin 与 Schloss 通过系列工作坊识别六类社区需求。 | A01:actor；A04:actor；G03:target；K02:task；AC03:action | M01-E11、M01-E12、M02-E06 | 已实施 | 2011–2012；RHI；6 类需求 | high |
| F012 | Tidepools 被开发为开源本地地图平台，用于本地通信、地方营造与社区资产组织。 | T06:technology；C03:capability；K02:task；AC04:action | M01-E11 | 已实施 | 2012；Red Hook | high |
| F013 | B61 巴士与 Stop & Frisk 应用分别于 2012-10-09 与 2012-10-17 上线。 | T09:technology；T10:technology；A01:actor；A02:actor；G03:target；AC05:action | M01-E14 | 已实施 | 2012-10-09 / 2012-10-17；Red Hook；2 个应用 | high |
| F014 | RHI Radio 在 2013 年初仍处于开发中。 | T11:technology；A01:actor；AC05:action | M01-E15 | 计划 | 2013-02；RHI | high |
| F015 | 2012-10-29 Sandy 登陆；RHI 保有电力，核心网络在风暴期间继续运行。 | X03:context；A01:actor；T01:technology；O01:outcome；K03:task；AC06:action | M01-E16、M02-E09 | 已实施 | 2012-10-29 起；RHI | high |
| F016 | RHI 在灾后成为社区恢复据点，居民来充电、取暖、报平安与获取信息。 | A01:actor；G03:target；O01:outcome；AC06:action | M02-E09、M15-E04 | 已实施 | 2012-10–11；RHI / Coffey Park | high |
| F017 | 灾后网络使用量激增；现有材料给出 300、1,000、1,200 人/日三种口径，分别对应网络连接、网络用户与到访/求助。 | O02:outcome；X03:context；G03:target；T01:technology | M01-E16、M15-E04、M11-E06 | 争议 | 2012-10–11；Red Hook；300 / 1,000 / 1,200 人/日 | medium |
| F018 | OTI 在数日内开发 RHI Status，把居民短信中的位置与需求映射到 Tidepools。 | A02:actor；T08:technology；C04:capability；G03:target；AC07:action | M01-E18 | 已实施 | 2012-11；Red Hook | high |
| F019 | FEMA、技术志愿者与汽修店店主参与扩展网络；卫星链路仅提供 30 天有限带宽。 | A08:actor；A18:actor；A22:actor；T13:technology；G04:target；AC08:action | M01-E19、M01-E20、M02-E10 | 已实施 | 2012-11；RHI 与汽修店屋顶；30 天；带宽有限 | high |
| F020 | Brooklyn Fiber 在 Visitation Church Rectory 增设网关，并以 UPS 提供 12 小时供电。 | A07:actor；T02:technology；T12:technology；G05:target；AC09:action | M01-E21 | 已实施 | 2012-11–12；Visitation Church Rectory；12 小时备电 | high |
| F021 | Sandy 时许多节点断电离线，网络在风暴前并未完整部署。 | T01:technology；X03:context；O01:outcome | M18-E02 | 观点/报道 | 2012-10；Red Hook | low |
| F022 | Sandy 后屋顶准入障碍消解，汽修店等本地商户同意设点。 | A17:actor；A22:actor；G04:target；AC08:action；X03:context | M02-E11、M11-E07 | 已实施 | 2012-11 起；Red Hook | high |
| F023 | 2013-01，RHI 与 OTI 在市劳动力发展资金支持下启动 Digital Stewards 培训。 | A01:actor；A02:actor；A23:actor；K04:task；AC10:action | M01-E23 | 已实施 | 2013-01；RHI | high |
| F024 | 2013-09 时有 8 名 19–24 岁红钩青年以 RHI 员工身份参加一年期 Digital Stewards fellowship。 | A05:actor；K04:task；AC10:action；G03:target | M02-E14、M11-E01 | 已实施 | 2013-09；Red Hook；8 人；19–24 岁；一年 | high |
| F025 | 到 2015 年初，Stewards 已架设近两打路由器，覆盖从公共住宅到日托中心与图书馆。 | T01:technology；G01:target；O03:outcome；AC11:action；A05:actor | M11-E02 | 已实施 | 2015-01；Red Hook；近 24 台路由器 | medium |
| F026 | Red Hook Houses 未接入，RHI 采取包围策略并把一栋楼内试点作为后续设想。 | G02:target；A10:actor；X04:context；K05:task；AC11:action | M02-E15 | 已实施 | 2013；Red Hook Houses 周边 | high |
| F027 | 网络硬件成本约每台 50–85 美元，每站点安装需两人 3–5 小时，带宽由 RHI、Brooklyn Fiber 与 FEMA 捐赠。 | T02:technology；A01:actor；A07:actor；A08:actor；K06:task | M01-E24 | 已实施 | 2013；Red Hook；US$50–85/台；3–5 小时/2 人 | high |
| F028 | 2013 年初，风暴后网络每周约支撑 100 名用户，居民主要使用 Android 设备与 iPod Touch。 | O05:outcome；G03:target；T01:technology | M01-E22 | 已实施 | 2013 初；Red Hook；约 100 用户/周 | medium-high |
| F029 | Tidepools 在本地服务器运行，断网时社区内部仍可通过网络通信。 | T06:technology；C01:capability；G03:target | M02-E08 | 已实施 | 2013；Red Hook | high |
| F030 | 维护依赖本地支持结构与知识传递；技术人员离开而未教会他人时，网络会崩溃。 | A05:actor；K06:task；G01:target | M02-E12 | 观点/报道 | 2013；Red Hook | high |
| F031 | RHI 曾设想 300 人每月付 5 美元以实现网络财务自持，但未见实施证据。 | K06:task；T01:technology；A01:actor | M02-E13 | 计划 | 2013；Red Hook；300 人 × US$5/月 | high |
| F032 | 2014 年 NYT 记录了 Smith 在 Miccio 社区中心屋顶维护节点；mesh 即使不接互联网仍构成网络。 | A06:actor；T01:technology；C02:capability；G05:target | M10-E01、M10-E02 | 已实施 | 2014-08；Miccio Community Center | high |
| F033 | 2015-05，New America 的 Resilient Mesh Wireless 与 RHI 的 Red Hook 网络获 RISE:NYC 奖。 | A02:actor；A01:actor；X05:context；AC12:action | M03-E01、M03-E04、M12-E02 | 已实施 | 2015-05；New York City | high |
| F034 | RISE:NYC 共有 11 项技术获奖，最高合计 3,000 万美元，27 个入围者参选。 | X05:context；A11:actor；A12:actor | M12-E01、M03-E05 | 已实施 | 2015-04/05；New York City；11 项；最高 US$30M；27 个入围 | high |
| F035 | The Verge 报道 New America 获 400 万美元、RHI 获约 100 万美元用于扩展网络与青年项目；该单项金额为单一来源。 | A02:actor；A01:actor；A11:actor；A12:actor | M15-E06 | 观点/报道 | 2015；New York City；US$4M / 约 US$1M | medium |
| F036 | 新资金使网络扩展到约 20 个站点，部分站点配太阳能备电。 | T01:technology；T12:technology；O03:outcome；G01:target；AC12:action | M15-E07 | 已实施 | 2015–2017；Red Hook；约 20 站点 | medium |
| F037 | 2016 年上半年网络被访问 15,624 次以上、独立用户超过 3,000 人；2017 年访问 17,901 次。 | O05:outcome；G03:target；T01:technology | M13-E01、M04-E04 | 已实施 | 2016 H1；2017；Red Hook；15,624 次/3,000+ 用户；17,901 次 | medium-high |
| F038 | 2017 年 Red Hook WIFI 招募 38 家本地商户作为热点宿主。 | A17:actor；G04:target；O06:outcome；AC11:action | M04-E03、M08-E01 | 已实施 | 2017；Red Hook 商业街；38 家 | high |
| F039 | 2016 年夏，Digital Stewards 与 MIT 研究者开展参与式行动研究，并在 MIT 与 Allied Media Conference 展示。 | A21:actor；A05:actor；T01:technology；G01:target | M04-E05 | 已实施 | 2016 夏；Red Hook / MIT / Detroit | high |
| F040 | NYCHA 对 Red Hook Houses 设点持开放态度，但要求 RHI 自行承担项目费用。 | A10:actor；G02:target；X04:context；K05:task | M15-E08 | 观点/报道 | 2015–2019；Red Hook Houses | high |
| F041 | Robert Smith 于 2016 年、Tony Schloss 于 2017 年离开 RHI，网络维护人员随之减少。 | A06:actor；A03:actor；K06:task；A01:actor | M15-E09 | 已实施 | 2016 / 2017；RHI；2 名关键人员 | high |
| F042 | 2019 年 RHI 将网络移交给 Sky Packets；后者承担约 3,000 美元/月的数据与电力成本及日常维护。 | A01:actor；A09:actor；T01:technology；O09:outcome；AC13:action | M15-E10 | 已实施 | 2019；Red Hook；约 US$3,000/月 | medium |
| F043 | Digital Stewards 采用 8 个月带薪培训；2017 年报告中 77% 的学员在六个月内就业或继续求学。 | A05:actor；K04:task；O07:outcome；AC10:action | M04-E01、M04-E02、M08-E02 | 已实施 | 2017；Red Hook；8 个月；77% | high |
| F044 | 2020 年疫情期间，商户关闭并撤下节点，Red Hook Houses 居民处于网络覆盖之外。 | X06:context；A17:actor；G03:target；AC14:action | M15-E11 | 已实施 | 2020；Red Hook | high |
| F045 | 住宅区施工破坏旗杆节点，其他路由器因长期暴露而离线。 | G02:target；T01:technology；O04:outcome；AC14:action | M15-E12 | 已实施 | 2020–2023；Red Hook Houses | high |
| F046 | 2023 年报道时约剩 10 个活跃 Wi-Fi 站点，Coffey Park 已不在其中。 | O04:outcome；T01:technology；G01:target | M15-E12 | 已实施 | 2023-05；Red Hook；约 10 个站点 | high |
| F047 | 2021 年市府有条件同意网络进入 Red Hook Houses；2022 年 Adams 政府以 Big Apple Connect 取代原计划。 | A14:actor；A15:actor；G02:target；AC16:action | M15-E13 | 已实施 | 2021–2022；New York City / Red Hook Houses | high |
| F048 | NYC OTI 称 Red Hook Houses 未进入 Big Apple Connect 首期，部分原因是 Sky Packets 已提供户外公共区域覆盖。 | A13:actor；G02:target；O08:outcome；AC16:action | M15-E14 | 观点/报道 | 2022–2023；Red Hook Houses | high |
| F049 | 2018 年后，Red Hook Farms 使用 mesh 网络监测温室温度并在停电时提醒员工。 | A16:actor；T14:technology；G06:target；O11:outcome；C05:capability；AC15:action | M15-E15 | 已实施 | 2018 后；Red Hook Farms | high |
| F050 | RHI 在包括 Columbia Street Farm 在内的地点安装空气质量监测器，并通过 mesh 把数据接入全国空气质量地图。 | A16:actor；T14:technology；G07:target；O11:outcome；C05:capability；AC15:action | M15-E15 | 已实施 | 2018 后；Red Hook / Columbia Street Farm | high |
| F051 | 2023 年网络 splash page 仍提供可负担住房、食品券与社区活动信息。 | T01:technology；T07:technology；C03:capability；G03:target | M15-E15、M05-E02 | 已实施 | 2023；Red Hook | high |
| F052 | 2022 年 NYC 主计长与 Urban Ocean Lab 报告把该网络列为城市应支持的社区基础设施案例。 | A20:actor；O10:outcome；T01:technology；G01:target | M15-E17 | 观点/报道 | 2022；New York City | high |
| F053 | Greta Byrum 认为 mesh 不适合作为服务大量人口的规模化方案，网络价值不只在设备，还在于受过训练的人。 | A19:actor；K06:task；T01:technology；O01:outcome | M15-E16、M15-E18 | 观点/报道 | 2023；Red Hook | high |

## 3. 事实—过程对应

- **C16-P01**：F001、F002、F003、F004、F005
- **C16-P02**：F006、F007、F008、F009、F010
- **C16-P03**：F011、F012、F013、F014
- **C16-P04**：F015、F016、F017、F018、F019、F020、F021
- **C16-P05**：F022、F023、F024、F025、F026、F027
- **C16-P06**：F028、F029、F030、F031、F032
- **C16-P07**：F033、F034、F035、F036、F037、F038、F039
- **C16-P08**：F040、F041、F042、F043
- **C16-P09**：F044、F045、F046、F047、F048
- **C16-P10**：F049、F050、F051、F052、F053
