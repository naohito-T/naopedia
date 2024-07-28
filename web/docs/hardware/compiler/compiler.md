# compiler

コンパイラについてまとめる（開発ツール群と呼ばれることもある）

一般的なコンパイラ
一般的なコンパイラは、ソースコードからオブジェクトファイルを作るだけです。
実行ファイルを作るにはリンカーをさらに通さなくては行けません。
コンパイルを自動化するメイクファイルの作成も必要になります。
これらをとくに意識する必要がなく、ソースコードを準備するだけで実行ファイルまで作ってくれるのがビルダー

---

## コンパイラ

一般的にコンパイラは次の3つの仕事がある

- ソースコードを解析し、問題点をチェックする
- ソースコードを別の言語に変換する
- 最適化する
  - 実行速度が速くなるようにする
  - 少ないメモリで動くようにする
  - 少ない電力で済むようにする
  - 実行ファイルのサイズを小さくする

## コンパイル時評価 or コンパイル時実行

コンパイル時に計算や最適化を行うことは、コンパイル時評価（Compile-time evaluation）やコンパイル時実行（Compile-time execution）として知られています。以下は、この特性を持つ言語や機能の一部です：

1. **Rust**：Rustのマクロや `const` 関数はコンパイル時に評価されます。
2. **C++**：C++11以降の `constexpr` キーワードを用いた関数や変数は、コンパイル時に計算が可能です。
3. **Haskell**：Haskellのコンパイラは遅延評価と強力な型システムを持ち、コンパイル時に計算を行うことができます。
4. **D言語**：D言語は `static` キーワードを使用してコンパイル時に計算を行うことができます。
5. **Scala**：Scalaのマクロや `inline` キーワードを使って、コンパイル時に計算やコード変換を行うことができます。
6. **Metaprogramming in C**：C言語のテンプレートメタプログラミングは、実際にはマクロやテンプレートの評価をコンパイル時に行う技法です。
7. **Forth, Lisp, Scheme**：これらの言語は、コードがデータとして扱われることから、コンパイル時に計算を行う能力を持っています。
8. **Template Haskell**: Haskellのテンプレート機能を使用して、コンパイル時にコードを生成・評価できる。

これらの言語や機能は、**コンパイル時に計算を行い、実行時のオーバーヘッドを減らすことができるという利点**があります。  
ただし、コンパイル時の計算が複雑になりすぎると、コンパイル時間が大幅に増加する可能性があるため、使用時には注意が必要です。

## 以下からは開発ツール群だよ

## GCC(GNU Compiler Collection)

[参考URL](https://qiita.com/chihiro/items/1725f9dbb51942534641)

GCCとは、GNUプロジェクトが開発および配布している様々なプログラミング言語のコンパイラ集のこと

このGCCの実行ファイル(コマンド)が `gcc` である

### インストール

`$ yum install gcc`

※**WindowsはMinGW**, **MacはXcode**を入れることでgccを使えるようになる

### gccコマンドとmakeコマンドの相関

Makefileを準備し、その中にコンパイルのためのコマンドをかく。
このファイルを準備することで `makeコマンド` を打つだけでコンパイルができるとのこと。
gccは直接はつかわなくても、makeをした際に内部的に使われている

---