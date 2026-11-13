# C15 春江小区导入记录

> 导入时间：2026-11-13
> 数据库：`dashboard/data/community-renewal.db`
> 备份：`dashboard/data/_backup/community-renewal.db.before-c15-2026-11-13T08-21-03.db`
> 版本：`L2-C15-v1.0`

## 1. 导入结果

| 表 | C15 记录数 |
|---|---:|
| cases | 1 |
| entities / case_entities | 109 |
| materials | 9 |
| evidence | 72 |
| processes | 7 |
| facts | 58 |
| relations | 122 |
| native_concepts | 15 |
| concept_mappings | 15 |
| shared_concepts（C15 活跃候选） | 5 |
| search_docs | 271（case 1、entity 109、evidence 72、fact 58、material 9、native_concept 15、process 7） |

## 2. 关键映射

- 实体：`A01/T01/...` → `C15-actor-001`、`C15-technology-001` 等。
- 证据：`M01-E01` → `C15-M01-E01`。
- 事实：`F001` → `C15-F001`。
- 关系：`R001` → `C15-R001`。
- 原生概念：`NC-C15-01` 保持原编号。
- 映射：`MAP-C15-001` 保持原编号。
- 活跃共享概念候选：`SC-C15-01`、`SC-C15-03`、`SC-C15-06`、`SC-C15-07`、`SC-C15-08`。

## 3. 共享概念修订

- `SC-C01-156 问题核查与闭环处置` 增加负例：`不含居民自主点单/评单的闭环处置`。
- 原负例保留：`未经核实即结案`。
- 未修改定义、未修改历史映射。

## 4. 图片

图片存放：

- `dashboard/public/case-media/C15-1.jpg` … `C15-12.jpg`
- `dashboard/dist/case-media/C15-1.jpg` … `C15-12.jpg`
- 源图与压缩图：`data/cases/C15-chunjiang/materials/assets/`

| 文件 | 内容 | 材料 | 页面地址 |
|---|---|---|---|
| C15-1.jpg | 春江小区住宅外观 | M01 | `/case-media/C15-1.jpg` |
| C15-2.jpg | 春江小巷改造后 | M01 | `/case-media/C15-2.jpg` |
| C15-3.jpg | 春江小巷改造设计草图 | M01 | `/case-media/C15-3.jpg` |
| C15-4.jpg | 春江小区居民议事会（三会征询） | M04 | `/case-media/C15-4.jpg` |
| C15-5.jpg | 春江小亭与居民活动 | M07 | `/case-media/C15-5.jpg` |
| C15-6.jpg | 春江小亭节庆装扮 | M07 | `/case-media/C15-6.jpg` |
| C15-7.jpg | 智慧春江小程序界面 | M08 | `/case-media/C15-7.jpg` |
| C15-8.jpg | 移动建筑垃圾箱 | M08 | `/case-media/C15-8.jpg` |
| C15-9.jpg | 春江小区入口与公共空间 | M09 | `/case-media/C15-9.jpg` |
| C15-10.jpg | 春江小巷照片墙 | M09 | `/case-media/C15-10.jpg` |
| C15-11.jpg | 春江数治网大屏 | M09 | `/case-media/C15-11.jpg` |
| C15-12.jpg | 春江小区非机动车充电棚 | M09 | `/case-media/C15-12.jpg` |

图片元数据写入 `shared/case-media.ts` 的 `CASE_MEDIA.C15`；技术标签写入 `shared/case-tags.ts` 的 `CASE_TECH_TAGS.C15`。

## 5. 验证

- `GET /api/cases/C15`：200；media 12、entities 109、materials 9、evidence 72、processes 7、facts 58、nativeConcepts 15、conceptMappings 15。
- `GET /api/bootstrap`：caseCount 15；C15 entityCount 109、materialCount 9、evidenceCount 72、status frozen。
- 12 张图片 `/case-media/C15-*.jpg` 全部 HTTP 200、`image/jpeg`。
- 关系端点、事实实体角色、证据材料、原生概念来源关系均无孤儿引用。
- `npx tsc --noEmit` 通过。

## 6. 复现

```powershell
cd dashboard
npm run import:c15
```

导入脚本：`scripts/import-c15.ts`

## 7. 说明

- 审核包与决定记录保留在 `data/cases/C15-chunjiang/review/`；本次未写入 `review_packets`/`review_decisions`，与 C12–C14 的导入方式一致。
- 文件级 `L2_pack` 仍是完整交付；数据库是可视化与检索副本。
- 图片为来源文章转载副本，已在 `CASE_MEDIA` 中保留 `sourceUrl`、credit 和下载状态。
