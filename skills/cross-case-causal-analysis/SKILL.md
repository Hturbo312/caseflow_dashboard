---
name: cross-case-causal-analysis
description: Compare community-renewal cases and produce traceable mechanism hypotheses and causal conclusions. Use when selecting comparison objects, mining relation patterns, conducting guided causal inquiry, or writing evidence-linked explanations across cases.
metadata:
  type: skill
  category: research
  domain: community-renewal
  upstream: [case-knowledge-construction, scalable-concept-framework]
---

# 跨案例因果分析

## 目标

在共享概念层、原生知识层和证据溯源层之上，识别可比对象与关系模式，通过引导式追问形成机制假设和因果结论。所有结论必须能回到案例过程与证据。

## 输入

- 混合知识图谱：共享概念层、原生知识层、证据溯源层。
- 一个或多个 `case_pack`。
- 研究问题、比较主题和候选案例。
- 契约：`../contracts/case-knowledge-contract.md`、`../contracts/review-packet.md`、`../contracts/causal-claim-schema.md`。

## 核心规则

- 基础关系表只存事实；因果判断只写入 `CC-xxx`，不写成普通 `Rxxx`。
- 因果结论走五级阶梯：观察 → 模式 → 机制假设 → 因果主张 → 因果结论。
- 缺机制链、竞争解释、反事实/对照或边界条件时，不得升级为因果结论。
- 证据状态必须继承：`planned`、`reported_or_opinion`、`disputed`、`unconfirmed` 不能当作已实施因果链的硬证据。
- Jaccard、概念分布和子图频次是筛选信号，不是因果证据。
- 关系谓词保持开放；比较时同时保留原生谓词和共享概念层，不强行归一。
- 不强制子图连通；允许孤立关系，不为检索方便补造边。
- 智能体可以主动追问，但每个问题必须记录，并检查是否诱导。

## 流程

### G1 比较范围

- 研究者：选题、选案例，确定比较目的和边界。
- 智能体：统计概念分布、计算 Jaccard、列出高重合/低重合/异常案例和可比性风险。
- 输出：`comparison_scope.md` + `similarity_matrix`。
- 研究者确认后才进入模式探索。

### G2 关系模式探索

- 智能体：做子图检索、路径提取、过程定位，给出候选模式、频次、反例和上下文差异。
- 研究者：识别模式、命名模式、判断哪些模式值得解释。
- 输出：`pattern_candidates`。
- 模式命名权归研究者；智能体只提供候选和证据。

### G3 引导式因果追问

- 智能体：围绕候选机制生成问题清单，覆盖机制、反事实、竞争解释、反证和边界。
- 研究者：回答、补充证据、裁定问题是否成立。
- 智能体：记录 `Q-xxx`，标注 `supported / contradicted / missing_evidence / unresolved`，并检查诱导式提问。
- 输出：`question_log` + 更新后的机制链。

智能体主动追问时必须：

- 同时询问支持证据和反驳证据。
- 不把研究者的预期写成问题前提。
- 发现预设立场、只问支持证据或缺少替代解释时，发出 `leading_question` 警告并给出中性改写。
- 不用问题替代证据；没有证据的回答标记为待补证。

### G4 因果结论

- 智能体：起草 `CausalClaim`，补齐机制链、证据、竞争解释、反事实/对照、边界和反证条件。
- 研究者：确认状态是 `hypothesis`、`supported`、`conclusion` 还是 `refuted`。
- 输出：`causal_claim_ledger` + `evidence_chains`。

## 交付物

- 比较简报
- 模式候选与反例
- 追问记录
- 机制假设
- 因果主张与因果结论
- 证据链
- 研究备忘：未决问题、需补证据、需回查的历史映射

## 回流

- 发现新概念或边界冲突 → 回到 `scalable-concept-framework` 提出本体增量。
- 发现缺证、过程缺口或来源冲突 → 回到 `case-knowledge-construction` 补材料、补证据或修订过程。
- 回查历史案例时，不覆盖旧版本，只追加修订记录。

## 禁止

- 不把相关、共现或 Jaccard 相似度直接写成因果。
- 不把观点/报道中的因果说法当作已证实机制。
- 不为了模式好看而强行合并谓词或补边。
- 不用引导式问题替代证据。
- 不删除被否定的因果主张；保留为 `refuted` 并记录理由。
