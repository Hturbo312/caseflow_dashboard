# Review Packet (Release Candidate)

- packet_id: `RP-L2-G4-v0.1`
- skill: `scalable-concept-framework`
- gate: `G4 版本发布`
- case_id: `C16`
- version: `L2-C16-concepts-v1.0`
- generated_at: 2026-11-13
- status: candidate_release_pending_researcher

## 1. 发布范围

- 新增原生概念：9 个（NC-C16-01–09）。
- 新增候选概念：4 个（SC-C16-201–204，`candidate_single_case`）。
- 新增映射：9 条（3 下位、2 部分、4 no_map）。
- 新增网络：18 节点 / 18 边。
- 正式共享概念：0。
- 修改/删除：0。

## 2. 版本与文件

| 项 | 文件 |
|---|---|
| 原生概念盘点 | `concepts/native_concept_inventory_v1.0.md` / `.json` |
| 候选概念 | `concepts/shared_concept_candidates_v1.0.md` / `.json` |
| 映射 | `concepts/concept_mappings_v1.0.md` / `.json` |
| 增量网络 | `concepts/concept_network_v1.0.md` / `.json` |
| 历史回查 | `concepts/historical_review.md` |
| 本体增量 | `concepts/ontology_delta_v1.0.md` / `.json` |
| 版本记录 | `concepts/version_record.md` |

## 3. 历史一致性

- C01–C12 的共享概念与历史映射未修改。
- 5 条既有映射为加法。
- 4 个候选均无第二案例支持，维持单案例。

## 4. 发布边界

- 文件层发布，不写入 dashboard SQLite。
- 候选概念保持非正式状态，不得在页面/接口中被标为正式 `SC-xxx`。
- 若后续导入 dashboard，需另立导入记录并校验候选状态。

## 5. 回滚

- 移除 4 个候选节点与 9 条映射边。
- 保留 G1–G3 审核包与 v0.1/v1.0 候选文件。
- C01–C12 不受影响。

## 6. 需要研究者裁决的事项

1. 是否确认版本号 `L2-C16-concepts-v1.0`？
2. 是否确认“文件层发布、不写入 SQLite”的发布边界？
3. 是否确认 4 个候选保持非正式状态、不升级为正式共享概念？
4. 是否确认 G4 发布并关闭本轮 L2？
5. 是否需要在后续另立 dashboard 导入任务？

## 7. 研究者决定

- 动作: release / modify / hold
- 理由:
- 修改内容:
- 是否发布: yes / no
- 决定时间:

## 8. 锁定记录

- 冻结产物: 无（等待研究者确认）
- 版本: `L2-C16-concepts-v1.0`
- 未决事项: 4 个单案例候选、NC-C16-08 反向机制、PC-C16-01/02、dashboard 导入
