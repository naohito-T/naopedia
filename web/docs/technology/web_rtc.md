# WebRTC(Web Real-Time Communication)

Webブラウザからリアルタイム通信を行うことができるAPI

## シグナリングサーバ

firebaseで代用可能
誰かが書き込めばそれを誰かが読み取れる

## STUNサーバ

インターネットからuserのIPがわかるサーバー

## 手順

mediaDevices.getUserMedia : カメラやマイクなどのメディアデバイスへアクセスする許可を求める
→引数には音声・映像をどのような条件で取得するかを指定するためのMediaStreamConstraintsオブジェクトを指定します。
→.getUserMedia(MEDIA_CONSTRAINTS) @example audio: true, video: true
ビデオ会議ツールは自分の声はミュートにする。

---
ここから以下を参考にしている
[参考URL](https://qiita.com/okyk/items/a405f827e23cb9ef3bde)

## P2Pとは

PC同士が直接通信すること。
またはクライアントがサーバに問い合わせるクライアント - サーバ方式ではないもの。

## P2Pの課題

1. P2P通信には接続相手のIPアドレスが必要なこと
2. 異なるNAT内のPCがお互いのプライベートIPアドレスを知る術はないこと。
3. 1と2をあわせると、NAT内PC同士でP2P通信を行うことは不可能。

上記の図では、PC1とPC4は異なるネットワークに属しているためお互いのIPアドレスがわからずP2Pできない。
が、**NAT超えをするとP2Pは可能になる。**
NAT超えをすべきかどうかは**STUNサーバを使って判定し、実際のNAT超え作業はTURNサーバで実現する。**

## NATとは

NATは対応するプライベートIPアドレスとグローバルIPアドレスを双方向に変更するもの。

## STUN/TURNサーバとは

STUNサーバとTURNサーバはどちらもNAT超えを可能にするために必要。

何のためにNAT超え?
NAT超えはP2PしたいPCが異なるネットワークにある場合に必要になる。

## STUNサーバーとは(スタンサーバ)

**STUNサーバは外部から見た自PCのIPアドレスを返してくれるもの。**

そしてSTUNサーバは世の中にいくつもある。どうやら自分で用意しなくてもいいらしい
**ブラウザでstunprotocolと調べると出てくる。**
open source stunサーバ

NAT付ネットワーク外にいる場合： 自PCの知っているIPアドレス = STUNの返すIPアドレス
NAT付ネットワーク内にいる場合： 自PCの知っているIPアドレス ≠ STUNの返すIPアドレス

になるはずなので、比較によって自PCがNAT付ネットワーク内かどうか判定できます。
自PCがNAT内の場合、「NAT越え」が必要だということがわかります。

## TURNサーバ(ターンサーバ)

TURNサーバはP2P通信したいPCの間に立ってデータをリレーするもの

TURNサーバにそれぞれ代理人(PC1', PC4')を立てて、代理人同士がデータのやり取りを行うことで、PC1-PC4間の擬似的な直接通信を行います。

ここまで

---

## Tips

[Vue3_TypeScriptでWebRTCを扱う](https://tec.tecotec.co.jp/entry/2021/07/02/090000)
[React_TypeScript](https://qiita.com/watanabeso/items/028800170aa17789b26e)
