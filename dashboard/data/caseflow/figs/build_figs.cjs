const fs = require("fs");
const path = require("path");

const OUT = __dirname;
const FONT = "'Microsoft YaHei','PingFang SC','Source Han Sans SC','Noto Sans CJK SC',sans-serif";
const SERIF = "'Source Han Serif SC','Songti SC','SimSun',serif";

const C = {
  actor: { fill: "#eaf2fa", stroke: "#4f77a0", text: "#17324d" },
  technology: { fill: "#e9f6ee", stroke: "#47875f", text: "#173d27" },
  action: { fill: "#fdf2e4", stroke: "#b07b42", text: "#4a3115" },
  outcome: { fill: "#f8edf1", stroke: "#96606f", text: "#3f1f2a" },
  target: { fill: "#f1f1f5", stroke: "#75758a", text: "#2c2c38" },
  context: { fill: "#f7f3ea", stroke: "#93825f", text: "#38301f" }
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function box(n) {
  const c = C[n.type] || C.target;
  const lines = n.label.split("\n");
  const total = lines.length * 15 + (n.sub ? 13 : 0);
  let y = n.y + (n.h - total) / 2 + 11;
  const t = lines
    .map((l) => {
      const s = `<text x="${n.x + n.w / 2}" y="${y}" text-anchor="middle" font-size="12.5" fill="${c.text}">${esc(l)}</text>`;
      y += 15;
      return s;
    })
    .join("");
  const sub = n.sub
    ? `<text x="${n.x + n.w / 2}" y="${y + 1}" text-anchor="middle" font-size="9" fill="${c.stroke}">${esc(n.sub)}</text>`
    : "";
  const dash = n.pending ? ' stroke-dasharray="5 3"' : "";
  return `<g><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.3"${dash}/>${t}${sub}</g>`;
}

function ry(n, f) {
  return n.y + n.h * (f === undefined ? 0.5 : f);
}

function pathFwd(a, b, lane) {
  const x1 = a.x + a.w;
  const y1 = ry(a, a.fy);
  const x2 = b.x;
  const y2 = ry(b, b.ty);
  const dx = Math.max(26, (x2 - x1) * 0.5);
  const lift = lane || 0;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1 - lift}, ${x2 - dx} ${y2 - lift}, ${x2} ${y2}`;
}

function pathVert(a, b) {
  const x = a.x + a.w / 2;
  const y1 = a.y + a.h;
  const y2 = b.y;
  const k = Math.max(12, (y2 - y1) * 0.45);
  return `M ${x} ${y1} C ${x} ${y1 + k}, ${x} ${y2 - k}, ${x} ${y2}`;
}

function pathBack(a, b, laneX, e) {
  const x1 = a.x;
  const y1 = ry(a, a.fy);
  const x2 = b.x + b.w;
  const y2 = ry(b, b.ty);
  return `M ${x1} ${y1} C ${laneX} ${y1}, ${laneX} ${y2}, ${x2} ${y2}`;
}

function label(x, y, pred, ev, pending) {
  const lines = String(pred).split("\n");
  const w = Math.max(...lines.map((l) => l.length)) * 5.9 + 12;
  const h = lines.length * 12 + (ev ? 11 : 0) + 4;
  const color = pending ? "#9a6a33" : "#4c5966";
  let s = `<g><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="3" fill="#ffffff" opacity="0.94"/>`;
  let ty = y - h / 2 + 10;
  for (const l of lines) {
    s += `<text x="${x}" y="${ty}" text-anchor="middle" font-size="9.5" fill="${color}">${esc(l)}</text>`;
    ty += 12;
  }
  if (ev) s += `<text x="${x}" y="${ty - 1}" text-anchor="middle" font-size="8.5" fill="#93897a" font-style="italic">${esc(ev)}</text>`;
  return s + `</g>`;
}

function renderPanel(cfg, yOffset) {
  const N = {};
  cfg.nodes.forEach((n) => (N[n.id] = n));
  const parts = [];
  for (const e of cfg.edges) {
    const a = N[e.from];
    const b = N[e.to];
    let d;
    if (e.mode === "vert") d = pathVert(a, b);
    else if (e.mode === "back") d = pathBack(a, b, e.laneX, e);
    else d = pathFwd(a, b, e.lift);
    const color = e.pending ? "#a8763f" : "#5a6673";
    const dash = e.pending ? ' stroke-dasharray="6 5"' : "";
    parts.push(
      `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.15"${dash} marker-end="url(#${e.pending ? "ahd" : "ahs"})"/>`
    );
    if (e.pred) {
      let lx, ly;
      if (e.mode === "vert") {
        lx = a.x + a.w / 2 + (e.lx || 46);
        ly = (a.y + a.h + b.y) / 2;
      } else if (e.mode === "back") {
        lx = e.laneX;
        ly = (ry(a, a.fy) + ry(b, b.ty)) / 2;
      } else {
        lx = ((a.x + a.w) + b.x) / 2;
        ly = (ry(a, a.fy) + ry(b, b.ty)) / 2 + (e.ly || 0);
      }
      parts.push(label(lx, ly, e.pred, e.ev, e.pending));
    }
  }
  for (const n of cfg.nodes) parts.push(box(n));
  return `<g transform="translate(0,${yOffset})">${parts.join("")}</g>`;
}

function stages(cfg) {
  return cfg.stages
    .map(
      (s, i) =>
        `<g><rect x="${s.x}" y="6" width="${s.w}" height="24" rx="12" fill="#f4f2ec" stroke="#ded8c9"/>
<text x="${s.x + s.w / 2}" y="22" text-anchor="middle" font-size="11.5" fill="#6a6353" letter-spacing="1.2">${esc(s.label)}</text>
<text x="${s.x + 11}" y="22" font-size="9" fill="#b6ab92">${String(i + 1).padStart(2, "0")}</text></g>`
    )
    .join("");
}

const STAGES = [
  { x: 24, w: 210, label: "参与组织" },
  { x: 336, w: 210, label: "技术使用" },
  { x: 648, w: 210, label: "成果形成" },
  { x: 960, w: 210, label: "实施安排" },
  { x: 1272, w: 210, label: "后续结果" }
];

