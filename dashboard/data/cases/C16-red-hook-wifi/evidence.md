# C16 Red Hook WiFi 证据索引（v1.0 确认版）

> 状态：研究者已于 2026-11-13 确认 100 条证据全部接受；允许进入 G3。
> 生成时间：2026-11-13
> 说明：`fact_status` 为暂定判断，G4 事实拆解时才最终确定；`置信度` 指证据与陈述的对应强度，不指事件真实性。
> 引文规则：`...` 表示原文省略；引文按原文录入，仅合并换行与多余空白；项目符号列表、分栏数字的并列摘录在备注中标注。

## 1. 汇总

| 材料 | 证据数 | 主要覆盖 |
|---|---|---|
| M01 New America / OTI 案例研究（2013-02-01） | 25 | 发起、首节点、Tidepools、应用、Sandy、FEMA/Brooklyn Fiber、成本与经验 |
| M02 Urban Omnibus 访谈（2013-09-25） | 16 | 项目动因、社区工作坊、网络结构、Sandy、维护、Digital Stewards、NYCHA |
| M03 New America RISE:NYC 新闻稿（2015-05-01） | 5 | RISE:NYC 获奖、项目设计、红钩治理结构 |
| M04 RHI Impact Report 2017（PDF） | 5 | Digital Stewards 培训、38 家宿主、2017 访问量、MIT 研究 |
| M05 Red Hook WiFi 官网主页 | 2 | 项目定位、免费接入、伙伴宿主、HUB |
| M06 Red Hook WiFi 官网 Coverage | 2 | 2020 覆盖目标、40+ 接入点与 14 热点规划 |
| M07 Red Hook WiFi 官网 Mission | 2 | 使命、太阳能备电、自愈 mesh、本地维护 |
| M08 Red Hook WiFi 官网 Partners | 2 | 38 家宿主名单、Digital Stewards 8 个月培训 |
| M10 NYT（Noam Cohen，2014-08-22，部分可读） | 3 | 2014 维护场景、mesh 原理、人口与公共住宅 |
| M11 Orion（Nancy Scola，2015-01-05） | 10 | 2011 起步、成本、网络结构、Sandy、Brooklyn Fiber、Stewards |
| M12 Brooklyn Reporter（2015-05-04） | 3 | 11 个获奖者、最高 3,000 万美元、27 个入围者 |
| M13 My NYC Story（2016-08-29） | 1 | 2016 上半年访问量 |
| M14 Inverse Video（2018-07-22） | 2 | Sandy 后屋顶部署、青年维护 |
| M15 The Verge（Justine Calma，2023-05-22） | 18 | 2011–2023 全程、RISE 资金、移交、疫情、收缩、农场新用途 |
| M16 NYC CDBGDR RISE:NYC 页面 | 1 | RISE:NYC 项目目的与执行伙伴 |
| M17 Wikipedia（三级来源） | 1 | 信息框：所有者、建立时间、状态 |
| M18 Resilient Comms（二次汇编） | 2 | 峰值约 40 节点、Sandy 节点离线 |
| **合计** | **100** | 2011-11 – 2023-05 |

> M09（Press 索引）未提取独立证据：页面仅列报道标题与转载日期，原文未取得，不能作为事实依据。

## 2.1 M01 — New America / OTI 案例研究（2013-02-01）

**M01-E01｜2011 年秋，RHI 就社区无线网络合作接触 OTI，目标是联系社区中心周边居民。**
- 定位：History of the Network，第 1 段
- 原文："Beginning in Fall 2011, the Red Hook Initiative (RHI), a Brooklyn non-profit focused on creating social change through youth engagement, approached the Open Technology Institute about collaborating on a community wireless network. RHI wanted a way to communicate with the residents immediately around its community center."
- 暂定状态：已实施｜置信度：高
- 备注：项目起点的最早叙述之一

**M01-E02｜OTI 最初无法直接支持，将 RHI 媒体项目负责人 Anthony Schloss 引荐给在 Parsons 研究无线 mesh 的 Jonathan Baldwin。**
- 定位：History of the Network，第 1 段
- 原文："OTI was initially unable to support the effort directly, but introduced Anthony Schloss, RHI Media Programs Coordinator, to Jonathan Baldwin, a Parsons School of Design graduate student who had been experimenting with wireless mesh as a local digital platform."
- 暂定状态：已实施｜置信度：高
- 备注：Baldwin 后以 Alyx Baldwin 之名出现于 M02

**M01-E03｜红钩被 Gowanus Expressway 与外部隔开；Red Hook Houses 公共住宅及周边低收入区约 5,000 名居民。**
- 定位：History of the Network，第 2 段
- 原文："It is cut off from the rest of the borough by the Gowanus Expressway, which carries traffic from points south into lower Manhattan. The neighborhood is home to approximately 5000 residents of Red Hook Houses public housing and other low income areas near an expressway, as well as a gentrifying section with many small businesses closer to the water."
- 暂定状态：已实施｜置信度：高
- 备注：人口口径与 M10 的 11,000 人不同，G2 并列

**M01-E04｜RHI WiFi 的初始计划是为 RHI 建筑及其周边提供无线上网。**
- 定位：History of the Network，第 3 段
- 原文："RHI WiFi’s initial plan was to provide wireless access to the Internet in and around RHI’s building, which is near the expressway and the Red Hook Houses."
- 暂定状态：计划｜置信度：高
- 备注：初始范围，非全社区覆盖

**M01-E05｜Schloss 与 Baldwin 在 RHI 屋顶安装 Ubiquiti Nanostation，在室内安装 Linksys 路由器并接入中心调制解调器。**
- 定位：History of the Network，第 3 段
- 原文："Schloss and Baldwin installed a Ubiquiti Nanostation on the roof and a Linksys router inside the building, connected via ethernet. They connected the Linksys router to the center’s modem."
- 暂定状态：已实施｜置信度：高
- 备注：首个节点的设备与连接方式

**M01-E06｜连接到 “Red Hook Initiative WiFi” 的用户会被导向本地服务器网页，网页上有留言板 “Shout Box”。**
- 定位：History of the Network，第 3 段
- 原文："When residents or visitors to RHI connected to the wireless access point named “Red Hook Initiative WiFi,” they were directed to a website on a local server. On this website was a “Shout Box,” a local digital message board allowing everyone to leave a comment or a note behind and participate in the project."
- 暂定状态：已实施｜置信度：高
- 备注：本地信息服务的早期形态

**M01-E07｜2012 年 3 月，在俯瞰 Coffey Park 的公寓楼顶安装第二个节点；住户捐赠电力与屋顶准入。**
- 定位：History of the Network，第 4 段
- 原文："In March of 2012, Baldwin and Schloss installed an additional Ubiquiti Nanostation on the roof of an apartment building overlooking Coffey Park and much of the rest of the neighborhood. A resident of the building with social ties to RHI donated the electricity and rooftop access."
- 暂定状态：已实施｜置信度：高
- 备注：第二个节点，灾前已存在

**M01-E08｜Coffey Park 节点最初不接互联网，只连接 GuruPlug 本地服务器，提供本地网页与留言板。**
- 定位：History of the Network，第 4 段
- 原文："Initially, the Coffey Park wireless access point was not connected to the Internet, but was connected to a GuruPlug Server . The basic, low power server hosted a local web page on the network and a “Shout Box” similar to the one running in RHI."
- 暂定状态：已实施｜置信度：高
- 备注：说明本地网络可脱离互联网运行

