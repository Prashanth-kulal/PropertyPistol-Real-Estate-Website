import urllib.request, re, json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for c in ['CMSgNtp4.js', 'DfHgMymb.js', 'CYKV45v4.js']:
    try:
        url = f'https://cdn.propertypistol.com/_nuxt/{c}'
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print(f"Downloaded {c}: length {len(content)}")
            with open(f'temp_inspect/{c}', 'w', encoding='utf-8') as f:
                f.write(content)
    except Exception as e:
        print(f"Failed {c}:", e)
