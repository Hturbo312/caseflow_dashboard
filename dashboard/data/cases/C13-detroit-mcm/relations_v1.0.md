# C13 Motor City Mapping 关系候选（v1.0 确认版）

> 状态：研究者已于 2026-11-13 确认 84 条关系；进入 G6 审校。
> 生成时间：2026-11-13
> 依据：`facts.md` v1.0（58 条）、`entities.json` v1.0（75 个）。
> 机器可读全字段见 `relations.json`；本文件为审核用索引。

## 1. 汇总

| 项 | 数量 |
|---|---|
| 关系 | 84 |
| 已实施 | 75 |
| 计划 | 7 |
| 观点/报道 | 2 |
| 争议 | 0 |
| 未确认 | 0 |
| 谓词种类 | 52 |

按过程：P01 7；P02 14；P03 5；P04 9；P05 13；P06 5；P07 9；P08 13；P09 9。

## 2. 关系清单

### C13-P01 联邦召集与任务组成立（7）

- `R001` 联邦政府(actor) —宣布并促成成立→ DBRTF(actor)｜已实施｜M01-E01、M02-E01
- `R002` DBRTF(actor) —承担→ 制定全市破败清除实施计划(task)｜计划｜M01-E02、M02-E05、M02-E06
- `R003` Linda Smith(actor) —担任主席→ DBRTF(actor)｜已实施｜M01-E04
- `R004` Glenda Price(actor) —担任主席→ DBRTF(actor)｜已实施｜M01-E04
- `R005` Dan Gilbert(actor) —担任主席→ DBRTF(actor)｜已实施｜M01-E04
- `R006` 底特律破产与紧急财政管理(context) —构成背景→ DBRTF(actor)｜已实施｜M01-E03
- `R007` 无单一破败数据库(context) —促成→ 全市地块外业普查(action)｜已实施｜M01-E05、M13-E04、M14-E01

### C13-P02 普查筹备、技术与人员（14）

- `R008` DBRTF(actor) —开展→ 全市地块外业普查(action)｜已实施｜M01-E05、M13-E02
- `R009` MNA(actor) —参与→ 全市地块外业普查(action)｜已实施｜M01-E05、M02-E03
- `R010` D3(actor) —参与→ 全市地块外业普查(action)｜已实施｜M01-E05、M02-E03
- `R011` Loveland(actor) —参与→ 全市地块外业普查(action)｜已实施｜M01-E05
- `R012` 全市地块外业普查(action) —采用→ Blexting(technology)｜已实施｜M01-E06、M10-E01
- `R013` Blexting(technology) —继承方法→ 2009 DRPS(context)｜已实施｜M01-E06、M01-E07
- `R014` 全市地块外业普查(action) —扩展至→ 380,233个地块(target)｜已实施｜M01-E07
- `R015` Blexting(technology) —具备→ GPS定位与地址检索(capability)｜已实施｜M10-E01
- `R016` Blexting(technology) —具备→ 拍照与字段采集(capability)｜已实施｜M10-E01、M10-E02、M10-E03、M01-E18
- `R017` 150名居民调查员与志愿司机(actor) —执行→ 全市地块外业普查(action)｜已实施｜M01-E08、M11-E01、M06-E01
- `R018` MNA(actor) —雇佣→ 150名居民调查员与志愿司机(actor)｜已实施｜M02-E03
- `R019` D3(actor) —培训→ 150名居民调查员与志愿司机(actor)｜已实施｜M02-E03、M02-E04
- `R020` 调查员培训(action) —约束→ 拍照与字段采集(capability)｜已实施｜M02-E04
- `R021` mission control与质检(actor) —质检→ 全市地块外业普查(action)｜已实施｜M01-E09、M01-E17

### C13-P03 外业采集与质检（5）

- `R022` 75个调查组(actor) —执行→ 全市地块外业普查(action)｜已实施｜M02-E02、M01-E17、M13-E01
- `R023` 全市地块外业普查(action) —覆盖→ 380,233个地块(target)｜已实施｜M01-E10
- `R024` 全市地块外业普查(action) —未覆盖→ 380,233个地块(target)｜已实施｜M01-E10
- `R025` 实时上传(capability) —支持→ mission control与质检(actor)｜已实施｜M01-E09
- `R026` 质检与第三方比对(capability) —应用于→ 全市地块外业普查(action)｜已实施｜M01-E09、M01-E17、M01-E11

### C13-P04 数据融合与破败判定（9）

