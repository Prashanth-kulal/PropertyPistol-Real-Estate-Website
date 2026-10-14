import json, re

with open('c:/Users/prashanth/PropertyPistolProject/temp_inspect/DfHgMymb.js', 'r', encoding='utf-8') as f:
    df = f.read()

# Extract all paths: d attribute, stroke, stroke-width, fill
paths = re.findall(r't\(["\']path["\'],\{([^}]+)\}', df)
print("Total paths in DfHgMymb.js:", len(paths))

parsed_paths = []
for p in paths:
    d_match = re.search(r'd:\s*["\']([^"\']+)["\']', p)
    stroke_match = re.search(r'stroke:\s*["\']([^"\']+)["\']', p)
    width_match = re.search(r'["\']stroke-width["\']:\s*["\']([^"\']+)["\']', p)
    fill_match = re.search(r'fill:\s*["\']([^"\']+)["\']', p)
    if d_match:
        parsed_paths.append({
            'd': d_match.group(1),
            'stroke': stroke_match.group(1) if stroke_match else None,
            'strokeWidth': width_match.group(1) if width_match else None,
            'fill': fill_match.group(1) if fill_match else None
        })

print("Parsed paths count:", len(parsed_paths))
with open('c:/Users/prashanth/PropertyPistolProject/temp_inspect/mumbai_rail_paths.json', 'w', encoding='utf-8') as f:
    json.dump(parsed_paths, f, indent=2)

print("Saved mumbai_rail_paths.json successfully!")
