# Shell

## Shell 歴史

>Unix は 1969 年 AT&Tの ベル研究所で誕生しました。継続していく開発の中で BSD 系 と呼ばれる分岐が生まれました。本流は最終的に System V 系と呼ばれるようになりました。その Unix の開発の過程で多数のコマンドが生まれ Unix はより便利になっていきました。しかし互換性をそれほど重視していなかったためかコマンドを含む Unix は移植性が低下していきました。そこで生まれたのが POSIX です。1988 年にシステムインターフェースが、1992 年にシェルとコマンドが標準化されました。

## ログイン時に表示されるメッセージをカスタマイズする

[参考URL](https://qiita.com/Possum55/items/99704f4a9c6205fac3fa)

- ログイン直後のメッセージ
/etc/motdの内容が表示される（「Message Of The Day」の略）

## uname コマンド

OSまたはハードウェアの情報を表示する

[参考URL](http://itdoc.hitachi.co.jp/manuals/3020/30203S3530/JPAS0263.HTM)

## シェルスクリプトを作成するにあたり

まず使用するシェルを決める必要がある。

## 実行場所を気にしなくてもいいシェルスクリプト

シェルスクリプトの冒頭に以下を記載すると実行場所を気にしなくてよいスクリプトになる。
```sh
$ cd `dirname $0`
```
[参考URL](https://www.qoosky.io/techs/927115250f)
[参考URL2](https://developers-book.com/2021/06/12/656/)

**注意**
>ググるとよく出てくる dirname $(pwd) を使った cd $(dirname $(dirname $0)) ですが、実はスクリプトを呼び出した場所、ディレクトリ名や方法によっては正常に動作しません。
>ディレクトリ名にスペースが含まれていたり、呼び出し元のディレクトリや呼び出し元が相対パスだったりする場合です。

## シェルスクリプトのパス取得のあれこれ

```sh
# dirnameコマンド
# パスのうちディレクトリ部分を取得できます。
$ dirname /home/vagrant/sample.sh 
/home/vagrant
# basename コマンド
# パスのうちファイル名の部分を取得できます。

$ basename /home/vagrant/sample.sh 
sample.sh

# $0
# 自分自身 (実行中のコマンドファイル) へのパスを取得できます。
$ echo $0 
/bin/zsh # zshのpathが取得できる
```

## シェルスクリプト 拡張子を取得する

[参考URL](https://takuya-1st.hatenablog.jp/entry/2017/06/01/163000)

## 親ディレクトリを不変に取得する

[参考URL](https://qiita.com/KEINOS/items/bfd16189894c4bdace8e)


## Shell script

一般的には**シェルスクリプトは環境依存が激しいと言われている。**
一方で**移植性を高くするためのPOSIXという標準規格**があるためそれに準拠してシェルスクリプトを書けば問題ないはずと考える人もいるが問題がある。
また、シェルスクリプトは**小さいstringをコネコネといじるのに非常に不向き**

[シェルスクリプト御作法](https://qiita.com/autotaker1984/items/bc758fcf368c1a167353)
[shebang(シェバンについて)](https://sechiro.hatenablog.com/entry/20120806/1344267619)
[シェルスクリプト(コマンドライン引数)](https://maku77.github.io/linux/startup/command-line-params.html)
[シェルスクリプト例外処理](https://cloudpack.media/532)

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

[setコマンドオプション一覧](https://atmarkit.itmedia.co.jp/ait/articles/1805/10/news023.html)
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
-x : トレース情報としてシェルが実行したコマンドとその引数を出力する。

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

ファイラではなくvimなどで移動した方がいいかも

[参考URL](https://qiita.com/rattcv/items/caed7dd8115b294402c8)
[ファイラ種類](https://zenn.dev/lambdalisue/articles/3deb92360546d526381f)


## Shellで毎回困る、ifの条件文一覧

[参考URL](https://qiita.com/kazuooooo/items/163d07f694016ebd6048)

## シェルスクリプト 例外処理

たいていの高級なプログラミング言語では例外処理をしなければプログラムが終了する。
しかし、シェルスクリプトでは**エラーが発生しても後続の処理が普通に実行される。**

[参考URL](https://webbibouroku.com/Blog/Article/shell-try-catch-finally)

## コマンドラインで画像処理が行える便利ツール

ImageMagickには脆弱性が大量に存在します。
2017年に報告されたImageMagickの脆弱性は236件でした。
大量にある上リモートコード実行級の脆弱性もあり、安全性という観点ではかなり厳しい評価をしなければなりません。

[参考URL](https://atmarkit.itmedia.co.jp/ait/articles/1809/25/news020.html)

[意味がわからんが読む価値あり](https://qiita.com/yoya/items/2076c1f5137d4041e3aa)

## プロンプトを変更する

表示するプロンプトは`PS1`という環境変数によって定義されている。

## 軽量なプロンプト

[参考URL](https://tech.hajimari.inc/entry/2020/08/28/170220)

Starshipを使用するとのこと。

- Rust言語で開発されており、動作が高速
- 設定ファイルで細かくカスタマイズ可能
- `bash / Zsh / Fish`で使用可能
- Git管理のプロジェクトであれば、ブランチ名や言語バージョン等が表示可能
- ポップなカラースキーム・絵文字がカワイイ（超重要）

## update-alternatives コマンド

[参考URL](https://vinelinux.org/docs/vine6/cui-guide/update-alternatives.html)

システムで使われる**プログラムのバージョン管理**を行うためのコマンド
このコマンドが必要になる背景としては以下の理由がある。

### 機能の重複するプログラム

alternatives : 選択肢

いくつかのプログラムには**同様の機能をもったプログラムが複数用意されている場合**がある
これらの中には、複数のものを同時にインストールしておけるものがある。

バージョンの異なるものを同時に複数インストールしておけるものでは、gccのようなプログラムがあり、gcc,gcc4,gcc295といったrpmパッケージがある。

複数のプログラムをインストールしてある時に、どれをシステムの標準とするか、決定、選択、切り替えを行うために`alternatives`という仕組みがある。

## シェル(色々な書き方)

`$（ドルマーク）`の後にカッコを2つつけるのは**算術計算の実行**を意味している。

```sh
i=$((1 + $RANDOM % 10))
```