/* ============ C19 ============ */
const C19 = {
  stages: STAGES,
  nodes: [
    { id: "lb", x: 24, y: 76, w: 210, h: 46, type: "actor", label: "Cuyahoga Land Bank", sub: "master developer" },
    { id: "team", x: 24, y: 152, w: 210, h: 46, type: "actor", label: "Connect EC 项目团队", sub: "Seventh Hill 等" },
    { id: "stl", x: 24, y: 228, w: 210, h: 46, type: "actor", label: "带薪 Street Team Leader", sub: "Najae Jackson" },
    { id: "oh", x: 336, y: 76, w: 210, h: 46, type: "action", label: "Public Open House 2.0", sub: "2023-07-14 · 约 50 人" },
    { id: "ai", x: 336, y: 152, w: 210, h: 46, type: "action", label: "使用 UrbanistAI 生成图像", sub: "第 4 站台" },
    { id: "tool", x: 336, y: 228, w: 210, h: 46, type: "technology", label: "UrbanistAI 平台", sub: "文本生成图像" },
    { id: "place", x: 648, y: 76, w: 210, h: 46, type: "target", label: "公共空间与行动地点", sub: "30 项行动落点" },
    { id: "plan", x: 648, y: 152, w: 210, h: 46, type: "outcome", label: "30 项行动与最终报告", sub: "Greenway / Pocket Park …" },
    { id: "lb2", x: 960, y: 76, w: 210, h: 46, type: "actor", label: "土地银行：牵头", sub: "多数行动" },
    { id: "jur", x: 960, y: 152, w: 210, h: 46, type: "actor", label: "市府 / GCRTA", sub: "部分行动管辖" },
    { id: "cc", x: 960, y: 228, w: 210, h: 46, type: "actor", label: "东克利夫兰市议会", sub: "2025-10 决议", pending: true },
    { id: "green", x: 1272, y: 76, w: 210, h: 46, type: "outcome", label: "绿道建成", sub: "120 万美元" },
    { id: "house", x: 1272, y: 152, w: 210, h: 46, type: "outcome", label: "Phase 1 首期", sub: "7 套建成/翻新" },
    { id: "fight", x: 1272, y: 228, w: 210, h: 46, type: "outcome", label: "授权争议", sub: "合同到期主张", pending: true }
  ],
  edges: [
    { from: "lb", to: "team", mode: "vert", pred: "established", ev: "R007", lx: 52 },
    { from: "team", to: "stl", mode: "vert", pred: "hired", ev: "R008", lx: 40 },
    { from: "team", to: "oh", fy: 0.4, ty: 0.5, pred: "organized", ev: "R023", ly: -4 },
    { from: "oh", to: "ai", mode: "vert", pred: "includes", ev: "R026", lx: 48 },
    { from: "ai", to: "tool", mode: "vert", pred: "used", ev: "R030", lx: 38 },
    { from: "ai", fy: 0.5, to: "place", ty: 0.5, pred: "generated", ev: "R033", ly: -12 },
    { from: "team", fy: 0.8, to: "plan", ty: 0.3, pred: "produced", ev: "R043", ly: 14 },
    { from: "place", to: "plan", mode: "vert", pred: "specifies", ev: "R103", lx: 48 },
    { from: "plan", fy: 0.3, to: "lb2", ty: 0.5, pred: "leads", ev: "R044", ly: -22 },
    { from: "plan", fy: 0.5, to: "jur", ty: 0.5, pred: "has_jurisdiction_over", ev: "R045–R046", ly: 0 },
    { from: "plan", fy: 0.8, to: "cc", ty: 0.3, pred: "produced", ev: "R101", pending: true, ly: 22 },
    { from: "lb2", to: "green", pred: "completed", ev: "R085–R086", ly: -18 },
    { from: "lb2", fy: 0.8, to: "house", ty: 0.4, pred: "completed", ev: "R082–R083", ly: 16 },
    { from: "cc", to: "fight", pred: "demanded", ev: "R079", pending: true, ly: -14 }
  ]
};

/* ============ C20 ============ */
const C20 = {
  stages: STAGES,
  nodes: [
    { id: "muni", x: 24, y: 76, w: 210, h: 46, type: "actor", label: "普里什蒂纳市政府", sub: "公共空间与公园局" },
    { id: "council", x: 24, y: 152, w: 210, h: 46, type: "actor", label: "Children Councils", sub: "市政府任命" },
    { id: "host", x: 24, y: 228, w: 210, h: 46, type: "actor", label: "Space SyntaKs", sub: "与 Save the Children" },
    { id: "kids", x: 24, y: 304, w: 210, h: 46, type: "actor", label: "10–17 岁儿童参与者", sub: "50+ 人 · 参与 4 场工作坊" },
    { id: "ws", x: 336, y: 76, w: 210, h: 46, type: "action", label: "4 场儿童工作坊", sub: "另有 5 场利益相关方" },
    { id: "aiws", x: 336, y: 152, w: 210, h: 46, type: "action", label: "AI 共创 session", sub: "过程补充环节" },
    { id: "tool", x: 336, y: 228, w: 210, h: 46, type: "technology", label: "UrbanistAI", sub: "生成 / 可视化" },
    { id: "designer", x: 648, y: 76, w: 210, h: 46, type: "actor", label: "专业设计师", sub: "承接儿童输入" },
    { id: "design", x: 648, y: 152, w: 210, h: 46, type: "target", label: "三份设计方案", sub: "三个地点" },
    { id: "evalf", x: 648, y: 240, w: 210, h: 46, type: "action", label: "最终评估工作坊", sub: "儿童评估专业方案" },
    { id: "undp", x: 960, y: 76, w: 210, h: 46, type: "actor", label: "UNDP Kosovo", sub: "启动 2 份实施" },
    { id: "rfq", x: 960, y: 152, w: 210, h: 46, type: "action", label: "RFQ UNDP-KOS-00094", sub: "2023-09-27 发布" },
    { id: "permit", x: 960, y: 228, w: 210, h: 46, type: "context", label: "市政许可", sub: "3 地点 2 方案", pending: true },
    { id: "park", x: 1272, y: 76, w: 210, h: 46, type: "outcome", label: "1 个公园完成更新", sub: "未指明对应方案", pending: true },
    { id: "gap", x: 1272, y: 152, w: 210, h: 46, type: "outcome", label: "中标 / 施工 / 验收", sub: "无记录", pending: true }
  ],
  edges: [
    { from: "muni", to: "council", mode: "vert", pred: "任命", ev: "R011", lx: 34 },
    { from: "council", to: "kids", mode: "vert", pred: "遴选", ev: "R012", lx: 34 },
    { from: "host", fy: 0.3, to: "ws", ty: 0.7, pred: "主持", ev: "R014" },
    { from: "host", fy: 0.7, to: "aiws", ty: 0.3, pred: "组织", ev: "R021", ly: -14 },
    { from: "kids", fy: 0.3, to: "aiws", ty: 0.85, pred: "参与", ev: "R020", ly: 14 },
    { from: "aiws", to: "tool", mode: "vert", pred: "使用", ev: "R029", lx: 34 },
    { from: "tool", fy: 0.3, to: "design", ty: 0.75, pred: "提供 → 用于", ev: "R030 / R032", pending: true, ly: 10 },
    { from: "designer", to: "design", mode: "vert", pred: "制作", ev: "R025", lx: 34 },
    { from: "evalf", to: "design", mode: "vert", pred: "评估", ev: "R024", lx: 34 },
    { from: "undp", fy: 0.5, to: "design", ty: 0.3, mode: "back", laneX: 897, pred: "启动实施", ev: "R036" },
    { from: "undp", to: "rfq", mode: "vert", pred: "发布", ev: "R037", lx: 34 },
    { from: "permit", fy: 0.5, to: "design", ty: 0.9, mode: "back", laneX: 923, pred: "覆盖\n（许可范围）", ev: "R039", pending: true },
    { from: "rfq", fy: 0.2, to: "park", ty: 0.8, pred: "→ 验收？", ev: "C20-M03-E03", pending: true, ly: -8 },
    { from: "park", to: "gap", mode: "vert", pred: "对应关系未说明", ev: "—", pending: true, lx: 62 }
  ]
};

