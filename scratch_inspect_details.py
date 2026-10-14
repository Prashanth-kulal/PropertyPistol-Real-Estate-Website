import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
from bs4 import BeautifulSoup

def inspect_details():
    req = urllib.request.Request('https://www.propertypistol.com/mumbai', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    soup = BeautifulSoup(html, 'html.parser')
    
    # 1. Inspect railway-commute
    rw = soup.find(class_='railway-commute')
    if rw:
        print("=== railway-commute HTML ===")
        print(rw.prettify())
        parent = rw.parent
        print("=== railway-commute PARENT ===")
        print(f"Parent: <{parent.name} class='{parent.get('class')}' id='{parent.get('id')}'>")
        # Find adjacent siblings or section
        sec = rw.find_parent('section')
        if sec:
            print("=== Section of railway-commute ===")
            print(f"Section id: {sec.get('id')}, class: {sec.get('class')}")
    else:
        print("railway-commute not found by class, searching for text...")
        for el in soup.find_all(string=lambda t: t and 'rail network' in t.lower()):
            print("Found text:", el.parent)

    # 2. Inspect Price Trends link location in nav
    pt = soup.find('a', href=lambda h: h and 'price-trends' in h)
    if pt:
        print("\n=== Price Trends Link Parent ===")
        print(pt.find_parent('ul') or pt.parent)

inspect_details()
