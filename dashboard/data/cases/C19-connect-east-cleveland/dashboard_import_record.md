# C19 Dashboard 导入记录

> 导入时间：2026-11-13
> 数据库：`dashboard/data/community-renewal.db`
> 备份：`data/_backup/community-renewal.db.before-c19-2026-11-13T08-51-39.db`
> 版本：`L2-C19-v1.0`

## 1. 数据库写入

| 表 | C19 记录数 |
|---|---|
| cases | 1 |
| entities（case_entities） | 85 |
| entity_roles | 89 |
| materials | 32 |
| evidence | 70 |
| processes | 10 |
| facts | 47 |
| relations | 106 |
| native_concepts | 25 |
| concept_mappings | 40 |
| search_docs | 188 |

共享概念：

- 新增单案例候选：13（`SC-C19-101`–`113`）
- 追加更新的现有概念：14
- 现有概念定义/scope/negative examples：未修改

## 2. 图片

| 文件 | 内容 | 来源 |
|---|---|---|
| `C19-1.jpg` | Public Open House 2.0 现场 | 最终报告 p.54 |
| `C19-2.jpg` | 3D 打印社区模型标记投资位置 | 最终报告 p.62 |
| `C19-3.jpg` | Greenway 概念渲染 | 最终报告 p.80 |
| `C19-4.jpg` | Pocket Park 概念渲染 | 最终报告 p.90 |
| `C19-5.jpg` | Mickey’s Building 改造渲染 | 最终报告 p.4 |

图片已写入 `public/case-media`，并同步到 `dist/case-media`；`shared/case-media.ts` 已登记 C19 媒体条目与来源/credit。

## 3. 验证

- `npm run build`：通过。
- `GET /api/cases/C19`：返回 `name=Connect East Cleveland`、`entityCount=85`、`evidenceCount=70`、`media=5`。
- `GET /case-media/C19-1..5.jpg`：全部 200。
- 关系 source/target、事实 entity_roles/evidence、证据 material/process/fact、原生概念 source_relation、映射 shared_concept 引用完整性：0 错误。
- 数据库备份已生成，导入在事务中完成。