function svg() {
  const pad = 20;
  const h1 = pad + 26 + 20 + 300;
  const gap = 48;
  const h2 = h1 + gap + 26 + 20 + 372;
  return `<svg width="1520" height="${h2 + 8}" viewBox="0 0 1520 ${h2 + 8}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}">
<defs>
<marker id="ahs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9 z" fill="#5a6673"/></marker>
<marker id="ahd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9 z" fill="#a8763f"/></marker>
</defs>
<text x="24" y="26" font-size="14.5" font-weight="600" fill="#2b2b2b">C19　Connect East Cleveland（2023 参与 · 2024–2026 实施）</text>
<g transform="translate(0,36)">${stages(C19)}${renderPanel(C19, 44)}</g>
<line x1="24" y1="${h1}" x2="1496" y2="${h1}" stroke="#e6e1d6" stroke-width="1"/>
<text x="24" y="${h1 + 30}" font-size="14.5" font-weight="600" fill="#2b2b2b">C20　普里什蒂纳儿童友好公共空间共创（2023 共创 · 实施结果未确认）</text>
<g transform="translate(0,${h1 + 40})">${stages(C20)}${renderPanel(C20, 44)}</g>
</svg>`;
}

const html = `<!doctype html><html lang="zh"><head><meta charset="utf-8"/>
<style>html,body{margin:0;padding:0;background:#fff;} #wrap{width:1520px;} .cap{font-family:${SERIF};font-size:12.5px;color:#333;padding:6px 24px 0 24px;line-height:1.7;}
.cap b{font-family:${FONT};}</style></head><body><div id="wrap">${svg()}
<div class="cap"><b>图 5-3</b>　C19 与 C20 技术使用、参与成果及实施过程的关系子图对照。节点为原生实体（灰=对象，蓝=主体，橙=行动，绿=技术，粉=结果），边标签为开放关系谓词，其下为对应关系编号；<b>实线</b>为已实施且已核查的关系，<b>虚线</b>为报道、计划、争议或对应关系待确认。C20 的"中标／施工／验收"为空缺节点，表示现有材料未提供该环节记录，而非确认未实施。</div>
</div></body></html>`;

fs.writeFileSync(path.join(OUT, "fig5-3.html"), html, "utf8");
console.log("wrote fig5-3.html");

/* ================= 图 5-4 ================= */
const chip = (t, kind = "") => `<span class="chip ${kind}">${esc(t)}</span>`;

