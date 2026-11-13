# C15 春江小区知识网络增量（L2-G3 确认版 v1.1）

> 状态：L2-G3 已确认；G4 编号对账后更新候选编号。
> 本体版本：V4；案例层版本：L2-C15-v1.0。

## 1. 增量

| 层 | 新增 | 修改 | 删除 |
|---|---:|---:|---:|
| 原生实体 | 109 | 0 | 0 |
| 原生关系 | 122 | 0 | 0 |
| 原生概念 | 15 | 0 | 0 |
| 概念映射 | 15 | 0 | 0 |
| 活跃共享概念候选 | 5 | 0 | 0 |
| 既有共享概念 | 0 | 0 | 0 |
| 历史映射 | 0 | 0 | 0 |

## 2. 候选编号对账

- 活跃候选：SC-C15-01, SC-C15-03, SC-C15-06, SC-C15-07, SC-C15-08
- 保留候选：SC-C15-02, SC-C15-04, SC-C15-05
- 原因：L1 native_concepts.json used SC-C15-02/04/05 for three different candidate labels; L2-G2 reused those IDs for new labels.
- 处理：Keep SC-C15-01 and SC-C15-03; add SC-C15-06/07/08 for new labels; hold SC-C15-02/04/05 as not carried forward.

## 3. 历史回查

- 共享概念：7 个
- 历史映射：125 条
- 案例：14 个
- 定义修改：0
- 映射修改：0

## 4. 未决

- 4 hyponym mappings versus historical all-partial usage
- Whether to add a negative example to SC-C01-156
- 5 candidates require a second case
- Whether to import file-level delta into dashboard SQLite
- Platform and organizational continuity gaps
