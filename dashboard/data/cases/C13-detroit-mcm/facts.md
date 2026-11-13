# C13 Motor City Mapping 原子事实（v1.0 确认版）

> 状态：研究者已于 2026-11-13 确认 58 条事实与 75 个实体；允许进入 G5。
> 生成时间：2026-11-13
> 依据：`process.md` v1.0（C13-P01–P09）与 `evidence.md` v1.0（66 条）。
> 规则：一条事实只承载一个可独立核验的陈述；实体角色按 8 类本体标注，同一实体可有多种角色。

## 1. 汇总

| 项 | 数量 |
|---|---|
| 原子事实 | 58 |
| 实体 | 75 |
| 已实施 | 49 |
| 计划 | 5 |
| 观点/报道/测算 | 4 |
| 争议 | 0 |
| 未确认 | 0 |

## 2. 实体清单（按类型）

**Actor（24）**：E-A01 联邦政府；E-A02 DBRTF；E-A03 Linda Smith；E-A04 Glenda Price；E-A05 Dan Gilbert；E-A06 Kevyn Orr；E-A07 Mike Duggan；E-A08 D3；E-A09 Loveland；E-A10 MNA；E-A11 150名居民调查员与志愿司机；E-A12 75个调查组；E-A13 mission control与质检；E-A14 DLBA；E-A15 JPMorgan Chase；E-A16 MHPN；E-A17 Preservation Detroit；E-A18 55名以上志愿者；E-A19 15个社区组织；E-A20 260多名居民；E-A21 Wayne County Treasurer；E-A22 Highland Park；E-A23 Hamtramck；E-A24 公众/居民（兼 target）。

**Task（6）**：E-T01 制定实施计划；E-T02 建立数据库；E-T03 识别优先区域；E-T04 确定单栋干预；E-T05 社区参与与复核；E-T06 公开数据。

**Technology（9）**：E-H01 Blexting；E-H02 MCM平台/网站；E-H03 Site Control；E-H04 平板电脑；E-H05 MCI；E-H06 SATT；E-H07 开放CSV；E-H08 24个数据集；E-H09 People's Property Dashboard（计划）。

**Capability（8）**：E-C01 GPS与地址检索；E-C02 拍照与字段采集；E-C03 实时上传；E-C04 质检与第三方比对；E-C05 空间筛选与聚合；E-C06 两层指数分析；E-C07 单栋分级评估；E-C08 公众更新与众包复核。

**Action（9）**：E-P01 外业普查；E-P02 数据融合；E-P03 MCI分析；E-P04 报告编制与交付；E-P05 平台上线与公开；E-P06 Mini-Grant；E-P07 历史保护叠加；E-P08 止赎调查；E-P09 调查员培训。

**Target（10）**：E-G01 380,233地块；E-G02 84,641破败地块；E-G03 78,506结构；E-G04 6,135空地；E-G05 40,077立即清除；E-G06 38,429待评估；E-G07 六个HHF街区；E-G08 17,500历史房产；E-G09 62,082止赎房产；E-G10 76,000复核地块。

**Outcome（5）**：E-O01 84,641口径；E-O02 临界点区域；E-O03 公开平台与CSV；E-O04 社区复核76,000；E-O05 近600万美元联邦资金。

**Context（4）**：E-X01 破产与紧急财政管理；E-X02 无单一数据库；E-X03 Hardest Hit Fund；E-X04 2009 DRPS。

## 3. 原子事实表

