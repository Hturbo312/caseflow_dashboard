# C17 Ramani Huria 原子事实与实体（确认版 v1.0）

> 状态：**研究者已于 2026-11-13 确认 78 条事实与 105 个实体**；允许进入 G5。
> 确认要点：学生保持为单一实体；技术—能力—使用三层保留；F076 标 `implemented`、F079 标 `reported_or_opinion`；社区成员的 target 角色保留。
> 生成时间：2026-11-13
> 依据：`process.md` v0.1（12 段）与 `evidence.json` v1.0（116 条）。
> 规则：一条事实只承载一个可独立核验的陈述；实体角色按 8 类本体标注，同一实体可有多种角色。

## 1. 汇总

| 项 | 数量 |
|---|---|
| 原子事实 | 78 |
| 实体 | 105 |
| 已实施 | 63 |
| 计划 | 3 |
| 观点/报道 | 12 |
| 争议 | 0 |
| 未确认 | 0 |

## 2. 实体清单（按类型）

**Actor 主体（27）**：E-A01 HOT（人道主义 OpenStreetMap 团队）；E-A02 世界银行；E-A03 英国国际发展部（DFID）；E-A04 全球减灾与恢复基金（GFDRR）；E-A05 红十字会（坦桑尼亚/美国/丹麦）；E-A06 Ardhi 大学；E-A07 达累斯萨拉姆大学（UDSM）；E-A08 坦桑尼亚科学技术委员会（COSTECH）；E-A09 达累斯萨拉姆市议会；E-A10 市辖区议会（Ilala/Kinondoni/Temeke）；E-A11 坦桑尼亚开放数据倡议（TODI）；E-A12 BUNI Hub；E-A13 坦桑尼亚韧性学院（RA）；E-A14 桑给巴尔国立大学（SUZA）；E-A15 芬兰图尔库大学；E-A16 OpenMap Development Tanzania（OMDTZ）；E-A17 Spatial Collective；E-A18 Deltares；E-A19 Nipe Fagio；E-A20 达累斯萨拉姆多机构应急响应队（DarMAERT）；E-A21 农村发展规划研究所（IRDP）；E-A22 圣奥古斯丁坦桑尼亚大学；E-A23 大学生制图员；E-A24 社区成员；E-A25 红十字志愿者；E-A26 ward 官员与地方政府人员；E-A27 核心制图队（20 名制图员 + 2 名督导）

**Context 情境（6）**：E-X01 达累斯萨拉姆年度洪涝风险；E-X02 非正规与未规划住区；E-X03 基础地图老化与数据稀缺；E-X04 坦桑尼亚城市韧性计划（TURP）；E-X05 2011 年洪水记忆；E-X06 ward/subward 行政结构

**Task 任务（7）**：E-T01 提升社区洪涝韧性；E-T02 为洪泛 ward 建立高精度地图；E-T03 生产可公开使用的城市地理数据；E-T04 开展洪水风险分析与建模；E-T05 培训大学生与社区成员；E-T06 支持 ward 灾害管理计划；E-T07 移交与机构化

**Technology 技术（14）**：E-H01 OpenStreetMap；E-H02 JOSM；E-H03 QGIS；E-H04 InaSAFE；E-H05 Field Papers；E-H06 GPS 设备（eTrex 30）；E-H07 OSM Tracker；E-H08 ODK Collect；E-H09 SenseFly eBee 无人机；E-H10 MapGive 卫星影像；E-H11 街景 bajaj；E-H12 u-blox 双频接收机；E-H13 排水数据模型；E-H14 描图纸与铅笔

**Capability 能力（11）**：E-C01 高分辨率影像获取能力；E-C02 GPS 轨迹与航点记录能力；E-C03 移动端结构化数据采集能力；E-C04 OSM 编辑与开放发布能力；E-C05 灾害情景分析能力；E-C06 排水网络拓扑建模能力；E-C07 1D—2D 水动力模拟能力；E-C08 地方知识转译为空间数据的能力；E-C09 大学—社区联合外业组织能力；E-C10 数据质量核验能力；E-C11 低成本控制点采集能力