**M01-E09｜RHI WiFi 在 Ubiquiti 路由器上运行 OTI 的 Commotion 固件；该固件支持去中心化 mesh，并可在无互联网连接时维持本地网络。**
- 定位：History of the Network，第 5 段
- 原文："RHI WiFi uses OTI’s Commotion Wireless firmware running on Ubiquiti routers. Commotion is a free and open-source communication tool that uses mobile phones, computers, and other wireless devices to create decentralized mesh networks. ... Commotion networks are sustainable without a connection to the Internet, which makes them resilient to outages; they can distribute access to applications hosted on local servers or on the routers themselves."
- 暂定状态：已实施｜置信度：高
- 备注：技术配置与能力描述来自项目合作方

**M01-E10｜Baldwin 认为社区无线网络需要社会软件来促进参与、信任、线上线下空间结合，并在断网前完成认知与安装。**
- 定位：Social Software and Growth of the Network，第 1 段
- 原文："Baldwin had identified a need for social software that would add value and a distinct identity to the community wireless network, specifically to: ● Spark civic and community engagement by addressing local needs, interests and culture. ● Foster trust, interdependence, and reciprocity throughout the community. ● Merge digital and physical community spaces. ● Ensure that people know about mesh / have software installed before a communication outage occurs."
- 暂定状态：观点/报道｜置信度：高
- 备注：设计理念，非使用效果

**M01-E11｜第一年内，Baldwin 与 Schloss 与社区成员举办工作坊，识别需求并为 Tidepools 收集设计想法；Tidepools 为开源可定制本地地图平台。**
- 定位：Social Software and Growth of the Network，第 2 段
- 原文："Throughout the first year, Baldwin and Schloss held workshops with community members to determine local needs and gather design ideas for Tidepools ... Tidepools is an open-source customizable local mapping platform built using Javascript, LeafletJS , PHP and MongoDB ."
- 暂定状态：已实施｜置信度：高
- 备注：工作坊与平台开发并行

**M01-E12｜社区工作坊提出的需求包括上网、可问责的社区参与、资源获取、本地信息系统、多语言与游戏化界面。**
- 定位：Social Software and Growth of the Network，第 3 段
- 原文："The needs identified in the community workshops were: ● Access to the Internet (at home, via mobile, and at neighborhood kiosks). ● Accountable community participation (FAQs, electronic bulletin boards, SMS enabled features). ● Access to resources (employment and skills sharing). ● Local Information System (historical archive, landmarks). ● Multilingual (Spanish, Arabic and Tagalog). ● Playful interface to promote exploration."
- 暂定状态：已实施｜置信度：高
- 备注：工作坊结果，原文为项目符号列表

**M01-E13｜2012 年夏，Baldwin 加入 OTI，OTI 为合作带来额外技术能力与社区数字鸿沟经验。**
- 定位：Social Software and Growth of the Network，第 4 段
- 原文："In the summer of 2012, Baldwin joined OTI’s staff, and OTI brought additional tech expertise to the collaboration along with experience closing digital divides and developing community-controlled infrastructure."
- 暂定状态：已实施｜置信度：高
- 备注：组织关系变化

**M01-E14｜B61 巴士实时信息应用于 2012-10-09 上线，Stop & Frisk 调查应用于 2012-10-17 上线。**
- 定位：Social Software and Growth of the Network，第 5 段
- 原文："Where’s the B61 Bus? – An application for accessing real-time bus locations and arrival times using data from the Metropolitan Transit Authority’s BusTime API ( launched October 9, 2012 ). ● Stop & Frisk Survey – A survey application that residents can use to document police interactions in Red Hook and improve public safety ( launched October 17, 2012 )."
- 暂定状态：已实施｜置信度：高
- 备注：两个应用的上线日期

**M01-E15｜RHI Radio 在 2013 年初仍处于开发中。**
- 定位：Social Software and Growth of the Network，第 5 段
- 原文："RHI Radio – An online radio station, streaming content produced by the Youth Radio Group at RHI ( under development )."
- 暂定状态：计划｜置信度：高
- 备注：与两个已上线应用区分

**M01-E16｜2012-10-29 Sandy 登陆；RHI 建筑保有电力，RHI WiFi 在风暴期间持续运行；灾后数日最多 300 人/日使用。**
- 定位：Expansion after Superstorm Sandy，第 1 段
- 原文："On October 29, 2012, Superstorm Sandy devastated low-lying Red Hook along with much of the surrounding region. ... The RHI building was one of the few locations that had managed to keep power and, as a result, RHI WiFi had stayed up through the storm. In the days immediately following the storm, up to 300 people per day were accessing the network to communicate with loved ones, learn what was happening in the rest of the city, and seek recovery assistance."
- 暂定状态：已实施｜置信度：高
- 备注：300 人/日与 M11、M15 的数字不同

**M01-E17｜Tony Schloss 表示，通信是灾后社区的关键需求之一，目标是让居民联系亲友、寻找住房、获取信息并报告安全状态。**
- 定位：Expansion after Superstorm Sandy，第 2 段
- 原文："“We immediately saw communications as one of the critical needs in the community,” says Tony Schloss. “We wanted it to be as easy as possible for people to contact their networks to find housing, gain access to information, and report their safety status.”"
- 暂定状态：观点/报道｜置信度：高
- 备注：参与者引述

**M01-E18｜灾后数日内，OTI 用 Tropo SMS API 与 Google Geocoding API 开发 RHI Status，把居民短信位置与需求自动映射到 Tidepools。**
- 定位：Expansion after Superstorm Sandy，第 2 段
- 原文："Text messaging was the most widely – and in some cases the only – means of communication for neighborhood residents after the storm, so in a matter of days, OTI developed RHI Status – an SMS to Map plugin for Tidepools using the Tropo Application Programming Interface (API) for handling SMS messages and the Google Geocoding API for handling natural language addresses."
- 暂定状态：已实施｜置信度：高
- 备注：应急应用开发

**M01-E19｜FEMA Innovation Fellow Frank Sanborn 联系 RHI，招募 NYC Mesh 与 HacDC 志愿者并协调 ITDRC；团队在 RHI 屋顶设卫星链路、在汽修店屋顶装 Commotion 路由器。**
- 定位：Expansion after Superstorm Sandy，第 3 段
- 原文："As recovery progressed, Frank Sanborn, a Federal Emergency Management Administration (FEMA) Innovation Fellow, reached out to RHI about expanding the network to further support recovery efforts in Red Hook. Sanborn recruited volunteers from NYC Mesh and HacDC , a Washington, DC based hackerspace, and coordinated with the International Technology Disaster Resource Center ( ITDRC ). ... the team set up a FEMA satellite link on the roof of RHI and installed a Commotion router on the roof of an auto body shop down the block from RHI."
- 暂定状态：已实施｜置信度：高
- 备注：多主体灾后扩展

**M01-E20｜汽修店店主此前不愿设点，灾后同意；该店成为 RHI 网关与 Coffey Park 节点之间的关键链路；卫星链路仅提供 30 天、带宽有限。**
- 定位：Expansion after Superstorm Sandy，第 3 段
- 原文："Previously, the owner of the shop had been reluctant to host a router, as he did not see a benefit in doing so. However, as the community rallied in response to the crisis, the auto body shop became a key link between the Internet gateway at RHI and the router overlooking Coffey Park, which had by then become an important aid distribution point for Red Hook. Although the satellite uplink was offered for only 30 days and provided modest bandwidth, the mesh network could distribute the Internet connection to key locations where residents, first responders, and recovery volunteers needed it most."
- 暂定状态：已实施｜置信度：高
- 备注：灾时宿主态度变化

