import os
import json
import urllib.request
from io import BytesIO
from PIL import Image
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def get_all_chennai_images():
    manifest_path = "chennai-processed-images-manifest.json"
    with open(manifest_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    queue = []
    # 1. Images from manifest (156 projects)
    for pid, pdata in data.get("projects", {}).items():
        for img in pdata.get("images", []):
            rel_path = img.get("path", "").lstrip("/")
            dest = os.path.join("public", rel_path)
            url = img.get("originalUrl")
            if url and dest:
                queue.append({
                    "pid": pid,
                    "filename": img.get("filename"),
                    "url": url,
                    "dest": dest
                })

    # 2. Add the 3 missing projects
    extra_images = [
        # 19266
        {
            "pid": "19266",
            "filename": "cover.jpg",
            "url": "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/147770/original/pixelcut-export_%2819%29.jpg?1744713104",
            "dest": os.path.join("public", "projects", "19266", "cover.jpg")
        },
        {
            "pid": "19266",
            "filename": "gallery-1.jpg",
            "url": "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/147771/original/pixelcut-export_%2818%29.jpg?1744713105",
            "dest": os.path.join("public", "projects", "19266", "gallery-1.jpg")
        },
        # 18414
        {
            "pid": "18414",
            "filename": "cover.jpg",
            "url": "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/146598/original/download_%2861%29.png?1766994844",
            "dest": os.path.join("public", "projects", "18414", "cover.jpg")
        },
        {
            "pid": "18414",
            "filename": "gallery-1.jpg",
            "url": "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/158148/original/download_%2860%29.png?1766994844",
            "dest": os.path.join("public", "projects", "18414", "gallery-1.jpg")
        },
        # 18675
        {
            "pid": "18675",
            "filename": "cover.jpg",
            "url": "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/140805/original/project1new1.png?1743004659",
            "dest": os.path.join("public", "projects", "18675", "cover.jpg")
        },
        {
            "pid": "18675",
            "filename": "gallery-1.jpg",
            "url": "https://s3.ap-south-1.amazonaws.com/website-prod-public/home/ubuntu/pp-website/public/assets/images/140806/original/project2new2.png?1743004660",
            "dest": os.path.join("public", "projects", "18675", "gallery-1.jpg")
        }
    ]

    queue.extend(extra_images)
    return queue

def download_and_save(item):
    url = item["url"]
    dest = item["dest"]

    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        return ("cached", dest, os.path.getsize(dest))

    os.makedirs(os.path.dirname(dest), exist_ok=True)

    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
        )
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = resp.read()

        if len(data) < 200:
            return ("error_small", dest, len(data))

        # Open and process with PIL
        img = Image.open(BytesIO(data))
        if img.mode in ("RGBA", "P"):
            rgb_img = Image.new("RGB", img.size, (255, 255, 255))
            if img.mode == "RGBA":
                rgb_img.paste(img, mask=img.split()[3])
            else:
                rgb_img.paste(img)
            img = rgb_img
        elif img.mode != "RGB":
            img = img.convert("RGB")

        # Resize if huge (> 1920)
        max_dim = 1920
        if img.width > max_dim or img.height > max_dim:
            img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)

        img.save(dest, "JPEG", quality=85, optimize=True)
        return ("downloaded", dest, os.path.getsize(dest))

    except Exception as e:
        return ("error", dest, str(e))

def main():
    queue = get_all_chennai_images()
    print(f"Total images in download queue: {len(queue)}")

    t0 = time.time()
    success_count = 0
    cached_count = 0
    error_count = 0
    errors = []

    with ThreadPoolExecutor(max_workers=16) as executor:
        futures = {executor.submit(download_and_save, item): item for item in queue}
        done = 0
        for f in as_completed(futures):
            done += 1
            status, dest, info = f.result()
            if status == "downloaded":
                success_count += 1
            elif status == "cached":
                cached_count += 1
            else:
                error_count += 1
                errors.append((dest, info))

            if done % 25 == 0 or done == len(queue):
                elapsed = time.time() - t0
                print(f"[{done}/{len(queue)}] Processed: {success_count} downloaded, {cached_count} cached, {error_count} errors ({elapsed:.1f}s)")

    print("\n--- DOWNLOAD SUMMARY ---")
    print(f"Total in Queue: {len(queue)}")
    print(f"Downloaded:     {success_count}")
    print(f"Cached/Valid:   {cached_count}")
    print(f"Errors:         {error_count}")
    if errors:
        print(f"First 5 errors: {errors[:5]}")
    print(f"Total Time:     {time.time() - t0:.1f}s")

if __name__ == "__main__":
    main()
