import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum
} from "d3-force";
import type { GraphData, GraphNode } from "../../shared/types";
import { TYPE_META } from "../../shared/meta";
import {
  conceptCaseCount,
  conceptScope,
  shortCaseName,
  visibleCaseIds
} from "../lib/graph";
import { FitIcon, MinusIcon, PlusIcon } from "./Icons";

interface SimNode extends GraphNode, SimulationNodeDatum {
  radius: number;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  id: string;
  type: string;
  label: string;
  weight: number;
}

const typeCache = new Map<string, number>();

const typePx = (name: string, fallback: number) => {
  const cached = typeCache.get(name);
  if (cached !== undefined) return cached;
  const parsed = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name)
  );
  const px = Number.isFinite(parsed) ? parsed : fallback;
  typeCache.set(name, px);
  return px;
};

interface Transform {
  x: number;
  y: number;
  k: number;
}

interface DragState {
  mode: "node" | "pan";
  node?: SimNode;
  startX: number;
  startY: number;
  startTx: number;
  startTy: number;
  moved: boolean;
}

interface GraphViewProps {
  graph: GraphData;
  selectedEntityId: string | null;
  pathNodeIds: string[];
  pathLinkIds: string[];
  pathMode: boolean;
  focusNodeId: string | null;
  onNodeClick: (node: GraphNode) => void;
  onBackgroundClick: () => void;
}

function endpointId(endpoint: SimLink["source"]) {
  return typeof endpoint === "object" ? endpoint.id : String(endpoint);
}

const NODE_COLORS = Object.fromEntries(
  Object.entries(TYPE_META).map(([key, value]) => [key, value.color])
) as Record<GraphNode["type"], string>;

const Y_SCALE = 0.74;

