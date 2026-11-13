import { useMemo, useState } from "react";
import type {
  CaseSummary,
  ComparisonData,
  CoreEntityType
} from "../../shared/types";
import { ENTITY_TYPES, TYPE_META } from "../../shared/meta";
import { shortCaseName } from "../lib/graph";
import {
  buildProfiles,
  clusterCases,
  similarityMatrix
} from "../lib/compare";
import { ArchiveIcon, ChevronRightIcon } from "./Icons";

const THRESHOLDS = [0.15, 0.25, 0.35];

type SharedBucket = CoreEntityType | "other";

const SHARED_BUCKETS: SharedBucket[] = [...ENTITY_TYPES, "other"];

const bucketMeta = (bucket: SharedBucket) =>
  bucket === "other"
    ? { label: "未分类", color: "#9a9384" }
    : TYPE_META[bucket];

const BASIS_LABEL = {
  confirmed: "已审核共享概念",
  candidate: "共享概念候选",
  none: "暂无共享概念候选"
} as const;

function cellTint(value: number | null, diagonal: boolean) {
  if (diagonal) return { background: "#efe9dc", color: "#8b8477" };
  if (value === null) return { background: "transparent", color: "#b3aa99" };
  const alpha = 0.06 + value * 0.46;
  return {
    background: `rgba(47, 107, 102, ${alpha.toFixed(3)})`,
    color: value > 0.56 ? "#f7f2e8" : "#20242a"
  };
}