const fig54 = `<!doctype html><html lang="zh"><head><meta charset="utf-8"/>
<style>
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;background:#fff;font-family:${FONT};color:#23262b;}
  #wrap{width:1520px;padding:22px 26px 10px 26px;}
  .bar{display:flex;align-items:center;gap:18px;padding:0 2px 12px 2px;border-bottom:1px solid #e8e3d8;}
  .brand{font-size:15px;font-weight:600;letter-spacing:.3px;}
  .brand i{font-style:normal;color:#a8763f;}
  .tabs{display:flex;gap:6px;margin-left:6px;}
  .tab{font-size:11.5px;color:#7b7466;padding:5px 11px;border-radius:11px;}
  .tab.on{background:#f1ede3;color:#4a4335;font-weight:600;}
  .cases{margin-left:auto;font-size:11px;color:#8b8477;display:flex;gap:8px;align-items:center;}
  .round{display:grid;grid-template-columns:1fr 486px;gap:22px;padding:20px 2px 18px 2px;border-bottom:1px dashed #e6e1d6;}
  .round:last-of-type{border-bottom:none;}
  .rlabel{display:flex;align-items:center;gap:9px;margin-bottom:9px;}
  .rno{width:20px;height:20px;border-radius:50%;background:#4f77a0;color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:600;}
  .rtitle{font-size:12.5px;font-weight:600;color:#3c3a33;letter-spacing:.4px;}
  .rsub{font-size:10.5px;color:#9b9486;}
  .q{display:flex;gap:9px;margin-bottom:9px;}
  .av{width:22px;height:22px;border-radius:6px;font-size:10.5px;display:flex;align-items:center;justify-content:center;flex:none;font-weight:600;}
  .av.r{background:#eaf2fa;color:#2f5a80;border:1px solid #cbdcec;}
  .av.a{background:#f7f1e6;color:#8a6224;border:1px solid #e6d7bd;}
  .bub{font-size:12.5px;line-height:1.65;color:#23262b;padding-top:1px;}
  .a ul{margin:2px 0 0 0;padding-left:0;list-style:none;}
  .a li{font-size:12.3px;line-height:1.72;color:#33363b;padding-left:13px;position:relative;margin-bottom:2px;}
  .a li:before{content:"";position:absolute;left:2px;top:9px;width:4px;height:4px;border-radius:50%;background:#b9b1a0;}
  .chip{display:inline-block;font-size:9.5px;padding:1px 5px;border-radius:3px;background:#f2f0ea;color:#6f6858;border:1px solid #e2dccd;margin-left:3px;white-space:nowrap;font-style:normal;}
  .chip.ok{background:#eef6f0;border-color:#cfe3d6;color:#3d6b4e;}
  .chip.warn{background:#fdf3e7;border-color:#ecd9bd;color:#8a6224;}
  .chip.no{background:#f8edf1;border-color:#e8ccd5;color:#8a4055;}
  .side{background:#fbfaf7;border:1px solid #e8e3d8;border-radius:8px;padding:12px 14px;}
  .side h4{margin:0 0 9px 0;font-size:10.5px;color:#8b8477;font-weight:600;letter-spacing:1px;}
  .row{display:flex;align-items:baseline;gap:7px;font-size:11.2px;line-height:1.75;color:#3a3d42;}
  .row b{font-weight:600;color:#2b2e33;font-size:11.2px;flex:none;}
  .dot{width:5px;height:5px;border-radius:50%;flex:none;margin-top:6px;}
  .e{font-size:10.4px;line-height:1.62;color:#5d5a50;background:#fff;border:1px solid #ece7db;border-left:3px solid #c9bfa8;border-radius:4px;padding:6px 8px;margin-bottom:6px;}
  .e em{font-style:normal;color:#9b9486;}
  .e b{font-weight:600;color:#4a4335;}
  table.cmp{width:100%;border-collapse:collapse;font-size:10.5px;}
  table.cmp th{text-align:left;font-weight:600;color:#7b7466;padding:3px 4px;border-bottom:1px solid #e8e3d8;}
  table.cmp td{padding:4px;border-bottom:1px solid #f0ece2;color:#3a3d42;vertical-align:top;}
  .ok{color:#3d6b4e;}
  .warn{color:#8a6224;}
  .miss{color:#8a4055;}
  .note{font-family:${SERIF};font-size:12px;color:#4a4a4a;line-height:1.7;padding:12px 2px 0 2px;}
  .note b{font-family:${FONT};}
</style></head><body><div id="wrap">

<div class="bar">
  <div class="brand">CaseFlow <i>·</i> 跨案例比较</div>
  <div class="tabs"><span class="tab">案例图谱</span><span class="tab">路径分析</span><span class="tab on">比较辅助</span></div>
  <div class="cases">比较对象　${chip("C19 Connect East Cleveland")}${chip("C20 普里什蒂纳")}${chip("Jaccard 0.270", "ok")}</div>
</div>

<div class="round">
  <div>
    <div class="rlabel"><span class="rno">1</span><span class="rtitle">识别差异</span><span class="rsub">共享概念定位 → 关系路径检索</span></div>
    <div class="q"><span class="av r">研</span><div class="bub">两案都使用生成式 AI 支持空间共创，参与成果进入实施的过程有什么不同？</div></div>
    <div class="q a"><span class="av a">AI</span><div class="bub"><ul>
      <li>C19 把参与产出组织为 <b>30 项场所营造行动</b>，逐项列明位置、牵头机构与实施时限${chip("R043–R047", "ok")}</li>
      <li>C20 形成 <b>3 份设计方案</b>，其中 2 份有启动实施记录，另有许可与采购信息${chip("R036–R039", "ok")}</li>
      <li>两案的共同点止于技术与参与表达；差异出现在<b>成果的组织形式</b></li>
    </ul></div></div>
  </div>
  <div class="side">
    <h4>检索到的关系路径</h4>
    <div class="row"><span class="dot" style="background:#4f77a0"></span><b>C19</b> 30 项行动 → 牵头机构 → 单笔资金 → 绿道／住宅</div>
    <div class="row"><span class="dot" style="background:#96606f"></span><b>C20</b> 3 份方案 → 启动实施 → RFQ → <span class="miss">（无中标记录）</span></div>
    <h4 style="margin-top:12px">证据片段</h4>
    <div class="e"><b>C19-M01-E22</b>　行动表逐项列出拟建位置、牵头/协作方与时限；土地银行是多数行动的主要牵头方。<em>PDF p.34–36</em></div>
    <div class="e"><b>C20-M04-E01</b>　RFQ 于 2023-09-27 发布，2023-10-24 截止；<span class="miss">公告未提供中标或合同信息</span>。<em>UNGM</em></div>
  </div>
</div>

<div class="round">
  <div>
    <div class="rlabel"><span class="rno">2</span><span class="rtitle">提出解释</span><span class="rsub">解释候选生成 → 证据缺口标注</span></div>
    <div class="q"><span class="av r">研</span><div class="bub">这些差异是否与行动任务的分解程度及责任主体有关？</div></div>
    <div class="q a"><span class="av a">AI</span><div class="bub"><ul>
      <li>候选解释：可实施性 ≈ <b>行动颗粒度 × 承接主体明确度</b>（H1）</li>
      <li>支持：C19 每项行动有主体${chip("R044–R046", "ok")}，后续有可对应的单笔资金${chip("R096")}${chip("R085–R086", "ok")}</li>
      <li>缺口：C20 的"方案—承建主体—建设结果"三段对应不完整${chip("待补证", "warn")}</li>
      <li>该解释目前为 <b>hypothesis</b>，未达 conclusion</li>
    </ul></div></div>
  </div>
  <div class="side">
    <h4>三环节对照</h4>
    <table class="cmp">
      <tr><th>环节</th><th>C19</th><th>C20</th></tr>
      <tr><td>成果形成</td><td class="ok">30 项行动 + 最终报告</td><td class="ok">3 份设计方案</td></tr>
      <tr><td>行动安排</td><td class="ok">逐项主体 + 时限</td><td class="warn">启动实施 + RFQ</td></tr>
      <tr><td>建设结果</td><td class="warn">部分建成（7 套 / 绿道）</td><td class="miss">对应关系未说明</td></tr>
    </table>
    <h4 style="margin-top:12px">证据片段</h4>
    <div class="e"><b>C20-M03-E03</b>　"1 个公园因 Parks Foundation 平台完成更新"评为 Fully achieved；<span class="miss">未说明是哪一处公园，也未说明是否属于两份批准设计</span>。<em>M03 p.27</em></div>
  </div>
</div>

<div class="round">
  <div>
    <div class="rlabel"><span class="rno">3</span><span class="rtitle">寻找替代解释</span><span class="rsub">竞争解释 → 反证与边界</span></div>
    <div class="q"><span class="av r">研</span><div class="bub">能否由此认定行动分解使 C19 更容易实施？是否还有其他影响条件？</div></div>
    <div class="q a"><span class="av a">AI</span><div class="bub"><ul>
      <li>A1 资金规模：C19 依托 1.22 亿美元再开发计划；C20 为 97 万欧元项目 + 27 万欧元后续${chip("待核", "warn")}</li>
      <li>A2 观察时间：C19 记录至 2026；C20 的 UTI 仅 1 年${chip("待核", "warn")}</li>
      <li>A3 开发权：土地银行具备收储与开发权，市府无${chip("待核", "warn")}</li>
      <li>反证：C19 规划 33–34 套，实际建成或翻新 <b>7 套</b>${chip("R082–R083")}，且存在授权争议${chip("R079", "no")}</li>
      <li>裁定建议：维持 hypothesis，不得归因于行动分解</li>
    </ul></div></div>
  </div>
  <div class="side">
    <h4>竞争解释清单</h4>
    <div class="row"><span class="dot" style="background:#b07b42"></span><b>A1</b> 资金规模　<span class="warn">→ 补两案单笔金额量级对比</span></div>
    <div class="row"><span class="dot" style="background:#b07b42"></span><b>A2</b> 观察时间　<span class="warn">→ 补 2025 年后市政公开记录</span></div>
    <div class="row"><span class="dot" style="background:#b07b42"></span><b>A3</b> 法定开发权　<span class="warn">→ 补承接主体权限对比</span></div>
    <div class="row"><span class="dot" style="background:#96606f"></span><b>A4</b> 报道偏差　<span class="miss">→ 最危险：不需推翻任何证据即可令全链降级</span></div>
    <h4 style="margin-top:12px">证据片段</h4>
    <div class="e"><b>C19-M26-E01</b>　Phase 1 首期投资 460 万美元，<b>建成或翻新 7 套住宅</b>，18 户居民平均获 1.8 万美元修缮资助。<em>NEOtrans 2026-07</em></div>
  </div>
</div>

<div class="note"><b>图 5-4</b>　CaseFlow 跨案例人机对谈界面及知识检索结果。三个回合依次为共同概念定位、关系路径检索与竞争解释追问，右侧关联对应的关系路径与证据片段。本图为依据现有探查内容整理的<b>示意稿</b>，正式图应替换为实际运行记录与截图。</div>
</div></body></html>`;

fs.writeFileSync(path.join(OUT, "fig5-4.html"), fig54, "utf8");
console.log("wrote fig5-4.html");

/* ================= 图 5-5 ================= */
const S5 = [
  { x: 24, label: "技术方案" },
  { x: 336, label: "业主决策" },
  { x: 648, label: "融资安排" },
  { x: 960, label: "工程实施" },
  { x: 1272, label: "结果" }
];

