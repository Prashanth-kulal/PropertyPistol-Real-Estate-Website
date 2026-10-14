import re

with open('temp_inspect/inspect_live_manifest.py', 'r') as f:
    pass

import urllib.request
req = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/DoovH5OQ.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp:
    js = resp.read().decode('utf-8', errors='ignore')

# Search for apiBase or api url
matches = re.findall(r'(https?://[^"\']+api[^"\']*)', js)
print("API URL matches:", set(matches[:20]))

# Search for apiBase in js
idx = js.find('apiBase')
while idx != -1:
    print("Around apiBase:", js[max(0, idx-100):min(len(js), idx+150)])
    print("-" * 40)
    idx = js.find('apiBase', idx+1)
    if idx > 200000: break
