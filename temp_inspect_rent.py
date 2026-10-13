import urllib.request
from bs4 import BeautifulSoup
import re

req = urllib.request.Request(
    'https://www.propertypistol.com/',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
)

with urllib.request.urlopen(req, timeout=15) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

soup = BeautifulSoup(html, 'html.parser')

# Find every element containing "Rent Agreement"
print("--- SEARCH FOR 'Rent Agreement' IN HOMEPAGE ---")
for el in soup.find_all(string=re.compile(r'rent\s*agreement', re.I)):
    parent = el.parent
    print(f"Tag: <{parent.name}> Text: {el.strip()!r}")
    print(f"Parent HTML: {parent.prettify()[:300]}")
    grandparent = parent.parent
    if grandparent:
        print(f"Grandparent tag: <{grandparent.name}> class={grandparent.get('class')}")
    print("-" * 50)
