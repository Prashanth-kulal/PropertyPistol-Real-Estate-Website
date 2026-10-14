import json, re

def inspect_file(filename):
    print(f"\n==================== {filename} ====================")
    with open(f'c:/Users/prashanth/PropertyPistolProject/temp_inspect/{filename}', 'r', encoding='utf-8') as f:
        content = f.read()
    
    classes = set(re.findall(r'class[=:]\s*["\']([^"\']+)["\']', content))
    print("Classes found:", len(classes))
    for c in list(classes)[:15]:
        print("  class:", c)
        
    ids = set(re.findall(r'id[=:]\s*["\']([^"\']+)["\']', content))
    print("IDs found:", ids)

    svg_snippets = re.findall(r'(.{0,60}<(?:svg|path|circle|line|text|g)[^>]*>.{0,60})', content)
    print("SVG snippets:", len(svg_snippets))
    for s in svg_snippets[:8]:
        print("  SVG:", s.strip())

    stations = re.findall(r'(\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Railway Station\b)', content)
    if stations:
        print("Found stations:", set(stations))
        
    texts = re.findall(r'["\']([A-Z][a-zA-Z\s0-9]{3,40})["\']', content)
    interesting = [t for t in texts if any(k in t.lower() for k in ['rail', 'map', 'station', 'network', 'line', 'commute', 'western', 'central', 'harbour', 'metro', 'zoom', 'card'])]
    print("Interesting text phrases:", set(interesting))

inspect_file('CMSgNtp4.js')
inspect_file('DfHgMymb.js')
inspect_file('CYKV45v4.js')
