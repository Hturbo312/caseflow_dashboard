import type {
  CoreEntityType,
  Evidence,
  FactStatus,
  Material,
  OntologyVersion,
  Strength
} from "../shared/types";

export const SEED_VERSION = 2;

export interface SeedEntity {
  id: string;
  name: string;
  nameEn: string;
  type: CoreEntityType;
  description: string;
  definition: string;
  roles?: CoreEntityType[];
}

export interface SeedCase {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  country: string;
  city: string;
  year: string;
  period: string;
  eventStart?: string;
  eventEnd?: string;
  scope?: string;
  evidenceCutoff?: string;
  researchQuestion?: string;
  status?: string;
  accent: string;
  cover: string;
  tags: string[];
  summary: string;
  rebuild: string[];
  concepts: string[];
  materials: Omit<Material, "caseId">[];
  evidence: Omit<Evidence, "caseId">[];
}

export interface SeedRelation {
  caseId?: string;
  source: string;
  target: string;
  type: string;
  label: string;
  weight?: number;
  factStatus?: FactStatus;
  qualifiers?: string;
  processIds?: string[];
  evidenceIds?: string[];
  headRole?: CoreEntityType;
  tailRole?: CoreEntityType;
}

export interface SeedProcess {
  id: string;
  caseId: string;
  title: string;
  timeRange: string;
  narrative: string;
  actorIds?: string[];
  eventIds?: string[];
  evidenceIds: string[];
  status: string;
  revision: number;
}

export interface SeedFact {
  id: string;
  caseId: string;
  statement: string;
  entityRoles: string[];
  evidenceIds: string[];
  factStatus: FactStatus;
  timeScope?: string;
  spaceScope?: string;
  quantityScope?: string;
  confidence: Strength;
  review: string;
}

export interface SeedNativeConcept {
  id: string;
  caseId: string;
  label: string;
  entityType: CoreEntityType;
  definition: string;
  examples: string[];
  sourceRelationIds: string[];
  status: string;
}

