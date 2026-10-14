with open('c:/Users/prashanth/PropertyPistolProject/temp_inspect/CYKV45v4.js', 'r', encoding='utf-8') as f:
    cy = f.read()

# Let's inspect the methods and template in CYKV45v4.js
print("Length of CYKV45v4.js:", len(cy))
import re

# Find strings
strings = re.findall(r'["\']([^"\']{4,80})["\']', cy)
print("Strings in CYKV45v4.js:")
for s in strings:
    if not s.startswith('M') and not s.startswith('http'):
        print("  ", s)
