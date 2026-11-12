import type { CaseSummary, ComparisonData } from "../../shared/types";

export type SimilarityBasis = "shared" | "none";

export interface CaseProfile {
  caseId: string;
  set: Set<string>;
}

export interface CaseProfiles {
  basis: SimilarityBasis;
  profiles: Map<string, CaseProfile>;
}

export interface JaccardMatrix {
  basis: SimilarityBasis;
  cells: Array<Array<number | null>>;
  pairCount: number;
  mean: number | null;
}

export interface CaseCluster {
  key: string;
  caseIds: string[];
  mean: number | null;
}

export function buildProfiles(
  cases: CaseSummary[],
  data: ComparisonData
): CaseProfiles {
  const caseIds = new Set(cases.map((item) => item.id));
  const shared = data.sharedConcepts.filter((item) =>
    item.supportingCaseIds.some((id) => caseIds.has(id))
  );
  const mappings = data.conceptMappings.filter(
    (item) => caseIds.has(item.caseId) && Boolean(item.sharedConceptId)
  );
  const basis: SimilarityBasis =
    shared.length > 0 || mappings.length > 0 ? "shared" : "none";

  const profiles = new Map<string, CaseProfile>();
  for (const item of cases) {
    profiles.set(item.id, { caseId: item.id, set: new Set() });
  }

  if (basis === "shared") {
    for (const concept of shared) {
      for (const caseId of concept.supportingCaseIds) {
        profiles.get(caseId)?.set.add(concept.id);
      }
    }
    for (const mapping of mappings) {
      if (!mapping.sharedConceptId) continue;
      profiles.get(mapping.caseId)?.set.add(mapping.sharedConceptId);
    }
  }

  return { basis, profiles };
}

export function jaccard(a: Set<string>, b: Set<string>): number | null {
  if (a.size === 0 && b.size === 0) return null;
  let intersection = 0;
  for (const value of a) if (b.has(value)) intersection += 1;
  const union = a.size + b.size - intersection;
  return union === 0 ? null : intersection / union;
}

export function similarityMatrix(
  cases: CaseSummary[],
  profiles: CaseProfiles
): JaccardMatrix {
  const cells: Array<Array<number | null>> = [];
  let sum = 0;
  let pairCount = 0;
  for (const row of cases) {
    const rowCells: Array<number | null> = [];
    for (const column of cases) {
      if (row.id === column.id) {
        rowCells.push(profiles.basis === "none" ? null : 1);
        continue;
      }
      const value = jaccard(
        profiles.profiles.get(row.id)?.set ?? new Set(),
        profiles.profiles.get(column.id)?.set ?? new Set()
      );
      rowCells.push(value);
      if (value !== null) {
        sum += value;
        pairCount += 1;
      }
    }
    cells.push(rowCells);
  }
  return {
    basis: profiles.basis,
    cells,
    pairCount: pairCount / 2,
    mean: pairCount > 0 ? sum / pairCount : null
  };
}

export function clusterCases(
  cases: CaseSummary[],
  matrix: JaccardMatrix,
  threshold: number
): CaseCluster[] {
  const parent = cases.map((_, index) => index);
  const find = (index: number): number => {
    let current = index;
    while (parent[current] !== current) current = parent[current];
    return current;
  };
  const union = (a: number, b: number) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent[rootB] = rootA;
  };

  for (let i = 0; i < cases.length; i += 1) {
    for (let j = i + 1; j < cases.length; j += 1) {
      const value = matrix.cells[i]?.[j];
      if (value !== null && value !== undefined && value >= threshold && value > 0) {
        union(i, j);
      }
    }
  }

  const groups = new Map<number, number[]>();
  cases.forEach((_, index) => {
    const root = find(index);
    const list = groups.get(root) ?? [];
    list.push(index);
    groups.set(root, list);
  });

  const clusters: CaseCluster[] = [...groups.values()].map((indices) => {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < indices.length; i += 1) {
      for (let j = i + 1; j < indices.length; j += 1) {
        const value = matrix.cells[indices[i]]?.[indices[j]];
        if (value !== null && value !== undefined) {
          sum += value;
          count += 1;
        }
      }
    }
    return {
      key: indices.map((index) => cases[index].id).sort().join("+"),
      caseIds: indices.map((index) => cases[index].id),
      mean: count > 0 ? sum / count : null
    };
  });

  return clusters.sort((a, b) => {
    if (b.caseIds.length !== a.caseIds.length) {
      return b.caseIds.length - a.caseIds.length;
    }
    return a.caseIds[0].localeCompare(b.caseIds[0]);
  });
}
