import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re
from bs4 import BeautifulSoup

def inspect_scripts(url):
    print("=== INSPECTING SCRIPTS/DATA FOR:", url, "===")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    soup = BeautifulSoup(html, 'html.parser')
    
    # Look for stations or lines in script
    for s in soup.find_all('script'):
        text = s.string or ''
        if 'station' in text.lower() or 'line' in text.lower() or 'price' in text.lower():
            # Find snippets
            matches = re.findall(r'(\{[^{}]*(?:station|railway|trend|locality)[^{}]*\})', text, re.I)
            if matches:
                print(f"Found {len(matches)} data objects in script:")
                for m in matches[:5]:
                    print("  ", m[:120])
                    
    # Also find buttons or links with stations
    for a in soup.find_all('a'):
        href = a.get('href', '')
        if 'station' in href.lower() or 'railway' in href.lower():
            print("Station link:", a.get_text(strip=True), "->", href)

inspect_scripts('https://www.propertypistol.com/rail-network/mumbai')
print("---")
inspect_scripts('https://www.propertypistol.com/mumbai/price-trends')
