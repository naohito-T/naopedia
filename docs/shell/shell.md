# Shell

## Shell 歴史

>Unix は 1969 年 AT&Tの ベル研究所で誕生しました。継続していく開発の中で BSD 系 と呼ばれる分岐が生まれました。本流は最終的に System V 系と呼ばれるようになりました。その Unix の開発の過程で多数のコマンドが生まれ Unix はより便利になっていきました。しかし互換性をそれほど重視していなかったためかコマンドを含む Unix は移植性が低下していきました。そこで生まれたのが POSIX です。1988 年にシステムインターフェースが、1992 年にシェルとコマンドが標準化されました。
## Shell script

一般的には**シェルスクリプトは環境依存が激しいと言われている。**
一方で**移植性を高くするためのPOSIXという標準規格**があるためそれに準拠してシェルスクリプトを書けば問題ないはずと考える人もいるが問題がある。
また、シェルスクリプトは**小さいstringをコネコネといじるのに非常に不向き**

[シェルスクリプト御作法](https://qiita.com/autotaker1984/items/bc758fcf368c1a167353)
[shebang(シェバンについて)](https://sechiro.hatenablog.com/entry/20120806/1344267619)

## ログインシェルとインタラクティブシェルの違い

[参考URL](http://tooljp.com/windows/chigai/html/Linux/loginShell-interactiveShell-chigai.html)

これらの言葉は曖昧に使用されている面もあると思います。あくまでも参考程度。
Shellではシェルを何個も起動することが可能。
その中でユーザがログインした後、最初に起動されるシェルが**ログインシェル**、ログインシェルから起動されるシェルでユーザと対話が可能なシェルを**インタラクティブシェル**と呼ぶ。

ただしbashでは？（他のShellでもいけるかも）オプションにより2個目以後のログインシェルを起動させることが可能
これらは環境変数や呼ばれる初期化シェルが大きく違うため、違いを把握しておくことは重要

interactiveとは "相互作用、対話的"という意味

## bash 起動時に読み込まれるファイル群

bashだと

- ログインシェルで起動されるファイル
/etc/profile
~/.bash_profile
~/.bash_login
~/.profile
(多くのディストリビューションでは ~/.bash_profile から ~/.bashrcを呼び出す)

- インタラクティブシェル
~/.bashrc

(多くのディストリビューションでは ~/.bashrc からbashrcが呼び出される。)

## zsh 起動時に読み込まれるファイル群


---

## Utils Command

汎用的なコマンド群を記載していく
## nc(NetCat コマンド)

汎用TCP/UDP接続コマンドラインツール。
ncコマンドはNetCatの略

`nc [-オプション] 接続先 ポート番号`

- 疎通OKの場合

```sh
nc -z -v -w 3 secure-service 80
secure-service (10.108.84.141:80) open
```

- 疎通NGの場合
```sh
nc -z -v -w 3 secure-service
nc: secure-service (10.108.84.141:0): Operation timed out
```

## curl

bash zsh で変わってくるため注意
当管理人が zsh のため全て zsh 前提

- 概要
  順番は関係ない。（エラーにならない）

- json 送信時

-d オプションで JSON を指定
-d @~ファイルパス でファイルを指定可能。その場合は JSON 形式で記述することになるが送信時にはやはり文字列として認識されなくなる。
json を送信する時は中のオブジェクトを"(ダブルクウォーテーション)で囲まないと文字列と認識されない。
また中のオブジェクトを"(ダブルクウォーテーション)で囲んでも、通信の際に両サイドの"(ダブルクウォーテーション)は外される(謎)
そのため\(エスケープ)すること。
JSON の'{}' → {} シングルクウォートはいらない。

`$curl -X [HTTPmethod]` が指定可能

## curl クエリパラメーター

urlはシングルクウォーテーションで囲むことエラーになる。

---

## CLI Tips

CLI環境で使えそうなTipsを記載

`$ mkdir udemy_demoapp_v1 && cd $_`
`$_` ... 直前のコマンド引数を取得する。

`$ mkdir {api,front}`
{} ... 波カッコで囲むと一度に複数のディレクトリやファイルが作成できるできる。
注意する点は、カンマの後に**スペースを入れるとエラー**になります。

## シェルスクリプトを書く時

[シェルスクリプトを書く時の注意](https://qiita.com/youcune/items/fcfb4ad3d7c1edf9dc96)

```sh
#!/bin/bash -eu
とするか
set -eu
を書いておく
```

-e : エラーがあったらシェルスクリプトをそこで打ち止めにする。`exit 0` 以外が返ってきた場合、止まるようになる。
-u : 未定義の変数使用時、打ち止めにしてくれる。


## Shellを変える際の正しい対応

シェルを変える際はバックアップ用のセッションを残しておくなどして、ログインできなくならないよう慎重に作業をしましょう。

---

## 他環境へのdotfiles移行について

1. まずはdotfilesを作成している SHELLに合わせる必要がある(管理主はzsh)

## dotfiles

[参考URL](https://github.com/takuzoo3868/dotfiles)
dotfilesとはとはLinuxやMacOSにおける設定ファイルのこと。

## ターミナルからyoutubeの音楽を聞く

[参考URL](https://www.blky.me/2018/02/02/mps-youtube/)

## ターミナルで使えるファイラ

[参考URL](https://qiita.com/rattcv/items/caed7dd8115b294402c8)

## Shellで毎回困る、ifの条件文一覧

[参考URL](https://qiita.com/kazuooooo/items/163d07f694016ebd6048)



