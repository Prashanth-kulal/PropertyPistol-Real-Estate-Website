import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

# Search all referenced JS files in DoovH5OQ.js for commuteSearch
main_js = urllib.request.urlopen(urllib.request.Request("https://cdn.propertypistol.com/_nuxt/DoovH5OQ.js", headers=headers), timeout=15).read().decode('utf-8', errors='ignore')
matches = re.findall(r'(\b[a-zA-Z0-9_\-]+\.js\b)', main_js)

print("Total unique JS chunks found:", len(set(matches)))

commute_chunks = []
for m in set(matches):
    if any(k in m.lower() for k in ['commute', 'modal', 'search', 'filter']):
        commute_chunks.append(m)

print("Potentially relevant chunks:", commute_chunks[:15])

# Also search for 'commuteSearch' or 'commute' template in all chunks
for c in set(matches):
    url = f"https://cdn.propertypistol.com/_nuxt/{c}"
    try:
        js = urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=5).read().decode('utf-8', errors='ignore')
        if 'commutesearch' in js.lower() or 'commute time' in js.lower() or 'search by commute' in js.lower() or 'reach in' in js.lower():
            print(f"\n FOUND COMMUTE IN: {c} (len: {len(js)})")
            # print snippets
            snippets = re.findall(r'(.{0,100}(?:commuteSearch|commute|minutes|reach).{0,150})', js, re.I)
            for snip in snippets[:6]:
                print("   >", snip.strip())
    except:
        pass
