# WebSocket

## Overview

独自のプロトコルであり、一度接続が確立されると、クライアントとサーバー間で継続的な通信が可能。  
クライアントとサーバーが同時にデータを送受信可能。  
独自のプロトコル（ws://またはwss://）を使用。

## 仕組み

WebSocketは最初にHTTPプロトコルを使用して接続を開始し、その後WebSocketプロトコルにアップグレードする。  
このプロセスは「WebSocketハンドシェイク」と呼ばれる
