import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";
import type {
  BootstrapPayload,
  CausalClaimRecord,
  CausalQuestionRecord,
  CaseDetail,
  CaseSummary,
  ComparisonData,
  ComparisonRecord,
  ConceptMappingRecord,
  EntityDetail,
  EntityNeighbor,
  Evidence,
  FactRecord,
  GraphLink,
  GraphNode,
  Material,
  NativeConceptRecord,
  ProcessRecord,
  ReviewDecisionRecord,
  ReviewPacketRecord,
  SearchHit,
  SearchPayload,
  SharedConceptRecord
} from "../shared/types";
import { mediaForCase } from "../shared/case-media";
import { techTagsForCase } from "../shared/case-tags";
import {
  CORE_ENTITY_TYPES,
  FACT_STATUSES,
  MAPPING_TYPES,
  REVIEW_ACTIONS,
  isConfidence,
  isCoreEntityType,
  isFactStatus,
  isReviewAction
} from "../shared/ontology";
import { STRENGTH_META, TYPE_META } from "../shared/meta";
import { FRAMEWORK_VERSIONS } from "../shared/framework";
import {
  cases as seedCases,
  entities as seedEntities,
  evidenceCount,
  facts as seedFacts,
  materialCount,
  nativeConcepts as seedNativeConcepts,
  processes as seedProcesses,
  relations as seedRelations,
  SEED_VERSION,
  type SeedCase,
  type SeedEntity,
  type SeedFact,
  type SeedNativeConcept,
  type SeedProcess,
  type SeedRelation
} from "./seed";
import {
  EMBEDDING_MODEL,
  embeddingBuffer,
  embedText,
  VECTOR_DIMENSIONS
} from "./embed";

const DATA_DIR = path.resolve(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "community-renewal.db");
const DATASET_ID = "caseflow-c01-c11";

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
sqliteVec.load(db);

const vecVersion = (
  db.prepare("select vec_version() as version").get() as { version: string }
).version;

db.exec(`
  CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cases (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    idx INTEGER NOT NULL,
    name TEXT NOT NULL,
    name_en TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    year TEXT NOT NULL,
    period TEXT NOT NULL,
    accent TEXT NOT NULL,
    cover TEXT NOT NULL,
    tags TEXT NOT NULL,
    summary TEXT NOT NULL,
    rebuild TEXT NOT NULL,
    event_start TEXT,
    event_end TEXT,
    scope TEXT,
    evidence_cutoff TEXT,
    research_question TEXT,
    status TEXT NOT NULL DEFAULT 'draft'
  );

  CREATE TABLE IF NOT EXISTS entities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_en TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    definition TEXT NOT NULL,
    role_types TEXT NOT NULL DEFAULT '[]'
  );

  CREATE TABLE IF NOT EXISTS relations (
    id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL DEFAULT 'c06',
    source TEXT NOT NULL,
    target TEXT NOT NULL,
    type TEXT NOT NULL,
    label TEXT NOT NULL,
    weight REAL NOT NULL,
    fact_status TEXT NOT NULL DEFAULT 'unconfirmed',
    qualifiers TEXT,
    process_ids TEXT NOT NULL DEFAULT '[]',
    evidence_ids TEXT NOT NULL DEFAULT '[]',
    head_role TEXT,
    tail_role TEXT,
    review TEXT,
    version TEXT NOT NULL DEFAULT 'v0.1',
    fact_group_id TEXT,
    verified_evidence_ids TEXT NOT NULL DEFAULT '[]',
    candidate_evidence_ids TEXT NOT NULL DEFAULT '[]',
    trace_status TEXT
  );

  CREATE TABLE IF NOT EXISTS entity_roles (
    case_id TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    role_type TEXT NOT NULL,
    PRIMARY KEY (case_id, entity_id, role_type)
  );

  CREATE TABLE IF NOT EXISTS case_entities (
    case_id TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    PRIMARY KEY (case_id, entity_id)
  );

  CREATE TABLE IF NOT EXISTS materials (
    id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL,
    title TEXT NOT NULL,
    kind TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    source TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    source_type TEXT,
    verification_status TEXT,
    scope TEXT,
    link TEXT,
    reliability TEXT,
    notes TEXT
  );

  CREATE TABLE IF NOT EXISTS evidence (
    id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL,
    claim TEXT NOT NULL,
    quote TEXT NOT NULL,
    source TEXT NOT NULL,
    locator TEXT NOT NULL,
    strength TEXT NOT NULL,
    entity_ids TEXT NOT NULL,
    context TEXT,
    fact_status TEXT,
    verification_status TEXT,
    process_ids TEXT NOT NULL DEFAULT '[]',
    fact_ids TEXT NOT NULL DEFAULT '[]',
    material_id TEXT
  );

  CREATE TABLE IF NOT EXISTS processes (
    id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL,
    title TEXT NOT NULL,
    time_range TEXT NOT NULL,
    narrative TEXT NOT NULL,
    actor_ids TEXT NOT NULL DEFAULT '[]',
    event_ids TEXT NOT NULL DEFAULT '[]',
    evidence_ids TEXT NOT NULL,
    status TEXT NOT NULL,
    revision INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS facts (
    id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL,
    statement TEXT NOT NULL,
    entity_roles TEXT NOT NULL,
    evidence_ids TEXT NOT NULL,
    fact_status TEXT NOT NULL,
    time_scope TEXT,
    space_scope TEXT,
    quantity_scope TEXT,
    confidence TEXT NOT NULL,
    review TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS native_concepts (
    id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL,
    label TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    definition TEXT NOT NULL,
    examples TEXT NOT NULL,
    source_relation_ids TEXT NOT NULL,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS shared_concepts (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    definition TEXT NOT NULL,
    entity_type TEXT,
    scope TEXT,
    supporting_case_ids TEXT NOT NULL,
    supporting_native_ids TEXT NOT NULL,
    negative_examples TEXT NOT NULL,
    version TEXT NOT NULL,
    review TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS concept_mappings (
    id TEXT PRIMARY KEY,
    case_id TEXT NOT NULL,
    native_concept_id TEXT NOT NULL,
    shared_concept_id TEXT,
    mapping_type TEXT NOT NULL,
    basis TEXT NOT NULL,
    scope TEXT,
    evidence_ids TEXT NOT NULL,
    decision TEXT NOT NULL,
    version TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS causal_claims (
    id TEXT PRIMARY KEY,
    comparison_id TEXT,
    case_ids TEXT NOT NULL,
    cause TEXT NOT NULL,
    effect TEXT NOT NULL,
    mechanism_chain TEXT NOT NULL,
    evidence_ids TEXT NOT NULL,
    alternative_explanations TEXT NOT NULL,
    counterfactual_or_contrast TEXT,
    status TEXT NOT NULL,
    confidence TEXT NOT NULL,
    boundary_conditions TEXT NOT NULL,
    what_would_change_mind TEXT NOT NULL,
    researcher_decision TEXT NOT NULL,
    notes TEXT
  );

  CREATE TABLE IF NOT EXISTS causal_questions (
    id TEXT PRIMARY KEY,
    causal_claim_id TEXT NOT NULL,
    type TEXT NOT NULL,
    question TEXT NOT NULL,
    rationale TEXT,
    answer TEXT,
    evidence_ids TEXT NOT NULL,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS comparisons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    case_ids TEXT NOT NULL,
    question TEXT NOT NULL,
    discussion TEXT NOT NULL,
    conclusion TEXT NOT NULL,
    status TEXT NOT NULL,
    confidence TEXT,
    claim_ids TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS review_packets (
    id TEXT PRIMARY KEY,
    skill TEXT NOT NULL,
    gate TEXT NOT NULL,
    case_id TEXT,
    scope TEXT,
    payload TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS review_decisions (
    id TEXT PRIMARY KEY,
    packet_id TEXT NOT NULL,
    action TEXT NOT NULL,
    rationale TEXT,
    modified_content TEXT,
    allow_next_gate INTEGER NOT NULL DEFAULT 0,
    decided_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS relation_process_links (
    relation_id TEXT NOT NULL,
    case_id TEXT NOT NULL,
    process_id TEXT NOT NULL,
    fact_group_id TEXT,
    verified_evidence_ids TEXT NOT NULL DEFAULT '[]',
    candidate_evidence_ids TEXT NOT NULL DEFAULT '[]',
    trace_status TEXT NOT NULL DEFAULT 'unconfirmed',
    PRIMARY KEY (relation_id, process_id)
  );

  CREATE TABLE IF NOT EXISTS relation_evidence_links (
    relation_id TEXT NOT NULL,
    case_id TEXT NOT NULL,
    evidence_id TEXT NOT NULL,
    PRIMARY KEY (relation_id, evidence_id)
  );

  CREATE TABLE IF NOT EXISTS search_docs (
    rowid INTEGER PRIMARY KEY,
    kind TEXT NOT NULL,
    ref_id TEXT NOT NULL,
    case_id TEXT,
    entity_id TEXT,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    body TEXT NOT NULL
  );

  CREATE VIRTUAL TABLE IF NOT EXISTS vec_search
  USING vec0(embedding float[${VECTOR_DIMENSIONS}] distance_metric=cosine);
`);

