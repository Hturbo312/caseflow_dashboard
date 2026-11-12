import { useMemo, useState } from "react";
import type {
  CaseSummary,
  ComparisonData,
  GraphData
} from "../../shared/types";
import { ENTITY_TYPES, TYPE_META } from "../../shared/meta";
import { shortCaseName } from "../lib/graph";
import {
  buildProfiles,
  clusterCases,
  entityDistributionByCase,
  similarityMatrix,
  totalsByType
} from "../lib/compare";
import { ArchiveIcon, ChevronRightIcon } from "./Icons";

const THRESHOLDS = [0.15, 0.25, 0.35];

const BASIS_LABEL = {
  shared: "共享概念",
  native: "原生概念",
  none: "暂无概念"
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
  graph,
  comparison,
  onOpenCase,
  onOpenArchive
}: {
  cases: CaseSummary[];
  graph: GraphData;
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
  const distribution = useMemo(
    () => entityDistributionByCase(graph, cases),
    [graph, cases]
  );
  const totals = useMemo(() => totalsByType(distribution), [distribution]);

  const caseIds = useMemo(() => new Set(cases.map((item) => item.id)), [cases]);
  const nativeCount = comparison.nativeConcepts.filter((concept) =>
    caseIds.has(concept.caseId)
  ).length;
  const sharedCount = comparison.sharedConcepts.filter((concept) =>
    concept.supportingCaseIds.some((id) => caseIds.has(id))
  ).length;
  const entityTotal = ENTITY_TYPES.reduce((sum, type) => sum + totals[type], 0);
  const evidenceTotal = cases.reduce(
    (sum, item) => sum + (item.evidenceCount || 0),
    0
  );
  const materialTotal = cases.reduce(
    (sum, item) => sum + (item.materialCount || 0),
    0
  );
  const meanLabel =
    matrix.mean === null ? "—" : matrix.mean.toFixed(2);

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
            <h3>概念分布</h3>
            <span>每案例实体构成 · 原生 {nativeCount} / 共享 {sharedCount}</span>
          </header>
          <div className="compare-dist-list">
            {cases.map((item) => {
              const counts = distribution.get(item.id);
              const total = counts
                ? ENTITY_TYPES.reduce((sum, type) => sum + counts[type], 0)
                : 0;
              return (
                <div className="compare-dist-row" key={item.id}>
                  <button
                    type="button"
                    className="compare-dist-case"
                    onClick={() => onOpenCase(item.id)}
                    title={item.name}
                  >
                    <span className="compare-case-code">
                      {item.code.replace(/^C/, "")}
                    </span>
                    <span className="compare-case-name">
                      {shortCaseName(item.name)}
                    </span>
                  </button>
                  <div
                    className={`compare-dist-bar${total === 0 ? " is-empty" : ""}`}
                    role="img"
                    aria-label={`${item.name} 实体构成，共 ${total} 个`}
                  >
                    {total > 0 &&
                      ENTITY_TYPES.map((type) => {
                        const count = counts?.[type] ?? 0;
                        if (!count) return null;
                        return (
                          <i
                            key={type}
                            style={{
                              flexGrow: count,
                              background: TYPE_META[type].color
                            }}
                            title={`${TYPE_META[type].label} ${count}`}
                          />
                        );
                      })}
                  </div>
                  <span className="compare-dist-total">{total}</span>
                </div>
              );
            })}
          </div>
          <div className="compare-type-legend">
            {ENTITY_TYPES.map((type) => (
              <span key={type}>
                <i style={{ background: TYPE_META[type].color }} />
                {TYPE_META[type].label}
                <em>{totals[type]}</em>
              </span>
            ))}
          </div>
        </section>

        <section className="compare-card compare-card--stats">
          <header className="compare-card-head">
            <h3>统计</h3>
            <span>当前范围</span>
          </header>
          <div className="compare-stat-grid">
            <div>
              <strong>{cases.length}</strong>
              <span>案例</span>
            </div>
            <div>
              <strong>{entityTotal}</strong>
              <span>实体</span>
            </div>
            <div>
              <strong>{nativeCount}</strong>
              <span>原生概念</span>
            </div>
            <div>
              <strong>{sharedCount}</strong>
              <span>共享概念</span>
            </div>
            <div>
              <strong>{evidenceTotal}</strong>
              <span>证据</span>
            </div>
            <div>
              <strong>{materialTotal}</strong>
              <span>材料</span>
            </div>
          </div>
          <div className="compare-stat-foot">
            <span>
              可比案例对 <strong>{matrix.pairCount}</strong>
            </span>
            <span>
              平均 Jaccard <strong>{meanLabel}</strong>
            </span>
          </div>
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
                                  value === null ? "无共同概念" : value.toFixed(2)
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
          {cases.length < 2 && (
            <p className="compare-inline-note">
              加入第二个案例后，这里才会形成可比较的相似度矩阵。
            </p>
          )}
          {matrix.basis === "native" && cases.length > 1 && (
            <p className="compare-inline-note">
              尚未建立共享概念映射，当前按原生概念标签计算。
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
            阈值连通法：相似度 ≥ {threshold.toFixed(2)} 的案例并入同一簇。
          </p>
        </section>
      </div>
    </section>
  );
}
