#!/usr/bin/env python3
"""Parse the CaseFlow C01-C11 workbook into deterministic JSON."""
from __future__ import annotations

import json
import re
import sys
from collections import OrderedDict
from datetime import datetime, timezone
from pathlib import Path

import openpyxl

CASE_META = {
    "C01": ("Arabianranta", "芬兰", "赫尔辛基", "1990年代—2012", "1990年代—2012年", "#6d8b74", "network"),
    "C02": ("Havukoski", "芬兰", "万塔", "2020—2026", "2020—2026年", "#7d8ca3", "steps"),
    "C03": ("Slaithwaite", "英国", "Slaithwaite", "1998", "1998年前后", "#8b7b68", "lines"),
    "C04": ("田林十二村", "中国", "上海", "2015—2016", "2015—2016年", "#6f858b", "lattice"),
    "C05": ("复元坊", "中国", "上海", "2015—2016", "2015—2016年", "#817a8d", "cells"),
    "C06": ("Damp Busters", "英国", "布里斯托尔", "2015", "2015年前后", "#9a735d", "tree"),
    "C07": ("Carpenters Estate", "英国", "伦敦", "2001—2002", "2001—2002年", "#6f7b86", "rings"),
    "C08": ("Bukchon", "韩国", "首尔", "2015年前后", "2015年前后", "#7b8465", "star"),
    "C09": ("长虹路", "中国", "南京", "2020", "2020年前后", "#6c8378", "stripes"),
    "C10": ("Tartu SmartEnCity", "爱沙尼亚", "塔尔图", "1950年代—2015", "1950年代—2015年前后", "#78838f", "lattice"),
    "C11": ("Coronación", "西班牙", "Vitoria-Gasteiz", "2011—2015", "2011—2015年前后", "#8f6f64", "cells"),
}
MATERIAL_KINDS = "政府文件 机构材料 项目报告 学术论文 项目网站 机构网站 新闻报道 研究论文 政策文件 规划文件 统计资料 访谈记录 项目材料 会议材料 其他 网站页面".split()


def text(value) -> str:
    return "" if value is None else str(value).replace("\x00", "").strip()


def split_ids(value) -> list[str]:
    raw = text(value)
    return [part.strip() for part in re.split(r"[;；,，、\n]+", raw) if part.strip()]


def read_sheet(workbook, name: str) -> list[dict]:
    rows = workbook[name].iter_rows(values_only=True)
    header = [text(cell) for cell in next(rows)]
    result = []
    for row in rows:
        item = {key: text(value) for key, value in zip(header, row) if key}
        if any(item.values()):
            result.append(item)
    return result


def sentence_ids_to_paragraph_ids(ids: list[str]) -> list[str]:
    result = []
    for value in ids:
        match = re.match(r"(C\d+-P\d+)", value.strip())
        if match and match.group(1) not in result:
            result.append(match.group(1))
    return result


def first_sentences(value: str, count: int = 2, limit: int = 300) -> str:
    value = re.sub(r"\s+", " ", value).strip()
    if not value:
        return ""
    return "".join(re.split(r"(?<=[。！？!?])", value)[:count]).strip()[:limit]


