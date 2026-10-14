with open('temp_inspect/live_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
idx = html.find('apiBase')
print("apiBase index:", idx)
if idx != -1:
    print(html[max(0, idx-100):min(len(html), idx+150)])

# Find any API endpoints
for m in re.finditer(r'https?://[a-zA-Z0-9.-]*api[a-zA-Z0-9.-]*', html):
    print("Found URL:", m.group(0))

# Also search for "builders" in html
for m in re.finditer(r'builders', html):
    print("builders match:", html[max(0, m.start()-50):min(len(html), m.end()+100)])
