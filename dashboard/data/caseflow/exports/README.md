# 图 5.1 / 5.2 底表：20 案 × 共享概念

生成日期：2026-11-13
数据源：`dashboard/data/community-renewal.db`（dataset = `caseflow-c01-c20`，20 案）
生成脚本：`dashboard/data/caseflow/figs/export_concepts.py`

## 文件

| 文件 | 内容 |
|---|---|
| `concept_pairs_20cases_60concepts.xlsx` | 主表，含 5 个工作表（见下） |
| `concept_pairs_20cases_60concepts.csv` | 明细的 CSV 版，UTF-8 BOM，可直接用 Excel 打开 |
| `concept_matrix_20x60.csv` | 20 × 60 的 0/1 矩阵，可直接用于作图或重算 Jaccard |

工作簿结构：

- **明细**：一行一个（案例, 概念）对，270 行。列：案例编号 / 概念 ID / 概念名称 / 实体类别 / 来源
- **矩阵**：20 行 × 60 列的概念覆盖 0/1 表
- **概念清单**：60 个概念，含覆盖案例数、覆盖案例列表、review 状态
- **案例计数**：20 个案例的概念数与按实体类别的分布，对应图 5.1 柱状图的分段
- **口径说明**：筛选条件与计数推导

## 口径（与 dashboard 比较辅助一致）

复现 `dashboard/src/lib/compare.ts` 中 `buildProfiles()` 的逻辑：

1. **已确认状态集合** = `accepted` / `approved` / `confirmed` / `frozen` / `researcher_confirmed`（大小写与空格归一后匹配）。
2. **S 集合**：`shared_concepts.review` 属于上述状态，且 `supporting_case_ids` 包含库内案例 → **47 个**。
3. **M 集合**：`concept_mappings.decision` 属于上述状态 → **598 条**。
4. **案例画像**：先由 S 中每个概念的 `supporting_case_ids` 回填到各案，再并入 M 中该案的映射概念。
5. 并集去重 → **60 个共享概念**；合计 **270 个（案例, 概念）对**。

## 与另外两个数字的关系

| 数字 | 含义 | 出处 |
|---|---|---|
| **60** | 已确认口径下的共享概念并集，即图 5.1 柱状图 | 本表 |
| 44 | 通用本体 `SC-C01-*` 子集，比较简布里单独算 Jaccard 用 | `comparison_scope-v0.2.md` |
| 90 | 全部映射（含 `accepted_partial`、`candidate_created` 等未确认决定）去重后的概念数 | 全库统计 |
| 47 | 仅 S 集合（不含映射额外带入的 13 个概念） | 本表 |

换句话说，60 = 47（S）+ 13（只在已确认映射中出现、但概念自身 review 仍为 candidate 的条目）。

## 使用时注意

- 图按"已确认"过滤，因此 C13（14 → 1）、C14（17 → 1）在图上的概念数会显著低于其原生概念数，这是过滤结果，不是案例内容少。
- 36 个概念的 `supporting_case_ids` 与实际映射的案例数不一致；本表以"回填 + 映射取并集"为准，未直接采信该字段。
- `SC-C01-103`（社会经济差异与参与排斥）无任何案例支持，故不在 60 之内。
