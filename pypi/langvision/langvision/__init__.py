import json, os

def build_manifest(image_paths, out_path="manifest.json"):
    items = [{"image": p, "caption": "TODO"} for p in image_paths]
    with open(out_path, "w") as f:
        json.dump({"items": items}, f, indent=2)
    return out_path
