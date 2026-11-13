# C12 增量接入的历史映射回查

> 时间：2026-11-13
> 范围：C01、C07 中与新共享概念 SC-C12-101/102 相关的原生概念
> 原则：只做加法映射与问题标记，不覆盖既有映射。

## 1. C07 家庭数字设备

- 原生概念：`NC-C07-technology-005 家庭数字设备`
- 既有映射：`no_map`（`MAP-C07-technology-005`，版本 `L2-C01-C11-shared-v0.2`）
- 新共享概念：`SC-C12-101 家庭数字终端部署与接入`
- 判断：C07 的家庭数字设备是“家庭数字终端”的下位实例，原 `no_map` 可由新概念覆盖。
- 处理：新增 `MAP-C12-015`（C07 → SC-C12-101，`native_hyponym`，`proposed_additive`）。原 `no_map` 保留为历史记录，待研究者确认是否标记为“已被新概念部分覆盖”。

## 2. C07 机顶盒及相关网络服务部署

- 原生概念：`NC-C07-action-002 机顶盒及相关网络服务部署`
- 既有映射：`SC-C01-157 空间设施施工与实体更新`（`partial_or_approximate`）
- 新共享概念：`SC-C12-101`
- 判断：既有映射只覆盖“设施部署”成分；新概念更贴近“家庭终端部署”成分。
- 处理：新增 `MAP-C12-016`（C07 → SC-C12-101，`partial_or_approximate`，`proposed_additive`）。不删除既有映射。

## 3. C07 Carpenters Connect

- 原生概念：`NC-C07-technology-003 Carpenters Connect`
- 既有映射：`SC-C01-133 传感监测与异常识别设备`（`partial_or_approximate`）
- 新共享概念：`SC-C12-102 社区门户与本地公共服务入口`
- 判断：Carpenters Connect 是社区门户/数字接入平台，与“传感监测与异常识别设备”语义距离较大；既有映射存疑，但不能直接覆盖。
- 处理：新增 `MAP-C12-019`（C07 → SC-C12-102，`partial_or_approximate`，`proposed_additive`）；同时把 `MAP-C07-technology-003` 标为“legacy mapping flagged for review”。

## 4. C01 虚拟社区门户/平台

- 原生概念：`NC-C01-technology-006 虚拟社区门户`、`NC-C01-technology-009 虚拟社区平台`
- 既有映射：`SC-C01-131 数字参与与可视化工具`（`partial_or_approximate`）
- 新共享概念：`SC-C12-102`
- 判断：C01 门户既是参与工具，也承担本地信息/服务入口；新概念只覆盖“门户入口”成分。
- 处理：新增 `MAP-C12-017`、`MAP-C12-018`（C01 → SC-C12-102，`partial_or_approximate`，`proposed_additive`）。既有 `SC-C01-131` 映射保留。

## 5. C01 Sonera 网络运营合作

- 原生概念：`NC-C01-action-004 Sonera前期网络运营合作`
- 既有映射：`SC-C01-155 跨组织协作与信息协调`（`partial_or_approximate`）
- 候选：`SC-C12-03 公共数字项目运营转换`（部分支持，未正式确认）
- 判断：C01 是公私网络运营合作，不是“公共项目→私营运营”的完整转换，只能作为部分支持。
- 处理：本轮不新增映射；保留 `SC-C12-03` 为 `candidate_partial_support`，待第二案例或研究者裁定。

## 6. 回查结论

- 未修改或删除 C01–C11 的任何既有映射。
- 新增 5 条历史加法映射（`MAP-C12-015`–`019`），均为 `proposed_additive`，待研究者确认。
- 标记 1 条 legacy 映射问题：`MAP-C07-technology-003` → `SC-C01-133` 语义可疑。
- 新共享概念 `SC-C12-101/102` 不覆盖历史概念边界；C01/C07 原有映射继续有效，新增映射只补充语义成分。
