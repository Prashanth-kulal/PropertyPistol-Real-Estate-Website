import re, urllib.request

req = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/D8bBSU7E.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp:
    manifest = resp.read().decode('utf-8', errors='ignore')

all_chunks = re.findall(r'["\'](\./[a-zA-Z0-9_\-]+\.js)["\']', manifest)
print(f"Total chunk files: {len(all_chunks)}")

for c in set(all_chunks):
    c_url = 'https://cdn.propertypistol.com/_nuxt/' + c.replace('./', '')
    try:
        r = urllib.request.Request(c_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(r, timeout=5) as res:
            content = res.read().decode('utf-8', errors='ignore')
            if '2ff5c6d1' in content:
                print(f"FOUND IN {c}:")
                for m in re.finditer(r'2ff5c6d1', content):
                    start = max(0, m.start() - 200)
                    end = min(len(content), m.end() + 800)
                    print(content[start:end])
                break
    except Exception as e:
        pass