**M01-E21｜Brooklyn Fiber 自愿增加网关；OTI、RHI 与 Brooklyn Fiber 在 Visitation Church Rectory 三楼安装 5GHz Nanostation Loco 与 Commotion 接入点，并配 UPS 供电 12 小时。**
- 定位：Expansion after Superstorm Sandy，第 4 段
- 原文："Brooklyn Fiber, a local Internet service provider (ISP), volunteered an additional gateway to RHI WiFi. To add the gateway into the mesh, OTI, RHI and Brooklyn Fiber installed a 5 GHz Ubiquiti Nanostation Loco router running AirOS (to receive the fiber signal), and a Ubiquiti Nanostation running Commotion (as a wireless access point), on the 3rd floor of the Visitation Church Rectory on the west side of Coffey Park. ... the team installed an uninterruptible power supply that could run the routers for 12 hours at a time."
- 暂定状态：已实施｜置信度：高
- 备注：第二个互联网网关

**M01-E22｜风暴后即使未推广，网络每周约支撑 100 名用户；居民主要用 Android 设备与 Apple iPod Touch 连接。**
- 定位：Expansion after Superstorm Sandy，第 5 段
- 原文："Since the storm, RHI WiFi has supported approximately 100 users per week even without promotion of the resource. Data collected by Commotion on current DHCP leases, as well as the Google Analytics on the landing webpage, show that residents appear to be primarily connecting using Android devices and Apple iPod Touches."
- 暂定状态：已实施｜置信度：中高
- 备注：项目方统计，未给原始数据

**M01-E23｜在纽约市劳动力发展资金支持下，RHI 与 OTI 于 2013-01 启动培训，采用 OTI 与 Allied Media Projects 在底特律开发的 Digital Stewards 课程，训练青年安装、维护与推广网络。**
- 定位：Sustainability & Future Goals，第 1 段
- 原文："With support from New York City Workforce Development funding, RHI and OTI are launching a training program in January 2013 to engage neighborhood residents in maintaining and growing the wireless network. Modeled on the “Digital Stewards” curriculum developed by OTI and Allied Media Projects in Detroit, Michigan, the curriculum will train young adults to install new routers, maintain existing ones, and promote adoption of the RHI WiFi network throughout Red Hook."
- 暂定状态：计划｜置信度：高
- 备注：2013-01 启动，2013-02 发文时仍属计划/刚启动

**M01-E24｜网络成本包括居民与技术人员的捐赠劳动、RHI/OTI 机构支持、每台约 50–85 美元硬件、每站点两人 3–5 小时安装，以及 RHI、Brooklyn Fiber、FEMA 捐赠带宽。**
- 定位：Cost of the Network
- 原文："● Donated labor from local residents and technologist. ● Institutional support from RHI and OTI. ● Hardware (~$50 to ~$85 each router). ● Installation (3-5 work hours for two people per site). ● Bandwidth (donated by RHI, Brooklyn Fiber, and FEMA)."
- 暂定状态：已实施｜置信度：高
- 备注：成本结构，非总成本

**M01-E25｜项目总结认为，灾前已建立的关系、社区技术素养与预先部署的设备有助于灾后快速扩展网络。**
- 定位：Lessons Learned
- 原文："Having relationships and anchor wireless nodes in place prior to a disaster facilitates rapid network deployment through: ○ Already-established relationships with key community stakeholders. ○ A heightened level of technological literacy in the community. ○ Pre-positioned wireless network equipment in the neighborhood."
- 暂定状态：观点/报道｜置信度：高
- 备注：项目方经验总结，非因果检验

## 2.2 M02 — Urban Omnibus 访谈（2013-09-25）

**M02-E01｜项目总体目标是用技术服务社区发展；要建立社区所有、服务本地通信的网络，而不只是提供上网。**
- 定位：UO 问：项目动因（TS 答）
- 原文："The overarching goal is to use technology for community development, and a WiFi network can be an incredible tool with which to do that. We are creating a community-owned network to provide Internet resources and, more importantly, a platform for local communication."
- 暂定状态：观点/报道｜置信度：高
- 备注：项目负责人表述

**M02-E02｜红钩被高速与水域隔离，缺少本地信息中心；社区服务存在但居民不一定知道，网络可帮助居民处理就业、福利与法院事务。**
- 定位：UO 问：项目动因（TS 答）
- 原文："Red Hook is a very isolated community: we’re cut off by a highway and sandwiched in by the water. It’s really hard to get information to people who might need it, and there’s been no central place for local communication. There are neighborhood services available to residents that not everybody takes advantage of, and people need help with things like finding jobs, getting their benefits, or responding to court orders."
- 暂定状态：观点/报道｜置信度：高
- 备注：问题诊断

**M02-E03｜调查显示许多居民主要通过手机上网，家中少有无线路由器，许多人只有一台或没有电脑。**
- 定位：UO 问：项目动因（TS 答）
- 原文："We decided to create a public WiFi network after conducting a survey, which revealed that many local residents access the Internet primarily through mobile phones — not many people have wireless routers in their houses, and many have one or no computer."
- 暂定状态：已实施｜置信度：高
- 备注：调查结果，未给样本与方法

**M02-E04｜三年前住在 Red Hook Houses 的居民只能从一家服务商获得网络，价格高且选择少。**
- 定位：UO 问：项目动因（TS 答）
- 原文："As of three years ago, if you lived in the Red Hook Houses you could only get service from one provider, which didn’t seem fair or appropriate. Local infrastructure can allow us to offer alternatives."
- 暂定状态：观点/报道｜置信度：中
- 备注：受访者回忆，未给具体年份与价格

**M02-E05｜Baldwin 在 Parsons 的硕士论文研究无线 mesh 的社会激励；先在 RHI 建小网络，设置 splash page 与评论流，后发展为地图平台与应用。**
- 定位：UO 问：社区参与过程（AB 答）
- 原文："My thesis was on social incentives behind wireless mesh networks and I wanted to work with a community to test out some of my ideas. First, we set up a small wireless network at RHI. I built in a splash page ... that serves as a community hub where we could post news announcements and people could add to a comment feed. That blossomed into a mapping platform with applications attached to it that were developed in coordination with the community"
- 暂定状态：已实施｜置信度：高
- 备注：设计与开发过程

**M02-E06｜社区参与采用迭代过程：先做原型、带回社区反馈、再调整；强调本地语境生长而非“空投技术”。**
- 定位：UO 问：社区参与过程（AB 答）
- 原文："I would build a prototype, bring it here to get feedback, and tweak it. It is an iterative process and there has to be a constant, open dialogue. It’s not about air-dropping technology somewhere; it’s about letting it grow naturally in response to the local context."
- 暂定状态：观点/报道｜置信度：高
- 备注：方法原则

**M02-E07｜本地服务器托管应用并连接路由器；团队在高楼屋顶建环形骨干，再向街面路由器扩散；单台路由器可承载 50 个以上连接；互联网由 Brooklyn Fiber 提供。**
- 定位：UO 问：网络技术（TS 答）
- 原文："A local server hosts the apps and is connected to a series of routers. First, we identified the tallest buildings in the neighborhood and built a ring of routers on some of those rooftops that connects with both the server and the Internet. Those routers spread connections to other routers at street level. ... Each one can handle upwards of 50 connections at a time. The Internet connection for the network is provided through Brooklyn Fiber, a local Internet Service Provider."
- 暂定状态：已实施｜置信度：高
- 备注：2013 年网络结构

