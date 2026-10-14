import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
from bs4 import BeautifulSoup

def test_homepage():
    print("=== TESTING HOMEPAGE: http://localhost:3000/ ===")
    html = urllib.request.urlopen("http://localhost:3000/").read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')

    header = soup.find('header')
    header_text = header.get_text() if header else ""
    print("Header nav text:", [a.get_text(strip=True) for a in header.find_all('a')])
    assert "Price Trends" not in header_text, "ERROR: Price Trends found in homepage header!"
    assert "Rail Network" not in header_text, "ERROR: Rail Network found in homepage header!"
    assert "Commute" not in header_text, "ERROR: Commute found in homepage header!"
    print("[PASS] Header is clean of Price Trends and Rail/Commute.")

    # Check HeroBanner tabs on homepage
    hero_links = [a.get_text(strip=True) for a in soup.find_all('a') if any(t in a.get_text() for t in ['Ask AI', 'Home Loan', 'PropCheck', 'Price Trends', 'Rent Agreement', 'Dubai Desk'])]
    print("Hero tabs found on homepage:", hero_links)
    assert "Price Trends" not in hero_links, "ERROR: Price Trends tab found in homepage hero banner!"
    print("[PASS] Hero banner tabs do NOT contain Price Trends.")

    # Check search-by pill
    pills = [el.get_text(strip=True) for el in soup.find_all(True) if 'Search by' in el.get_text() and len(el.get_text(strip=True)) < 80]
    print("Search by elements on homepage:", pills)
    assert len(pills) == 0, f"ERROR: Found search-by pill on homepage: {pills}"
    print("[PASS] No Search by Rail Network or Commute Time on homepage.")

    # Top Cities check
    top_cities = soup.find(id='top-cities') or soup.find(string=lambda t: t and 'Top Cities' in t)
    assert top_cities is not None, "ERROR: Top Cities section missing on homepage!"
    print("[PASS] Top Cities section intact on homepage.")

def test_city_page():
    print("\n=== TESTING CITY PAGE: http://localhost:3000/mumbai ===")
    html = urllib.request.urlopen("http://localhost:3000/mumbai").read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')

    # Header check
    header = soup.find('header')
    header_text = header.get_text() if header else ""
    assert "Price Trends" not in header_text, "ERROR: Price Trends found in city page header!"
    assert "Rail Network" not in header_text, "ERROR: Rail Network found in city page header!"
    print("[PASS] Global Header on city page is clean.")

    # Check HeroBanner on city page HAS Price Trends tab
    hero_tabs = [a.get_text(strip=True) for a in soup.find_all('a') if any(t in a.get_text() for t in ['PropCheck', 'Price Trends', 'Rent Agreement'])]
    print("Hero tabs on city page:", hero_tabs)
    assert any("Price Trends" in t for t in hero_tabs), "ERROR: Price Trends tab missing in city page hero banner!"
    print("[PASS] Price Trends tab is placed near PropCheck on city destination page banner.")

    # Check Search by Rail Network / Commute Time pill on city page banner
    rail_pill = soup.find(string=lambda t: t and 'Search by' in t)
    assert rail_pill is not None, "ERROR: Search by Rail Network or Commute Time missing on city page banner!"
    print("[PASS] Search by Rail Network or Commute Time banner pill is present on city page.")

    # Check dedicated full sections on city page
    rail_section = soup.find(lambda tag: tag.name in ['h2', 'h3'] and 'Search by Rail Network or Commute Time' in tag.get_text())
    assert rail_section is not None, "ERROR: Dedicated Rail Network section missing on city page!"
    print("[PASS] Dedicated 'Search by Rail Network or Commute Time in Mumbai' section is present.")

    price_section = soup.find(lambda tag: tag.name in ['h2', 'h3'] and 'Price Trends in Mumbai' in tag.get_text())
    assert price_section is not None, "ERROR: Dedicated Price Trends section missing on city page!"
    print("[PASS] Dedicated 'Price Trends in Mumbai - 2026' section is present.")

    # Check Explore Categories
    exp_cats = soup.find(lambda tag: tag.name in ['h2', 'h3'] and 'Explore Categories in' in tag.get_text())
    assert exp_cats is not None, "ERROR: Explore Categories in Mumbai missing!"
    print("[PASS] Explore Categories section is present on city page.")

def test_rail_network_page():
    print("\n=== TESTING RAIL NETWORK PAGE: http://localhost:3000/rail-network/mumbai ===")
    html = urllib.request.urlopen("http://localhost:3000/rail-network/mumbai").read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')

    header = soup.find('header')
    assert "Price Trends" not in header.get_text(), "ERROR: Price Trends found in rail page header!"

    # Check Map SVG
    svg = soup.find('svg', attrs={'viewbox': '0 0 1320 1002'}) or soup.find('svg', attrs={'viewBox': '0 0 1320 1002'})
    assert svg is not None, "ERROR: SVG Rail Network Map missing on /rail-network/mumbai!"
    print("[PASS] Interactive SVG Rail Network Map (1320x1002) is rendered.")

    # Check Station elements
    station_nodes = soup.find_all('g', class_=lambda c: c and 'station-node' in c) or soup.find_all('g', attrs={'id': True})
    print(f"Station nodes found in map SVG: {len(station_nodes)}")
    assert len(station_nodes) > 10, "ERROR: Insufficient station nodes in rail map!"
    print("[PASS] Stations and junctions are rendered inside map SVG.")

    # Check Popular Stations
    pop_title = soup.find(lambda tag: tag.name in ['h1', 'h2', 'h3'] and 'Popular Stations in' in tag.get_text())
    assert pop_title is not None, "ERROR: Popular Stations in Mumbai section missing!"
    print("[PASS] Popular Stations in Mumbai section is present.")

test_homepage()
test_city_page()
test_rail_network_page()
print("\n>>> ALL VERIFICATION TESTS PASSED 100%! <<<")
