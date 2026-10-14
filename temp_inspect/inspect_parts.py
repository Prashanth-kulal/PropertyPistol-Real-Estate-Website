with open('temp_inspect/featured_developers_chunk.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect sections of text
print("Length:", len(text))
import re
# Find all template strings or JSX / Vue render calls
for part in text.split(';'):
    if any(k in part for k in ['developers', 'roof', 'featured', 'logo', 'name', 'click', 'route', 'push', 'to:']):
        print("PART:", part.strip()[:300])
        print("---")
