import json

with open('temp_inspect/godrej_mumbai_projects.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for p in data['projects']:
    print(f"Project: {p['title']} | Region: {p['region_name']}, {p['region']} | Price: {p['price']} | Typology: {p['details']} | Carpet: {p['carpet_area']}")