**Action 行动（15）**：E-P01 2011 年 Ramani Tandale 试点；E-P02 COSTECH 启动工作坊；E-P03 三 ward 试点；E-P04 扩展期学生培训；E-P05 社区论坛；E-P06 外业制图；E-P07 数字化与 OSM 上传；E-P08 排水制图；E-P09 图集编制；E-P10 2.0 启动；E-P11 排水重测；E-P12 228 subward 资产—威胁制图；E-P13 移交 RA；E-P14 2020 年洪水数据采集；E-P15 Mwanza 扩展

**Target 作用对象（16）**：E-G01 21 个社区流程 ward；E-G02 65 个地图改善 ward；E-G03 8 个市中心 ward；E-G04 36 个排水制图 ward；E-G05 228 个 subward；E-G06 建筑物；E-G07 道路；E-G08 排水沟与水系；E-G09 洪泛区与淹没范围；E-G10 社区参与者；E-G11 受训学生；E-G12 图集与印刷地图；E-G13 OSM 数据集；E-G14 洪水数据点；E-G15 行动地图与报告；E-G16 垃圾点

**Outcome 结果（9）**：E-O01 洪水韧性图集发布；E-O02 社区洪泛范围进入 OSM；E-O03 532 段排水数据与模型改进；E-O04 10 支社区防灾队；E-O05 受训制图员队伍；E-O06 RA 承接项目能力；E-O07 OMDTZ 成立；E-O08 Mwanza 方法复制；E-O09 数据被应急机构使用

## 3. 原子事实

