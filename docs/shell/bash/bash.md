# bash

## コマンドオプション

**bash -c**
bash -cは直後の文字列を命令として読み込むためのオプション

```sh
$ bash -c "`curl -fsSL https://raw.githubusercontent.com/takuzoo3868/dotfiles/master/setup.sh `"
```

## bash スクリプトの先頭 の シェバンについて

[参考URL](https://moneyforward.com/engineers_blog/2015/05/21/bash-script-tips/)

## 2種類の shebang
シェルスクリプトの一行目に必ず記述する #! で始まる行を shebang と言う。
bash スクリプトの shebang は、bash を絶対パスで指定する方法と、env を使って指定する方法の二種類がある。


**bash を絶対パスを指定する方法**
`#!/bin/bash`

/bin/bashが使用される
※/bin/bashが存在しなければスクリプトの起動時にエラーとなる。

**env を使ってを指定する方法**
`#!/usr/bin/env bash`
後者は $PATH 上の bash が使われます。
（通常、bash は一か所にしか無いので、後者でも /bin/bash となる可能性が高いです。）
後者のメリットは、例えば `$HOME/.opt` 配下に最新の bash をインストールするなどした場合、`$PATH` にさえ入っていればそっちが使われるというのがあります。





