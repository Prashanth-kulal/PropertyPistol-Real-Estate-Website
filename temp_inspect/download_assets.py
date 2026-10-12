import urllib.request, os

os.makedirs('public/images/propcheck', exist_ok=True)

urls = [
    'https://cdn.propertypistol.com/images/service-hero-copy-1.svg',
    'https://cdn.propertypistol.com/images/service-hero-copy-2.svg',
    'https://cdn.propertypistol.com/images/prop-check.png',
    'https://cdn.propertypistol.com/images/sofa-prop-check.png',
    'https://cdn.propertypistol.com/images/blue-check.svg',
    'https://cdn.propertypistol.com/images/service-identify.png',
    'https://cdn.propertypistol.com/images/service-save.png',
    'https://cdn.propertypistol.com/images/service-ensure.png',
    'https://cdn.propertypistol.com/images/service-provide.png',
    'https://cdn.propertypistol.com/images/down-icon-faq.svg',
    # Try the relative ones on CDN
    'https://cdn.propertypistol.com/images/quality-check.jpg',
    'https://cdn.propertypistol.com/images/brand-check.jpg',
    'https://cdn.propertypistol.com/images/material-check.jpg',
    'https://cdn.propertypistol.com/images/dimension-check.jpg',
    'https://cdn.propertypistol.com/images/inspection-2.jpg',
    'https://cdn.propertypistol.com/images/sample-report-1.png',
    'https://cdn.propertypistol.com/images/sample-report-2.png',
    'https://cdn.propertypistol.com/images/sample-report-3.png',
    'https://cdn.propertypistol.com/images/sample-report-4.png',
    'https://cdn.propertypistol.com/images/sample-report-5.png',
    'https://cdn.propertypistol.com/images/sample-report-6.png',
    'https://cdn.propertypistol.com/images/sample-report-7.png',
    'https://cdn.propertypistol.com/images/sample-report-8.png',
]

headers = {'User-Agent': 'Mozilla/5.0'}

for u in urls:
    name = u.split('/')[-1]
    dest = os.path.join('public/images/propcheck', name)
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read()
            with open(dest, 'wb') as f:
                f.write(data)
            print(f"SUCCESS: {name} ({len(data)} bytes)")
    except Exception as e:
        print(f"FAILED: {name} -> {e}")
