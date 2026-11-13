import sqlite3, json, csv, os
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

DB = "data/community-renewal.db"
OUT = "data/caseflow/exports"
os.makedirs(OUT, exist_ok=True)

CONF = {"accepted","approved","confirmed","frozen","researcher_confirmed"}
def norm(v): return str(v or "").strip().lower().replace(" ","_").replace("-","_")

con = sqlite3.connect(DB)
con.row_factory = sqlite3.Row
cases = con.execute("select id, code, name from cases order by idx").fetchall()
ids = {c["id"] for c in cases}

sc = {r["id"]: dict(r) for r in con.execute("select id,label,entity_type,scope,review,supporting_case_ids from shared_concepts")}
S = [x for x in sc.values() if norm(x["review"]) in CONF and any(c in ids for c in json.loads(x["supporting_case_ids"] or "[]"))]
M = [dict(r) for r in con.execute("select case_id,shared_concept_id,decision,mapping_type,native_concept_id from concept_mappings where shared_concept_id is not null")
     if r["case_id"] in ids and norm(r["decision"]) in CONF]

prof = {c["id"]: {} for c in cases}   # case -> {concept: source}
for s in S:
    for c in json.loads(s["supporting_case_ids"] or "[]"):
        if c in prof: prof[c][s["id"]] = prof[c].get(s["id"], set()) | {"S"}
for m in M:
    d = prof[m["case_id"]]
    d[m["shared_concept_id"]] = d.get(m["shared_concept_id"], set()) | {"M"}

allc = sorted({k for d in prof.values() for k in d})
print("concepts:", len(allc), "pairs:", sum(len(d) for d in prof.values()))

rows = []
for c in cases:
    for cid in sorted(prof[c["id"]]):
        src = prof[c["id"]][cid]
        rows.append([c["code"], cid, sc[cid]["label"], sc[cid]["entity_type"] or "未分类",
                     "S+M" if src == {"S","M"} else ("S 概念支持案例" if src == {"S"} else "M 已确认映射")])

# ---------- CSV ----------
with open(os.path.join(OUT, "concept_pairs_20cases_60concepts.csv"), "w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(["案例编号","概念ID","概念名称","实体类别","来源"]); w.writerows(rows)

with open(os.path.join(OUT, "concept_matrix_20x60.csv"), "w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(["案例编号"] + allc)
    for c in cases:
        w.writerow([c["code"]] + [1 if cid in prof[c["id"]] else 0 for cid in allc])

# ---------- XLSX ----------
wb = Workbook()
HEAD = PatternFill("solid", fgColor="EEF3F9")
thin = Side(style="thin", color="DDD8CB")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)

def style_header(ws, row=1, width=None):
    for cell in ws[row]:
        cell.font = Font(bold=True, size=10, color="243447")
        cell.fill = HEAD
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = BORDER
    ws.freeze_panes = ws.cell(row=row+1, column=1)
    if width:
        for i, wd in enumerate(width, start=1):
            ws.column_dimensions[get_column_letter(i)].width = wd

ws = wb.active; ws.title = "明细"
ws.append(["案例编号","概念ID","概念名称","实体类别","来源"])
for r in rows: ws.append(r)
style_header(ws, width=[10, 18, 30, 11, 18])
for row in ws.iter_rows(min_row=2):
    for cell in row:
        cell.font = Font(size=10); cell.border = BORDER

ws2 = wb.create_sheet("矩阵")
ws2.append(["案例编号"] + allc)
for c in cases: ws2.append([c["code"]] + [1 if cid in prof[c["id"]] else 0 for cid in allc])
style_header(ws2)
ws2.column_dimensions["A"].width = 10
for i in range(2, len(allc)+2): ws2.column_dimensions[get_column_letter(i)].width = 4.2
for row in ws2.iter_rows(min_row=2, min_col=1, max_col=1):
    for cell in row: cell.font = Font(bold=True, size=10)

ws3 = wb.create_sheet("概念清单")
ws3.append(["概念ID","概念名称","实体类别","覆盖案例数","覆盖案例","review","是否在S"])
for cid in allc:
    cs = [c["code"] for c in cases if cid in prof[c["id"]]]
    ws3.append([cid, sc[cid]["label"], sc[cid]["entity_type"] or "未分类", len(cs), "、".join(cs), sc[cid]["review"], "是" if cid in {s["id"] for s in S} else "否"])
style_header(ws3, width=[18, 30, 11, 10, 46, 26, 8])
for row in ws3.iter_rows(min_row=2):
    for cell in row: cell.font = Font(size=10); cell.border = BORDER

ws4 = wb.create_sheet("口径说明")
lines = [
 ["项","值/说明"],
 ["数据源","dashboard/data/community-renewal.db（dataset=caseflow-c01-c20，20 案）"],
 ["生成脚本","dashboard/data/caseflow/figs/export_concepts.py"],
 ["图 5.1 口径","按 dashboard/src/lib/compare.ts 的 buildProfiles() 复现"],
 ["已确认状态集合","accepted / approved / confirmed / frozen / researcher_confirmed"],
 ["S 集合","shared_concepts.review 属已确认，且 supporting_case_ids 含本库案例 → 47 个"],
 ["M 集合","concept_mappings.decision 属已确认 → 598 条"],
 ["合并方式","案例画像 = S 中该案 support 的概念 ∪ M 中该案的映射概念"],
 ["结果","60 个共享概念，合计 %d 个（案例,概念）对" % len(rows)],
 ["概念类别分布","按 shared_concepts.entity_type 统计，见“概念清单”"],
 ["与 44 的差异","44 = SC-C01-* 通用本体（我在比较简布里算 Jaccard 用的子集），不是图 5.1 口径"],
 ["与 90 的差异","90 = 全部映射（含 accepted_partial / candidate_created 等未确认决定）去重后的概念数"],
 ["注意","图表按“已确认”过滤，因此 C13、C14 在图上的概念数会显著低于其原生概念数"],
]
for r in lines: ws4.append(r)
style_header(ws4, width=[18, 96])
for row in ws4.iter_rows(min_row=2):
    row[0].font = Font(bold=True, size=10); row[0].border = BORDER
    row[1].font = Font(size=10); row[1].border = BORDER
    row[1].alignment = Alignment(wrap_text=True, vertical="top")

ws5 = wb.create_sheet("案例计数")
types = ["action","technology","capability","task","target","outcome","context","actor"]
ws5.append(["案例编号","案例名称","共享概念数"] + types)
for c in cases:
    m = prof[c["id"]]
    ws5.append([c["code"], c["name"], len(m)] +
               [sum(1 for k in m if (sc[k]["entity_type"] or "未分类") == t) for t in types])
style_header(ws5, width=[10, 40, 11] + [8]*len(types))
for row in ws5.iter_rows(min_row=2):
    for cell in row:
        cell.font = Font(size=10); cell.border = BORDER

path = os.path.join(OUT, "concept_pairs_20cases_60concepts.xlsx")
wb.save(path)
print("saved", path, os.path.getsize(path))
