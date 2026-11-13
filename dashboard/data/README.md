# data 目录

## 纳入版本控制的内容

- `community-renewal.db`：SQLite 数据快照，`meta.dataset = caseflow-c01-c20`，含 C01–C20 共 20 个案例、371 份材料、1567 条证据。提交前已执行 WAL checkpoint，无 `-wal` / `-shm` 文件。
- `caseflow/`：C01–C11 的解析结果（`c01-c11.json`）、消歧报告、概念候选与审核包。
- `cases/C12-*` 至 `cases/C20-*`：逐案 `case_pack`、原始材料、抽取文本、L1–L2 产物与审核记录。

## 不纳入版本控制的内容

- `_backup/`：导入前自动生成的数据库快照，内容可由 Git 历史与导入脚本重建。
- `_scratch/`、`__pycache__/`、`materials/**/_candidates/`：抓取、比对与候选图等中间产物。
- `*.db-shm`、`*.db-wal`：SQLite 临时文件。
- `*.log`、根目录验证截图：本地运行产物。

## 重建方式

见 `dashboard/README.md`：先 `npm run import:caseflow` 重建 C01–C11，再按顺序执行 `scripts/import-c12.ts` 至 `scripts/import-c20.ts`。
