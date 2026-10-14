import urllib.request, re, json

req = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/D8bBSU7E.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp:
    manifest = resp.read().decode('utf-8', errors='ignore')

# Find all routes with rail or city
for m in re.finditer(r'path:\s*["\']([^"\']*rail[^"\']*)["\'][^}]*component:\s*\(\)\s*=>\s*ie\(\(\)\s*=>\s*import\(["\']([^"\']+)["\']\)', manifest):
    print(m.group(1), '->', m.group(2))

# Also find route for /:city
for m in re.finditer(r'path:\s*["\'](/:city)["\'][^}]*component:\s*\(\)\s*=>\s*ie\(\(\)\s*=>\s*import\(["\']([^"\']+)["\']\)', manifest):
    print(m.group(1), '->', m.group(2))

# Download DZWfOUDS.js
chunk_url = 'https://cdn.propertypistol.com/_nuxt/DZWfOUDS.js'
req2 = urllib.request.Request(chunk_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req2, timeout=10) as resp2:
    js = resp2.read().decode('utf-8', errors='ignore')
    with open('temp_inspect/rail_chunk.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Downloaded rail_chunk.js, length:", len(js))

# Let's inspect imports in rail_chunk.js
imports = re.findall(r'import\([\"\']([^\"\']+)[\"\']\)', js)
print("Rail chunk dynamic imports:", imports)
