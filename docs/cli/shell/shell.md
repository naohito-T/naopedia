# Shell

## 歴史

>Unix は 1969 年 AT&Tの ベル研究所で誕生しました。継続していく開発の中で BSD 系 と呼ばれる分岐が生まれました。本流は最終的に System V 系と呼ばれるようになりました。その Unix の開発の過程で多数のコマンドが生まれ Unix はより便利になっていきました。しかし互換性をそれほど重視していなかったためかコマンドを含む Unix は移植性が低下していきました。そこで生まれたのが POSIX です。1988 年にシステムインターフェースが、1992 年にシェルとコマンドが標準化されました。

## BSD系コマンド
[リファレンス](https://man.freebsd.org/cgi/man.cgi?manpath=FreeBSD+5.3-RELEASE+and+Ports)

## Linux系コマンド
[リファレンス](https://linux.die.net/man/1/base64)

## ログイン時に表示されるメッセージをカスタマイズする

[参考URL](https://qiita.com/Possum55/items/99704f4a9c6205fac3fa)

- ログイン直後のメッセージ
/etc/motdの内容が表示される（「Message Of The Day」の略）

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

## 位置パラメーター

位置パラメーターを集合的に扱う場合は、$*, $@, "$@"を利用する。
クォーテートしない$@ は $* と同じだ。なので実質$*と"$@"を使い分ければ良い。

```sh
echo '--- $* ---'; for P in $*; do echo $P; done
echo '--- $@ ---'; for P in $@; do echo $P; done        # $* と同じ
echo '--- "$@" ---'; for P in "$@"; do echo $P; done
$ ./sample.sh "1 2" "hoge fuga"
--- $* ---
1
2
hoge
fuga
--- $@ ---
1
2
hoge
fuga
--- "$@" ---
1 2
hoge fuga
```

## anyenv


## rbenv

`rbenv rehash`を使用することでshimsディレクトリが更新される。