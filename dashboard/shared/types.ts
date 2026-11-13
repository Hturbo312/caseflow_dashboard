import type {
  CausalStatus,
  Confidence,
  CoreEntityType,
  EntityType,
  FactStatus,
  MappingType,
  ReviewAction
} from "./ontology";

export type {
  CausalStatus,
  Confidence,
  CoreEntityType,
  EntityType,
  FactStatus,
  MappingType,
  ReviewAction
} from "./ontology";

export type Strength = "high" | "medium" | "low";

export interface CaseMedia {
  caption: string;
  type: string;
  imageUrl: string | null;
  sourceUrl: string;
  credit: string;
  status: string;
}

export interface Material {
  id: string;
  caseId: string;
  title: string;
  kind: string;
  author: string;
  date: string;
  source: string;
  excerpt: string;
  sourceType?: string;
  verificationStatus?: string;
  scope?: string;
  link?: string;
  reliability?: string;
  notes?: string;
}

export interface Evidence {
  id: string;
  caseId: string;
  claim: string;
  quote: string;
  source: string;
  locator: string;
  strength: Strength;
  entityIds: string[];
  context?: string;
  factStatus?: FactStatus;
  verificationStatus?: string;
  processIds?: string[];
  factIds?: string[];
  materialId?: string;
}

export interface ProcessRecord {
  id: string;
  caseId: string;
  title: string;
  timeRange: string;
  narrative: string;
  actorIds: string[];
  eventIds: string[];
  evidenceIds: string[];
  status: string;
  revision: number;
}

export interface FactRecord {
  id: string;
  caseId: string;
  statement: string;
  entityRoles: string[];
  evidenceIds: string[];
  factStatus: FactStatus;
  timeScope?: string;
  spaceScope?: string;
  quantityScope?: string;
  confidence: Confidence;
  review: string;
}

export interface NativeConceptRecord {
  id: string;
  caseId: string;
  label: string;
  entityType: CoreEntityType;
  definition: string;
  examples: string[];
  sourceRelationIds: string[];
  status: string;
}

export interface SharedConceptRecord {
  id: string;
  label: string;
  definition: string;
  entityType?: CoreEntityType;
  scope?: string;
  supportingCaseIds: string[];
  supportingNativeIds: string[];
  negativeExamples: string[];
  version: string;
  review: string;
}

export interface ConceptMappingRecord {
  id: string;
  caseId: string;
  nativeConceptId: string;
  sharedConceptId?: string;
  mappingType: MappingType;
  basis: string;
  scope?: string;
  evidenceIds: string[];
  decision: string;
  version: string;
}

export interface CausalClaimRecord {
  id: string;
  comparisonId?: string;
  caseIds: string[];
  cause: string;
  effect: string;
  mechanismChain: string[];
  evidenceIds: string[];
  alternativeExplanations: string[];
  counterfactualOrContrast?: string;
  status: CausalStatus;
  confidence: Confidence;
  boundaryConditions: string[];
  whatWouldChangeMind: string[];
  researcherDecision: string;
  notes?: string;
}

export interface CausalQuestionRecord {
  id: string;
  causalClaimId: string;
  type: string;
  question: string;
  rationale?: string;
  answer?: string;
  evidenceIds: string[];
  status: string;
}

export interface ReviewPacketRecord {
  id: string;
  skill: string;
  gate: string;
  caseId?: string;
  scope?: string;
  payload: string;
  status: string;
  createdAt: string;
}

export interface ReviewDecisionRecord {
  id: string;
  packetId: string;
  action: ReviewAction;
  rationale?: string;
  modifiedContent?: string;
  allowNextGate: boolean;
  decidedAt: string;
}

export interface CaseSummary {
  id: string;
  code: string;
  index: number;
  name: string;
  nameEn: string;
  country: string;
  city: string;
  year: string;
  period: string;
  accent: string;
  cover: string;
  tags: string[];
  summary: string;
  entityCount: number;
  materialCount: number;
  evidenceCount: number;
  eventStart?: string;
  eventEnd?: string;
  scope?: string;
  evidenceCutoff?: string;
  researchQuestion?: string;
  status?: string;
  media: CaseMedia[];
  preview: {
    rebuild: string;
    materials: Material[];
    evidence: Evidence[];
  };
}

export interface CaseDetail extends CaseSummary {
  rebuild: string[];
  materials: Material[];
  evidence: Evidence[];
  entityIds: string[];
  processes: ProcessRecord[];
  facts: FactRecord[];
  nativeConcepts: NativeConceptRecord[];
  sharedConcepts: SharedConceptRecord[];
  conceptMappings: ConceptMappingRecord[];
  causalClaims: CausalClaimRecord[];
  causalQuestions: CausalQuestionRecord[];
}

export interface GraphNode {
  id: string;
  name: string;
  nameEn: string;
  type: EntityType;
  degree: number;
  caseIds: string[];
  description?: string;
  definition?: string;
  layer?: "entity" | "shared_concept";
  status?: string;
}

export interface GraphLink {
  id: string;
  source: string;
  target: string;
  type: string;
  label: string;
  weight: number;
  factStatus?: FactStatus;
  qualifiers?: string;
  processIds?: string[];
  evidenceIds?: string[];
  factGroupId?: string;
  verifiedEvidenceIds?: string[];
  candidateEvidenceIds?: string[];
  traceStatus?: string;
  caseId?: string;
  layer?:
    | "relation"
    | "case_membership"
    | "concept_coverage"
    | "concept_mapping";
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface OntologyChange {
  kind: "add" | "refine" | "link" | "remove";
  text: string;
  count?: number;
}

export interface OntologyVersion {
  id: string;
  version: string;
  title: string;
  structure: string;
  adjustment: string;
  problem: string;
  chapter: string;
}

export interface AtlasMeta {
  caseCount: number;
  entityCount: number;
  relationCount: number;
  nativeConceptCount: number;
  sharedConceptCount: number;
  evidenceCount: number;
  materialCount: number;
  seedVersion: number;
  vecVersion: string;
  vectorDimensions: number;
  embeddingModel: string;
  reviewDecisionCount: number;
  dbPath?: string;
}

export type ComparisonStatus = "draft" | "reviewed" | "archived";

export interface ComparisonRecord {
  id: string;
  title: string;
  caseIds: string[];
  question: string;
  discussion: string;
  conclusion: string;
  status: ComparisonStatus;
  confidence?: Confidence;
  claimIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ComparisonData {
  nativeConcepts: NativeConceptRecord[];
  sharedConcepts: SharedConceptRecord[];
  conceptMappings: ConceptMappingRecord[];
  causalClaims: CausalClaimRecord[];
  comparisons: ComparisonRecord[];
}

export interface BootstrapPayload {
  meta: AtlasMeta;
  cases: CaseSummary[];
  graph: GraphData;
  ontology: OntologyVersion[];
  comparison: ComparisonData;
}

export interface EntityNeighbor {
  node: GraphNode;
  label: string;
  direction: "out" | "in";
}

export interface EntityDetail {
  entity: GraphNode & {
    description: string;
    definition: string;
  };
  cases: CaseSummary[];
  neighbors: EntityNeighbor[];
  evidence: Evidence[];
  signal: {
    cases: number;
    evidence: number;
    relations: number;
  };
}

export interface SearchHit {
  kind: "case" | "entity" | "material" | "evidence";
  refId: string;
  caseId: string | null;
  entityId: string | null;
  title: string;
  subtitle: string;
  snippet: string;
  score: number;
}

export interface SearchPayload {
  query: string;
  took: number;
  engine: string;
  hits: SearchHit[];
}
