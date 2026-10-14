import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
from bs4 import BeautifulSoup

def inspect_pages():
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    # 1. Rail network
    print("=== INSPECTING /rail-network/mumbai ===")
    try:
        req = urllib.request.Request('https://www.propertypistol.com/rail-network/mumbai', headers=headers)
        html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')
        soup = BeautifulSoup(html, 'html.parser')
        print("Title:", soup.title.string if soup.title else '')
        for h in soup.find_all(['h1', 'h2', 'h3', 'h4']):
            print(f"[{h.name}] {h.get_text(strip=True)[:80]}")
        # Find railway lines / tabs / stations
        lines = soup.find_all(class_=lambda c: c and any(k in c for k in ['line', 'station', 'tab', 'rail']))
        print("Line/Station elements:", len(lines))
        for l in lines[:10]:
            print(f"<{l.name} class='{l.get('class')}'> {l.get_text(strip=True)[:60]}")
    except Exception as e:
        print("Rail error:", e)

    # 2. Commute Modal
    print("\n=== COMMUTE MODAL SEARCH ===")
    try:
        req = urllib.request.Request('https://www.propertypistol.com/mumbai', headers=headers)
        html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')
        soup = BeautifulSoup(html, 'html.parser')
        c_modal = soup.find(id='commuteSearch') or soup.find(class_=lambda c: c and 'commute' in c)
        if c_modal:
            print("Modal found:", c_modal.prettify()[:1500])
        else:
            print("commuteSearch modal not in SSR, looking for commute scripts or links...")
    except Exception as e:
        print("Commute error:", e)

    # 3. Price Trends
    print("\n=== INSPECTING /mumbai/price-trends ===")
    try:
        req = urllib.request.Request('https://www.propertypistol.com/mumbai/price-trends', headers=headers)
        html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', errors='ignore')
        soup = BeautifulSoup(html, 'html.parser')
        print("Title:", soup.title.string if soup.title else '')
        for h in soup.find_all(['h1', 'h2', 'h3', 'h4']):
            print(f"[{h.name}] {h.get_text(strip=True)[:80]}")
        # Find price trend cards or tables or charts
        pt_blocks = soup.find_all(class_=lambda c: c and any(k in c for k in ['trend', 'chart', 'price', 'locality']))
        print("Price trend elements:", len(pt_blocks))
        for b in pt_blocks[:10]:
            print(f"<{b.name} class='{b.get('class')}'> {b.get_text(strip=True)[:60]}")
    except Exception as e:
        print("Price trends error:", e)

inspect_pages()