function strip(cells, y) {
  const out = [];
  cells.forEach((c, i) => {
    const x = S5[i].x;
    out.push(
      `<g><rect x="${x}" y="${y}" width="210" height="46" rx="5" fill="#fbfaf6" stroke="#e4ded0"/>
<text x="${x + 105}" y="${y + 21}" text-anchor="middle" font-size="13" font-weight="600" fill="#3a3a34">${esc(c.n)}</text>
<text x="${x + 105}" y="${y + 37}" text-anchor="middle" font-size="9" fill="#8b8477">${esc(c.t)}</text></g>`
    );
    if (i < cells.length - 1) {
      out.push(`<path d="M ${x + 216} ${y + 23} L ${x + 232} ${y + 23}" stroke="#c9c2b2" stroke-width="1.2" marker-end="url(#ahs)"/>`);
    }
  });
  return out.join("");
}

function stageBar(cfg, y) {
  return S5.map(
    (s, i) =>
      `<g><rect x="${s.x}" y="${y}" width="210" height="24" rx="12" fill="#f4f2ec" stroke="#ded8c9"/>
<text x="${s.x + 105}" y="${y + 16}" text-anchor="middle" font-size="11.5" fill="#6a6353" letter-spacing="1.2">${esc(s.label)}</text>
<text x="${s.x + 11}" y="${y + 16}" font-size="9" fill="#b6ab92">${String(i + 1).padStart(2, "0")}</text></g>`
  ).join("");
}

const C10 = {
  nodes: [
    { id: "diag", x: 24, y: 96, w: 210, h: 52, type: "action", label: "热成像诊断 22 栋", sub: "窗边/板缝/墙体热损失", ev: "C10-M05-E03" },
    { id: "plan", x: 24, y: 172, w: 210, h: 52, type: "technology", label: "综合更新方案", sub: "能源 + 数字 + 行为", ev: "C10-G02-Q02" },
    { id: "assoc", x: 336, y: 96, w: 210, h: 52, type: "actor", label: "业主协会大会", sub: "参与·贷款·设计·施工", ev: "C10-M16-E06" },
    { id: "join", x: 336, y: 172, w: 210, h: 52, type: "outcome", label: "22 个协会加入", sub: "全部进入设计（2017）", ev: "C10-G06-Q01" },
    { id: "proc", x: 336, y: 248, w: 210, h: 52, type: "task", label: "加入 ≠ 可施工", sub: "逐栋走完六道程序", ev: "C10-G08-Q02" },
    { id: "fund", x: 648, y: 96, w: 210, h: 52, type: "context", label: "H2020 + KredEx", sub: "地方支持 + 业主融资", ev: "C10-M16-E05" },
    { id: "sub", x: 648, y: 172, w: 210, h: 52, type: "outcome", label: "Turu 17 补助", sub: "320,851 欧元", ev: "C10-M08-E04" },
    { id: "first", x: 960, y: 96, w: 210, h: 52, type: "action", label: "Kalevi 10 首栋", sub: "2018-05 获施工补贴", ev: "C10-G09-Q01" },
    { id: "b17", x: 960, y: 172, w: 210, h: 52, type: "outcome", label: "17 栋 / 619 套", sub: "2020 夏主体完成", ev: "C10-G11-Q02" },
    { id: "b18", x: 1272, y: 88, w: 210, h: 52, type: "outcome", label: "18 栋 / 664 套", sub: "终期示范范围", ev: "C10-G14-Q01" },
    { id: "en", x: 1272, y: 160, w: 210, h: 52, type: "outcome", label: "能源使用 -37%", sub: "18 栋终期实测", ev: "C10-M25-E01" },
    { id: "smart", x: 1272, y: 232, w: 210, h: 52, type: "outcome", label: "smart-home 调试", sub: "改造后仍在继续", ev: "C10-G11-Q01", pending: true }
  ],
  edges: [
    { from: "diag", to: "plan", mode: "vert", pred: "诊断→方案", ev: "", lx: 52 },
    { from: "plan", to: "assoc", pred: "提交业主决策", ev: "", pw: 74 },
    { from: "assoc", to: "join", mode: "vert", pred: "多数表决", ev: "", lx: 40 },
    { from: "join", to: "b17", fy: 0.5, ty: 0.5, pred: "进入施工", ev: "", ly: -16, lift: 30 },
    { from: "b17", to: "b18", pred: "补入最后 1 栋", ev: "", ly: -14 },
    { from: "b18", to: "en", mode: "vert", pred: "建成后监测", ev: "", lx: 46 },
    { from: "b18", to: "smart", mode: "vert", pred: "设备调试未完", ev: "", lx: 52, pending: true }
  ]
};

const C11 = {
  nodes: [
    { id: "deep", x: 24, y: 96, w: 210, h: 52, type: "technology", label: "深度能源改造", sub: "外保温 + 供热系统", ev: "C11-G04-Q01" },
    { id: "dh", x: 24, y: 172, w: 210, h: 52, type: "target", label: "区域供热工程", sub: "地下管网 + 锅炉", ev: "C11-G04-Q01" },
    { id: "c3", x: 336, y: 96, w: 210, h: 52, type: "outcome", label: "108 共同体 / 1,305 套", sub: "2017-09 仅 3 个加入", ev: "C11-G07-Q02" },
    { id: "fee", x: 336, y: 172, w: 210, h: 52, type: "action", label: "收费改可选计费", sub: "并延长决策期限", ev: "C11-G10-Q01" },
    { id: "c144", x: 336, y: 248, w: 210, h: 52, type: "outcome", label: "144 共同体 / 1,873 套", sub: "范围扩大（2017-12）", ev: "C11-G11-Q01" },
    { id: "plan750", x: 648, y: 96, w: 210, h: 52, type: "context", label: "原计划 750 套", sub: "曾希望扩至 1,313 套", ev: "C11-G03-Q02" },
    { id: "c312", x: 960, y: 96, w: 210, h: 52, type: "outcome", label: "退出至 312 套", sub: "2019 部分住宅退出", ev: "C11-G13-Q01" },
    { id: "tender", x: 960, y: 172, w: 210, h: 52, type: "action", label: "供热首招失败", sub: "公共空间占用超限", ev: "C11-G14-Q01" },
    { id: "ret", x: 960, y: 248, w: 210, h: 52, type: "action", label: "2020 重新授标", sub: "调整实施方案后", ev: "C11-G15-Q01" },
    { id: "c302", x: 1272, y: 88, w: 210, h: 52, type: "outcome", label: "26 共同体 / 302 套", sub: "最终改造规模", ev: "C11-G16-Q01" },
    { id: "en", x: 1272, y: 160, w: 210, h: 52, type: "outcome", label: "热能 -50% · 能耗 -36%", sub: "CO₂ -54% · 账单 -15~20%", ev: "C11-G18-Q01" },
    { id: "dh435", x: 1272, y: 232, w: 210, h: 52, type: "outcome", label: "热网服务 435 套", sub: "含其他用户（2022-06）", ev: "C11-M20-E02" }
  ],
  edges: [
    { from: "deep", to: "dh", mode: "vert", pred: "配套", ev: "", lx: 30 },
    { from: "c3", to: "fee", mode: "vert", pred: "收费顾虑", ev: "", lx: 44 },
    { from: "fee", to: "c144", mode: "vert", pred: "调整后加入", ev: "", lx: 48 },
    { from: "c144", to: "c312", fy: 0.5, ty: 0.5, pred: "部分退出", ev: "", ly: 6, lift: -118 },
    { from: "c312", to: "c302", pred: "完成改造", ev: "", ly: -12 },
    { from: "tender", to: "ret", mode: "vert", pred: "重整后授标", ev: "", lx: 50 },
    { from: "c302", to: "en", mode: "vert", pred: "监测", ev: "", lx: 32 },
    { from: "c302", to: "dh435", mode: "vert", pred: "供热投运", ev: "", lx: 46 }
  ]
};

