from bs4 import BeautifulSoup
import json

with open('temp_inspect/all_sections.txt', 'r', encoding='utf-8') as f:
    text = f.read()

soup = BeautifulSoup(text, 'html.parser')

sections = []

# Hero wrapper
hero = soup.find('div', class_='hero-wrapper')
if hero:
    h_info = {
        'name': 'Hero Section',
        'h1': hero.find('h1').get_text(strip=True) if hero.find('h1') else '',
        'h2': hero.find('h2').get_text(strip=True) if hero.find('h2') else '',
        'description': [p.get_text(strip=True) for p in hero.find_all('p')],
        'bullets': [],
        'images': [img.get('src') for img in hero.find_all('img')]
    }
    for b in hero.find_all(class_='hero-bullet'):
        h_info['bullets'].append({
            'title': b.find('h3').get_text(strip=True) if b.find('h3') else '',
            'subtitle': b.find('p').get_text(strip=True) if b.find('p') else ''
        })
    sections.append(h_info)

# Container fluid (What does Home Inspection cover?)
c_fluid = soup.find('div', class_='container-fluid')
if c_fluid:
    # Services / Scope cards
    scope_cards = []
    for card in c_fluid.find_all(class_=lambda c: c and ('card' in c or 'service' in c or 'item' in c)):
        title = card.find(['h3', 'h4', 'h5', 'h6'])
        p = card.find('p')
        img = card.find('img')
        if title or p:
            scope_cards.append({
                'title': title.get_text(strip=True) if title else '',
                'desc': p.get_text(strip=True) if p else '',
                'img': img.get('src') if img else ''
            })
    sections.append({
        'name': 'What does Home Inspection Cover / Scope Cards',
        'cards': scope_cards
    })

    # Services section (Identify Hidden Problems, Save Time & Money, Ensure Safety, Provide Negotiation Leverage)
    services_sec = c_fluid.find('div', class_='services-section')
    if services_sec:
        s_items = []
        for s in services_sec.find_all(class_='services-container'):
            stitle = s.find(class_='services-title')
            scopy = s.find(class_='services-copy')
            simg = s.find('img')
            s_items.append({
                'title': stitle.get_text(strip=True) if stitle else '',
                'copy': scopy.get_text(strip=True) if scopy else '',
                'img': simg.get('src') if simg else ''
            })
        sections.append({
            'name': 'Key Benefits / Services Section',
            'items': s_items
        })

    # Sample reports
    sample_imgs = [img.get('src') for img in c_fluid.find_all('img') if 'sample-report' in str(img.get('src'))]
    sections.append({
        'name': 'Sample Inspection Reports Gallery',
        'images': sample_imgs
    })

    # FAQs
    faq_items = []
    faq_sec = c_fluid.find('div', class_='faq-section')
    if faq_sec:
        for card in faq_sec.find_all(class_='card'):
            header = card.find(class_='card-header')
            body = card.find(class_='card-body')
            q = header.get_text(strip=True) if header else ''
            a = body.get_text(strip=True) if body else ''
            if q and a:
                faq_items.append({'q': q, 'a': a})
        sections.append({
            'name': 'FAQs Section',
            'faqs': faq_items
        })

with open('temp_inspect/detailed_summary.json', 'w', encoding='utf-8') as out:
    json.dump(sections, out, indent=2, ensure_ascii=False)

print("Parsed sections summary successfully!")
