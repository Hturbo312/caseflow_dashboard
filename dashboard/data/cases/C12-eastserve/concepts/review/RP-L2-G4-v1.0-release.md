# Review Packet (Release)

- packet_id: `RP-L2-G4-v1.0`
- skill: `scalable-concept-framework`
- gate: `G4 版本发布`
- case_id: `C12`
- version: `L2-C12-shared-v1.0`
- released_at: 2026-11-13
- status: released

## 1. 发布范围

- 新增共享概念：`SC-C12-101`、`SC-C12-102`。
- 新增映射：19 条（C12 14 条 + C01/C07 历史加法 5 条）。
- 修订映射：`MAP-C12-007` 由 `no_map` 改为 `SC-C12-101`。
- 删除：0。
- 未正式化候选：`SC-C12-03`（部分支持）、`SC-C12-04/05/06`（单案例）。

## 2. 版本与文件

| 项 | 文件 |
|---|---|
| 共享概念 | `concepts/shared_concepts_v1.0.json` / `.md` |
| 映射 | `concepts/concept_mappings_v1.0.json` / `.md` |
| 本体增量 | `concepts/ontology_delta_v1.0.json` / `.md` |
| 网络增量 | `concepts/concept_network_v1.0.json` |
| 历史回查 | `concepts/historical_review.md` |
| 版本记录 | `concepts/version_record.md` |

## 3. 历史一致性

- C01–C11 的 43 个共享概念与 724 条映射未修改、未删除。
- 新增 5 条历史加法映射，不覆盖原映射。
- `MAP-C07-technology-003 → SC-C01-133` 标记为 legacy 问题，待后续审校。

## 4. 回滚

- 移除 `SC-C12-101/102` 与 `MAP-C12-001`–`019`。
- 保留 v0.1 映射与 G1/G2/G3 审核包作为历史记录。
- C01–C11 不受影响。

## 5. 交接 L3

向 `cross-case-causal-analysis` 交接：

- 2 个新共享概念、19 条映射、12 个 C12 原生概念。
- 历史一致性回查记录与 legacy 标记。
- 未决候选：`SC-C12-03/04/05/06`。
- 未决问题：2011–2013 服务状态、服务终止日期、CityServe 法人连续性。

## 6. 备注

- 本次发布已写入 dashboard SQLite（`data/community-renewal.db`），数据集标识更新为 `caseflow-c01-c12`。
- 导入前备份：`data/_backup/community-renewal.db.before-c12-2026-11-13T06-54-16.db`。
- 导入规模与校验见 `concepts/sqlite_import_record.md`。
