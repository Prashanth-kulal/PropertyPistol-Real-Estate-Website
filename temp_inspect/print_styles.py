for s_num in [11, 14, 16, 17]:
    print(f"\n==================== STYLE {s_num} ====================")
    with open(f'temp_inspect/style_{s_num}.css', 'r', encoding='utf-8') as f:
        print(f.read())
