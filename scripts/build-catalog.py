import json
import os
import re
import shutil
import zipfile
from typing import List

DOCX = r"C:\Users\ayand\Documents\VILATECH\OPG Business Pictures for Website.docx"
OUT = r"C:\Users\ayand\Documents\VILATECH\OPG-SOLUTIONS-STORE\tmp-docx-extract"
MEDIA_OUT = r"C:\Users\ayand\Documents\VILATECH\OPG-SOLUTIONS-STORE\public\products"
JSON_OUT = os.path.join(OUT, "products-structured.json")

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

# Curated catalog from OPG Business Pictures document + live store pricing
CATALOG = [
    {"name": "18V Drill Kit", "price": 1500, "category": "hardware-tools", "desc": "Premium cordless drill kit with battery and bits.", "sku": "OPG-DRILL-18V"},
    {"name": "46-Piece Bit Set", "price": 550, "category": "hardware-tools", "desc": "Multi-purpose 46-piece bit set for home and workshop use.", "sku": "OPG-BIT-46"},
    {"name": "Drill Bit Combo Set", "price": 215, "category": "hardware-tools", "desc": "Assorted drill bit combo set for everyday drilling tasks.", "sku": "OPG-BIT-COMBO"},
    {"name": "Heavy Duty 10m Extension Lead", "price": 415, "category": "electrical", "desc": "Ellies 16A heavy duty 10 metre extension lead.", "sku": "OPG-EXT-10M"},
    {"name": "Utility Knife + Refill Blades", "price": 62, "category": "hardware-tools", "desc": "ROX utility knife with refill blades.", "sku": "OPG-KNIFE-ROX"},
    {"name": "Painter's Tape Multipack", "price": 325, "category": "paint", "desc": "Unitac painter's tape multipack for clean paint lines.", "sku": "OPG-TAPE-MP"},
    {"name": "Blue Disposable Nitrile Gloves", "price": 160, "category": "hardware-tools", "desc": "Bulk pack disposable nitrile gloves for trade and DIY.", "sku": "OPG-GLOVE-NIT"},
    {"name": "Clear Safety Goggles", "price": 135, "category": "hardware-tools", "desc": "Clear safety goggles for construction and workshop use.", "sku": "OPG-GOGGLE-CLEAR"},
    {"name": "Two-Part Epoxy Adhesive Kit", "price": 250, "category": "hardware-tools", "desc": "All-purpose two-part epoxy adhesive kit.", "sku": "OPG-EPOXY-2P"},
    {"name": "600mm Aluminium Spirit Level", "price": 175, "category": "hardware-tools", "desc": "600mm aluminium spirit level for accurate measurements.", "sku": "OPG-LEVEL-600"},
    {"name": "25L Plastic Polycan", "price": 189, "category": "plumbing", "desc": "25 litre plastic polycan for water or fuel storage.", "sku": "OPG-POLYCAN-25L"},
    {"name": "100L Storage Drum (Open Head)", "price": 615, "category": "plumbing", "desc": "100 litre open-head storage drum in blue.", "sku": "OPG-DRUM-100L"},
    {"name": "210L HDPE Plastic Drum", "price": 520, "category": "plumbing", "desc": "210 litre HDPE plastic blowpack drum.", "sku": "OPG-DRUM-210L"},
    {"name": "75L Plastic Tub Bucket", "price": 36, "category": "plumbing", "desc": "75 litre plastic tub bucket with rope handle.", "sku": "OPG-BUCKET-75L"},
    {"name": "Water Drum (Blue/Black)", "price": 350, "category": "plumbing", "desc": "Sealed water storage drum, 100L–250L range.", "sku": "OPG-WATER-DRUM"},
    {"name": "5L Hand Water Dispenser", "price": 82, "category": "plumbing", "desc": "Portable 5L container with manual tap spout.", "sku": "OPG-DISP-5L"},
    {"name": "Jerry Can (Plastic)", "price": 129, "category": "plumbing", "desc": "Portable plastic jerry can, 10L–25L range.", "sku": "OPG-JERRY"},
    {"name": "Steel Water Tank Valve", "price": 300, "category": "plumbing", "desc": "Brass-core steel water tank valve for large systems.", "sku": "OPG-VALVE-TANK"},
    {"name": "Water Filter Inline Sediment", "price": 165, "category": "plumbing", "desc": "20 micron inline sediment water filter cartridge.", "sku": "OPG-FILTER-20M"},
    {"name": "Gutter PVC System Kit", "price": 405, "category": "building-materials", "desc": "PVC gutter system kit with 3m sections and brackets.", "sku": "OPG-GUTTER-KIT"},
    {"name": "Hardbody Matt Ceramics Floor Tile 600×600", "price": 0, "category": "tiles-bathrooms", "desc": "Durable matt finish ceramic floor tile for residential and commercial spaces.", "sku": "OPG66010Z", "availability": "on-demand"},
    {"name": "Hardbody Glazed Ceramics Floor Tile 600×600", "price": 0, "category": "tiles-bathrooms", "desc": "Glazed ceramic floor tile with refined durable finish.", "sku": "OPG66038Z", "availability": "on-demand"},
    {"name": "Mega Safety Boot Steel Toe Cap", "price": 367, "category": "hardware-tools", "desc": "Steel toe cap safety boot for heavy-duty work environments.", "sku": "OPG-BOOT-MEGA"},
    {"name": "REBEL FX2 S1P Safety Boot", "price": 699, "category": "hardware-tools", "desc": "Premium S1P rated safety boot with reinforced protection.", "sku": "OPG-BOOT-REBEL"},
    {"name": "KALIBER JACKAL Safety Boot", "price": 299, "category": "hardware-tools", "desc": "Budget-friendly safety boot for everyday site work.", "sku": "OPG-BOOT-JACKAL"},
    {"name": "Lemaitre Hawk Safety Shoe", "price": 1280, "category": "hardware-tools", "desc": "High-end safety shoe for professional tradespeople.", "sku": "OPG-SHOE-HAWK"},
    {"name": "Safety Helmet", "price": 96, "category": "hardware-tools", "desc": "Standard construction safety helmet.", "sku": "OPG-HELMET"},
    {"name": "Reflective Safety Vest", "price": 50, "category": "hardware-tools", "desc": "High-visibility reflective safety vest.", "sku": "OPG-VEST-HV"},
    {"name": "Milwaukee Personal Protection Kit", "price": 1115, "category": "hardware-tools", "desc": "All-in-one personal protection kit with ear and eye protection.", "sku": "OPG-PPE-MIL"},
    {"name": "Protective Mask + Goggles Combo", "price": 218, "category": "hardware-tools", "desc": "Combined respiratory and eye protection mask combo.", "sku": "OPG-MASK-COMBO"},
    {"name": "Maxi View Safety Goggles", "price": 44, "category": "hardware-tools", "desc": "Budget safety goggles with wide field of view.", "sku": "OPG-GOGGLE-MAXI"},
    {"name": "GHS Gas Double Mask", "price": 129, "category": "hardware-tools", "desc": "Double filter gas mask for dusty or chemical environments.", "sku": "OPG-MASK-GHS"},
    {"name": "Dromex PVC Knit Wrist Gloves", "price": 12, "category": "hardware-tools", "desc": "Standard duty PVC red knit wrist gloves.", "sku": "OPG-GLOVE-PVC"},
    {"name": "Full Contractor Ready-to-Work Combo", "price": 550, "category": "hardware-tools", "desc": "Contractor starter PPE combo deal for site workers.", "sku": "OPG-COMBO-CON"},
    {"name": "2-Pc Reflective Overall (Royal Blue)", "price": 297, "category": "hardware-tools", "desc": "Two-piece reflective work overall in royal blue.", "sku": "OPG-OVERALL-2P"},
    {"name": "Beck Rainsuit Reflective Rubberised", "price": 349, "category": "hardware-tools", "desc": "Waterproof rubberised rainsuit with reflective tape.", "sku": "OPG-RAINSUIT"},
    {"name": "Tyvek Hooded Coveralls", "price": 140, "category": "hardware-tools", "desc": "Dupont Tyvek hooded coveralls for dust and chemical protection.", "sku": "OPG-COVERALL-TYV"},
    {"name": "Mastercraft Metric Tool Set 147 Piece", "price": 3499, "category": "hardware-tools", "desc": "Comprehensive 147-piece metric tool set.", "sku": "OPG-TOOL-147"},
    {"name": "Trade Professional Toolbox Kit 85 Piece", "price": 2395, "category": "hardware-tools", "desc": "85-piece CRV trade professional toolbox kit.", "sku": "OPG-TOOL-85"},
    {"name": "Ingco Tools Set 168 Piece", "price": 1559, "category": "hardware-tools", "desc": "168-piece Ingco tools set for workshop and site.", "sku": "OPG-TOOL-168"},
    {"name": "Mac Afric 85 Pcs Toolbox With Tools", "price": 1795, "category": "hardware-tools", "desc": "Mac Afric 85-piece toolbox with hand tools included.", "sku": "OPG-TOOL-MAC85"},
]


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")[:80]


