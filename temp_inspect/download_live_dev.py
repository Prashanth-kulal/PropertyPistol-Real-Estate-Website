import urllib.request

base_url = 'https://cdn.propertypistol.com/_nuxt/'

# 1. Download xn2xTIey.js (Developer detail page component)
print("Downloading xn2xTIey.js...")
req = urllib.request.Request(base_url + 'xn2xTIey.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as resp:
    js_detail = resp.read().decode('utf-8', errors='ignore')

with open('temp_inspect/developer_detail_component.js', 'w', encoding='utf-8') as f:
    f.write(js_detail)
print("Saved developer_detail_component.js, length:", len(js_detail))

# 2. Download the FeaturedDevelopers component chunk
# Let's check which chunk imports FeaturedDevelopers.DLGVmyik.css
with open('temp_inspect/inspect_live_manifest.py', 'r') as f:
    pass

# We saw: "./CA6YtzxB.js", "./FeaturedDevelopers.DLGVmyik.css", "./B5QUWZFh.js"
for chunk_name in ['CA6YtzxB.js', 'B5QUWZFh.js', 'B1RsbksT.js', 'rram0gzg.js', 'BL86kv70.js', 'DyDJEMu4.js']:
    try:
        req_c = urllib.request.Request(base_url + chunk_name, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req_c, timeout=15) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            if '2,000+' in content or 'featured-developers' in content or 'FeaturedDevelopers' in content:
                print(f"*** FOUND FeaturedDevelopers IN {chunk_name}! (length: {len(content)}) ***")
                with open('temp_inspect/featured_developers_chunk.js', 'w', encoding='utf-8') as f:
                    f.write(content)
            elif 'godrej' in content.lower() or 'lodha' in content.lower():
                print(f"Found developer names in {chunk_name}!")
    except Exception as e:
        print(f"Error downloading {chunk_name}: {e}")
