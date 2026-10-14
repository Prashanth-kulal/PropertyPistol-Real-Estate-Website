import jsbeautifier

opts = jsbeautifier.default_options()
opts.indent_size = 2

with open('temp_inspect/featured_developers_chunk.js', 'r', encoding='utf-8') as f:
    feat_beautified = jsbeautifier.beautify(f.read(), opts)

with open('temp_inspect/featured_developers_chunk.formatted.js', 'w', encoding='utf-8') as f:
    f.write(feat_beautified)

with open('temp_inspect/developer_detail_component.js', 'r', encoding='utf-8') as f:
    dev_beautified = jsbeautifier.beautify(f.read(), opts)

with open('temp_inspect/developer_detail_component.formatted.js', 'w', encoding='utf-8') as f:
    f.write(dev_beautified)

print("Formatted both files successfully!")
