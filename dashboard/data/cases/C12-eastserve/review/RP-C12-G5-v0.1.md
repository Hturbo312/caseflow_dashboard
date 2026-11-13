# Review Packet

- packet_id: `RP-C12-G5-v0.1`
- skill: `case-knowledge-construction`
- gate: `G5 关系编码`
- case_id: `C12`
- scope: Eastserve（东曼彻斯特）实体关系、谓词、方向、状态与限定
- generated_at: 2026-11-13

## 1. 本轮处理范围

- 输入材料/案例: 已确认的 84 个实体、46 条事实、7 个过程段落
- 已处理: 61 条关系候选；头/尾实体类型；谓词与方向；事实状态；时间/空间/数量限定；证据与过程关联
- 未处理: 关系去重、遗漏、矛盾与方向审校（G6）
- 证据截止时间: 2026-11-13

## 2. 候选摘要

| 状态 | 数量 | 说明 |
|---|---|---|
| implemented | 43 | 组织、资金、部署、培训、签约、清算、收购、升级等已发生关系 |
| planned | 10 | 4,500 户、2,500 台 PC、4,500 培训、设备选项、学习中心、PAYG 覆盖等计划关系 |
| reported_or_opinion | 7 | 3,500 户、3,500 培训、650 报案、“最大网络”“技术已追上我们”等报道性关系 |
| unconfirmed | 1 | `R061` CityServe (999) 与 2014 年 CityServe 业务的法人连续性 |
| disputed | 0 | 本批未使用；冲突在限定与证据说明中保留 |

## 3. 关系聚类

| 聚类 | 关系 | 说明 |
|---|---|---|
| 治理与资金 | R001–R003、R018、R043、R050 | 项目设立、NDC 投标、MCC 问责、NWDA 第三期、NDC 结束 |
| 设备与培训 | R010–R025 | 4,500 户目标、2,500 台 PC、设备选项、学习中心、3 小时培训、20 名冠军 |
| 无线网络与门户 | R023、R026–R030 | 无线部署、定价、500 户宽带、门户第二版、在线报修 |
| 结果与扩展 | R033–R038、R051 | 3,500 户、3,500 台 PC、1,500 户宽带、5,500 套餐、2,000 用户、650 报案 |
| 参与机制 | R039–R041 | ITEM 就业、居民小组建议、社区冠军支持 |
| 组织转折 | R044–R049、R052–R053 | MCIN 接管、Symera 合作、清算、CityServe (999) 清算/解散 |
| 资产转移 | R054–R057、R058–R059 | ITS 收购、36Mbps 升级、Cityserve 品牌与 hotspot |
| 结束 | R060、R061 | Symera 解散；CityServe 法人连续性未确认 |

## 4. 谓词与因果边界

- 谓词为开放集合，共约 30 个，包括 `established_under`、`funded_by`、`targets`、`deploys`、`provides`、`distributes`、`trains`、`covers`、`enters_liquidation`、`acquires`、`upgrades` 等。
- 未使用 `causes`、`leads_to`、`improves` 等因果谓词。
- `R042` 使用 `states_reason`，只记录项目方自述“技术已追上我们”，状态为 reported_or_opinion。
- `R049` 只记录两家公司共用同一清算人，属事实性关联；不据此断言承接/继任。
- `R061` 明确标为 unconfirmed，保留 CityServe 法人连续性的不确定性。

## 5. 冲突、缺口与不确定项

- 计划关系与实施关系分开：R010–R017、R047 为 planned；R019–R031、R048–R060 为 implemented/reported。
- 报道性数量关系（R033–R038、R051）不写成客观完成量。
- 2011–2013 服务状态、Eastserve 服务终止日期仍未确认；本表不建立“服务终止”关系。
- 2003 年无线启用日期未确认；R023 只写“2002 summer”。

## 6. 需要研究者裁决的事项

1. 是否接受 61 条关系候选？
2. 是否接受当前谓词集合与方向（尤其 `targets`、`provides`、`covers`、`operates`）？
3. 是否保留 `R061` 为 unconfirmed 的法人连续性关系？
4. 是否接受 planned/reported 关系不升级为 implemented？
5. 是否进入 G6（去重、遗漏、矛盾与方向审校）？

## 7. 历史影响

- 是否影响既有共享概念: 否。
- 是否影响历史映射: 否。
- 是否触发历史案例回查: 否。
- 影响范围: 新增 C12 关系层；不修改 C01–C11。

## 8. 研究者决定

- 动作: accept / modify / delete / discuss / supplement
- 理由:
- 修改内容:
- 是否允许进入下一阶段: yes / no
- 决定时间:

## 9. 锁定记录

- 冻结产物: 无（等待研究者确认）
- 版本: `relations.md` / `relations.json` v0.1
- 未决事项: 61 条关系的取舍、谓词方向、R061、状态处理、是否进入 G6
