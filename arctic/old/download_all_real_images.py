#!/usr/bin/env python3
"""
北極海航路18港の実際のWikimedia Commons画像を取得する最終版スクリプト

使用方法:
python3 download_all_real_images.py

注意: このスクリプトは教育目的での使用のみ。
すべての画像はWikimedia Commonsから取得し、適切なライセンス表記が必要です。
"""

import requests
import os
import json
import time

class ArcticPortsImageDownloader:
    def __init__(self):
        self.base_dir = "img"
        self.headers = {
            'User-Agent': 'Arctic-Ports-Educational-Guide/1.0 (Educational use for Arctic route documentation)'
        }
        self.licenses_info = []
        
        # 各港の画像情報（検証済みファイル名）
        self.ports_images = {
            "hamburg.jpg": {
                "name": "Hamburg",
                "file": "Hamburg_Landungsbruecken_01.jpg",
                "description": "Hamburg port and Landungsbrücken"
            },
            "tromso.jpg": {
                "name": "Tromsø", 
                "file": "Tromsø_in_midnightsun.JPG",
                "description": "Tromsø harbor by night"
            },
            "longyearbyen.jpg": {
                "name": "Longyearbyen",
                "file": "Longyearbyen_main_street_IMG_2603.jpg", 
                "description": "Longyearbyen settlement"
            },
            "qaanaaq.jpg": {
                "name": "Qaanaaq",
                "file": "QaanaaqGreenland_(cropped).jpg",
                "description": "Qaanaaq settlement in Greenland"
            },
            "grise_fiord.jpg": {
                "name": "Grise Fiord",
                "file": "Grise_Fiord_harbour.jpg",
                "description": "Grise Fiord harbor facilities"
            },
            "resolute.jpg": {
                "name": "Resolute",
                "file": "Community_of_Resolute.jpg", 
                "description": "Resolute community view"
            },
            "arctic_bay.jpg": {
                "name": "Arctic Bay",
                "file": "Arctic-bay.jpg",
                "description": "Arctic Bay coastal view"
            },
            "pond_inlet.jpg": {
                "name": "Pond Inlet", 
                "file": "Welcome_to_Pond_Inlet.jpg",
                "description": "Pond Inlet welcome sign"
            },
            "cambridge_bay.jpg": {
                "name": "Cambridge Bay",
                "file": "Cambridge_Bay_Shore.jpg",
                "description": "Cambridge Bay shoreline"
            },
            "gjoa_haven.jpg": {
                "name": "Gjoa Haven",
                "file": "Along_the_shoreline,_Gjoa_Haven,_September_2019.jpg", 
                "description": "Gjoa Haven coastal area"
            },
            "tuktoyaktuk.jpg": {
                "name": "Tuktoyaktuk",
                "file": "Tuktoyaktuk_-_Mackenzie_Delta.jpg",
                "description": "Tuktoyaktuk pingo landscape"
            },
            "prudhoe_bay.jpg": {
                "name": "Prudhoe Bay",
                "file": "Aerial_View_of_Prudhoe_Bay.jpg",
                "description": "Prudhoe Bay oil facilities"
            },
            "barrow.jpg": {
                "name": "Barrow/Utqiagvik",
                "file": "Town_of_Barrow,_Alaska.jpg",
                "description": "Town of Barrow, Alaska"
            },
            "point_hope.jpg": {
                "name": "Point Hope", 
                "file": "Village_of_point_hope.jpg",
                "description": "Point Hope village view"
            },
            "nome.jpg": {
                "name": "Nome",
                "file": "Nome_Alaska_1900.jpg",
                "description": "Nome during Gold Rush era"
            },
            "dutch_harbor.jpg": {
                "name": "Dutch Harbor",
                "file": "Dutch_Harbor,_Alaska.jpg",
                "description": "Dutch Harbor fishing port"
            },
            "petropavlovsk.jpg": {
                "name": "Petropavlovsk-Kamchatsky",
                "file": "Koryaksky_volcano_Petropavlovsk-Kamchatsky_oct-2005.jpg", 
                "description": "Petropavlovsk-Kamchatsky cityscape"
            },
            "tomakomai.jpg": {
                "name": "Tomakomai",
                "file": "Port_of_Tomakomai.jpg",
                "description": "Port of Tomakomai facilities"
            }
        }
    
    def get_image_url(self, filename):
        """Wikimedia Commons FilePath APIを使用してダウンロードURLを取得"""
        api_url = f"https://commons.wikimedia.org/wiki/Special:FilePath/{filename}?width=800"
        
        try:
            # リダイレクト先の実際のURLを取得
            response = requests.head(api_url, headers=self.headers, allow_redirects=True, timeout=10)
            return response.url
        except Exception as e:
            print(f"URL取得エラー ({filename}): {e}")
            return None
    
    def download_image(self, url, local_filename, port_info):
        """画像をダウンロード"""
        try:
            response = requests.get(url, headers=self.headers, timeout=30)
            response.raise_for_status()
            
            filepath = os.path.join(self.base_dir, local_filename)
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            # ライセンス情報記録
            self.licenses_info.append({
                'port': port_info['name'],
                'local_file': local_filename,
                'wikimedia_file': port_info['file'],
                'description': port_info['description'],
                'download_url': url,
                'size_bytes': len(response.content)
            })
            
            print(f"✅ {port_info['name']}: {local_filename} ({len(response.content):,} bytes)")
            return True
            
        except Exception as e:
            print(f"❌ {port_info['name']}: ダウンロード失敗 - {e}")
            return False
    
    def download_all(self):
        """全港の画像をダウンロード"""
        print("🔍 北極海航路18港の実際の画像をダウンロード中...\n")
        
        # ディレクトリ確認
        if not os.path.exists(self.base_dir):
            os.makedirs(self.base_dir)
        
        success_count = 0
        total_count = len(self.ports_images)
        
        for local_filename, port_info in self.ports_images.items():
            print(f"📥 {port_info['name']} ({port_info['file']})")
            
            # 画像URLを取得
            download_url = self.get_image_url(port_info['file'])
            
            if download_url:
                if self.download_image(download_url, local_filename, port_info):
                    success_count += 1
                else:
                    print(f"   ⚠️  フォールバック: プレースホルダーを維持")
            else:
                print(f"   ❌ URL取得失敗: {port_info['file']}")
            
            time.sleep(1)  # APIレート制限対策
        
        # ライセンス情報をファイル出力
        self.save_license_info()
        
        print(f"\n📊 結果: {success_count}/{total_count} 件ダウンロード成功")
        print(f"📁 画像保存先: {self.base_dir}/")
        print(f"📋 ライセンス情報: licenses.json")
    
    def save_license_info(self):
        """ライセンス情報をJSONファイルに保存"""
        license_data = {
            "info": "Arctic Ports Images - License Information",
            "source": "Wikimedia Commons", 
            "download_date": "2025-08-09",
            "usage": "Educational purposes - Arctic route documentation",
            "images": self.licenses_info
        }
        
        with open("licenses.json", "w", encoding="utf-8") as f:
            json.dump(license_data, f, indent=2, ensure_ascii=False)
        
        # テキスト版も作成
        with open("licenses.txt", "w", encoding="utf-8") as f:
            f.write("# Arctic Ports Images - License Information\n\n")
            f.write("出典: Wikimedia Commons\n")
            f.write("用途: 教育目的 - 北極海航路ガイド\n")
            f.write("ダウンロード日: 2025-08-09\n\n")
            
            for info in self.licenses_info:
                f.write(f"## {info['port']}\n")
                f.write(f"- ローカルファイル: {info['local_file']}\n")
                f.write(f"- Wikimediaファイル: {info['wikimedia_file']}\n") 
                f.write(f"- 説明: {info['description']}\n")
                f.write(f"- ダウンロードURL: {info['download_url']}\n")
                f.write(f"- ファイルサイズ: {info['size_bytes']:,} bytes\n\n")

def main():
    downloader = ArcticPortsImageDownloader()
    downloader.download_all()

if __name__ == "__main__":
    main()