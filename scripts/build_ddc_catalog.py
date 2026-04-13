from __future__ import annotations

import json
import re
from dataclasses import dataclass, asdict
from pathlib import Path

from pypdf import PdfReader

PROJECT_ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = Path(r"C:\Users\nanda kumar\Downloads\DDC-Directory services-01.pdf")
OUTPUT_PATH = PROJECT_ROOT / "src" / "data" / "ddc-tests.json"

NOISE_LINES = [
    "Sl.No Test CODE Investigation Department Methodology Sample Temp. Schedule Reported B2B MRP",
    "Directory of services",
    "DARITHRI DIAGNOSTIC CENTRE",
    "Version: 01 Issue Date:10/03/2025",
]

DEPARTMENTS = [
    "Immunohaematology",
    "Clinical pathology",
    "Clinical pathlogy",
    "Haematology",
    "Biochemistry",
    "Immunology",
    "Serology",
    "Cytology",
    "cytology",
]

SAMPLE_KEYWORDS = [
    "WB-EDTA",
    "Whole Blood",
    "Serum",
    "Plasma",
    "Urine",
    "CSF",
    "Amniotic Fluid",
    "Body Fluid",
    "Pleural Fluid",
    "Sputum",
    "Stool",
    "Any Fluid",
]


@dataclass
class TestRecord:
    id: str
    serial: int
    code: str
    name: str
    category: str
    department: str
    methodology: str
    sampleType: str
    storageTemp: str
    schedule: str
    tat: str
    b2bPrice: int
    mrpPrice: int


def normalize_text(value: str) -> str:
    value = value.replace("Â", " ").replace("â€“", "-").replace("â€”", "-")
    value = re.sub(r"(?<=[a-z\)])(?=[A-Z])", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip(" -")


def parse_rows(raw_text: str) -> list[TestRecord]:
    rows: list[TestRecord] = []
    pattern = re.compile(r"(\d+)\s+([A-Z]{3,}\d{3})\s+(.*?)(?=(?:\s+\d+\s+[A-Z]{3,}\d{3}\s+)|$)")

    for match in pattern.finditer(raw_text):
        serial = int(match.group(1))
        code = match.group(2)
        if not re.fullmatch(r"DDC\d{3}", code):
            continue

        body = normalize_text(match.group(3))

        price_match = re.search(r"(\d+)\s+(\d+)\s*$", body)
        if not price_match:
            continue

        b2b_price = int(price_match.group(1))
        mrp_price = int(price_match.group(2))
        body = body[: price_match.start()].strip()

        tat_match = re.search(r"(\d+\s*hours?)\s*$", body, flags=re.IGNORECASE)
        tat = tat_match.group(1) if tat_match else "NA"
        body = body[: tat_match.start()].strip() if tat_match else body

        schedule_match = re.search(r"\b(Daily|Weekly|Monthly)\b\s*$", body, flags=re.IGNORECASE)
        schedule = schedule_match.group(1).title() if schedule_match else "NA"
        body = body[: schedule_match.start()].strip() if schedule_match else body

        temp_match = re.search(r"\b(A/R|R/F|A|R|F|NA)\b\s*$", body)
        storage_temp = temp_match.group(1) if temp_match else "NA"
        body = body[: temp_match.start()].strip() if temp_match else body

        department = "Other"
        department_pos: int | None = None
        normalized_department = "Other"
        for dep in sorted(DEPARTMENTS, key=len, reverse=True):
            dep_match = re.search(re.escape(dep), body, flags=re.IGNORECASE)
            if dep_match:
                department_pos = dep_match.start()
                normalized_department = dep.title() if dep.islower() else dep
                if normalized_department == "Clinical pathlogy":
                    normalized_department = "Clinical Pathology"
                department = normalized_department
                break

        if department_pos is None:
            name = body
            trailing = ""
        else:
            name = body[:department_pos].strip()
            trailing = body[department_pos + len(normalized_department) :].strip()

        methodology = "NA"
        sample_type = "See brochure"
        if trailing:
            sample_pos = len(trailing) + 1
            for keyword in SAMPLE_KEYWORDS:
                keyword_match = re.search(re.escape(keyword), trailing, flags=re.IGNORECASE)
                if keyword_match and keyword_match.start() < sample_pos:
                    sample_pos = keyword_match.start()

            if sample_pos <= len(trailing):
                methodology = trailing[:sample_pos].strip() or "NA"
                sample_type = trailing[sample_pos:].strip() or "See brochure"
            else:
                methodology = trailing

        rows.append(
            TestRecord(
                id=code,
                serial=serial,
                code=code,
                name=normalize_text(name) or code,
                category=department,
                department=department,
                methodology=normalize_text(methodology),
                sampleType=normalize_text(sample_type),
                storageTemp=storage_temp,
                schedule=schedule,
                tat=tat,
                b2bPrice=b2b_price,
                mrpPrice=mrp_price,
            )
        )

    deduped_by_code: dict[str, TestRecord] = {}
    for row in rows:
        deduped_by_code.setdefault(row.code, row)

    return sorted(deduped_by_code.values(), key=lambda item: item.serial)


def main() -> None:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"Source PDF not found: {PDF_PATH}")

    raw_text = "\n".join((page.extract_text() or "") for page in PdfReader(str(PDF_PATH)).pages)
    for noise_line in NOISE_LINES:
        raw_text = raw_text.replace(noise_line, " ")
    raw_text = re.sub(r"\s+", " ", raw_text)

    records = parse_rows(raw_text)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps([asdict(record) for record in records], indent=2),
        encoding="utf-8",
    )

    print(f"Saved {len(records)} tests to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
