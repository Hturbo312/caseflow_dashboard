import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import type {
  CaseSummary,
  CausalClaimRecord,
  ComparisonData,
  ComparisonRecord
} from "../../shared/types";
import { shortCaseName } from "../lib/graph";
import {
  ArchiveIcon,
  ArrowRightIcon,
  CloseIcon,
  SparkIcon
} from "./Icons";

const STATUS_LABEL: Record<ComparisonRecord["status"], string> = {
  draft: "草稿",
  reviewed: "已复核",
  archived: "已归档"
};

const CAUSAL_LABEL: Record<CausalClaimRecord["status"], string> = {
  hypothesis: "机制假设",
  supported: "有支持",
  conclusion: "因果结论",
  refuted: "已反驳"
};

const CONFIDENCE_LABEL: Record<string, string> = {
  low: "低置信",
  medium: "中置信",
  high: "高置信"
};

export function ComparisonDrawer({
  open,
  data,
  cases,
  onClose,
  onOpenCase
}: {
  open: boolean;
  data: ComparisonData;
  cases: CaseSummary[];
  onClose: () => void;
  onOpenCase: (caseId: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const caseMap = useMemo(
    () => new Map(cases.map((item) => [item.id, item])),
    [cases]
  );

  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  if (!open) return null;

  const hasContent =
    data.comparisons.length > 0 || data.causalClaims.length > 0;

  return createPortal(
    <div
      className="drawer-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="case-drawer comparison-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="案例比较结论存档"
      >
        <div className="drawer-topbar">
          <span className="drawer-topbar-label">
            比较档案 <i>·</i> {String(data.comparisons.length).padStart(2, "0")}
          </span>
          <span className="drawer-topbar-note">讨论 · 结论 · 因果 claim</span>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="关闭比较存档"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        <div className="drawer-scroll" ref={scrollRef}>
          <header className="comparison-hero">
            <span className="comparison-hero-mark">
              <ArchiveIcon size={20} />
            </span>
            <div>
              <h1>案例比较讨论与结论</h1>
              <p>
                按案例组归档的比较问题、讨论摘要与结论。跨案例因果分析完成后写入
                <code>comparisons</code> 表，即可在此复核与追溯。
              </p>
            </div>
          </header>

          {!hasContent && (
            <div className="comparison-empty">
              <ArchiveIcon size={30} />
              <h2>尚无比较结论存档</h2>
              <p>
                当前只有单案例数据。完成跨案例比较、形成机制假设或因果结论后，
                这里会按案例组呈现讨论与结论摘要。
              </p>
              <ul>
                <li>每条存档包含：比较问题 · 讨论摘要 · 结论 · 涉及案例</li>
                <li>结论可关联一条或多条因果 claim，保留证据与边界条件</li>
                <li>状态区分草稿、已复核、已归档，便于阶段性停点</li>
              </ul>
            </div>
          )}

          {data.comparisons.length > 0 && (
            <section className="comparison-section">
              <header className="comparison-section-head">
                <h2>比较记录</h2>
                <span>{data.comparisons.length} 条</span>
              </header>
              <div className="comparison-list">
                {data.comparisons.map((record) => (
                  <article className="comparison-card" key={record.id}>
                    <header className="comparison-card-head">
                      <span
                        className={`comparison-status is-${record.status}`}
                      >
                        {STATUS_LABEL[record.status]}
                      </span>
                      <h3>{record.title}</h3>
                      <time>{record.updatedAt.slice(0, 10)}</time>
                    </header>
                    <div className="comparison-cases">
                      {record.caseIds.map((id) => {
                        const item = caseMap.get(id);
                        if (!item) return null;
                        return (
                          <button
                            type="button"
                            key={id}
                            onClick={() => onOpenCase(id)}
                            title={item.name}
                          >
                            {shortCaseName(item.name)}
                          </button>
                        );
                      })}
                    </div>
                    <div className="comparison-block">
                      <h4>比较问题</h4>
                      <p>{record.question}</p>
                    </div>
                    <div className="comparison-block">
                      <h4>讨论摘要</h4>
                      <p>{record.discussion}</p>
                    </div>
                    <div className="comparison-conclusion">
                      <span>结论</span>
                      <p>{record.conclusion}</p>
                    </div>
                    {record.claimIds.length > 0 && (
                      <footer className="comparison-card-foot">
                        <SparkIcon size={12} />
                        关联因果 claim {record.claimIds.length} 条
                        {record.confidence
                          ? ` · ${CONFIDENCE_LABEL[record.confidence] ?? record.confidence}`
                          : ""}
                      </footer>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {data.causalClaims.length > 0 && (
            <section className="comparison-section">
              <header className="comparison-section-head">
                <h2>因果结论</h2>
                <span>{data.causalClaims.length} 条</span>
              </header>
              <div className="comparison-list">
                {data.causalClaims.map((claim) => (
                  <article className="claim-card" key={claim.id}>
                    <header className="claim-card-head">
                      <span className={`claim-status is-${claim.status}`}>
                        {CAUSAL_LABEL[claim.status]}
                      </span>
                      <span className="claim-confidence">
                        {CONFIDENCE_LABEL[claim.confidence] ?? claim.confidence}
                      </span>
                      <span className="claim-id">{claim.id}</span>
                    </header>
                    <div className="claim-chain">
                      <strong>{claim.cause}</strong>
                      <ArrowRightIcon size={13} />
                      <strong>{claim.effect}</strong>
                    </div>
                    {claim.mechanismChain.length > 0 && (
                      <ol className="claim-mechanism">
                        {claim.mechanismChain.map((step, index) => (
                          <li key={`${claim.id}-${index}`}>{step}</li>
                        ))}
                      </ol>
                    )}
                    <div className="claim-cases">
                      {claim.caseIds.map((id) => {
                        const item = caseMap.get(id);
                        if (!item) return null;
                        return (
                          <button
                            type="button"
                            key={id}
                            onClick={() => onOpenCase(id)}
                          >
                            {shortCaseName(item.name)}
                          </button>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>,
    document.body
  );
}
