from bs4 import BeautifulSoup

with open('temp_ask_ai.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print('=== HEADER-AI ===')
header = soup.find('header', class_='header-ai')
if header:
    print(header.prettify())

print('\n=== ASK-AI-PAGE FULL PRETTY ===')
page = soup.find('div', class_='ask-ai-page')
if page:
    # print without script tags
    for s in page.find_all('script'):
        s.decompose()
    print(page.prettify()[:4000])

print('\n=== BOTTOM INPUT AREA ===')
input_area = soup.find('div', class_=lambda c: c and any(k in str(c) for k in ['search-wrapper', 'input', 'footer', 'chat-input', 'area-input']))
if input_area:
    print(input_area.prettify()[:2000])