def parse_material_record(raw: str, fallback_title: str) -> dict:
    author, date, kind = "", "", ""
    tail = raw.split("发布主体：", 1)[1] if "发布主体：" in raw else raw
    match = re.search(r"((?:19|20)\d{2}(?:\s*[–\-—]\s*(?:\d{2,4}|(?:19|20)\d{2}))?)\s+([^\s]+)\s+", tail)
    if match:
        date, kind = match.group(1).strip(), match.group(2).strip()
        author = tail[: match.start()].strip()
    else:
        year = re.search(r"((?:19|20)\d{2})", tail)
        date = year.group(1) if year else ""
        kind = "材料"
    if not author:
        author = fallback_title or "待补"
    if kind not in MATERIAL_KINDS:
        kind = next((candidate for candidate in MATERIAL_KINDS if candidate in tail), "材料")
    return {"author": author, "date": date or "待补", "kind": kind}


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: parse_caseflow.py <workbook.xlsx> [output.json]")
        return 2
    source = Path(sys.argv[1]).resolve()
    output = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else Path(__file__).resolve().parents[1] / "data" / "caseflow" / "c01-c11.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    wb = openpyxl.load_workbook(source, read_only=True, data_only=True)
    overview = OrderedDict((r["case_id"], r) for r in read_sheet(wb, "逐案概览"))
    paragraphs = read_sheet(wb, "重构全文按段")
    relations = read_sheet(wb, "三元组与追溯")
    negotiated = read_sheet(wb, "专家协商关系")
    fact_groups = read_sheet(wb, "专家事实组")
    fact_sentences = read_sheet(wb, "事实组证据句")
    frozen_sentences = read_sheet(wb, "冻结重构句")
    materials = read_sheet(wb, "原材料列表")
    material_evidence = read_sheet(wb, "MxxExx证据")
    trace_index = read_sheet(wb, "关系证据索引")
    review_relations = read_sheet(wb, "需复核关系")
    status_ledger = read_sheet(wb, "状态补全台账")
    negotiated_by_id = {r["relation_id"]: r for r in negotiated}
    review_by_id = {r["relation_id"]: r for r in review_relations}

    q_trace = {}
    for row in trace_index:
        if row.get("mapping_level", "").startswith("事实组证据句"):
            q_trace.setdefault(row["source_id"], []).append({
                "frozenSentenceId": row.get("target_id", ""),
                "status": row.get("status", ""),
                "details": row.get("details", ""),
            })

    sentences_by_group = {}
    for row in fact_sentences:
        sentences_by_group.setdefault(row["fact_group_id"], []).append({
            "id": row["evidence_sentence_id"],
            "text": row["evidence_sentence_text"],
            "source": row.get("source", ""),
        })

    paragraphs_by_case, frozen_by_case = {}, {}
    for row in paragraphs:
        paragraphs_by_case.setdefault(row["case_id"], []).append({
            "id": row["paragraph_id"], "title": row["段落标题"],
            "text": row["段落正文"], "version": row.get("资料版本", ""),
        })
    for row in frozen_sentences:
        frozen_by_case.setdefault(row["case_id"], []).append({
            "id": row["sentence_id"], "paragraphId": row["paragraph_id"],
            "text": row["sentence_text"], "title": row.get("paragraph_title", ""),
            "source": row.get("source", ""),
        })

    material_rows, evidence_rows = {}, {}
    for row in materials:
        parsed = parse_material_record(row.get("raw_material_record", ""), row.get("title_text", ""))
        material_rows.setdefault(row["case_id"], []).append({
            "id": row["material_id"], "title": row["title_text"],
            "originalUrl": row.get("original_url", ""), "rawRecord": row.get("raw_material_record", ""),
            "sourceVersion": row.get("source_version", ""), "verification": row.get("url_verification", ""),
            **parsed,
        })
    for row in material_evidence:
        evidence_rows.setdefault(row["case_id"], []).append({
            "id": row["evidence_id"], "materialId": row["material_id"],
            "record": row["evidence_record"], "sourceVersion": row.get("source_version", ""),
        })

    fact_groups_by_case = {}
    for row in fact_groups:
        fact_groups_by_case.setdefault(row["case_id"], []).append({
            "id": row["fact_group_id"], "evidenceText": row["frozen_fact_group_evidence"],
            "sourceDocument": row.get("source_document", ""), "status": row.get("status", ""),
            "referenceStatus": row.get("reference_status", ""), "adjudication": row.get("adjudication_decision", ""),
            "mappingStatus": row.get("mapping_status", ""),
            "exactFrozenSentenceIds": split_ids(row.get("exact_frozen_sentence_ids", "")),
            "candidateFrozenSentenceIds": split_ids(row.get("candidate_frozen_sentence_ids", "")),
            "evidenceSentenceIds": split_ids(row.get("fact_group_evidence_sentences", "")),
            "sentences": sentences_by_group.get(row["fact_group_id"], []),
        })

    relation_rows = {}
    for row in relations:
        relation_id = row["relation_id"]
        negotiated_row = negotiated_by_id.get(relation_id, {})
        review_row = review_by_id.get(relation_id, {})
        evidence_ids = split_ids(row.get("expert_evidence_quote_sentence_ids", "") or negotiated_row.get("frozen_evidence_sentence_ids", ""))
        verified_ids = split_ids(row.get("verbatim_frozen_sentence_ids", "") or negotiated_row.get("verified_frozen_sentence_ids", ""))
        process_ids = []
        for candidate in split_ids(row.get("frozen_process_paragraph_ids", "")) + split_ids(negotiated_row.get("source_paragraph_ids", "")) + sentence_ids_to_paragraph_ids(verified_ids):
            if candidate.startswith(f"{row['case_id']}-P") and candidate not in process_ids:
                process_ids.append(candidate)
        for qid in evidence_ids:
            for trace in q_trace.get(qid, []):
                if trace["status"] == "逐字定位":
                    for pid in sentence_ids_to_paragraph_ids([trace["frozenSentenceId"]]):
                        if pid not in process_ids:
                            process_ids.append(pid)
        relation_rows.setdefault(row["case_id"], []).append({
            "id": relation_id, "factGroupId": row.get("fact_group_id", ""),
            "subject": row["subject"], "subjectType": row["subject_type"], "predicate": row["predicate"],
            "object": row["object"], "objectType": row["object_type"],
            "statusTimeScope": row.get("status_time_scope", "") or negotiated_row.get("time_status_scope", ""),
            "statusCode": row.get("status_code", ""), "statusTime": row.get("status_time", ""),
            "statusScope": row.get("status_scope", ""), "statusNote": row.get("status_note", ""),
            "statusBasis": row.get("status_time_scope_basis", ""), "expertQuote": row.get("expert_evidence_quote", ""),
            "evidenceSentenceIds": evidence_ids, "verifiedFrozenSentenceIds": verified_ids,
            "candidateFrozenSentenceIds": split_ids(row.get("candidate_frozen_sentence_ids", "")),
            "processIds": process_ids,
            "mappingStatus": row.get("mapping_status", "") or negotiated_row.get("trace_status_frozen", ""),
            "sourceExpertDocument": row.get("source_expert_document", "") or negotiated_row.get("source_expert_document", ""),
            "adjudication": negotiated_row.get("expert_adjudication", ""),
            "traceStatus": negotiated_row.get("trace_status_frozen", ""),
            "frozenProcessSourceFile": negotiated_row.get("frozen_process_source_file", ""),
            "reviewIssue": review_row.get("issue", ""), "reviewStatus": review_row.get("status", ""),
        })

    cases = []
    for case_id, overview_row in overview.items():
        name_en, country, city, year, period, accent, cover = CASE_META.get(
            case_id, (overview_row["case_name"], "待补", "待补", "待补", "待补", "#6f858b", "cells")
        )
        case_paragraphs = sorted(paragraphs_by_case.get(case_id, []), key=lambda item: item["id"])
        cases.append({
            "id": case_id, "code": case_id, "name": overview_row["case_name"], "nameEn": name_en,
            "country": country, "city": city, "year": year, "period": period,
            "accent": accent, "cover": cover,
            "tags": ["社区更新", "CaseFlow", country], "summary": first_sentences(case_paragraphs[0]["text"], 2, 280) if case_paragraphs else "",
            "overview": overview_row, "paragraphs": case_paragraphs,
            "frozenSentences": sorted(frozen_by_case.get(case_id, []), key=lambda item: item["id"]),
            "materials": sorted(material_rows.get(case_id, []), key=lambda item: item["id"]),
            "materialEvidence": sorted(evidence_rows.get(case_id, []), key=lambda item: item["id"]),
            "factGroups": sorted(fact_groups_by_case.get(case_id, []), key=lambda item: item["id"]),
            "relations": sorted(relation_rows.get(case_id, []), key=lambda item: item["id"]),
        })

    payload = {
        "dataset": "caseflow-c01-c11", "sourceFile": str(source),
        "sourceVersion": "2026-11-13 状态补全版",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sheetCounts": {
            "cases": len(cases), "paragraphs": len(paragraphs), "relations": len(relations),
            "negotiatedRelations": len(negotiated), "factGroups": len(fact_groups),
            "factSentences": len(fact_sentences), "frozenSentences": len(frozen_sentences),
            "materials": len(materials), "materialEvidence": len(material_evidence),
            "traceIndex": len(trace_index), "reviewRelations": len(review_relations),
            "statusLedger": len(status_ledger),
        },
        "qTrace": q_trace, "cases": cases,
    }
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"output": str(output), **payload["sheetCounts"], "bytes": output.stat().st_size}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
