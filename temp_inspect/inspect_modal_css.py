from bs4 import BeautifulSoup
import re, urllib.request

with open('temp_inspect/home-inspection-services.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

modal = soup.find(id='inspectionModal')
print("--- MODAL HTML ---")
if modal:
    print(modal.prettify()[:1000])
else:
    print("Modal not found by id 'inspectionModal'")

# Look for all forms or modal in html
print("--- ALL MODALS OR FORMS ---")
for m in soup.find_all(class_=lambda c: c and ('modal' in c or 'form' in c or 'popup' in c)):
    print("Element:", m.name, m.get('class'), m.get('id'))
    print(m.prettify()[:500])

# Inspect CSS
css_url = 'https://cdn.propertypistol.com/_nuxt/propcheck.C5A_SQ1J.css'
try:
    req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        css = resp.read().decode('utf-8', errors='ignore')
        with open('temp_inspect/propcheck.css', 'w', encoding='utf-8') as f:
            f.write(css)
        print("\nDownloaded propcheck.css, length:", len(css))
        # Find selectors
        selectors = re.findall(r'(\.[a-zA-Z0-9_\-]+)\s*\{', css)
        print("CSS classes sample:", list(set(selectors))[:30])
except Exception as e:
    print("Error fetching CSS:", e)