**M02-E08｜Tidepools 在本地服务器运行，即使没有互联网连接，社区内部仍可通过网络通信；项目把基础设施本地所有权与本地通信等同。**
- 定位：UO 问：网络技术（AB/TS 答）
- 原文："The software, Tidepools, runs on the server locally so even if there is no Internet connection the network still works. ... even if the connection is cut off for some reason, you can still communicate within the neighborhood through the network. We equate the local ownership of the infrastructure with this local communication, and we all saw why that is important with Hurricane Sandy."
- 暂定状态：已实施｜置信度：高
- 备注：本地优先的技术逻辑

**M02-E09｜Sandy 时手机基站全部失效，但 RHI 的电力与 Verizon 连接仍工作，本地网络继续提供 WiFi；RHI 成为社区恢复据点，居民来充电、取暖、报平安。**
- 定位：UO 问：Sandy 期间（TS 答）
- 原文："When the storm hit, there was no phone service because all the cell towers were down, but fortunately our power and Verizon connection still worked, so our local network still provided WiFi access. RHI became the recovery hub in the neighborhood. People came to charge their phones, stay warm, and use the network to let people know that they were OK."
- 暂定状态：已实施｜置信度：高
- 备注：与 M01 一致；强调 RHI 电力与 Verizon 连接

**M02-E10｜约一周半后 FEMA 提供卫星上行链路，网络不再依赖 RHI 的 Verizon 连接，并把互联网扩展到此前未联网的 Coffey Park 节点。**
- 定位：UO 问：Sandy 期间（TS 答）
- 原文："About a week and a half later, FEMA heard about our work and wanted to support it. They provided a satellite uplink so we were no longer using RHI’s Verizon connection, and we were able to expand the Internet connection to the node at Coffey Park, which previously didn’t have it."
- 暂定状态：已实施｜置信度：高
- 备注：FEMA 介入时间：约 1.5 周后

**M02-E11｜灾前在學校与汽修店设点遇阻；灾后障碍消解，汽修店同意屋顶设点，整个过程约在一个周末内完成。**
- 定位：UO 问：Sandy 期间（AB/TS 答）
- 原文："Before Sandy, we had trouble getting permission to put routers on certain buildings that could serve as crucial nodes in expanding coverage. When we talked to schools, the discussion got lost in a black hole of bureaucracy. We tried to talk to an auto mechanics shop, but they wanted to know what was in it for them. A lot of these frustrating barriers disintegrated after Sandy. The shop allowed us to put a router on their roof. Everything basically unfolded over a weekend."
- 暂定状态：已实施｜置信度：高
- 备注：灾时社会条件变化

**M02-E12｜维护是巨大挑战：住户可能搬走或拔掉路由器，建筑材质与天气影响信号；必须有本地支持结构与知识传递，否则知识源离开后网络会崩溃；RHI 是社区锚点。**
- 定位：UO 问：扩展挑战（AB/TS 答）
- 原文："If you are able to site a router in someone’s apartment, they might move or unplug it and that can cut off part of the network. Environmental factors, from building materials to weather conditions, affect functionality. Maintenance is a huge challenge, because things just break. You have to have a support structure in place locally ... If that knowledge source leaves without teaching others, then the network will collapse. And you need a community anchor where that information exchange can happen. That’s what RHI is."
- 暂定状态：观点/报道｜置信度：高
- 备注：维护与知识传递判断

**M02-E13｜项目希望实现财务自持：若 300 人每月付 5 美元，就足以支持维护与互联网接入；这需要 Digital Stewards 建立维护能力。**
- 定位：UO 问：扩展挑战（TS 答）
- 原文："Eventually we need the network to be financially self-sustaining too. If we had 300 people paying $5 a month, we’d have plenty of money for support and Internet access. We have to build the capacity to maintain the network. That’s where the Digital Stewards program really comes in."
- 暂定状态：计划｜置信度：高
- 备注：设想中的收费模式，未实施

**M02-E14｜Digital Stewards 是 OTI 开发的开源课程，先在底特律实施；红钩将其改编为青年发展项目，青年以 RHI 员工身份参加一年期 fellowship，学习安装、维护、推广；当时有 8 名 19–24 岁青年。**
- 定位：UO 问：Digital Stewards（TS 答）
- 原文："Digital Stewards is an open-source curriculum that OTI developed to teach people how to build a community wireless network. OTI first implemented it in Detroit with a group of community activists and we’ve adapted it for our youth development work. Young adults work as RHI employees through a one-year fellowship where they learn technical and community organizing skills by building and maintaining the network. ... Right now we have eight young adults between the ages of 19 and 24 that are doing network installation, maintenance, and promotion."
- 暂定状态：已实施｜置信度：高
- 备注：2013-09 时点；与 M04 的 8 个月培训不同

**M02-E15｜把网络接入 Red Hook Houses 是原始目标之一；RHI 已与 NYCHA 会谈，但面临官僚、社会与技术挑战；因此先采取“包围”Red Hook Houses 的过渡策略，并想在一栋楼试点住户窗内路由器。**
- 定位：UO 问：未来计划（TS 答）
- 原文："One obvious thing that’s missing is getting the network onto Red Hook Houses property. That was part of the original intent, and we have met with NYCHA to discuss it, but it’s a bureaucratic, social, and technical challenge. Because we realized that process would be a long one, we’ve decided to surround the Red Hook Houses with the network as an interim strategy. We also want to take one building in the Red Hook Houses and see if we can spread the network just through residents putting routers in their apartment windows."
- 暂定状态：计划｜置信度：高
- 备注：Red Hook Houses 为目标但未覆盖

**M02-E16｜项目命名为 Red Hook WiFi 而非 Red Hook Initiative WiFi，意在让网络惠及并容纳所有人；社区对网络的控制比谁安装基础设施更重要。**
- 定位：UO 问：社区所有权（TS 答）
- 原文："Who cares who installed the infrastructure as long as the community can control it? It’s called Red Hook WiFi, not Red Hook Initiative WiFi, because we want the network to benefit and involve everybody."
- 暂定状态：观点/报道｜置信度：高
- 备注：所有权理念

## 2.3 M03 — New America RISE:NYC 新闻稿（2015-05-01）

**M03-E01｜2015-05-01，New America 宣布其 Resilient Mesh Wireless 项目入选 NYCEDC 的 RISE:NYC 竞赛。**
- 定位：Press Release，第 1 段
- 原文："New America is pleased to announce that its Resilient Mesh Wireless initiative is a winner of RISE : NYC, a New York City Economic Development Corporation (NYCEDC) competition to identify and deploy creative new technologies to promote recovery from Superstorm Sandy, mitigate the impacts of future storms, floods and power outages, and strengthen the City’s long-term resiliency efforts."
- 暂定状态：已实施｜置信度：高
- 备注：机构新闻稿；未给金额

**M03-E02｜Resilient Mesh Wireless 由面向小企业的本地网络与 Sandy 受灾社区培训组成，合作方包括 New America、Sky Packets、社区锚点机构与 60 多家本地小企业。**
- 定位：Press Release，第 2 段
- 原文："The Resilient Mesh Wireless project is a series of local networks serving small businesses combined with community-based trainings in Sandy-affected areas. ... the Resilient Mesh Wireless initiative will be a collaboration among New America, Sky Packets ... community anchor institutions across the city’s five boroughs, and more than five dozen local small businesses."
- 暂定状态：计划｜置信度：高
- 备注：项目设计

