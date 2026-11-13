# Dashboard 使用说明

## 页面结构

- 混合知识图谱：展示案例、八类实体与关系；节点大小反映关系度数，外环表示跨案例共享概念。
- 案例列表：打开案例档案，查看过程、事实、原生概念、材料与证据链。
- 知识框架：八类实体图例、原生/共享概念计数、本体版本记录。
- 选择案例 / 路径分析：筛选案例，或在两个节点之间查找关系路径。
- 比较辅助：在路径分析右侧切换，展示共享概念分布、Jaccard 相似度矩阵与阈值聚类簇。原生概念仅作案例内记录，不参与跨案例相似度。
- 比较档案抽屉：从比较辅助页右上角「结论存档」打开，按案例组查看比较问题、讨论摘要、结论与关联因果 claim。
- 本地特征检索：用 384 维字符 n-gram / Latin token 哈希向量检索案例、实体、材料和证据；当前不是训练型语义嵌入模型。

## 案例档案

案例抽屉分为六段：

1. 案例重建：事件过程的简要重建。
2. 过程与事实：`Cxx-Pxx` 过程段落与 `Fxxx` 原子事实，显示事实状态、置信度、时空范围和证据指针。
3. 原生概念：`NC-Cxx-xxx` 概念、所属实体类型与来源关系。
4. 相关实体：案例涉及的八类实体节点。
5. 材料清单：`Cxx-Mxx` 材料、来源、类型与核验状态。
6. 证据链：`Cxx-Mxx-Exx` 原材料证据与 `Cxx-Gxx-Qxx` 专家协商引文；显示原文、定位与关联实体。

## API

- `GET /api/health`：数据集标识（`dataset`）、数据库路径、seed 版本、向量信息与计数。
- `GET /api/bootstrap`：案例列表、图谱、本体版本、元数据与比较数据。
- `GET /api/comparisons`：比较讨论与结论存档记录。
- `GET /api/review-packets`：审核包列表。
- `GET /api/review-decisions`：审核决定列表。
- `POST /api/review-decisions`：追加审核决定；必须引用现有 `packetId`，重复 `id` 返回 409。
- `GET /api/cases/:id`：案例详情，含 `processes / facts / nativeConcepts / sharedConcepts / conceptMappings / causalClaims / causalQuestions`。
- `GET /api/entities/:id`：实体详情、邻居、案例与证据。
- `GET /api/search?q=...`：本地 hash n-gram 特征向量检索。

## 数据刷新

当前正式数据是 CaseFlow C01–C11，不再通过 `server/seed.ts` 的旧 Damp Busters 数据刷新。

```powershell
# 1. 从 Excel 重新生成结构化 JSON
npm run parse:caseflow -- "C:\path\to\CaseFlow_C01-C11_完整知识与溯源合并版.xlsx"

# 2. 查看消歧报告（不写数据库）
npx tsx server/import-caseflow.ts --dry-run

# 3. 正式导入（会先备份数据库）
npm run import:caseflow
```

导入后写入 `meta.dataset = caseflow-c01-c11`。服务启动时如果发现该标记，不会再执行旧 seed 覆盖；已有案例库也不会因 `SEED_VERSION` 变化被自动清空。若数据库结构不存在，请先启动一次 `npm start` 完成建表，再执行导入。

正式导入不清空审核包和审核决定。当前源文件已有共享概念候选与映射；比较页会优先使用已审核口径，只有候选时明确显示“候选口径”，不能当作正式研究结论。

## 端口

- API：`8788`
- Vite：`http://localhost:5173`，通过代理访问 `8788`
- 生产静态页面：`8788`

如果 `8788` 已被占用，可用 `$env:PORT='8790'; npm start` 临时改端口，并同步修改 `vite.config.ts` 的代理地址。
