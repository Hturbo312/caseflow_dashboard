import { createPortal } from "react-dom";
import type { CaseSummary } from "../../shared/types";
import { STRENGTH_META } from "../../shared/meta";
import { ArrowRightIcon } from "./Icons";
import { CaseCover } from "./CaseCover";

export function CaseTooltip({
  item,
  anchor
}: {
  item: CaseSummary;
  anchor: DOMRect;
}) {
  const width = 408;
  const margin = 16;
  let left = anchor.left - width - margin;
  if (left < 12) {
    left = Math.min(
      window.innerWidth - width - 12,
      anchor.right + margin
    );
  }
  const top = Math.max(
    12,
    Math.min(anchor.top - 12, window.innerHeight - 478)
  );

  return createPortal(
    <div
      className="case-tooltip"
      style={{ left, top, width }}
      role="tooltip"
    >
      <div className="case-tooltip-top">
        <span className="case-tooltip-kicker">
          案例档案 · {item.code.replace(/^C/, "")}
        </span>
        <span className="case-tooltip-count">
          {item.entityCount} 个实体
        </span>
      </div>
      <div className="case-tooltip-head">
        <CaseCover item={item} />
        <div>
          <h3>{item.name}</h3>
          <div className="case-tooltip-meta">
            {item.country} · {item.city} · {item.year}
          </div>
          <div className="case-tooltip-tags">
            {item.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="case-tooltip-summary">{item.summary}</p>

      <div className="case-tooltip-section">
        <div className="case-tooltip-label">
          <span>01</span> 案例重建
        </div>
        <p className="case-tooltip-rebuild">{item.preview.rebuild}</p>
      </div>

      <div className="case-tooltip-columns">
        <div className="case-tooltip-section">
          <div className="case-tooltip-label">
            <span>02</span> 材料
          </div>
          <ul className="case-tooltip-list">
            {item.preview.materials.map((material) => (
              <li key={material.id}>
                <span className="list-mark" />
                <div>
                  <strong>{material.title}</strong>
                  <small>
                    {material.kind} · {material.date}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="case-tooltip-section">
          <div className="case-tooltip-label">
            <span>03</span> 证据
          </div>
          <ul className="case-tooltip-list case-tooltip-evidence">
            {item.preview.evidence.map((evidence) => (
              <li key={evidence.id}>
                <span
                  className="strength-dot"
                  style={{
                    background: STRENGTH_META[evidence.strength].color
                  }}
                />
                <div>
                  <strong>{evidence.claim}</strong>
                  <small>{STRENGTH_META[evidence.strength].label}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="case-tooltip-footer">
        <span>点击打开完整档案</span>
        <ArrowRightIcon size={14} />
      </div>
    </div>,
    document.body
  );
}
