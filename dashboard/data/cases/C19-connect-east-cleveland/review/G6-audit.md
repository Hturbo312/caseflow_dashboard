# C19 G6 关系审校记录

> 输入：`relations.json` v0.1（G5 确认，106 条）
> 输出：`relations_v1.0.json`（待研究者冻结）
> 审校日期：2026-11-13

## 1. 审校范围

- 逐条检查 106 条关系的头/尾实体、类型、谓词、方向、状态、限定、证据、过程与事实关联。
- 对照 10 个过程段落、47 条事实、85 个实体与 70 条证据，检查重复、遗漏、方向错误与状态升级。
- 不新增未经证据支持的关系；不删除有独立证据价值的关系；不覆盖 v0.1。

## 2. 重复与近重复

| 组 | 关系 | 判断 | 处理 |
|---|---|---|---|
| 1 | `A01 planned N14`（2024 待招标）与 `A01 completed N14`（2026-07 建成） | 同一行动的不同时间/状态，不是重复 | 保留两条；qualifiers 分别写“2024 待招标”与“2026-07 建成” |
| 2 | `O01 guides K04` 与 `O01 specifies G06` | 前者是报告指导实施，后者是行动表指定地点 | 保留；G6 不合并 |
| 3 | `A01 leads G06` 与 `A02/A16 has_jurisdiction_over G06` | 主体与角色不同：牵头 vs 管辖 | 保留；`co_governs` 改为 `has_jurisdiction_over` |
| 4 | `A19 organized N02` 与 `A08 participated_in N02` | 组织者视角 vs 参与者视角 | 保留；不是重复 |
| 5 | `A19 hired A07` 与 `A07 participated_in N01` | 雇佣关系 vs 团队组建参与 | 保留；语义不同 |
| 6 | `G01 contains G07` 与 `X01 context_for G07` | 空间包含 vs 社区背景 | 保留；语义不同 |

**结论**：删除 0 条；合并 0 条；保留 6 组近重复并加限定/说明。

## 3. 方向校正

| 编号 | 原关系 | 校正后 | 理由 |
|---|---|---|---|
| R015 | `N02 engaged A08` | `A08 participated_in N02` | 参与者为主语，符合 actor→action 统一方向 |
| R091 | `N01 includes A07` | `A07 participated_in N01` | 同上；避免 action→actor |

**结果**：action→actor 关系为 0；实施/组织关系统一 actor→action，参与关系统一 actor→action。

## 4. 谓词合并

| 原谓词 | 新谓词 | 涉及关系 | 数量 |
|---|---|---|---|
| held | organized | R014、R023、R035、R040 | 4 |
| included | includes | R025、R026、R027 | 3 |
| co_governs | has_jurisdiction_over | R045、R046 | 2 |
| participates_in | participated_in | R076 | 1 |
| plans | planned | R077 | 1 |

加上 R015/R091 方向校正时同步改为 `participated_in`，共 **13 处谓词改写**；谓词数由 **61** 降至 **56**。

未合并的一次性谓词（如 `defined_target_area`、`broke_ground`、`locked_out`、`settled_with`）保留，因为它们承载案例特异性语义，强行归并会损失信息。

## 5. 状态审校

| 类型 | 编号 | 处理 |
|---|---|---|
| disputed | R079、R080、R081、R101、R102 | 保持 disputed；不升级 |
| reported_or_opinion | R068、R069 | 保持 reported；换锁/起诉为诉状/报道主张 |
| implemented | R070、R071、R072、R083–R086 | 和解、法院阻止出售、2026 剪彩/绿道建成等有依据 |

**结果**：0 条状态升级；0 条状态降级。

## 6. 证据覆盖

- 19 条关系补充了证据指针（如 R004 加 M03-E02、R079–R081 加 M28-E02、R102 加 M01-E11/E13/E29）。
- 70 条证据现已全部被至少一条关系引用。
- 85 个实体、47 条事实全部被至少一条关系引用。

## 7. 遗漏检查

- **未新增关系**：本轮没有发现“有证据但完全未编码”的独立关系。
- **30 项行动仍为汇总级**：`A01 leads G06`、`A02/A16 has_jurisdiction_over G06` 只表达总体牵头/管辖，没有逐项行动关系；这是材料限制，不是遗漏。
- **2025 年 Verdynt 交易失败、Loiter 迁址**：未建立关系；现有证据只到“法院阻止出售/和解”，后续失败与迁址缺一手材料。
- **A01 的资金角色**：`A12/A02 funded N13` 已编码；A01 作为项目主导的资金申请角色未单列，因证据未明确写“A01 secured”。

## 8. 残余问题

1. 56 个谓词仍偏多；`context_for`、`guides`、`complements`、`supports` 属分析性关系，跨案例比较时需注意。
2. 30 项行动缺逐项 owner/status 关系，跨案例比较只能到类别/总体层级。
3. 争议关系（R079–R081、R101、R102）仍依赖单一低可靠性来源或口径冲突，需补原件。
4. 2026 年回溯关系（R083–R086）只证明 2026-07 状态，不能用于 2025 年因果分析。

## 9. 审校结论

- 保留 106 条关系；删除 0；新增 0；方向校正 2；谓词改写 13；证据补充 19 条关系。
- 最终：106 条关系、56 个谓词、90 implemented、9 planned、5 disputed、2 reported。
- 建议提交研究者冻结。
