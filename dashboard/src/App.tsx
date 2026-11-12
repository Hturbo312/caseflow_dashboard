import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import type {
  BootstrapPayload,
  CaseDetail,
  EntityDetail,
  GraphNode,
  SearchHit
} from "../shared/types";
import { api } from "./api";
import { filterGraph, findPath, type PathResult, shortCaseName } from "./lib/graph";
import { GraphView } from "./components/GraphView";
import { SearchBox } from "./components/SearchBox";
import { CasePicker } from "./components/CasePicker";
import { CaseRail } from "./components/CaseRail";
import { OntologyDock } from "./components/OntologyDock";
import { CaseDrawer } from "./components/CaseDrawer";
import { CompareView } from "./components/CompareView";
import { ComparisonDrawer } from "./components/ComparisonDrawer";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  CloseIcon,
  CompareIcon,
  DatabaseIcon,
  GlobeIcon,
  GridMark,
  LayersIcon,
  RouteIcon,
  SparkIcon
} from "./components/Icons";

function nodeLabel(node: GraphNode | undefined) {
  if (!node) return "未知节点";
  return node.type === "case" ? shortCaseName(node.name) : node.name;
}

export default function App() {
  const [bootstrap, setBootstrap] = useState<BootstrapPayload | null>(null);
  const [bootError, setBootError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [pathMode, setPathMode] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [pathStart, setPathStart] = useState<string | null>(null);
  const [pathEnd, setPathEnd] = useState<string | null>(null);
  const [path, setPath] = useState<PathResult | null>(null);

  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(
    null
  );
  const [entityDetail, setEntityDetail] = useState<EntityDetail | null>(null);
  const [entityLoading, setEntityLoading] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState("v0.1");
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);

  const [drawerCaseId, setDrawerCaseId] = useState<string | null>(null);
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [caseLoading, setCaseLoading] = useState(false);
  const [caseError, setCaseError] = useState<string | null>(null);

  const caseCache = useRef(new Map<string, CaseDetail>());
  const entityCache = useRef(new Map<string, EntityDetail>());
  const entityRequest = useRef(0);
  const caseRequest = useRef(0);

  useEffect(() => {
    let active = true;
    setBootError(null);
    api
      .bootstrap()
      .then((payload) => {
        if (!active) return;
        setBootstrap(payload);
        setSelectedVersionId(
          payload.ontology[payload.ontology.length - 1]?.id ?? "v0.1"
        );
      })
      .catch(() => {
        if (active) setBootError("无法连接本地图谱服务，请确认服务已启动。");
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const graph = useMemo(
    () => (bootstrap ? filterGraph(bootstrap.graph, selectedCaseIds) : null),
    [bootstrap, selectedCaseIds]
  );

  const caseNodes = useMemo(
    () =>
      bootstrap?.cases.filter(
        (item) => selectedCaseIds.length === 0 || selectedCaseIds.includes(item.id)
      ) ?? [],
    [bootstrap, selectedCaseIds]
  );

  const fullNodeMap = useMemo(
    () =>
      new Map(
        (bootstrap?.graph.nodes ?? []).map((node) => [node.id, node] as const)
      ),
    [bootstrap]
  );

  const filteredStats = useMemo(() => {
    if (!graph) {
      return { cases: 0, entities: 0, relations: 0 };
    }
    return {
      cases: graph.nodes.filter((node) => node.type === "case").length,
      entities: graph.nodes.filter((node) => node.type !== "case").length,
      relations: graph.links.filter((link) => link.type !== "涉及").length
    };
  }, [graph]);

  useEffect(() => {
    if (!graph || !selectedEntityId) return;
    if (!graph.nodes.some((node) => node.id === selectedEntityId)) {
      setSelectedEntityId(null);
      setEntityDetail(null);
    }
  }, [graph, selectedEntityId]);

  useEffect(() => {
    setPath(null);
    setPathStart(null);
    setPathEnd(null);
  }, [selectedCaseIds]);

  useEffect(() => {
    if (!pathMode) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPath(null);
        setPathStart(null);
        setPathEnd(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [pathMode]);

  const selectEntity = useCallback(async (entityId: string) => {
    setSelectedEntityId(entityId);
    setPathMode(false);
    setCompareMode(false);
    setFocusNodeId(entityId);
    const cached = entityCache.current.get(entityId);
    if (cached) {
      setEntityDetail(cached);
      setEntityLoading(false);
      return;
    }
    const requestId = ++entityRequest.current;
    setEntityLoading(true);
    setEntityDetail(null);
    try {
      const payload = await api.entityDetail(entityId);
      entityCache.current.set(entityId, payload);
      if (requestId === entityRequest.current) {
        setEntityDetail(payload);
      }
    } catch {
      if (requestId === entityRequest.current) {
        setEntityDetail(null);
      }
    } finally {
      if (requestId === entityRequest.current) setEntityLoading(false);
    }
  }, []);

  const clearEntity = useCallback(() => {
    entityRequest.current += 1;
    setSelectedEntityId(null);
    setEntityDetail(null);
    setEntityLoading(false);
  }, []);

  const loadCase = useCallback(async (caseId: string, force = false) => {
    const cached = !force ? caseCache.current.get(caseId) : undefined;
    if (cached) {
      setCaseDetail(cached);
      setCaseLoading(false);
      setCaseError(null);
      return;
    }
    const requestId = ++caseRequest.current;
    setCaseLoading(true);
    setCaseError(null);
    setCaseDetail(null);
    try {
      const payload = await api.caseDetail(caseId);
      caseCache.current.set(caseId, payload);
      if (requestId === caseRequest.current) {
        setCaseDetail(payload);
      }
    } catch {
      if (requestId === caseRequest.current) {
        setCaseError("请检查本地服务是否正在运行。");
      }
    } finally {
      if (requestId === caseRequest.current) setCaseLoading(false);
    }
  }, []);

  const openCase = useCallback(
    (caseId: string) => {
      setDrawerCaseId(caseId);
      void loadCase(caseId);
    },
    [loadCase]
  );

  const closeDrawer = useCallback(() => {
    caseRequest.current += 1;
    setDrawerCaseId(null);
    setCaseLoading(false);
    setCaseError(null);
  }, []);

  const locateCase = useCallback((caseId: string) => {
    setDrawerCaseId(null);
    setCompareMode(false);
    setSelectedCaseIds([caseId]);
    setFocusNodeId(`case:${caseId}`);
    setSelectedEntityId(null);
    setEntityDetail(null);
    setPathMode(false);
    setPath(null);
    setPathStart(null);
    setPathEnd(null);
  }, []);

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      if (pathMode) {
        if (!pathStart || path) {
          setPathStart(node.id);
          setPathEnd(null);
          setPath(null);
          return;
        }
        if (node.id === pathStart) {
          setPathStart(null);
          setPath(null);
          return;
        }
        const result = graph
          ? findPath(graph, pathStart, node.id)
          : null;
        setPathEnd(node.id);
        setPath(result);
        return;
      }
      if (node.type === "case") {
        openCase(node.caseIds[0]);
        return;
      }
      void selectEntity(node.id);
    },
    [pathMode, pathStart, path, graph, openCase, selectEntity]
  );

  const handleSearchHit = useCallback(
    (hit: SearchHit) => {
      if (hit.kind === "entity" && hit.entityId) {
        setSelectedCaseIds([]);
        setFocusNodeId(hit.entityId);
        void selectEntity(hit.entityId);
        return;
      }
      if (hit.caseId) {
        openCase(hit.caseId);
      }
    },
    [openCase, selectEntity]
  );

  const togglePathMode = () => {
    setCompareMode(false);
    setPathMode((value) => {
      if (value) {
        setPath(null);
        setPathStart(null);
        setPathEnd(null);
      }
      return !value;
    });
  };

  const toggleCompareMode = () => {
    const next = !compareMode;
    setCompareMode(next);
    if (next) {
      setPathMode(false);
      setPath(null);
      setPathStart(null);
      setPathEnd(null);
      clearEntity();
    }
  };

  const clearPath = () => {
    setPath(null);
    setPathStart(null);
    setPathEnd(null);
  };

  const clearCases = () => {
    setSelectedCaseIds([]);
    setPath(null);
    setPathStart(null);
    setPathEnd(null);
  };

  const selectEntityFromPanel = (entityId: string) => {
    setDrawerCaseId(null);
    setSelectedCaseIds([]);
    setFocusNodeId(entityId);
    void selectEntity(entityId);
  };

  if (!bootstrap) {
    return (
      <div className="boot-screen">
        <div className="boot-mark">
          <GridMark size={44} />
        </div>
        <div className="boot-brand">
            <span className="eyebrow">社区更新案例图谱 · 2026</span>
            <h1>社区更新案例图谱</h1>
        </div>
        {bootError ? (
          <div className="boot-error">
            <p>{bootError}</p>
            <button type="button" onClick={() => setReloadKey((key) => key + 1)}>
              重新连接
            </button>
          </div>
        ) : (
          <>
            <div className="boot-loader">
              <span />
            </div>
            <div className="boot-meta">
              <DatabaseIcon size={13} />
              本地图谱索引正在加载
            </div>
          </>
        )}
      </div>
    );
  }

  const selectedVersion =
    bootstrap.ontology.find((item) => item.id === selectedVersionId) ??
    bootstrap.ontology[bootstrap.ontology.length - 1];
  const pathNodes = path?.nodeIds ?? [];

  return (
    <div className="app-shell">
      <main className="workspace">
        <section className="atlas">
          <div className="atlas-toolbar">
            <div className="filters">
              <button
                type="button"
                className={`filter-button${selectedCaseIds.length === 0 ? " is-active" : ""}`}
                onClick={clearCases}
              >
                <GlobeIcon size={14} />
                全局
              </button>
              <CasePicker
                cases={bootstrap.cases}
                selectedIds={selectedCaseIds}
                onChange={setSelectedCaseIds}
              />
              <button
                type="button"
                className={`filter-button${pathMode ? " is-active is-path" : ""}`}
                onClick={togglePathMode}
              >
                <RouteIcon size={14} />
                路径分析
              </button>
              <button
                type="button"
                className={`filter-button${compareMode ? " is-active is-compare" : ""}`}
                onClick={toggleCompareMode}
              >
                <CompareIcon size={14} />
                比较辅助
              </button>
            </div>
            <div className="toolbar-right">
              <div className="toolbar-meta">
                <span className={`scope-note${selectedCaseIds.length ? " is-filtered" : ""}`}>
                  {selectedCaseIds.length
                    ? `筛选 ${selectedCaseIds.length} 个案例 · 显示实体与关系`
                    : "全局视图 · 全部案例与实体"}
                </span>
                <div className="toolbar-stats">
                  <span>
                    <strong>{filteredStats.cases}</strong> 案例
                  </span>
                  <span>
                    <strong>{filteredStats.entities}</strong> 实体
                  </span>
                  <span>
                    <strong>{filteredStats.relations}</strong> 关系
                  </span>
                </div>
              </div>
              <div className="toolbar-search">
                <SearchBox onSelectHit={handleSearchHit} />
              </div>
            </div>
          </div>

          {compareMode ? (
            <CompareView
              cases={caseNodes}
              graph={graph ?? { nodes: [], links: [] }}
              comparison={bootstrap.comparison}
              onOpenCase={openCase}
              onOpenArchive={() => setArchiveOpen(true)}
            />
          ) : (
            <>
          <div className={`graph-stage${pathMode ? " is-path-mode" : ""}`}>
            <GraphView
              graph={graph ?? { nodes: [], links: [] }}
              selectedEntityId={selectedEntityId}
              pathNodeIds={pathNodes}
              pathLinkIds={path?.linkIds ?? []}
              pathMode={pathMode}
              focusNodeId={focusNodeId}
              onNodeClick={handleNodeClick}
              onBackgroundClick={() => {
                if (pathMode) {
                  clearPath();
                } else {
                  clearEntity();
                }
              }}
            />
            <div className="graph-caption">
              <h2>混合知识图谱</h2>
              <p>
                {selectedCaseIds.length
                  ? `${selectedCaseIds.length} 个案例 · 实体与关系`
                  : "全局视图 · 八类实体 / 原生概念 / 证据"}
              </p>
            </div>
            {railCollapsed ? (
              <button
                type="button"
                className="rail-expand-fab"
                onClick={() => setRailCollapsed(false)}
              >
                <LayersIcon size={13} />
                案例列表
                <span>{caseNodes.length}</span>
                <ChevronLeftIcon size={12} />
              </button>
            ) : (
              <div className="graph-scope-tag">
                <span className="status-dot" />
                {pathMode ? "路径分析" : "探索模式"}
              </div>
            )}

            {pathMode && (
              <div className="path-banner">
                <span className="path-kicker">路径</span>
                {!pathStart && (
                  <span className="path-instruction">
                    依次点击两个节点，分析概念之间的最短路径
                  </span>
                )}
                {pathStart && !path && (
                  <>
                    <span className="path-node">
                      {nodeLabel(fullNodeMap.get(pathStart))}
                    </span>
                    <ArrowRightIcon size={12} className="path-arrow" />
                    <span className="path-placeholder">
                      {pathEnd ? "未找到连接路径" : "选择终点"}
                    </span>
                  </>
                )}
                {path && (
                  <>
                    <div className="path-steps">
                      {path.nodeIds.map((id, index) => (
                        <Fragment key={`${id}-${index}`}>
                          {index > 0 && (
                            <ArrowRightIcon size={11} className="path-arrow" />
                          )}
                          <span className="path-node">
                            {nodeLabel(fullNodeMap.get(id))}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                    <span className="path-count">
                      {path.nodeIds.length - 1} 跳
                    </span>
                  </>
                )}
                <button
                  type="button"
                  className="path-clear"
                  onClick={clearPath}
                  aria-label="清除路径"
                >
                  <CloseIcon size={12} />
                </button>
              </div>
            )}

            <div className="graph-hint">
              <span>拖拽平移</span>
              <i />
              <span>滚轮缩放</span>
              <i />
              <span>悬停聚焦</span>
              <i />
              <span>点击查看本体</span>
            </div>
            <div className="graph-version-stamp">
              <SparkIcon size={11} />
              索引 {selectedVersion?.version} · {bootstrap.meta.relationCount} 条关系
            </div>
          </div>

          <div className="dock-slot">
            <OntologyDock
              entityDetail={entityDetail}
              entityLoading={entityLoading}
              meta={bootstrap.meta}
              ontology={bootstrap.ontology}
              selectedVersionId={selectedVersionId}
              graph={bootstrap.graph}
              onVersionChange={setSelectedVersionId}
              onClearEntity={clearEntity}
              onOpenCase={openCase}
              onSelectEntity={selectEntityFromPanel}
            />
          </div>
            </>
          )}
        </section>

        <CaseRail
          cases={caseNodes}
          meta={bootstrap.meta}
          totalCount={bootstrap.meta.caseCount}
          selectedCount={selectedCaseIds.length}
          collapsed={railCollapsed}
          onOpenCase={openCase}
          onClearSelection={clearCases}
          onToggleCollapsed={() => setRailCollapsed((value) => !value)}
        />
      </main>

      <CaseDrawer
        caseId={drawerCaseId}
        detail={caseDetail}
        nodes={bootstrap.graph.nodes}
        loading={caseLoading}
        error={caseError}
        onClose={closeDrawer}
        onRetry={() => {
          if (drawerCaseId) void loadCase(drawerCaseId, true);
        }}
        onLocate={locateCase}
        onSelectEntity={selectEntityFromPanel}
      />

      <ComparisonDrawer
        open={archiveOpen}
        data={bootstrap.comparison}
        cases={bootstrap.cases}
        onClose={() => setArchiveOpen(false)}
        onOpenCase={(caseId) => {
          setArchiveOpen(false);
          openCase(caseId);
        }}
      />
    </div>
  );
}
