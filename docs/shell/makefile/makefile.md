# Makefile

Makefileはプロジェクトでよく使用されるタスクランナー
JSを使用する場合はpackage.jsonを使う`npm run`

[参考URL](http://masahir0y.blogspot.com/2012/02/linuxmakefile-4.html)
[Makefile ことはじめ](https://qiita.com/kasei-san/items/ad25df63260e86c5cc71)

LinuxカーネルのMakefileで多様されている

## make ファイル コマンド解析

Makefileの場合、個々のコマンド列は直接シェルによって実行されるのではなく、いったんmakeによって解釈されるという点に気をつけなくてはいけません。makefile中のコマンドはほかのシェルを指定しない限り、つねに`/bin/sh`によって解釈されます

## makeコマンド種類

Microsoft nmake (Windows)
Borland make (Windows)
GNU make（windows, UNIX系）
Solaris make (Solaris)

## makeコマンド種類

```sh
$ make --version
GNU Make 3.81
Copyright (C) 2006  Free Software Foundation, Inc.
This is free software; see the source for copying conditions.
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.

This program built for i386-apple-darwin11.3.0
```

## 前提

Makeを理解するには**コンパイルへの理解が重要。**

## Makefile 基本

[Makefileの基本](https://zenn.dev/keitean/articles/aaef913b433677)

主にMakefileは**makeにプログラムのコンパイルおよびリンク方法を指示する。**
Makefileに含まれる情報は主に3つ。

- 変数の定義（変数、自動変数、暗黙の変数、特殊変数）
- ルール
- その他（他のMakefileをoverrideするときの情報やデバッグ情報など）

## makeはどんな時に使うのか

makeはCのプログラムを生成するのに使われている
makeはそもそも複数のファイルが色々と依存して構成されているものをコンパイルするときに作業を軽減されるものとして開発された。
あるファイルが別のファイルに依存し、 そのファイルがまた別のファイルに依存しているような場合は、 正しい順番でそれらをコンパイルしなければならない。 また、元となるファイルのどれかひとつを修正したあとも、 コンパイルの順番を考えなくてはならない。makeはこのような作業を軽減する。
makeは、ファイルの生成規則さえ正しく書いてあれば、 コンパイルの順番を自動的に決定する。
makeは依存ファイルの更新日付を調べ、ある依存ファイルを修正したときのコンパイル回数を必要最小限抑えるようにする。
makeはこれらの動作を行う際に、 生成規則を記した “Makefile”という名前のファイルを参照する。
makeが生成するのはふつうCのプログラムだが、べつにCのプログラムに限らず、Makefileに書く生成コマンドの書きようによってはTeXのファイルだろうが、Javaのプログラムだろうが何でもmakeを利用して作業を軽減することができる。

## makeとは

makeはプログラムのビルド作業を自動化するツール
コンパイル・リンク・インストールなどのルールを記述したテキストファイル（Makefile）にしたがって、これらの作業を自動的に行う。
複雑に関連し合ったファイルの依存関係を解決するのがmakeの長所。

## makeを利用する意味

初期のホストサーバには何も入っていない。
しかしパッケージ管理ツールではmakeなど必然的に入れる必要がある（パッケージをダウンロードした際に、C言語やPythonを使用していたりなどコンパイルが必要になるため）
そのため比較的makeコマンドが入っている確率が上がる。そのためタスクランナーを環境差異がないようにするためMakefileの導入をする。

## 基本的なMakefileのフォーマット

```makefile
ターゲット(作りたいファイル名): 依存ファイル, 依存ファイル...
    コマンド # タブでスペースは4
    コマンド
  ...
```

## make実行

`make [ターゲット名]`

※`make`とだけ実行すると、Makefile内の一番最初のターゲットを実行する

```Makefile
clean:
    -rm a.out *.o	# 失敗しても make は中断しない

clean:
    @rm a.out *.o    # このコマンドを表示せずに実行

```

## 疑似ターゲット

ターゲットは基本的にターゲット名と同名のファイルを生成する処理
そのためmakeはターゲットと同名のファイルがすでにあると（依存関係がある時以外は）処理を行なわない。

## PHONYターゲット

.PHONY ${ターゲット名} という記載で、そのターゲットは、**ファイルは生成しない**という事をmakeに知らせることができる

- ターゲットの概念が必要

ターゲットは、基本的にターゲット名と同名のファイルを生成する処理
なので、makeは、ターゲットと同名のファイルがすでにあると（依存関係がある時以外は）処理を行わない

```sh
$ touch clean
$ make clean
make: `clean' is up to date.
```

---

## make データ型

Make言語のデータは基本的にテキスト文字列（ストリング）です。
しかし、文脈により文字列がワード、リスト、またはブール値（boolean）として解釈される。

## Makefileでの変数展開

[参考URL](https://www.nooozui.com/entry/20200129/1580277274)

= の場合は都度参照（つまりnew Dateすると時間が都度更新される）
:= の場合は1回のみの参照

```Makefile
# コマンド実行を変数に格納したい場合
FROM_DEPLOY_BRANCH := $$(git branch | head -n 1)
```

### Makefile変数参照

$(name)、または${name}
```makefile
objects = program.o foo.o utils.o # => program.o foo.o utils.o
program : $(objects)
        cc -o program $(objects) 
$(objects) : defs.h
```
---

## Makefile デバッグ方法

GNU Makeの`-n`オプションは、Makefileのコマンドを実行せずに出力します。

## Makefile Tips

[Makefileの関数一覧](https://qiita.com/chibi929/items/b8c5f36434d5d3fbfa4a)
[Makefile組み込み関数](https://tex2e.github.io/blog/makefile/functions)
[Makefileの基本](https://zenn.dev/keitean/articles/aaef913b433677)