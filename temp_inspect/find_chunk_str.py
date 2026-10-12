import re

with open('temp_inspect/pp_homepage.html', 'r', encoding='utf-8') as f:
    pass

import urllib.request
req = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/D8bBSU7E.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp:
    manifest = resp.read().decode('utf-8', errors='ignore')

idx = manifest.find('home-inspection-services')
if idx != -1:
    print(manifest[max(0, idx - 150): min(len(manifest), idx + 250)])
