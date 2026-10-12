from bs4 import BeautifulSoup

with open('temp_inspect/home-inspection-services.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

styles = soup.find_all('style')
print(f"Found {len(styles)} style tags in html")
for i, s in enumerate(styles):
    content = s.get_text()
    print(f"\n--- STYLE {i} (len: {len(content)}) ---")
    print(content[:500])
    with open(f'temp_inspect/style_{i}.css', 'w', encoding='utf-8') as sf:
        sf.write(content)
