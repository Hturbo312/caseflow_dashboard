import { useMemo, useState } from "react";
import type { AtlasMeta, CaseSummary } from "../../shared/types";
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  LayersIcon
} from "./Icons";
import { CaseCover } from "./CaseCover";
import { CaseTooltip } from "./CaseTooltip";

export function CaseRail({
  cases,
  meta,
  totalCount,
  selectedCount,
  collapsed,
  onOpenCase,
  onClearSelection,
  onToggleCollapsed
}: {
  cases: CaseSummary[];
  meta: AtlasMeta;
  totalCount: number;
  selectedCount: number;
  collapsed: boolean;
  onOpenCase: (caseId: string) => void;
  onClearSelection: () => void;
  onToggleCollapsed: () => void;
}) {
  const [sort, setSort] = useState<"time" | "links">("time");
  const [hovered, setHovered] = useState<{
    item: CaseSummary;
    anchor: DOMRect;
  } | null>(null);

  const sorted = useMemo(() => {
    const copy = [...cases];
    if (sort === "links") {
      copy.sort(
        (a, b) =>
          b.entityCount + b.evidenceCount - (a.entityCount + a.evidenceCount)
      );
    } else {
      copy.sort((a, b) => a.index - b.index);
    }
    return copy;
  }, [cases, sort]);

  return (
    <aside
      className={`case-rail${collapsed ? " is-collapsed" : ""}`}
      aria-label="案例列表"
    >
      <div className="rail-head">
        <div>
          <div className="rail-title-row">
            <h2>案例列表</h2>
            <span className="rail-count">
              {selectedCount > 0
                ? `${cases.length} / ${totalCount}`
                : totalCount}
            </span>
          </div>
        </div>
        <div className="rail-head-actions">
          {selectedCount > 0 && (
            <button
              type="button"
              className="text-button"
              onClick={onClearSelection}
            >
              清除筛选
            </button>
          )}
          <div className="sort-toggle" role="group" aria-label="案例排序">
            <button
              type="button"
              className={sort === "time" ? "is-active" : ""}
              onClick={() => setSort("time")}
            >
              时间
            </button>
            <button
              type="button"
              className={sort === "links" ? "is-active" : ""}
              onClick={() => setSort("links")}
            >
              关联
            </button>
          </div>
        </div>
        <button
          type="button"
          className="rail-collapse"
          onClick={onToggleCollapsed}
          aria-label="收起案例列表"
          aria-expanded={!collapsed}
        >
          <ChevronRightIcon size={14} />
        </button>
      </div>

      <div className="rail-scroll">
        {sorted.length === 0 && (
          <div className="rail-empty">
            <LayersIcon size={26} />
            <p>当前筛选下没有案例</p>
            <button type="button" onClick={onClearSelection}>
              回到全局
            </button>
          </div>
        )}
        {sorted.map((item) => (
          <article
            key={item.id}
            className="case-card"
            tabIndex={0}
            role="button"
            aria-label={`${item.name}，${item.country}，${item.year}，查看案例详情`}
            onClick={() => onOpenCase(item.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpenCase(item.id);
              }
            }}
            onMouseEnter={(event) =>
              setHovered({
                item,
                anchor: event.currentTarget.getBoundingClientRect()
              })
            }
            onMouseLeave={() => setHovered(null)}
            onFocus={(event) =>
              setHovered({
                item,
                anchor: event.currentTarget.getBoundingClientRect()
              })
            }
            onBlur={() => setHovered(null)}
          >
            <CaseCover item={item} />
            <div className="case-card-body">
              <div className="case-card-kicker">
                <span>{item.code.replace(/^C/, "")}</span>
                <div className="case-tags">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <ArrowUpRightIcon size={13} className="case-card-arrow" />
              </div>
              <h3>{item.name}</h3>
              <div className="case-card-meta">
                <span>{item.country}</span>
                <i />
                <span>{item.city}</span>
                <i />
                <span>{item.year}</span>
              </div>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="rail-foot">
        <span className="status-dot" />
        <span>
          示例数据 · {meta.caseCount} 案例 · {meta.materialCount} 材料 ·{" "}
          {meta.evidenceCount} 证据
        </span>
      </div>

      {hovered && (
        <CaseTooltip item={hovered.item} anchor={hovered.anchor} />
      )}
    </aside>
  );
}
