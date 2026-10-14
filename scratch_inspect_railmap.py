import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

url = "https://cdn.propertypistol.com/_nuxt/CYKV45v4.js"
js = urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=15).read().decode('utf-8', errors='ignore')
print("CYKV45v4.js length:", len(js))

# Find imported modules / chunks
chunks = re.findall(r'["\']([a-zA-Z0-9_\-\.\/]+\.js)["\']', js)
print("Chunks in CYKV45v4.js:", chunks)

# Also find station list C
stations_raw = re.findall(r'const\s+C\s*=\s*(\[[^\]]+\])', js)
if stations_raw:
    print("Found stations array C! Length:", len(stations_raw[0]))
    print(stations_raw[0][:500])
else:
    # search for [{id: or [{name:
    st_matches = re.findall(r'(\[\s*\{\s*["\']?id["\']?\s*:\s*[^\]]+\])', js)
    print("Found potential station arrays:", len(st_matches))
    for sm in st_matches:
        print("  Array:", sm[:200])

# Search for the RailMap component chunk
deps = re.findall(r'__vite__mapDeps\(\[(\d+(?:,\s*\d+)*)\]\)', js)
print("vite map deps:", deps)
