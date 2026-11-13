# Review Packet

- packet_id: `RP-C13-G1-v0.1`
- skill: `case-knowledge-construction`
- gate: `G1 材料整理`
- case_id: `C13`
- scope: Motor City Mapping 材料登记、质量核验与覆盖评估
- generated_at: 2026-11-13

## 1. 本轮处理范围

- 输入材料/案例: 公开网页、Wayback 快照、DBRTF 报告分章 PDF、D3 博客、NYT/NPR
- 已处理: 17 份材料的标题、来源、作者、日期、链接、覆盖范围、可靠性、核验状态；口径核对；去重与拒绝记录
- 未处理: 证据逐条定位（G2）、过程重建（G3）、事实拆解（G4）、关系编码与审校（G5/G6）
- 证据截止时间: 2026-11-13

## 2. 候选摘要

| 编号 | 候选内容 | 证据/位置 | 事实状态 | 置信度 | 建议动作 |
|---|---|---|---|---|---|
| M01 | DBRTF 报告 14 章 177 页，含 84,641 口径、MCM 方法、MCI/SATT、资金与建议 | `materials/m19_CHAPTER_00–13.pdf` | unconfirmed | 高 | accept |
| M02 | 任务组 FAQ：时间线、定义、口径、Phase II | `materials/m11_ttb_faq.html` | unconfirmed | 高 | accept |
| M03 | 任务组首页：使命与目标 | `materials/m09_timetoendblight_20140429.html` | unconfirmed | 高 | accept |
| M04 | 任务组 Community：2013-09-27 受命；78,000/91,000 早期估计 | `materials/m12_ttb_community.html` | unconfirmed | 高 | accept |
| M05 | 任务组 Press Room：2014-02 至 03 报道索引 | `materials/m14_ttb_press.html` | unconfirmed | 中高 | accept |
| M06 | MCM About：150 名调查员、Phase 2、质检分工 | `materials/m08_mcm_about.html` | unconfirmed | 高 | accept |
| M07 | MCM 2014 首页：查询字段与图层 | `materials/m01_mcm_home_20141216.html` | unconfirmed | 高 | accept |
| M08 | MCM 2015 首页：Site Control、拆除/销售图层 | `materials/m13_mcm_home_20150906.html` | unconfirmed | 高 | accept |
| M09 | MCM 博客：2015 止赎调查，技术能力复用 | `materials/m25_mcm_blog_2015.html` | unconfirmed | 高 | accept |
| M10 | Blexting 62 页培训手册：字段定义与质检 | `materials/m15_blexting_basics.pdf` | unconfirmed | 高 | accept |
| M11 | D3 回顾：200 人、380,000 地块、30+ 数据集、2014-07 上线 | `materials/m07_d3_fourseasons.html` | unconfirmed | 中高 | accept |
| M12 | D3 回顾：15 组织、260+ 居民、76,000+ 地块 | `materials/m03_d3_minigrant_20141223.html` | unconfirmed | 中高 | accept |
| M13 | NYT：380,217 地块、75 个三人小组 | `materials/m_nyt_20140217.html` | unconfirmed | 高 | discuss（仅预览） |
| M14 | NPR：80,000 栋估计、联邦与基金会发起 | `materials/m20_npr_20140214.html` | unconfirmed | 高 | accept |
| M15 | 2009 住宅地块普查元数据 | `materials/m24_d3_portal_drps.html` | unconfirmed | 中 | discuss（仅元数据） |
| M16 | 止赎统计 PDF | `materials/m16_tax_foreclosure_stats.pdf` | unconfirmed | 中高 | accept |
| M17 | 任务组成员背景 | `materials/m10_ttb_about.html` | unconfirmed | 高 | accept |

## 3. 冲突、缺口与不确定项

- 来源冲突:
  - 地块总数：报告 380,233 / NYT 380,217 / 通称 380,000。
  - 调查员：150 名调查员 / 200 人总团队 / 最多 75 个三人小组。
  - 数据集：报告 24 个（16 个用于定义破败、8 个留待下一阶段）/ D3 30+ 个。
  - 破败规模：84,641 最终口径 / 约 80,000 栋 / 78,000 栋 + 91,000 空地。
- 证据缺口:
  - 报告第 12 章附录为图像，页码与表格引用受限。
  - 2016–2017 年平台连续证据缺失，技术影响观察期可能无法充分覆盖。
  - DLBA 使用 MCM 数据的直接文件缺失。
- 时间线冲突:
  - NPR 页面标注 2014-02-18，但 URL 与首发时间为 2014-02-14；需按页面标注记录并注明首发。
  - Wayback 快照时间普遍晚于页面内容时间。
- 类别/关系不确定:
  - MCM 同时是项目名、网站名与数据集名；M01 中的 "MCM" 有时指团队、有时指数据库。
  - "Blexting" 是应用，"Site Control" 是平台，"MCM" 是项目/品牌，需在 G4/G5 拆分。
- 需要补充的材料:
  - 见 `materials.md` 第 6 节 6 项。

## 4. 需要研究者裁决的事项

1. **纳入范围**：是否确认 M01–M17 共 17 份材料纳入？其中 M05 仅作媒体索引、M13 仅预览、M15 仅元数据。
2. **NYT 处理**：接受预览作为“报道/观点”证据（推荐），还是必须补齐全文后才纳入？
3. **2016–2017 观察期**：现有材料不足，是否接受“以可得快照为限、缺口留在 G2 待补”，还是本轮先补材料？
4. **学术文献**：G1 是否现在补充同行评议研究，还是留到 G6 后的外部效度检查？
5. **报告附录**：第 12 章图像页是否需要 OCR 或另寻可读版本后再进入 G2？

## 5. 历史影响

- 是否影响既有共享概念: 否。
- 是否影响历史映射: 否。
- 是否触发历史案例回查: 否。
- 影响范围: 仅新增 C13 材料登记；不修改 C01–C12。

## 6. 研究者决定

- 动作: accept / modify / delete / discuss / supplement
- 理由:
- 修改内容:
- 是否允许进入下一阶段: yes / no
- 决定时间:

## 7. 锁定记录

- 冻结产物: 无（等待研究者确认）
- 版本: `materials.md` / `materials.json` v0.1
- 未决事项: 纳入范围、NYT 预览、观察期材料、学术文献、报告附录
