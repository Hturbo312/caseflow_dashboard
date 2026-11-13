# C18 方元问问（AskNearby）原子事实（v0.1 候选）

> 状态：待研究者确认。未确认前不得进入 G5。
> 生成时间：2026-11-13
> 说明：实体角色使用“标签(类型)”简写；完整实体 ID、角色串、时间和空间限定见 `facts.json`，实体定义见 `entities.json`。

## 1. 汇总

| 项 | 数量 |
|---|---:|
| 原子事实 | 56 |
| 实体 | 83 |
| 情境 / 主体 / 任务 / 技术 | 6 / 12 / 7 / 12 |
| 能力 / 行动 / 对象 / 结果 | 9 / 14 / 7 / 16 |
| 已实施 | 9 |
| 作者报告/观点 | 41 |
| 计划 | 3 |
| 争议 | 3 |

## 2. 过程 C18-P01：目标与三类场景

- **F001** 论文提出以 LLM、RAG 和时空知识图谱建设社区公共设施信息服务平台。实体：研究团队(actor)、平台建设(task)、时空知识图谱(technology)、多模态RAG(technology)、垂域大模型(technology)；证据：M01-E01；状态：reported。
- **F002** 平台设定本地公共服务设施信息智能助手场景。实体：设施助手(task)、方元问问APP(technology)、检索推送(capability)；证据：M01-E01、E13；状态：reported。
- **F003** 平台设定邻里在线社交场景。实体：邻里社交(task)、方元问问APP(technology)、社交UGC(capability)；证据：M01-E01、E14；状态：reported。
- **F004** 平台设定社区生活圈资源实时评估与优化场景。实体：资源优化(task)、方元问问APP(technology)、资源优化(capability)；证据：M01-E01、E16、E17；状态：reported。
- **F005** 设施助手采用“检索+推送”双模式。实体：设施助手(capability)、方元问问APP(technology)；证据：M01-E13；状态：reported。
- **F006** 邻里社交支持文本、语音、图片等多形式发布与交流。实体：社交UGC(capability)、方元问问APP(technology)；证据：M01-E14；状态：reported。
- **F007** 邻里社交支持设施评价打分并提取高频关键词。实体：社交UGC(capability)、社区设施信息(target)；证据：M01-E14；状态：reported。
- **F008** 管理者被设计为可在平台发起在线问卷、投票或讨论话题。实体：管理者/规划师(actor)、方元问问APP(technology)、邻里社交(task)；证据：M01-E15；状态：reported。
- **F009** 平台设计资源缺口与设施体验反馈入口，聚合相似需求并以积分激励参与。实体：方元问问APP(technology)、资源优化(capability)、社区资源(target)；证据：M01-E16；状态：reported。
- **F010** 平台声称可结合人流和承载能力自动生成交通、停车、商业、绿地等资源调度或空间方案。实体：资源优化(capability)、社区资源(target)；证据：M01-E17；状态：reported。

## 3. 过程 C18-P02：技术架构与平台开发

- **F011** 平台采用感知—传输—平台—应用四层技术路线。实体：研究团队(actor)、四层架构(technology)、架构构建(action)；证据：M01-E03；状态：reported。
- **F012** 感知层通过移动终端采集位置轨迹与设施使用、评价数据。实体：四层架构(technology)、多源感知(capability)；证据：M01-E04；状态：reported。
- **F013** 平台层包含时空特征向量数据库、地理邻近性 RAG、垂域大模型和时空分析引擎。实体：时空向量库(technology)、多模态RAG(technology)、垂域大模型(technology)、时空分析引擎(technology)；证据：M01-E05；状态：reported。
- **F014** RAG 融合地理邻近性、语义关联性和社会网络邻近性三个维度。实体：多模态RAG(technology)、地理检索(capability)；证据：M01-E06；状态：reported。
- **F015** 系统使用时空知识图谱与认知地图模型整合结构化与非结构化多源数据。实体：时空知识图谱(technology)；证据：M01-E07；状态：reported。
- **F016** 多模态 RAG 由 GraphRAG、VectorRAG 和 GeoRAG 组合而成。实体：多模态RAG、GraphRAG、VectorRAG、GeoRAG(technology)；证据：M01-E08；状态：reported。
- **F017** 问答环节通过知识图谱比对、来源交叉验证和分类器筛选抑制大模型幻觉。实体：方元问问APP(technology)、幻觉验证(capability)、垂域大模型(technology)；证据：M01-E09；状态：reported。
- **F018** 平台用居民反馈识别需求，并用 LLM 生成、用机器学习模型模拟设施优化建议。实体：垂域大模型(technology)、资源优化(capability)、社区设施信息(target)；证据：M01-E10；状态：reported。
- **F019** 反馈理解和优化建议设置人工复核、运行数据交叉验证和专家审核。实体：幻觉验证(capability)、管理者/规划师(actor)；证据：M01-E11；状态：reported。
- **F020** 论文设计通过实验组与对照组的设施改进对比评估优化方案效果。实体：研究团队(actor)、资源优化(capability)、资源优化任务(task)；证据：M01-E12；状态：planned。
- **F021** 研究团队称开发了“方元问问”APP。实体：研究团队(actor)、开发APP(action)、方元问问APP(technology)；证据：M01-E18；状态：implemented。