function ensureOntologyTable() {
  const columns = db
    .prepare("PRAGMA table_info(ontology_versions)")
    .all() as { name: string }[];
  if (columns.length && !columns.some((column) => column.name === "structure")) {
    db.exec("DROP TABLE ontology_versions");
  }
  db.exec(`
    CREATE TABLE IF NOT EXISTS ontology_versions (
      id TEXT PRIMARY KEY,
      version TEXT NOT NULL,
      title TEXT NOT NULL,
      structure TEXT NOT NULL,
      adjustment TEXT NOT NULL,
      problem TEXT NOT NULL,
      chapter TEXT NOT NULL
    );
  `);
}

ensureOntologyTable();

function ensureColumn(table: string, column: string, definition: string) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as {
    name: string;
  }[];
  if (columns.some((item) => item.name === column)) return;
  db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}

ensureColumn("relations", "case_id", "TEXT NOT NULL DEFAULT 'c06'");
ensureColumn("relations", "review", "TEXT");
ensureColumn("relations", "version", "TEXT NOT NULL DEFAULT 'v0.1'");
ensureColumn("relations", "fact_group_id", "TEXT");
ensureColumn(
  "relations",
  "verified_evidence_ids",
  "TEXT NOT NULL DEFAULT '[]'"
);
ensureColumn(
  "relations",
  "candidate_evidence_ids",
  "TEXT NOT NULL DEFAULT '[]'"
);
ensureColumn("relations", "trace_status", "TEXT");
ensureColumn("materials", "notes", "TEXT");
ensureColumn("evidence", "material_id", "TEXT");
ensureColumn("processes", "actor_ids", "TEXT NOT NULL DEFAULT '[]'");
ensureColumn("processes", "event_ids", "TEXT NOT NULL DEFAULT '[]'");
ensureColumn("shared_concepts", "entity_type", "TEXT");
ensureColumn("review_decisions", "modified_content", "TEXT");
ensureColumn(
  "review_decisions",
  "allow_next_gate",
  "INTEGER NOT NULL DEFAULT 0"
);

type DbCase = {
  id: string;
  code: string;
  idx: number;
  name: string;
  name_en: string;
  country: string;
  city: string;
  year: string;
  period: string;
  accent: string;
  cover: string;
  tags: string;
  summary: string;
  rebuild: string;
  event_start: string | null;
  event_end: string | null;
  scope: string | null;
  evidence_cutoff: string | null;
  research_question: string | null;
  status: string;
};

type DbMaterial = {
  id: string;
  case_id: string;
  title: string;
  kind: string;
  author: string;
  date: string;
  source: string;
  excerpt: string;
  source_type: string | null;
  verification_status: string | null;
  scope: string | null;
  link: string | null;
  reliability: string | null;
  notes: string | null;
};

type DbEntity = {
  id: string;
  name: string;
  name_en: string;
  type: GraphNode["type"];
  description: string;
  definition: string;
  role_types: string;
};

type DbRelation = {
  id: string;
  case_id: string;
  source: string;
  target: string;
  type: string;
  label: string;
  weight: number;
  fact_status: string;
  qualifiers: string | null;
  process_ids: string;
  evidence_ids: string;
  head_role: string | null;
  tail_role: string | null;
  review: string | null;
  version: string;
  fact_group_id: string | null;
  verified_evidence_ids: string;
  candidate_evidence_ids: string;
  trace_status: string | null;
};

type DbEvidence = {
  id: string;
  case_id: string;
  claim: string;
  quote: string;
  source: string;
  locator: string;
  strength: Evidence["strength"];
  entity_ids: string;
  context: string | null;
  fact_status: string | null;
  verification_status: string | null;
  process_ids: string;
  fact_ids: string;
  material_id: string | null;
};

type DbProcess = {
  id: string;
  case_id: string;
  title: string;
  time_range: string;
  narrative: string;
  actor_ids: string;
  event_ids: string;
  evidence_ids: string;
  status: string;
  revision: number;
};

type DbFact = {
  id: string;
  case_id: string;
  statement: string;
  entity_roles: string;
  evidence_ids: string;
  fact_status: string;
  time_scope: string | null;
  space_scope: string | null;
  quantity_scope: string | null;
  confidence: string;
  review: string;
};

type DbNativeConcept = {
  id: string;
  case_id: string;
  label: string;
  entity_type: string;
  definition: string;
  examples: string;
  source_relation_ids: string;
  status: string;
};

type DbSharedConcept = {
  id: string;
  label: string;
  definition: string;
  entity_type: string | null;
  scope: string | null;
  supporting_case_ids: string;
  supporting_native_ids: string;
  negative_examples: string;
  version: string;
  review: string;
};

type DbConceptMapping = {
  id: string;
  case_id: string;
  native_concept_id: string;
  shared_concept_id: string | null;
  mapping_type: string;
  basis: string;
  scope: string | null;
  evidence_ids: string;
  decision: string;
  version: string;
};

type DbCausalClaim = {
  id: string;
  comparison_id: string | null;
  case_ids: string;
  cause: string;
  effect: string;
  mechanism_chain: string;
  evidence_ids: string;
  alternative_explanations: string;
  counterfactual_or_contrast: string | null;
  status: string;
  confidence: string;
  boundary_conditions: string;
  what_would_change_mind: string;
  researcher_decision: string;
  notes: string | null;
};

type DbComparison = {
  id: string;
  title: string;
  case_ids: string;
  question: string;
  discussion: string;
  conclusion: string;
  status: string;
  confidence: string | null;
  claim_ids: string;
  created_at: string;
  updated_at: string;
};

type DbCausalQuestion = {
  id: string;
  causal_claim_id: string;
  type: string;
  question: string;
  rationale: string | null;
  answer: string | null;
  evidence_ids: string;
  status: string;
};

type DbReviewPacket = {
  id: string;
  skill: string;
  gate: string;
  case_id: string | null;
  scope: string | null;
  payload: string;
  status: string;
  created_at: string;
};

type DbReviewDecision = {
  id: string;
  packet_id: string;
  action: string;
  rationale: string | null;
  modified_content: string | null;
  allow_next_gate: number;
  decided_at: string;
};

