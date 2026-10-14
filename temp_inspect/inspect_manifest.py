import re, urllib.request

req = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/D8bBSU7E.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp:
    manifest = resp.read().decode('utf-8', errors='ignore')

print("Manifest length:", len(manifest))

# Let's search for 9a742235
if '9a742235' in manifest:
    print("Found 9a742235 in manifest!")

# Find all chunk filenames like [A-Za-z0-9_-]+\.js
chunks = set(re.findall(r'["\']([A-Za-z0-9_-]{8}\.js)["\']', manifest))
print(f"Found {len(chunks)} chunk references")

# Search for developer in manifest
for m in re.finditer(r'developer', manifest, re.IGNORECASE):
    start = max(0, m.start() - 100)
    end = min(len(manifest), m.end() + 100)
    print("Context around 'developer':", manifest[start:end])
    print("---")
