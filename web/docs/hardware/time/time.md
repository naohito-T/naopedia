# Time

システムの時間の取り扱いについて記載する

## 基本的な処理

>基本的に公開・非公開を切り分けるのはサーバー側の時計を使います
>逆にUIはクライアント側の時計を使います。
>サーバー側の時計は世界中のどこからアクセスしても変わりませんので
>好きなようにすればいいでしょう。
>（公開するのにクライアントの時間をつかって検証してはいけません）

[UnixTime相互変換ツール](https://tool.konisimple.net/date/unixtime?q=1654765225)

## T Zの意味

国際的なデータを取り扱っているときの次の表現
ISO8601で定まっている規格

`2020-07-27T02:12:40Z`

Tが日付と時間の区切り。
ZはタイムゾーンがUTCという意味。

## UNIX TIME

ただ、一般的なUnix timeと言えば、秒の単gi位までのケースが多い。

[wikipedia](https://ja.wikipedia.org/wiki/UNIX%E6%99%82%E9%96%93)

1234567890
この通り10桁が正常（秒単位）

JSだと、13桁（ミリ秒まで）で返される。そのため / 1000をする。

## UTC(Universal Time Coordinated): 協定世界時

世界で標準時として使用。セシウム原子が振動から導きだされた時間。

## システムでのタイムゾーン考え方

[参考URL](https://zenn.dev/saki/articles/cbb097a495fcf5)

UI上はユーザが直感的に理解できる日付の表示を行いつつ、BEではグローバル展開も視野にUTCでデータを保管するケースがある。
