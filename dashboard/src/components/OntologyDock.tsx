import { useState } from "react";
import type {
  AtlasMeta,
  EntityDetail,
  GraphData,
  OntologyVersion
} from "../../shared/types";
import {
  CHANGE_META,
  TYPE_META,
  ENTITY_TYPES
} from "../../shared/meta";
import {
  conceptScope,
  shortCaseName,
  visibleCaseIds
} from "../lib/graph";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  InfoIcon,
  TargetIcon
} from "./Icons";
import { TypeGlyph } from "./TypeGlyph";

export function OntologyDock({
  entityDetail,
  entityLoading,
  meta,
  ontology,
  selectedVersionId,
  graph,
  onVersionChange,
  onClearEntity,
  onOpenCase,
  onSelectEntity
}: {
  entityDetail: EntityDetail | null;
  entityLoading: boolean;
  meta: AtlasMeta;
  ontology: OntologyVersion[];
  selectedVersionId: string;
  graph: GraphData;
  onVersionChange: (versionId: string) => void;
  onClearEntity: () => void;
  onOpenCase: (caseId: string) => void;
  onSelectEntity: (entityId: string) => void;
}) {
  const [versionOpen, setVersionOpen] = useState(false);
  const selectedVersion =
    ontology.find((item) => item.id === selectedVersionId) ??
    ontology[ontology.length - 1];
  const counts = ENTITY_TYPES.map((type) => ({
    type,
    count: graph.nodes.filter((node) => node.type === type).length
  }));
  const visibleCases = visibleCaseIds(graph);
  const entityScope = entityDetail
    ? conceptScope(entityDetail.entity, visibleCases)
    : "none";

  return (
    <section
      className={`ontology-dock${versionOpen ? "" : " is-version-collapsed"}${entityDetail ? " has-entity" : ""}`}
      aria-label="知识框架、图例与版本历史"
    >
      <div className="dock-head">
        <div className="dock-title">
          <TargetIcon size={15} />
          <span className="dock-title-cn">知识框架</span>
        </div>
        <span className="dock-collapsed-note">
          {graph.nodes.filter((node) => node.type !== "case").length} 实体 ·{" "}
          {graph.links.filter((link) => link.type !== "涉及").length} 关系
        </span>
        <div className="dock-head-spacer" />
        <button
          type="button"
          className="dock-version-jump"
          onClick={() => {
            setVersionOpen(true);
          }}
        >
          <span className="eyebrow">版本历史</span>
          <span className="version-pill">{selectedVersion?.version}</span>
          <span>{selectedVersion?.date}</span>
        </button>
      </div>

      <div className="dock-body dock-body--stack">
        <section className="framework-legend">
          <div className="framework-section-head">
            <h4>图谱图例</h4>
            <span className="framework-count">{graph.nodes.length} 节点</span>
          </div>
          <div className="legend-types legend-types--inline">
            {counts.map(({ type, count }) => (
              <div key={type} className="legend-row">
                <TypeGlyph type={type} size={11} />
                <span>{TYPE_META[type].label}</span>
                <em>{count}</em>
              </div>
            ))}
          </div>
          <div className="framework-scope">
            <span className="framework-scope-label">概念层</span>
            <span className="scope-item">
              <i className="scope-glyph" />
              原生 <em>{meta.nativeConceptCount}</em>
            </span>
            <span className="scope-item">
              <i className="scope-glyph is-shared" />
              共享 <em>{meta.sharedConceptCount}</em>
            </span>
            <span className="framework-scope-note">概念与实体分层记录</span>
          </div>
          <div className="framework-legend-foot">
            <div className="legend-lines">
              <div>
                <span className="line-sample line-solid" />
                知识关系
              </div>
              <div>
                <span className="line-sample line-dashed" />
                案例涉及
              </div>
              <div>
                <span className="line-sample line-path" />
                分析路径
              </div>
            </div>
            <span className="framework-mini-note">
              <InfoIcon size={11} />
              节点大小 = 关系度数
            </span>
            <span className="framework-mini-note">悬停聚焦 · 点击查看</span>
          </div>
        </section>

        {entityLoading && (
          <section className="framework-entity">
            <div className="entity-skeleton">
              <span />
              <span />
              <span />
            </div>
          </section>
        )}

        {!entityLoading && entityDetail && (
          <section className="framework-entity">
            <div className="framework-entity-head">
              <TypeGlyph type={entityDetail.entity.type} size={13} />
              <span
                className="framework-type"
                style={{ color: TYPE_META[entityDetail.entity.type].color }}
              >
                {TYPE_META[entityDetail.entity.type].label}
              </span>
              <h4>{entityDetail.entity.name}</h4>
              {entityScope !== "none" && (
                <span
                  className={`framework-scope-tag is-${entityScope}`}
                >
                  {entityScope === "shared" ? "跨案例" : "单案例"}
                </span>
              )}
              <button
                type="button"
                className="icon-button"
                onClick={onClearEntity}
                aria-label="清除实体选择"
              >
                <CloseIcon size={13} />
              </button>
            </div>
            <div className="framework-entity-grid">
              <div>
                <p className="framework-entity-desc">
                  {entityDetail.entity.description}
                </p>
                <div className="entity-signals entity-signals--inline">
                  <div>
                    <strong>{entityDetail.signal.cases}</strong>
                    <span>案例</span>
                  </div>
                  <div>
                    <strong>{entityDetail.signal.evidence}</strong>
                    <span>证据</span>
                  </div>
                  <div>
                    <strong>{entityDetail.signal.relations}</strong>
                    <span>关系</span>
                  </div>
                </div>
              </div>
              <div className="framework-entity-side">
                <div className="framework-entity-label">出现于</div>
                <div className="entity-case-chips">
                  {entityDetail.cases.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onOpenCase(item.id)}
                      style={
                        { "--chip-color": item.accent } as React.CSSProperties
                      }
                    >
                      <span />
                      {shortCaseName(item.name)}
                      <ArrowUpRightIcon size={10} />
                    </button>
                  ))}
                </div>
                <div className="framework-entity-label">直接关系</div>
                <div className="entity-neighbors entity-neighbors--inline">
                  {entityDetail.neighbors.slice(0, 4).map((neighbor, index) => (
                    <button
                      key={`${neighbor.node.id}-${index}`}
                      type="button"
                      onClick={() => onSelectEntity(neighbor.node.id)}
                    >
                      <TypeGlyph type={neighbor.node.type} size={9} />
                      <span>{neighbor.node.name}</span>
                      <em>{neighbor.label}</em>
                    </button>
                  ))}
                  {entityDetail.neighbors.length === 0 && (
                    <span className="entity-empty-line">暂无直接关系</span>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <section
          className={`framework-version${versionOpen ? " is-open" : ""}`}
        >
          <button
            type="button"
            className="framework-version-head"
            onClick={() => setVersionOpen((value) => !value)}
            aria-expanded={versionOpen}
          >
            <h4>版本历史</h4>
            <span className="framework-version-current">
              {selectedVersion?.version} · {selectedVersion?.date}
            </span>
            <span className="framework-version-toggle-label">
              {versionOpen ? "收起" : "展开"}
            </span>
            {versionOpen ? (
              <ChevronUpIcon size={13} />
            ) : (
              <ChevronDownIcon size={13} />
            )}
          </button>

          {versionOpen && selectedVersion && (
            <div className="framework-version-body">
              <div className="version-timeline">
                {ontology.map((version) => (
                  <button
                    key={version.id}
                    type="button"
                    className={`version-card${selectedVersion.id === version.id ? " is-active" : ""}`}
                    onClick={() => onVersionChange(version.id)}
                  >
                    <span className="version-card-top">
                      <strong>{version.version}</strong>
                      <em>{version.date.slice(2).replace(/-/g, ".")}</em>
                    </span>
                    <span>{version.title}</span>
                  </button>
                ))}
              </div>
              <div className="version-detail">
                <div className="version-detail-head">
                  <div>
                    <span className="eyebrow">版本说明</span>
                    <h4>{selectedVersion.title}</h4>
                  </div>
                  <div className="version-stats">
                    <span>
                      <strong>{selectedVersion.stats.entities}</strong> 实体
                    </span>
                    <span>
                      <strong>{selectedVersion.stats.relations}</strong> 关系
                    </span>
                    <span>
                      <strong>{selectedVersion.stats.cases}</strong> 案例
                    </span>
                  </div>
                </div>
                <p className="version-summary">{selectedVersion.summary}</p>
                <div className="version-changes">
                  {selectedVersion.changes.map((change, index) => {
                    const meta = CHANGE_META[change.kind];
                    return (
                      <div
                        key={`${change.text}-${index}`}
                        className="change-row"
                      >
                        <span
                          className="change-badge"
                          style={{
                            color: meta.color,
                            borderColor: `${meta.color}55`,
                            background: `${meta.color}10`
                          }}
                        >
                          {meta.label}
                        </span>
                        <span>{change.text}</span>
                        {change.count !== undefined && <em>{change.count}</em>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
