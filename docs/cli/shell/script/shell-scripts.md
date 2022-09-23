# ShellScript

[作成する前に見ろ](https://qiita.com/jpshadowapps/items/d6f9b55026637519347f)
[コーディング規約](https://qiita.com/mashumashu/items/f5b5ff62fef8af0859c5)

## ShellScript Tips

[シェルスクリプトを書く時の注意](https://qiita.com/youcune/items/fcfb4ad3d7c1edf9dc96)

## ShellScript echo 色付ける

[参考URL](https://qiita.com/ko1nksm/items/095bdb8f0eca6d327233#%E3%81%8A%E3%81%BE%E3%81%911-%E8%89%B2%E6%8C%87%E5%AE%9A%E6%96%B9%E6%B3%95-%E4%B8%80%E8%A6%A7)

### ShellScript が落ちた時にスクリプトを止める

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

## Shellで毎回困る、ifの条件文一覧

[参考URL](https://qiita.com/kazuooooo/items/163d07f694016ebd6048)

## シェルスクリプト 例外処理

たいていの高級なプログラミング言語では例外処理をしなければプログラムが終了する。
しかし、シェルスクリプトでは**エラーが発生しても後続の処理が普通に実行される。**

[参考URL](https://webbibouroku.com/Blog/Article/shell-try-catch-finally)

## OSを分別する

```sh
if [ "$(uname)" == 'Darwin' ]; then
  OS='Mac'
elif [ "$(expr substr $(uname -s) 1 5)" == 'Linux' ]; then
  OS='Linux'
elif [ "$(expr substr $(uname -s) 1 10)" == 'MINGW32_NT' ]; then
  OS='Cygwin'
else
  echo "Your platform ($(uname -a)) is not supported."
  exit 1
fi
```

## シェルスクリプトを作成するにあたり

まず使用するシェルを決める必要がある。

## シェルスクリプト値共有(サブシェルとか考慮しなくて良いなど)

データをファイルに出力するテクニックが結構使われる。

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

## シェルスクリプト実行後参照したい場合

[参考URL](https://atmarkit.itmedia.co.jp/ait/articles/1810/03/news001.html)
実行後も参照したい場合は、「source」コマンドを使って、シェルスクリプトを“現在動作している”bashに読み込ませる必要がある。

## シェルスクリプト　オプションをparse(解析)する

[参考URL](https://programwiz.org/2022/03/22/how-to-write-shell-script-for-option-parsing/)

2つのコマンドがある。
`getopts` POSIX準拠シェルの組み込みコマンド
`getopt` 高機能だが環境依存が多くなる。

**一番大事な考え方**
複雑なオプション解析が必要な処理の場合は、シェルスクリプトでやるのではなく`rust`や`go`でCLI実装するのがいい選択。

## シェルスクリプト errorハンドリング

[参考URL](https://qiita.com/kobake@github/items/8d14f42ef5f36d4b80e4)

## シェルスクリプト 拡張子を取得する

[参考URL](https://takuya-1st.hatenablog.jp/entry/2017/06/01/163000)

## 親ディレクトリを不変に取得する

[参考URL](https://qiita.com/KEINOS/items/bfd16189894c4bdace8e)

## ユーザー利用のシェルスクリプトを作成する

[参考URL](https://language-and-engineering.hatenablog.jp/entry/20101028/p1)

## Shell script

一般的には**シェルスクリプトは環境依存が激しいと言われている。**
一方で**移植性を高くするためのPOSIXという標準規格**があるためそれに準拠してシェルスクリプトを書けば問題ないはずと考える人もいるが問題がある。
また、シェルスクリプトは**小さいstringをコネコネといじるのに非常に不向き**

[シェルスクリプト御作法](https://qiita.com/autotaker1984/items/bc758fcf368c1a167353)
[shebang(シェバンについて)](https://sechiro.hatenablog.com/entry/20120806/1344267619)
[シェルスクリプト(コマンドライン引数)](https://maku77.github.io/linux/startup/command-line-params.html)
[シェルスクリプト例外処理](https://cloudpack.media/532)