function insertSearchDoc(
  kind: SearchHit["kind"],
  refId: string,
  caseId: string | null,
  entityId: string | null,
  title: string,
  subtitle: string,
  body: string
) {
  const info = db
    .prepare(`INSERT INTO vec_search (embedding) VALUES (?)`)
    .run(embeddingBuffer(`${title} ${subtitle} ${body}`));
  const rowid = Number(info.lastInsertRowid);
  db.prepare(
    `INSERT INTO search_docs
      (rowid, kind, ref_id, case_id, entity_id, title, subtitle, body)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(rowid, kind, refId, caseId, entityId, title, subtitle, body);
}

function assertSeedIntegrity() {
  const errors: string[] = [];
  const caseIds = new Set(seedCases.map((item) => item.id));
  const entityById = new Map(seedEntities.map((item) => [item.id, item]));
  const relationIds = new Set(
    seedRelations.map(
      (_, index) => `R${String(index + 1).padStart(3, "0")}`
    )
  );
  const materialIds = new Set(
    seedCases.flatMap((item) => item.materials.map((material) => material.id))
  );
  const evidenceIds = new Set(
    seedCases.flatMap((item) => item.evidence.map((evidence) => evidence.id))
  );

  for (const entity of seedEntities) {
    if (!isCoreEntityType(entity.type)) {
      errors.push(`entity ${entity.id}: invalid type ${entity.type}`);
    }
    for (const role of entity.roles ?? [entity.type]) {
      if (!isCoreEntityType(role)) {
        errors.push(`entity ${entity.id}: invalid role ${role}`);
      }
    }
  }

  for (const item of seedCases) {
    for (const entityId of item.concepts) {
      if (!entityById.has(entityId)) {
        errors.push(`case ${item.id}: missing entity ${entityId}`);
      }
    }
    for (const material of item.materials) {
      if (!caseIds.has(item.id)) {
        errors.push(`material ${material.id}: missing case ${item.id}`);
      }
    }
    for (const evidence of item.evidence) {
      if (!materialIds.has(evidence.materialId ?? "")) {
        errors.push(
          `evidence ${evidence.id}: missing material ${evidence.materialId ?? ""}`
        );
      }
      for (const entityId of evidence.entityIds) {
        if (!entityById.has(entityId)) {
          errors.push(`evidence ${evidence.id}: missing entity ${entityId}`);
        }
      }
    }
  }

  for (const relation of seedRelations) {
    if (!isFactStatus(relation.factStatus ?? "unconfirmed")) {
      errors.push(
        `relation ${relation.source}->${relation.target}: invalid fact status`
      );
    }
    const head = entityById.get(relation.source);
    const tail = entityById.get(relation.target);
    if (!head) errors.push(`relation: missing head ${relation.source}`);
    if (!tail) errors.push(`relation: missing tail ${relation.target}`);
    if (relation.headRole && !isCoreEntityType(relation.headRole)) {
      errors.push(`relation: invalid head role ${relation.headRole}`);
    }
    if (relation.tailRole && !isCoreEntityType(relation.tailRole)) {
      errors.push(`relation: invalid tail role ${relation.tailRole}`);
    }
    if (
      head &&
      relation.headRole &&
      !(head.roles ?? [head.type]).includes(relation.headRole)
    ) {
      errors.push(
        `relation: ${relation.source} cannot act as ${relation.headRole}`
      );
    }
    if (
      tail &&
      relation.tailRole &&
      !(tail.roles ?? [tail.type]).includes(relation.tailRole)
    ) {
      errors.push(
        `relation: ${relation.target} cannot act as ${relation.tailRole}`
      );
    }
  }

  for (const process of seedProcesses) {
    if (!caseIds.has(process.caseId)) {
      errors.push(`process ${process.id}: missing case ${process.caseId}`);
    }
    for (const evidenceId of process.evidenceIds) {
      if (!evidenceIds.has(evidenceId)) {
        errors.push(`process ${process.id}: missing evidence ${evidenceId}`);
      }
    }
    for (const actorId of process.actorIds ?? []) {
      if (!entityById.has(actorId)) {
        errors.push(`process ${process.id}: missing actor ${actorId}`);
      }
    }
  }

  for (const fact of seedFacts) {
    if (!caseIds.has(fact.caseId)) {
      errors.push(`fact ${fact.id}: missing case ${fact.caseId}`);
    }
    if (!isFactStatus(fact.factStatus)) {
      errors.push(`fact ${fact.id}: invalid fact status ${fact.factStatus}`);
    }
    if (!isConfidence(fact.confidence)) {
      errors.push(`fact ${fact.id}: invalid confidence ${fact.confidence}`);
    }
    for (const roleBinding of fact.entityRoles) {
      const [entityId, role] = roleBinding.split(":");
      const entity = entityById.get(entityId);
      if (!entity) {
        errors.push(`fact ${fact.id}: missing entity ${entityId}`);
      } else if (!isCoreEntityType(role)) {
        errors.push(`fact ${fact.id}: invalid role ${role}`);
      } else if (!(entity.roles ?? [entity.type]).includes(role)) {
        errors.push(`fact ${fact.id}: ${entityId} cannot act as ${role}`);
      }
    }
    for (const evidenceId of fact.evidenceIds) {
      if (!evidenceIds.has(evidenceId)) {
        errors.push(`fact ${fact.id}: missing evidence ${evidenceId}`);
      }
    }
  }

  for (const concept of seedNativeConcepts) {
    if (!isCoreEntityType(concept.entityType)) {
      errors.push(`native concept ${concept.id}: invalid entity type`);
    }
    for (const relationId of concept.sourceRelationIds) {
      if (!relationIds.has(relationId)) {
        errors.push(
          `native concept ${concept.id}: missing relation ${relationId}`
        );
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Seed integrity check failed:\n- ${errors.join("\n- ")}`);
  }
}

