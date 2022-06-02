# Shell

## Shell 歴史

>Unix は 1969 年 AT&Tの ベル研究所で誕生しました。継続していく開発の中で BSD 系 と呼ばれる分岐が生まれました。本流は最終的に System V 系と呼ばれるようになりました。その Unix の開発の過程で多数のコマンドが生まれ Unix はより便利になっていきました。しかし互換性をそれほど重視していなかったためかコマンドを含む Unix は移植性が低下していきました。そこで生まれたのが POSIX です。1988 年にシステムインターフェースが、1992 年にシェルとコマンドが標準化されました。

## シェルスクリプトを作成するにあたり

まず使用するシェルを決める必要がある。

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
（多くのディストリビューションでは ~/.bash_profileから ~/.bashrcを呼び出す）

- インタラクティブシェル
~/.bashrc

（多くのディストリビューションでは ~/.bashrcからbashrcが呼び出される）

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

shellにより変わるため注意が必要
順番は関係ない。（エラーにならない）

---

## CLI Tips

CLI環境で使えそうなTipsを記載

`$ mkdir udemy_demoapp_v1 && cd $_`
`$_` ... 直前のコマンド引数を取得する。

`$ mkdir {api,front}`
{} ... 波カッコで囲むと一度に複数のディレクトリやファイルが作成できるできる。
注意する点は、カンマの後に**スペースを入れるとエラー**になります。

---

## 組み込みコマンド

## pushd/popd コマンド

[参考URL](https://www.javadrive.jp/command/dir/index5.html)

pushdディレクトリを実行すると、**現在のディレクトリをスタックに記憶した上**でカレントディレクトリを変更することができる。

popdコマンドを実行するとスタックに記憶されているディレクトリを取り出しカレントディレクトリを変更することができる。


---

## ShellScript Tips

[シェルスクリプトを書く時の注意](https://qiita.com/youcune/items/fcfb4ad3d7c1edf9dc96)

## shellScript echo 色付ける

[参考URL](https://qiita.com/ko1nksm/items/095bdb8f0eca6d327233#%E3%81%8A%E3%81%BE%E3%81%911-%E8%89%B2%E6%8C%87%E5%AE%9A%E6%96%B9%E6%B3%95-%E4%B8%80%E8%A6%A7)

### shellScript が落ちた時にスクリプトを止める

[参考URL](https://atmarkit.itmedia.co.jp/ait/articles/1805/10/news023.html)
[set euxについて](https://qiita.com/keitean/items/83c7d0d6221ec1b9c63c)
setコマンドを先頭に記載する

```sh
#!/bin/bash -eu  # とするか
set -eu # を書いておく
set -euox pipefail
```

-e : エラーがあったらシェルスクリプトをそこで打ち止めにする。`exit 0` 以外が返ってきた場合、止まるようになる。
-u : 未定義の変数使用時、打ち止めにしてくれる。
-v : シェルの入力行を表示する
-o : 設定したシェルオプションを「on」と表示する

---

## Shellを変える際の正しい対応

シェルを変える際は**バックアップ用のセッションを残しておく**などして、ログインできなくならないよう慎重に作業をする。

---

## 他環境へのdotfiles移行について

1. まずはdotfilesを作成しているShellに合わせる必要がある（管理主はzsh）

## dotfiles

[参考URL](https://github.com/takuzoo3868/dotfiles)
dotfilesとはとはLinuxやmacOSにおける設定ファイルのこと。

## ターミナルからyoutubeの音楽を聞く

[参考URL](https://www.blky.me/2018/02/02/mps-youtube/)

## ターミナルで使えるファイラ

[参考URL](https://qiita.com/rattcv/items/caed7dd8115b294402c8)

## Shellで毎回困る、ifの条件文一覧

[参考URL](https://qiita.com/kazuooooo/items/163d07f694016ebd6048)



