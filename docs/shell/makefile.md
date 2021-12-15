# Makefile

[参考URL](http://masahir0y.blogspot.com/2012/02/linuxmakefile-4.html)
[Makefile ことはじめ](https://qiita.com/kasei-san/items/ad25df63260e86c5cc71)

LinuxカーネルのMakefileで多様されている

## makeとは

makeはプログラムのビルド作業を自動化するツール
コンパイル・リンク・インストールなどのルールを記述したテキストファイル(Makefile)に従って、これらの作業を自動的に行う。
複雑に関連し合ったファイルの依存関係を解決するのが make の長所である。

## makefile実行

デフォルトはMakefileの一番上のターゲットのルールを実行する。

## 基本的なMakefileのフォーマット

ターゲット(作りたいファイル名): 依存ファイル, 依存ファイル...
  コマンド
  コマンド
  ...

## make実行

`make [ターゲット名]`

## 疑似ターゲット

ターゲットは基本的にターゲット名と同名のファイルを生成する処理
そのためmakeはターゲットと同名のファイルが既にあると(依存関係がある時以外は)処理を行なわない。


## PHONYターゲット

.PHONY ${ターゲット名} という記載で、そのターゲットは、ファイルは生成しないという事を make に知らせることができる

- ターゲットの概念が必要

ターゲットは、基本的にターゲット名と同名のファイルを生成する処理
なので、make は、ターゲットと同名のファイルが既にあると(依存関係がある時以外は)処理を行わない

```sh
$ touch clean
$ make clean
make: `clean' is up to date.


```