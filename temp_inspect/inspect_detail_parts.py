with open('temp_inspect/developer_detail_component.js', 'r', encoding='utf-8') as f:
    text = f.read()

print("Developer Detail JS Length:", len(text))
for part in text.split(';'):
    if any(k in part.lower() for k in ['breadcrumb', 'developer', 'project', 'filter', 'sort', 'contact', 'enquiry', 'lead', 'phone', 'rera', 'location', 'price', 'bhk', 'count']):
        print("DETAIL PART:", part.strip()[:400])
        print("-" * 40)
