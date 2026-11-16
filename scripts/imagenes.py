#!/usr/bin/env python3
"""Genera WebP responsivos y sus metadatos. Ejecutar al agregar o cambiar fotos."""

import json
import re
from io import BytesIO
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images"
METADATA = ROOT / "src" / "components" / "ui" / "imageMetadata.ts"
WIDTHS = (640, 960)


def write_if_changed(path: Path, content: bytes) -> bool:
    if path.exists() and path.read_bytes() == content:
        return False
    path.write_bytes(content)
    return True


def main() -> None:
    metadata = {}
    generated = changed = 0
    for source in sorted(IMAGES.glob("*.webp")):
        if source.name == "logo.webp" or re.search(r"-(640|960)$", source.stem):
            continue
        with Image.open(source) as original:
            width, height = original.size
            variants = []
            for target_width in WIDTHS:
                target = source.with_name(f"{source.stem}-{target_width}.webp")
                if width <= target_width:
                    # Elimina variantes obsoletas si se reemplaza el original por uno menor.
                    target.unlink(missing_ok=True)
                    continue
                target_height = max(1, round(height * target_width / width))
                resized = original.resize((target_width, target_height), Image.Resampling.LANCZOS)
                output = BytesIO()
                resized.save(output, format="WEBP", quality=78, method=6)
                changed += write_if_changed(target, output.getvalue())
                generated += 1
                variants.append(target_width)
            metadata[f"./images/{source.name}"] = {
                "width": width, "height": height, "variants": variants,
            }

    content = (
        "// Generado por python3 scripts/imagenes.py. No editar a mano.\n"
        "export const IMAGE_METADATA: Record<string, { width: number; height: number; variants: number[] }> = "
        + json.dumps(metadata, indent=2, ensure_ascii=False)
        + ";\n"
    )
    metadata_changed = write_if_changed(METADATA, content.encode("utf-8"))
    print(f"{len(metadata)} fotos; {generated} variantes; {changed} archivos WebP escritos.")
    print(f"Metadatos: {'actualizados' if metadata_changed else 'sin cambios'}.")


if __name__ == "__main__":
    main()
