with open('temp_inspect/all_sections.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in all_sections.txt: {len(lines)}")

# Print lines that contain class=, id=, or headings
for i, line in enumerate(lines):
    if any(tag in line for tag in ['<h1', '<h2', '<h3', '<h4', '<p', '<button', '<img']):
        print(f"L{i}: {line.strip()[:140]}")
