import re, urllib.request

req = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/DoovH5OQ.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as resp:
    manifest = resp.read().decode('utf-8', errors='ignore')

print("Live Manifest length:", len(manifest))

# Search for developer routes in the live manifest
for m in re.finditer(r'developer', manifest, re.IGNORECASE):
    start = max(0, m.start() - 120)
    end = min(len(manifest), m.end() + 150)
    print("Match:", manifest[start:end])
    print("-" * 50)