export const entities: SeedEntity[] = [
  {
    id: "c06-context-damp",
    name: "社区潮湿住房问题",
    nameEn: "Damp Housing Problem",
    type: "context",
    description: "社区更新所回应的居住环境问题，涉及潮湿、霉变和室内健康风险。",
    definition: "影响更新目标与行动选择的环境、社会、制度或技术条件。"
  },
  {
    id: "c06-context-participation",
    name: "居民参与式更新情境",
    nameEn: "Participatory Renewal Context",
    type: "context",
    description: "更新过程强调居民经验、社区组织和日常空间中的参与。",
    definition: "更新行动发生的参与结构、社区关系与制度背景。"
  },
  {
    id: "c06-actor-project-team",
    name: "项目团队",
    nameEn: "Project Team",
    type: "actor",
    roles: ["actor"],
    description: "组织和推进 Damp Busters 问题识别过程的项目组织。",
    definition: "参与、决策、实施或使用相关技术与资源的人及组织。"
  },
  {
    id: "c06-actor-residents",
    name: "社区居民",
    nameEn: "Residents",
    type: "actor",
    roles: ["actor", "target"],
    description: "参与问题识别、意见表达和环境记录的社区居民。",
    definition: "在具体事实中承担参与、使用或被观察角色的人及群体。"
  },
  {
    id: "c06-actor-artist",
    name: "艺术家",
    nameEn: "Artist",
    type: "actor",
    description: "通过非正式交流连接居民日常经验与问题识别的参与者。",
    definition: "在更新过程中承担沟通、创作或中介作用的个人或组织。"
  },
  {
    id: "c06-actor-local-org",
    name: "地方社区组织",
    nameEn: "Local Community Organizations",
    type: "actor",
    description: "为社区网络分析和居民联系提供地方知识与社会关系的组织。",
    definition: "在社区更新中承担组织、联络或资源连接作用的地方组织。"
  },
  {
    id: "c06-task-identify-problem",
    name: "识别社区潮湿问题",
    nameEn: "Identify Damp Problems",
    type: "task",
    description: "案例拟解决的核心问题，即识别潮湿住房问题及其居民经验。",
    definition: "案例拟解决的问题或希望实现的更新目标。"
  },
  {
    id: "c06-task-collect-views",
    name: "收集居民意见",
    nameEn: "Collect Resident Views",
    type: "task",
    description: "通过社区网络、地方组织和艺术家交流收集居民对问题的表述。",
    definition: "围绕更新目标组织的意见收集与问题识别任务。"
  },
  {
    id: "c06-tech-frogbox",
    name: "Frogbox 环境监测设备",
    nameEn: "Frogbox Sensor Kit",
    type: "technology",
    description: "用于记录室内温湿度等环境数据的设备。",
    definition: "被采用、开发或部署的设备、工具、平台与系统。"
  },
  {
    id: "c06-cap-temp-humidity",
    name: "温湿度采集",
    nameEn: "Temperature & Humidity Sensing",
    type: "capability",
    description: "Frogbox 能够提供室内温湿度数据采集的功能。",
    definition: "技术能够提供或在实践中发挥的具体功能。"
  },
  {
    id: "c06-cap-network-analysis",
    name: "社区网络分析",
    nameEn: "Community Network Analysis",
    type: "capability",
    description: "识别社区关系、地方组织与居民联系的分析能力。",
    definition: "行动主体在更新过程中调用的分析、组织或沟通能力。"
  },
  {
    id: "c06-action-network-analysis",
    name: "开展社区网络分析",
    nameEn: "Conduct Community Network Analysis",
    type: "action",
    description: "项目团队分析社区关系与地方组织网络的活动。",
    definition: "主体已经实施或计划实施的具体活动。"
  },
  {
    id: "c06-action-contact-orgs",
    name: "联系地方社区组织",
    nameEn: "Contact Local Organizations",
    type: "action",
    description: "项目团队通过地方社区组织建立居民联系的活动。",
    definition: "主体为推进更新目标而实施的联系与协调活动。"
  },
  {
    id: "c06-action-artist-exchange",
    name: "艺术家与居民非正式交流",
    nameEn: "Informal Artist-Resident Exchange",
    type: "action",
    description: "艺术家在居民日常活动空间开展的非正式交流。",
    definition: "主体在具体情境中实施的沟通、观察或参与活动。"
  },
  {
    id: "c06-action-residents-record",
    name: "居民使用设备记录室内环境",
    nameEn: "Residents Record Indoor Environment",
    type: "action",
    description: "居民使用 Frogbox 记录室内温湿度等环境信息。",
    definition: "居民在更新过程中实施的具体环境记录行动。"
  },
  {
    id: "c06-action-translate-language",
    name: "延迟技术语言并设置术语提示机制",
    nameEn: "Delay Technical Language and Add Terminology Prompts",
    type: "action",
    description: "在参与过程中调整技术语言出现时机，并提供术语解释提示。",
    definition: "为降低技术门槛而实施的语言转译与提示行动。"
  },
  {
    id: "c06-target-housing",
    name: "社区住房",
    nameEn: "Community Housing",
    type: "target",
    description: "更新行动所观察、处理和改变的社区住房。",
    definition: "被观察、处理、服务或改变的人、物、数据与空间。"
  },
  {
    id: "c06-target-indoor-env",
    name: "居民室内环境",
    nameEn: "Residents' Indoor Environment",
    type: "target",
    description: "温湿度记录与潮湿问题识别所作用的生活环境。",
    definition: "更新行动直接作用或被记录的具体环境对象。"
  },
  {
    id: "c06-outcome-problem-map",
    name: "社区潮湿问题图谱",
    nameEn: "Community Damp Problem Map",
    type: "outcome",
    description: "通过社区网络、地方组织与居民交流形成的初步问题图谱。",
    definition: "具有证据依据的产出、变化及后果。"
  },
  {
    id: "c06-outcome-participation-base",
    name: "居民参与基础",
    nameEn: "Basis for Resident Participation",
    type: "outcome",
    description: "问题识别阶段形成的居民联系、信任与参与条件。",
    definition: "更新过程产生的参与条件、关系变化或后续行动基础。"
  }
];

