import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
from bs4 import BeautifulSoup

def print_search_box():
    req = urllib.request.Request('https://www.propertypistol.com/mumbai', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    soup = BeautifulSoup(html, 'html.parser')
    
    sbox = soup.find(class_='search-box')
    if sbox:
        print("=== search-box HTML ===")
        # print child divs
        for c in sbox.children:
            if hasattr(c, 'name') and c.name:
                print(f"Child: <{c.name} class='{c.get('class')}'>")
        sb_wrap = sbox.find(class_='search-by-wrapper')
        if sb_wrap:
            print("\n=== search-by-wrapper HTML ===")
            print(sb_wrap.prettify())

print_search_box()