function panel55(cfg, y0) {
  const N = {};
  cfg.nodes.forEach((n) => (N[n.id] = n));
  const els = [];
  for (const e of cfg.edges) {
    const a = N[e.from];
    const b = N[e.to];
    let d;
    if (e.mode === "vert") d = pathVert(a, b);
    else d = pathFwd(a, b, e.lift);
    const color = e.pending ? "#a8763f" : "#5a6673";
    const dash = e.pending ? ' stroke-dasharray="6 5"' : "";
    els.push(`<path d="${d}" fill="none" stroke="${color}" stroke-width="1.15"${dash} marker-end="url(#${e.pending ? "ahd" : "ahs"})"/>`);
    if (e.pred) {
      let lx, ly;
      if (e.mode === "vert") {
        lx = a.x + a.w / 2 + (e.lx || 44);
        ly = (a.y + a.h + b.y) / 2;
      } else {
        lx = (a.x + a.w + b.x) / 2;
        ly = (ry(a, a.fy) + ry(b, b.ty)) / 2 + (e.ly || 0);
      }
      els.push(label(lx, ly, e.pred, e.ev, e.pending));
    }
  }
  cfg.nodes.forEach((n) => els.push(box5(n)));
  return `<g transform="translate(0,${y0})">${els.join("")}</g>`;
}

function box5(n) {
  const c = C[n.type] || C.target;
  const lines = n.label.split("\n");
  let y = n.y + 16;
  const t = lines
    .map((l) => {
      const s = `<text x="${n.x + n.w / 2}" y="${y}" text-anchor="middle" font-size="12" fill="${c.text}">${esc(l)}</text>`;
      y += 14;
      return s;
    })
    .join("");
  const dash = n.pending ? ' stroke-dasharray="5 3"' : "";
  return `<g><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.3"${dash}/>${t}
<text x="${n.x + n.w / 2}" y="${n.y + 36}" text-anchor="middle" font-size="9" fill="${c.stroke}">${esc(n.sub)}</text>
<text x="${n.x + n.w / 2}" y="${n.y + 47}" text-anchor="middle" font-size="8" fill="#a2988a" font-style="italic">${esc(n.ev)}</text></g>`;
}

function fig55() {
  const p1 = 96 + 300;
  const s1 = p1 + 10;
  const note1 = s1 + 66;
  const h2 = note1 + 46;
  const s2 = h2 + 96 + 300 + 10;
  const note2 = s2 + 66;
  const H = note2 + 40;
  return `<svg width="1520" height="${H}" viewBox="0 0 1520 ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}">
<defs><marker id="ahs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9 z" fill="#5a6673"/></marker>
<marker id="ahd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9 z" fill="#a8763f"/></marker></defs>
<text x="24" y="26" font-size="14.5" font-weight="600" fill="#2b2b2b">C10　Tartu SmartEnCity（2016–2022 · 私人产权 · 业主协会逐栋决策）</text>
<g transform="translate(0,34)">${stageBar(C10, 6)}${panel55(C10, 34)}</g>
${strip([{ n: "43 栋 / 1,779 套", t: "试点区总量" }, { n: "22 个协会", t: "正式加入（2017）" }, { n: "H2020 + KredEx", t: "地方支持 + 业主融资" }, { n: "17 栋", t: "2020 夏主体完成" }, { n: "18 栋 / 664 套", t: "终期示范范围" }], s1)}
<text x="24" y="${note1}" font-size="9.5" fill="#8b8477">注：参与协会数与竣工栋数不是同一统计口径，不宜直接相除作为"实施转化率"；2018 年另有 21 栋口径。</text>
<line x1="24" y1="${h2 - 12}" x2="1496" y2="${h2 - 12}" stroke="#e6e1d6"/>
<text x="24" y="${h2 + 22}" font-size="14.5" font-weight="600" fill="#2b2b2b">C11　Coronación SmartEnCity（2015–2023 · 私人产权 · 业主共同体表决 + 收费规则调整）</text>
<g transform="translate(0,${h2 + 30})">${stageBar(C11, 6)}${panel55(C11, 34)}</g>
${strip([{ n: "108 共同体 / 1,305 套", t: "初始纳入范围" }, { n: "3 → 144 共同体", t: "首轮加入 → 扩围" }, { n: "750 → 1,313 套", t: "原计划 → 期望上限" }, { n: "312 套", t: "2019 退出后" }, { n: "26 共同体 / 302 套", t: "最终竣工规模" }], s2)}
<text x="24" y="${note2}" font-size="9.5" fill="#8b8477">注："3 个共同体"为 2017-09 首轮口径；1,873 套为扩围后峰值；302 套为最终竣工。三个数字对应不同统计对象。</text>
</svg>`;
}

const h55 = `<!doctype html><html lang="zh"><head><meta charset="utf-8"/><style>html,body{margin:0;padding:0;background:#fff;}#wrap{width:1520px;}
.cap{font-family:${SERIF};font-size:12.5px;color:#333;padding:10px 26px 0 26px;line-height:1.7;}.cap b{font-family:${FONT};}</style></head>
<body><div id="wrap">${fig55()}
<div class="cap"><b>图 5-5</b>　Tartu 与 Coronación 住宅能源改造实施路径对照。五列为技术方案、业主决策、融资安排、工程实施与结果；节点为原生实体及其关键证据编号，底部色带为各阶段的实施规模。两案的差异集中在中段：<b>C10</b> 的约束是"加入 ≠ 可施工"，<b>C11</b> 的约束是收费规则与招标条件。虚线表示未完成或有争议的状态。</div>
</div></body></html>`;

fs.writeFileSync(path.join(OUT, "fig5-5.html"), h55, "utf8");
console.log("wrote fig5-5.html");

/* ================= 图 5-6 ================= */
const T0 = 2000, T1 = 2024;
const pct = (y) => ((y - T0) / (T1 - T0)) * 100;

const KIND = {
  build: { c: "#4f77a0", n: "建设 / 扩展" },
  org: { c: "#b07b42", n: "运营主体变化" },
  tech: { c: "#47875f", n: "技术调整" },
  cond: { c: "#75758a", n: "维护条件" },
  stat: { c: "#96606f", n: "可确认的服务状态" }
};

const ROWS_C12 = [
  ["试点与门户上线", 2000.4, 2001.6, "build", "Eastserve1 · eastserve.com"],
  ["分阶段入户 · 无线宽带", 2001.6, 2003.6, "build", ""],
  ["服务扩展与成熟", 2003.6, 2006.6, "build", "5,500 台设备 · 1,500 付费用户"],
  ["可持续性尝试", 2006.6, 2009.0, "cond", "治理转移"],
  ["Symera Eastserve Ltd", 2009.1, 2010.9, "org", "2010-11 进入清算"],
  ["CityServe (999) Ltd", 2010.8, 2013.7, "org", "2011-07 清算 · 2013-08 解散"],
  ["ITS 收购 · 36Mbps", 2014.0, 2016.6, "tech", "业务被收购，门户仍运营"],
  ["服务状态", 2017.0, 2023.6, "stat", "未确认", true]
];

