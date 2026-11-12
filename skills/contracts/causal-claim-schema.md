# Causal Claim Schema

跨案例因果分析专用契约。基础关系表只记录事实、行动、状态和证据；因果判断单独记录在 `CC-xxx` 中。

## 1. 因果阶梯

> 观察 → 模式 → 机制假设 → 因果主张 → 因果结论

| 层级 | 最低要求 | 允许的结论 |
|---|---|---|
| 观察 | 证据可定位 | 某事件/行动/结果存在 |
| 模式 | 跨案例或子图/路径上重复出现 | 某关系组合反复出现 |
| 机制假设 | 有中间过程链，每一环有证据 | 可能存在某机制 |
| 因果主张 | 有竞争解释、反事实或对照案例 | 该机制比替代解释更可信 |
| 因果结论 | 研究者确认，含边界、置信度和反证条件 | 在该范围内成立 |

缺任何一项，最多停在机制假设。不得从「相关/同时出现」直接跳到因果结论。

## 2. 记录格式

```yaml
causal_claim:
  id: CC-xxx
  comparison_id: CMP-xxx
  case_ids: []
  cause: ""
  effect: ""
  mechanism_chain: []
  evidence_ids: []
  alternative_explanations: []
  counterfactual_or_contrast: ""
  status: hypothesis | supported | conclusion | refuted
  confidence: low | medium | high
  boundary_conditions: []
  what_would_change_mind: []
  researcher_decision: accept | modify | discuss | reject
  notes: ""
```

## 3. 证据标准

每条因果主张至少检查：

1. **时间顺序**：原因是否早于结果。
2. **机制链**：从原因到结果之间有哪些行动、决策或状态变化，每一环是否有证据。
3. **证据状态**：引用的证据是否已核实；`reported_or_opinion`、`planned`、`disputed`、`unconfirmed` 不能当作已实施因果链的硬证据。
4. **竞争解释**：还有哪些因素可能解释同一结果；为什么当前解释更可信。
5. **反事实或对照**：如果没有该原因，结果可能如何；是否有相似案例形成对照。
6. **边界条件**：机制在什么情境、主体、技术条件或时间范围内成立。
7. **反证条件**：什么证据会推翻该结论。

## 4. 引导式追问

允许智能体主动追问。每个问题记录为 `Q-xxx`：

```yaml
question:
  id: Q-xxx
  causal_claim_id: CC-xxx
  type: mechanism | counterfactual | rival_explanation | falsification | boundary
  question: ""
  rationale: ""
  answer: ""
  evidence_ids: []
  status: supported | contradicted | missing_evidence | unresolved
```

五类问题：

- **机制**：从原因到结果，中间经过了哪些行动、决策或状态变化？
- **反事实**：如果去掉这个原因，哪个环节会不同？
- **竞争解释**：还有哪些因素可能解释同一结果？
- **反证**：什么证据会推翻这个判断？
- **边界**：这个机制在什么条件下成立或不成立？

智能体可以主动发起问题，但必须：

- 同时询问支持证据和反驳证据；
- 不把研究者的预期写成问题前提；
- 对预设立场、只问支持证据或缺少替代解释的问题发出 `leading_question` 警告，并给出中性改写；
- 把回答标为 `supported / contradicted / missing_evidence / unresolved`。

## 5. 结论边界

- `hypothesis`：机制链尚不完整，或竞争解释未检查。
- `supported`：机制链和证据较强，但还不足以称为结论。
- `conclusion`：研究者确认，竞争解释、反事实/对照、边界条件和反证条件均已记录。
- `refuted`：已有证据足以否定该主张；保留记录，不删除历史。

## 6. 禁止事项

- 不把 `CausalClaim` 写成普通 `Rxxx` 关系。
- 不把观点/报道中的因果说法当作已证实机制。
- 不因 Jaccard 相似度高就推断因果。
- 不为了让子图连通而补造关系。
- 不用引导式问题替代证据。
