# Review Packet

- packet_id: `RP-C16-G1-v0.1`
- skill: `case-knowledge-construction`
- gate: `G1 材料整理`
- case_id: `C16`
- scope: Red Hook WiFi 材料登记、来源核验、相关性与覆盖范围
- generated_at: 2026-11-13

## 1. 本轮处理范围

- 输入材料/案例: 2026-11-13 检索取得的项目方页面、合作机构发布、政府页面、独立媒体与二次汇编
- 已处理: 18 份材料登记（M01–M18）、7 项拒绝/去重记录、关键口径初步核对、覆盖评估
- 未处理: 逐条证据定位（G2）、过程重建（G3）、事实拆解（G4）、关系编码与审校（G5/G6）
- 证据截止时间: 2026-11-13

## 2. 候选摘要

| 编号 | 候选内容 | 证据/位置 | 事实状态 | 置信度 | 建议动作 |
|---|---|---|---|---|---|
| C16-MAT-01 | 登记项目方/合作机构一手材料 M01–M09（案例研究、访谈、新闻稿、年报、官网 5 页） | `materials.md` 第 2 节 | unconfirmed | 高 | accept |
| C16-MAT-02 | 登记独立/地方媒体 M10–M15（NYT、Orion、Brooklyn Reporter、My NYC Story、Inverse、The Verge） | `materials.md` 第 2 节 | unconfirmed | 高 | accept |
| C16-MAT-03 | 登记政府项目页 M16（NYC CDBGDR RISE:NYC） | `materials.md` 第 2 节 | unconfirmed | 高 | accept |
| C16-MAT-04 | 登记低可靠性参考 M17（Wikipedia）、M18（Resilient Comms），仅用于线索与冲突对照 | `materials.md` 第 2 节 | unconfirmed | 中 | discuss |
| C16-MAT-05 | 拒绝 S11（400）、S13（CAPTCHA）、S14（空壳）、S17（重复）、S22（验证页）、S07b（429）、S24（Access Denied） | `materials.md` 第 4 节 | unconfirmed | 高 | accept |
| C16-MAT-06 | M10 NYT 仅为付费墙预览，标为部分可读 | `materials.md` M10 | unconfirmed | 高 | discuss |
| C16-MAT-07 | 关键口径按“站点/路由器/规划目标/宿主数”“连接/到访/求助人数”拆分 | `materials.md` 第 3 节 | unconfirmed | 中高 | accept |

## 3. 冲突、缺口与不确定项

- 来源冲突:
  - 起点：2011-11（M17 信息框）/ 2011 秋接触与采购（M01、M11）/ 2011-12 首测节点（M15）。
  - Sandy 每日用户：300 人/日（M01）/ 1,000 人/日（M15）/ 1,200 人/日到 RHI 求助（M11）。
  - 节点规模：近 20 站点（M15）/ 40+ 接入点与 14 热点为规划目标（M06）/ 峰值约 40 节点（M18）/ 近两打路由器（M11）/ 38 家商户宿主（M04、M08）。
  - 人口：约 11,000 居民、近 70% 住公共住宅（M10）/ Red Hook Houses 及周边约 5,000 人（M01）。
  - 运营主体：RHI 社区主导（M05、M07）/ 2019 年后 Sky Packets 运营（M15）。
  - Digital Stewards 周期：一年期 fellowship（M02）/ 8 个月带薪培训（M04、M08）。
- 证据缺口:
  - RISE:NYC 获奖名单、单项拨款合同与 CDBG-DR 支出文件。
  - NYCHA 对 Red Hook Houses 准入的往来文件。
  - RHI 与 Sky Packets 的移交/运营协议。
  - 2018–2023 年节点清单、活跃用户、流量与停机记录。
  - 2011–2012 年设备清单、网络图、工作坊记录、Tidepools 需求文档。
  - RHI 2013–2016 年报、OTI 课程评估。
- 时间线冲突:
  - “接触 OTI”“采购设备”“首节点安装”“正式建立”被不同材料压成同一时间点。
  - M09 的 2018-09-05 是站点迁移后的统一日期，不是被索引报道的原始日期。
- 类别/关系不确定:
  - Red Hook WiFi（项目/网络/品牌）、RHI（所有权与发起）、OTI（技术合作）、Sky Packets（后期运营）需分开。
  - Commotion（固件）、Ubiquiti/Nanostation（设备）、Tidepools（平台）、Digital Stewards（培训项目）分属不同类别。
  - Red Hook Houses 是目标作用对象与制度障碍，不是已覆盖区域。
- 需要补充的材料:
  - NYCEDC 2015 年完整获奖公告与单项金额；HUD/CDBG-DR 合同。
  - NYT 2014 全文、TechPresident 2012 原文、redhookwifi.org 历史快照。
  - RHI/OTI 项目评估与 2019 年移交文件。

## 4. 需要研究者裁决的事项

1. **材料纳入**：是否确认 M01–M18 共 18 份，并按第 4 节拒绝 7 项？
2. **低可靠性材料**：M17（Wikipedia）与 M18（Resilient Comms）保留为“仅作线索/冲突对照”（推荐），还是排除？
3. **NYT 部分可读**：M10 以付费墙预览登记（推荐），还是必须补全全文后才进入 G2？
4. **RISE:NYC 金额**：在仅有 M15 单一来源时，按“报道性”记录 400 万/100 万美元（推荐），还是等合同文件再编码？
5. **进入 G2 的覆盖条件**：现有 18 份材料是否足以进入证据提取（推荐 yes，缺口列入 G2 待补），还是先补 2011–2012 项目原始文件？

## 5. 历史影响

- 是否影响既有共享概念: 否。G1 尚未产生原生概念或映射。
- 是否影响历史映射: 否。
- 是否触发历史案例回查: 否。C16 与 C12、C13 的比较关系留待 L2。
- 影响范围: 新增 C16 材料登记；不修改 C01–C15。

## 6. 研究者决定

- 动作: accept / modify / delete / discuss / supplement
- 理由:
- 修改内容:
- 是否允许进入下一阶段: yes / no
- 决定时间:

## 7. 锁定记录

- 冻结产物: 无（等待研究者确认）
- 版本: `materials.md` v0.1、`materials.json` v0.1（候选）
- 未决事项: 低可靠性材料去留、NYT 补全、RISE 金额口径、G2 覆盖条件