**M03-E03｜New America 将在 Stapleton、Rockaways、South Bronx、Lower East Side、Gowanus、Long Island City 六个社区开展培训，并以红钩 WiFi 经验为基础。**
- 定位：Press Release，第 2 段
- 原文："New America will conduct training programs in six neighborhoods: Stapleton, the Rockaways, the South Bronx, the Lower East Side, Gowanus, and Long Island City. The project plan builds on OTI’s experience deploying resilient local networks in the field using Commotion Wireless and other technologies, and particularly its support of the Red Hook WiFi network"
- 暂定状态：计划｜置信度：高
- 备注：其他社区仅作情境

**M03-E04｜红钩网络也是 RISE:NYC 获奖项目，由 RHI 与 Red Hook Digital Stewards 维护和治理。**
- 定位：Press Release，第 3 段
- 原文："The Red Hook network, another winner of RISE:NYC, is maintained and governed by the Red Hook Initiative and the Red Hook Digital Stewards."
- 暂定状态：已实施｜置信度：高
- 备注：2015 年治理结构

**M03-E05｜NYCEDC 主席 Kyle Kimball 称共有 11 项创新技术获奖。**
- 定位：Press Release，第 4 段
- 原文："“Each of the 11 innovative winning technologies will make the City a safer, stronger and more resilient place, creating economic support and additional opportunities for New Yorkers and small businesses.”"
- 暂定状态：已实施｜置信度：高
- 备注：与 M12 的 11 个获奖者一致

## 2.4 M04 — RHI Impact Report 2017（PDF）

**M04-E01｜Digital Stewards 是带薪 8 个月培训，青年维护和推广 Red Hook WIFI、协调技术项目与活动。**
- 定位：PDF p.9，Digital Stewards
- 原文："A key component of the Young Adult program is Digital Stewards, a paid, 8-month training program through which young adults maintain and promote the Red Hook WIFI network, coordinate tech-related projects and events, and gain tech skills and knowledge."
- 暂定状态：已实施｜置信度：高
- 备注：2017 年项目版本；与 2013 年“一年期 fellowship”不同

**M04-E02｜77% 的 Digital Stewards 在完成项目后六个月内仍就业或继续求学。**
- 定位：PDF p.9，Digital Stewards
- 原文："77% of Digital Stewards remained employed or were actively pursuing ... further education within six months of completing the program."
- 暂定状态：已实施｜置信度：中高
- 备注：机构自报绩效

**M04-E03｜2017 年 Red Hook WIFI 在商业街招募 38 家本地商户作为热点宿主，显著扩展。**
- 定位：PDF p.12，Red Hook WIFI Program Impact
- 原文："In 2017, RHI’s Red Hook WIFI expanded significantly with the recruitment of 38 local business partners on Red Hook’s commercial streets to host hotspots."
- 暂定状态：已实施｜置信度：高
- 备注：与 M08 的 38 家名单对应

**M04-E04｜2017 项目年度 Red Hook WIFI 被访问 17,901 次。**
- 定位：PDF p.12，Red Hook WIFI Program Impact
- 原文："Red Hook WIFI was accessed 17,901 times in the 2017 program year."
- 暂定状态：已实施｜置信度：高
- 备注：“访问次数”非独立用户数

**M04-E05｜2016 年夏，Digital Stewards 与 MIT 博士生开展参与式行动研究，后续在 MIT 与 Allied Media Conference 展示。**
- 定位：PDF p.12，Red Hook WIFI Program Impact
- 原文："In summer 2016, a team of Digital Stewards and a doctoral candidate from Massachusetts Institute of Technology (MIT) partnered to conduct a participatory action research project to explore the meaning and impact of Red Hook WIFI. Digital Stewards presented the resulting study at MIT, and their findings were included in sessions at the Allied Media Conference in Detroit, Michigan."
- 暂定状态：已实施｜置信度：高
- 备注：研究产出的具体报告尚未取得

## 2.5 M05 — Red Hook WiFi 官网主页

**M05-E01｜Red Hook WiFi 是 RHI 的项目，定位为社区主导、旨在缩小数字鸿沟的努力。**
- 定位：首页，项目介绍
- 原文："Red Hook WiFi, a project of Red Hook Initiative (RHI) , is a community-led effort to close the digital divide."
- 暂定状态：已实施｜置信度：中高
- 备注：现行官网表述

**M05-E02｜项目提供免费可靠的互联网接入，使用接入点与韧性热点；由小企业和服务机构作为网关与接入点宿主；Red Hook HUB 提供本地信息。**
- 定位：首页，What is Red Hook WiFi / Partners
- 原文："A community-led effort to provide free and reliable access to the internet and the resources it provides. ... Free internet service using access points and Resilient Hotspots. ... Powered by small businesses and organizations who serve as gateway and access point hosts."
- 暂定状态：已实施｜置信度：中高
- 备注：功能与伙伴模式

## 2.6 M06 — Red Hook WiFi 官网 Coverage

**M06-E01｜官网设定的覆盖目标是到 2020 年把免费 WiFi 带到整个社区，包括 NYCHA 的 Red Hook Houses。**
- 定位：Coverage，Coverage Goal
- 原文："Coverage Goal: To bring free WiFi to the entire neighborhood, including the NYCHA Red Hook Houses, by 2020."
- 暂定状态：计划｜置信度：高
- 备注：目标，非完成事实

**M06-E02｜官网称网络将逐步扩展到社区商业街廊，使用 40+ 接入点与 14 个韧性热点；韧性热点配替代电源。**
- 定位：Coverage，第 1 段
- 原文："Over time Red Hook WiFi will expand to provide free internet service throughout the commercial corridors of the community, using 40+ access points and 14 resilient hotspots. Resilient Hotspots are sites equipped with alternative power sources to ensure continuity in the event of power outages."
- 暂定状态：计划｜置信度：高
- 备注：未来规划，不能当作已部署数量

## 2.7 M07 — Red Hook WiFi 官网 Mission

**M07-E01｜项目使命为韧性、机会、社区与社会正义四项。**
- 定位：Mission，第 1 段
- 原文："Mission: Resilience, Opportunity, Community and Social Justice"
- 暂定状态：观点/报道｜置信度：高
- 备注：价值表述

**M07-E02｜官网称设备有太阳能备电、网络为自愈 mesh，并由本地居民维护。**
- 定位：Mission，Resilience
- 原文："Equipment supported by solar backup systems Self-healing mesh network Maintained by local residents"
- 暂定状态：观点/报道｜置信度：中高
- 备注：能力/安排表述，未给覆盖比例

## 2.8 M08 — Red Hook WiFi 官网 Partners

**M08-E01｜官网列出 38 家商户/机构作为网关与接入点宿主，并列出地址。**
- 定位：Partners，名单
- 原文："Red Hook WiFi is powered by small business partners who serve as gateway and access point hosts."
- 暂定状态：已实施｜置信度：中高
- 备注：名单可逐项计数；页面未标日期

**M08-E02｜Digital Stewards 为带薪 8 个月培训，青年维护和推广网络、协调技术项目与活动、获得媒体制作技能。**
- 定位：Partners，Digital Stewards
- 原文："Digital Stewards program is a paid, 8-month training through which young adults maintain and promote the Red Hook WiFi network, coordinate tech-related projects and events, and gain media production skills."
- 暂定状态：已实施｜置信度：中高
- 备注：与 M04 一致

