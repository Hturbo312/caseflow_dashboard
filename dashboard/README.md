# 社区更新案例图谱

面向社区更新跨案例比较的案例知识库与可视化 dashboard。一个案例对应一次社区更新事件的完整过程；研究者负责确认案例边界、事实、概念和因果结论。

本项目与三层 skill 共用一套本体：

`shared/ontology.ts`

三层 skill 位于：

`../skills/`

## 与三层 Skill 的关系

| 层 | Skill | 主要产物 | 对应数据库 |
|---|---|---|---|
| L1 | `case-knowledge-construction` | 材料、证据、过程、事实、关系 | `materials / evidence / processes / facts / relations` |
| L2 | `scalable-concept-framework` | 原生概念、共享概念候选、映射、版本 | `native_concepts / shared_concepts / concept_mappings / ontology_versions` |
| L3 | `cross-case-causal-analysis` | 机制假设、因果主张、追问记录、比较讨论与结论 | `causal_claims / causal_questions / comparisons` |

每个 gate 的审核包和研究者决定分别写入 `review_packets` 与 `review_decisions`。

当前 C01–C11 数据通过“Excel → JSON → SQLite”的可重复导入流程进入 dashboard：

```powershell
npm run parse:caseflow -- "C:\path\to\CaseFlow_C01-C11_完整知识与溯源合并版.xlsx"
npm run import:caseflow
```

导入脚本会先备份旧数据库，再在同一事务内刷新案例知识表；`review_packets` 与 `review_decisions` 不随案例刷新删除。导入后 `meta.dataset = caseflow-c01-c11`，启动时的旧 seed 不会覆盖新数据。

## 八类核心实体

`context` 情境、`actor` 主体、`task` 任务、`technology` 技术、`capability` 能力、`action` 行动、`target` 作用对象、`outcome` 结果。

`case` 是图谱中的案例容器，不是第九类核心实体。同一对象可以在不同事实或关系中承担不同角色，例如社区居民既可以是 `actor`，也可以是 `target`。

事实状态固定为：`implemented`、`planned`、`reported_or_opinion`、`disputed`、`unconfirmed`。基础关系表不写未经证实的因果判断；因果内容只进入 `causal_claims`。

## 当前数据

- 案例：`C01`–`C11`，共 11 案
- `C06` 为新版 Damp Busters（英国布里斯托尔，2015 年前后），不是旧首案
- 规模：724 个案例内实体、442 条专家关系、86 个过程段落、190 个事实组、218 份材料、904 条证据
- 证据：504 条原材料证据记录（`Cxx-Mxx-Exx`）+ 400 条专家协商引文（`Cxx-Gxx-Qxx`）
- 追溯：442 条关系均带专家引文；290 条有冻结过程段落定位；152 条为语义候选
- 原生层：724 个案例内实体直接作为原生概念节点，不再额外创建一层原生概念节点
- 共享层：第二轮生成 43 个共享概念候选，覆盖八类实体，并直接连接同类别实体
- 映射：543 个实体进入共享候选，181 个实体保留 `no_map`；跨类别映射为 0
- 图谱默认显示全局案例、实体、关系与共享概念；不默认进入下钻模式
- 内部概念映射记录用于共享概念生成和审核，不重复绘制为图节点
- 概念候选保留 `candidate` / `candidate_requires_researcher_confirmation` 状态；研究者确认前不得当作正式共享概念
- 候选源：`C01-C11-concept-candidates-v0.1.json`；导入时校验关系、案例和证据引用
- 审核包：`data/caseflow/C01-C11_概念映射审核包.md`；机器可读候选：`data/caseflow/concept-candidates.json`

详细的实体消歧决定、近名候选和跨案例专名候选见：

`data/caseflow/C01-C11_消歧报告.md`

## 运行

```powershell
npm install
npm run dev
```

- Vite 页面：`http://localhost:5173`
- API：`http://127.0.0.1:8788`
- 生产构建后：`npm start`，访问 `http://127.0.0.1:8788`

原 `org-goal-agent` 服务占用 `8787`，本项目改用 `8788`，避免两个数据库混用。

## 数据库

- 路径：`data/community-renewal.db`
- 引擎：SQLite + `sqlite-vec`
- 初始化：首次启动自动建表
- 正式数据：`npm run import:caseflow`
- 防覆盖：导入后写入 `meta.dataset = caseflow-c01-c11`；服务启动时不会再用旧 Damp Busters seed 覆盖
- 审核留档：正式导入不清空 `review_packets` / `review_decisions`
- 关系追溯：`relation_process_links` 与 `relation_evidence_links` 保存规范化连接；关系同时记录事实组、逐字句 ID、候选句 ID 与追溯状态
- 备份：导入前写入 `data/_backup/community-renewal.db.before-c01-c11*`
- 校验：`server/db.ts` 在旧 seed 前检查实体类型、角色、关系端点、事实状态、证据与关系引用

## 实体消歧规则

1. 先做 NFKC、大小写、空白与标点规范化。
2. 同案例内规范名完全相同者合并；原始写法差异登记为 aliases。
3. 同案例同名但类型不同者保留一个实体，在 `entity_roles` 中记录多重角色，关系端保留原角色。
4. 同案例近名、简称、包含关系不自动合并，只进入候选报告。
5. 跨案例默认不合并；居民、项目团队、政府等泛称保持案例内实体。
6. 明确可能指同一对象的跨案例专名（如 `SmartEnCity项目`）只标为 `specific-review`，等待研究者确认。

## 构建与检查

```powershell
npm run build
Invoke-RestMethod http://127.0.0.1:8788/api/health
Invoke-RestMethod http://127.0.0.1:8788/api/cases/C06
Invoke-RestMethod http://127.0.0.1:8788/api/review-packets
```

`/api/health` 返回的 `dataset` 应为 `caseflow-c01-c11`，`dbPath` 必须指向 `community-renewal.db`。`/api/cases/C06` 应返回新版 Damp Busters 的 `processes / facts / evidence` 等分层数据。

## 目录

- `shared/ontology.ts`：八类实体、事实状态、映射类型、审核动作的单一来源
- `shared/types.ts`：API 与页面共用类型
- `shared/meta.ts`：标签、颜色、图形元数据
- `server/db.ts`：SQLite schema、迁移、旧 seed 防覆盖、审核写入与查询
- `server/index.ts`：只读查询 API 与 append-only 审核决定写入 API
- `server/seed.ts`：旧单案 Damp Busters demo seed（仅作无 CaseFlow 数据时的兜底）
- `server/import-caseflow.ts`：C01–C11 JSON 导入、消歧、搜索索引重建
- `server/caseflow-concept-layer.ts`：概念候选校验、映射导入与 `no_map` 补齐
- `scripts/parse_caseflow.py`：Excel → 结构化 JSON
- `data/caseflow/`：解析结果、消歧报告与导入报告（不纳入版本控制）
- `src/`：React dashboard

## 边界

- 不把计划、观点或报道写成已实施事实。
- 不把相关、共现或 Jaccard 相似度写成因果。
- Jaccard 仅基于共享概念计算；无共享概念时标记为不可计算，不用原生概念标签回退。
- 不覆盖原生知识、历史映射或审核记录。
- 不强制知识网络连通。