export const cases: SeedCase[] = [
  {
    id: "c06",
    code: "C06",
    name: "Damp Busters · 社区潮湿住房更新",
    nameEn: "Damp Busters",
    country: "United Kingdom",
    city: "London",
    year: "2014",
    period: "问题识别阶段",
    eventStart: "2014",
    eventEnd: "2014",
    scope: "社区潮湿住房问题识别与居民意见收集",
    evidenceCutoff: "2026-11-13",
    researchQuestion: "参与式技术如何进入社区更新的问题识别过程？",
    status: "frozen",
    accent: "#8a4b35",
    cover: "network",
    tags: ["社区更新", "参与式技术", "环境监测"],
    summary:
      "Damp Busters 通过社区网络分析、地方组织联系和艺术家在居民日常空间中的非正式交流，识别潮湿住房问题并形成居民参与基础。",
    rebuild: [
      "问题识别阶段持续约 4 个月。",
      "项目团队开展社区网络分析并联系地方社区组织。",
      "艺术家在居民日常活动空间开展非正式交流。",
      "社区居民参与意见收集，并使用 Frogbox 记录室内环境。"
    ],
    concepts: entities.map((entity) => entity.id),
    materials: [
      {
        id: "M01",
        title: "A City in Common: Explorations on Sustained Community Engagement with Bottom-up Civic Technologies",
        kind: "学术文献",
        author: "UCL",
        date: "2015",
        source: "UCL Discovery",
        excerpt:
          "Damp Busters 的问题识别阶段包括城市网络分析、社区组织联系和艺术家在居民日常活动空间开展的非正式交流。",
        sourceType: "academic",
        verificationStatus: "verified",
        scope: "问题识别阶段",
        link: "https://discovery.ucl.ac.uk/id/eprint/1547540/",
        reliability: "high"
      }
    ],
    evidence: [
      {
        id: "M01-E03",
        claim: "Damp Busters 的问题识别阶段持续约 4 个月，包括城市网络分析、社区组织联系和艺术家在居民日常活动空间开展的非正式交流。",
        quote:
          "Damp Busters 的问题识别阶段持续约 4 个月，包括城市网络分析、社区组织联系和艺术家在居民日常活动空间开展的非正式交流。",
        source: "A City in Common",
        locator: "M01，第 215—218 页",
        strength: "high",
        entityIds: [
          "c06-action-network-analysis",
          "c06-action-contact-orgs",
          "c06-action-artist-exchange",
          "c06-task-identify-problem"
        ],
        context: "社区问题识别与居民意见收集",
        factStatus: "implemented",
        verificationStatus: "verified",
        processIds: ["C06-P01"],
        factIds: ["F001", "F002", "F003", "F004"],
        materialId: "M01"
      }
    ]
  }
];

export const relations: SeedRelation[] = [
  {
    source: "c06-actor-project-team",
    target: "c06-action-network-analysis",
    type: "开展",
    label: "开展",
    factStatus: "implemented",
    headRole: "actor",
    tailRole: "action",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-actor-project-team",
    target: "c06-actor-local-org",
    type: "联系",
    label: "联系",
    factStatus: "implemented",
    headRole: "actor",
    tailRole: "actor",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-actor-project-team",
    target: "c06-actor-artist",
    type: "邀请参与",
    label: "邀请参与",
    factStatus: "implemented",
    headRole: "actor",
    tailRole: "actor",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-actor-artist",
    target: "c06-action-artist-exchange",
    type: "开展",
    label: "开展",
    factStatus: "implemented",
    headRole: "actor",
    tailRole: "action",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-action-network-analysis",
    target: "c06-context-damp",
    type: "识别",
    label: "识别",
    factStatus: "implemented",
    headRole: "action",
    tailRole: "context",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-action-contact-orgs",
    target: "c06-actor-residents",
    type: "连接",
    label: "连接",
    factStatus: "implemented",
    headRole: "action",
    tailRole: "target",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-actor-residents",
    target: "c06-task-collect-views",
    type: "参与",
    label: "参与",
    factStatus: "implemented",
    headRole: "actor",
    tailRole: "task",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-actor-residents",
    target: "c06-tech-frogbox",
    type: "使用",
    label: "使用",
    factStatus: "implemented",
    headRole: "actor",
    tailRole: "technology",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-tech-frogbox",
    target: "c06-cap-temp-humidity",
    type: "具备",
    label: "具备",
    factStatus: "implemented",
    headRole: "technology",
    tailRole: "capability",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-cap-temp-humidity",
    target: "c06-target-indoor-env",
    type: "作用于",
    label: "作用于",
    factStatus: "implemented",
    headRole: "capability",
    tailRole: "target",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-action-residents-record",
    target: "c06-target-indoor-env",
    type: "记录",
    label: "记录",
    factStatus: "implemented",
    headRole: "action",
    tailRole: "target",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-action-residents-record",
    target: "c06-target-housing",
    type: "作用于",
    label: "作用于",
    factStatus: "implemented",
    headRole: "action",
    tailRole: "target",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-action-artist-exchange",
    target: "c06-task-collect-views",
    type: "补充",
    label: "补充",
    factStatus: "implemented",
    headRole: "action",
    tailRole: "task",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-action-network-analysis",
    target: "c06-outcome-problem-map",
    type: "产出",
    label: "产出",
    factStatus: "implemented",
    headRole: "action",
    tailRole: "outcome",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-task-collect-views",
    target: "c06-outcome-participation-base",
    type: "产出",
    label: "产出",
    factStatus: "implemented",
    headRole: "task",
    tailRole: "outcome",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-actor-project-team",
    target: "c06-action-translate-language",
    type: "采用",
    label: "采用",
    factStatus: "reported_or_opinion",
    headRole: "actor",
    tailRole: "action",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  },
  {
    source: "c06-action-translate-language",
    target: "c06-action-artist-exchange",
    type: "调整",
    label: "调整",
    factStatus: "reported_or_opinion",
    headRole: "action",
    tailRole: "action",
    processIds: ["C06-P01"],
    evidenceIds: ["M01-E03"]
  }
];

