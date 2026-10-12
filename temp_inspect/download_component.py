import re, urllib.request

req = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/D8bBSU7E.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp:
    manifest = resp.read().decode('utf-8', errors='ignore')

# Find the chunk for home-inspection-services
m = re.search(r'name:\s*["\']home-inspection-services["\'][^}]+component:\s*\(\)\s*=>\s*ie\(\(\)\s*=>\s*import\(["\']([^"\']+)["\']\)', manifest)
if m:
    chunk_rel = m.group(1)
    chunk_url = 'https://cdn.propertypistol.com/_nuxt/' + chunk_rel.replace('./', '')
    print("Chunk URL:", chunk_url)
    req2 = urllib.request.Request(chunk_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req2, timeout=10) as resp2:
        js = resp2.read().decode('utf-8', errors='ignore')
        with open('temp_inspect/home_inspection_component.js', 'w', encoding='utf-8') as f:
            f.write(js)
        print("Downloaded home_inspection_component.js, length:", len(js))
else:
    print("Could not find chunk pattern in manifest")
