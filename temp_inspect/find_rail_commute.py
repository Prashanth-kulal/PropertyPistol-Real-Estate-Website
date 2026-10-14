import urllib.request, re, json

req = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/D8bBSU7E.js', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        manifest = resp.read().decode('utf-8', errors='ignore')
        print('Manifest length:', len(manifest))
        matches = re.findall(r'path:\s*["\']([^"\']+)["\'][^}]*component:\s*\(\)\s*=>\s*ie\(\(\)\s*=>\s*import\(["\']([^"\']+)["\']\)', manifest)
        for path, chunk in matches:
            if any(k in path.lower() for k in ['rail', 'commute', 'city', 'price', ':city']):
                print(f'{path} -> {chunk}')
        if not matches:
            # Let's search for rail-network or commute in manifest
            for m in re.finditer(r'["\'](/rail-network[^"\']*)["\']', manifest):
                print('Found rail url:', m.group(1))
            for m in re.finditer(r'["\'](/[^"\']*commute[^"\']*)["\']', manifest):
                print('Found commute url:', m.group(1))
            for m in re.finditer(r'["\'](/[^"\']*price-trend[^"\']*)["\']', manifest):
                print('Found price-trend url:', m.group(1))
except Exception as e:
    print('Error:', e)
