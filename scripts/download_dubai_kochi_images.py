import os
import json
import urllib.request
from io import BytesIO
from PIL import Image
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def get_queue():
    queue = []

    # 1. Dubai images
    d_path = "dubai-processed-images-manifest.json"
    if os.path.exists(d_path):
        with open(d_path, "r", encoding="utf-8") as f:
            d_data = json.load(f)
        for pid, pdata in d_data.get("projects", {}).items():
            for img in pdata.get("images", []):
                rel_path = img.get("path", "").lstrip("/").replace("\\", "/")
                dest = os.path.join("public", rel_path)
                url = img.get("originalUrl")
                if url and dest:
                    queue.append({
                        "city": "dubai",
                        "pid": pid,
                        "filename": img.get("filename"),
                        "url": url,
                        "dest": dest
                    })

    # 2. Kochi images
    k_path = "kochi-processed-images-manifest.json"
    if os.path.exists(k_path):
        with open(k_path, "r", encoding="utf-8") as f:
            k_data = json.load(f)
        for pid, pdata in k_data.get("projects", {}).items():
            for img in pdata.get("images", []):
                rel_path = img.get("path", "").lstrip("/").replace("\\", "/")
                dest = os.path.join("public", rel_path)
                url = img.get("originalUrl")
                if url and dest:
                    queue.append({
                        "city": "kochi",
                        "pid": pid,
                        "filename": img.get("filename"),
                        "url": url,
                        "dest": dest
                    })

    return queue

def download_and_save(item):
    url = item["url"]
    dest = item["dest"]

    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        return ("cached", dest, os.path.getsize(dest))

    os.makedirs(os.path.dirname(dest), exist_ok=True)

    max_attempts = 3
    for attempt in range(max_attempts):
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()

            if len(data) < 200:
                return ("error_small", dest, len(data))

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

            max_dim = 1920
            if img.width > max_dim or img.height > max_dim:
                img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)

            img.save(dest, "JPEG", quality=85, optimize=True)
            return ("downloaded", dest, os.path.getsize(dest))

        except Exception as e:
            if attempt < max_attempts - 1:
                time.sleep(1)
                continue
            return ("error", dest, str(e))

def write_project_image_manifests():
    # Write public/projects/<pid>/manifest.json for every project
    manifests = [
        ("dubai-processed-images-manifest.json", "dubai"),
        ("kochi-processed-images-manifest.json", "kochi")
    ]

    count = 0
    for file_path, city in manifests:
        if not os.path.exists(file_path):
            continue
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        for pid, pdata in data.get("projects", {}).items():
            proj_dir = os.path.join("public", "projects", str(pid))
            os.makedirs(proj_dir, exist_ok=True)
            m_path = os.path.join(proj_dir, "manifest.json")
            project_manifest = {
                "projectId": int(pid),
                "projectName": pdata.get("projectName") or pdata.get("name"),
                "city": city,
                "images": pdata.get("images", [])
            }
            with open(m_path, "w", encoding="utf-8") as mf:
                json.dump(project_manifest, mf, indent=2)
            count += 1
    print(f"Wrote {count} project image manifest.json files.")

def main():
    print("Writing project image manifests...")
    write_project_image_manifests()

    queue = get_queue()
    print(f"Total images in download queue: {len(queue)}")

    t0 = time.time()
    downloaded_count = 0
    cached_count = 0
    error_count = 0

    with ThreadPoolExecutor(max_workers=24) as executor:
        futures = {executor.submit(download_and_save, item): item for item in queue}
        done = 0
        for f in as_completed(futures):
            done += 1
            status, dest, info = f.result()
            if status == "downloaded":
                downloaded_count += 1
            elif status == "cached":
                cached_count += 1
            else:
                error_count += 1
                print(f"Failed {dest}: {info}")

            if done % 100 == 0 or done == len(queue):
                elapsed = time.time() - t0
                rate = done / max(1, elapsed)
                print(f"[{done}/{len(queue)}] Processed: {downloaded_count} new, {cached_count} cached, {error_count} errors | Rate: {rate:.1f} img/s ({elapsed:.1f}s)")

    print("\n==========================================")
    print("Dubai & Kochi Project Image Download Summary:")
    print(f"Total: {len(queue)}, Downloaded: {downloaded_count}, Cached: {cached_count}, Errors: {error_count}")
    print(f"Time Elapsed: {time.time() - t0:.1f}s")
    print("==========================================")

if __name__ == "__main__":
    main()
