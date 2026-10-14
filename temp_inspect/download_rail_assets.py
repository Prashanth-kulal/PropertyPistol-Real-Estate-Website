import urllib.request

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

files = [
    'B0EAXGNU.js',
    'C94PZxzk.js',
    'B4a6w2tk.js',
    'Dpci_t5-.js',
    'RailNetworkCard.B1fpsnjQ.css',
    'RailMapMumbai.Z1Ce36uP.css',
    'PopularStations.DGCOTd8k.css'
]

for f in files:
    try:
        url = f'https://cdn.propertypistol.com/_nuxt/{f}'
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print(f"Downloaded {f}: {len(content)} bytes")
            with open(f'c:/Users/prashanth/PropertyPistolProject/temp_inspect/{f}', 'w', encoding='utf-8') as out:
                out.write(content)
    except Exception as e:
        print(f"Failed {f}: {e}")
