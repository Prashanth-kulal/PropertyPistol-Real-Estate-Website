import urllib.request

urls = [
    'http://localhost:3000/',
    'http://localhost:3000/developers',
    'http://localhost:3000/developers/godrej-properties',
    'http://localhost:3000/developers/lodha-group',
    'http://localhost:3000/developers/lt-realty',
    'http://localhost:3000/projects/godrej-ascend'
]

print("--- Testing Routes ---")
for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read()
            print(f"SUCCESS: {u} -> Status: {resp.status}, Size: {len(content)} bytes")
    except Exception as e:
        print(f"FAILED: {u} -> {e}")
