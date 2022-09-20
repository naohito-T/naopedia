# Shell Script

[作成する前に見ろ](https://qiita.com/jpshadowapps/items/d6f9b55026637519347f)

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