## 2.9 M10 — NYT（Noam Cohen，2014-08-22，部分可读）

**M10-E01｜2014 年，19 岁的 Robert Smith 在 Miccio 社区中心屋顶维护 Red Hook mesh 节点。**
- 定位：导语，第 1–2 段（预览）
- 原文："Robert Smith, a 19-year-old in a gray T-shirt and camouflage pants, climbed the stairwell of the Joseph Miccio Community Center in Red Hook ... Mr. Smith pulled a laptop from his backpack and got to work, tending to the nodes of the Red Hook mesh, an ambitious plan to link up a local wireless digital network across the neighborhood."
- 暂定状态：已实施｜置信度：高
- 备注：仅预览段落

**M10-E02｜报道称 mesh 设备彼此通信，即使不连接互联网仍构成网络，这是其主要吸引力。**
- 定位：第 4–5 段（预览）
- 原文："Because the devices speak to one another, they are more than a series of “hot spots” with Internet access; the mesh remains a network whether or not it is connected to the Internet."
- 暂定状态：观点/报道｜置信度：高
- 备注：媒体对 mesh 能力的解释

**M10-E03｜红钩约 11,000 名居民，无地铁、互联网热点少，近 70% 人口住在纽约市公共住宅。**
- 定位：第 6 段（预览）
- 原文："The 11,000 or so residents can feel at the whim of nature, as well as government and corporate bureaucracies. There is no subway service; there are few Internet hot spots; close to 70 percent of the population lives in New York City housing projects."
- 暂定状态：已实施｜置信度：中
- 备注：与 M01 的 5,000 人口径不同

## 2.10 M11 — Orion（Nancy Scola，2015-01-05）

**M11-E01｜Digital Stewards 为 19–24 岁红钩居民，接受一年训练，学习屋顶作业、布线、节点配置等无线网络各方面。**
- 定位：开篇，第 2 段
- 原文："for a year participants learn every aspect of wireless networking: scampering around on rooftops, running cables, and configuring nodes. The stewards, all between the ages of nineteen and twenty-four and residents of Brooklyn’s Red Hook neighborhood, are intent on using their digital skills to knit the community together."
- 暂定状态：已实施｜置信度：高
- 备注：2015 年报道时点

**M11-E02｜Stewards 已架设近两打路由器，网络覆盖从公共住宅到日托中心与本地图书馆。**
- 定位：开篇，第 2 段
- 原文："They’ve put up nearly two dozen breadbox-shaped plastic routers to create a network of coverage called Red Hook WiFi, which extends throughout the neighborhood, from housing projects to daycare centers to the local library."
- 暂定状态：已实施｜置信度：高
- 备注：“近两打”为路由器数量估计

**M11-E03｜2011 年秋，Baldwin 从 Amazon 订购防风雨 Nanostation；两个一包 89 美元；首节点总投入低于 300 美元，接入 RHI 原有的 Verizon 连接。**
- 定位：中段，项目起步
- 原文："In the fall of 2011, Baldwin ordered a handful of weatherproof nanostations from Amazon. It wasn’t a major expense, Baldwin says: “They came two to a pack for just eighty-nine dollars.” Baldwin and Schloss headed up to the Red Hook Initiative’s roof and attached one of the routers to a mast. They then ran a cable back inside the center and connected it to the nonprofit’s existing internet connection, provided by Verizon. All told, they spent less than three hundred dollars—and Red Hook WiFi was born."
- 暂定状态：已实施｜置信度：高
- 备注：设备价格与首节点成本

**M11-E04｜信号从 Fairway 建筑屋顶出发，经高层屋顶路由器逐跳传递，再由接入点送到街面设备。**
- 定位：中段，网络结构
- 原文："The wireless signal begins on the top of the Fairway Building ... From there the signal is passed, in the form of radio waves, like a three-dimensional game of telephone, hopping from router to router across the rooftops of the neighborhood’s tallest buildings. It gets pushed closer to the ground by access points ..."
- 暂定状态：已实施｜置信度：高
- 备注：2015 年网络形态

**M11-E05｜Brooklyn Fiber 由两兄弟创办，因全国性有线运营商不愿服务红钩；它以固定费用允许 RHI 尽可能广泛共享连接，是该规模网络的关键条件。**
- 定位：中段，Brooklyn Fiber
- 原文："Brooklyn Fiber is the creation of two tech-savvy brothers who grew frustrated with a national cable provider that seemingly showed little interest in servicing Red Hook. This local resource is largely what makes Red Hook WiFi possible at this scale. Brooklyn Fiber allows the Red Hook Initiative to share its internet connection as far and as wide as it wants for a flat fee."
- 暂定状态：已实施｜置信度：高
- 备注：本地 ISP 的作用

**M11-E06｜Sandy 时红钩停电、电话与互联网中断，RHI 成为社区中心；危机高峰每天约 1,200 人到 RHI 寻求帮助，FEMA 提供屋顶卫星天线。**
- 定位：Sandy 段
- 原文："The lights went out, phone lines stopped working, and internet in much of the neighborhood went down. ... At the height of the crisis, some twelve hundred people a day were coming in to find assistance. ... A rooftop satellite dish, brought in by FEMA, temporarily served as the source feed for the neighborhood’s homegrown WiFi network."
- 暂定状态：已实施｜置信度：高
- 备注：1,200 人为到 RHI 求助人数

**M11-E07｜灾前一些居民拒绝 RHI 在屋顶设路由器；灾后态度转变，RHI 得以在救援人员聚集的公园建立完整信号。**
- 定位：Sandy 段
- 原文："Before the storm, some in the community had resisted letting RHI trudge up to their rooftops to set up routers. After Sandy, doors opened and RHI was able to establish a full-strength signal covering the park where the Red Cross and other aid workers were gathered. Although the network was small at the time, it was just about the only internet access in town."
- 暂定状态：已实施｜置信度：高
- 备注：灾时社会许可变化

**M11-E08｜Digital Stewards 在一年服务期内由 RHI 与 OTI 培训，亲手建网；对许多人是第一份工作，内容包括布线、网络设计与编程。**
- 定位：中段，Digital Stewards
- 原文："During their yearlong service, the digital stewards are trained by the Red Hook Initiative and the Open Technology Institute to build a network by hand. It’s a first job for many of them. Rather than working at the local deli or babysitting, they’re running cables down the sides of buildings, designing network layouts, and learning to code."
- 暂定状态：已实施｜置信度：高
- 备注：培训与劳动内容

**M11-E09｜Katherine Ortiz 于 2014-02 从项目毕业；她称网络帮助居民申请工作和大学，也改变了她的职业想象。**
- 定位：Digital Stewards 段
- 原文："Katherine Ortiz, who graduated from the Digital Stewards program in February of 2014 ... “It gave me another way to think about what I could do for a career. Technology wasn’t something I thought I could do.”"
- 暂定状态：观点/报道｜置信度：高
- 备注：参与者自述

**M11-E10｜mesh 可连接一个、多个或无互联网上行；路由器故障时其他路由器会自动重配以补位。**
- 定位：中段，mesh 原理
- 原文："Mesh can work with one connection to the internet, or several for redundancy, or none at all, in which case data can still be used locally until the internet is back up. ... And mesh is self-healing: if one router goes out of service, other routers automatically reconfigure themselves to help cover the gap."
- 暂定状态：观点/报道｜置信度：高
- 备注：技术能力描述

