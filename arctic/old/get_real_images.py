#!/usr/bin/env python3
"""
実在のWikimedia Commons画像を取得する簡潔なスクリプト
"""

import requests
import os

def download_image_direct(url, filename):
    """直接URLから画像をダウンロード"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Arctic Ports Guide) Educational Use'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        filepath = os.path.join("img", filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ {filename} ダウンロード完了 ({len(response.content)} bytes)")
        return True
    except Exception as e:
        print(f"❌ {filename} エラー: {e}")
        return False

# 実在するWikimedia Commons画像のURL（確認済み）
images = [
    # パブリックドメイン/CC0画像を優先
    ("https://upload.wikimedia.org/wikipedia/commons/1/17/Hamburg_Landungsbrücken.jpg", "hamburg.jpg"),
    ("https://upload.wikimedia.org/wikipedia/commons/3/31/Tromsø_by_night.jpg", "tromso.jpg"),
    ("https://upload.wikimedia.org/wikipedia/commons/8/85/Longyearbyen_port_summer_2004.jpg", "longyearbyen.jpg"),
    ("https://upload.wikimedia.org/wikipedia/commons/5/5c/FMIB_35078_Native_Man_and_Woman_from_Point_Hope_Village.jpeg", "point_hope.jpg"),
    ("https://upload.wikimedia.org/wikipedia/commons/7/76/Nome_Alaska_1900.jpg", "nome.jpg"),
    ("https://upload.wikimedia.org/wikipedia/commons/0/05/Town_of_Barrow%2C_Alaska.jpg", "barrow.jpg"),
]

print("🔍 実在のWikimedia Commons画像をダウンロード中...")

for url, filename in images:
    print(f"📥 {filename}: {url}")
    download_image_direct(url, filename)

print("\n完了!")