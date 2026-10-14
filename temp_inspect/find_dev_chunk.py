import re, os, glob

# Search in existing js files in temp_inspect
for jsfile in glob.glob('temp_inspect/*.js'):
    with open(jsfile, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        if '9a742235' in content or 'featured-developers' in content or '2,000+' in content:
            print("Found in", jsfile)

# Let's search pp_homepage.html for all script tags
from bs4 import BeautifulSoup
with open('temp_inspect/pp_homepage.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

scripts = [s.get('src') for s in soup.find_all('script') if s.get('src')]
print(f"Total scripts: {len(scripts)}")
for s in scripts:
    if '_nuxt' in s:
        print(s)
