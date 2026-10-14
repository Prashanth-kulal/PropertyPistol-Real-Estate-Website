import json

with open('temp_inspect/godrej_mumbai_projects.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

proj = data['projects'][0]
print("Keys in project:", proj.keys())
for k, v in proj.items():
    if not isinstance(v, (list, dict)):
        print(f"  {k}: {v}")
    elif isinstance(v, list) and len(v) > 0 and isinstance(v[0], dict):
        print(f"  {k}: [list of {len(v)} dicts, first keys: {v[0].keys()}]")
    else:
        print(f"  {k}: {str(v)[:100]}")