## 2.11 M12 — Brooklyn Reporter（2015-05-04）

**M12-E01｜2015-04-30，市长宣布 11 项创新技术获选，最高共 3,000 万美元，用于 Sandy 受灾小企业的韧性项目；27 个入围者参选。**
- 定位：第 1–2 段
- 原文："The developers of 11 innovative technologies will receive up to $30 million to implement resiliency projects at small businesses hit by Hurricane Sandy, at no cost to businesses owners, Mayor Bill de Blasio announced on Thursday, April 30. The technologies were selected from a group of 27 finalists competing in the Resiliency Innovations for a Stronger Economy (RISE : NYC) competition ..."
- 暂定状态：已实施｜置信度：高
- 备注：总额与获奖数；单项金额未给

**M12-E02｜RHI 的 Red Hook Wi-fi 在获奖名单中。**
- 定位：末段
- 原文："For a full list of winners, including Red Hook Initiative’s Red Hook Wi-fi, visit www.rise-nyc.com."
- 暂定状态：已实施｜置信度：高
- 备注：确认 RHI 为获奖者之一

**M12-E03｜RISE:NYC 旨在帮助 Sandy 受灾小企业应对未来风暴、海平面上升与气候变化。**
- 定位：第 3 段
- 原文："a New York City Economic Development Corporation (NYCEDC) program designed to help small businesses impacted by Hurricane Sandy prepare for future storms, sea level rise, and other effects of climate change, while strengthening New York City’s long-term resiliency efforts."
- 暂定状态：已实施｜置信度：高
- 备注：项目目的

## 2.12 M13 — My NYC Story（2016-08-29）

**M13-E01｜2016 年 1–6 月，Red Hook WIFI 被访问 15,624 次以上，独立用户超过 3,000 人。**
- 定位：正文，第 1 段
- 原文："From January through June 2016, Red Hook WIFI was accessed more than 15,624 times by over 3000 individual users."
- 暂定状态：已实施｜置信度：中
- 备注：地方史页面转述，未给原始数据

## 2.13 M14 — Inverse Video（2018-07-22）

**M14-E01｜Sandy 后，几乎完全由社区青年组成的团队在屋顶安装 Nanostation 无线发射器，以太阳能供电。**
- 定位：第 4 段
- 原文："The team, almost entirely run by young adults from the community, began reconstruction by installing wireless transmitters called nano stations on rooftops around the neighborhood. The purpose of these nano stations is to provide communication between each station without the use of expensive, accident-prone cables, which are powered by huge solar panels positioned on rooftops."
- 暂定状态：观点/报道｜置信度：中
- 备注：短视频报道，技术表述简化

**M14-E02｜Digital Stewards 培训青年维护与测试网络；报道称发射器、太阳能板与网络仍由红钩青年维护。**
- 定位：第 6–8 段
- 原文："“So part of the Digital Stewards program is actually training young adults how to maintain networks, how to test networks.” ... The transmitters, solar panels, and network still exist today and continue to be maintained by young adults from Red Hook."
- 暂定状态：观点/报道｜置信度：中
- 备注：2018 年报道时点

## 2.14 M15 — The Verge（Justine Calma，2023-05-22）

**M15-E01｜RHI 于 2002 年由 Jill Eisenhard 以一笔资助起步，培训 10 名住在 Red Hook Houses 的女性成为生殖健康教育者；2010 年把旧工厂改为社区中心。**
- 定位：The first node，第 2 段
- 原文："The organization started small in 2002, when its founder, Jill Eisenhard, got a grant to train 10 women living in the Houses to become reproductive health educators. In 2010, it turned a former factory building into a community center, running a range of advocacy, job training, and youth leadership programs."
- 暂定状态：已实施｜置信度：高
- 备注：RHI 组织史

**M15-E02｜RHI 的媒体/数字管家项目催生了 Red Hook WiFi；Schloss 先做广播，后转向 mesh。**
- 定位：The first node，第 3 段
- 原文："It’s one of those programs, eventually dubbed “digital stewards,” that launched Red Hook Wi-Fi. Young Red Hook Houses residents produced video and audio stories about living in the neighborhood as part of the program ... He bought a radio transmitter and started broadcasting them from his home at first. Then, he started hearing buzz about mesh networks."
- 暂定状态：已实施｜置信度：高
- 备注：项目起源叙述

**M15-E03｜2011-12，Schloss 与 Baldwin 在 RHI 设置首个测试节点；天线用扎带和胶带固定在三脚架与轮胎上，雨后倒塌但仍在线。**
- 定位：The first node，第 5 段
- 原文："In December 2011, the pair set up Red Hook WiFi’s very first test node at RHI. The node was little more than an antenna zip-tied and taped to a tripod and tire. A couple days later, a rainstorm blew it over — but it was still online."
- 暂定状态：已实施｜置信度：高
- 备注：与 M17 的 2011-11 冲突

**M15-E04｜Sandy 后，Coffey Park 的第二个节点被救援人员与居民立即使用，网络跳到 1,000 人/日；FEMA 部署卫星天线。**
- 定位：From a node to a network，第 3 段
- 原文："they realized Coffey Park wasn’t just a disaster zone — it was the home of RHI’s second mesh node. Few people knew about the nascent network. But in the aftermath of the storm, emergency responders and visiting residents hopped onto it immediately. The network jumped to a thousand users a day ... FEMA deployed a satellite dish to strengthen the network."
- 暂定状态：已实施｜置信度：高
- 备注：1,000 人/日为网络用户口径

**M15-E05｜Smith 于 2013 年高中毕业后加入 Digital Stewards，完成带薪青年项目后成为全职员工，后管理整个网络。**
- 定位：From a node to a network，第 6 段
- 原文："Smith joined the digital steward program in 2013, just out of high school and looking for a job. He completed a paid youth program and became full-time staff, and soon, he’d taken on managing the whole network as its systems administrator."
- 暂定状态：已实施｜置信度：高
- 备注：个人经历，兼作项目效果证据

**M15-E06｜2015 年 RISE:NYC 由 NYCEDC 启动、获 HUD 资助；向 New America 拨款 400 万美元建六个 mesh 网络，RHI 获约 100 万美元扩展青年项目与网络。**
- 定位：From a node to a network，第 8 段
- 原文："The New York City Economic Development Corporation, funded by the US Department of Housing and Urban Development, started a program called Rise:NYC ... It awarded New America $4 million to create six more mesh networks ... RHI itself got approximately $1 million to grow its youth program and mesh network, rewarding an effort that had already earned praise from broadband access advocates."
- 暂定状态：已实施｜置信度：中
- 备注：单项金额仅此一篇来源，待合同补证

**M15-E07｜新资金使网络扩展到约 20 个站点，部分配太阳能备电；早期每年约 500 用户，后来每周约 500 用户。**
- 定位：From a node to a network，第 9 段
- 原文："The network grew to encompass routers at some 20 locations. A handful included solar panels to provide backup power in the event of a blackout. In the network’s early days, it might get 500 users a year, Smith recalls; soon, it was serving that number every week."
- 暂定状态：已实施｜置信度：中
- 备注：用户数为受访者回忆

**M15-E08｜NYCHA 对 Red Hook Houses 有最终决定权；Schloss 称 NYCHA 对设点持开放态度，但要求 RHI 自行承担项目费用。**
- 定位：Losing ground，第 2 段
- 原文："it was another matter dealing with the New York City Housing Authority (NYCHA) — which had the final say over the Red Hook Houses. ... NYCHA was open to the idea, says Schloss — but only if RHI could pay for the project itself."
- 暂定状态：观点/报道｜置信度：高
- 备注：受访者转述机构立场

