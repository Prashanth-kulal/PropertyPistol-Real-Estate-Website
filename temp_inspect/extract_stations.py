import json, re

with open('c:/Users/prashanth/PropertyPistolProject/temp_inspect/CMSgNtp4.js', 'r', encoding='utf-8') as f:
    cm = f.read()

# Station array starts at const i=[ and ends at ];export
m = re.search(r'const\s+[a-zA-Z0-9_]+\s*=\s*(\[\s*\{.*?\}\s*\]);\s*export', cm, re.DOTALL)
if m:
    raw_array = m.group(1)
    # Convert JS object syntax to valid JSON
    # keys: name, id, uuid, type, position, text_position, height, width, etc.
    # Replace unquoted keys with quoted keys
    cleaned = re.sub(r'([{\s,])([a-zA-Z0-9_]+):', r'\1"\2":', raw_array)
    stations = json.loads(cleaned)
    print("Successfully parsed stations count:", len(stations))
    with open('c:/Users/prashanth/PropertyPistolProject/temp_inspect/mumbai_stations.json', 'w', encoding='utf-8') as f:
        json.dump(stations, f, indent=2)
    print("Saved mumbai_stations.json!")
else:
    print("Could not match station array regex")
