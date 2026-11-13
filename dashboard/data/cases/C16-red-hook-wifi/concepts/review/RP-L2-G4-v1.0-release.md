# Review Packet (Release)

- packet_id: `RP-L2-G4-v1.0`
- skill: `scalable-concept-framework`
- gate: `G4 版本发布`
- case_id: `C16`
- version: `L2-C16-concepts-v1.0`
- released_at: 2026-11-13
- status: released

## 1. 研究者决定

- 动作: `release`
- 研究者回复: “L2-G3 按推荐通过”
- 说明: L2-G3 已于此前确认并冻结；本轮为当前待确认的 L2-G4 发布，故按“按推荐通过”解释为 G4 发布确认。
- 是否发布: `yes`
- 决定时间: 2026-11-13

## 2. 发布范围

- 新增原生概念：9 个（NC-C16-01–09）。
- 新增候选概念：4 个（SC-C16-201–204，`candidate_single_case`）。
- 新增映射：9 条（3 下位、2 部分、4 no_map）。
- 新增网络：18 节点 / 18 边。
- 正式共享概念：0。
- 修改/删除：0。

## 3. 版本与文件

| 项 | 文件 |
|---|---|
| 原生概念盘点 | `concepts/native_concept_inventory_v1.0.md` / `.json` |
| 候选概念 | `concepts/shared_concept_candidates_v1.0.md` / `.json` |
| 映射 | `concepts/concept_mappings_v1.0.md` / `.json` |
| 增量网络 | `concepts/concept_network_v1.0.md` / `.json` |
| 历史回查 | `concepts/historical_review.md` |
| 本体增量 | `concepts/ontology_delta_v1.0.md` / `.json` |
| 版本记录 | `concepts/version_record.md` |
| 审核记录 | `concepts/review/decision-log.md`、`RP-L2-G1…G4` |

## 4. 历史一致性

- C01–C12 的共享概念、原生概念与历史映射未修改。
- 5 条既有映射为加法，不覆盖任何历史映射。
- 4 个候选均无第二案例支持，维持单案例。
- 未触发历史案例重分类。

## 5. 发布边界

- **文件层发布**：`concepts/` 下的候选、映射、网络、本体增量与版本记录。
- **不写入 dashboard SQLite**；候选概念保持非正式状态，不得在页面/接口中标记为正式 `SC-xxx`。
- 如需入库，应另立导入任务并校验候选状态。

## 6. 回滚

- 移除 4 个候选概念节点与 9 条映射边。
- 保留 G1–G3 审核包与 v0.1/v1.0 候选文件作为历史记录。
- C01–C12 不受影响。

## 7. 交接 L3

向 `cross-case-causal-analysis` 交接：

- 9 个 C16 原生概念、4 个单案例候选、9 条映射。
- 18 节点 / 18 边增量网络。
- 历史一致性回查记录与邻近线索（C06 低联网隐私、C12 本地安装就业）。
- 未决问题：4 个候选待第二案例；NC-C16-08 反向机制；PC-C16-01/02 未提升；dashboard 导入未执行。
