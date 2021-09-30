# network

ネットワーク関連のPage

## ネットワーク原因調査

[参考URL](https://christina04.hatenablog.com/entry/2017/12/08/190000)

- ネットワーク原因調査

## ping

pingはICMPのエコー要求/応答機能を使った診断コマンド。
ちなみにICMPはL3のプロトコルなのでポートは関係ない。**portを指定するとerrorになる。**
pingはICMPを使っているため、**途中経路でICMPを許可していない場合は疎通が確認できない。**
例えばAWSはデフォルトではICMPが使えません。

## nc(netcat)

Linuxでポートの疎通確認を行う際によく使う。tcpとudpどちらも対応している。


- nc(listener version)
ncコマンドはサーバとして使うこともできる。疎通先でサーバとして起動し、クライアントから確認することでネットワーク自体が繋がっているか確認するケースもある。

## traceroute

どんな経路を辿っているか知りたい時に使います。ICMP/UDP/TCPを使うことができます。






