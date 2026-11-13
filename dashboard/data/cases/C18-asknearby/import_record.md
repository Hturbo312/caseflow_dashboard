# C18 数据库与图片导入记录

> 状态：已导入并验证
> 时间：2026-11-13

## 数据库

- 数据库：`dashboard/data/community-renewal.db`
- 导入脚本：`dashboard/scripts/import-c18.ts`
- 版本：`L2-C18-v1.0`
- 备份：`dashboard/data/_backup/community-renewal.db.before-c18-2026-11-13T08-37-23.db`

## 导入计数

| 对象 | 数量 |
|---|---:|
| 材料 | 7 |
| 证据 | 51 |
| 过程 | 7 |
| 事实 | 56 |
| 实体 | 83 |
| 实体角色 | 86 |
| 关系 | 101 |
| 原生概念 | 10 |
| 共享概念行 | 8（7 活跃 + 1 保留） |
| 概念映射 | 16 |
| 检索文档 | 215 |

## 共享概念支持

以下 6 个既有共享概念已写入 C18 支持：

- SC-C01-132
- SC-C01-143
- SC-C01-141
- SC-C01-156
- SC-C01-151
- SC-C01-158

## 图片

媒体索引：`dashboard/shared/case-media.ts`

| 文件 | 内容 |
|---|---|
| `C18-1.jpg` | 四层联动技术架构（论文图1） |
| `C18-2.jpg` | 地理邻近性增强多模态RAG框架（论文图2） |
| `C18-3.jpg` | 方元问问APP三类社区应用场景（论文图3） |

## 验证

- `npm run build`：通过
- `/api/bootstrap`：C18 存在，caseCount=18
- `/api/cases/C18`：83 实体、7 材料、51 证据、7 过程、56 事实、10 原生概念、16 映射
- 三张图片：HTTP 200，`image/jpeg`
- 服务：`http://127.0.0.1:8788`，已重启加载新索引