const ROWS_C16 = [
  ["建设与本地应用", 2011.6, 2013.0, "build", "首节点 · 工作坊 · Tidepools"],
  ["Sandy 应急通信", 2012.78, 2012.96, "stat", "RHI 成为恢复据点"],
  ["Digital Stewards", 2013.0, 2015.4, "tech", "本地青年维护"],
  ["规模扩张", 2015.4, 2017.9, "build", "RISE:NYC · 峰值约 20 站点"],
  ["关键人员离开", 2016.0, 2017.4, "cond", "Smith 2016 · Schloss 2017"],
  ["移交 Sky Packets", 2019.0, 2019.9, "org", "月成本约 3,000 美元"],
  ["收缩", 2020.0, 2023.4, "stat", "约 10 个活跃站点"]
];

function rowHtml(r) {
  const [label, s, e, kind, note, dashed] = r;
  const left = pct(s);
  const w = Math.max(pct(e) - pct(s), 0.45);
  const end = left + w;
  const inside = end > 90;
  const noteHtml = note
    ? inside
      ? `<span class="note in ${dashed ? "onlight" : ""}" style="right:calc(${100 - end}% + 8px)">${esc(note)}</span>`
      : `<span class="note" style="left:calc(${end}% + 8px)">${esc(note)}</span>`
    : "";
  return `<div class="row"><div class="lab">${esc(label)}</div>
  <div class="track"><span class="bar ${dashed ? "dash" : ""}" style="left:${left}%;width:${w}%;background:${KIND[kind].c}"></span>
  ${noteHtml}</div></div>`;
}

function axis() {
  let ticks = "";
  for (let y = 2000; y <= 2024; y += 2) {
    ticks += `<span class="tick" style="left:${pct(y)}%">${y}</span>`;
  }
  return `<div class="axis"><div class="lab"></div><div class="track">${ticks}</div></div>`;
}

function grid() {
  let g = "";
  for (let y = 2000; y <= 2024; y += 2) g += `<span class="gl" style="left:${pct(y)}%"></span>`;
  return `<div class="grid">${g}</div>`;
}

const h56 = `<!doctype html><html lang="zh"><head><meta charset="utf-8"/><style>
*{box-sizing:border-box;} html,body{margin:0;padding:0;background:#fff;font-family:${FONT};color:#23262b;}
#wrap{width:1520px;padding:20px 26px 8px 26px;}
.hd{display:flex;align-items:baseline;gap:12px;margin:4px 0 8px 0;}
.hd b{font-size:14.5px;font-weight:600;}
.hd span{font-size:10.5px;color:#8b8477;}
.chart{position:relative;margin:0 0 6px 0;}
.axis,.row{display:flex;align-items:center;height:34px;}
.axis .lab{width:176px;}
.track{position:relative;flex:1;height:100%;}
.tick{position:absolute;top:6px;transform:translateX(-50%);font-size:9.5px;color:#9b9486;}
.row{border-bottom:1px solid #f4f1e9;}
.lab{width:176px;font-size:11px;color:#4a4d53;padding-right:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.bar{position:absolute;top:9px;height:15px;border-radius:3px;opacity:.92;}
.bar.dash{background:transparent !important;border:1.4px dashed #96606f;}
.note{position:absolute;top:8px;font-size:9.5px;color:#7b7466;white-space:nowrap;}
.note.in{color:#ffffff;opacity:.95;}
.note.in.onlight{color:#96606f;opacity:1;}
.grid{position:absolute;top:0;bottom:0;left:176px;right:0;pointer-events:none;}
.gl{position:absolute;top:0;bottom:0;width:1px;background:#f0ece2;}
.lg{display:flex;gap:16px;align-items:center;padding:12px 0 0 176px;}
.lg i{width:14px;height:9px;border-radius:2px;display:inline-block;margin-right:5px;vertical-align:middle;}
.lg span{font-size:10px;color:#6f6858;}
.cap{font-family:${SERIF};font-size:12.5px;color:#333;padding:12px 0 0 0;line-height:1.7;}
.cap b{font-family:${FONT};}
.sep{height:1px;background:#e6e1d6;margin:14px 0 10px 0;}
</style></head><body><div id="wrap">

<div class="hd"><b>C12　Eastserve（东曼彻斯特，2000–2017）</b><span>社区宽带与数字接入服务 · 关键证据：M19-E01、M23-E01、M20-E01</span></div>
<div class="chart">${axis()}${grid()}${ROWS_C12.map(rowHtml).join("")}</div>

<div class="sep"></div>

<div class="hd"><b>C16　Red Hook WiFi（布鲁克林红钩，2011–2023）</b><span>社区 mesh 网络与本地信息服务 · 关键证据：M15-E09、M15-E10、M15-E12</span></div>
<div class="chart">${axis()}${grid()}${ROWS_C16.map(rowHtml).join("")}</div>

<div class="lg">
  ${Object.values(KIND).map((k) => `<span><i style="background:${k.c}"></i>${k.n}</span>`).join("")}
  <span><i style="background:transparent;border:1.4px dashed #96606f"></i>未确认 / 待补证</span>
</div>

<div class="cap"><b>图 5-6</b>　Eastserve 与 Red Hook WiFi 运营主体变化和服务运行过程对照。横轴为时间，纵向按"建设—主体—技术—条件—状态"分层；色块长度表示该状态持续区间。<b>C12</b> 的壳公司清算与业务收购并存，服务是否延续无法从现有材料确认，故以虚线表示；<b>C16</b> 在移交后仍保有月成本、站点数与人员变动记录，收缩可量化。两案时间尺度不同，未做跨案对齐。</div>
</div></body></html>`;

fs.writeFileSync(path.join(OUT, "fig5-6.html"), h56, "utf8");
console.log("wrote fig5-6.html");

/* ================= 图 5-7 ================= */
const STEPS = [
  {
    no: "01",
    name: "更新问题识别",
    prob: "社区问题与空间状况\n难以识别",
    tech: ["数据采集", "环境监测 · 空间分析"],
    cond: "数据能否转化为\n具体更新任务",
    cases: "C13 · C04 · C09"
  },
  {
    no: "02",
    name: "技术能力与任务匹配",
    prob: "居民需求与空间设想\n难以充分表达",
    tech: ["数字参与 · 交互可视化", "生成式 AI"],
    cond: "意见如何进入规划方案\n与正式决策",
    cases: "C19 · C20 · C02 · C03"
  },
  {
    no: "03",
    name: "实施条件判断",
    prob: "技术方案难以\n进入实际实施",
    tech: ["建筑诊断 · 设计辅助", "项目管理"],
    cond: "产权决策 · 责任主体\n资金与施工条件",
    cases: "C10 · C11 · C14"
  },
  {
    no: "04",
    name: "行动组织",
    prob: "参与成果缺少\n可承接的行动安排",
    tech: ["行动清单 · 工单流转", "多方协同"],
    cond: "任务颗粒度 · 牵头主体\n程序衔接",
    cases: "C19 · C15 · C04"
  },
  {
    no: "05",
    name: "持续评价",
    prob: "数字服务能否持续\n效果如何评价",
    tech: ["运行监测 · 数据记录", "指标分析"],
    cond: "运营主体 · 维护资源\n评价对象与证据来源",
    cases: "C12 · C16 · C17"
  }
];

