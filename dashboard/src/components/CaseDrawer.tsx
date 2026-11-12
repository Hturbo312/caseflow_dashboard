import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import type {
  CaseDetail,
  GraphNode
} from "../../shared/types";
import { STRENGTH_META, TYPE_META } from "../../shared/meta";
import { FACT_STATUS_LABELS } from "../../shared/ontology";
import { CaseCover } from "./CaseCover";
import {
  ArrowUpRightIcon,
  BookIcon,
  CloseIcon,
  FileIcon,
  QuoteIcon,
  SparkIcon,
  TargetIcon
} from "./Icons";
import { TypeGlyph } from "./TypeGlyph";

export function CaseDrawer({
  caseId,
  detail,
  nodes,
  loading,
  error,
  onClose,
  onRetry,
  onLocate,
  onSelectEntity
}: {
  caseId: string | null;
  detail: CaseDetail | null;
  nodes: GraphNode[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onRetry: () => void;
  onLocate: (caseId: string) => void;
  onSelectEntity: (entityId: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const nodeMap = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes]
  );

  useEffect(() => {
    if (!caseId) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.classList.add("drawer-open");
    scrollRef.current?.scrollTo({ top: 0 });
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.classList.remove("drawer-open");
    };
  }, [caseId, onClose]);

  if (!caseId) return null;

  return createPortal(
    <div
      className="drawer-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="case-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={detail ? `${detail.name} 案例详情` : "案例详情"}
      >
        <div className="drawer-topbar">
          <span className="drawer-topbar-label">
            案例档案 <i>·</i>{" "}
            {detail?.code ? detail.code.replace(/^C/, "") : "—"}
          </span>
          <span className="drawer-topbar-note">
            重建档案 · 材料 · 证据链
          </span>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="关闭案例详情"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <div className="drawer-scroll" ref={scrollRef}>
          {loading && (
            <div className="drawer-loading">
              <div className="drawer-skeleton-hero">
                <span />
                <div>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="drawer-skeleton-lines">
                {Array.from({ length: 7 }, (_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="drawer-error">
              <FileIcon size={28} />
              <h2>案例档案读取失败</h2>
              <p>{error}</p>
              <button type="button" onClick={onRetry}>
                重新加载
              </button>
            </div>
          )}

          {!loading && detail && (
            <>
              <header className="case-drawer-hero">
                <CaseCover item={detail} large />
                <div className="drawer-hero-main">
                  <div className="drawer-hero-kicker">
                    <span>案例 {detail.code.replace(/^C/, "")}</span>
                    <span>{detail.period}</span>
                  </div>
                  <h1>{detail.name.replace(" · ", "\u00A0· ")}</h1>
                  <div className="drawer-hero-meta">
                    <span>{detail.country}</span>
                    <i />
                    <span>{detail.city}</span>
                    <i />
                    <span>{detail.year}</span>
                  </div>
                  <div className="drawer-tags">
                    {detail.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <p className="drawer-summary">{detail.summary}</p>
                </div>
              </header>

              <div className="drawer-stat-strip">
                <div>
                  <strong>{detail.entityCount}</strong>
                  <span>实体</span>
                </div>
                <div>
                  <strong>{detail.materialCount}</strong>
                  <span>材料</span>
                </div>
                <div>
                  <strong>{detail.evidenceCount}</strong>
                  <span>证据</span>
                </div>
                <div>
                  <strong>{detail.period}</strong>
                  <span>观察窗口</span>
                </div>
              </div>

              <section className="drawer-section">
                <div className="section-heading">
                  <span className="section-number">01</span>
                  <h2>案例重建</h2>
                  <i />
                </div>
                <div className="rebuild-copy">
                  {detail.rebuild.map((paragraph, index) => (
                    <p key={index}>
                      <span className="paragraph-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="rebuild-note">
                  <SparkIcon size={13} />
                  重建说明：仅保留可交叉核验的判断；示例数据不等同于正式研究结论。
                </div>
              </section>

              <section className="drawer-section">
                <div className="section-heading">
                  <span className="section-number">02</span>
                  <h2>过程与事实</h2>
                  <i />
                </div>
                <div className="process-list">
                  {detail.processes.map((process) => (
                    <article key={process.id} className="process-card">
                      <div className="process-head">
                        <span className="process-id">{process.id}</span>
                        <strong>{process.title}</strong>
                        <em>{process.timeRange}</em>
                      </div>
                      <p>{process.narrative}</p>
                      <div className="process-meta">
                        证据 {process.evidenceIds.join(" · ") || "待补"}
                        {process.revision > 1 ? ` · v${process.revision}` : ""}
                      </div>
                    </article>
                  ))}
                  {detail.processes.length === 0 && (
                    <p className="drawer-empty">暂无过程段落。</p>
                  )}
                </div>
                <div className="fact-list">
                  {detail.facts.map((fact) => (
                    <article key={fact.id} className="fact-row">
                      <div className="fact-head">
                        <span className="fact-id">{fact.id}</span>
                        <span className={`fact-status is-${fact.factStatus}`}>
                          {FACT_STATUS_LABELS[fact.factStatus]}
                        </span>
                        <span className="fact-confidence">
                          {fact.confidence} confidence
                        </span>
                      </div>
                      <p>{fact.statement}</p>
                      <div className="fact-meta">
                        {[fact.timeScope, fact.spaceScope, fact.quantityScope]
                          .filter(Boolean)
                          .join(" · ") || "未标注时空范围"}
                        {fact.evidenceIds.length > 0
                          ? ` · 证据 ${fact.evidenceIds.join(" · ")}`
                          : ""}
                      </div>
                    </article>
                  ))}
                  {detail.facts.length === 0 && (
                    <p className="drawer-empty">暂无原子事实。</p>
                  )}
                </div>
              </section>

              <section className="drawer-section">
                <div className="section-heading">
                  <span className="section-number">03</span>
                  <h2>原生概念</h2>
                  <i />
                </div>
                <div className="native-concept-grid">
                  {detail.nativeConcepts.map((concept) => (
                    <article key={concept.id} className="native-concept-card">
                      <div className="native-concept-head">
                        <TypeGlyph type={concept.entityType} size={11} />
                        <span>{TYPE_META[concept.entityType].label}</span>
                        <em>{concept.id}</em>
                      </div>
                      <h3>{concept.label}</h3>
                      <p>{concept.definition}</p>
                      <div className="native-concept-meta">
                        来源关系 {concept.sourceRelationIds.join(" · ") || "待补"}
                      </div>
                    </article>
                  ))}
                  {detail.nativeConcepts.length === 0 && (
                    <p className="drawer-empty">暂无原生概念。</p>
                  )}
                </div>
              </section>

              <section className="drawer-section">
                <div className="section-heading">
                  <span className="section-number">04</span>
                  <h2>相关实体</h2>
                  <i />
                </div>
                <div className="mechanism-grid">
                  {detail.entityIds.map((entityId) => {
                    const node = nodeMap.get(entityId);
                    if (!node) return null;
                    const meta = TYPE_META[node.type];
                    return (
                      <button
                        key={entityId}
                        type="button"
                        className="mechanism-chip"
                        onClick={() => onSelectEntity(entityId)}
                        style={
                          {
                            "--mechanism-color": meta.color,
                            "--mechanism-soft": meta.soft
                          } as React.CSSProperties
                        }
                      >
                        <TypeGlyph type={node.type} size={13} />
                        <span>
                          <strong>{node.name}</strong>
                          <small>{meta.label}</small>
                        </span>
                        <ArrowUpRightIcon size={12} />
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="drawer-section">
                <div className="section-heading">
                  <span className="section-number">05</span>
                  <h2>材料清单</h2>
                  <i />
                </div>
                <div className="material-list">
                  {detail.materials.map((material, index) => (
                    <article key={material.id} className="material-row">
                      <div className="material-index">
                        <BookIcon size={14} />
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="material-main">
                        <div className="material-title-line">
                          <h3>{material.title}</h3>
                          <span className="material-kind">{material.kind}</span>
                        </div>
                        <div className="material-meta">
                          {material.author} · {material.date} · {material.source}
                        </div>
                        <p>{material.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="drawer-section">
                <div className="section-heading">
                  <span className="section-number">06</span>
                  <h2>证据链</h2>
                  <i />
                </div>
                <div className="evidence-list">
                  {detail.evidence.map((evidence, index) => {
                    const strength = STRENGTH_META[evidence.strength];
                    return (
                      <article
                        key={evidence.id}
                        className="evidence-card"
                        style={
                          {
                            "--evidence-color": strength.color
                          } as React.CSSProperties
                        }
                      >
                        <div className="evidence-head">
                          <span className="evidence-index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="evidence-strength"
                            style={{
                              color: strength.color,
                              borderColor: `${strength.color}55`
                            }}
                          >
                            {strength.label}
                          </span>
                          <QuoteIcon size={13} />
                        </div>
                        <h3>{evidence.claim}</h3>
                        <blockquote>{evidence.quote}</blockquote>
                        <div className="evidence-source">
                          <span>{evidence.source}</span>
                          <i />
                          <span>{evidence.locator}</span>
                        </div>
                        {evidence.entityIds.length > 0 && (
                          <div className="evidence-entities">
                            {evidence.entityIds.map((entityId) => {
                              const node = nodeMap.get(entityId);
                              if (!node) return null;
                              return (
                                <button
                                  key={entityId}
                                  type="button"
                                  onClick={() => onSelectEntity(entityId)}
                                >
                                  <TypeGlyph type={node.type} size={9} />
                                  {node.name}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>

        {detail && !loading && (
          <footer className="drawer-footer">
            <div className="drawer-footer-note">
              <span className="status-dot" />
              原型数据 · 证据强度已标注
            </div>
            <button type="button" className="ghost-button" onClick={onClose}>
              关闭
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={() => onLocate(detail.id)}
            >
              <TargetIcon size={14} />
              在图谱中定位
            </button>
          </footer>
        )}
      </section>
    </div>,
    document.body
  );
}
