import type { GraphData, GraphLink, GraphNode } from "../../shared/types";

export interface PathResult {
  nodeIds: string[];
  linkIds: string[];
}

export type ConceptScope = "shared" | "native" | "none";

export function filterGraph(
  graph: GraphData,
  selectedCaseIds: string[]
): GraphData {
  if (selectedCaseIds.length === 0) return graph;
  const selected = new Set(selectedCaseIds);
  const nodes = graph.nodes.filter((node) => {
    if (node.type === "case") {
      return node.caseIds.some((caseId) => selected.has(caseId));
    }
    return node.caseIds.some((caseId) => selected.has(caseId));
  });
  const nodeIds = new Set(nodes.map((node) => node.id));
  const links = graph.links.filter(
    (link) =>
      nodeIds.has(link.source) &&
      nodeIds.has(link.target) &&
      (!link.caseId || selected.has(link.caseId))
  );
  return { nodes, links };
}

export function findPath(
  graph: GraphData,
  startId: string,
  endId: string
): PathResult | null {
  if (startId === endId) return { nodeIds: [startId], linkIds: [] };

  const adjacency = new Map<
    string,
    { nodeId: string; link: GraphLink }[]
  >();
  for (const node of graph.nodes) adjacency.set(node.id, []);
  for (const link of graph.links) {
    adjacency.get(link.source)?.push({ nodeId: link.target, link });
    adjacency.get(link.target)?.push({ nodeId: link.source, link });
  }

  const queue: string[] = [startId];
  const visited = new Set<string>([startId]);
  const previous = new Map<string, { nodeId: string; link: GraphLink }>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === endId) break;
    for (const edge of adjacency.get(current) ?? []) {
      if (visited.has(edge.nodeId)) continue;
      visited.add(edge.nodeId);
      previous.set(edge.nodeId, { nodeId: current, link: edge.link });
      queue.push(edge.nodeId);
    }
  }

  if (!visited.has(endId)) return null;

  const nodeIds: string[] = [endId];
  const linkIds: string[] = [];
  let cursor = endId;
  while (cursor !== startId) {
    const step = previous.get(cursor);
    if (!step) return null;
    linkIds.unshift(step.link.id);
    nodeIds.unshift(step.nodeId);
    cursor = step.nodeId;
  }
  return { nodeIds, linkIds };
}

export function pathNodeMap(nodes: GraphNode[]) {
  return new Map(nodes.map((node) => [node.id, node]));
}

export function visibleCaseIds(graph: GraphData) {
  const ids = new Set<string>();
  for (const node of graph.nodes) {
    if (node.type !== "case") continue;
    for (const caseId of node.caseIds) ids.add(caseId);
  }
  return ids;
}

export function conceptScope(
  node: GraphNode,
  caseIds: Set<string>
): ConceptScope {
  if (node.type === "case") return "none";
  const count = node.caseIds.filter((caseId) => caseIds.has(caseId)).length;
  if (count >= 2) return "shared";
  if (count === 1) return "native";
  return "none";
}

export function conceptCaseCount(node: GraphNode, caseIds: Set<string>) {
  if (node.type === "case") return 0;
  return node.caseIds.filter((caseId) => caseIds.has(caseId)).length;
}

export function shortCaseName(name: string) {
  return name.split("·")[0].trim();
}
