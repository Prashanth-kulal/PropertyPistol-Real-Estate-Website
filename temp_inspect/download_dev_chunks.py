import re, urllib.request

req = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/D8bBSU7E.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=10) as resp:
    manifest = resp.read().decode('utf-8', errors='ignore')

# 1. Download Dxje7CiW.js (Developer detail page)
print("Downloading Dxje7CiW.js...")
req_dev = urllib.request.Request('https://cdn.propertypistol.com/_nuxt/Dxje7CiW.js', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req_dev, timeout=10) as resp:
    dev_page_js = resp.read().decode('utf-8', errors='ignore')
with open('temp_inspect/developer_detail_page.js', 'w', encoding='utf-8') as f:
    f.write(dev_page_js)
print(f"Saved developer_detail_page.js ({len(dev_page_js)} bytes)")

# 2. Find the chunk that imports FeaturedDevelopers
idx = manifest.find('FeaturedDevelopers')
print("Surrounding FeaturedDevelopers:", manifest[max(0, idx-200):min(len(manifest), idx+300)])

# Find chunk for FeaturedDevelopers
# Let's search for "featured-developers" or "FeaturedDevelopers" in manifest
m = re.findall(r'(\./[A-Za-z0-9_-]+\.js)', manifest[max(0, idx-500):min(len(manifest), idx+500)])
print("Nearby JS files:", m)

for js_rel in m:
    url = 'https://cdn.propertypistol.com/_nuxt/' + js_rel.replace('./', '')
    try:
        req_c = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req_c, timeout=10) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            if '2,000+' in content or 'featured-developers' in content or 'FeaturedDevelopers' in content:
                print(f"FOUND FeaturedDevelopers IN {js_rel}!")
                with open('temp_inspect/featured_developers_chunk.js', 'w', encoding='utf-8') as f:
                    f.write(content)
    except Exception as e:
        pass
