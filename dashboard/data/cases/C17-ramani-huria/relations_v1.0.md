# C17 Ramani Huria 关系表（确认版 v1.0）

> 状态：**研究者已于 2026-11-13 裁定“同意全部处理”**；关系集合冻结，可进入 case pack 与 L2 交接。
> 生成时间：2026-11-13
> 处理记录：删除 R105；修改 R045/R046/R047/R101/R102/R103/R104 的谓词与限定；补充 R107；其余 97 条接受。
> 说明：基础关系表不写未经证实的因果判断；`processIds` 由证据与过程段落关联生成。

## 1. 汇总

| 项 | 数量 |
|---|---|
| 关系 | 106 |
| implemented | 100 |
| reported_or_opinion | 4 |
| planned | 2 |

## 2. 关系明细

### C17-P01 前史：2011 年 Ramani Tandale 试点与社区制图方法来源

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R001 | 达累斯萨拉姆年度洪涝风险（context） | 影响 | 建筑物（target） | implemented | 每年雨季；Dar es Salaam | M01-E02 |
| R002 | 达累斯萨拉姆年度洪涝风险（context） | 影响 | 道路（target） | implemented | 每年雨季；Dar es Salaam | M01-E02 |
### C17-P02 启动与伙伴集结：COSTECH 工作坊与资助—实施结构

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R003 | 世界银行（actor） | 共建 | 坦桑尼亚城市韧性计划（TURP）（context） | implemented | 2015-2021 | M02-E02 |
| R004 | 英国国际发展部（DFID）（actor） | 共建 | 坦桑尼亚城市韧性计划（TURP）（context） | implemented | 2015-2021 | M02-E02 |
| R005 | 世界银行（actor） | 支持 | HOT（人道主义 OpenStreetMap 团队）（actor） | implemented | 2015-2016 | M01-E05, M15-E04 |
| R006 | 全球减灾与恢复基金（GFDRR）（actor） | 支持 | HOT（人道主义 OpenStreetMap 团队）（actor） | implemented | 2015-2016 | M01-E05 |
| R007 | 红十字会（坦桑尼亚/美国/丹麦）（actor） | 支持 | HOT（人道主义 OpenStreetMap 团队）（actor） | implemented | 2015-2016 | M01-E05, M01-E12 |
| R008 | HOT（人道主义 OpenStreetMap 团队）（actor） | 指导实施 | 为洪泛 ward 建立高精度地图（task） | implemented | 2015-2021 | M02-E03 |
| R009 | 坦桑尼亚科学技术委员会（COSTECH）（actor） | 承办 | COSTECH 启动工作坊（action） | implemented | 2015-03-26/27 | M01-E13 |
| R010 | HOT（人道主义 OpenStreetMap 团队）（actor） | 召集 | COSTECH 启动工作坊（action） | implemented | 2015-03-26/27 | M01-E13 |
### C17-P06 收缩、质量提升与排水系统扩展：21/29/65 的口径形成

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R011 | 市辖区议会（Ilala/Kinondoni/Temeke）（actor） | 签发许可 | 为洪泛 ward 建立高精度地图（task） | implemented | 2015-2016 | M01-E29 |
| R012 | 市辖区议会（Ilala/Kinondoni/Temeke）（actor） | 共同确定 | 21 个社区流程 ward（target） | implemented | 2015 | M01-E27 |
| R013 | 红十字会（坦桑尼亚/美国/丹麦）（actor） | 共同确定 | 21 个社区流程 ward（target） | implemented | 2015 | M01-E27 |
### C17-P01 前史：2011 年 Ramani Tandale 试点与社区制图方法来源

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R014 | HOT（人道主义 OpenStreetMap 团队）（actor） | 开展 | 2011 年 Ramani Tandale 试点（action） | implemented | 2011 | M01-E06, M14-E02 |
| R015 | 社区成员（actor） | 参与 | 2011 年 Ramani Tandale 试点（action） | implemented | 2011 | M01-E06 |
| R016 | 大学生制图员（actor） | 参与 | 2011 年 Ramani Tandale 试点（action） | implemented | 2011 | M01-E06 |
| R017 | 2011 年 Ramani Tandale 试点（action） | 先于 | COSTECH 启动工作坊（action） | implemented | 2011 → 2015 | M01-E06 |
### C17-P03 三 ward 试点：招募学生、打磨社区制图流程

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R018 | Ardhi 大学（actor） | 招募 | 大学生制图员（actor） | implemented | 2015-03/06；约 15 人 | M01-E15 |
| R019 | 大学生制图员（actor） | 实施 | 三 ward 试点（action） | implemented | 2015-03/06 | M01-E14 |
| R020 | 三 ward 试点（action） | 覆盖 | 21 个社区流程 ward（target） | implemented | 2015-03/06；3 wards | M01-E14 |
| R021 | Ardhi 大学（actor） | 培训 | 大学生制图员（actor） | implemented | 2015；15 名督导；3 个月 | M04-E02 |
### C17-P04 大规模扩展：150 名学生、14+8 个 ward 与结项论坛

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R022 | HOT（人道主义 OpenStreetMap 团队）（actor） | 组织 | 扩展期学生培训（action） | implemented | 2015-07 | M04-E01 |
| R023 | 达累斯萨拉姆大学（UDSM）（actor） | 提供场地 | 扩展期学生培训（action） | implemented | 2015-07 | M04-E01, M04-E03 |
| R024 | 扩展期学生培训（action） | 培训 | 大学生制图员（actor） | implemented | 2015-07；150 人；3 天 | M04-E01, M04-E02, M04-E03 |
| R025 | 扩展期学生培训（action） | 使用 | OpenStreetMap（technology） | implemented | 2015-07 | M04-E04 |
| R026 | 扩展期学生培训（action） | 使用 | Field Papers（technology） | implemented | 2015-07 | M04-E04 |
| R027 | 扩展期学生培训（action） | 使用 | GPS 设备（eTrex 30）（technology） | implemented | 2015-07 | M04-E04 |
| R028 | 扩展期学生培训（action） | 使用 | OSM Tracker（technology） | implemented | 2015-07 | M04-E04 |
| R029 | 扩展期学生培训（action） | 使用 | JOSM（technology） | implemented | 2015-07 | M04-E04 |
| R030 | 外业制图（action） | 制图 | 21 个社区流程 ward（target） | implemented | 2015-07/2016-02 | M01-E17, M01-E21 |
### C17-P06 收缩、质量提升与排水系统扩展：21/29/65 的口径形成

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R031 | 外业制图（action） | 产出 | 洪泛区与淹没范围（target） | implemented | 2015-2016 | M01-E38 |
### C17-P05 社区参与的组织现场：Vingunguti 论坛、红十字分组与两周外业

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R032 | 社区成员（actor） | 参与 | 外业制图（action） | implemented | 2015-2016 | M01-E28, M06-E02 |
| R033 | 红十字志愿者（actor） | 参与 | 外业制图（action） | implemented | 2015-09 | M06-E03 |
| R034 | 社区论坛（action） | 召集 | 社区成员（actor） | implemented | 2015-09-11 | M06-E02 |
| R035 | 社区论坛（action） | 交付 | 图集与印刷地图（target） | implemented | 2015-10-09 | M06-E05 |
| R036 | ward 官员与地方政府人员（actor） | 组织 | 社区论坛（action） | implemented | 2015-09-11 | M06-E02 |
### C17-P06 收缩、质量提升与排水系统扩展：21/29/65 的口径形成

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R037 | 市辖区议会（Ilala/Kinondoni/Temeke）（actor） | 授权 | 外业制图（action） | implemented | 2015-2016 | M01-E29 |
| R038 | 核心制图队（20 名制图员 + 2 名督导）（actor） | 执行 | 外业制图（action） | implemented | 2015-10/2016-02 | M01-E20 |
| R039 | 核心制图队（20 名制图员 + 2 名督导）（actor） | 执行 | 排水制图（action） | implemented | 2015-10/2016-02 | M01-E20, M01-E41 |
| R040 | 排水制图（action） | 制图 | 排水沟与水系（target） | implemented | 2015-10/2016-02；1254 km 水道（自报） | M01-E23, M03-E02 |
| R041 | 排水制图（action） | 覆盖 | 36 个排水制图 ward（target） | implemented | 2015-10/2016-02；36 wards | M01-E23 |
| R042 | 外业制图（action） | 覆盖 | 65 个地图改善 ward（target） | implemented | 2015-03/2016-02；65 wards | M01-E24 |
| R043 | 坦桑尼亚科学技术委员会（COSTECH）（actor） | 提供 | SenseFly eBee 无人机（technology） | implemented | 2015-2016 | M01-E33 |
| R044 | SenseFly eBee 无人机（technology） | 具备 | 高分辨率影像获取能力（capability） | implemented | 3—5 cm/px | M01-E31, M01-E32 |
| R045 | 高分辨率影像获取能力（capability） | 提升 | 排水制图（action） | implemented | 高分辨率影像获取能力提升排水制图的影像判读精度 | M01-E31, M01-E32 |
| R046 | MapGive 卫星影像（technology） | 补充 | 外业制图（action） | implemented | MapGive 卫星影像补充无人机未覆盖区域的外业底图 | M01-E34 |
### C17-P05 社区参与的组织现场：Vingunguti 论坛、红十字分组与两周外业

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R047 | 描图纸与铅笔（technology） | 辅助 | 社区论坛（action） | implemented | 描图纸与铅笔辅助社区勾绘洪泛范围 | M01-E37, M13-E01 |
### C17-P06 收缩、质量提升与排水系统扩展：21/29/65 的口径形成

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R048 | 社区成员（actor） | 运用 | 地方知识转译为空间数据的能力（capability） | implemented | 2015-2016 | M01-E28, M01-E38 |
| R049 | 地方知识转译为空间数据的能力（capability） | 生成 | 洪泛区与淹没范围（target） | implemented | 2015-2016 | M01-E38 |
| R050 | 数字化与 OSM 上传（action） | 产出 | OSM 数据集（target） | implemented | 2015-2016 | M01-E30, M02-E01 |
| R051 | 外业制图（action） | 上传 | OSM 数据集（target） | implemented | 2015-2016 | M01-E30 |
| R052 | 图集编制（action） | 编制 | 图集与印刷地图（target） | implemented | 2016-03；126 页 | M01-E24, M01-E03 |
| R053 | 图集编制（action） | 产出 | 洪水韧性图集发布（outcome） | implemented | 2016-03 | M01-E24, M01-E03 |
| R054 | 世界银行（actor） | 发布 | 洪水韧性图集发布（outcome） | implemented | 2016-03 | M01-E24 |
### C17-P07 图集发布与 1.0 收束：从数据到公共产品

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R055 | HOT（人道主义 OpenStreetMap 团队）（actor） | 管理 | 图集编制（action） | implemented | 2016 | M01-E03 |
| R056 | InaSAFE（technology） | 具备 | 灾害情景分析能力（capability） | implemented | 2016 | M01-E03, M13-E02 |
| R057 | 图集编制（action） | 使用 | InaSAFE（technology） | implemented | 2016 | M01-E03 |
| R058 | 社区成员（actor） | 收到 | 图集与印刷地图（target） | implemented | 2016；印刷地图 | M01-E04, M06-E05 |
| R059 | HOT（人道主义 OpenStreetMap 团队）（actor） | 建立 | 10 支社区防灾队（outcome） | reported_or_opinion | 2016-2020；10 支 | M03-E04 |
### C17-P08 Ramani Huria 2.0 启动：从制图转向风险分析

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R060 | Ardhi 大学（actor） | 承办 | 2.0 启动（action） | implemented | 2017-09-26 | M07-E01 |
| R061 | Ardhi 大学（actor） | 与…签署 MoU | 世界银行（actor） | implemented | 2017-09-26 | M07-E05 |
| R062 | Ardhi 大学（actor） | 与…签署 MoU | 英国国际发展部（DFID）（actor） | implemented | 2017-09-26 | M07-E05 |
| R063 | 2.0 启动（action） | 启动 | 开展洪水风险分析与建模（task） | implemented | 2017-09-26 | M07-E01, M14-E03 |
| R064 | 开展洪水风险分析与建模（task） | 需要 | 灾害情景分析能力（capability） | implemented | 2017-2019 | M14-E03 |
### C17-P09 排水重测与 228 个 subward 的资产—威胁制图

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R065 | HOT（人道主义 OpenStreetMap 团队）（actor） | 组织 | 排水重测（action） | implemented | 2017-2019 | M08-E01 |
| R066 | 排水重测（action） | 使用 | 排水数据模型（technology） | implemented | 2017-2019 | M08-E01, M08-E03 |
| R067 | 排水数据模型（technology） | 具备 | 排水网络拓扑建模能力（capability） | implemented | 2017-2019 | M08-E01, M08-E03 |
| R068 | 排水重测（action） | 覆盖 | 排水沟与水系（target） | implemented | 2017-2019；44 wards | M16-E02, M08-E02 |
| R069 | 排水重测（action） | 覆盖 | 65 个地图改善 ward（target） | implemented | 2017-2019；44 wards | M16-E02 |
| R070 | 228 subward 资产—威胁制图（action） | 培训 | 大学生制图员（actor） | implemented | 2018；450+ 人；7 周 | M09-E02 |
| R071 | 228 subward 资产—威胁制图（action） | 制图 | 228 个 subward（target） | implemented | 2018；228 subwards | M09-E01 |
| R072 | ODK Collect（technology） | 具备 | 移动端结构化数据采集能力（capability） | implemented | 2018 | M09-E04, M11-E02 |
| R073 | 228 subward 资产—威胁制图（action） | 使用 | ODK Collect（technology） | implemented | 2018 | M09-E04 |
| R074 | 228 subward 资产—威胁制图（action） | 采集 | 垃圾点（target） | implemented | 2018；44 wards；20,392 点 | M09-E04, M09-E05 |
| R075 | 社区论坛（action） | 识别 | 洪泛区与淹没范围（target） | implemented | 2018；资产与威胁 | M09-E06 |
| R076 | 228 subward 资产—威胁制图（action） | 产出 | 行动地图与报告（target） | implemented | 2018；228 subwards | M09-E07 |
| R077 | Deltares（actor） | 使用 | 行动地图与报告（target） | planned | 2018-2019 | M09-E08 |
| R078 | Nipe Fagio（actor） | 合作 | 228 subward 资产—威胁制图（action） | implemented | 2018 | M09-E04 |
### C17-P10 移交 Tanzania Resilience Academy 与 2.0 结束

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R079 | HOT（人道主义 OpenStreetMap 团队）（actor） | 移交管理权 | 坦桑尼亚韧性学院（RA）（actor） | implemented | 2019-07-29 | M10-E01 |
| R080 | 坦桑尼亚韧性学院（RA）（actor） | 由…组成 | 达累斯萨拉姆大学（UDSM）（actor） | implemented | 2019 | M10-E02 |
| R081 | 坦桑尼亚韧性学院（RA）（actor） | 由…组成 | Ardhi 大学（actor） | implemented | 2019 | M10-E02 |
| R082 | 坦桑尼亚韧性学院（RA）（actor） | 由…组成 | 桑给巴尔国立大学（SUZA）（actor） | implemented | 2019 | M10-E02 |
| R083 | 芬兰图尔库大学（actor） | 合作 | 坦桑尼亚韧性学院（RA）（actor） | implemented | 2019 | M10-E02 |
| R084 | OpenMap Development Tanzania（OMDTZ）（actor） | 承接自 | HOT（人道主义 OpenStreetMap 团队）（actor） | reported_or_opinion | 2019 | M10-E07 |
| R085 | 红十字会（坦桑尼亚/美国/丹麦）（actor） | 使用 | OSM 数据集（target） | reported_or_opinion | 2019 | M10-E06 |
| R086 | 达累斯萨拉姆多机构应急响应队（DarMAERT）（actor） | 使用 | OSM 数据集（target） | reported_or_opinion | 2019 | M10-E06 |
| R087 | 坦桑尼亚韧性学院（RA）（actor） | 继承 | OSM 数据集（target） | implemented | 2019 | M10-E05 |
### C17-P11 RA 时期的洪水数据采集：20 个 ward 与 10,000+ 数据点

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R088 | 坦桑尼亚韧性学院（RA）（actor） | 组织 | 2020 年洪水数据采集（action） | implemented | 2020-09/11 | M11-E01 |
| R089 | 2020 年洪水数据采集（action） | 培训 | 大学生制图员（actor） | implemented | 2020；200 人 | M11-E01 |
| R090 | 2020 年洪水数据采集（action） | 采集 | 洪水数据点（target） | implemented | 2020；20 wards；10,000+ | M11-E02, M11-E03 |
| R091 | u-blox 双频接收机（technology） | 具备 | 低成本控制点采集能力（capability） | implemented | 2020 | M11-E04 |
| R092 | 2020 年洪水数据采集（action） | 使用 | u-blox 双频接收机（technology） | implemented | 2020 | M11-E04 |
### C17-P12 方法向 Mwanza 扩散：五个月、79 名学生与多灾种数据

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R093 | Spatial Collective（actor） | 牵头 | Mwanza 扩展（action） | implemented | 2020-10/2021-01 | M12-E01 |
| R094 | HOT（人道主义 OpenStreetMap 团队）（actor） | 支持 | Mwanza 扩展（action） | implemented | 2020-2021 | M12-E01 |
| R095 | OpenMap Development Tanzania（OMDTZ）（actor） | 支持 | Mwanza 扩展（action） | implemented | 2020-2021 | M12-E01 |
| R096 | Mwanza 扩展（action） | 培训 | 大学生制图员（actor） | implemented | 2020-2021；79 人 | M12-E02 |
| R097 | Mwanza 扩展（action） | 复制 | 为洪泛 ward 建立高精度地图（task） | implemented | 2020-2021；Mwanza | M12-E01 |
| R098 | Mwanza 扩展（action） | 采集 | 排水沟与水系（target） | implemented | 2020-2021；1700 段；145 km | M12-E03 |
| R099 | Mwanza 扩展（action） | 采集 | 洪泛区与淹没范围（target） | implemented | 2020-2021；15,000+ 点 | M12-E03 |
### C17-P09 排水重测与 228 个 subward 的资产—威胁制图

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R100 | 排水重测（action） | 产出 | 532 段排水数据与模型改进（outcome） | implemented | 2017-2019；532 段 | M16-E05, M16-E06 |
| R101 | 1D—2D 水动力模拟能力（capability） | 支撑 | 532 段排水数据与模型改进（outcome） | implemented | 1D—2D 模拟能力支撑排水数据转化为模型改进 | M16-E08, M17-E01 |
| R102 | 数据质量核验能力（capability） | 保障 | 532 段排水数据与模型改进（outcome） | implemented | 数据质量核验保障排水数据与模型结果的可信度 | M16-E05, M16-E06 |
| R103 | 洪水数据点（target） | 用于验证 | 532 段排水数据与模型改进（outcome） | implemented | 洪水数据点用于验证模型模拟的淹水深度 | M16-E07 |
| R104 | 532 段排水数据与模型改进（outcome） | 作为输入 | 开展洪水风险分析与建模（task） | implemented | 532 段排水数据作为城市洪水建模的输入 | M16-E08, M17-E02 |
### C17-P06 收缩、质量提升与排水系统扩展：21/29/65 的口径形成

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R106 | 外业制图（action） | 使用 | SenseFly eBee 无人机（technology） | implemented | 2015-2016 | M01-E31 |
### C17-P07 图集发布与 1.0 收束：从数据到公共产品

| 编号 | 头实体 | 谓词 | 尾实体 | 状态 | 限定 | 证据 |
|---|---|---|---|---|---|---|
| R107 | 市辖区议会（Ilala/Kinondoni/Temeke）（actor） | 接收 | 图集与印刷地图（target） | planned | 2016；印刷地图交付各 ward 基层政府 | M01-E04 |

## 3. 审校记录

- 删除：R105（与 R024 反向重复）。
- 修改：R045 提升；R046 补充；R047 辅助；R101 支撑；R102 保障；R103 用于验证；R104 作为输入。
- 补充：R107 市辖区议会接收图集与印刷地图（planned）。
- 保留讨论项：R005–R007 的“支持”兼含资助与协作，限定中已注明角色差异。
- 未建：数据维护/更新、市政实际采用、因果效果边（均因证据不足或超出基础关系层）。