- `R027` 数据融合(action) —汇编→ 24个数据集/数据库(technology)｜已实施｜M01-E12、M02-E10、M11-E02
- `R028` 24个数据集/数据库(technology) —支持→ 制定全市破败清除实施计划(task)｜已实施｜M01-E12
- `R029` D3(actor) —验证→ 24个数据集/数据库(technology)｜已实施｜M01-E11
- `R030` 数据融合(action) —产生→ 84,641个需干预地块口径(outcome)｜已实施｜M01-E13、M02-E07
- `R031` 84,641个破败地块(target) —由…构成→ 78,506个结构(target)｜已实施｜M01-E16、M02-E07
- `R032` 84,641个破败地块(target) —由…构成→ 6,135个空地(target)｜已实施｜M01-E13、M02-E07
- `R033` 确定单栋干预方式(task) —筛选→ 40,077个建议立即清除结构(target)｜已实施｜M01-E14
- `R034` 确定单栋干预方式(task) —筛选→ 38,429个待评估结构(target)｜已实施｜M01-E15
- `R035` 84,641个需干预地块口径(outcome) —覆盖→ 84,641个破败地块(target)｜已实施｜M01-E13

### C13-P05 优先级工具与历史叠加（13）

- `R036` MCI 工具(technology) —服务→ 识别优先干预区域(task)｜已实施｜M01-E19、M02-E11
- `R037` MCI 工具(technology) —采用→ 两层指数分析(capability)｜已实施｜M01-E20
- `R038` 两层指数分析(capability) —使用→ 2009 DRPS(context)｜已实施｜M01-E22
- `R039` MCI 分析(action) —产生→ 临界点优先干预区域(outcome)｜已实施｜M01-E23
- `R040` DBRTF(actor) —建议→ DLBA(actor)｜计划｜M01-E25
- `R041` DLBA(actor) —建立→ SATT 工具(technology)｜计划｜M01-E25、M02-E11
- `R042` SATT 工具(technology) —具备→ 单栋分级评估(capability)｜计划｜M02-E11
- `R043` MHPN(actor) —组织→ 历史保护叠加调查(action)｜已实施｜M02-E12
- `R044` Preservation Detroit(actor) —参与→ 历史保护叠加调查(action)｜已实施｜M02-E12
- `R045` 55名以上历史保护志愿者(actor) —执行→ 历史保护叠加调查(action)｜已实施｜M02-E12
- `R046` 历史保护叠加调查(action) —覆盖→ 17,500处历史房产(target)｜已实施｜M02-E12
- `R047` DLBA(actor) —启用→ Hardest Hit Fund计划(context)｜已实施｜M01-E24
- `R048` Hardest Hit Fund计划(context) —覆盖→ 六个HHF街区(target)｜已实施｜M01-E24

### C13-P06 报告与交付（5）

- `R049` 制定全市破败清除实施计划(task) —基于→ 84,641个需干预地块口径(outcome)｜已实施｜M01-E27、M02-E08、M02-E09
- `R050` DBRTF(actor) —提交→ 报告编制与交付(action)｜已实施｜M02-E01
- `R051` 报告编制与交付(action) —交付→ Mike Duggan(actor)｜已实施｜M02-E01
- `R052` 报告编制与交付(action) —交付→ Kevyn Orr(actor)｜已实施｜M02-E01
- `R053` 报告编制与交付(action) —交付→ 联邦政府(actor)｜已实施｜M02-E01

### C13-P07 平台上线与数据公开（9）

- `R054` JPMorgan Chase(actor) —资助→ DLBA(actor)｜已实施｜M02-E13
- `R055` DLBA(actor) —启动→ People's Property Dashboard(technology)｜计划｜M02-E13
- `R056` D3(actor) —实施→ 平台上线与数据公开(action)｜已实施｜M11-E03
- `R057` 平台上线与数据公开(action) —上线→ MCM平台/网站(technology)｜已实施｜M11-E03
- `R058` MCM平台/网站(technology) —具备→ 空间筛选与聚合(capability)｜已实施｜M07-E01、M07-E02
- `R059` 平台上线与数据公开(action) —公开→ 开放数据 CSV(technology)｜已实施｜M02-E14
- `R060` 公开调查数据(task) —通过→ 开放数据 CSV(technology)｜已实施｜M02-E14
- `R083` Loveland(actor) —开发→ MCM平台/网站(technology)｜已实施｜M06-E03
- `R084` D3(actor) —提供质量控制→ MCM平台/网站(technology)｜已实施｜M06-E03

### C13-P08 社区复核与培训（13）

- `R061` D3(actor) —实施→ Mini-Grant 实施(action)｜已实施｜M12-E01
- `R062` MNA(actor) —共同实施→ Mini-Grant 实施(action)｜已实施｜M12-E01
- `R063` D3(actor) —资助→ 15个社区组织(actor)｜已实施｜M12-E01
- `R064` Mini-Grant 实施(action) —动员→ 260多名居民(actor)｜已实施｜M12-E02
- `R065` Mini-Grant 实施(action) —复核→ 76,000个社区复核地块(target)｜已实施｜M12-E02
- `R066` Mini-Grant 实施(action) —产生→ 社区复核76,000地块(outcome)｜已实施｜M12-E02
- `R067` 公众更新与众包复核(capability) —提交至→ D3(actor)｜已实施｜M06-E02
- `R068` mission control与质检(actor) —审核→ 公众更新与众包复核(capability)｜已实施｜M06-E02
- `R069` D3(actor) —培训→ 公众/居民(actor)｜已实施｜M11-E04
- `R070` DLBA(actor) —使用→ MCM平台/网站(technology)｜已实施｜M11-E05、M08-E02
- `R071` 公众更新与众包复核(capability) —反馈至→ DLBA(actor)｜已实施｜M11-E05
- `R072` DBRTF(actor) —计划捐赠→ 平板电脑(technology)｜计划｜M01-E28
- `R073` 平板电脑(technology) —服务→ 公众/居民(actor)｜计划｜M01-E28

