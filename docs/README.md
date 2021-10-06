# Introduction

```sh
$ gitbook --version
CLI version: 2.3.2
GitBook version: 3.2.3
```

## 今すぐやるべきこと

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

## とてもいいgitbook参考

[gitbookをgit pageへ参考](https://r-ngtm.hatenablog.com/entry/2020/06/18/193235)
[Unity エンジニアでの必要スキル](https://rngtm.github.io/Portfolio/markdown/01_skill.html)
[gitbookによるドキュメント作成](http://mebiusbox.github.io/contents/gitbook/src/customize.html)

## ファイル命名規則


## ディレクトリ構成

- summaryは2段階までは行番号つける
- 第一階層はREADMEでそのディレクトリについてまとめる
- 第二階層からディレクトリごとに切っていく
- 第三階層からプレフィックスにインデントをつけない
- 画像は関連するディレクトリ内でimageとして作成する

## 各ディレクトリ詳細

* [1. coding](coding/coding.md) コーディング関連についてまとめているtips(手法・お約束など)
  * [1.1 algorithm](coding/algorithm/algorithm.md)
* [2. program](program/README.md) 言語についてまとめているtips
  * [2.1 JavaScript](program/README.md) 言語についてまとめているtips
* [3. design](design/README.md)
* [4. web開発周り](web/README.md)
* [5. db](db/README.md)
* [6. cloud](cloud/cloud.md)
* [4. middleware](middleware/README.md)
* [7. インフラ](infra/README.md)
* [8. 設計](plan/README.md)
* [9. product要件定義](requirement/README.md)
* [10. version管理ツール](version/README.md)
* [11. shell](shell/README.md)
