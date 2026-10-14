import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
from bs4 import BeautifulSoup

def dump_page_structure(url):
    print(f"\n==================== DUMPING {url} ====================")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    soup = BeautifulSoup(html, 'html.parser')
    
    # Remove script and style
    for s in soup(['script', 'style']):
        s.decompose()
        
    main = soup.find('main') or soup.find('body')
    if main:
        # Print sections
        for sec in main.find_all(['section', 'div'], recursive=False):
            print(f"Top element: <{sec.name} class='{sec.get('class')}' id='{sec.get('id')}'>")
            
        # Print all text lines that are non-empty
        lines = [line.strip() for line in main.get_text().splitlines() if line.strip()]
        print("\n--- Page Text Content (first 100 lines) ---")
        for line in lines[:100]:
            print(line)

dump_page_structure('https://www.propertypistol.com/rail-network/mumbai')
dump_page_structure('https://www.propertypistol.com/mumbai/price-trends')