| 编号 | 原子事实 | 实体角色 | 证据 | 状态 | 限定 | 置信度 |
|---|---|---|---|---|---|---|
| F001 | 2013年9月，联邦政府宣布3亿美元行动，DBRTF同期成立 | A01:actor；A02:actor；X01:context | M01-E01、M02-E01 | 已实施 | 2013-09；Detroit；$300M | 高 |
| F002 | DBRTF的使命是处理全市所有破败住宅、商业与公共结构并清理所有荒废空地 | A02:actor；T01:task | M01-E02 | 计划 | 2013；Detroit | 高 |
| F003 | DBRTF于2013年9月启动；时值Orr任紧急财政管理人六个月、Duggan当选市长两个月 | A02:actor；A06:actor；A07:actor；X01:context | M01-E03 | 已实施 | 2013-09；Detroit | 高 |
| F004 | Linda Smith、Glenda Price与Dan Gilbert任DBRTF三位主席 | A03:actor；A04:actor；A05:actor；A02:actor | M01-E04 | 已实施 | 2013；Detroit；3人 | 高 |
| F005 | 普查前无单一完整破败数据库；早期估计78,000–90,000栋 | A02:actor；X02:context；G01:target | M01-E05、M13-E04、M14-E01 | 已实施 | 2013；Detroit | 高 |
| F006 | 2013年11月，DBRTF与MNA、D3、Loveland合作对约380,000个地块开展实地普查 | A02、A10、A08、A09:actor；P01:action；G01:target | M01-E05 | 已实施 | 2013-11；Detroit；380,000 | 高 |
| F007 | MCM采用Blexting，方法建立在2009 DRPS之上，并扩展到约135,000个非住宅地块 | H01:technology；T02:task；P01:action；X04:context；G01:target | M01-E06、M01-E07 | 已实施 | 2013-11；Detroit；135,000 | 高 |
| F008 | Blexting支持Android/iOS，具备GPS定位、地址检索、拍照与问卷功能 | H01:technology；C01、C02:capability | M10-E01 | 已实施 | 2014 | 高 |
| F009 | 拍照规范要求完整正立面、多角度，避免过远过近、主体不明、逆光与隔窗 | H01:technology；C02:capability；P01:action | M10-E02 | 已实施 | 2014；Detroit | 高 |
| F010 | 问卷字段区分有无结构、占用状态、六类用途与单元数 | H01:technology；C02:capability | M10-E03 | 已实施 | 2014；Detroit | 高 |
| F011 | 150名居民调查员与志愿司机被分配到四分之一英里方格（microhoods） | A11:actor；P01:action | M01-E08 | 已实施 | 2013-11/2014-01；Detroit；150人 | 高 |
| F012 | MNA雇佣150名底特律人参与调查，D3提供严格培训 | A10、A11、A08:actor；P09:action | M02-E03 | 已实施 | 2013-11/2014-01；Detroit；150人 | 高 |
| F013 | 培训要求保守判断；Suggest Demolition只用于严重破败对象 | A08:actor；P09:action；C02:capability | M02-E04 | 已实施 | 2013-12；Detroit | 高 |
| F014 | D3称项目团队含200名居民调查员、司机与质检人员 | A11、A13、A08:actor | M11-E01 | 已实施 | 2013-12/2014-01；Detroit；200人 | 中高 |
| F015 | 普查成本约150万美元，来自基金会与私人资金 | A02:actor；P01:action | M13-E02 | 已实施 | 2013-12/2014-02；Detroit；$1.5M | 高 |
| F016 | 2013年12月中旬至2014年1月，75个调查组采集全市380,000个地块数据 | A12:actor；P01:action；G01:target | M02-E02 | 已实施 | 2013-12/2014-01；Detroit；75组 | 高 |
| F017 | 外业以两人小组逐地块采集信息 | A12:actor；P01:action | M01-E17 | 已实施 | 2013-12/2014-01；Detroit；2人/组 | 高 |
| F018 | 调查数据实时上传至mission control，质检人员核查准确性与完整性 | A13:actor；C03、C04:capability | M01-E09、M01-E17 | 已实施 | 2013-12/2014-01；Detroit | 高 |
| F019 | MCM调查380,233个地块中的378,136个；2,097个因无法从街道看到而未调查 | P01:action；G01:target；C04:capability | M01-E10 | 已实施 | 2013-12/2014-01；Detroit；378,136/380,233 | 高 |
| F020 | NYT报道使用380,217个地块口径，并记录最多75个三人小组自12月起普查 | A12:actor；G01:target | M13-E01 | 观点/报道 | 2014-02；Detroit；380,217 | 高 |
| F021 | 任务组汇编24个数据集，16个用于定义破败，8个留待下一阶段 | A02:actor；P02:action；H08:technology | M01-E12、M02-E10 | 已实施 | 2014-01/03；Detroit；24/16/8 | 高 |
| F022 | D3确认377,602份调查记录与第三方数据集准确匹配 | A08:actor；C04:capability；H08:technology | M01-E11 | 已实施 | 2014-01/03；Detroit；377,602 | 高 |
| F023 | 任务组以十项条件定义破败 | A02:actor；T01:task | M02-E05 | 已实施 | 2014；Detroit；10项 | 高 |
| F024 | 街区破败限定为破败住宅、小于25,000平方英尺的小商业与空地 | A02:actor；T01:task | M02-E06 | 已实施 | 2014；Detroit；<25,000 sq ft | 高 |
| F025 | 84,641个需干预地块由78,506结构与6,135空地构成；结构含73,035住宅与5,471商业 | G02、G03、G04:target；P02:action；O01:outcome | M01-E13、M01-E16、M02-E07 | 已实施 | 2014-05；Detroit；84,641 | 高 |
| F026 | 40,077个结构明确符合破败定义并建议立即清除 | G05:target；T04:task | M01-E14 | 已实施 | 2014-05；Detroit；40,077 | 高 |
| F027 | 38,429个结构带破败征兆，需SATT进一步评估 | G06:target；T04:task | M01-E15 | 已实施 | 2014-05；Detroit；38,429 | 高 |
| F028 | 街区破败占全部破败地块93%以上 | G02:target | M02-E07 | 已实施 | 2014-05；Detroit；>93% | 高 |
| F029 | MCI工具把全市需求落到街区尺度，识别使最多人最快受益的干预区域 | H05:technology；T03:task | M01-E19 | 已实施 | 2014；Detroit | 高 |
| F030 | MCI采用两层指数：Neighborhood Dynamics Index与Neighborhood Threat Index | H05:technology；C06:capability | M01-E20 | 已实施 | 2014；Detroit；2层 | 高 |
| F031 | Dynamics Index测量占用结构密度、MCM平均状况、抵押契据密度与18岁以下人口密度 | H05:technology；C06:capability | M01-E21 | 已实施 | 2014；Detroit；4项 | 高 |
| F032 | Threat Index使用2008–2013止赎密度与2009至2014住宅状况变化 | H05:technology；C06:capability；X04:context | M01-E22 | 已实施 | 2014；Detroit | 高 |
| F033 | 最高与较高威胁区合计覆盖人口193,384 | O02:outcome；C06:capability；P03:action | M01-E23 | 已实施 | 2014-04；Detroit；193,384人 | 高 |
| F034 | 任务组建议DLBA建立12问的SATT作为单栋干预的标准化指引 | H06:technology；C07:capability；T04:task；A14:actor | M01-E25、M02-E11 | 计划 | 2014；Detroit；12问 | 高 |
| F035 | MHPN与Preservation Detroit等组织55名以上志愿者，两周调查六个HHF街区17,500处房产 | A16、A17、A18:actor；P07:action；G08:target | M02-E12 | 已实施 | 2014；6 HHF街区；55+人；17,500处 | 高 |
| F036 | DLBA在六个目标街区启用5,200万美元Hardest Hit Fund清除或稳定空置结构 | A14:actor；X03:context；G07:target | M01-E24 | 已实施 | 2014；6 HHF街区；$52M | 高 |
| F037 | 任务组认为全部破败可在五年或更短时间内清除 | A02:actor；T01:task | M02-E08 | 计划 | 2014-05；Detroit；≤5年 | 高 |
| F038 | 总成本可能接近20亿美元，其中街区破败8.5亿美元 | A02:actor；T01:task | M02-E08 | 计划 | 2014-05；Detroit；~$2B/$850M | 高 |
| F039 | 已确定约4.56亿美元，缺口3.94亿美元，8,800万美元可立即使用 | A02:actor；T01:task | M02-E09 | 已实施 | 2014-05；Detroit；$456M/$394M/$88M | 高 |
| F040 | 报告另一处称仍面临约4亿美元缺口，并按每年7,000个结构测算需11年以上 | A02:actor；T01:task | M01-E27 | 观点/报道 | 2014-05；Detroit；~$400M；>11年 | 中高 |
| F041 | 2014年5月27日，任务组向Duggan、Orr与联邦代表提交发现与建议 | A02、A07、A06、A01:actor；P04:action | M02-E01 | 已实施 | 2014-05-27；Detroit | 高 |
| F042 | 公有结构外部状况为Fair 40%、Good 31%、Poor 18%、Suggest Demolition 11%（标签待核） | G03:target；T04:task；C07:capability | M01-E26 | 观点/报道 | 2014-05；Detroit；40/31/18/11 | 中高 |
| F043 | 2014年5月21日，JPMorgan Chase投入100万美元支持DLBA启动Phase II，计划工具名People's Property Dashboard | A15、A14:actor；H09:technology | M02-E13 | 已实施 | 2014-05-21；Detroit；$1M | 高 |
| F044 | 2014年7月，MCM网站上线，展示每个地块的使用、状况与占用数据 | A08、A09:actor；H02:technology；P05:action；O03:outcome | M11-E03 | 已实施 | 2014-07；Detroit | 高 |
| F045 | 平台可按结构/空地、占用、状况、火灾、侵入、维护、倾倒与产权等字段筛选 | H02:technology；C05:capability | M07-E01 | 已实施 | 2014-12；Detroit | 高 |
| F046 | 平台可按neighborhood、zip、census tract、council district与HHF zone聚合 | H02:technology；C05:capability | M07-E02 | 已实施 | 2014-12；Detroit；5类 | 高 |
| F047 | 调查结果以开放数据许可的原始CSV公开，存放于D3数据门户 | H07:technology；T06:task | M02-E14 | 已实施 | 2014；Detroit | 高 |
| F048 | 2014年7月，D3与MNA启动Mini-Grant；70多个组织申请，15个入围，金额$1,000–15,000 | A08、A10、A19:actor；P06:action | M12-E01 | 已实施 | 2014-07；Detroit；15个 | 高 |
| F049 | 15个组织在8周内动员260多名居民复核76,000多个地块 | A19、A20:actor；P06:action；G10:target；O04:outcome | M12-E02 | 已实施 | 2014-07/12；Detroit；260+人；76,000+ | 高 |
| F050 | Phase 2允许公众用Blexting提交更新；更新经质检后进入网站与市数据库 | H01:technology；C08:capability；A08:actor；T05:task | M06-E02 | 已实施 | 2014–2015；Detroit | 高 |
| F051 | 2014年8月以来，D3开展40多场培训，覆盖约1,000名居民 | A08:actor；P09:action；A24:actor | M11-E04 | 已实施 | 2014-08/2015-01；Detroit；40+场；1,000人 | 高 |
| F052 | DLBA使用MCM数据推进清除；居民反馈进入DLBA决策流程 | A14:actor；H02:technology；C08:capability | M11-E05 | 已实施 | 2014–2015；Detroit | 中高 |
| F053 | 任务组计划把外业平板捐赠给市政府，由区经理以借用方式提供给居民 | A02:actor；H04:technology；A24:target | M01-E28 | 计划 | 2014；Detroit | 高 |
| F054 | 2015年MCM平台由Loveland的Site Control提供支持 | H03:technology；A09:actor；H02:technology | M08-E01 | 已实施 | 2015；Detroit | 高 |
| F055 | 2015年平台新增拆除、承包商、DLBA项目销售与历史资源调查图层 | H02:technology；A14:actor；C05:capability | M08-E02 | 已实施 | 2015；Detroit；4类 | 高 |
| F056 | 2015年62,082处房产进入正式止赎，至少25,500处有人居住 | A21:actor；G09:target | M09-E01 | 已实施 | 2015；Detroit；62,082；25,500 | 高 |
| F057 | 2015年1月27日至3月底，24场活动吸引7,725人，收集5,404份问卷（71%），覆盖8.7%止赎房产 | A21、A08:actor；P08:action；G09:target | M09-E02 | 已实施 | 2015-01/03；Detroit；24场；7,725人；5,404份 | 高 |
| F058 | MCM方法扩展至Highland Park与Hamtramck；D3称两地获近600万美元联邦资金 | A22、A23、A08:actor；O05:outcome | M11-E04 | 观点/报道 | 2014–2015；两地；~$6M | 中高 |

