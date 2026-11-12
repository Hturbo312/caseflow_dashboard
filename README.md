# CaseFlow Dashboard

社区更新（community renewal）跨案例知识图谱：一个可视化 dashboard，加上支撑其数据构建的三层案例知识 skill。两者共用一套本体定义。

## 目录

| 目录 | 内容 |
|---|---|
| `dashboard/` | React + Express + SQLite 的可视化 dashboard：混合知识图谱、案例档案、本体框架、路径分析、案例比较与向量检索。 |
| `skills/` | 三层案例知识 skill：单案例知识构建、跨案例共享概念框架、跨案例分析。 |

两者共用同一套机器可读本体：`dashboard/shared/ontology.ts`。

## Dashboard

```powershell
cd dashboard
npm install
npm run dev
```

- 页面：http://localhost:5173
- API：http://127.0.0.1:8788
- 生产模式：`npm run build` 后执行 `npm start`，访问 http://127.0.0.1:8788

SQLite 数据库位于 `dashboard/data/community-renewal.db`，首次启动自动建表并写入种子案例。数据文件不纳入版本控制。

详细说明见 `dashboard/README.md` 和 `dashboard/WEB_APP.md`。

## Skills

| Skill | 作用 |
|---|---|
| `case-knowledge-construction` | 从多源材料构建单案例的 M/E/P/F/R 知识包。 |
| `scalable-concept-framework` | 管理原生概念、共享概念候选、概念映射与增量知识网络。 |
| `cross-case-causal-analysis` | 识别比较对象、关系模式，形成机制假设与因果结论。 |

约定：智能体生成候选 → 研究者裁决 → 产物锁定。未确认的候选不得进入下一阶段。

字段契约与编码手册见 `skills/README.md`、`skills/contracts/`、`skills/references/`。

## 边界

- 不把计划、观点或报道写成已实施事实。
- 不把相关、共现或相似度写成因果。
- 不覆盖原生知识、历史映射或审核记录。
- 不强制知识网络连通。

## License

MIT