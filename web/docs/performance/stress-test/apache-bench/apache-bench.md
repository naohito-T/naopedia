# Apache Bench

[参考URL](https://qiita.com/wifecooky/items/1fc87bcdf6fdcf80637e)

Webサーバの負荷テストならApache Bench（ab）がいい。
※macには標準でインストールされている。

```sh
ab -n [総リクエスト数] -c [同時リクエスト数] [URL]
```

サーバーの限界を測定するには、
「Failed Requests」が0、「Request per second」がより大きい数値になるようにチューニングする。

## できること

- 1回の実行で単一のURLに対してリクエスト

## できないこと

- シナリオベース（複数の一連の）のテストはできない

複数のURLに対して負荷を生成したい場合は、下記のようなツールがある。
Apache JMeter
httperf
weighttp