> 实体编号省略前缀 `E-`；角色以 `实体:类别` 表示。

## 4. 拆分与合并决定

| 决定 | 处理 | 理由 |
|---|---|---|
| F025 将 84,641、78,506、6,135 与 73,035/5,471 合为一条 | 保留总量与构成在同一事实内 | 它们是同一统计口径的组成部分，拆开会产生无法独立解释的数字 |
| F026/F027 分开 | 40,077 与 38,429 分别记录 | 两者对应不同干预状态（立即清除 vs 待评估） |
| F021 将 24/16/8 合为一条 | 保留三个数字 | 同一汇编动作的三个口径，拆开会产生重复关系 |
| F043 将资助与工具分开表述 | 资助为已实施；工具名为计划 | 证据中工具是"will provide" |
| F053 平板捐赠 | 单列为计划 | 原文为"will be donated" |
| People's Property Dashboard | 独立实体 E-H09 | 与 2014 年 MCM 网站不是同一对象，避免名称相似合并 |

## 5. 待核事项

1. **F042 标签对应**：40%/31%/18%/11% 与 Fair/Good/Poor/Suggest Demolition 的顺序需核对原图。
2. **F020 NYT 口径**：380,217 与报告 380,233 的 16 个差值来源不明。
3. **F014 200 人**：D3 的 200 人是否含管理层，需补材料。
4. **F053 平板捐赠**：是否实际执行，需 2014–2015 年市政府记录。
5. **F058 近 600 万美元**：D3 的归因表述，需独立文件确认因果关系。

## 6. 覆盖检查

- 58 条事实均至少关联 1 条已确认证据。
- 9 个过程段落均有事实覆盖：P01（F001–F005）、P02（F006–F015）、P03（F016–F020）、P04（F021–F028）、P05（F029–F036）、P06（F037–F042）、P07（F043–F047）、P08（F048–F053）、P09（F054–F058）。
- 未覆盖区间：2016–2017 年，无事实生成。