function seedDatabase() {
  assertSeedIntegrity();
  const transaction = db.transaction(() => {
    db.exec(`
      DELETE FROM vec_search;
      DELETE FROM search_docs;
      DELETE FROM evidence;
      DELETE FROM materials;
      DELETE FROM facts;
      DELETE FROM processes;
      DELETE FROM native_concepts;
      DELETE FROM concept_mappings;
      DELETE FROM shared_concepts;
      DELETE FROM causal_questions;
      DELETE FROM causal_claims;
      DELETE FROM relation_process_links;
      DELETE FROM relation_evidence_links;
      DELETE FROM entity_roles;
      DELETE FROM case_entities;
      DELETE FROM relations;
      DELETE FROM ontology_versions;
      DELETE FROM cases;
      DELETE FROM entities;
      DELETE FROM meta;
    `);

    const insertCase = db.prepare(
      `INSERT INTO cases
        (id, code, idx, name, name_en, country, city, year, period, accent, cover, tags, summary, rebuild,
         event_start, event_end, scope, evidence_cutoff, research_question, status)
       VALUES
        (@id, @code, @idx, @name, @nameEn, @country, @city, @year, @period, @accent, @cover, @tags, @summary, @rebuild,
         @eventStart, @eventEnd, @scope, @evidenceCutoff, @researchQuestion, @status)`
    );
    const insertEntity = db.prepare(
      `INSERT INTO entities
        (id, name, name_en, type, description, definition, role_types)
       VALUES
        (@id, @name, @nameEn, @type, @description, @definition, @roleTypes)`
    );
    const insertCaseEntity = db.prepare(
      `INSERT INTO case_entities (case_id, entity_id) VALUES (?, ?)`
    );
    const insertEntityRole = db.prepare(
      `INSERT INTO entity_roles (case_id, entity_id, role_type) VALUES (?, ?, ?)`
    );
    const insertMaterial = db.prepare(
      `INSERT INTO materials
        (id, case_id, title, kind, author, date, source, excerpt,
         source_type, verification_status, scope, link, reliability, notes)
       VALUES
        (@id, @caseId, @title, @kind, @author, @date, @source, @excerpt,
         @sourceType, @verificationStatus, @scope, @link, @reliability, @notes)`
    );
    const insertEvidence = db.prepare(
      `INSERT INTO evidence
        (id, case_id, claim, quote, source, locator, strength, entity_ids,
         context, fact_status, verification_status, process_ids, fact_ids, material_id)
       VALUES
        (@id, @caseId, @claim, @quote, @source, @locator, @strength, @entityIds,
         @context, @factStatus, @verificationStatus, @processIds, @factIds, @materialId)`
    );
    const insertRelation = db.prepare(
      `INSERT INTO relations
        (id, case_id, source, target, type, label, weight, fact_status, qualifiers, process_ids, evidence_ids, head_role, tail_role, review, version)
       VALUES
        (@id, @caseId, @source, @target, @type, @label, @weight, @factStatus, @qualifiers, @processIds, @evidenceIds, @headRole, @tailRole, @review, @version)`
    );
    const insertProcess = db.prepare(
      `INSERT INTO processes
        (id, case_id, title, time_range, narrative, actor_ids, event_ids, evidence_ids, status, revision)
       VALUES
        (@id, @caseId, @title, @timeRange, @narrative, @actorIds, @eventIds, @evidenceIds, @status, @revision)`
    );
    const insertFact = db.prepare(
      `INSERT INTO facts
        (id, case_id, statement, entity_roles, evidence_ids, fact_status, time_scope, space_scope, quantity_scope, confidence, review)
       VALUES
        (@id, @caseId, @statement, @entityRoles, @evidenceIds, @factStatus, @timeScope, @spaceScope, @quantityScope, @confidence, @review)`
    );
    const insertNativeConcept = db.prepare(
      `INSERT INTO native_concepts
        (id, case_id, label, entity_type, definition, examples, source_relation_ids, status)
       VALUES
        (@id, @caseId, @label, @entityType, @definition, @examples, @sourceRelationIds, @status)`
    );
    seedCases.forEach((item, index) => {
      insertCase.run({
        id: item.id,
        code: item.code,
        idx: index + 1,
        name: item.name,
        nameEn: item.nameEn,
        country: item.country,
        city: item.city,
        year: item.year,
        period: item.period,
        accent: item.accent,
        cover: item.cover,
        tags: JSON.stringify(item.tags),
        summary: item.summary,
        rebuild: JSON.stringify(item.rebuild),
        eventStart: item.eventStart ?? null,
        eventEnd: item.eventEnd ?? null,
        scope: item.scope ?? null,
        evidenceCutoff: item.evidenceCutoff ?? null,
        researchQuestion: item.researchQuestion ?? null,
        status: item.status ?? "draft"
      });
      item.concepts.forEach((entityId) => insertCaseEntity.run(item.id, entityId));
      item.materials.forEach((material) =>
        insertMaterial.run({
          ...material,
          caseId: item.id,
          sourceType: material.sourceType ?? null,
          verificationStatus: material.verificationStatus ?? null,
          scope: material.scope ?? null,
          link: material.link ?? null,
          reliability: material.reliability ?? null,
          notes: material.notes ?? null
        })
      );
      item.evidence.forEach((evidence) =>
        insertEvidence.run({
          ...evidence,
          caseId: item.id,
          entityIds: JSON.stringify(evidence.entityIds),
          context: evidence.context ?? null,
          factStatus: evidence.factStatus ?? null,
          verificationStatus: evidence.verificationStatus ?? null,
          processIds: JSON.stringify(evidence.processIds ?? []),
          factIds: JSON.stringify(evidence.factIds ?? []),
          materialId: evidence.materialId ?? null
        })
      );
    });

    seedEntities.forEach((entity) =>
      insertEntity.run({
        ...entity,
        roleTypes: JSON.stringify(entity.roles ?? [entity.type])
      })
    );

    const entityById = new Map(seedEntities.map((entity) => [entity.id, entity]));
    for (const item of seedCases) {
      for (const entityId of item.concepts) {
        const entity = entityById.get(entityId);
        for (const role of entity?.roles ?? (entity ? [entity.type] : [])) {
          insertEntityRole.run(item.id, entityId, role);
        }
      }
    }

    seedRelations.forEach((relation, index) => {
      insertRelation.run({
        id: `R${String(index + 1).padStart(3, "0")}`,
        caseId: relation.caseId ?? seedCases[0]?.id ?? "c06",
        source: relation.source,
        target: relation.target,
        type: relation.type,
        label: relation.label,
        weight: relation.weight ?? 1.6,
        factStatus: relation.factStatus ?? "unconfirmed",
        qualifiers: relation.qualifiers ?? null,
        processIds: JSON.stringify(relation.processIds ?? []),
        evidenceIds: JSON.stringify(relation.evidenceIds ?? []),
        headRole: relation.headRole ?? null,
        tailRole: relation.tailRole ?? null,
        review: null,
        version: "v0.1"
      });
    });

    seedProcesses.forEach((process) =>
      insertProcess.run({
        ...process,
        actorIds: JSON.stringify(process.actorIds ?? []),
        eventIds: JSON.stringify(process.eventIds ?? []),
        evidenceIds: JSON.stringify(process.evidenceIds)
      })
    );

    seedFacts.forEach((fact) =>
      insertFact.run({
        ...fact,
        entityRoles: JSON.stringify(fact.entityRoles),
        evidenceIds: JSON.stringify(fact.evidenceIds),
        timeScope: fact.timeScope ?? null,
        spaceScope: fact.spaceScope ?? null,
        quantityScope: fact.quantityScope ?? null
      })
    );

    seedNativeConcepts.forEach((concept) =>
      insertNativeConcept.run({
        ...concept,
        examples: JSON.stringify(concept.examples),
        sourceRelationIds: JSON.stringify(concept.sourceRelationIds)
      })
    );

    for (const item of seedCases) {
      insertSearchDoc(
        "case",
        item.id,
        item.id,
        null,
        item.name,
        `案例 · ${item.country} · ${item.year}`,
        [item.summary, ...item.rebuild, item.tags.join("，")].join(" ")
      );
    }
    for (const entity of seedEntities) {
      insertSearchDoc(
        "entity",
        entity.id,
        null,
        entity.id,
        entity.name,
        `实体 · ${TYPE_META[entity.type].label}`,
        `${entity.nameEn} ${entity.description} ${entity.definition}`
      );
    }
    for (const item of seedCases) {
      for (const material of item.materials) {
        insertSearchDoc(
          "material",
          material.id,
          item.id,
          null,
          material.title,
          `材料 · ${item.name} · ${material.kind}`,
          `${material.author} ${material.source} ${material.excerpt}`
        );
      }
      for (const evidence of item.evidence) {
        insertSearchDoc(
          "evidence",
          evidence.id,
          item.id,
          null,
          evidence.claim,
          `证据 · ${item.name} · ${STRENGTH_META[evidence.strength].label}`,
          `${evidence.quote} ${evidence.source} ${evidence.locator}`
        );
      }
    }

    db.prepare("INSERT INTO meta (key, value) VALUES (?, ?)").run(
      "seed_version",
      String(SEED_VERSION)
    );
  });

  transaction();
}

function readMeta(key: string): string | null {
  const row = db.prepare("SELECT value FROM meta WHERE key = ?").get(key) as
    | { value: string }
    | undefined;
  return row?.value ?? null;
}

