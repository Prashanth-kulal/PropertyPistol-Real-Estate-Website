import os
import json
import urllib.request
from io import BytesIO
from PIL import Image
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

def process_single_image(item, emblem_orig):
    url = item["url"]
    dest = item["dest"]

    # Skip already completed files
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        return "cached"

    os.makedirs(os.path.dirname(dest), exist_ok=True)

    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        )
        with urllib.request.urlopen(req, timeout=25) as resp:
            data = resp.read()

        base = Image.open(BytesIO(data))
        base_rgba = base.convert("RGBA")
        bw, bh = base_rgba.size

        # Subtle watermark: 7% of width, min 32px, max 96px
        target_w = max(32, min(96, int(bw * 0.07)))
        target_h = int(target_w * (emblem_orig.size[1] / emblem_orig.size[0]))
        emblem_resized = emblem_orig.resize((target_w, target_h), Image.Resampling.LANCZOS)

        # 35% opacity (clean, subtle, does not obscure dimensions)
        r, g, b, a = emblem_resized.split()
        a = a.point(lambda p: int(p * 0.35))
        emblem_faded = Image.merge("RGBA", (r, g, b, a))

        # Bottom-right positioning
        pad = max(10, int(min(bw, bh) * 0.02))
        x_pos = bw - target_w - pad
        y_pos = bh - target_h - pad

        base_rgba.paste(emblem_faded, (x_pos, y_pos), emblem_faded)

        # Save as high quality WebP
        final_rgb = base_rgba.convert("RGB")
        final_rgb.save(dest, "WEBP", quality=90, method=4)

        return "success"
    except Exception as e:
        return f"error: {e}"

def process_all_downloads(queue_file="scratch/dubai_kochi_plan_images_queue.json", max_workers=20):
    if not os.path.exists(queue_file):
        print(f"Queue file {queue_file} not found.")
        return

    with open(queue_file, "r", encoding="utf-8") as f:
        queue = json.load(f)

    emblem_path = os.path.join("public", "images", "logo", "logo-emblem.png")
    if not os.path.exists(emblem_path):
        raise FileNotFoundError(f"Watermark emblem not found at {emblem_path}")

    emblem_orig = Image.open(emblem_path).convert("RGBA")
    print(f"Loaded emblem ({emblem_orig.size}). Total images in download queue: {len(queue)}")

    t0 = time.time()
    success_count = 0
    cached_count = 0
    error_count = 0

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(process_single_image, item, emblem_orig): item for item in queue}
        done = 0
        for f in as_completed(futures):
            done += 1
            res = f.result()
            if res == "success":
                success_count += 1
            elif res == "cached":
                cached_count += 1
            else:
                error_count += 1

            if done % 50 == 0 or done == len(queue):
                elapsed = time.time() - t0
                rate = done / max(1, elapsed)
                print(f"[{done}/{len(queue)}] Processed: {success_count} new, {cached_count} cached, {error_count} errors | Rate: {rate:.1f} img/s ({elapsed:.1f}s)")

    print(f"\n==========================================")
    print(f"Download & Watermarking Summary:")
    print(f"Total: {len(queue)}, Newly Processed: {success_count}, Already Cached: {cached_count}, Errors: {error_count}")
    print(f"Time Elapsed: {time.time() - t0:.1f}s")
    print(f"==========================================")

if __name__ == "__main__":
    process_all_downloads()
