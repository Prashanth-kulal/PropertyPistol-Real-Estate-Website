import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
main_js = urllib.request.urlopen(urllib.request.Request("https://cdn.propertypistol.com/_nuxt/DoovH5OQ.js", headers=headers), timeout=15).read().decode('utf-8', errors='ignore')

idx = main_js.find('CommuteModal')
if idx != -1:
    print("Found CommuteModal in DoovH5OQ.js around index:", idx)
    print(main_js[max(0, idx-200):min(len(main_js), idx+600)])
else:
    print("CommuteModal not found directly")
