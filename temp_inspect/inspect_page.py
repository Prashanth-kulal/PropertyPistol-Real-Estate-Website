import urllib.request
import re
from bs4 import BeautifulSoup

url = 'https://www.propertypistol.com/e-registration'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

soup = BeautifulSoup(html, 'html.parser')

print("All JS script tags:")
for s in soup.find_all('script'):
    src = s.get('src', '')
    if src:
        print(src)

# Let's check inline scripts
for s in soup.find_all('script'):
    if not s.get('src') and s.string:
        if 'rental' in s.string or 'Get Started' in s.string or 'Owner' in s.string:
            print("Found inline script snippet:", s.string[:500])
