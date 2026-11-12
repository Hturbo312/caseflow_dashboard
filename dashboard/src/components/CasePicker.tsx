import { useEffect, useMemo, useRef, useState } from "react";
import type { CaseSummary } from "../../shared/types";
import {
  CheckIcon,
  ChevronDownIcon,
  LayersIcon,
  SearchIcon
} from "./Icons";

export function CasePicker({
  cases,
  selectedIds,
  onChange
}: {
  cases: CaseSummary[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const selected = useMemo(() => new Set(selectedIds), [selectedIds]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) setFilter("");
  }, [open]);

  const visible = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return cases;
    return cases.filter((item) =>
      `${item.name} ${item.nameEn} ${item.country} ${item.city} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(query)
    );
  }, [cases, filter]);

  const toggle = (id: string) => {
    if (selected.has(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="case-picker" ref={wrapperRef}>
      <button
        type="button"
        className={`filter-button${selectedIds.length > 0 ? " is-active" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <LayersIcon size={14} />
        <span>{selectedIds.length > 0 ? "已选案例" : "选择案例"}</span>
        {selectedIds.length > 0 && (
          <span className="filter-count">{selectedIds.length}</span>
        )}
        <ChevronDownIcon size={13} className="filter-chevron" />
      </button>

      {open && (
        <div className="case-picker-panel" role="dialog" aria-label="选择案例">
          <div className="picker-head">
            <div>
              <span className="eyebrow">案例筛选</span>
              <strong>选择案例</strong>
            </div>
            <span className="picker-selected">{selectedIds.length} 已选</span>
          </div>
          <div className="picker-search">
            <SearchIcon size={13} />
            <input
              id="case-picker-filter"
              name="case-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="按名称、国家或标签筛选"
              autoFocus
            />
          </div>
          <div className="picker-list">
            {visible.map((item) => {
              const checked = selected.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`picker-row${checked ? " is-checked" : ""}`}
                  onClick={() => toggle(item.id)}
                  aria-pressed={checked}
                >
                  <span className="picker-check">
                    {checked && <CheckIcon size={12} />}
                  </span>
                  <span className="picker-color" style={{ background: item.accent }} />
                  <span className="picker-row-main">
                    <strong>{item.name}</strong>
                    <small>
                      {item.country} · {item.year} · {item.tags[0]}
                    </small>
                  </span>
                </button>
              );
            })}
            {visible.length === 0 && (
              <div className="picker-empty">没有匹配的案例</div>
            )}
          </div>
          <div className="picker-foot">
            <button
              type="button"
              className="text-button"
              onClick={() => onChange([])}
            >
              清空
            </button>
            <button
              type="button"
              className="text-button"
              onClick={() => onChange(cases.map((item) => item.id))}
            >
              全选
            </button>
            <button
              type="button"
              className="picker-done"
              onClick={() => setOpen(false)}
            >
              完成
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
