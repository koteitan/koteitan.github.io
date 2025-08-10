#!/usr/bin/env python3
"""
Arctic Ports Image Downloader
Wikimedia Commons から北極海航路の各港の画像をダウンロードするスクリプト
"""

import requests
import os
import time
from urllib.parse import quote

# 出力ディレクトリ
IMG_DIR = "img"

# 各港の情報（港名, 検索キーワード, 対象ファイル名）
PORTS = [
    ("Hamburg", "Hamburg port harbour", "hamburg.jpg"),
    ("Tromsø", "Tromsoe Tromso harbour port", "tromso.jpg"),
    ("Longyearbyen", "Longyearbyen port Svalbard", "longyearbyen.jpg"),
    ("Qaanaaq", "Qaanaaq Thule Greenland settlement", "qaanaaq.jpg"),
    ("Grise Fiord", "Grise Fiord harbour Nunavut", "grise_fiord.jpg"),
    ("Resolute", "Resolute Bay community Nunavut", "resolute.jpg"),
    ("Arctic Bay", "Arctic Bay Nunavut community", "arctic_bay.jpg"),
    ("Pond Inlet", "Pond Inlet Mittimatalik Nunavut", "pond_inlet.jpg"),
    ("Cambridge Bay", "Cambridge Bay Iqaluktuuttiaq Victoria Island", "cambridge_bay.jpg"),
    ("Gjoa Haven", "Gjoa Haven King William Island", "gjoa_haven.jpg"),
    ("Tuktoyaktuk", "Tuktoyaktuk Northwest Territories", "tuktoyaktuk.jpg"),
    ("Prudhoe Bay", "Prudhoe Bay Alaska oil field", "prudhoe_bay.jpg"),
    ("Barrow", "Barrow Utqiagvik Alaska northernmost", "barrow.jpg"),
    ("Point Hope", "Point Hope Alaska village", "point_hope.jpg"),
    ("Nome", "Nome Alaska gold rush city", "nome.jpg"),
    ("Dutch Harbor", "Dutch Harbor Unalaska fishing port", "dutch_harbor.jpg"),
    ("Petropavlovsk-Kamchatsky", "Petropavlovsk Kamchatsky Russia port", "petropavlovsk.jpg"),
    ("Tomakomai", "Tomakomai port Hokkaido Japan", "tomakomai.jpg"),
]

def search_wikimedia_images(search_term, limit=5):
    """
    Wikimedia Commons APIで画像を検索
    """
    api_url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": f"filetype:bitmap {search_term}",
        "srnamespace": 6,  # File namespace
        "srlimit": limit
    }
    
    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if 'query' in data and 'search' in data['query']:
            return [result['title'] for result in data['query']['search']]
    except Exception as e:
        print(f"検索エラー: {e}")
    
    return []

def get_image_info(filename):
    """
    画像ファイルの詳細情報とダウンロードURLを取得
    """
    api_url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "titles": filename,
        "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata",
        "iiurlwidth": "800"  # 800px幅でリサイズ
    }
    
    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if 'query' in data and 'pages' in data['query']:
            pages = data['query']['pages']
            for page_id in pages:
                page = pages[page_id]
                if 'imageinfo' in page and page['imageinfo']:
                    imageinfo = page['imageinfo'][0]
                    
                    # ライセンス情報を取得
                    license_info = "Unknown"
                    author_info = "Unknown"
                    
                    if 'extmetadata' in imageinfo:
                        metadata = imageinfo['extmetadata']
                        if 'LicenseShortName' in metadata:
                            license_info = metadata['LicenseShortName']['value']
                        if 'Artist' in metadata:
                            author_info = metadata['Artist']['value']
                    
                    return {
                        'url': imageinfo.get('thumburl', imageinfo.get('url')),
                        'original_url': imageinfo.get('url'),
                        'width': imageinfo.get('thumbwidth', imageinfo.get('width')),
                        'height': imageinfo.get('thumbheight', imageinfo.get('height')),
                        'mime': imageinfo.get('mime'),
                        'license': license_info,
                        'author': author_info
                    }
    except Exception as e:
        print(f"画像情報取得エラー: {e}")
    
    return None

def download_image(url, filepath):
    """
    画像をダウンロード
    """
    headers = {
        'User-Agent': 'Arctic-Ports-Guide/1.0 (https://github.com/arctic-ports-guide; educational-use@example.com)'
    }
    
    try:
        response = requests.get(url, stream=True, headers=headers)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"ダウンロードエラー: {e}")
        return False

def main():
    # ディレクトリ作成
    if not os.path.exists(IMG_DIR):
        os.makedirs(IMG_DIR)
    
    license_info = []
    
    for port_name, search_term, filename in PORTS:
        print(f"\n🔍 {port_name} の画像を検索中...")
        
        # 画像検索
        search_results = search_wikimedia_images(search_term)
        
        if not search_results:
            print(f"❌ {port_name} の画像が見つかりませんでした")
            continue
        
        # 最初の検索結果を試行
        for result_title in search_results[:3]:  # 上位3件を試行
            print(f"   📋 試行中: {result_title}")
            
            # 画像情報取得
            image_info = get_image_info(result_title)
            
            if image_info and image_info['url']:
                # 適切なライセンスかチェック（CC-BY, CC-BY-SA, Public Domain等）
                license = image_info['license'].lower()
                if any(allowed in license for allowed in ['cc-by', 'cc0', 'public', 'pd-', 'cc by']):
                    print(f"   ✅ ライセンス OK: {image_info['license']}")
                    
                    # ダウンロード
                    filepath = os.path.join(IMG_DIR, filename)
                    if download_image(image_info['url'], filepath):
                        print(f"   💾 ダウンロード完了: {filepath}")
                        
                        # ライセンス情報記録
                        license_info.append({
                            'port': port_name,
                            'filename': filename,
                            'title': result_title,
                            'license': image_info['license'],
                            'author': image_info['author'],
                            'url': image_info['original_url']
                        })
                        break
                    else:
                        print(f"   ❌ ダウンロード失敗")
                else:
                    print(f"   ⚠️  ライセンス不適切: {image_info['license']}")
            else:
                print(f"   ❌ 画像情報取得失敗")
        
        time.sleep(1)  # API制限対策
    
    # ライセンス情報をファイルに出力
    with open("licenses.txt", "w", encoding="utf-8") as f:
        f.write("# Arctic Ports Images - License Information\n\n")
        for info in license_info:
            f.write(f"## {info['port']}\n")
            f.write(f"- File: {info['filename']}\n")
            f.write(f"- Source: {info['title']}\n")
            f.write(f"- License: {info['license']}\n")
            f.write(f"- Author: {info['author']}\n")
            f.write(f"- URL: {info['url']}\n\n")
    
    print(f"\n✅ 完了！ライセンス情報は licenses.txt に保存されました。")
    print(f"📂 {len(license_info)} 個の画像をダウンロードしました。")

if __name__ == "__main__":
    main()