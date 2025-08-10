#!/usr/bin/env python3
"""
Grise Fiord画像取得の具体例
"""

import requests
import os

def get_grise_fiord_image():
    """
    Grise FiordのWikimedia Commons画像を取得
    
    出典: https://commons.wikimedia.org/wiki/File:Grise_Fiord_harbour.jpg
    ライセンス: CC BY 2.0
    作者: ansgar.walk
    撮影日: 2007年
    """
    
    # Wikimedia Commonsの実際の画像URL（FilePath APIを使用）
    base_url = "https://commons.wikimedia.org/wiki/Special:FilePath/"
    filename = "Grise_Fiord_harbour.jpg"
    
    # API経由で画像URLを取得
    api_url = f"{base_url}{filename}?width=800"
    
    headers = {
        'User-Agent': 'Arctic-Ports-Educational-Guide/1.0'
    }
    
    print(f"🔍 Grise Fiord画像を取得中...")
    print(f"📍 ソース: Wikimedia Commons - File:Grise_Fiord_harbour.jpg")
    print(f"📋 ライセンス: CC BY 2.0")
    print(f"👤 作者: ansgar.walk")
    print(f"🔗 API URL: {api_url}")
    
    try:
        # まずリダイレクト先を取得
        response = requests.head(api_url, headers=headers, allow_redirects=True)
        actual_url = response.url
        print(f"📍 実際のURL: {actual_url}")
        
        # 画像をダウンロード
        response = requests.get(actual_url, headers=headers)
        response.raise_for_status()
        
        # 保存
        filepath = "img/grise_fiord_real.jpg"
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ ダウンロード成功: {filepath}")
        print(f"📁 ファイルサイズ: {len(response.content)} bytes")
        
        return True
        
    except Exception as e:
        print(f"❌ エラー: {e}")
        return False

if __name__ == "__main__":
    get_grise_fiord_image()