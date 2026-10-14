with open('temp_inspect/featured_developers_chunk.js', 'r', encoding='utf-8') as f:
    feat_js = f.read()

print("=== FEATURED DEVELOPERS CHUNK ===")
print(feat_js)

print("\n" + "="*50 + "\n")

with open('temp_inspect/developer_detail_component.js', 'r', encoding='utf-8') as f:
    dev_js = f.read()

print("=== DEVELOPER DETAIL PAGE COMPONENT ===")
print(dev_js)
