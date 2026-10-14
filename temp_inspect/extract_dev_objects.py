import json, re

with open('temp_inspect/live_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'<script[^>]*id="__NUXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
if m:
    data = json.loads(m.group(1))
    
    # In Nuxt 3 de-duplicated array serialization:
    # Let's search for objects with "uuid", "name", "logo_url", "description", "projects"
    print("Searching for developer records...")
    # Let's inspect objects in data
    dev_records = []
    for i, item in enumerate(data):
        if isinstance(item, dict):
            keys = set(item.keys())
            if 'uuid' in keys and 'name' in keys and ('logo_url' in keys or 'projects' in keys):
                # Dereference items if indices are used
                rec = {}
                for k, v in item.items():
                    val = data[v] if isinstance(v, int) and v < len(data) else v
                    rec[k] = val
                dev_records.append(rec)
    
    print(f"Found {len(dev_records)} developer records:")
    for r in dev_records[:15]:
        name = r.get('name')
        uuid = r.get('uuid')
        logo = r.get('logo_url')
        print(f"Name: {name} | UUID: {uuid}")
        print(f"  Logo: {logo}")
        print(f"  Destination URL: /developers/{uuid}/{name.lower().replace(' ', '-') if isinstance(name, str) else ''}")
        print(f"  Projects count: {r.get('project_count')}")
        print("-" * 50)