export function CompareView({
  cases,
  comparison,
  onOpenCase,
  onOpenArchive
}: {
  cases: CaseSummary[];
  comparison: ComparisonData;
  onOpenCase: (caseId: string) => void;
  onOpenArchive: () => void;
}) {
  const [threshold, setThreshold] = useState(0.25);

  const profiles = useMemo(
    () => buildProfiles(cases, comparison),
    [cases, comparison]
  );
  const matrix = useMemo(
    () => similarityMatrix(cases, profiles),
    [cases, profiles]
  );
  const clusters = useMemo(
    () => clusterCases(cases, matrix, threshold),
    [cases, matrix, threshold]
  );
  const sharedConceptMap = useMemo(
    () =>
      new Map(
        comparison.sharedConcepts.map((concept) => [concept.id, concept])
      ),
    [comparison.sharedConcepts]
  );
  const sharedRows = useMemo(
    () =>
      cases.map((item) => {
        const ids = [
          ...(profiles.profiles.get(item.id)?.set ?? new Set<string>())
        ];
        const counts = new Map<SharedBucket, number>();
        for (const id of ids) {
          const concept = sharedConceptMap.get(id);
          const bucket: SharedBucket = concept?.entityType ?? "other";
          counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
        }
        return {
          item,
          total: ids.length,
          counts,
          labels: ids.map((id) => sharedConceptMap.get(id)?.label ?? id)
        };
      }),
    [cases, profiles, sharedConceptMap]
  );
  const sharedTotals = useMemo(() => {
    const totals = new Map<SharedBucket, number>();
    for (const row of sharedRows) {
      for (const [bucket, count] of row.counts) {
        totals.set(bucket, (totals.get(bucket) ?? 0) + count);
      }
    }
    return totals;
  }, [sharedRows]);

  const nativeCount = cases.reduce(
    (total, item) => total + item.entityCount,
    0
  );
  const sharedCount = useMemo(() => {
    const ids = new Set<string>();
    for (const profile of profiles.profiles.values()) {
      for (const id of profile.set) ids.add(id);
    }
    return ids.size;
  }, [profiles]);
  return (
    <section className="compare-stage" aria-label="比较辅助工作台">
      <header className="compare-head">
        <button
          type="button"
          className="compare-archive-btn"
          onClick={onOpenArchive}
        >
          <ArchiveIcon size={14} />
          结论存档
          <em>{comparison.comparisons.length}</em>
        </button>
      </header>

      <div className="compare-grid">
        <section className="compare-card compare-card--dist">
          <header className="compare-card-head">
            <h3>
              {matrix.basis === "confirmed"
                ? "已审核共享概念分布"
                : "共享概念候选分布"}
            </h3>
            <span>
              共享概念 {sharedCount} · 原生实体 {nativeCount}
            </span>
          </header>
          <div className="compare-dist-list">
            {sharedRows.map((row) => (
              <div className="compare-dist-row" key={row.item.id}>
                <button
                  type="button"
                  className="compare-dist-case"
                  onClick={() => onOpenCase(row.item.id)}
                  title={row.item.name}
                >
                  <span className="compare-case-code">
                    {row.item.code.replace(/^C/, "")}
                  </span>
                  <span className="compare-case-name">
                    {shortCaseName(row.item.name)}
                  </span>
                </button>
                <div
                  className={
                    "compare-dist-bar" + (row.total === 0 ? " is-empty" : "")
                  }
                  role="img"
                  aria-label={
                    row.item.name +
                    " 共享概念 " +
                    row.total +
                    " 个" +
                    (row.labels.length
                      ? "：" + row.labels.join("、")
                      : "")
                  }
                >
                  {row.total > 0 &&
                    SHARED_BUCKETS.map((bucket) => {
                      const count = row.counts.get(bucket) ?? 0;
                      if (!count) return null;
                      return (
                        <i
                          key={bucket}
                          style={{
                            flexGrow: count,
                            background: bucketMeta(bucket).color
                          }}
                          title={
                            bucketMeta(bucket).label + " " + count
                          }
                        />
                      );
                    })}
                </div>
                <span className="compare-dist-total">{row.total}</span>
              </div>
            ))}
            {sharedCount === 0 && (
              <div className="compare-dist-empty">
                <strong>尚无共享概念</strong>
                <p>
                  原生概念候选只在单一案例内成立，直接比较名称容易遇到术语歧义。
                  完成研究者确认后，这里会显示正式共享概念覆盖。
                </p>
              </div>
            )}
          </div>
          {sharedCount > 0 && (
            <div className="compare-type-legend">
              {SHARED_BUCKETS.filter(
                (bucket) => (sharedTotals.get(bucket) ?? 0) > 0
              ).map((bucket) => (
                <span key={bucket}>
                  <i style={{ background: bucketMeta(bucket).color }} />
                  {bucketMeta(bucket).label}
                  <em>{sharedTotals.get(bucket) ?? 0}</em>
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="compare-card compare-card--matrix">
          <header className="compare-card-head">
            <h3>Jaccard 矩阵</h3>
            <span className="compare-badge">
              口径 {BASIS_LABEL[matrix.basis]}
            </span>
          </header>
          <div className="compare-matrix-wrap">
            <table className="compare-matrix-table">
              <thead>
                <tr>
                  <th scope="col" className="compare-matrix-corner">
                    {cases.length > 1 ? "案例" : ""}
                  </th>
                  {cases.map((item) => (
                    <th scope="col" key={item.id} title={item.name}>
                      {shortCaseName(item.name)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cases.map((row, rowIndex) => (
                  <tr key={row.id}>
                    <th scope="row" title={row.name}>
                      {shortCaseName(row.name)}
                    </th>
                    {cases.map((column, columnIndex) => {
                      const value = matrix.cells[rowIndex]?.[columnIndex] ?? null;
                      const diagonal = rowIndex === columnIndex;
                      return (
                        <td
                          key={column.id}
                          className={diagonal ? "is-diagonal" : ""}
                          style={cellTint(value, diagonal)}
                          title={
                            diagonal
                              ? `${row.name}（自身）`
                              : `${row.name} × ${column.name}：${
                                  value === null
                                    ? matrix.basis === "none"
                  ? "尚无共享概念"
                  : "无共享概念交集"
                                    : value.toFixed(2)
                                }`
                          }
                        >
                          {value === null ? "—" : value.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {matrix.basis === "none" && (
            <p className="compare-inline-note">
              尚无共享概念，Jaccard 暂不可计算。原生概念不参与跨案例相似度。
            </p>
          )}
          {cases.length < 2 && matrix.basis !== "none" && (
            <p className="compare-inline-note">
              加入第二个案例后，这里才会形成可比较的相似度矩阵。
            </p>
          )}
          {matrix.basis === "candidate" && (
            <p className="compare-inline-note">
              当前使用待研究者审核的共享概念候选，相似度仅用于探索，不构成正式比较结论。
            </p>
          )}
        </section>

        <section className="compare-card compare-card--clusters">
          <header className="compare-card-head">
            <h3>聚类簇</h3>
            <div className="compare-threshold" role="group" aria-label="聚类阈值">
              {THRESHOLDS.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={threshold === value ? "is-active" : ""}
                  onClick={() => setThreshold(value)}
                >
                  {value.toFixed(2)}
                </button>
              ))}
            </div>
          </header>
          <div className="compare-cluster-list">
            {clusters.map((cluster, index) => (
              <div className="compare-cluster" key={cluster.key}>
                <div className="compare-cluster-head">
                  <span className="compare-cluster-badge">
                    {cluster.caseIds.length > 1
                      ? `簇 ${String.fromCharCode(65 + index)}`
                      : "独立案例"}
                  </span>
                  <em>{cluster.caseIds.length} 案例</em>
                  {cluster.mean !== null && (
                    <span className="compare-cluster-mean">
                      平均 {cluster.mean.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="compare-cluster-members">
                  {cluster.caseIds.map((id) => {
                    const item = cases.find((entry) => entry.id === id);
                    if (!item) return null;
                    return (
                      <button
                        type="button"
                        key={id}
                        onClick={() => onOpenCase(id)}
                        title={item.name}
                      >
                        {shortCaseName(item.name)}
                        <ChevronRightIcon size={11} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="compare-cluster-note">
            {matrix.basis === "none"
              ? "尚无共享概念，当前仅按案例独立性展示。"
              : matrix.basis === "candidate"
                ? "候选口径阈值连通法：相似度 ≥ " +
                  threshold.toFixed(2) +
                  " 的案例并入同一簇，需审核后复核。"
                : "已审核口径阈值连通法：相似度 ≥ " +
                  threshold.toFixed(2) +
                  " 的案例并入同一簇。"}
          </p>
        </section>
      </div>
    </section>
  );
}
