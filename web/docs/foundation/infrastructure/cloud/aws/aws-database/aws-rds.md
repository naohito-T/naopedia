# AWS RDS

RDS関連の記述

## 踏み台サーバーから接続するとき

踏み台サーバーのprivate ipをセキュリティグループに紐づける。  
踏み台サーバーの `public ip` をセキュリティグループに紐付ける場合**いったんネットワークの外に出てから接続する必要のためprivate ipを紐付ける**
