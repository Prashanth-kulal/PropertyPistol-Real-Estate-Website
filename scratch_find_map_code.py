import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

chunks = ['wG5qjJhL.js', 'BpUn1N05.js', 'B0EAXGNU.js', 'CMSgNtp4.js', 'DfHgMymb.js', 'C94PZxzk.js', 'B4a6w2tk.js', 'Dpci_t5-.js', 'gxAv0YRO.js', 'XgXcenvp.js', 'BvNXFD2X.js']

for c in chunks:
    try:
        url = f"https://cdn.propertypistol.com/_nuxt/{c}"
        js = urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=10).read().decode('utf-8', errors='ignore')
        print(f"\n=== CHUNK: {c} (len: {len(js)}) ===")
        if 'svg' in js.lower() or 'panzoom' in js.lower() or 'station' in js.lower() or 'line' in js.lower() or 'map' in js.lower():
            matches = re.findall(r'(\b(?:svg|panzoom|station|line|marker|rail|zoom|western|central|harbour)[^;]{10,120})', js, re.I)
            print(f"Matches ({len(matches)}):")
            for m in matches[:8]:
                print("  ", m)
    except Exception as e:
        print(f"Error {c}:", e)