function hashCode(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function radiusFor(node: GraphNode) {
  if (node.type === "case") return 11.5;
  return Math.min(10.5, 4.4 + Math.sqrt(node.degree) * 1.32);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

export function GraphView({
  graph,
  selectedEntityId,
  pathNodeIds,
  pathLinkIds,
  pathMode,
  focusNodeId,
  onNodeClick,
  onBackgroundClick
}: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hover, setHover] = useState<{
    node: GraphNode;
    x: number;
    y: number;
  } | null>(null);
  const [zoom, setZoom] = useState(100);

  const nodesRef = useRef<SimNode[]>([]);
  const linksRef = useRef<SimLink[]>([]);
  const simulationRef = useRef<Simulation<SimNode, SimLink> | null>(null);
  const transformRef = useRef<Transform>({ x: 0, y: 0, k: 1 });
  const positionCache = useRef(new Map<string, { x: number; y: number }>());
  const dragRef = useRef<DragState | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const hoveredNodeRef = useRef<GraphNode | null>(null);
  const selectedRef = useRef<string | null>(selectedEntityId);
  const pathNodesRef = useRef(new Set<string>());
  const pathLinksRef = useRef(new Set<string>());
  const cameraAnimRef = useRef<number | null>(null);
  const drawRef = useRef<() => void>(() => undefined);
  const sizeRef = useRef(size);
  const clickRef = useRef({ onNodeClick, onBackgroundClick, pathMode });

  const pathNodeSet = useMemo(() => new Set(pathNodeIds), [pathNodeIds]);
  const pathLinkSet = useMemo(() => new Set(pathLinkIds), [pathLinkIds]);
  const visibleCaseSet = useMemo(() => visibleCaseIds(graph), [graph]);

  useEffect(() => {
    selectedRef.current = selectedEntityId;
    pathNodesRef.current = pathNodeSet;
    pathLinksRef.current = pathLinkSet;
    drawRef.current();
  }, [selectedEntityId, pathNodeSet, pathLinkSet]);

  useEffect(() => {
    clickRef.current = { onNodeClick, onBackgroundClick, pathMode };
  }, [onNodeClick, onBackgroundClick, pathMode]);

  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      setSize({ width: rect.width, height: rect.height });
    });
    observer.observe(element);
    const rect = element.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });
    return () => observer.disconnect();
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = sizeRef.current;
    if (width === 0 || height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const { x: tx, y: ty, k } = transformRef.current;
    const compactLabels = width < 1100;
    const nodes = nodesRef.current;
    const links = linksRef.current;
    if (nodes.length === 0) return;

    const hovered = hoveredNodeRef.current;
    const selected = selectedRef.current;
    const pathNodes = pathNodesRef.current;
    const pathLinks = pathLinksRef.current;
    const hasPath = pathNodes.size > 1;
    const focusId = hovered?.id ?? selected;

    const related = new Set<string>();
    if (focusId) {
      related.add(focusId);
      for (const link of links) {
        const source = endpointId(link.source);
        const target = endpointId(link.target);
        if (source === focusId) related.add(target);
        if (target === focusId) related.add(source);
      }
    }

    const nodeScreen = new Map<
      string,
      { x: number; y: number; radius: number }
    >();
    const visibleCases = new Set<string>();
    for (const node of nodes) {
      if (node.type !== "case") continue;
      for (const caseId of node.caseIds) visibleCases.add(caseId);
    }
    for (const node of nodes) {
      const worldX = node.x ?? 0;
      const worldY = node.y ?? 0;
      const screenRadius =
        radiusFor(node) * Math.max(0.72, Math.min(1.5, k));
      nodeScreen.set(node.id, {
        x: worldX * k + tx,
        y: worldY * Y_SCALE * k + ty,
        radius: screenRadius
      });
    }

    const nodeAlpha = (id: string) => {
      if (hasPath) return pathNodes.has(id) ? 1 : 0.1;
      if (focusId) return related.has(id) ? 1 : 0.16;
      return 1;
    };

    const drawEdge = (link: SimLink, highlighted: boolean) => {
      const sourceId = endpointId(link.source);
      const targetId = endpointId(link.target);
      const source = nodeScreen.get(sourceId);
      const target = nodeScreen.get(targetId);
      if (!source || !target) return;

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.hypot(dx, dy) || 1;
      const nx = -dy / distance;
      const ny = dx / distance;
      const bend = ((hashCode(link.id) % 9) - 4) * 3.2;
      const cx = (source.x + target.x) / 2 + nx * bend;
      const cy = (source.y + target.y) / 2 + ny * bend;

      const isPathEdge = pathLinks.has(link.id);
      const isFocusEdge =
        focusId !== null && (sourceId === focusId || targetId === focusId);
      const alpha = hasPath
        ? isPathEdge
          ? 1
          : 0.07
        : focusId
          ? isFocusEdge
            ? 0.95
            : 0.045
          : link.type === "涉及"
            ? 0.27
            : 0.3;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.quadraticCurveTo(cx, cy, target.x, target.y);
      if (isPathEdge) {
        ctx.strokeStyle = "#b8442f";
        ctx.lineWidth = 2.6;
        ctx.shadowColor = "rgba(184,68,47,.35)";
        ctx.shadowBlur = 7;
      } else if (isFocusEdge) {
        ctx.strokeStyle = "#4b545e";
        ctx.lineWidth = 1.55;
      } else {
        ctx.strokeStyle = link.type === "涉及" ? "#6d7580" : "#67717c";
        ctx.lineWidth = 0.75 + link.weight * 0.13;
      }
      if (link.type === "涉及") {
        ctx.setLineDash([2, 4]);
      }
      ctx.stroke();
      ctx.restore();

      if ((isPathEdge || isFocusEdge) && link.type !== "涉及") {
        const angle = Math.atan2(target.y - cy, target.x - cx);
        const arrowX = target.x - Math.cos(angle) * (target.radius + 3);
        const arrowY = target.y - Math.sin(angle) * (target.radius + 3);
        ctx.save();
        ctx.translate(arrowX, arrowY);
        ctx.rotate(angle);
        ctx.fillStyle = isPathEdge ? "#b8442f" : "#4b545e";
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-6, 2.6);
        ctx.lineTo(-6, -2.6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      if (isPathEdge) {
        const midX = (source.x + 2 * cx + target.x) / 4;
        const midY = (source.y + 2 * cy + target.y) / 4;
        const label = link.label;
        ctx.save();
        ctx.font = `600 ${typePx("--text-2xs", 10)}px "Segoe UI", "Microsoft YaHei", sans-serif`;
        const textWidth = ctx.measureText(label).width;
        ctx.fillStyle = "#f7f2e8";
        roundRect(ctx, midX - textWidth / 2 - 5, midY - 8, textWidth + 10, 16, 8);
        ctx.fill();
        ctx.strokeStyle = "rgba(184,68,47,.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "#a33c29";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, midX, midY + 0.5);
        ctx.restore();
      }
    };

    const baseLinks = links.filter((link) => {
      const sourceId = endpointId(link.source);
      const targetId = endpointId(link.target);
      const isPathEdge = pathLinks.has(link.id);
      const isFocusEdge =
        focusId !== null && (sourceId === focusId || targetId === focusId);
      return !isPathEdge && !isFocusEdge;
    });
    for (const link of baseLinks) drawEdge(link, false);
    for (const link of links) {
      const sourceId = endpointId(link.source);
      const targetId = endpointId(link.target);
      if (
        pathLinks.has(link.id) ||
        (focusId !== null && (sourceId === focusId || targetId === focusId))
      ) {
        drawEdge(link, true);
      }
    }

    const sortedNodes = [...nodes].sort((a, b) => {
      const aSpecial =
        a.id === focusId || pathNodes.has(a.id) || a.type === "case";
      const bSpecial =
        b.id === focusId || pathNodes.has(b.id) || b.type === "case";
      return Number(aSpecial) - Number(bSpecial);
    });

    for (const node of sortedNodes) {
      const point = nodeScreen.get(node.id);
      if (!point) continue;
      const { x, y, radius } = point;
      const alpha = nodeAlpha(node.id);
      const isHovered = hovered?.id === node.id;
      const isSelected = selected === node.id;
      const isOnPath = pathNodes.has(node.id);
      const color = NODE_COLORS[node.type];
      const isCase = node.type === "case";
      const scope = conceptScope(node, visibleCases);

      ctx.save();
      ctx.globalAlpha = alpha;
      if (isHovered || isSelected || isOnPath) {
        ctx.shadowColor = "rgba(25,30,36,.28)";
        ctx.shadowBlur = 14;
      }

      if (isCase) {
        ctx.fillStyle = "#20242a";
        roundRect(ctx, x - radius, y - radius, radius * 2, radius * 2, 3.4);
        ctx.fill();
        ctx.strokeStyle = isOnPath ? "#b8442f" : "#f7f2e8";
        ctx.lineWidth = isOnPath ? 2.6 : 1.7;
        ctx.stroke();
        ctx.fillStyle = "rgba(247,242,232,.9)";
        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = color;
        ctx.strokeStyle = "#f8f5ed";
        ctx.lineWidth = 1.35;
        if (node.type === "context") {
          ctx.beginPath();
          ctx.moveTo(x, y - radius);
          ctx.lineTo(x + radius, y);
          ctx.lineTo(x, y + radius);
          ctx.lineTo(x - radius, y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (node.type === "actor") {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (node.type === "task") {
          roundRect(ctx, x - radius, y - radius * 0.78, radius * 2, radius * 1.56, radius * 0.38);
          ctx.fill();
          ctx.stroke();
        } else if (node.type === "technology") {
          ctx.beginPath();
          for (let i = 0; i < 6; i += 1) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (node.type === "capability") {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.lineWidth = Math.max(1.8, radius * 0.34);
          ctx.strokeStyle = color;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1.5, radius * 0.24), 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        } else if (node.type === "action") {
          ctx.beginPath();
          ctx.moveTo(x, y - radius);
          ctx.lineTo(x + radius, y + radius * 0.82);
          ctx.lineTo(x - radius, y + radius * 0.82);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (node.type === "target") {
          roundRect(ctx, x - radius * 0.82, y - radius * 0.82, radius * 1.64, radius * 1.64, radius * 0.18);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = color;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1.4, radius * 0.24), 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,.9)";
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.6;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, radius * 0.58, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, y, radius * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      if (scope === "shared") {
        ctx.save();
        ctx.globalAlpha = alpha * 0.82;
        ctx.setLineDash([2.5, 2]);
        ctx.strokeStyle = "rgba(38, 44, 50, 0.62)";
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(x, y, radius + 3.2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(x, y, radius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = isOnPath ? "#b8442f" : "#20242a";
        ctx.lineWidth = 1;
        ctx.globalAlpha = alpha * 0.55;
        ctx.stroke();
      }
      ctx.restore();
    }

    if (hasPath) {
      const first = pathNodeIds[0];
      const last = pathNodeIds[pathNodeIds.length - 1];
      const drawBadge = (id: string, label: string) => {
        const point = nodeScreen.get(id);
        if (!point) return;
        ctx.save();
        ctx.font = `600 ${typePx("--text-2xs", 10)}px "Segoe UI", "Microsoft YaHei", sans-serif`;
        const textWidth = ctx.measureText(label).width;
        const bx = point.x - textWidth / 2 - 6;
        const by = point.y - point.radius - 23;
        ctx.fillStyle = "#20242a";
        roundRect(ctx, bx, by, textWidth + 12, 16, 8);
        ctx.fill();
        ctx.fillStyle = "#f7f2e8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, point.x, by + 8.5);
        ctx.restore();
      };
      drawBadge(first, "起点");
      if (last !== first) drawBadge(last, "终点");
    }

    const labelNodes = [...nodes].sort((a, b) => {
      const score = (node: (typeof nodes)[number]) => {
        if (node.id === hovered?.id) return 0;
        if (node.id === selected) return 1;
        if (pathNodes.has(node.id)) return 2;
        if (node.type === "case") return 3;
        return 4 - node.degree;
      };
      return score(a) - score(b);
    });
    const labelBoxes: Array<{
      left: number;
      right: number;
      top: number;
      bottom: number;
    }> = [];

    for (const node of labelNodes) {
      const point = nodeScreen.get(node.id);
      if (!point) continue;
      const alpha = nodeAlpha(node.id);
      const isHovered = hovered?.id === node.id;
      const isSelected = selected === node.id;
      const isOnPath = pathNodes.has(node.id);
      const isRelated = focusId ? related.has(node.id) : false;
      const showLabel =
        isHovered ||
        isSelected ||
        isOnPath ||
        node.type === "case" ||
        (focusId && isRelated) ||
        (k > 0.86 && node.degree >= (compactLabels ? 5 : 3)) ||
        (k > 0.62 && node.degree >= 6);
      if (!showLabel || alpha < 0.35) continue;
      const label = node.type === "case" ? shortCaseName(node.name) : node.name;
      ctx.save();
      ctx.font =
        node.type === "case"
          ? `600 ${typePx("--text-sm", 12)}px "Segoe UI", "Microsoft YaHei", sans-serif`
          : `500 ${typePx("--text-xs", 11)}px "Segoe UI", "Microsoft YaHei", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const labelY =
        point.y + point.radius + (node.type === "case" ? 5 : 4);
      const labelWidth = ctx.measureText(label).width;
      const labelBox = {
        left: point.x - labelWidth / 2 - 3,
        right: point.x + labelWidth / 2 + 3,
        top: labelY - 2,
        bottom: labelY + 14
      };
      const forceLabel = isHovered || isSelected || isOnPath;
      const collides = labelBoxes.some(
        (box) =>
          labelBox.left < box.right &&
          labelBox.right > box.left &&
          labelBox.top < box.bottom &&
          labelBox.bottom > box.top
      );
      if (!forceLabel && collides) continue;
      labelBoxes.push(labelBox);
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 3.2;
      ctx.strokeStyle = "rgba(246,243,236,.94)";
      ctx.lineJoin = "round";
      ctx.strokeText(label, point.x, labelY);
      ctx.fillStyle = node.type === "case" ? "#20242a" : "#3f464e";
      ctx.fillText(label, point.x, labelY);
      ctx.restore();
    }
  }, [focusIdDependency(focusNodeId), pathNodeIds]);

  // Keep drawRef current without making the callback depend on mutable props.
  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  const fitView = useCallback((animate = false) => {
    const nodes = nodesRef.current;
    const { width, height } = sizeRef.current;
    if (nodes.length === 0 || width === 0 || height === 0) return;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const node of nodes) {
      minX = Math.min(minX, node.x ?? 0);
      maxX = Math.max(maxX, node.x ?? 0);
      minY = Math.min(minY, (node.y ?? 0) * Y_SCALE);
      maxY = Math.max(maxY, (node.y ?? 0) * Y_SCALE);
    }
    const boxWidth = Math.max(80, maxX - minX);
    const boxHeight = Math.max(80, maxY - minY);
    const k = Math.max(
      0.42,
      Math.min(2.0, (width - 110) / boxWidth, (height - 100) / boxHeight)
    );
    const target = {
      k,
      x: width / 2 - ((minX + maxX) / 2) * k,
      y: height / 2 - ((minY + maxY) / 2) * k
    };
    if (!animate) {
      transformRef.current = target;
      setZoom(Math.round(k * 100));
      drawRef.current();
      return;
    }
    const from = { ...transformRef.current };
    const started = performance.now();
    if (cameraAnimRef.current) cancelAnimationFrame(cameraAnimRef.current);
    const step = (now: number) => {
      const t = Math.min(1, (now - started) / 480);
      const ease = 1 - Math.pow(1 - t, 3);
      transformRef.current = {
        x: from.x + (target.x - from.x) * ease,
        y: from.y + (target.y - from.y) * ease,
        k: from.k + (target.k - from.k) * ease
      };
      setZoom(Math.round(transformRef.current.k * 100));
      drawRef.current();
      if (t < 1) cameraAnimRef.current = requestAnimationFrame(step);
    };
    cameraAnimRef.current = requestAnimationFrame(step);
  }, []);

  const hasSize = size.width > 0 && size.height > 0;

  useEffect(() => {
    const { width, height } = size;
    if (width === 0 || height === 0 || graph.nodes.length === 0) return;

    const nodes: SimNode[] = graph.nodes.map((node, index) => {
      const cached = positionCache.current.get(node.id);
      const angle = (index / graph.nodes.length) * Math.PI * 2;
      const ring =
        node.type === "case"
          ? Math.min(width, height) * 0.13
          : Math.min(width, height) * (0.2 + (index % 4) * 0.045);
      return {
        ...node,
        radius: radiusFor(node),
        x: cached?.x ?? width / 2 + Math.cos(angle) * ring,
        y: cached?.y ?? height / 2 + Math.sin(angle) * ring
      };
    });

    const links: SimLink[] = graph.links.map((link) => ({ ...link }));
    nodesRef.current = nodes;
    linksRef.current = links;

    const simulation = forceSimulation<SimNode, SimLink>(nodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(links)
          .id((node) => node.id)
          .distance((link) => {
            const source = link.source as SimNode;
            const target = link.target as SimNode;
            const touchesCase =
              source.type === "case" || target.type === "case";
            return touchesCase ? 68 : 94;
          })
          .strength((link) => {
            const source = link.source as SimNode;
            const target = link.target as SimNode;
            return source.type === "case" || target.type === "case"
              ? 0.72
              : 0.4;
          })
      )
      .force(
        "charge",
        forceManyBody<SimNode>().strength(-145).distanceMax(380)
      )
      .force(
        "collide",
        forceCollide<SimNode>()
          .radius((node) => radiusFor(node) + 7)
          .iterations(2)
      )
      .force("center", forceCenter(width / 2, height / 2))
      .force("x", forceX<SimNode>(width / 2).strength(0.035))
      .force("y", forceY<SimNode>(height / 2).strength(0.055))
      .stop();

    for (let i = 0; i < 280; i += 1) simulation.tick();
    for (const node of nodes) {
      positionCache.current.set(node.id, { x: node.x ?? 0, y: node.y ?? 0 });
    }
    simulationRef.current = simulation;
    simulation.on("tick", () => {
      for (const node of nodes) {
        positionCache.current.set(node.id, { x: node.x ?? 0, y: node.y ?? 0 });
      }
      drawRef.current();
    });

    transformRef.current = { x: 0, y: 0, k: 1 };
    drawRef.current();
    requestAnimationFrame(() => fitView(false));

    return () => {
      simulation.stop();
    };
  }, [graph, hasSize, fitView]);

  useEffect(() => {
    const { width, height } = size;
    const simulation = simulationRef.current;
    if (!simulation || width === 0 || height === 0) return;
    simulation
      .force("center", forceCenter(width / 2, height / 2))
      .force("x", forceX<SimNode>(width / 2).strength(0.035))
      .force("y", forceY<SimNode>(height / 2).strength(0.055));
    drawRef.current();
    fitView(false);
  }, [size.width, size.height, fitView]);

  useEffect(() => {
    if (!focusNodeId) return;
    const node = nodesRef.current.find((item) => item.id === focusNodeId);
    if (!node) return;
    const { width, height } = sizeRef.current;
    const k = Math.max(0.78, Math.min(1.15, transformRef.current.k));
    const target = {
      k,
      x: width / 2 - (node.x ?? 0) * k,
      y: height / 2 - (node.y ?? 0) * Y_SCALE * k
    };
    const from = { ...transformRef.current };
    const started = performance.now();
    if (cameraAnimRef.current) cancelAnimationFrame(cameraAnimRef.current);
    const step = (now: number) => {
      const t = Math.min(1, (now - started) / 520);
      const ease = 1 - Math.pow(1 - t, 3);
      transformRef.current = {
        x: from.x + (target.x - from.x) * ease,
        y: from.y + (target.y - from.y) * ease,
        k: from.k + (target.k - from.k) * ease
      };
      setZoom(Math.round(transformRef.current.k * 100));
      drawRef.current();
      if (t < 1) cameraAnimRef.current = requestAnimationFrame(step);
    };
    cameraAnimRef.current = requestAnimationFrame(step);
  }, [focusNodeId]);

  const hitTest = useCallback((x: number, y: number) => {
    const { x: tx, y: ty, k } = transformRef.current;
    let best: SimNode | null = null;
    let bestDistance = Infinity;
    for (const node of nodesRef.current) {
      const sx = (node.x ?? 0) * k + tx;
      const sy = (node.y ?? 0) * Y_SCALE * k + ty;
      const radius =
        radiusFor(node) * Math.max(0.72, Math.min(1.5, k)) + 5;
      const distance = Math.hypot(sx - x, sy - y);
      if (distance <= radius && distance < bestDistance) {
        best = node;
        bestDistance = distance;
      }
    }
    return best;
  }, []);

  const updateHover = useCallback(
    (node: SimNode | null, x: number, y: number) => {
      if (hoveredNodeRef.current?.id === node?.id) {
        if (node && hover) setHover({ node, x, y });
        return;
      }
      hoveredNodeRef.current = node;
      setHover(node ? { node, x, y } : null);
      drawRef.current();
    },
    [hover]
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pointerRef.current = { x, y };
    const node = hitTest(x, y);
    dragRef.current = {
      mode: node ? "node" : "pan",
      node: node ?? undefined,
      startX: x,
      startY: y,
      startTx: transformRef.current.x,
      startTy: transformRef.current.y,
      moved: false
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (!node) event.currentTarget.style.cursor = "grabbing";
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pointerRef.current = { x, y };
    const drag = dragRef.current;
    if (drag) {
      const dx = x - drag.startX;
      const dy = y - drag.startY;
      if (!drag.moved && Math.hypot(dx, dy) > 3.5) drag.moved = true;
      if (!drag.moved) return;
      if (drag.mode === "pan") {
        transformRef.current = {
          ...transformRef.current,
          x: drag.startTx + dx,
          y: drag.startTy + dy
        };
        drawRef.current();
      } else if (drag.node) {
        const { x: tx, y: ty, k } = transformRef.current;
        drag.node.fx = (x - tx) / k;
        drag.node.fy = (y - ty) / (k * Y_SCALE);
        simulationRef.current?.alphaTarget(0.12).restart();
      }
      updateHover(null, x, y);
      return;
    }
    const node = hitTest(x, y);
    event.currentTarget.style.cursor = node ? "pointer" : "grab";
    updateHover(node, x, y);
  };

  const finishPointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!drag) return;
    const { x, y } = pointerRef.current;
    if (!drag.moved) {
      if (drag.mode === "node" && drag.node) {
        clickRef.current.onNodeClick(drag.node);
      } else {
        clickRef.current.onBackgroundClick();
      }
    }
    if (drag.node) {
      drag.node.fx = null;
      drag.node.fy = null;
      simulationRef.current?.alphaTarget(0);
    }
    event.currentTarget.style.cursor = hitTest(x, y) ? "pointer" : "grab";
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const current = transformRef.current;
      const factor = Math.exp(-event.deltaY * 0.0014);
      const nextK = Math.max(0.38, Math.min(2.8, current.k * factor));
      const worldX = (x - current.x) / current.k;
      const worldY = (y - current.y) / current.k;
      transformRef.current = {
        k: nextK,
        x: x - worldX * nextK,
        y: y - worldY * nextK
      };
      setZoom(Math.round(nextK * 100));
      drawRef.current();
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, []);

  const zoomBy = (factor: number) => {
    const { width, height } = sizeRef.current;
    const current = transformRef.current;
    const nextK = Math.max(0.38, Math.min(2.8, current.k * factor));
    const centerX = width / 2;
    const centerY = height / 2;
    const worldX = (centerX - current.x) / current.k;
    const worldY = (centerY - current.y) / current.k;
    transformRef.current = {
      k: nextK,
      x: centerX - worldX * nextK,
      y: centerY - worldY * nextK
    };
    setZoom(Math.round(nextK * 100));
    drawRef.current();
  };

  return (
    <div
      ref={containerRef}
      className={`graph-view${pathMode ? " is-path-mode" : ""}`}
    >
      <canvas
        ref={canvasRef}
        className="graph-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onPointerLeave={() => {
          if (!dragRef.current) updateHover(null, 0, 0);
        }}
        aria-label="社区更新案例知识图谱，可拖拽、缩放并点击节点查看详情"
        role="img"
      />
      {hover && (
        <div
          className="graph-tooltip"
          style={{
            left: Math.max(
              12,
              Math.min(hover.x + 16, size.width - 232)
            ),
            top: Math.max(12, Math.min(hover.y - 12, size.height - 118))
          }}
        >
          <div className="graph-tooltip-type">
            <span
              className="type-dot"
              style={{ background: TYPE_META[hover.node.type].color }}
            />
            {TYPE_META[hover.node.type].label}
          </div>
          <div className="graph-tooltip-name">{hover.node.name}</div>
          <div className="graph-tooltip-meta">
            {hover.node.type === "case"
              ? `${hover.node.degree} 个关联实体`
              : `${conceptCaseCount(hover.node, visibleCaseSet) >= 2 ? "跨案例实体" : "案例内实体"} · ${conceptCaseCount(hover.node, visibleCaseSet)} 个案例 · ${hover.node.degree} 条关系`}
          </div>
          <div className="graph-tooltip-hint">
            {pathMode ? "点击设为路径节点" : "点击查看知识框架详情"}
          </div>
        </div>
      )}
      <div className="graph-controls" aria-label="图谱视图控制">
        <button type="button" onClick={() => zoomBy(1.18)} title="放大">
          <PlusIcon size={15} />
        </button>
        <button type="button" onClick={() => zoomBy(1 / 1.18)} title="缩小">
          <MinusIcon size={15} />
        </button>
        <button type="button" onClick={() => fitView(true)} title="适应画布">
          <FitIcon size={15} />
        </button>
        <span className="graph-zoom">{zoom}%</span>
      </div>
    </div>
  );
}

function focusIdDependency(id: string | null) {
  return id;
}
