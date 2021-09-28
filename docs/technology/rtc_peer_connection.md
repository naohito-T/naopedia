# RTCPeerConnection (Real-Time-Communication Peer Connection)

[参考URL](https://www.cyberowl.co.jp/blog/technology/331)

>P2P接続を行うRTCPeerConnectionという技術
>RTCPeerConnectionは、ブラウザ上でPeer to Peer(P2P)通信を可能にする為のAPIです。これはWebRTCにも使われているAPIで、サーバを経由せず、ブラウザ間で音声や動画、テキストデータを送受信できるようになります。

通信を確立させるために必要なデータは2つある。

- SDP(Session Description Protocol)
- ICE Candidates(Interactive Connectivity Establishment CAndidates)

## SDPとは

SDPとは、リアルタイム通信の進め方を記述するための規格

- この規格には自分のIPアドレス
- SCTPのポート番号を送受信できる最大のサイズ数

>などが含まれています。
>RTCPeerConnectionでは、このSDPに沿って記述されたプロトコルをクライアント間で交換し、どのような情報を流すか確定させます。

## ICE Candidatesとは

ICE Candidatesを日本語に直訳すると「対話接続確立の候補一覧」となり、
転じてP2P通信できる通信経路の候補一覧となります。

ここでは深く触れませんが、それぞれ違うNATで囲まれたクライアント間でP2P通信を確立する為にはNAT越えが必要になります。そこで登場するのがSTUNサーバやTURNサーバ、ICEサーバと呼ばれるもので、これらのサーバを使用することで、NAT越えした通信経路、つまりICE Candidatesを算出できます。

このICE Candidatesをクライアント間で交換をして、RTCPeerConnectionに登録することで、お互いの通信候補から通信経路が決定して、通信が始まります。

