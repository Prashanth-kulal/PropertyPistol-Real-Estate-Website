import urllib.request

img_url = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85"
out_path = "public/images/global-architecture-skyline.jpg"

print("Downloading global architecture image from:", img_url)
req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
with urllib.request.urlopen(req, timeout=15) as resp:
    data = resp.read()
    with open(out_path, "wb") as f:
        f.write(data)
    print(f"Downloaded {out_path}, size: {len(data)} bytes")
