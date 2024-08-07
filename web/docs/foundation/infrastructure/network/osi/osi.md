# OSI 7階層参照モデル(Open Systems Interconnection reference model)

ネットワークをきちんと階層化して定義したものを、OSI参照モデルという。

## アプリケーション層

アプリケーションごとのデータの形式や処理の手順などを規定する。  
Web、電子メール、ファイル転送などのプロトコルは、この層で規定されます。

## プレゼンテーション層

データの表現形式、文字コードの種類や暗号化などを扱う。  
双方の機器の間で文字コードが違う場合の変換、通信の暗号化と復号といった処理はこの層で行われる

## セッション層

クライアントとサーバーなど、プログラム間の接続手順を規定する。  
この層により、2つのプログラムの間でデータ交換を行う論理的な通信チャネルが用意される

## トランスポート層

実際にデータのやり取りを行うプログラムの間でのデータ伝送を実現する。  
エラーの訂正、データのブロックサイズの違いの吸収（大きなデータを小さなパケットに分割するなど）などはこの層で行う。

## ネットワーク層

ネットワーク上の2台のコンピューターの接続を確立する。  
下位のデータリンク層と同じように見えますが、データリンク層が同じ方式を使った1つのネットワーク上の接続を確立するのに対して、ネットワーク層は相互に接続された複数のネットワークの間、つまりインターネットワークの接続を定めるものです。これらの複数のネットワークは、同じ形式のものであっても、異なるものであっても構いません。

## データリンク層

イーサネット、無線LANなど、ネットワークの方式に基づいたメディアアクセス制御（MAC、Media Access Control）や実際のデータ伝送について規定します。つまり、それぞれのネットワーク方式が、どのように通信メディアを使ってデータを伝送するのかを定めています。これにより、LAN上やWAN上の機器の間の通信が実現されます。

## 物理層

実際のネットワーク媒体（ケーブルなど）の上を流れる電気信号の形式やコネクタなど、個々のネットワーク方式ごとに、ハードウェアにもっとも近い部分を規定します。

ネットワークの解説書などには、必ずこのOSIモデルの説明があります。このモデルは論理的に構築され、ある意味、ネットワークの通信はかくあるべきという理想像を示したものです。実際のネットワークシステム、とくに現在主流となっているTCP/IPは、このモデルのように階層化されている訳ではありません。しかし現在のほとんどのネットワークシステムは、この形ではないにせよ、何らかの形で階層化されています。
