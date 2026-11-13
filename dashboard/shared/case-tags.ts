// Case tags are deliberately selected from each case's technology nodes.
// Country and the dataset name are already shown elsewhere in the UI.
export const CASE_TECH_TAGS: Record<string, string[]> = {
  C01: ["高速光纤与无线网络", "虚拟社区门户"],
  C02: ["StrateGIS空间分析方法", "UrbanistAI"],
  C03: ["Virtual Slaithwaite数字参与系统", "Web-GIS"],
  C04: ["田林街道智慧社区平台", "视频AI事件识别系统"],
  C05: ["AI图像分析", "智能回收与自动称重功能"],
  C06: ["Frogbox", "damp-busting住房潮湿监测分析系统"],
  C07: ["Carpenters Connect", "Commonplace平台与项目网站"],
  C08: ["17项物联网服务", "火灾与环境监测服务"],
  C09: ["“及时雨”数字社区平台", "AI视频识别系统"],
  C10: ["CIOP平台", "传感器和API"],
  C11: ["外保温等节能措施", "区域供热系统"]
};

export function techTagsForCase(caseId: string, fallback: string[] = []): string[] {
  return CASE_TECH_TAGS[caseId] ?? fallback;
}
