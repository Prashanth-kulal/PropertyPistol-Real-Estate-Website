import json, re

with open('temp_inspect/live_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the script tag containing __NUXT_DATA__ or window.__NUXT__
m = re.search(r'<script[^>]*id="__NUXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
if m:
    data = json.loads(m.group(1))
    print("NUXT DATA items count:", len(data))
    
    # Let's search for "Godrej" or developers in data
    dev_indices = []
    for idx, item in enumerate(data):
        if isinstance(item, str) and any(d in item for d in ['Godrej', 'Lodha', 'L&T', 'Hiranandani', 'Shapoorji', 'SOBHA', 'Runwal']):
            print(f"Index {idx}: {item}")
            dev_indices.append(idx)
else:
    print("Could not find __NUXT_DATA__ script tag")
