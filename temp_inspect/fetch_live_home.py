import urllib.request
from bs4 import BeautifulSoup

url = 'https://www.propertypistol.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')

soup = BeautifulSoup(html, 'html.parser')

print("Page Title:", soup.title.string if soup.title else "No title")

# Find all script tags
scripts = []
for s in soup.find_all('script'):
    src = s.get('src')
    if src:
        scripts.append(src)
print("Scripts found:", len(scripts))
for s in scripts:
    print(s)

with open('temp_inspect/live_homepage.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Saved live_homepage.html")
