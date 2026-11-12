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

每个 gate 的审核包和研究者决定分别写入 `review_packets` 与 `review_decisions`。当前首案通过 `server/seed.ts` 录入；字段已经与 skill 契约对齐，后续可在此基础上增加 case pack 导入脚本。

## 八类核心实体

`context` 情境、`actor` 主体、`task` 任务、`technology` 技术、`capability` 能力、`action` 行动、`target` 作用对象、`outcome` 结果。

`case` 是图谱中的案例容器，不是第九类核心实体。同一对象可以在不同事实或关系中承担不同角色，例如社区居民既可以是 `actor`，也可以是 `target`。

事实状态固定为：`implemented`、`planned`、`reported_or_opinion`、`disputed`、`unconfirmed`。基础关系表不写未经证实的因果判断；因果内容只进入 `causal_claims`。

## 当前案例

- 案例：`C06` Damp Busters · 社区潮湿住房更新
- 案例单位：2014 年社区潮湿住房问题识别与居民意见收集
- 状态：`frozen`
- 当前数据：20 个实体、17 条关系、1 个过程段落、4 条原子事实、3 个原生概念、1 条材料、1 条证据
- 首案不确认正式共享概念，`shared_concepts` 为空是预期结果

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
- 初始化：首次启动自动建表并 seed；`SEED_VERSION` 变化时重建案例数据
- 校验：`server/db.ts` 在 seed 前检查实体类型、角色、关系端点、事实状态、证据与关系引用

## 构建与检查

```powershell
npm run build
Invoke-RestMethod http://127.0.0.1:8788/api/health
Invoke-RestMethod http://127.0.0.1:8788/api/cases/c06
```

`/api/health` 返回的 `dbPath` 必须指向 `community-renewal.db`。`/api/cases/c06` 应返回 `processes / facts / nativeConcepts` 等分层数据。

## 目录

- `shared/ontology.ts`：八类实体、事实状态、映射类型、审核动作的单一来源
- `shared/types.ts`：API 与页面共用类型
- `shared/meta.ts`：标签、颜色、图形元数据
- `server/db.ts`：SQLite schema、seed、查询与完整性校验
- `server/seed.ts`：Damp Busters 首案数据
- `src/`：React dashboard

## 边界

- 不把计划、观点或报道写成已实施事实。
- 不把相关、共现或 Jaccard 相似度写成因果。
- 不覆盖原生知识、历史映射或审核记录。
- 不强制知识网络连通。