## 4. 过程 C18-P03：北京大学深圳研究生院试运行

- **F022** 平台在北京大学深圳研究生院开展学术型社区试运行。实体：研究团队(actor)、高校试点(action)、方元问问APP(technology)、北大深研院社区(context)；证据：M01-E18、E19；状态：implemented。
- **F023** 试运行对象为 2024 年秋季入学新生，持续 30 天。实体：北大新生(target)、高校试点(action)；证据：M01-E20；状态：implemented。
- **F024** 平台在 30 天内的新生渗透率为 46%。实体：方元问问APP(technology)、北大新生(target)、渗透率(outcome)；证据：M01-E20；状态：reported。
- **F025** 平台总均活跃用户峰值超过 1500 人次。实体：方元问问APP(technology)、活跃峰值(outcome)；证据：M01-E20；状态：reported。
- **F026** 使用组学生第 7 日活动半径达到 1.2 km。实体：北大新生(actor)、活动半径(outcome)；证据：M01-E21；状态：reported。
- **F027** 新生信息获取耗时由 15 分钟降至 3 分钟，作者称效率提升 80%。实体：北大新生(target)、方元问问APP(technology)、信息耗时(outcome)；证据：M01-E22；状态：reported。
- **F028** 一名国际留学生在 7 天内连续发起 53 次查询，涵盖 12 类事务。实体：国际留学生(actor)、方元问问APP(technology)、自然语言问答(capability)；证据：M01-E23；状态：reported。
- **F029** 作者称该留学生案例中人工咨询需求减少 92%。实体：国际留学生(actor)、人工咨询下降(outcome)；证据：M01-E23、E35；状态：reported。**E35 已并入本事实，不再单列。**

## 5. 过程 C18-P04：南头古城试运行

- **F030** 平台在南头古城开展超高密度混合社区试运行。实体：研究团队(actor)、南头试点(action)、方元问问APP(technology)、南头古城(context)；证据：M01-E18、E24；状态：implemented。
- **F031** 南头古城日均客流约 1.2 万人次、居住密度约 3.8 万人/km²。实体：南头古城(context)；证据：M01-E24；状态：reported。
- **F032** 管理端网格化系统使工单响应速度提升 67%。实体：网格系统(technology)、工单管理(action)、工单响应(capability)、工单提升(outcome)；证据：M01-E25；状态：reported。
- **F033** 平台精准识别 23 项高频痛点。实体：网格系统(technology)、23项痛点(target)、痛点识别(outcome)；证据：M01-E26；状态：reported。
- **F034** 23 项高频痛点推动导视系统在两周内完成更新。实体：导视更新(action)、导视系统(target)、两周更新(outcome)；证据：M01-E26；状态：reported。
- **F035** 本地居民月均发起 4.1 次互助请求。实体：南头居民(actor)、居民互助(action)、互助频率(outcome)；证据：M01-E27；状态：reported。
- **F036** 居民互助促成 1472 次线下交互事件。实体：南头居民(actor)、居民互助(action)、线下交互(outcome)；证据：M01-E27；状态：reported。
- **F037** 78% 的线下交互发生在步行 5 分钟范围内。实体：步行5分钟比例(outcome)；证据：M01-E27；状态：reported。
- **F038** UGC 内容池沉淀 359 条在地知识。实体：UGC沉淀(action)、在地知识池(target)、359条(outcome)；证据：M01-E28；状态：reported。

## 6. 过程 C18-P05：2024 获奖与资助

