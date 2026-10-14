import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request('https://www.propertypistol.com/rail-network/mumbai', headers=headers)
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')
soup = BeautifulSoup(html, 'html.parser')

scripts = [s.get('src') for s in soup.find_all('script') if s.get('src')]
print(f"Found {len(scripts)} script tags:")
for s in scripts:
    print(s)

# Fetch scripts to look for rail-network component and commuteSearch
for s in scripts:
    if any(k in s.lower() for k in ['app', 'entry', 'rail', 'commute', 'city', 'search', 'page']):
        full_url = s if s.startswith('http') else 'https://www.propertypistol.com' + s
        try:
            print("Checking script:", full_url)
            js = urllib.request.urlopen(urllib.request.Request(full_url, headers=headers), timeout=10).read().decode('utf-8', errors='ignore')
            if 'commutesearch' in js.lower() or 'commute' in js.lower():
                print("  --> Commute mentions in:", s)
                matches = re.findall(r'(.{0,100}commuteSearch.{0,200})', js, re.I)
                for m in matches[:5]:
                    print("     ", m)
            if 'rail-network' in js.lower() or 'station' in js.lower():
                print("  --> Rail mentions in:", s)
                matches = re.findall(r'(.{0,100}(?:rail-network|popularStations|stationList).{0,200})', js, re.I)
                for m in matches[:5]:
                    print("     ", m)
        except Exception as e:
            print("  Error:", e)
