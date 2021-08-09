# Introduction

```sh
$ gitbook --version
CLI version: 2.3.2
GitBook version: 3.2.3
```

## やるべきこと

jq コマンドをインストールする。
json の出力を整形するコマンド。api のテストなどにはうってつけ。誰かに提出する時見やすい。

peco コマンドをインストールする。
→peco で ls などをコンソール上で選択できるようになる。
→ そのため ssh コマンドなどをそれで選択できるように実装すれば良い

api 設計は url が一緒でも良い
最終的に分けるのは http メソッド分割ができていれば良い。
つまりこれは良いということ

GET /console/admin/cast/1
DELETE /console/admin/cast/1

かなり散見されていると。ドキュメントが書きづらい。
