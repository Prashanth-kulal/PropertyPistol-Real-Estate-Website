import re

with open('c:/Users/prashanth/PropertyPistolProject/temp_inspect/B0EAXGNU.js', 'r', encoding='utf-8') as f:
    js = f.read()

print("B0EAXGNU.js length:", len(js))
strings = re.findall(r'["\']([^"\']{2,120})["\']', js)
for s in strings:
    print(" ", s)
