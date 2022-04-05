# compiler

コンパイラについてまとめる(開発ツール群と呼ばれることもあるよ)

---

## 以下からは開発ツール群だよ

## GCC(GNU Compiler Collection)

[参考URL](https://qiita.com/chihiro/items/1725f9dbb51942534641)

GCCとは、GNUプロジェクトが開発および配布している様々なプログラミング言語のコンパイラ集のこと

このGCCの実行ファイル(コマンド)が`gcc`である

### インストール

`$ yum install gcc`

※**WindowsはMinGW**, **MacはXcode**を入れることでgccを使えるようになる

### gccコマンドとmakeコマンドの相関

Makefileを準備し、その中にコンパイルのためのコマンドをかく。
このファイルを準備することで`makeコマンド`を打つだけでコンパイルができるとのこと。
gccは直接はつかわなくても、makeをした際に内部的に使われている

---