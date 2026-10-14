import json, urllib.request

with open('temp_inspect/builder_2a2d4880.json', 'r', encoding='utf-8') as f:
    godrej_data = json.load(f)

builder = godrej_data['builder']
mumbai_city = next(c for c in builder['cities'] if c['name'] == 'Mumbai')
print("Mumbai city UUID:", mumbai_city['uuid'])

url = f"https://api.propertypistol.com/public/builders/{builder['uuid']}/ongoing_projects?city_uuid={mumbai_city['uuid']}"
print("Fetching projects from:", url)

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req, timeout=15) as resp:
    projects_data = json.loads(resp.read().decode('utf-8'))
    print("Projects response keys:", projects_data.keys())
    projects = projects_data.get('projects', [])
    print(f"Total projects returned: {len(projects)}")
    for p in projects[:3]:
        print("Project Name:", p.get('project_name') or p.get('name'))
        print("  Location:", p.get('location') or p.get('locality_name'))
        print("  Price:", p.get('price_onwards') or p.get('price'))
        print("  Configurations:", p.get('configurations') or p.get('bhk'))
        print("  Image:", p.get('image_url') or p.get('thumbnail'))
        print("  RERA:", p.get('rera_id') or p.get('rera_number'))
    
    with open('temp_inspect/godrej_mumbai_projects.json', 'w', encoding='utf-8') as f:
        json.dump(projects_data, f, indent=2)
    print("Saved godrej_mumbai_projects.json")
