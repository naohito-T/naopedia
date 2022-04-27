# Homebrew

## Brewfileを使う

[参考URL](https://qiita.com/d0ne1s/items/90974ad472c2d891e784)

欲しいアプリをファイルに定義して、コマンドを叩くだけでインストールされる。

1. Gitなどコマンドラインで使うツール
2. GoogleChromeなどインストーラーを使っていれるアプリ
3. LINEなどAppStore経由でいれるアプリ

上記がすべてコマンド1つで揃う。

## Brewfileの書き方

冒頭にcask_args appdir: "/Applications"と書いて、GoogleChromeなどインストーラーを使っていれる系のアプリの保存場所を指定します。