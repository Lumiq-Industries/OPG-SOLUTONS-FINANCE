import json
import os
import re
import shutil
import zipfile
import xml.etree.ElementTree as ET

DOCX = r"C:\Users\ayand\Documents\VILATECH\OPG Business Pictures for Website.docx"
OUT = r"C:\Users\ayand\Documents\VILATECH\OPG-SOLUTIONS-STORE\tmp-docx-extract"
MEDIA_OUT = r"C:\Users\ayand\Documents\VILATECH\OPG-SOLUTIONS-STORE\public\products"
REPORT = os.path.join(OUT, "products-report.txt")
JSON_OUT = os.path.join(OUT, "products.json")

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:80]


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(MEDIA_OUT, exist_ok=True)

    with zipfile.ZipFile(DOCX) as z:
        z.extractall(OUT)

    root = ET.parse(os.path.join(OUT, "word/document.xml")).getroot()
    rels = ET.parse(os.path.join(OUT, "word/_rels/document.xml.rels")).getroot()
    relmap = {rel.get("Id"): rel.get("Target") for rel in rels}

    paras = []
    for p in root.iter(f"{W}p"):
        texts = []
        imgs = []
        for node in p.iter():
            if node.tag == f"{W}t" and node.text:
                texts.append(node.text)
            if node.tag.endswith("}blip"):
                embed = node.get(
                    "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed"
                )
                if embed:
                    imgs.append(embed)
        text = "".join(texts).strip()
        if text or imgs:
            paras.append({"text": text, "imgs": imgs})

    items = []
    current = None

    def flush() -> None:
        nonlocal current
        if current and (current["lines"] or current["imgs"] or current["name"]):
            items.append(current)
        current = None

    for p in paras:
        text = p["text"]
        if text:
            upper_ratio = sum(ch.isupper() for ch in text if ch.isalpha()) / max(
                sum(ch.isalpha() for ch in text), 1
            )
            looks_like_heading = (
                len(text) >= 4
                and upper_ratio > 0.75
                and not text.startswith("R")
                and "SKU" not in text
                and not re.match(r"^\d", text)
            )
            if looks_like_heading:
                flush()
                current = {"name": text.title() if text.isupper() else text, "lines": [], "imgs": []}
            elif current is not None:
                current["lines"].append(text)

        if p["imgs"]:
            if current is None:
                current = {"name": "Untitled Product", "lines": [], "imgs": []}
            for im in p["imgs"]:
                target = relmap.get(im, "")
                if target.startswith("media/"):
                    current["imgs"].append(target)

    flush()

    products = []
    report_lines = []
    for idx, item in enumerate(items, start=1):
        name = item["name"].strip()
        lines = item["lines"]
        description = lines[0] if lines else name
        long_desc = " ".join(lines[1:]) if len(lines) > 1 else description
        price = 0
        for line in lines:
            m = re.search(r"R\s?([\d,]+(?:\.\d{2})?)", line)
            if m:
                price = float(m.group(1).replace(",", ""))
                break

        image_paths = []
        for img_idx, media in enumerate(item["imgs"]):
            src = os.path.join(OUT, "word", media.replace("/", os.sep))
            if not os.path.exists(src):
                continue
            ext = os.path.splitext(src)[1].lower() or ".png"
            filename = f"{slugify(name)}-{img_idx + 1}{ext}"
            dest = os.path.join(MEDIA_OUT, filename)
            shutil.copy2(src, dest)
            image_paths.append(f"/products/{filename}")

        slug = slugify(name)
        product = {
            "id": str(idx),
            "slug": slug,
            "name": name,
            "description": description,
            "longDescription": long_desc,
            "price": price,
            "image": image_paths[0] if image_paths else "",
            "images": image_paths,
        }
        products.append(product)

        report_lines.append(f"=== {idx}. {name} ===")
        for line in lines[:10]:
            report_lines.append(f"  {line}")
        report_lines.append(f"  images: {', '.join(image_paths) or 'NONE'}")
        report_lines.append("")

    with open(REPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(report_lines))

    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    print(f"Extracted {len(products)} products")
    print("\n".join(report_lines[:80]))


if __name__ == "__main__":
    main()
