from bs4 import BeautifulSoup

with open('temp_inspect/pp_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

h2 = soup.find(lambda tag: tag.name == 'h2' and '2,000+ developers' in tag.get_text().lower())
if h2:
    print("Found H2:", h2)
    # Print the immediate section/container containing h2
    p = h2
    while p and p.name not in ['section', 'body']:
        if p.name == 'div' and ('section' in ' '.join(p.get('class', [])) or 'holder' in ' '.join(p.get('class', [])) or 'developer' in ' '.join(p.get('class', []))):
            break
        p = p.parent
    
    print("\n--- Immediate Developer Container ---")
    print(p.prettify()[:4000])
