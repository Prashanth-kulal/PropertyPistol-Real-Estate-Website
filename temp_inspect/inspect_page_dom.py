from bs4 import BeautifulSoup

with open('temp_inspect/home-inspection-services.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

scripts = [s.get('src') for s in soup.find_all('script') if s.get('src')]
print("Scripts in home-inspection-services.html:")
for s in scripts:
    print("->", s)

# Let's inspect the main container text and structure
main = soup.find(id='property-check')
if main:
    print("\n--- SECTIONS inside #property-check ---")
    for child in main.find_all(recursive=False):
        print(f"Child: tag={child.name}, class={child.get('class')}, id={child.get('id')}")
        # print first 150 chars of text
        txt = ' '.join(child.get_text().split())
        print(f"   Text: {txt[:150]}")
