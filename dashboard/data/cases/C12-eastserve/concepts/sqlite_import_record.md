# C12 SQLite 导入记录

- 导入时间：2026-11-13
- 数据库：`data/community-renewal.db`
- 备份：`data/_backup/community-renewal.db.before-c12-2026-11-13T06-54-16.db`
- 导入脚本：`scripts/import-c12.ts`
- 数据集标识：`caseflow-c01-c12`

## 写入规模

| 表 | C12 记录数 |
|---|---|
| cases | 1 |
| entities | 84 |
| entity_roles | 按角色数 |
| case_entities | 84 |
| materials | 23 |
| evidence | 89 |
| processes | 7 |
| facts | 46 |
| relations | 73 |
| relation_process_links | 78 |
| relation_evidence_links | 88 |
| native_concepts | 12 |
| shared_concepts | 2 |
| concept_mappings | 19 |
| search_docs | 197（case 1、entity 84、evidence 89、material 23） |

## 校验结果

- `PRAGMA integrity_check`：`ok`
- 关系端点缺失：0
- 证据—材料悬空：0
- 映射—原生概念悬空：0
- 映射—共享概念悬空：0
- 关系—过程/证据链接悬空：0
- `native_concepts.source_relation_ids` 悬空：0
- `shared_concepts.supporting_native_ids` 悬空：0
- API `/api/health`：`dataset=caseflow-c01-c12`，`materialCount=241`，`evidenceCount=993`
- API `/api/cases/C12`：返回 84 实体、23 材料、89 证据、7 过程
- 页面：案例总数 12，显示 Eastserve；关系标签更新为 `C01–C12`
- 搜索：`Eastserve` 返回 12 条命中

## 说明

- 导入为单事务，先备份后写入。
- 重复运行 `npx tsx scripts/import-c12.ts` 会先删除 C12 相关记录再重建，保持幂等。
- 未修改 C01–C11 的案例、材料、证据、关系或历史映射。
