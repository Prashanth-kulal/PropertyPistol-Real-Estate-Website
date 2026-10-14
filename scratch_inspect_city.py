import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re
from bs4 import BeautifulSoup

def search_terms(url):
    print("=== SEARCHING IN:", url, "===")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')
        soup = BeautifulSoup(html, 'html.parser')
        
        # Look for any elements mentioning Price Trends, Rail, Commute, PropCheck
        for tag in soup.find_all(True):
            cls = " ".join(tag.get('class', [])) if isinstance(tag.get('class'), list) else str(tag.get('class', ''))
            id_attr = tag.get('id', '')
            text = tag.get_text(strip=True)
            href = tag.get('href', '')
            
            if tag.name == 'a' and any(k in href.lower() or k in text.lower() for k in ['price-trend', 'rail', 'commute', 'propcheck']):
                print(f"<a> link: text='{text[:40]}' href='{href}' class='{cls}' id='{id_attr}'")
                
            if any(k in cls.lower() or k in id_attr.lower() for k in ['rail', 'commute', 'price-trend', 'propcheck']):
                print(f"<{tag.name}> match class/id: class='{cls}' id='{id_attr}' text='{text[:60]}'")
                
        # Also look for section surrounding PropCheck
        propcheck_els = soup.find_all(string=re.compile(r'PropCheck', re.I))
        for p in propcheck_els:
            par = p.find_parent('section') or p.find_parent('div', class_=re.compile(r'container|section|row', re.I))
            if par:
                print("\n--- PropCheck Container ---")
                print(par.prettify()[:1000])

    except Exception as e:
        print("Error:", e)

search_terms("https://www.propertypistol.com/mumbai")
search_terms("https://www.propertypistol.com/")
search_terms("https://www.propertypistol.com/rail-network/mumbai")
search_terms("https://www.propertypistol.com/mumbai/price-trends")