function ensureSeed() {
  const dataset = readMeta("dataset");
  const current = readMeta("seed_version");
  const count = (
    db.prepare("SELECT COUNT(*) AS count FROM cases").get() as { count: number }
  ).count;

  if (dataset === DATASET_ID) {
    if (count > 0) return;
    console.warn(
      "[atlas] CaseFlow dataset marker present but no cases; run npm run import:caseflow"
    );
    return;
  }

  if (count > 0) {
    if (current !== String(SEED_VERSION)) {
      console.warn(
        "[atlas] existing database left untouched despite a seed version change; explicit migration is required"
      );
    }
    return;
  }

  const reviewCount = (
    db.prepare("SELECT COUNT(*) AS count FROM review_decisions").get() as {
      count: number;
    }
  ).count;
  const comparisonCount = (
    db.prepare("SELECT COUNT(*) AS count FROM comparisons").get() as {
      count: number;
    }
  ).count;
  if (reviewCount > 0 || comparisonCount > 0) {
    console.warn(
      "[atlas] protected review or comparison data exists; automatic demo seeding was skipped"
    );
    return;
  }

  const caseflowJson = path.join(DATA_DIR, "caseflow", "c01-c11.json");
  if (fs.existsSync(caseflowJson)) {
    console.warn(
      "[atlas] CaseFlow dataset JSON is available; run npm run import:caseflow instead of seeding demo data"
    );
    return;
  }

  seedDatabase();
  console.log(
    `[atlas] seeded ${seedCases.length} cases, ${seedEntities.length} entities, ${evidenceCount} evidence items`
  );
}

ensureSeed();

