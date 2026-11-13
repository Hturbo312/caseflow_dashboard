# Review Packet

- packet_id: `RP-L2-G2-v0.1`
- skill: `scalable-concept-framework`
- gate: `G2 共享概念候选 / 概念映射`
- case_id: `C16`
- scope: 4 个共享概念候选、9 条概念映射
- generated_at: 2026-11-13

## 1. 本轮处理范围

- 输入: `native_concept_inventory_v1.0.json`（9 个原生概念）、现有 45 个共享概念条目
- 已处理: 4 个单案例候选、9 条映射（3 下位、2 部分、4 no_map）
- 未处理: 增量网络更新（G3）、版本发布（G4）
- 证据截止: 2026-11-13

## 2. 候选摘要

| 编号 | 候选/映射 | 类型 | 支持案例 | 状态/决定 | 建议动作 |
|---|---|---|---|---|---|
| SC-C16-201 | 本地数字维护者 | actor | C16 | candidate_single_case | accept as candidate |
| SC-C16-202 | 断网本地通信 | capability | C16 | candidate_single_case | accept as candidate |
| SC-C16-203 | 灾时通信据点 | outcome | C16 | candidate_single_case | accept as candidate |
| SC-C16-204 | 商户宿主网络 | action | C16 | candidate_single_case | accept as candidate |
| MAP-C16-001 | NC-01 → SC-C01-114 | native_hyponym | C16 + 既有层 | accepted | accept |
| MAP-C16-002 | NC-02 → no_map | no_map | C16 | keep_native | accept |
| MAP-C16-003 | NC-03 → no_map | no_map | C16 | keep_native | accept |
| MAP-C16-004 | NC-04 → SC-C01-134 | native_hyponym | C16 + 既有层 | accepted | accept |
| MAP-C16-005 | NC-05 → no_map | no_map | C16 | keep_native | accept |
| MAP-C16-006 | NC-06 → no_map | no_map | C16 | keep_native | accept |
| MAP-C16-007 | NC-07 → SC-C01-175 | native_hyponym | C16 + 既有层 | accepted | accept |
| MAP-C16-008 | NC-08 → SC-C01-175 | partial_or_approximate | C16 + 既有层 | accepted_partial | accept |
| MAP-C16-009 | NC-09 → SC-C01-142 | partial_or_approximate | C16 + 既有层 | accepted_partial | accept |

## 3. 冲突、缺口与不确定项

- 来源冲突:
  - 无新增事实冲突；候选概念均以已确认的 110 条关系与 100 条证据为基础。
- 语义边界:
  - `SC-C16-201` 是 actor 角色群体，不能与 `SC-C01-114`（组织）或 `SC-C01-158`（action 培训）合并。
  - `SC-C16-202` 是 capability，不能与 `SC-C01-134`（technology）合并；“断网仍运行”是关键差异。
  - `SC-C16-203` 是灾时临时状态，不能与日常平台运行成果（SC-C01-172）或负面结果（SC-C01-175）合并。
  - `SC-C16-204` 是宿主组织安排，不能与跨组织协作（SC-C01-155）或施工安装（SC-C01-157）整体合并。
- 支持不足:
  - 4 个新候选均只有 C16 一个案例支持；按规则不得确认正式共享概念。
  - `NC-C16-08` 的反向机制（户外覆盖降低室内接入优先级）未被 SC-C01-175 覆盖，暂留原生层，待 L3 处理。
- 历史影响:
  - 本轮不修改任何既有共享概念或历史映射；新增候选与映射均为 C16 加法。

## 4. 需要研究者裁决的事项

1. 是否接受 4 个单案例候选（SC-C16-201–204）为共享概念候选，但不确认正式共享概念？
2. 是否接受 3 条下位映射（NC-01→SC-C01-114、NC-04→SC-C01-134、NC-07→SC-C01-175）？
3. 是否接受 2 条部分映射（NC-08→SC-C01-175、NC-09→SC-C01-142）？
4. 是否接受 4 条 `no_map`（NC-02、NC-03、NC-05、NC-06），并保留对应新候选？
5. 是否进入 G3 增量网络更新？

## 5. 历史影响

- 是否修改既有共享概念: 否。
- 是否修改历史映射: 否。
- 是否触发历史案例回查: 否（G3 将对新候选做历史一致性检查）。
- 影响范围: C16 概念候选与映射；C01–C12 不变。

## 6. 研究者决定

- 动作: accept / modify / delete / discuss / supplement
- 理由:
- 修改内容:
- 是否允许进入下一阶段: yes / no
- 决定时间:

## 7. 锁定记录

- 冻结产物: 无（等待研究者确认）
- 版本: `shared_concept_candidates_v0.1.*`、`concept_mappings_v0.1.*`
- 未决事项: 4 个单案例候选、4 个 no_map、NC-08 反向机制
