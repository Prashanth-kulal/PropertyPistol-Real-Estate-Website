import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

url = "https://cdn.propertypistol.com/_nuxt/DoovH5OQ.js"
print("Fetching:", url)
js = urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=15).read().decode('utf-8', errors='ignore')
print("JS length:", len(js))

# Search for SVG, map, panzoom, stations, lines
matches = re.findall(r'(\b(?:panzoom|rail|station|svg|zoom|map|network|commute)[^;]{10,150})', js, re.I)
print(f"Found {len(matches)} matches:")
for m in matches[:15]:
    print("  ", m)

# Search for other chunks mentioned in this chunk
chunks = re.findall(r'["\']([a-zA-Z0-9_\-\.\/]+\.js)["\']', js)
print("Referenced JS chunks:", len(chunks))
for c in set(chunks):
    if any(k in c.lower() for k in ['rail', 'commute', 'city', 'map']):
        print("  -->", c)
