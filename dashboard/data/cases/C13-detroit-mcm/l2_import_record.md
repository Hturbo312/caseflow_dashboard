# C13 Dashboard 导入记录

> 日期：2026-11-13
> 数据库：`dashboard/data/community-renewal.db`
> 导入脚本：`dashboard/scripts/import-c13.ts`
> 备份：`data/_backup/community-renewal.db.before-c13-2026-11-13T07-24-32.db`

## 1. 导入内容

| 对象 | 数量 | 数据库表 |
|---|---|---|
| 案例 | 1 | `cases` |
| 实体 | 75 | `entities` / `case_entities` / `entity_roles` |
| 关系 | 86 | `relations` |
| 事实 | 58 | `facts` |
| 过程 | 9 | `processes` |
| 证据 | 66 | `evidence` |
| 材料 | 17 | `materials` |
| 原生概念 | 10 | `native_concepts` |
| 共享概念候选 | 8 | `shared_concepts` |
| 概念映射 | 14 | `concept_mappings` |
| 搜索文档 | 159 | `search_docs` / `vec_search` |

导入后全库：13 案、883 实体、601 关系、294 事实、102 过程、1059 证据、258 材料、746 原生概念、53 共享概念、757 映射。

## 2. 图片

| 项 | 内容 |
|---|---|
| 文件 | `dashboard/public/case-media/C13.jpg` |
| 尺寸 | 1600×1143 |
| 来源 | DBRTF Plan (2014), Chapter 3, PDF p.3 |
| 内容 | Motor City Mapping 外业数据 mission control（TechTown） |
| 登记 | `shared/case-media.ts` 的 `C13` 条目 |
| 构建 | `npm run build` 后复制到 `dist/case-media/C13.jpg` |
| 验证 | `GET /case-media/C13.jpg` → 200 image/jpeg；抽屉内 `naturalWidth=1600` |

## 3. 验证结果

- `GET /api/health`：`dataset = caseflow-c01-c13`，materials 258，evidence 1059。
- `GET /api/cases/C13`：entityCount 75、materialCount 17、evidenceCount 66、processes 9、facts 58、nativeConcepts 10、conceptMappings 14。
- `GET /api/search?q=Motor City Mapping`：返回 C13 材料与证据。
- 前端图谱印章：`601 条关系 · C01–C13`（已把硬编码 C01–C12 改为按案例数据生成）。
- 案例抽屉可打开，显示 75 实体 / 17 材料 / 66 证据 / 2013—2015 年，并显示 C13 图片。

## 4. 未执行

- 未导入 `l2_ontology_delta` 以外的跨案例汇总版本（`L2-C01-C13-shared-v1.0`）；当前共享概念层以 53 个节点为库内现状。
- 未把 C13 追加到 6 个既有共享概念的 `supporting_case_ids`；该决定留待更多案例。
