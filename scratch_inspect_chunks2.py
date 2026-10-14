import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def fetch_chunk(chunk_name):
    url = f"https://cdn.propertypistol.com/_nuxt/{chunk_name}"
    print(f"\n==================== CHUNK: {chunk_name} ====================")
    try:
        content = urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=15).read().decode('utf-8', errors='ignore')
        print("Length:", len(content))
        return content
    except Exception as e:
        print("Error:", e)
        return ""

# Check a1wayxs2.js (commute modal)
commute_js = fetch_chunk("a1wayxs2.js")
if commute_js:
    # Look for template strings, inputs, labels, fields, buttons
    strings = re.findall(r'"([^"\\]*(?:commute|time|destination|station|location|office|travel|minute|km|reach|search|mode)[^"\\]*)"', commute_js, re.I)
    print("Commute strings:", len(strings))
    for s in strings[:30]:
        print("  -", s)

# Find rail network chunk in DoovH5OQ.js
main_js = urllib.request.urlopen(urllib.request.Request("https://cdn.propertypistol.com/_nuxt/DoovH5OQ.js", headers=headers), timeout=15).read().decode('utf-8', errors='ignore')
rail_chunks = re.findall(r'["\'](\.\/[a-zA-Z0-9_\-]+\.js)["\']', main_js)
print("Looking for rail chunks in:", len(rail_chunks))
for c in set(rail_chunks):
    clean_c = c.replace('./', '')
    # Check if this chunk is related to rail network
    # Let's peek into a few chunks around railnetwork.B9sP4cz-.css
    if clean_c in ['CYKV45v4.js', '_fhSeu-i.js', 'UytNVUJS.js', 'Cef0RanH.js']:
        js = fetch_chunk(clean_c)
        r_strings = re.findall(r'"([^"\\]*(?:panzoom|rail|station|zoom|svg|map)[^"\\]*)"', js, re.I)
        print(f"Strings in {clean_c}:", len(r_strings))
        for rs in r_strings[:20]:
            print("    *", rs)
