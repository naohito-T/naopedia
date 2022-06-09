# Time

システムの時間の取り扱いについて記載する

[UnixTime相互変換ツール](https://tool.konisimple.net/date/unixtime?q=1654765225)

## T Zの意味

国際的なデータを取り扱っているときの次の表現
ISO8601で定まっている規格

`2020-07-27T02:12:40Z`

Tが日付と時間の区切り。
ZはタイムゾーンがUTCという意味。

## UNIX TIME

ただ、一般的なUnix timeと言えば、秒の単位までのケースが多い。

[wikipedia](https://ja.wikipedia.org/wiki/UNIX%E6%99%82%E9%96%93)

1234567890
この通り10桁が正常（秒単位）

JSだと、13桁（ミリ秒まで）で返される。そのため / 1000をする。