### C13-P09 平台演化与外部扩展（9）

- `R074` Loveland(actor) —提供→ Site Control(technology)｜已实施｜M08-E01
- `R075` Site Control(technology) —支持→ MCM平台/网站(technology)｜已实施｜M08-E01
- `R076` Wayne County Treasurer(actor) —处理→ 62,082处止赎房产(target)｜已实施｜M09-E01
- `R077` 止赎调查(action) —覆盖→ 62,082处止赎房产(target)｜已实施｜M09-E02
- `R078` D3(actor) —参与→ 止赎调查(action)｜已实施｜M09-E02
- `R079` D3(actor) —扩展方法至→ Highland Park(actor)｜已实施｜M11-E04
- `R080` D3(actor) —扩展方法至→ Hamtramck(actor)｜已实施｜M11-E04
- `R081` Highland Park(actor) —获得→ 近600万美元联邦资金(outcome)｜观点/报道｜M11-E04
- `R082` Hamtramck(actor) —获得→ 近600万美元联邦资金(outcome)｜观点/报道｜M11-E04

## 3. 谓词表

| 谓词 | 次数 | 语义 |
|---|---|---|
| 参与 | 5 | 主体加入某项行动，不表示主导 |
| 覆盖 | 5 | 行动/计划作用于某一总体或范围 |
| 具备 | 4 | 技术或工具拥有某项能力 |
| 担任主席 | 3 | 个人在任务组中的治理角色 |
| 执行 | 3 | 主体实际开展某项行动 |
| 支持 | 3 | 一方为另一方提供条件，不表示因果 |
| 产生 | 3 | 行动形成可观察产出 |
| 交付 | 3 | 把报告正式提交给对象 |
| 采用 | 2 | 行动使用某项技术 |
| 培训 | 2 | 向对象提供方法训练 |
| 由…构成 | 2 | 总体的组成关系，非等同 |
| 筛选 | 2 | 按标准从总体中识别子集 |
| 服务 | 2 | 工具/资源面向某任务或人群 |
| 使用 | 2 | 主体实际调用某项技术 |
| 资助 | 2 | 提供资金 |
| 实施 | 2 | 主体执行某项计划 |
| 扩展方法至 | 2 | 把方法应用到新的对象 |
| 获得 | 2 | 对象取得资金，归因为报道 |

其余 34 个谓词各出现 1 次，见 `relations.json`。

## 4. 未进入关系的原子事实（13）

| 事实 | 内容 | 处理 |
|---|---|---|
| F014 | 200 人团队含质检 | 作为 R017 的限定口径 |
| F015 | 普查成本 $1.5M | 作为 R008 的限定 |
| F017 | 两人小组 | 作为 R022 的限定 |
| F020 | NYT 380,217、三人小组 | 作为 R022/R023 的限定 |
| F023 | 十项破败定义 | 作为 R002 的限定 |
| F024 | 街区破败定义 | 作为 R002 的限定 |
| F028 | 街区破败占 93% | 作为 R032 的限定 |
| F031 | Dynamics 四项指标 | 作为 R037 的限定 |
| F037 | 五年清除 | 作为 R049 的限定 |
| F038 | $2B/$850M | 作为 R049 的限定 |
| F039 | $456M/$394M/$88M | 作为 R049 的限定 |
| F040 | ~$400M；11 年 | 作为 R049 的限定 |
| F042 | 公有结构 40/31/18/11 | 保留事实，待核标签后再决定是否建关系 |

## 5. 审核要点

1. **类别**：技术（Blexting/Site Control/MCI/SATT）与能力（GPS/拍照/实时上传/分析）是否分清。
2. **方向**：`action→target` 与 `actor→action` 是否一致；`G02 由…构成 G03/G04` 是否为正确方向。
3. **粒度**：`交付`分拆为 Duggan/Orr/联邦三条是否必要。
4. **状态**：`R040–R042`（SATT）、`R055`（People's Property Dashboard）、`R072–R073`（平板）为计划；`R081–R082` 为报道。
5. **谓词合并**：是否把 `提交/交付/提交至`、`扩展至/扩展方法至`、`支持/服务` 等近义谓词合并。
