# C12 概念层版本记录（已发布）

## 版本

- 前一版本：`L2-C01-C11-shared-v0.2`（43 个共享概念、724 条映射）
- 新版本：`L2-C12-shared-v1.0`
- 发布日期：2026-11-13
- 状态：`released`

## 变更范围

- 新增共享概念：`SC-C12-101`、`SC-C12-102`。
- 新增映射：19 条（C12 14 条 + C01/C07 历史加法 5 条）。
- 修订映射：`MAP-C12-007` 由 `no_map` 改为 `SC-C12-101`。
- 删除：0。
- 未确认候选：`SC-C12-03`（部分支持）、`SC-C12-04/05/06`（单案例）。

## 历史一致性

- C01–C11 的 43 个共享概念与 724 条映射未修改、未删除。
- 新增历史映射均为加法，不覆盖原映射。
- `MAP-C07-technology-003 → SC-C01-133` 标记为 legacy 问题，待后续审校。

## 回滚方案

若 G3/G4 未通过：

- 移除 `SC-C12-101/102`。
- 移除 `MAP-C12-001`–`019`。
- 保留 `concept_mappings.json` v0.1 与 `shared_concept_candidates.json` v1.0 作为历史记录。
- C01–C11 不受影响。

## 发布边界

- 本次发布已写入 dashboard SQLite（`data/community-renewal.db`），数据集标识更新为 `caseflow-c01-c12`。
- 导入前已备份：`data/_backup/community-renewal.db.before-c12-2026-11-13T06-54-16.db`。
- 写入规模：C12 案例 1、实体 84、材料 23、证据 89、过程 7、事实 46、关系 73、原生概念 12、共享概念 2、映射 19。
- 校验：`PRAGMA integrity_check=ok`，悬空引用 0；API `/api/cases/C12` 与页面均可见。
- 详见 `concepts/sqlite_import_record.md`。

## 未决事项

- 历史加法映射 `MAP-C12-015`–`019` 是否全部接受。
- `MAP-C07-technology-003` 的 legacy 映射是否进入后续审校。
- `SC-C12-03` 是否等待第二案例。
- `SC-C12-04/05/06` 是否保留为单案例候选。
