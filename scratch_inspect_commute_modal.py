import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
url = "https://cdn.propertypistol.com/_nuxt/DTZXvi6h.js"
print("Fetching:", url)
js = urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=15).read().decode('utf-8', errors='ignore')
print("Length:", len(js))

# Print all text strings
strings = re.findall(r'"([^"\\]{3,100})"', js)
print(f"Strings ({len(strings)}):")
for s in strings:
    print("  *", s)