**M15-E09｜2016 年 Smith 离开 RHI，2017 年 Schloss 离开；此后维护人员所剩无几。**
- 定位：Losing ground，第 3 段
- 原文："In 2016, Smith left his job at RHI to take a residency as a technologist researching disaster preparedness at another cultural center in the neighborhood. Schloss took on some of Smith’s tasks to maintain the network, but he soon left RHI in 2017 after close to a decade working at the organization. Without them, few people were left to maintain the now-sprawling system of nodes."
- 暂定状态：已实施｜置信度：高
- 备注：关键人员流失

**M15-E10｜2019 年 RISE:NYC 资助结束，RHI 将网络移交 Sky Packets；后者承担每月约 3,000 美元数据与电力成本及日常维护。**
- 定位：Losing ground，第 5 段
- 原文："In 2019, RHI made the same call. Rise:NYC’s grant had dried up, with no replacement on the horizon. To keep the network going, the nonprofit handed it over to Sky Packets, which agreed to manage the roughly $3,000 monthly data and electrical costs and perform routine maintenance."
- 暂定状态：已实施｜置信度：中
- 备注：移交年份仅此一篇来源

**M15-E11｜2020 年疫情期间，商户关闭并撤下节点；Red Hook Houses 居民被困家中，处于网络覆盖之外。**
- 定位：Losing ground，第 6 段
- 原文："But as businesses closed up shop in an attempt to limit the virus’ spread, they took their nodes down too. Unlike during Sandy, Red Hook Housing residents couldn’t flock to public places to take advantage of the network. They were stuck in their apartments, just beyond its reach."
- 暂定状态：已实施｜置信度：高
- 备注：疫情影响

**M15-E12｜住宅区施工破坏旗杆节点，其他路由器因长期暴露下线；2023 年报道时约剩 10 个活跃站点，Coffey Park 已不在其中。**
- 定位：Losing ground，第 7–8 段
- 原文："Construction around the housing development, part of ongoing upgrades since Hurricane Sandy, knocked out a popular outdoor access point at a flagpole in the middle of the Houses. Other routers dropped offline after being out in the elements for years. Today, there are around 10 active Wi-Fi locations left. Coffey Park, one of the network’s first access points, is no longer among them."
- 暂定状态：已实施｜置信度：高
- 备注：2023 年现场核查

**M15-E13｜2021 年市府再次有条件同意网络进入住宅区，条件是 Sky Packets 自行筹资；2022 年 Adams 政府以 Big Apple Connect 取代原计划。**
- 定位：Losing ground，第 8 段
- 原文："In 2021, the city once again gave the mesh network the greenlight to expand within the Houses, as long as Sky Packets secured the funding. The approval was part of a plan backed by then-Mayor Bill de Blasio to achieve universal broadband in part by boosting smaller, locally led internet service providers. But when de Blasio’s successor Eric Adams took office the next year, he replaced the program with his own plan, Big Apple Connect ."
- 暂定状态：已实施｜置信度：高
- 备注：政策变化

**M15-E14｜NYC OTI 称 Red Hook Houses 未进入 Big Apple Connect 首期，部分原因是 Sky Packets 已为户外公共区域提供免费宽带。**
- 定位：Losing ground，第 10 段
- 原文："“Red Hook Houses was not included in the first phase [of Big Apple Connect] because of Sky Packets’ existing relationship and that the company had built out free broadband capabilities for outdoor public areas.”"
- 暂定状态：观点/报道｜置信度：高
- 备注：政府官员邮件引述

**M15-E15｜Red Hook Farms 使用 mesh 网络监测温室温度与户外空气质量，并把数据接入全国空气质量地图。**
- 定位：The network’s new purpose，第 4–6 段
- 原文："Parker recently installed temperature sensors that use the mesh network to alert staff about an outage ... RHI installed an air quality sensor that connects to the mesh network, adding its pollution readings to a national air quality map ."
- 暂定状态：已实施｜置信度：高
- 备注：2018 年后新用途

**M15-E16｜Greta Byrum 认为不应把 mesh 网络当作服务大量人口的规模化方案，因为会产生过多所有权与维护问题。**
- 定位：The network’s new purpose，第 9 段
- 原文："“One thing I would not suggest is building mesh networks as a scaled-up solution to serve lots and lots of people,” says Byrum ... “It creates too many ownership and maintenance problems.”"
- 暂定状态：观点/报道｜置信度：高
- 备注：前项目负责人反思

**M15-E17｜2022 年 NYC 主计长与 Urban Ocean Lab 报告把该 mesh 网络列为城市应支持的合作社区基础设施案例。**
- 定位：结尾，第 2 段
- 原文："In 2022, a report by NYC Comptroller Brad Lander and the Urban Ocean Lab touted the mesh network as an example of the kind of community-owned infrastructure that the city ought to support to make itself more resilient."
- 暂定状态：观点/报道｜置信度：高
- 备注：政策评价

**M15-E18｜Byrum 认为网络的价值不只在设备，还在于受过训练、能在紧急时部署网络的人。**
- 定位：结尾，第 4 段
- 原文："“It is the equipment and the network, but it’s also the people,” Byrum says. “There’s a huge value in people being trained so that they know how to roll something like this out when there is an emergency.”"
- 暂定状态：观点/报道｜置信度：高
- 备注：对维护能力的判断

## 2.15 M16 — NYC CDBGDR RISE:NYC 页面

**M16-E01｜RISE:NYC 帮助 Sandy 受灾小企业采用创新技术，准备建筑、能源系统与电信网络以应对极端天气；执行伙伴为 MOCEJ，子受赠方为 NYCEDC。**
- 定位：Program Description
- 原文："The Resiliency Innovations for a Stronger Economy (RISE:NYC) program helps small businesses adapt to and mitigate the impacts of climate change through the use of innovative technologies. The program funds projects at Sandy-impacted small businesses to prepare their buildings, energy systems, and telecom networks for extreme weather."
- 暂定状态：已实施｜置信度：高
- 备注：政府项目说明；无金额

## 2.16 M17 — Wikipedia（三级来源）

**M17-E01｜维基信息框称 Red Hook Wi-Fi 由 RHI 所有、2011 年 11 月建立、状态为活跃。**
- 定位：信息框
- 原文："Owner Red Hook Initiative Established November 2011 Status Active"
- 暂定状态：未确认｜置信度：低
- 备注：三级来源；与 M15 的 2011-12 首测节点冲突

## 2.17 M18 — Resilient Comms（二次汇编）

**M18-E01｜该二次汇编称红钩网络峰值约 40 个节点，覆盖红钩大部分地区。**
- 定位：What Was Deployed，第 1 段
- 原文："~40 nodes at peak deployment Coverage across most of Red Hook"
- 暂定状态：观点/报道｜置信度：低
- 备注：与 M15 的约 20 站点冲突

**M18-E02｜该汇编称 Sandy 时许多节点断电离线，网络未完整部署，且多数居民不知道网络存在。**
- 定位：What didn't work
- 原文："Many nodes lost power and went offline The network was not fully deployed before the storm ... Most residents didn't know the network existed or how to use it"
- 暂定状态：观点/报道｜置信度：低
- 备注：无具体引文；用于修正“完整幸存”叙述