| 编号 | 事实 | 主体/对象 | 证据 | 状态 | 时间/空间/数量 |
|---|---|---|---|---|---|
| F001 | 2011 年，HOT 与 Tandale 社区成员、学生在 Tandale ward 开展 Ramani Tandale 社区制图试点。 | HOT（人道主义 OpenStreetMap 团队）(actor)；社区成员(actor)；大学生制图员(actor)；2011 年 Ramani Tandale 试点(action) | M01-E06, M14-E02 | implemented | 2011 / Tandale ward |
| F002 | 达累斯萨拉姆每年雨季洪水冲毁道路、房屋并危及生命与基础设施。 | 达累斯萨拉姆年度洪涝风险(context)；道路(target)；建筑物(target) | M01-E02 | implemented | annual / Dar es Salaam |
| F003 | Ramani Huria 以提升达累斯萨拉姆社区洪涝韧性为总体任务。 | HOT（人道主义 OpenStreetMap 团队）(actor)；提升社区洪涝韧性(task) | M01-E01, M02-E01 | implemented | 2015-2021 / Dar es Salaam |
| F004 | 项目属于 DFID 与世界银行共建的坦桑尼亚城市韧性计划（TURP）。 | 坦桑尼亚城市韧性计划（TURP）(context)；英国国际发展部（DFID）(actor)；世界银行(actor) | M02-E02 | implemented | 2015-2021 / Tanzania |
| F005 | 世界银行、GFDRR 与红十字会为项目提供支持。 | 世界银行(actor)；全球减灾与恢复基金（GFDRR）(actor)；红十字会（坦桑尼亚/美国/丹麦）(actor) | M01-E05 | implemented | 2015-2016 / Dar es Salaam |
| F006 | HOT 负责项目实施指导，并以 OpenStreetMap 培训本地大学生与社区成员。 | HOT（人道主义 OpenStreetMap 团队）(actor)；为洪泛 ward 建立高精度地图(task)；OpenStreetMap(technology) | M02-E03, M02-E01 | implemented | 2015-2021 / Dar es Salaam |
| F007 | 2015-03-26/27，项目在 COSTECH 举办启动工作坊。 | COSTECH 启动工作坊(action)；坦桑尼亚科学技术委员会（COSTECH）(actor)；HOT（人道主义 OpenStreetMap 团队）(actor) | M01-E13 | implemented | 2015-03-26/27 / COSTECH, Dar es Salaam |
| F008 | 试点期招募约 15 名 Ardhi 大学城市规划专业学生为实习生。 | Ardhi 大学(actor)；大学生制图员(target)；培训大学生与社区成员(task) | M01-E15 | implemented | 2015-03/06 / Ardhi University / 约 15 人 |
| F009 | 试点在 Ndugumbi、Tandale、Mchikichini 三个 ward 展开。 | 三 ward 试点(action)；21 个社区流程 ward(target)；ward/subward 行政结构(context) | M01-E14 | implemented | 2015-03/06 / 3 wards / 3 wards |
| F010 | 15 名 Ardhi 学生督导在带训前接受了约三个月指导。 | Ardhi 大学(actor)；大学生制图员(actor)；培训大学生与社区成员(task) | M04-E02 | implemented | 2015-04/07 / Ardhi University / 15 名督导；3 个月 |
| F011 | 2015-07-06，项目在 UDSM 举办扩展工作坊，随后签约 150 名学生。 | 扩展期学生培训(action)；达累斯萨拉姆大学（UDSM）(actor)；大学生制图员(target) | M04-E01 | implemented | 2015-07-06 / UDSM / 150 名学生 |
| F012 | 新学生接受三天培训：前两天理论、第三天在 UDSM 校园实地操作。 | 扩展期学生培训(action)；大学生制图员(target)；Ardhi 大学(actor) | M04-E02, M04-E03 | implemented | 2015-07 / UDSM / 3 天 |
| F013 | 培训覆盖 OSM、Field Papers、GPS eTrex 30、OSM Tracker 与 JOSM。 | 扩展期学生培训(action)；OpenStreetMap(technology)；Field Papers(technology)；GPS 设备（eTrex 30）(technology)；OSM Tracker(technology)；JOSM(technology) | M04-E04 | implemented | 2015-07 / UDSM |
| F014 | 2015 年 7—8 月，项目以完整社区流程完成 14 个 ward 制图，最多 6 个并行。 | 外业制图(action)；21 个社区流程 ward(target) | M01-E17 | implemented | 2015-07/08 / Dar es Salaam / 14 wards；最多 6 并行 |
| F015 | 2015 年 9 月初，项目配合非洲开放数据会议完成市中心 8 个 ward 制图。 | 外业制图(action)；8 个市中心 ward(target) | M01-E18 | implemented | 2015-09 / Downtown Dar es Salaam / 8 wards |
| F016 | 2015-10-09，扩展期在 Manzese、Mzimuni、Kigogo、Vingunguti 的结项社区论坛结束。 | 社区论坛(action)；社区成员(actor)；ward 官员与地方政府人员(actor) | M01-E19 | implemented | 2015-10-09 / 4 wards / 4 forums |
| F017 | 2015-07-28 的博客列出首批 6 个 ward：Mabibo、Mburahati、Makurumla、Makumbusho、Msasani、Keko。 | 21 个社区流程 ward(target)；达累斯萨拉姆年度洪涝风险(context) | M04-E05 | implemented | 2015-07 / 6 wards / 6 wards（17 个洪泛 ward 中选出） |
| F018 | 2015-09-11，项目在 Vingunguti 举办社区论坛启动制图，ward 官员与 8 个 subward 的社区成员参加。 | 社区论坛(action)；ward 官员与地方政府人员(actor)；社区成员(actor)；21 个社区流程 ward(target) | M06-E02 | implemented | 2015-09-11 / Vingunguti ward / 8 subwards |
| F019 | 红十字会志愿者分两组、每组 10 人，于 9/14—9/18 与 9/21—9/25 参与 Vingunguti 外业。 | 红十字志愿者(actor)；外业制图(action) | M06-E03 | implemented | 2015-09 / Vingunguti ward / 2 组 × 10 人 |
| F020 | Vingunguti 外业遭遇断电与 ward 办公室场地变动，部分活动转移到 Kombo 小学。 | 外业制图(action)；红十字志愿者(actor) | M06-E04 | implemented | 2015-09 / Vingunguti ward |
| F021 | 团队在两周内完成 Vingunguti 全 ward 制图，并于 2015-10-09 举行结项论坛、交付地图与证书。 | 外业制图(action)；社区论坛(action)；21 个社区流程 ward(target)；图集与印刷地图(target) | M06-E05 | implemented | 2015-09/10 / Vingunguti ward / 2 周 |
| F022 | Vingunguti 位于 Ilala 区，2012 年人口 106,946，属洪泛区。 | 21 个社区流程 ward(target)；非正规与未规划住区(context)；达累斯萨拉姆年度洪涝风险(context) | M06-E01 | implemented | 2012 / Vingunguti ward / 106,946 人 |
| F023 | 扩展期结束后，制图队缩减为 20 名制图员加 2 名督导。 | 核心制图队（20 名制图员 + 2 名督导）(actor) | M01-E20 | implemented | 2015-10 / Dar es Salaam / 20+2 |
| F024 | 收缩期新增 Ubungo、Tabata、Ilala、Temeke 四个社区流程 ward，使社区制图 ward 达 21 个。 | 外业制图(action)；21 个社区流程 ward(target) | M01-E21 | implemented | 2015-10/2016-02 / 4 wards / 累计 21 wards |
| F025 | 市中心 8 个 ward 完成全面实地测绘，使全面测绘 ward 累计 29 个。 | 8 个市中心 ward(target)；65 个地图改善 ward(target)；外业制图(action) | M01-E22 | implemented | 2015-10/2016-02 / Downtown / 8 wards；累计 29 |
| F026 | 另有 36 个外围 ward 完成排水与水系制图，使地图改善 ward 总数达 65 个。 | 排水制图(action)；36 个排水制图 ward(target)；65 个地图改善 ward(target) | M01-E23 | implemented | 2015-10/2016-02 / 36 wards / 36；累计 65 |
| F027 | 2015-03 至 2016-02，达累斯萨拉姆 65 个 ward 完成制图。 | 外业制图(action)；65 个地图改善 ward(target) | M01-E24 | implemented | 2015-03/2016-02 / Dar es Salaam / 65 wards |
| F028 | 21 个社区制图 ward 由市议会与红十字会共同确定。 | 市辖区议会（Ilala/Kinondoni/Temeke）(actor)；红十字会（坦桑尼亚/美国/丹麦）(actor)；21 个社区流程 ward(target) | M01-E27 | implemented | 2015 / Dar es Salaam / 21 wards |
| F029 | 社区制图的第一步是取得市议会书面许可。 | 市辖区议会（Ilala/Kinondoni/Temeke）(actor)；为洪泛 ward 建立高精度地图(task)；社区论坛(action) | M01-E29 | implemented | 2015-2016 / Dar es Salaam |
| F030 | 单个 ward 排水与水系完整制图平均约需三天（两天采集、一天核验与数字化），可四个 ward 并行。 | 排水制图(action)；排水网络拓扑建模能力(capability)；核心制图队（20 名制图员 + 2 名督导）(actor) | M01-E41, M01-E43 | implemented | 2015-2016 / Dar es Salaam / 3 天/ward；4 并行 |
| F031 | 项目使用 COSTECH 提供的 SenseFly eBee 无人机，影像分辨率约 3—5 厘米/像素。 | SenseFly eBee 无人机(technology)；坦桑尼亚科学技术委员会（COSTECH）(actor)；高分辨率影像获取能力(capability) | M01-E31, M01-E32, M01-E33 | implemented | 2015-2016 / Dar es Salaam / 3—5 cm/px |
| F032 | 在无人机未覆盖区域，HOT 通过 MapGive 获取近期卫星影像。 | MapGive 卫星影像(technology)；HOT（人道主义 OpenStreetMap 团队）(actor) | M01-E34 | implemented | 2015-2016 / Dar es Salaam |
| F033 | 社区成员既提供建筑、街名、边界与洪泛区的地方知识，也承担社区内的意识提升。 | 社区成员(actor)；地方知识转译为空间数据的能力(capability) | M01-E28 | implemented | 2015-2016 / 21 wards |
| F034 | 图集洪泛范围来自社区对常年洪水与 2011 年大水的记忆与勾绘。 | 洪泛区与淹没范围(target)；2011 年洪水记忆(context)；地方知识转译为空间数据的能力(capability) | M01-E38 | implemented | 2015-2016 / 21 wards |
| F035 | 社区报告洪泛区淹水深度为 0.5—5 米。 | 洪泛区与淹没范围(target)；社区成员(actor) | M01-E39 | reported_or_opinion | 2015-2016 / 21 wards / 0.5—5 m |
| F036 | 社区知晓洪泛风险，但因经济约束、通勤与亲属关系选择留在原地。 | 社区成员(actor)；非正规与未规划住区(context) | M01-E40 | reported_or_opinion | 2015-2016 / 21 wards |
| F037 | 2016-03，项目发布《The Atlas of Flood Resilience in Dar es Salaam》。 | 图集编制(action)；洪水韧性图集发布(outcome)；图集与印刷地图(target) | M01-E24, M01-E03 | implemented | 2016-03 / Dar es Salaam / 126 页 |
| F038 | 图集地图与 InaSAFE 结合，用于运行自然灾害情景以支持规划与响应。 | 图集编制(action)；InaSAFE(technology)；灾害情景分析能力(capability) | M01-E03 | implemented | 2016 / Dar es Salaam |
| F039 | 项目计划将地图在线公开、提供下载，并以印刷形式交付各 ward 基层政府。 | 图集与印刷地图(target)；生产可公开使用的城市地理数据(task)；市辖区议会（Ilala/Kinondoni/Temeke）(actor) | M01-E04 | planned | 2016 / Dar es Salaam |
| F040 | HOT 项目记录将本项目周期记为 2015-04-01 至 2016-12-31，状态为完成。 | HOT（人道主义 OpenStreetMap 团队）(actor)；洪水韧性图集发布(outcome) | M14-E01 | implemented | 2015-04-01/2016-12-31 / Dar es Salaam |
| F041 | 项目官网自报 29 个 ward、1254 公里水道与 3396 公里道路。 | 65 个地图改善 ward(target)；洪水韧性图集发布(outcome) | M03-E01, M03-E02 | reported_or_opinion | 2016-2020 / Dar es Salaam / 29 wards；1254 km；3396 km |
| F042 | 项目官网自报培训 450 名制图员。 | 受训制图员队伍(outcome)；大学生制图员(target) | M03-E03 | reported_or_opinion | 2016-2020 / Dar es Salaam / 450 |
| F043 | 项目官网自报在 10 个洪泛社区建立了社区防灾队。 | 10 支社区防灾队(outcome)；社区成员(target) | M03-E04 | reported_or_opinion | 2016-2020 / 10 communities / 10 |
| F044 | 2017-09-26，Ramani Huria 2.0 在 Julius Nyerere 国际会议中心启动。 | 2.0 启动(action)；Ardhi 大学(actor)；世界银行(actor) | M07-E01 | implemented | 2017-09-26 / Dar es Salaam |
| F045 | 1.0 已为 21 个 ward、约 130 万居民制作地图。 | 洪水韧性图集发布(outcome)；21 个社区流程 ward(target) | M07-E02 | implemented | 2017-09 / 21 wards / 1.3 million |
| F046 | 2.0 预计覆盖 300 万以上居民。 | 提升社区洪涝韧性(task)；社区参与者(target) | M07-E03 | planned | 2017 / Dar es Salaam / 3 million+ |
| F047 | 项目方称至 2017 年已向 400 余名学生转移灾害风险管理知识。 | 受训制图员队伍(outcome)；大学生制图员(target) | M07-E04 | reported_or_opinion | 2017 / Dar es Salaam / 400+ |
| F048 | Ardhi 大学、世界银行与 DFID 于 2017-09-26 签署合作 MoU。 | Ardhi 大学(actor)；世界银行(actor)；英国国际发展部（DFID）(actor) | M07-E05 | implemented | 2017-09-26 / Dar es Salaam |
| F049 | 2.0 自 2017 年开始，把暴露数据与洪水危险数据结合进行风险分析。 | 开展洪水风险分析与建模(task)；灾害情景分析能力(capability) | M14-E03 | implemented | 2017 / Dar es Salaam |
| F050 | 2.0 对所有排水进行重测，采用详细排水数据模型并关注连通性。 | 排水重测(action)；排水数据模型(technology)；排水网络拓扑建模能力(capability) | M08-E01 | implemented | 2017-2019 / Dar es Salaam |
| F051 | 2018-06 前，前 20 个 ward 已完成排水重测。 | 排水重测(action)；排水沟与水系(target) | M08-E02 | implemented | 2018-06 / 20 wards / 20 wards |
| F052 | 2017—2019 年，Ramani Huria 把制图扩展到 44 个 ward。 | 排水重测(action)；65 个地图改善 ward(target) | M16-E02 | implemented | 2017-2019 / Dar es Salaam / 44 wards |
| F053 | 2018 年暑期，450 余名学生在 7 周内完成 228 个 subward 制图。 | 228 subward 资产—威胁制图(action)；大学生制图员(actor)；228 个 subward(target) | M09-E01, M09-E02 | implemented | 2018-07/09 / 228 subwards / 450+；7 周 |
| F054 | 学生用 ODK 在 44 个 ward 采集 20,392 个垃圾点。 | 228 subward 资产—威胁制图(action)；ODK Collect(technology)；垃圾点(target) | M09-E04, M09-E05 | implemented | 2018 / 44 wards / 20,392 |
| F055 | 每个 subward 的社区会议约 11 人参加，学生分三组用印刷地图与描图纸识别资产与威胁。 | 社区论坛(action)；社区成员(actor)；描图纸与铅笔(technology) | M09-E06 | implemented | 2018 / 228 subwards / 约 11 人/场；3 组 |
| F056 | 每个 subward 产出报告与行动地图两类成果。 | 行动地图与报告(target)；228 subward 资产—威胁制图(action) | M09-E07 | implemented | 2018 / 228 subwards / 2 类/ subward |
| F057 | 报告与地图计划交由 Deltares 与 ward 领导共同制定灾害管理计划。 | Deltares(actor)；支持 ward 灾害管理计划(task)；行动地图与报告(target) | M09-E08 | planned | 2018-2019 / 228 subwards |
| F058 | Kijitonyama 研究使用 532 段排水数据；12 段有定位错误（2.25%），36 段断连（6.8%）。 | 排水沟与水系(target)；数据质量核验能力(capability)；排水重测(action) | M16-E05, M16-E06 | implemented | 2019 / Kijitonyama ward / 532 段 |
| F059 | 2019-07-29，Ramani Huria 暑期产业培训项目从 HOT 移交大学联盟管理。 | 移交 RA(action)；HOT（人道主义 OpenStreetMap 团队）(actor)；坦桑尼亚韧性学院（RA）(actor) | M10-E01 | implemented | 2019-07-29 / Dar es Salaam |
| F060 | RA 由 UDSM、Ardhi、SUZA 共同管理，并与芬兰 Turku 大学合作。 | 坦桑尼亚韧性学院（RA）(actor)；达累斯萨拉姆大学（UDSM）(actor)；Ardhi 大学(actor)；桑给巴尔国立大学（SUZA）(actor)；芬兰图尔库大学(actor) | M10-E02 | implemented | 2019 / Tanzania |
| F061 | Ramani Huria 第二阶段于 2019 年结束。 | 移交与机构化(task)；坦桑尼亚城市韧性计划（TURP）(context) | M10-E05 | implemented | 2019 / Dar es Salaam |
| F062 | OMDTZ 在 Ramani Huria 影响下成立并承接项目能力。 | OpenMap Development Tanzania（OMDTZ）(actor)；OMDTZ 成立(outcome) | M10-E07 | reported_or_opinion | 2019 / Tanzania |
| F063 | 项目方称数据已被红十字会与 DarMAERT 等应急响应机构使用。 | 红十字会（坦桑尼亚/美国/丹麦）(actor)；达累斯萨拉姆多机构应急响应队（DarMAERT）(actor)；数据被应急机构使用(outcome) | M10-E06 | reported_or_opinion | 2019 / Dar es Salaam |
| F064 | 项目方称 2015 年以来培训 800 余名学生、与 6000 余名社区成员合作。 | 受训制图员队伍(outcome)；社区成员(target) | M10-E03 | reported_or_opinion | 2015-2019 / Dar es Salaam / 800+；6000+ |
| F065 | 同一篇文字又称参与项目的学生超过 1000 名、社区成员约 300 名。 | 受训制图员队伍(outcome)；社区成员(target) | M10-E04 | reported_or_opinion | 2015-2019 / Dar es Salaam / 1000+；300 |
| F066 | 2020-09 至 11 月，项目与 RA 合作培训三所大学 200 名学生。 | 2020 年洪水数据采集(action)；大学生制图员(target)；坦桑尼亚韧性学院（RA）(actor) | M11-E01 | implemented | 2020-09/11 / Dar es Salaam / 200 名学生 |
| F067 | 学生在 20 个 ward 与社区成员采集洪水范围与水深数据。 | 2020 年洪水数据采集(action)；洪水数据点(target)；社区成员(actor) | M11-E02 | implemented | 2020 / 20 wards / 20 wards |
| F068 | 两个月内采集超过 10,000 个洪水数据点。 | 洪水数据点(target)；2020 年洪水数据采集(action) | M11-E03 | implemented | 2020 / 20 wards / 10,000+ |
| F069 | 团队使用低成本 u-blox 双频接收机，以 PPP 技术采集控制点。 | u-blox 双频接收机(technology)；低成本控制点采集能力(capability) | M11-E04 | implemented | 2020 / Dar es Salaam |
| F070 | Spatial Collective、HOT 与 OMDTZ 用五个月把社区制图扩展到 Mwanza。 | Mwanza 扩展(action)；Spatial Collective(actor)；HOT（人道主义 OpenStreetMap 团队）(actor)；OpenMap Development Tanzania（OMDTZ）(actor) | M12-E01 | implemented | 2020-10/2021-01 / Mwanza / 5 个月 |
| F071 | 项目与 IRDP、St. Augustine 大学 79 名学生合作。 | Mwanza 扩展(action)；大学生制图员(target)；农村发展规划研究所（IRDP）(actor)；圣奥古斯丁坦桑尼亚大学(actor) | M12-E02 | implemented | 2020-2021 / Mwanza / 79 名学生 |
| F072 | Mwanza 采集 1.5 万个以上洪泛点与 1700 段排水（145 公里）。 | 洪泛区与淹没范围(target)；排水沟与水系(target)；Mwanza 扩展(action) | M12-E03 | implemented | 2020-2021 / Mwanza / 15,000+；1700 段；145 km |
| F073 | Mwanza 社区误以为制图会导致拆迁，团队需反复解释项目目标。 | 社区成员(actor)；Mwanza 扩展(action) | M12-E04 | implemented | 2020-2021 / Mwanza |
| F074 | Kijitonyama 模型验证使用 44 个观测点，对照社区记录的洪水水深。 | 1D—2D 水动力模拟能力(capability)；洪水数据点(target)；数据质量核验能力(capability) | M16-E07 | implemented | 2019 / Kijitonyama ward / 44 点 |
| F075 | 耦合社区排水数据的 1D—2D 模型比仅地形数据的 2D 模型更接近居民报告的淹水深度。 | 1D—2D 水动力模拟能力(capability)；532 段排水数据与模型改进(outcome) | M16-E08 | implemented | 2019-2020 / Kijitonyama ward |
| F076 | 排水系统尺寸等技术性属性仍需要受训制图员才能达到足够质量。 | 数据质量核验能力(capability)；大学生制图员(actor) | M16-E09 | reported_or_opinion | 2020 / Dar es Salaam |
| F077 | TU Delft 硕士论文使用 Ramani Huria 采集的排水数据构建 Kijitonyama 洪水模型。 | 1D—2D 水动力模拟能力(capability)；532 段排水数据与模型改进(outcome)；排水重测(action) | M17-E01 | implemented | 2019 / Kijitonyama ward |
| F078 | 该论文结论称社区制图排水数据能够提升水动力模型表现。 | 532 段排水数据与模型改进(outcome)；1D—2D 水动力模拟能力(capability) | M17-E02 | reported_or_opinion | 2019 / Kijitonyama ward |

## 4. 状态与限定说明

- 社区洪泛范围与水深（F036、F037）标为 `reported_or_opinion`，因其为社区记忆与感知，不是水文观测。
- 项目自报规模（F042–F044、F048、F065、F066）标为 `reported_or_opinion`，不写成已核实的实施结果。
- 2.0 覆盖 300 万居民（F047）与印刷交付（F040）为 `planned`，不写成已实现。
- M16/M17 的模型结论（F076、F079）分别标 `implemented`（论文验证结果）与 `reported_or_opinion`（学位论文摘要结论）。
- 同一实体在不同事实中承担不同角色：社区成员（E-A24）在 F019/F056 为 actor，在 F044/F065 为 target；学生（E-A23）在 F010 为 actor，在 F008/F012 为 target。