function syncRelationLinks() {
  const rows = db
    .prepare(
      `SELECT id, case_id, process_ids, evidence_ids, fact_group_id,
              verified_evidence_ids, candidate_evidence_ids, trace_status
       FROM relations`
    )
    .all() as DbRelation[];
  const insertProcess = db.prepare(
    `INSERT INTO relation_process_links
      (relation_id, case_id, process_id, fact_group_id,
       verified_evidence_ids, candidate_evidence_ids, trace_status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  const insertEvidence = db.prepare(
    `INSERT INTO relation_evidence_links
      (relation_id, case_id, evidence_id)
     VALUES (?, ?, ?)`
  );

  db.transaction(() => {
    db.exec(`
      DELETE FROM relation_process_links;
      DELETE FROM relation_evidence_links;
    `);
    for (const row of rows) {
      const processIds = parseJson<string[]>(row.process_ids, []);
      const evidenceIds = parseJson<string[]>(row.evidence_ids, []);
      for (const processId of processIds) {
        insertProcess.run(
          row.id,
          row.case_id,
          processId,
          row.fact_group_id ?? null,
          row.verified_evidence_ids || "[]",
          row.candidate_evidence_ids || "[]",
          row.trace_status ?? "unconfirmed"
        );
      }
      for (const evidenceId of evidenceIds) {
        insertEvidence.run(row.id, row.case_id, evidenceId);
      }
    }
  })();
}

syncRelationLinks();

export function syncFrameworkVersions() {
  const insert = db.prepare(
    `INSERT INTO ontology_versions
      (id, version, title, structure, adjustment, problem, chapter)
     VALUES
      (@id, @version, @title, @structure, @adjustment, @problem, @chapter)`
  );
  db.transaction(() => {
    db.exec("DELETE FROM ontology_versions");
    for (const version of FRAMEWORK_VERSIONS) insert.run(version);
  })();
}

syncFrameworkVersions();

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function dbCaseToSummary(row: DbCase, materials: Material[], evidence: Evidence[]) {
  const rebuild = parseJson<string[]>(row.rebuild, []);
  return {
    id: row.id,
    code: row.code,
    index: row.idx,
    name: row.name,
    nameEn: row.name_en,
    country: row.country,
    city: row.city,
    year: row.year,
    period: row.period,
    accent: row.accent,
    cover: row.cover,
    tags: techTagsForCase(row.id, parseJson<string[]>(row.tags, [])),
    summary: row.summary,
    entityCount: (
      db
        .prepare(
          "SELECT COUNT(*) AS count FROM case_entities WHERE case_id = ?"
        )
        .get(row.id) as { count: number }
    ).count,
    materialCount: materials.length,
    evidenceCount: evidence.length,
    eventStart: row.event_start ?? undefined,
    eventEnd: row.event_end ?? undefined,
    scope: row.scope ?? undefined,
    evidenceCutoff: row.evidence_cutoff ?? undefined,
    researchQuestion: row.research_question ?? undefined,
    status: row.status,
    media: mediaForCase(row.id),
    preview: {
      rebuild: rebuild[0] ?? "",
      materials: materials.slice(0, 3),
      evidence: evidence.slice(0, 3)
    }
  } satisfies CaseSummary;
}

function getCaseBundle(caseId: string) {
  const row = db.prepare("SELECT * FROM cases WHERE id = ?").get(caseId) as
    | DbCase
    | undefined;
  if (!row) return null;
  const materialRows = db
    .prepare("SELECT * FROM materials WHERE case_id = ? ORDER BY id")
    .all(caseId) as DbMaterial[];
  const materials = materialRows.map((item) => dbMaterialToMaterial(item));
  const evidenceRows = db
    .prepare("SELECT * FROM evidence WHERE case_id = ? ORDER BY id")
    .all(caseId) as DbEvidence[];
  const evidence = evidenceRows.map((item) => dbEvidenceToEvidence(item));
  const entityIds = (
    db
      .prepare(
        "SELECT entity_id FROM case_entities WHERE case_id = ? ORDER BY rowid"
      )
      .all(caseId) as { entity_id: string }[]
  ).map((item) => item.entity_id);
  const processes = (
    db
      .prepare("SELECT * FROM processes WHERE case_id = ? ORDER BY id")
      .all(caseId) as DbProcess[]
  ).map((item) => dbProcessToProcess(item));
  const facts = (
    db.prepare("SELECT * FROM facts WHERE case_id = ? ORDER BY id").all(caseId) as DbFact[]
  ).map((item) => dbFactToFact(item));
  const nativeConcepts = (
    db
      .prepare("SELECT * FROM native_concepts WHERE case_id = ? ORDER BY id")
      .all(caseId) as DbNativeConcept[]
  ).map((item) => dbNativeConceptToRecord(item));
  const sharedConcepts = (
    db.prepare("SELECT * FROM shared_concepts ORDER BY id").all() as DbSharedConcept[]
  ).map((item) => dbSharedConceptToRecord(item));
  const conceptMappings = (
    db
      .prepare("SELECT * FROM concept_mappings WHERE case_id = ? ORDER BY id")
      .all(caseId) as DbConceptMapping[]
  ).map((item) => dbConceptMappingToRecord(item));
  const causalClaims = (
    db
      .prepare("SELECT * FROM causal_claims WHERE case_ids LIKE ? ORDER BY id")
      .all(`%${caseId}%`) as DbCausalClaim[]
  ).map((item) => dbCausalClaimToRecord(item));
  const causalQuestions = (
    db
      .prepare(
        `SELECT q.* FROM causal_questions q
         JOIN causal_claims c ON c.id = q.causal_claim_id
         WHERE c.case_ids LIKE ?
         ORDER BY q.id`
      )
      .all(`%${caseId}%`) as DbCausalQuestion[]
  ).map((item) => dbCausalQuestionToRecord(item));
  return {
    row,
    materials,
    evidence,
    entityIds,
    processes,
    facts,
    nativeConcepts,
    sharedConcepts,
    conceptMappings,
    causalClaims,
    causalQuestions,
    summary: dbCaseToSummary(row, materials, evidence)
  };
}

function dbMaterialToMaterial(row: DbMaterial): Material {
  return {
    id: row.id,
    caseId: row.case_id,
    title: row.title,
    kind: row.kind,
    author: row.author,
    date: row.date,
    source: row.source,
    excerpt: row.excerpt,
    sourceType: row.source_type ?? undefined,
    verificationStatus: row.verification_status ?? undefined,
    scope: row.scope ?? undefined,
    link: row.link ?? undefined,
    reliability: row.reliability ?? undefined,
    notes: row.notes ?? undefined
  };
}

function dbEvidenceToEvidence(row: DbEvidence): Evidence {
  return {
    id: row.id,
    caseId: row.case_id,
    claim: row.claim,
    quote: row.quote,
    source: row.source,
    locator: row.locator,
    strength: row.strength,
    entityIds: parseJson<string[]>(row.entity_ids, []),
    context: row.context ?? undefined,
    factStatus: row.fact_status as Evidence["factStatus"],
    verificationStatus: row.verification_status ?? undefined,
    processIds: parseJson<string[]>(row.process_ids, []),
    factIds: parseJson<string[]>(row.fact_ids, []),
    materialId: row.material_id ?? undefined
  };
}

function dbProcessToProcess(row: DbProcess): ProcessRecord {
  return {
    id: row.id,
    caseId: row.case_id,
    title: row.title,
    timeRange: row.time_range,
    narrative: row.narrative,
    actorIds: parseJson<string[]>(row.actor_ids, []),
    eventIds: parseJson<string[]>(row.event_ids, []),
    evidenceIds: parseJson<string[]>(row.evidence_ids, []),
    status: row.status,
    revision: row.revision
  };
}

function dbFactToFact(row: DbFact): FactRecord {
  return {
    id: row.id,
    caseId: row.case_id,
    statement: row.statement,
    entityRoles: parseJson<string[]>(row.entity_roles, []),
    evidenceIds: parseJson<string[]>(row.evidence_ids, []),
    factStatus: row.fact_status as FactRecord["factStatus"],
    timeScope: row.time_scope ?? undefined,
    spaceScope: row.space_scope ?? undefined,
    quantityScope: row.quantity_scope ?? undefined,
    confidence: row.confidence as FactRecord["confidence"],
    review: row.review
  };
}

function dbNativeConceptToRecord(row: DbNativeConcept): NativeConceptRecord {
  return {
    id: row.id,
    caseId: row.case_id,
    label: row.label,
    entityType: row.entity_type as NativeConceptRecord["entityType"],
    definition: row.definition,
    examples: parseJson<string[]>(row.examples, []),
    sourceRelationIds: parseJson<string[]>(row.source_relation_ids, []),
    status: row.status
  };
}

function dbSharedConceptToRecord(row: DbSharedConcept): SharedConceptRecord {
  return {
    id: row.id,
    label: row.label,
    definition: row.definition,
    entityType: (row.entity_type ?? undefined) as
      | SharedConceptRecord["entityType"]
      | undefined,
    scope: row.scope ?? undefined,
    supportingCaseIds: parseJson<string[]>(row.supporting_case_ids, []),
    supportingNativeIds: parseJson<string[]>(row.supporting_native_ids, []),
    negativeExamples: parseJson<string[]>(row.negative_examples, []),
    version: row.version,
    review: row.review
  };
}

function dbConceptMappingToRecord(row: DbConceptMapping): ConceptMappingRecord {
  return {
    id: row.id,
    caseId: row.case_id,
    nativeConceptId: row.native_concept_id,
    sharedConceptId: row.shared_concept_id ?? undefined,
    mappingType: row.mapping_type as ConceptMappingRecord["mappingType"],
    basis: row.basis,
    scope: row.scope ?? undefined,
    evidenceIds: parseJson<string[]>(row.evidence_ids, []),
    decision: row.decision,
    version: row.version
  };
}

function dbCausalClaimToRecord(row: DbCausalClaim): CausalClaimRecord {
  return {
    id: row.id,
    comparisonId: row.comparison_id ?? undefined,
    caseIds: parseJson<string[]>(row.case_ids, []),
    cause: row.cause,
    effect: row.effect,
    mechanismChain: parseJson<string[]>(row.mechanism_chain, []),
    evidenceIds: parseJson<string[]>(row.evidence_ids, []),
    alternativeExplanations: parseJson<string[]>(
      row.alternative_explanations,
      []
    ),
    counterfactualOrContrast: row.counterfactual_or_contrast ?? undefined,
    status: row.status as CausalClaimRecord["status"],
    confidence: row.confidence as CausalClaimRecord["confidence"],
    boundaryConditions: parseJson<string[]>(row.boundary_conditions, []),
    whatWouldChangeMind: parseJson<string[]>(row.what_would_change_mind, []),
    researcherDecision: row.researcher_decision,
    notes: row.notes ?? undefined
  };
}

function dbCausalQuestionToRecord(row: DbCausalQuestion): CausalQuestionRecord {
  return {
    id: row.id,
    causalClaimId: row.causal_claim_id,
    type: row.type,
    question: row.question,
    rationale: row.rationale ?? undefined,
    answer: row.answer ?? undefined,
    evidenceIds: parseJson<string[]>(row.evidence_ids, []),
    status: row.status
  };
}

function dbComparisonToRecord(row: DbComparison): ComparisonRecord {
  return {
    id: row.id,
    title: row.title,
    caseIds: parseJson<string[]>(row.case_ids, []),
    question: row.question,
    discussion: row.discussion,
    conclusion: row.conclusion,
    status: row.status as ComparisonRecord["status"],
    confidence: (row.confidence ?? undefined) as
      | ComparisonRecord["confidence"]
      | undefined,
    claimIds: parseJson<string[]>(row.claim_ids, []),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function getComparisonRecords(): ComparisonRecord[] {
  const rows = db
    .prepare("SELECT * FROM comparisons ORDER BY created_at DESC, id DESC")
    .all() as DbComparison[];
  return rows.map(dbComparisonToRecord);
}

function dbReviewPacketToRecord(row: DbReviewPacket): ReviewPacketRecord {
  return {
    id: row.id,
    skill: row.skill,
    gate: row.gate,
    caseId: row.case_id ?? undefined,
    scope: row.scope ?? undefined,
    payload: row.payload,
    status: row.status,
    createdAt: row.created_at
  };
}

function dbReviewDecisionToRecord(
  row: DbReviewDecision
): ReviewDecisionRecord {
  return {
    id: row.id,
    packetId: row.packet_id,
    action: row.action as ReviewDecisionRecord["action"],
    rationale: row.rationale ?? undefined,
    modifiedContent: row.modified_content ?? undefined,
    allowNextGate: Boolean(row.allow_next_gate),
    decidedAt: row.decided_at
  };
}

export function getReviewPackets(): ReviewPacketRecord[] {
  const rows = db
    .prepare("SELECT * FROM review_packets ORDER BY created_at DESC, id DESC")
    .all() as DbReviewPacket[];
  return rows.map(dbReviewPacketToRecord);
}

export function getReviewDecisions(): ReviewDecisionRecord[] {
  const rows = db
    .prepare("SELECT * FROM review_decisions ORDER BY decided_at DESC, id DESC")
    .all() as DbReviewDecision[];
  return rows.map(dbReviewDecisionToRecord);
}

export class ReviewWriteError extends Error {
  constructor(
    readonly code: "invalid_action" | "packet_not_found" | "duplicate_id",
    message: string
  ) {
    super(message);
    this.name = "ReviewWriteError";
  }
}

export function createReviewDecision(input: {
  id: string;
  packetId: string;
  action: string;
  rationale?: string;
  modifiedContent?: string;
  allowNextGate: boolean;
}): ReviewDecisionRecord {
  if (!isReviewAction(input.action)) {
    throw new ReviewWriteError("invalid_action", "Unsupported review action");
  }
  const packet = db
    .prepare("SELECT id FROM review_packets WHERE id = ?")
    .get(input.packetId) as { id: string } | undefined;
  if (!packet) {
    throw new ReviewWriteError("packet_not_found", "Review packet not found");
  }
  const existing = db
    .prepare("SELECT id FROM review_decisions WHERE id = ?")
    .get(input.id) as { id: string } | undefined;
  if (existing) {
    throw new ReviewWriteError("duplicate_id", "Review decision already exists");
  }

  const decidedAt = new Date().toISOString();
  db.prepare(
    `INSERT INTO review_decisions
      (id, packet_id, action, rationale, modified_content,
       allow_next_gate, decided_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    input.id,
    input.packetId,
    input.action,
    input.rationale ?? null,
    input.modifiedContent ?? null,
    input.allowNextGate ? 1 : 0,
    decidedAt
  );

  return {
    id: input.id,
    packetId: input.packetId,
    action: input.action,
    rationale: input.rationale,
    modifiedContent: input.modifiedContent,
    allowNextGate: input.allowNextGate,
    decidedAt
  };
}

export function getComparisonData(): ComparisonData {
  return {
    nativeConcepts: (
      db
        .prepare("SELECT * FROM native_concepts ORDER BY case_id, id")
        .all() as DbNativeConcept[]
    ).map(dbNativeConceptToRecord),
    sharedConcepts: (
      db.prepare("SELECT * FROM shared_concepts ORDER BY id").all() as DbSharedConcept[]
    ).map(dbSharedConceptToRecord),
    conceptMappings: (
      db.prepare("SELECT * FROM concept_mappings ORDER BY id").all() as DbConceptMapping[]
    ).map(dbConceptMappingToRecord),
    causalClaims: (
      db.prepare("SELECT * FROM causal_claims ORDER BY id").all() as DbCausalClaim[]
    ).map(dbCausalClaimToRecord),
    comparisons: getComparisonRecords()
  };
}

export function getCases(): CaseSummary[] {
  const rows = db.prepare("SELECT * FROM cases ORDER BY idx").all() as DbCase[];
  return rows.map((row) => getCaseBundle(row.id)!.summary);
}

export function getCaseDetail(caseId: string): CaseDetail | null {
  const bundle = getCaseBundle(caseId);
  if (!bundle) return null;
  return {
    ...bundle.summary,
    rebuild: parseJson<string[]>(bundle.row.rebuild, []),
    materials: bundle.materials,
    evidence: bundle.evidence,
    entityIds: bundle.entityIds,
    processes: bundle.processes,
    facts: bundle.facts,
    nativeConcepts: bundle.nativeConcepts,
    sharedConcepts: bundle.sharedConcepts,
    conceptMappings: bundle.conceptMappings,
    causalClaims: bundle.causalClaims,
    causalQuestions: bundle.causalQuestions
  };
}

export function getGraph(): { nodes: GraphNode[]; links: GraphLink[] } {
  const entityRows = db
    .prepare("SELECT * FROM entities ORDER BY rowid")
    .all() as DbEntity[];
  const caseRows = db.prepare("SELECT * FROM cases ORDER BY idx").all() as DbCase[];
  const relationRows = db
    .prepare("SELECT * FROM relations ORDER BY id")
    .all() as DbRelation[];
  const caseEntityRows = db
    .prepare("SELECT case_id, entity_id FROM case_entities")
    .all() as { case_id: string; entity_id: string }[];
  const nativeConceptRows = db
    .prepare("SELECT * FROM native_concepts ORDER BY id")
    .all() as DbNativeConcept[];
  const sharedConceptRows = db
    .prepare("SELECT * FROM shared_concepts ORDER BY id")
    .all() as DbSharedConcept[];
  const conceptMappingRows = db
    .prepare("SELECT * FROM concept_mappings ORDER BY id")
    .all() as DbConceptMapping[];
  const relationById = new Map(relationRows.map((row) => [row.id, row]));
  const entityTypeById = new Map(
    entityRows.map((row) => [row.id, row.type])
  );

  const entityCaseIds = new Map<string, string[]>();
  for (const row of caseEntityRows) {
    const list = entityCaseIds.get(row.entity_id) ?? [];
    list.push(row.case_id);
    entityCaseIds.set(row.entity_id, list);
  }

  const links: GraphLink[] = relationRows.map((row) => ({
    id: row.id,
    caseId: row.case_id,
    source: row.source,
    target: row.target,
    type: row.type,
    label: row.label,
    weight: row.weight,
    factStatus: row.fact_status as GraphLink["factStatus"],
    qualifiers: row.qualifiers ?? undefined,
    processIds: parseJson<string[]>(row.process_ids, []),
    evidenceIds: parseJson<string[]>(row.evidence_ids, []),
    factGroupId: row.fact_group_id ?? undefined,
    verifiedEvidenceIds: parseJson<string[]>(
      row.verified_evidence_ids,
      []
    ),
    candidateEvidenceIds: parseJson<string[]>(
      row.candidate_evidence_ids,
      []
    ),
    traceStatus: row.trace_status ?? undefined,
    layer: "relation"
  }));

  for (const row of caseEntityRows) {
    links.push({
      id: `case-${row.case_id}-${row.entity_id}`,
      source: `case:${row.case_id}`,
      target: row.entity_id,
      type: "涉及",
      label: "涉及",
      weight: 1.15,
      layer: "case_membership"
    });
  }

  for (const concept of sharedConceptRows) {
    for (const caseId of parseJson<string[]>(
      concept.supporting_case_ids,
      []
    )) {
      links.push({
        id: `concept-coverage:${concept.id}-${caseId}`,
        caseId,
        source: `shared:${concept.id}`,
        target: `case:${caseId}`,
        type: "概念覆盖",
        label: "覆盖",
        weight: 1.4,
        layer: "concept_coverage"
      });
    }
  }

  const nativeConceptById = new Map(
    nativeConceptRows.map((row) => [row.id, row])
  );
  const sharedEntityEdges = new Map<
    string,
    { sharedId: string; entityId: string; caseId: string; evidenceIds: Set<string> }
  >();
  for (const row of conceptMappingRows) {
    if (!row.shared_concept_id) continue;
    const native = nativeConceptById.get(row.native_concept_id);
    if (!native) continue;
    for (const relationId of parseJson<string[]>(
      native.source_relation_ids,
      []
    )) {
      const relation = relationById.get(relationId);
      if (!relation) continue;
      const entityIds = [
        relation.source,
        relation.target
      ].filter((entityId) => entityTypeById.get(entityId) === native.entity_type);
      for (const entityId of entityIds) {
        const key = `${row.shared_concept_id}:${entityId}`;
        const edge = sharedEntityEdges.get(key) ?? {
          sharedId: row.shared_concept_id,
          entityId,
          caseId: row.case_id,
          evidenceIds: new Set<string>()
        };
        for (const evidenceId of parseJson<string[]>(row.evidence_ids, [])) {
          edge.evidenceIds.add(evidenceId);
        }
        sharedEntityEdges.set(key, edge);
      }
    }
  }
  for (const edge of sharedEntityEdges.values()) {
    links.push({
      id: `shared-entity:${edge.sharedId}-${edge.entityId}`,
      caseId: edge.caseId,
      source: `shared:${edge.sharedId}`,
      target: edge.entityId,
      type: "共享概念",
      label: "共享概念",
      weight: 1.55,
      evidenceIds: [...edge.evidenceIds],
      layer: "concept_mapping"
    });
  }

  const degree = new Map<string, number>();
  for (const link of links) {
    degree.set(link.source, (degree.get(link.source) ?? 0) + 1);
    degree.set(link.target, (degree.get(link.target) ?? 0) + 1);
  }

  const nodes: GraphNode[] = entityRows.map((row) => ({
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    type: row.type,
    degree: degree.get(row.id) ?? 0,
    caseIds: entityCaseIds.get(row.id) ?? [],
    description: row.description,
    definition: row.definition,
    layer: "entity"
  }));

  for (const row of caseRows) {
    nodes.push({
      id: `case:${row.id}`,
      name: row.name,
      nameEn: row.name_en,
      type: "case",
      degree: degree.get(`case:${row.id}`) ?? 0,
      caseIds: [row.id]
    });
  }

  for (const row of sharedConceptRows) {
    if (!row.entity_type) continue;
    nodes.push({
      id: `shared:${row.id}`,
      name: row.label,
      nameEn: row.label,
      type: row.entity_type as GraphNode["type"],
      degree: degree.get(`shared:${row.id}`) ?? 0,
      caseIds: parseJson<string[]>(row.supporting_case_ids, []),
      description: row.scope ?? "",
      definition: row.definition,
      layer: "shared_concept",
      status: row.review
    });
  }

  return { nodes, links };
}

export function getEntityDetail(entityId: string): EntityDetail | null {
  const entity = db.prepare("SELECT * FROM entities WHERE id = ?").get(entityId) as
    | DbEntity
    | undefined;
  if (!entity) return null;
  const graph = getGraph();
  const node = graph.nodes.find((item) => item.id === entityId);
  if (!node) return null;

  const caseIds = node.caseIds;
  const cases = getCases().filter((item) => caseIds.includes(item.id));

  const neighbors: EntityNeighbor[] = [];
  for (const link of graph.links) {
    if (link.layer !== "relation") continue;
    if (link.source === entityId) {
      const target = graph.nodes.find((item) => item.id === link.target);
      if (target) {
        neighbors.push({
          node: target,
          label: link.label,
          direction: "out"
        });
      }
    } else if (link.target === entityId) {
      const source = graph.nodes.find((item) => item.id === link.source);
      if (source) {
        neighbors.push({
          node: source,
          label: link.label,
          direction: "in"
        });
      }
    }
  }

  const evidenceRows = db
    .prepare("SELECT * FROM evidence ORDER BY id")
    .all() as DbEvidence[];
  const evidence = evidenceRows
    .map(dbEvidenceToEvidence)
    .filter((item) => item.entityIds.includes(entityId));

  return {
    entity: {
      ...node,
      description: entity.description,
      definition: entity.definition
    },
    cases,
    neighbors,
    evidence,
    signal: {
      cases: cases.length,
      evidence: evidence.length,
      relations: neighbors.length
    }
  };
}

export function getOntology() {
  const rows = db
    .prepare("SELECT * FROM ontology_versions ORDER BY id")
    .all() as {
    id: string;
    version: string;
    title: string;
    structure: string;
    adjustment: string;
    problem: string;
    chapter: string;
  }[];
  return rows.map((row) => ({ ...row }));
}

export function getBootstrap(): BootstrapPayload {
  const cases = getCases();
  const graph = getGraph();
  const entityCount = (
    db.prepare("SELECT COUNT(*) AS count FROM entities").get() as {
      count: number;
    }
  ).count;
  const evidenceTotal = (
    db.prepare("SELECT COUNT(*) AS count FROM evidence").get() as {
      count: number;
    }
  ).count;
  const materialTotal = (
    db.prepare("SELECT COUNT(*) AS count FROM materials").get() as {
      count: number;
    }
  ).count;
  const relationTotal = (
    db.prepare("SELECT COUNT(*) AS count FROM relations").get() as {
      count: number;
    }
  ).count;
  const sharedConceptTotal = (
    db.prepare("SELECT COUNT(*) AS count FROM shared_concepts").get() as {
      count: number;
    }
  ).count;
  const reviewDecisionCount = (
    db.prepare("SELECT COUNT(*) AS count FROM review_decisions").get() as {
      count: number;
    }
  ).count;

  return {
    meta: {
      caseCount: cases.length,
      entityCount,
      relationCount: relationTotal,
      nativeConceptCount: entityCount,
      sharedConceptCount: sharedConceptTotal,
      evidenceCount: evidenceTotal,
      materialCount: materialTotal,
      seedVersion: SEED_VERSION,
      vecVersion,
      vectorDimensions: VECTOR_DIMENSIONS,
      embeddingModel: EMBEDDING_MODEL,
      reviewDecisionCount,
      dbPath: DB_PATH
    },
    cases,
    graph,
    ontology: getOntology(),
    comparison: getComparisonData()
  };
}

function makeSnippet(body: string, query: string, limit = 150) {
  const compact = body.replace(/\s+/g, " ").trim();
  const lower = compact.toLowerCase();
  const q = query.trim().toLowerCase();
  let start = q ? lower.indexOf(q) : -1;
  if (start < 0 && q) {
    for (let i = 0; i < q.length - 1; i += 1) {
      const index = lower.indexOf(q.slice(i, i + 2));
      if (index >= 0) {
        start = index;
        break;
      }
    }
  }
  if (start < 0) start = 0;
  start = Math.max(0, start - 36);
  const snippet = compact.slice(start, start + limit);
  return `${start > 0 ? "…" : ""}${snippet}${start + limit < compact.length ? "…" : ""}`;
}

export function searchAtlas(query: string): SearchPayload {
  const started = Date.now();
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      query: trimmed,
      took: 0,
      engine: `${EMBEDDING_MODEL} · sqlite-vec ${vecVersion} · ${VECTOR_DIMENSIONS}d cosine`,
      hits: []
    };
  }

  const rows = db
    .prepare(
      `SELECT d.kind, d.ref_id, d.case_id, d.entity_id, d.title, d.subtitle, d.body,
              v.distance
       FROM (
         SELECT rowid, distance
         FROM vec_search
         WHERE embedding MATCH ? AND k = 24
       ) v
       JOIN search_docs d ON d.rowid = v.rowid
       ORDER BY v.distance ASC`
    )
    .all(embeddingBuffer(trimmed)) as {
    kind: SearchHit["kind"];
    ref_id: string;
    case_id: string | null;
    entity_id: string | null;
    title: string;
    subtitle: string;
    body: string;
    distance: number;
  }[];

  const normalized = trimmed.toLowerCase();
  const hits: SearchHit[] = rows.map((row) => {
    const haystack = `${row.title} ${row.subtitle} ${row.body}`.toLowerCase();
    const lexicalBoost = haystack.includes(normalized) ? 0.09 : 0;
    return {
      kind: row.kind,
      refId: row.ref_id,
      caseId: row.case_id,
      entityId: row.entity_id,
      title: row.title,
      subtitle: row.subtitle,
      snippet: makeSnippet(row.body, trimmed),
      score: Math.max(0, Math.min(1, 1 - row.distance / 2 + lexicalBoost))
    };
  });

  hits.sort((a, b) => b.score - a.score);

  return {
    query: trimmed,
    took: Date.now() - started,
    engine: `${EMBEDDING_MODEL} · sqlite-vec ${vecVersion} · ${VECTOR_DIMENSIONS}d cosine`,
    hits: hits.slice(0, 12)
  };
}

export function getMeta() {
  const materialTotal = (
    db.prepare("SELECT COUNT(*) AS count FROM materials").get() as {
      count: number;
    }
  ).count;
  const evidenceTotal = (
    db.prepare("SELECT COUNT(*) AS count FROM evidence").get() as {
      count: number;
    }
  ).count;
  const reviewDecisionCount = (
    db.prepare("SELECT COUNT(*) AS count FROM review_decisions").get() as {
      count: number;
    }
  ).count;
  return {
    seedVersion: SEED_VERSION,
    dataset: readMeta("dataset") ?? "demo-seed",
    vecVersion,
    vectorDimensions: VECTOR_DIMENSIONS,
    embeddingModel: EMBEDDING_MODEL,
    reviewDecisionCount,
    dbPath: DB_PATH,
    materialCount: materialTotal,
    evidenceCount: evidenceTotal
  };
}
