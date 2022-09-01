# Homebrew

忘れてはいけないのは、homebrewは**ユーザーレベルでインストールするパッケージマネージャー**

ホストマシンでひとつではないため汎用性が高い。
Homebrewではホームディレクトリ内でパッケージを管理するためsudoを使わないのもメリット

## ユビキタス

フォーミュラ: Homebrewではインストールしたパッケージのこと

## コマンド

[参考URL](https://parashuto.com/rriver/tools/homebrew-most-used-commands)

## Homebrew 各OS ユーザーディレクトリインストール先

Ubuntu
`/home/ubuntu/.linuxbrew/bin/openssl`

macOS
`/usr/local/Cellar/`

```sh
# macOS コマンドディレクトリ
$ which openssl
/usr/bin/openssl
```

homebrewを指さないときは
PATHを変更する


## Homebrewでのパッケージ呼び名

Homebrewではパッケージを**Fomula（フォームラ）**と呼ぶ。

## Brewfileを使う

[参考URL](https://qiita.com/d0ne1s/items/90974ad472c2d891e784)

欲しいアプリをファイルに定義して、コマンドを叩くだけでインストールされる。

**ただ以下に関してはmac移行ツールがあるため不要かもしれない**

1. Gitなどコマンドラインで使うツール
2. GoogleChromeなどインストーラーを使っていれるアプリ
3. LINEなどAppStore経由でいれるアプリ

上記がすべてコマンド1つで揃う。

---

## Brewfileの書き方

冒頭にcask_args appdir: "/Applications"と書いて、GoogleChromeなどインストーラーを使っていれる系のアプリの保存場所を指定します。

フォーミュラとして追加する時。(brew tap)
`tap "homebrew/bundle"`

brew installで入れるもの。主にCLIのツール。
`brew "anyenv"`

brew install --caskで入れるもの。主にGUIのツール。
**ChromeなどのブラウザやZoom**などはこれで入れる。
`cask "google-chrome"`

## homebrew 自体をアンインストール

Homebrew自体を消すと、**インストールしたpackageも全部消える。**

## homebrew 環境構築手助け

環境構築を手助けしてくれる`brew doctor`というコマンドがある。
※基本的には指示にしたがって、表示されたコマンドを実行していけば良い。

## homebrewをubuntuやcentosなどにインストールする意味

Ubuntu標準パッケージマネージャー aptと比べて次のような特徴
- ホームディレクトリにパッケージをインストールできるためsudoが不要
- 使用しているディストリビューションでパッケージ化されていないソフトウェアもインストール可能
- 最新バージョンのパッケージをインストールできる
- クロスプラットフォームであるためmacOSとWindows（WSL）とLinuxで同じパッケージマネージャーを使える

## homebrew 通常版とarm版

通常盤
`arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

ARM版
`arch -arm64e /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

## Ubuntu memo

[homebrew-on-linux](https://docs.brew.sh/Homebrew-on-Linux)
[参考URL](https://tech-blog.cloud-config.jp/2019-07-19-homebrew-on-wsl/)