def collect_doc_images() -> List[str]:
    os.makedirs(OUT, exist_ok=True)
    with zipfile.ZipFile(DOCX) as z:
        z.extractall(OUT)
    media_dir = os.path.join(OUT, "word", "media")
    files = []
    for name in sorted(os.listdir(media_dir)):
        if name.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
            files.append(os.path.join(media_dir, name))
    return files


def main() -> None:
    os.makedirs(MEDIA_OUT, exist_ok=True)
    images = collect_doc_images()

    # Skip first ~26 images (website screenshots / branding pages)
    product_images = images[26:]

    products = []
    for idx, item in enumerate(CATALOG):
        slug = slugify(item["name"])
        img_src = product_images[idx] if idx < len(product_images) else None
        image_path = ""
        images_out = []

        if img_src and os.path.exists(img_src):
            ext = os.path.splitext(img_src)[1].lower()
            filename = f"{slug}{ext}"
            dest = os.path.join(MEDIA_OUT, filename)
            shutil.copy2(img_src, dest)
            image_path = f"/products/{filename}"
            images_out = [image_path]

        # Prefer live store images for known products
        live_images = {
            "18v-drill-kit": "https://opgsolutions.co.za/wp-content/uploads/2025/11/18-V-Drill-Kit.png",
            "46-piece-bit-set": "https://opgsolutions.co.za/wp-content/uploads/2025/11/46%E2%80%91Piece-Bit-Set.png",
            "hardbody-matt-ceramics-floor-tile-600-600": "https://opgsolutions.co.za/wp-content/uploads/2026/01/IMG_4710.jpg",
            "hardbody-glazed-ceramics-floor-tile-600-600": "https://opgsolutions.co.za/wp-content/uploads/2026/01/IMG_4700.jpg",
        }
        if slug in live_images:
            image_path = live_images[slug]
            images_out = [image_path]

        category_names = {
            "electrical": "Electrical",
            "plumbing": "Plumbing",
            "paint": "Paint & Consumables",
            "hardware-tools": "Hardware & Tools",
            "tiles-bathrooms": "Tiles & Bathrooms",
            "building-materials": "Building Materials",
        }
        cat = item["category"]
        availability = item.get("availability", "in-stock" if item["price"] > 0 else "on-demand")

        products.append(
            {
                "id": str(idx + 1),
                "slug": slug,
                "name": item["name"],
                "description": item["desc"],
                "longDescription": item["desc"],
                "price": item["price"],
                "category": category_names.get(cat, "Hardware & Tools"),
                "categorySlug": cat,
                "tags": [cat.split("-")[0]],
                "image": image_path or "/brand/opg-flyer.png",
                "images": images_out or ([image_path] if image_path else []),
                "availability": availability,
                "rating": 4.6,
                "reviewCount": 0,
                "sku": item["sku"],
            }
        )

    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    print(f"Built {len(products)} products, mapped {min(len(product_images), len(CATALOG))} images")


if __name__ == "__main__":
    main()
