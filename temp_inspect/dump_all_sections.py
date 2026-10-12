from bs4 import BeautifulSoup

with open('temp_inspect/home-inspection-services.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

main = soup.find(id='property-check')
with open('temp_inspect/all_sections.txt', 'w', encoding='utf-8') as out:
    if main:
        for i, child in enumerate(main.children):
            if hasattr(child, 'name') and child.name:
                out.write(f"\n==================== SECTION {i}: <{child.name} class='{child.get('class')}' id='{child.get('id')}'> ====================\n")
                out.write(child.prettify())
print("Saved to temp_inspect/all_sections.txt successfully")
