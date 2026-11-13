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
