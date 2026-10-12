import re, urllib.request

# Look for script chunks in temp_inspect/home-inspection-services.html
with open('temp_inspect/home-inspection-services.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
for s in scripts:
    if 'propertypistol' in s and '_nuxt' in s:
        print("Checking script:", s)
        try:
            req = urllib.request.Request(s, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                js = resp.read().decode('utf-8', errors='ignore')
                for m in re.finditer(r'2ff5c6d1', js):
                    start = max(0, m.start() - 200)
                    end = min(len(js), m.end() + 500)
                    print("Found 2ff5c6d1 in", s.split('/')[-1])
                    print(js[start:end])
        except Exception as e:
            print("Err:", e)