export const processes: SeedProcess[] = [
  {
    id: "C06-P01",
    caseId: "c06",
    title: "社区问题识别与居民意见收集",
    timeRange: "约 4 个月",
    narrative:
      "项目团队通过社区网络分析、地方组织联系和艺术家在居民日常活动空间中的非正式交流，识别社区潮湿问题并收集居民意见。",
    actorIds: [
      "c06-actor-project-team",
      "c06-actor-local-org",
      "c06-actor-artist",
      "c06-actor-residents"
    ],
    eventIds: [],
    evidenceIds: ["M01-E03"],
    status: "verified",
    revision: 1
  }
];

export const facts: SeedFact[] = [
  {
    id: "F001",
    caseId: "c06",
    statement: "项目团队开展社区网络分析。",
    entityRoles: ["c06-actor-project-team:actor", "c06-action-network-analysis:action"],
    evidenceIds: ["M01-E03"],
    factStatus: "implemented",
    timeScope: "问题识别阶段",
    confidence: "high",
    review: "accepted"
  },
  {
    id: "F002",
    caseId: "c06",
    statement: "项目团队联系地方社区组织。",
    entityRoles: ["c06-actor-project-team:actor", "c06-actor-local-org:actor"],
    evidenceIds: ["M01-E03"],
    factStatus: "implemented",
    timeScope: "问题识别阶段",
    confidence: "high",
    review: "accepted"
  },
  {
    id: "F003",
    caseId: "c06",
    statement: "艺术家开展与居民的非正式交流。",
    entityRoles: ["c06-actor-artist:actor", "c06-action-artist-exchange:action"],
    evidenceIds: ["M01-E03"],
    factStatus: "implemented",
    timeScope: "问题识别阶段",
    confidence: "high",
    review: "accepted"
  },
  {
    id: "F004",
    caseId: "c06",
    statement: "问题识别阶段持续约 4 个月。",
    entityRoles: ["c06-task-identify-problem:task"],
    evidenceIds: ["M01-E03"],
    factStatus: "implemented",
    timeScope: "约 4 个月",
    confidence: "high",
    review: "accepted"
  }
];

export const nativeConcepts: SeedNativeConcept[] = [
  {
    id: "NC-C06-01",
    caseId: "c06",
    label: "延迟技术语言并设置术语提示机制",
    entityType: "action",
    definition: "在参与过程中调整技术语言出现时机，并提供术语解释提示。",
    examples: ["艺术家与居民交流时减少术语前置", "为设备与数据术语提供解释提示"],
    sourceRelationIds: ["R016", "R017"],
    status: "native"
  },
  {
    id: "NC-C06-02",
    caseId: "c06",
    label: "社区网络分析",
    entityType: "action",
    definition: "通过社区关系、地方组织和居民联系识别问题与参与者。",
    examples: ["分析地方组织关系", "识别居民联系路径"],
    sourceRelationIds: ["R001", "R005"],
    status: "native"
  },
  {
    id: "NC-C06-03",
    caseId: "c06",
    label: "居民室内环境记录",
    entityType: "action",
    definition: "居民使用环境监测设备记录室内温湿度等信息。",
    examples: ["使用 Frogbox 记录室内环境"],
    sourceRelationIds: ["R011"],
    status: "native"
  }
];

export const ontology: OntologyVersion[] = [
  {
    id: "v0.1",
    version: "v0.1",
    date: "2026-11-13",
    title: "社区更新本体 v0.1",
    summary: "按附录 A 建立情境、主体、任务、技术、能力、行动、作用对象、结果八类核心实体。",
    changes: [
      { kind: "add", text: "建立八类核心实体", count: 8 },
      { kind: "add", text: "建立 Damp Busters 原生知识节点", count: entities.length },
      { kind: "link", text: "建立基础关系与证据关联", count: relations.length }
    ],
    stats: {
      entities: entities.length,
      relations: relations.length,
      cases: cases.length,
      evidence: cases.reduce((total, item) => total + item.evidence.length, 0)
    }
  }
];

export const materialCount = cases.reduce(
  (total, item) => total + item.materials.length,
  0
);
export const evidenceCount = cases.reduce(
  (total, item) => total + item.evidence.length,
  0
);