- **F039** 2024 年益创星大赛决赛在深圳大学举行，评选出 18 个获奖项目。实体：南山区民政局(actor)、参赛(action)、益创星2024(context)；证据：M05-E01、M06-E01；状态：implemented。
- **F040** 大赛为获奖项目提供项目奖励金与落地扶持金合计 40 万元。实体：南山区民政局(actor)、慈善信托(actor)、总资助(outcome)；证据：M05-E01、M06-E01；状态：implemented。
- **F041** “方元问问——大模型连接小社区项目”获得赛道金奖。实体：方元问问团队(actor)、参赛(action)、金奖(outcome)；证据：M05-E02、M06-E02；状态：implemented。
- **F042** 深圳商报报道称两个金奖项目获得慈善信托落地扶持资金。实体：慈善信托(actor)、金奖(outcome)、资助争议(outcome)；证据：M05-E03；状态：disputed。
- **F043** 中新网广东报道称金奖“方元问问”与银奖“益心同行”获得落地扶持金。实体：方元问问团队(actor)、慈善信托(actor)、资助争议(outcome)；证据：M06-E03；状态：disputed。
- **F044** 机构文章称“方元问问”与“益心同行”获特别奖，两项目合计 20 万元。实体：方元问问团队(actor)、慈善信托(actor)、特别奖20万(outcome)、资助争议(outcome)；证据：M07-E01；状态：disputed。
- **F045** 机构文章称特别奖由慈善信托直接拨付奖金和落地资助金。实体：慈善信托(actor)、特别奖20万(outcome)；证据：M07-E02；状态：reported。

## 7. 过程 C18-P06：论文总结与边界

- **F046** 作者认为高校场景主要优化个体时空行为，混合社区平台则充当社会连接器。实体：研究团队(actor)、北大社区(context)、南头社区(context)、校社关系(target)；证据：M01-E30；状态：reported。
- **F047** 作者称两处试点路径不同但均展现显著可扩展性。实体：研究团队(actor)、方元问问APP(technology)；证据：M01-E29；状态：reported。
- **F048** 研究尚未在老旧社区、产业园区、农村社区等多类型社区进行全面验证。实体：研究团队(actor)、社区生活圈(context)；证据：M01-E31；状态：reported。
- **F049** 大模型存在幻觉风险，复杂场景效果依赖高质量数据与领域知识。实体：垂域大模型(technology)、幻觉与数据风险(context)；证据：M01-E32；状态：reported。
- **F050** 随机空间干预实验和 A/B 测试被列为未来研究方向。实体：研究团队(actor)、资源优化(capability)；证据：M01-E33；状态：planned。
- **F051** 人在回路机制和社会公平性评估被列为未来改进方向。实体：研究团队(actor)、管理者/规划师(actor)、幻觉与数据风险(context)；证据：M01-E34；状态：planned。

## 8. 过程 C18-P07：2025 扩展期社区活动

- **F052** 2025 年 10 月 27 日，大学城社区党群服务中心启用并举办 WE 社区开放日。实体：桃源街道/大学城社区(actor)、开放日(action)、校社场景(context)；证据：M02-E01、M03-E01；状态：implemented。
- **F053** 北京大学方元问问团队作为“社区主理人”参与开放日。实体：方元问问团队(actor)、团队参与(action)、开放日参与者(actor)；证据：M02-E02、M03-E02；状态：implemented。
- **F054** 团队成员称方元问问小程序用于开放日线上打卡和体验分享。实体：邓稚澄(actor)、方元问问小程序(technology)、打卡分享(capability)、小程序使用(action)；证据：M02-E03、M03-E03、M04-E01；状态：reported。
- **F055** 团队称该小程序使用旨在促进居民与学生互助、加强校社联结。实体：方元问问团队(actor)、方元问问小程序(technology)、校社关系(target)、校社互助(task)；证据：M02-E03、M03-E03、M04-E01；状态：reported。
- **F056** 邓稚澄是北京大学方元问问团队中介绍小程序使用的成员。实体：邓稚澄(actor)、方元问问团队(actor)；证据：M02-E03、M04-E01；状态：reported。

## 9. 需重点核对

1. **APP/小程序**：作为两个技术实体保留；名称相同不等于同一客户端。
2. **研究团队/方元问问团队**：作为两个主体保留；论文作者与2024—2025项目团队可能重叠，但现有证据不足以合并。
3. **资助组合**：F042–F044 均涉及资助，但受助项目和奖项层级不一致，全部保持 `disputed`。
4. **指标独立性**：F024–F029、F032–F038 是作者报告的单项指标；G5 不应把数量指标合并成新的“总体效果”关系。
5. **E35 合并**：已按研究者决定并入 F029，不单列事实。
