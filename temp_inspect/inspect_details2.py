import re

with open('c:/Users/prashanth/PropertyPistolProject/temp_inspect/CYKV45v4.js', 'r', encoding='utf-8') as f:
    cy = f.read()

print("=== CYKV45v4.js structure ===")
# Find all template strings or jsx/render calls in CYKV45v4.js
for match in re.finditer(r'<[a-zA-Z0-9\-]+[^>]*>', cy):
    tag = match.group(0)
    if 'svg' not in tag and 'path' not in tag:
        print("TAG in CY:", tag[:100])

print("\n=== CMSgNtp4.js preview ===")
with open('c:/Users/prashanth/PropertyPistolProject/temp_inspect/CMSgNtp4.js', 'r', encoding='utf-8') as f:
    cm = f.read()
print("CMSgNtp4.js length:", len(cm))
# print first 500 chars and last 500 chars
print("Head:", cm[:300])
print("Tail:", cm[-300:])

print("\n=== DfHgMymb.js preview ===")
with open('c:/Users/prashanth/PropertyPistolProject/temp_inspect/DfHgMymb.js', 'r', encoding='utf-8') as f:
    df = f.read()
print("DfHgMymb.js length:", len(df))
print("Head:", df[:300])
print("Tail:", df[-300:])
