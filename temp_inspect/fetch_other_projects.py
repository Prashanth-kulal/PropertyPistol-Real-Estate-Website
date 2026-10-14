import json, urllib.request

targets = [
    ("Lodha Group", "builder_efdb4ac1.json", "lodha_projects.json"),
    ("L&T Realty", "builder_b94d5805.json", "lnt_projects.json")
]

for name, builder_file, out_file in targets:
    with open(f"temp_inspect/{builder_file}", "r", encoding="utf-8") as f:
        b_data = json.load(f)['builder']
    
    mumbai_city = next(c for c in b_data['cities'] if c['name'] == 'Mumbai')
    url = f"https://api.propertypistol.com/public/builders/{b_data['uuid']}/ongoing_projects?city_uuid={mumbai_city['uuid']}"
    print(f"Fetching {name} from {url}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, timeout=15) as resp:
        p_data = json.loads(resp.read().decode('utf-8'))
        projects = p_data.get('projects', [])
        print(f"  Got {len(projects)} projects for {name}")
        for p in projects[:3]:
            print(f"    - {p['title']} ({p.get('region_name')}, {p.get('region')}): {p.get('price')} | {p.get('details')}")
        with open(f"temp_inspect/{out_file}", "w", encoding="utf-8") as f:
            json.dump(p_data, f, indent=2)
