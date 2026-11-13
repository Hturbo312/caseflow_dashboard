# C16 SQLite 导入记录

> 导入时间：2026-11-13
> 数据库：`data/community-renewal.db`
> 数据集标识：`caseflow-c01-c17`

## 1. 导入前备份

- 首次导入：`data/_backup/community-renewal.db.before-c16-2026-11-13T08-28-46.db`
- 修正证据强度后重导：`data/_backup/community-renewal.db.before-c16-2026-11-13T08-35-36.db`

## 2. 导入规模

| 对象 | 数量 |
|---|---:|
| 案例 | 1（C16） |
| 材料 | 18 |
| 证据 | 100 |
| 过程 | 10 |
| 实体 | 89 |
| 事实 | 53 |
| 关系 | 110 |
| 原生概念 | 9 |
| 共享概念候选 | 4（`SC-C16-201–204`，`candidate_single_case`） |
| 概念映射 | 9 |

## 3. 图片

| 文件 | 内容 | 来源/许可 |
|---|---|---|
| `public/case-media/C16-1.jpg` | RHI 屋顶首个 mesh 节点 | Alyx Baldwin / Wikimedia Commons, CC BY-SA 4.0 |
| `public/case-media/C16-2.jpg` | Coffey Park 北侧屋顶 PoE 布线 | Alyx Baldwin / Wikimedia Commons, CC BY-SA 4.0 |
| `public/case-media/C16-3.jpg` | Sandy 后维修 Coffey Park 节点 | Alyx Baldwin / Wikimedia Commons, CC BY-SA 4.0 |
| `public/case-media/C16-4.jpg` | Red Hook WiFi 覆盖地图 | Red Hook Initiative / redhookwifi.org |
| `public/case-media/C16-5.jpg` | Red Hook Digital Stewards 团队 | Red Hook Initiative / redhookwifi.org |

图片同时复制到 `dist/case-media/`，由 `/case-media/C16-*.jpg` 提供。

## 4. 校验

- `PRAGMA integrity_check`：`ok`
- `PRAGMA foreign_key_check`：0 条
- C16 悬空关系端点：0
- C16 悬空证据材料：0
- C16 悬空映射原生/共享概念：0
- 证据强度：high 82、medium 15、low 3；`verified_text` 97、`partial_text_paywall` 3
- API `/api/health`：`dataset=caseflow-c01-c17`、`evidenceCount=1287`
- API `/api/cases/C16`：89 实体、53 事实、10 过程、100 证据、9 原生概念、9 映射、5 媒体
- 5 张图片 HTTP HEAD：均 200、`image/jpeg`
- 前端截图：C16 卡片显示首节点图片与案例信息

## 5. 并发说明

导入期间 C17（Ramani Huria）也完成了导入并更新了 `meta.dataset`。为避免覆盖，本记录将数据集标识统一为 `caseflow-c01-c17`，并在 `dataset_note` 中同时列出 C16 与 C17。C16 与 C17 的实体、关系、证据与概念数据均保留。C16 首次导入后发现证据强度未按 `confidence` 映射，已于 08:35:36 重导修正。

## 6. 回滚

如需回滚 C16：

- 使用备份 `community-renewal.db.before-c16-2026-11-13T08-28-46.db` 恢复；或
- 删除 `case_id='C16'` 的材料、证据、过程、事实、关系、实体与概念记录，删除 `SC-C16-%` 与 `MAP-C16-%`，保留 C01–C15、C17。
