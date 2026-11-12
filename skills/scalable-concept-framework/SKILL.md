---
name: scalable-concept-framework
description: Induce shared concepts and incrementally update the community-renewal knowledge network across cases. Use when inventorying native concepts, proposing shared-concept candidates, mapping concepts, checking historical consistency, or versioning the ontology.
metadata:
  type: skill
  category: research
  domain: community-renewal
  upstream: [case-knowledge-construction]
  downstream: [cross-case-causal-analysis]
---

# 可扩展知识框架

## 目标

在保留案例原生知识的前提下，逐步形成共享概念层，并把新案例增量接入知识网络。首案不直接产生正式共享概念。

## 输入

- 一个或多个 `case_pack`。
- 已有共享概念层、映射表和版本记录；首案时为空。
- 编码手册：`../references/coding-manual.md`，重点 A.2.4、A.3.4；示例见 A.4.6。
- 共享契约：`../contracts/case-knowledge-contract.md`、`../contracts/review-packet.md`。

## 核心规则

- 首案只保留原生概念，并产生「共享概念候选」`SC-Cxx-xxx`；不确认正式共享概念。
- 正式共享概念 `SC-xxx` 默认需要至少两个案例的原生实例支持；例外必须由研究者显式裁定并记录理由。
- 单案例概念不强制映射；`no_map` 是合法结果。
- 映射类型严格使用手册四类：语义等同、原生为下位、部分或近似映射、暂不映射。
- 部分映射只映射有依据的语义成分；原生节点的其余属性和关系不自动继承。
- 新案例加入后必须回查历史映射；修改概念边界时不得覆盖原生节点和历史关系。
- 不以提高概念重合度或 Jaccard 为目标进行不恰当归并。

## 流程

### G1 原生概念盘点

- 智能体：按八类实体整理原生概念，给出定义、案例内示例、来源关系、频次和边界疑问。
- 研究者：确认概念名称、类别、定义和案例内范围。
- 输出：`native_concept_inventory`。

### G2 共享概念候选 / 概念映射

**首案 i=1：**

- 智能体：从原生概念提出共享概念候选，标注支持案例、语义依据和可能的边界冲突。
- 研究者：确认哪些只是候选、哪些保留为原生概念。
- 输出：`shared_concept_candidates`；不产生正式 `SC-xxx`。

**后续案 i>1：**

- 智能体：先做原始概念消歧，再检索已有共享概念，提出语义等同、原生为下位、部分/近似或暂不映射的建议。
- 研究者：做语义裁定，确认复用、新增候选、保留单案例概念或 `no_map`。
- 输出：`concept_mapping` 草表。

### G3 增量网络更新

按手册 A.3.4 的六步执行：

1. 保留原生知识。
2. 检索已有概念。
3. 确认概念映射。
4. 更新知识网络。
5. 回查历史映射。
6. 保存更新版本。

- 智能体：整理增量、标出受影响的历史案例和映射。
- 研究者：确认新增/调整的共享概念、边界和回查结果。
- 输出：更新后的混合知识网络。

### G4 版本发布

- 智能体：生成概念映射表、本体增量、版本说明和未决问题。
- 研究者：确认版本号和发布范围。
- 输出：`ontology_delta` + `version_record`。

## 交付物

- 原生概念清单
- 共享概念候选清单
- 概念映射表
- 本体增量
- 更新后的知识网络
- 历史映射回查记录
- 版本记录与审核记录

## 交接

向 `cross-case-causal-analysis` 交接：共享概念层、原生知识层、证据溯源层、映射表、版本记录和未决概念。比较时走共享层，解释时回到原生层和证据层。

## 禁止

- 首案不确认正式共享概念。
- 不把单案例概念强行映射到已有概念。
- 不把复合概念的全部属性归入共享概念。
- 不覆盖原生节点、历史映射或审核记录。
- 不为提高相似度而合并概念。
