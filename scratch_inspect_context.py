import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
from bs4 import BeautifulSoup

def find_context():
    req = urllib.request.Request('https://www.propertypistol.com/mumbai', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    soup = BeautifulSoup(html, 'html.parser')
    
    sb = soup.find(class_='search-by-wrapper')
    if sb:
        print("=== Parent of search-by-wrapper ===")
        print(sb.parent.name, sb.parent.get('class'), sb.parent.get('id'))
        # Siblings
        prev_sib = sb.find_previous_sibling()
        next_sib = sb.find_next_sibling()
        print("Previous sibling:", prev_sib.name if prev_sib else None, prev_sib.get('class') if prev_sib else None)
        print("Next sibling:", next_sib.name if next_sib else None, next_sib.get('class') if next_sib else None)
        
    # Also check the Commute Modal #commuteSearch
    modal = soup.find(id='commuteSearch')
    if modal:
        print("\n=== commuteSearch Modal HTML ===")
        print(modal.prettify()[:1500])

find_context()
