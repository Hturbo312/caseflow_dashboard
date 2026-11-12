import { useEffect, useRef, useState } from "react";
import type { SearchHit, SearchPayload } from "../../shared/types";
import { api } from "../api";
import {
  BookIcon,
  FileIcon,
  LayersIcon,
  QuoteIcon,
  SearchIcon,
  SparkIcon
} from "./Icons";

const SUGGESTIONS = ["潮湿住房", "居民参与", "社区网络分析", "证据强度"];

function HitIcon({ kind }: { kind: SearchHit["kind"] }) {
  if (kind === "case") return <LayersIcon size={15} />;
  if (kind === "material") return <BookIcon size={15} />;
  if (kind === "evidence") return <QuoteIcon size={15} />;
  return <FileIcon size={15} />;
}

const KIND_LABEL: Record<SearchHit["kind"], string> = {
  case: "案例",
  entity: "实体",
  material: "材料",
  evidence: "证据"
};

export function SearchBox({
  onSelectHit
}: {
  onSelectHit: (hit: SearchHit) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResult(null);
      setLoading(false);
      setError(null);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    const timer = window.setTimeout(async () => {
      try {
        const payload = await api.search(trimmed, controller.signal);
        setResult(payload);
        setActiveIndex(0);
      } catch (searchError) {
        if (!controller.signal.aborted) {
          setError("检索暂时不可用");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 220);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const hits = result?.hits ?? [];

  const select = (hit: SearchHit) => {
    onSelectHit(hit);
    setOpen(false);
    setQuery("");
    setResult(null);
    inputRef.current?.blur();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        hits.length === 0 ? 0 : (index + 1) % hits.length
      );
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        hits.length === 0 ? 0 : (index - 1 + hits.length) % hits.length
      );
      return;
    }
    if (event.key === "Enter" && hits[activeIndex]) {
      event.preventDefault();
      select(hits[activeIndex]);
    }
  };

  const showPanel = open;

  return (
    <div className="search-box" ref={wrapperRef}>
      <div className={`search-input-wrap${open ? " is-open" : ""}`}>
        <SearchIcon size={15} className="search-icon" />
        <input
          ref={inputRef}
          id="atlas-search"
          name="q"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="检索案例、实体或证据"
          aria-label="向量检索"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="search-results"
          autoComplete="off"
        />
        {query ? (
          <button
            type="button"
            className="search-clear"
            onClick={() => {
              setQuery("");
              setResult(null);
              inputRef.current?.focus();
            }}
            aria-label="清空检索"
          >
            ×
          </button>
        ) : (
          <kbd>快捷键</kbd>
        )}
      </div>

      {showPanel && (
        <div className="search-panel" id="search-results">
          <div className="search-panel-head">
            <div>
              <span className="eyebrow">混合检索</span>
              <strong>{query ? "检索结果" : "语义检索"}</strong>
            </div>
            <span className="vector-badge">
              <SparkIcon size={11} />
              本地向量检索
            </span>
          </div>

          {!query && (
            <div className="search-suggest">
              <p>
                在案例重建、实体定义、材料与证据中做向量检索。试试：
              </p>
              <div className="suggestion-chips">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setQuery(suggestion);
                      inputRef.current?.focus();
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="search-note">
                <span className="status-dot" />
                本地索引 · 不离开本机
              </div>
            </div>
          )}

          {loading && query && (
            <div className="search-skeleton">
              {[0, 1, 2].map((index) => (
                <div key={index} className="search-skeleton-row">
                  <span />
                  <div>
                    <i />
                    <i />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && query && hits.length > 0 && (
            <div className="search-results" role="listbox">
              {hits.map((hit, index) => (
                <button
                  key={`${hit.kind}-${hit.refId}`}
                  type="button"
                  className={`search-hit${index === activeIndex ? " is-active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => select(hit)}
                  role="option"
                  aria-selected={index === activeIndex}
                >
                  <span className="search-hit-icon">
                    <HitIcon kind={hit.kind} />
                  </span>
                  <span className="search-hit-main">
                    <span className="search-hit-top">
                      <span className="search-hit-kind">
                        {KIND_LABEL[hit.kind]}
                      </span>
                      <strong>{hit.title}</strong>
                    </span>
                    <span className="search-hit-sub">{hit.subtitle}</span>
                    <span className="search-hit-snippet">{hit.snippet}</span>
                  </span>
                  <span className="search-hit-score">
                    <i style={{ width: `${Math.round(hit.score * 100)}%` }} />
                    <small>{Math.round(hit.score * 100)}</small>
                  </span>
                </button>
              ))}
            </div>
          )}

          {!loading && query && hits.length === 0 && !error && (
            <div className="search-empty">
              没有找到“{query}”的相关内容，试试更短的关键词。
            </div>
          )}

          {error && <div className="search-empty">{error}</div>}

          {query && hits.length > 0 && (
            <div className="search-panel-foot">
              <span>
                {hits.length} 条结果 · {result?.took ?? 0} ms
              </span>
              <span>↑↓ 选择 · 回车打开 · 退出关闭</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