const CX = [24, 322, 620, 918, 1216];
const CW = 246;

function card(s, x, y) {
  const h = 236;
  const lines = (t, x0, y0, size, fill, lh) =>
    t
      .split("\n")
      .map((l, i) => `<text x="${x0}" y="${y0 + i * lh}" font-size="${size}" fill="${fill}">${esc(l)}</text>`)
      .join("");
  return `<g>
  <rect x="${x}" y="${y}" width="${CW}" height="${h}" rx="9" fill="#ffffff" stroke="#d9d3c4" stroke-width="1.3"/>
  <path d="M ${x} ${y + 9} a 9 9 0 0 1 9 -9 h ${CW - 18} a 9 9 0 0 1 9 9 v 25 h -${CW} z" fill="#eef3f9"/>
  <text x="${x + 13}" y="${y + 24}" font-size="10.5" font-weight="600" fill="#4f77a0">${s.no}</text>
  <text x="${x + 38}" y="${y + 24}" font-size="13" font-weight="600" fill="#243447">${esc(s.name)}</text>

  <text x="${x + 13}" y="${y + 52}" font-size="8.5" fill="#a2988a" letter-spacing="0.6">典型问题</text>
  ${lines(s.prob, x + 13, y + 70, 11, "#3a3d42", 15)}

  <rect x="${x + 13}" y="${y + 96}" width="${CW - 26}" height="52" rx="5" fill="#f0f7f2"/>
  <text x="${x + 21}" y="${y + 111}" font-size="8.5" fill="#5d8a70" letter-spacing="0.6">技术可支持</text>
  ${s.tech.map((t, i) => `<text x="${x + 21}" y="${y + 127 + i * 14}" font-size="10.5" fill="#2f5a41">${esc(t)}</text>`).join("")}

  <rect x="${x + 13}" y="${y + 156}" width="${CW - 26}" height="52" rx="5" fill="#fdf5ea"/>
  <text x="${x + 21}" y="${y + 171}" font-size="8.5" fill="#a8763f" letter-spacing="0.6">需进一步判断</text>
  ${lines(s.cond, x + 21, y + 187, 10.5, "#6e4a1c", 14)}

  <text x="${x + 13}" y="${y + 224}" font-size="8.5" fill="#b3a992">案例 ${esc(s.cases)}</text>
  </g>`;
}

function fig57() {
  const y0 = 76;
  const ch = 236;
  const lineY = y0 + ch + 30;
  const bandY = lineY + 20;
  const H = bandY + 90;
  const arrows = CX.slice(0, -1)
    .map(
      (x, i) =>
        `<path d="M ${x + CW + 8} ${y0 + 44} L ${CX[i + 1] - 8} ${y0 + 44}" stroke="#b9b1a0" stroke-width="1.4" marker-end="url(#ahs)"/>`
    )
    .join("");

  const fbIn = `<path d="M ${CX[4] + CW / 2} ${y0 + ch + 4} L ${CX[4] + CW / 2} ${lineY}" stroke="#8b8477" stroke-width="1.3" stroke-dasharray="6 5"/>`;
  const fbLine = `<path d="M ${CX[4] + CW / 2} ${lineY} L ${CX[0] + CW / 2} ${lineY}" stroke="#8b8477" stroke-width="1.3" stroke-dasharray="6 5"/>`;
  const fbUp = `<path d="M ${CX[0] + CW / 2} ${lineY} L ${CX[0] + CW / 2} ${y0 + ch + 6}" stroke="#8b8477" stroke-width="1.3" stroke-dasharray="6 5" marker-end="url(#ahg)"/>`;
  const fbBranch = `<path d="M ${CX[2] + CW / 2} ${lineY} L ${CX[2] + CW / 2} ${y0 + ch + 6}" stroke="#c3a06a" stroke-width="1.2" stroke-dasharray="4 4" marker-end="url(#ahd)"/>`;

  return `<svg width="1520" height="${H}" viewBox="0 0 1520 ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${FONT}">
<defs>
<marker id="ahs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9 z" fill="#b9b1a0"/></marker>
<marker id="ahg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9 z" fill="#8b8477"/></marker>
<marker id="ahd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9 z" fill="#c3a06a"/></marker>
</defs>

<text x="24" y="30" font-size="13.5" font-weight="600" fill="#2b2b2b">面向社区更新任务的数智技术应用判断框架</text>
<text x="24" y="52" font-size="10" fill="#8b8477">判断按更新任务与实施阶段推进；同一技术可服务多个环节，不是线性流程。</text>

${STEPS.map((s, i) => card(s, CX[i], y0)).join("")}
${arrows}

<rect x="${CX[0]}" y="${bandY}" width="${CX[4] + CW - CX[0]}" height="54" rx="7" fill="#f7f5ef" stroke="#e2dccd"/>
<text x="${CX[0] + 16}" y="${bandY + 22}" font-size="10.5" font-weight="600" fill="#6b6455">运行反馈</text>
<text x="${CX[0] + 76}" y="${bandY + 22}" font-size="9.5" fill="#7b7466">服务覆盖 · 实际使用 · 运行变化 · 主体更替　→　修正任务识别与实施条件判断</text>
<text x="${CX[0] + 16}" y="${bandY + 41}" font-size="9" fill="#a2988a">反馈不改变技术本身，改变的是"下一步判断什么"；未记录的服务状态本身也是需要回填的证据缺口。</text>
${fbIn}${fbLine}${fbUp}${fbBranch}

<text x="${CX[2] + CW / 2 + 9}" y="${lineY - 7}" font-size="8.5" fill="#b08a52">回写条件判断</text>
<text x="${CX[0] + CW / 2 + 9}" y="${lineY - 7}" font-size="8.5" fill="#8b8477">回到任务识别</text>
<text x="24" y="${H - 16}" font-size="9" fill="#a2988a">注：框架给出的是判断顺序而非技术选型清单；案例标签表示该环节的主要证据来源。</text>
</svg>`;
}

const h57 = `<!doctype html><html lang="zh"><head><meta charset="utf-8"/><style>html,body{margin:0;padding:0;background:#fff;}#wrap{width:1520px;}
.cap{font-family:${SERIF};font-size:12.5px;color:#333;padding:12px 26px 0 26px;line-height:1.7;}.cap b{font-family:${FONT};}</style></head>
<body><div id="wrap">${fig57()}
<div class="cap"><b>图 5-7</b>　面向社区更新的数智技术应用判断框架。五个环节依次为更新问题识别、技术能力与任务匹配、实施条件判断、行动组织与持续评价；每一环节标注典型问题、技术可提供的支持、仍需判断的实施条件，以及支撑该环节的主要案例。底部为运行反馈：服务覆盖、实际使用、运行变化与主体更替回流至任务识别，并对实施条件判断形成修正。</div>
</div></body></html>`;

fs.writeFileSync(path.join(OUT, "fig5-7.html"), h57, "utf8");
console.log("wrote fig5-7.html");
