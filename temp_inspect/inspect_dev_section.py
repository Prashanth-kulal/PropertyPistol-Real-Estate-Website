import re
from bs4 import BeautifulSoup

with open('temp_inspect/pp_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print('--- All Headings on Homepage ---')
for tag in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5']):
    text = ' '.join(tag.get_text().split())
    if text:
        print(f"<{tag.name} class='{tag.get('class')}'>: {text}")

print('\n--- All Sections / Containers with developer/partner/builder ---')
for tag in soup.find_all(attrs={'class': True}):
    classes = ' '.join(tag.get('class', []))
    if any(k in classes.lower() for k in ['developer', 'builder', 'partner']):
        print(f"Tag <{tag.name} class='{classes}'> ID={tag.get('id')}")
        print(f"  Snippet: {tag.prettify()[:400]}")

print('\n--- All Links with /developer or similar ---')
for a in soup.find_all('a', href=True):
    href = a['href']
    if any(k in href.lower() for k in ['developer', 'builder']):
        print(f"Link: href='{href}' text='{a.get_text(strip=True)}'")
