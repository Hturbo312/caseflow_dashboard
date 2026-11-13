# C15 春江小区原子事实表（G4 确认版 v1.0）

> 状态：研究者已于 2026-11-13 确认 G4；允许进入 G5。
> 生成时间：2026-11-13
> 说明：每条事实为可独立核验的单项陈述；`entity_roles` 使用 `实体ID:角色`。

| 编号 | 事实陈述 | 实体角色 | 证据 | 状态 | 时间 | 空间 | 数量 | 置信度 |
|---|---|---|---|---|---|---|---|---|
| F001 | 春江小区位于五里桥街道龙华居民区，占地4.2万平方米，383户、1000余人，建于20世纪80年代。 | G01:target, X02:context | M01-E01, M09-E01 | 已实施 | 1980s—2021 | 春江小区 | 4.2万平方米；383户；1000余人 | high |
| F002 | 2021年前春江小区居民高龄、设施陈旧，公共设施、消防通道、违章搭建等问题突出。 | G01:target, X02:context | M01-E02, M05-E01 | 已实施 | 2021年前 | 春江小区 | — | high |
| F003 | 居委通过议题征询表、投票筛选，将拆违后空地改造为活动场所列为居民最迫切议题。 | A04:actor, A01:actor, N01:action, G05:target, K06:task | M01-E03 | 已实施 | 2020—2021-02 | 春江小区 | — | high |
| F004 | 居委以走访和招募令成立春江自治团队，由居民团队牵头项目。 | A04:actor, A02:actor, N02:action, K06:task | M01-E04 | 已实施 | 2020—2021-02 | 春江小区 | — | high |
| F005 | 项目通过自治金申请、企业赞助、社区单位物资和居委牵线设计公司动员资源。 | A02:actor, A04:actor, A29:actor, A30:actor, K06:task | M01-E05 | 已实施 | 2020—2021-02 | 春江小区 | — | high |
| F006 | 居民决定三方合作，自治团队十余人、久禄国际提供资金、迪古里拉涂料负责设计，历时半年完成春江小巷。 | A02:actor, A29:actor, A30:actor, N03:action, O01:outcome, G06:target, K06:task | M01-E06 | 已实施 | 2020—2021-02 | 春江小区 | 十余人；约半年 | high |
| F007 | 春江自治团队设立小巷公约和探头，以解决文明和安全隐患。 | A02:actor, N04:action, T12:technology, O01:outcome, K06:task | M01-E07 | 已实施 | 2021-02前 | 春江小巷 | — | high |
| F008 | 2021-02-25上海首次发布城市最小管理单元数字治理成果，以南京大楼为试点。 | A13:actor, X01:context, T01:technology, K07:task | M03-E01 | 已实施 | 2021-02-25 | 上海 | — | high |
| F009 | 2021-07-07上海举行二期发布会，黄浦区联合华为将试点扩展至景区、商铺、居民小区。 | A13:actor, A14:actor, A15:actor, N05:action, T01:technology, X01:context, K07:task | M02-E01, M03-E02 | 已实施 | 2021-07-07 | 上海/黄浦区 | — | high |
| F010 | 二期发布会公布12个城市智能体创新场景、58家生态伙伴。 | A15:actor, X01:context | M02-E01 | 已实施 | 2021-07-07 | 上海 | 12个场景；58家伙伴 | high |
| F011 | 二期技术架构融合华为云、大数据、AI、边缘计算、5G，建设统一数字治理底座，运用10多类数据，聚合50多家伙伴、20多种方案。 | T01:technology, A15:actor, X01:context | M02-E03, M02-E04, M03-E06 | 已实施 | 2021-07 | 上海/黄浦区 | 10多类数据；50多家伙伴；20多种方案 | high |
| F012 | 五里桥街道700余家沿街商铺以瞿溪路路段为最小管理单元试点，采取智能提醒、自行整改，多次发生才触发城运监管。 | A05:actor, N05:action, T01:technology, K07:task | M02-E02, M03-E05 | 已实施 | 2021-07 | 五里桥街道瞿溪路 | 700余家商铺 | high |
| F013 | 报道称春江物业在高空抛物告警后电话提醒居民；造成人员伤亡可一键请求城运中心支持。 | A06:actor, T04:technology, C01:capability, C02:capability, G04:target, N06:action, K02:task | M03-E03 | 观点/报道 | 2021-07—08 | 春江小区 | — | medium |
| F014 | 报道称春江在电梯安全方面识别非机动车进楼道。 | A06:actor, T05:technology, C03:capability, G04:target, N06:action, K02:task | M03-E04 | 观点/报道 | 2021-07—08 | 春江小区 | — | medium |
| F015 | 报道称春江结合智能门禁、居家用水数据关怀特殊老人。 | A06:actor, T03:technology, T06:technology, C04:capability, G03:target, N06:action, K02:task | M03-E04 | 观点/报道 | 2021-07—08 | 春江小区 | — | medium |
| F016 | 2021-08街道称正在开展春江专属最小管理单元智慧应用系统试点，目标“居民第一时间发现，物业第一时间响应”。 | A05:actor, N07:action, T01:technology, O04:outcome, G01:target, X05:context, K07:task | M04-E10 | 已实施 | 2021-08 | 春江小区 | 试点 | high |
| F017 | 春江美丽家园一期于2021-08-11完成竣工验收。 | A05:actor, N08:action, O02:outcome, G01:target, K01:task | M04-E02 | 已实施 | 2021-08-11 | 春江小区 | — | high |
| F018 | 春江非机动车充电桩项目于2021-08-04完成竣工验收。 | A05:actor, N09:action, O03:outcome, G01:target, K01:task | M04-E02 | 已实施 | 2021-08-04 | 春江小区 | — | high |
| F019 | 2021年街道在春江实施楼道粉刷、汽车道闸、无障碍通道改造等6个项目。 | A05:actor, N08:action, G01:target, K01:task | M04-E03 | 已实施 | 2021 | 春江小区 | 6个项目 | high |
| F020 | 街道对制造小区、瑞南新苑、新华南园大厦等5个小区7处车棚建设充电桩，新增409个充电位。 | A05:actor, N09:action, T11:technology, O03:outcome, K01:task | M04-E04 | 已实施 | 2021 | 五里桥街道 | 5个小区；7处车棚；409个充电位 | high |
| F021 | 春江每个项目由居民区党总支依托三会平台征求居民意见，小区事务由居民“说了算”。 | A03:actor, A04:actor, N10:action, A01:target, X04:context, K06:task | M04-E05 | 已实施 | 2021 | 春江小区 | — | high |
| F022 | 进场前街道组织居委、物业、业委、施工、监理研究细节，并按居民午休需求调整施工时间。 | A03:actor, A04:actor, A06:actor, A08:actor, A17:actor, N08:action, A01:target, K01:task | M04-E06 | 已实施 | 2021 | 春江小区 | — | high |
| F023 | 2021-08-04街道联合区房管局、区消防支队，会同居委、物业、施工、监理检查充电桩点位。 | A16:actor, A04:actor, A06:actor, A17:actor, N09:action, O03:outcome, K01:task | M04-E07 | 已实施 | 2021-08-04 | 春江小区 | — | high |
| F024 | 街道完善与物业的设施移交，落实物业日常管理主体责任。 | A05:actor, A06:actor, O03:outcome, G01:target, K01:task | M04-E08 | 已实施 | 2021 | 春江小区 | — | high |
| F025 | 2021-12《光明日报》记录春江三会、书面征询、杂物间改造、智能健身器材和塑胶跑道。 | A03:actor, A04:actor, N10:action, G05:target, O05:outcome, X04:context, K06:task | M05-E02, M05-E03, M05-E04, M05-E05, M05-E06 | 已实施 | 2021-12 | 春江小区 | — | medium |
| F026 | 2023-02中下旬春江美丽家园二期开工，道路改造需占用部分停车位，小区车位先天不足。 | A05:actor, N11:action, G07:target, X03:context, K01:task | M06-E01 | 已实施 | 2023-02 | 春江小区 | — | high |
| F027 | 张丞俊对辖区停车资源网格化排摸，唯一符合条件的是瀛通绿地大厦地下车库。 | A12:actor, A03:actor, N11:action, G07:target, K01:task | M06-E02 | 已实施 | 2023-02—03 | 五里桥街道 | — | high |
| F028 | 龙华党总支与恒丰银行资金运营中心党支部党建联建，连续3个月提供20个临时车位。 | A03:actor, A11:actor, N11:action, O06:outcome, G07:target, K01:task | M06-E03 | 已实施 | 2023-02—03 | 春江小区/恒丰银行 | 20个车位；3个月 | high |
| F029 | 党总支牵头居委会、业委会、物业、居民代表、施工方专题讨论，商议最少挪车数量。 | A03:actor, A04:actor, A08:actor, A06:actor, A17:actor, A01:actor, N11:action, K01:task | M06-E04 | 已实施 | 2023-02—03 | 春江小区 | — | high |
| F030 | 2月中旬方案公示、签约揭牌，居民凭三证合一办理临时停车证。 | A03:actor, A11:actor, A06:actor, N11:action, O06:outcome, K01:task | M06-E05 | 已实施 | 2023-02—03 | 春江小区/恒丰银行 | — | high |
| F031 | 恒丰银行鼓励员工绿色出行，配安保查验停车证、安排路口指引和指示牌。 | A11:actor, N11:action, K01:task | M06-E06 | 已实施 | 2023-02—03 | 恒丰银行 | — | high |
| F032 | 居民周沪提议将小花园大树改建为凉亭，因老年居民搬凳子不便。 | A10:actor, A01:actor, G05:target, N12:action, K06:task | M07-E02 | 已实施 | 2023年报道前 | 春江小区小花园 | — | high |
| F033 | 周沪在居委走访时提出想法并获支持；听证会赞同重新规划公共空间。 | A10:actor, A04:actor, A03:actor, N12:action, G05:target, K06:task | M07-E03 | 已实施 | 2023年报道前 | 春江小区 | — | high |
| F034 | 绿化带改造需审批、位置调整需上报，周沪花大半个月走流程。 | A10:actor, N12:action, G05:target, K06:task | M07-E04 | 已实施 | 2023年报道前 | 春江小区 | 大半个月 | high |
| F035 | 施工队进场后周沪自发监工，邀请书法居民题字制匾，完工当天挂匾。 | A10:actor, A01:actor, A17:actor, N12:action, G05:target, K06:task | M07-E05 | 已实施 | 2023年报道前 | 春江小区 | — | high |
| F036 | 春江小亭为六角亭，六个角分别代表街道、党总支、居委会、业委会、物业、社区民警。 | G05:target, A05:actor, A03:actor, A04:actor, A08:actor, A06:actor, A23:actor, O07:outcome | M07-E06 | 已实施 | 2023-08—09 | 春江小区 | 六角 | high |
| F037 | 小亭建成后居民组建春江自管队，一天三巡逻，收集意见并定期议事。 | A09:actor, A10:actor, A01:actor, N13:action, O08:outcome, K06:task | M07-E07 | 已实施 | 2023-08—09 | 春江小区 | 一天三巡逻 | high |
| F038 | 2023-05智慧春江微信小程序上线。 | T02:technology, N14:action, O09:outcome, K07:task | M08-E03 | 已实施 | 2023-05 | 春江小区 | — | high |
| F039 | 居民区党总支运行四单制：居民点单、微网格长派单、微网格员接单、居民评单。 | A03:actor, A18:actor, A19:actor, A20:actor, N15:action, G08:target, C05:capability, C06:capability, C07:capability, K03:task | M08-E04 | 已实施 | 2023-05—09 | 春江小区 | 四单 | high |
| F040 | 楼道灯事件：林先生拍照上传，微网格长核实，派单岳阳，当天修复。 | A01:actor, A18:actor, A19:actor, A20:actor, A07:actor, T02:technology, N16:action, G04:target, O10:outcome, K03:task | M08-E02 | 已实施 | 2023年报道前数日 | 春江小区 | — | high |
| F041 | 建筑垃圾事件：居民反映，次日清运，设置移动建筑垃圾箱。 | A01:actor, A07:actor, A25:actor, T02:technology, N16:action, G04:target, O10:outcome, K03:task | M08-E05, M08-E06 | 已实施 | 2023年报道前一个月 | 春江小区 | — | high |
| F042 | 2023-06斜坡事件：居民反映，街道联合路政/绿化，延长斜坡、降低坡度、修剪花坛，一个月竣工，后续拟加装减速条。 | A01:actor, A05:actor, A26:actor, A18:actor, N16:action, G04:target, O10:outcome, C08:capability, K03:task | M08-E10 | 已实施 | 2023-06 | 春江小区门口 | 约一个月 | high |
| F043 | 居民可评单，微网格队伍梳理整改，形成闭环。 | A01:actor, A18:actor, N15:action, C07:capability, O10:outcome, K03:task | M08-E11 | 已实施 | 2023-05—09 | 春江小区 | — | high |
| F044 | 微网格队伍包括新业态新就业群体、物业、业委会、楼组长、志愿者、下沉行政力量、商铺联盟、共建单位。 | A18:actor, A21:actor, A06:actor, A08:actor, A28:actor, A22:actor, N15:action, K04:task | M08-E07 | 已实施 | 2023-05—09 | 春江小区 | — | high |
| F045 | 居民可网上点单代配药，快递小哥送药；行动不便居民可订餐，网格员免费送餐。 | A01:actor, A21:actor, A20:actor, T02:technology, C10:capability, O10:outcome, K03:task | M08-E08 | 已实施 | 2023-05—09 | 春江小区 | — | high |
| F046 | 智慧春江包含意见箱、反诈、七心七助、线上议事等122项服务内容。 | T02:technology, C09:capability, O11:outcome, K03:task | M08-E09 | 观点/报道 | 2023-09 | 春江小区 | 122项 | medium |
| F047 | 2024-02街道将春江单独划分为一个微网格，建立格里厢家门口党群服务站。 | A05:actor, A18:actor, A27:actor, N17:action, K04:task | M09-E03 | 已实施 | 2024-02 | 春江小区 | 一个微网格 | high |
| F048 | 格里厢议事平台参与者包括微网格长、社区工作者、物业、业委会、党员志愿者、道德模范、楼组长、自治能人、新就业群体、共建单位。 | A18:actor, A27:actor, A28:actor, A06:actor, A08:actor, A21:actor, A22:actor, N17:action, K04:task | M09-E04 | 已实施 | 2024-02 | 春江小区 | — | high |
| F049 | 微网格建立运行机制、工作模式、工作导引，推动行政力量下沉、服务触角延伸、数字技术赋能，依托智慧春江。 | A18:actor, T02:technology, N17:action, K04:task | M09-E05 | 已实施 | 2024-02 | 春江小区 | — | medium |
| F050 | 党建、平安、管理、城运中心等力量进入春江微网格，包括党建指导员、房屋管理、消防安全人员。 | A05:actor, A18:actor, N17:action, K04:task | M09-E06 | 已实施 | 2024-02 | 春江小区 | — | high |
| F051 | 对383户入户走访，形成问题、资源、议题、项目四张清单118项（54/25/25/14）。 | A05:actor, A18:actor, A01:actor, N18:action, G09:target, C11:capability, O11:outcome, K04:task | M09-E07 | 已实施 | 2024-02 | 春江小区 | 383户；118项（54/25/25/14） | medium |
| F052 | 报道称春江问题解决率96%。 | A05:actor, O11:outcome | M09-E08 | 观点/报道 | 2024-02 | 春江小区 | 96% | low |
| F053 | 打造格里厢家门口服务阵地，整合党建、服务、管理，将配套服务、数字治理、文化资源下沉。 | A05:actor, A27:actor, N17:action, K04:task | M09-E09 | 已实施 | 2024-02 | 春江小区 | — | high |
| F054 | 街道推动春江数治网，数字治理+传统物业，人房事物情和最小管理单元数字赋能。 | A05:actor, A06:actor, T09:technology, N19:action, O12:outcome, G10:target, K04:task | M09-E10 | 已实施 | 2024-02 | 春江小区 | — | high |
| F055 | 春江数治网增设AI摄像头、态势感知，对非机动车棚火情、高抛、报修、垃圾落地告警。 | A05:actor, T07:technology, T08:technology, N19:action, O12:outcome, G04:target, K02:task | M09-E11 | 已实施 | 2024-02 | 春江小区 | — | medium |
| F056 | 报道称春江美丽家园二期完成。 | A05:actor, O13:outcome, K01:task | M09-E12 | 观点/报道 | 2024-02 | 春江小区 | — | medium |
| F057 | 依托街道养老数据库，大数据分析让养老顾问精准匹配，形成个性化清单，链接三级网络。 | A05:actor, A24:actor, T10:technology, N20:action, C12:capability, G03:target, O14:outcome, K05:task | M09-E13 | 已实施 | 2024-02 | 春江小区 | 三级网络 | medium |
| F058 | 推进七心七助七享原居颐养计划，作为家庭照护床位、老吾老、认知障碍支持点。 | A05:actor, A24:actor, N20:action, O14:outcome, K05:task | M09-E14 | 已实施 | 2024-02 | 春江小区 | — | medium |

## 状态统计

| 状态 | 数量 |
|---|---:|
| 已实施 | 52 |
| 观点/报道 | 6 |
| **合计** | **58** |

## G4 待核验

1. 实体是否混淆了组织、角色、个人和空间对象。
2. 技术、能力、行动是否分开：如“高空抛物监测告警”（技术）、“实时预警与电话提醒”（能力）、“部署春江智能场景”（行动）。
3. 事实粒度是否适当：是否把多个独立事实合并，或把同一事实过度拆分。
4. 事实状态是否严格：`reported_or_opinion` 只用于 122 项服务、96%、二期完成等来源方声明/统计。
5. 主体角色是否完整：居民既可作为行动主体，也可作为服务对象/评价主体。
