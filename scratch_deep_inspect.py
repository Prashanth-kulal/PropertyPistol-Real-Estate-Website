import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def fetch_soup(url):
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')
    return BeautifulSoup(html, 'html.parser'), html

print("=== 1. COMMUTE TIME MODAL / COMPONENT INSPECTION ===")
soup, html = fetch_soup('https://www.propertypistol.com/mumbai')

# Look for commute in the HTML
commute_matches = soup.find_all(lambda tag: tag.has_attr('id') and 'commute' in tag['id'].lower() or any('commute' in c.lower() for c in tag.get('class', [])))
print(f"Found {len(commute_matches)} tags with commute in id/class:")
for tag in commute_matches:
    print(f"<{tag.name} id='{tag.get('id')}' class='{tag.get('class')}'>")
    if tag.get('id') == 'commuteSearch' or 'modal' in str(tag.get('class', [])):
        print(tag.prettify()[:2000])

# Search for commute in script tags
scripts = soup.find_all('script')
for s in scripts:
    text = s.string or ''
    if 'commutesearch' in text.lower() or 'commute' in text.lower():
        # find references to commute
        for line in text.splitlines():
            if 'commute' in line.lower() and len(line.strip()) < 300:
                print("Script line:", line.strip())

print("\n=== 2. RAIL NETWORK PAGE MAP INSPECTION ===")
rail_soup, rail_html = fetch_soup('https://www.propertypistol.com/rail-network/mumbai')

# Look for map, iframe, leaflet, mapbox, google, svg, canvas
map_tags = rail_soup.find_all(lambda tag: any(k in str(tag.get('class', [])).lower() or k in str(tag.get('id', '')).lower() for k in ['map', 'leaflet', 'station', 'route', 'line', 'network']))
print(f"Found {len(map_tags)} map-related tags on /rail-network/mumbai:")
for t in map_tags[:15]:
    print(f"<{t.name} id='{t.get('id')}' class='{t.get('class')}'> text: {t.get_text(strip=True)[:60]}")

# Look for map libraries or scripts on rail-network
rail_scripts = rail_soup.find_all('script')
for s in rail_scripts:
    src = s.get('src', '')
    if any(k in src.lower() for k in ['map', 'leaflet', 'openstreet', 'google', 'transit']):
        print("Map script src:", src)
    stext = s.string or ''
    if any(k in stext.lower() for k in ['map', 'coordinates', 'lat', 'lng', 'polyline', 'geojson', 'stations']):
        matches = re.findall(r'(\b(?:map|station|line|marker|coordinate)[^;]{10,80})', stext, re.I)
        if matches:
            print("Script matches:", matches[:5])
