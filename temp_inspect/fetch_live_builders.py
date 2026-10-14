import json, urllib.request

devs = [
    ("Godrej Properties", "2a2d4880-0139-4b6f-950a-723557cbcacf"),
    ("Lodha Group", "efdb4ac1-c256-4bed-95c3-f3c7b9c045d1"),
    ("L&T Realty", "b94d5805-56f0-4621-9da0-b2f3c0ca8fac")
]

for name, uuid in devs:
    url = f"https://api.propertypistol.com/public/builders/{uuid}"
    print(f"Fetching {name} from {url}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print("Response keys:", data.keys())
            builder = data.get('builder', {})
            print("Builder name:", builder.get('name'))
            print("Builder logo:", builder.get('logo_url'))
            print("Builder about_us:", builder.get('about_us', '')[:120])
            print("Builder description:", builder.get('description', '')[:120])
            cities = builder.get('cities', [])
            print(f"Cities count: {len(cities)}")
            for c in cities[:3]:
                print(f"  City: {c.get('name')} | Ongoing: {c.get('ongoing_project_count')} | Upcoming: {c.get('upcoming_project_count')}")
            with open(f"temp_inspect/builder_{uuid[:8]}.json", "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            print(f"Saved builder_{uuid[:8]}.json")
    except Exception as e:
        print(f"Failed to fetch {name}: {e}")
    print("-" * 50)
