# Homebrew

忘れてはいけないのは、homebrewは**ユーザーレベルでインストールするパッケージマネージャー**

ホストマシンでひとつではないため汎用性が高い。
Homebrewではホームディレクトリ内でパッケージを管理するためsudoを使わないのもメリット

## ユビキタス

フォーミュラ: Homebrewではインストールしたパッケージのこと

## Brewfileを作成

[参考URL](https://kakakakakku.hatenablog.com/entry/2020/09/17/124653)

```sh
# これでカレントにBrewfileが作成される
$ brew bundle dump
```

---

## コマンド

[参考URL](https://parashuto.com/rriver/tools/homebrew-most-used-commands)
[参考URL2](https://qiita.com/fuqda/items/db8aff0ba4068aea2cc6)

### brew info [フォーミュラ]

`brew info`で表示される以下項目の説明

×はまだパッケージを持っていないということ。
Build
ビルドに使うよ

Required
必須なパッケージのこと

### brew switch

インストールされているツールのバージョンを切り替えられる。

## brew services

自動起動させることができる

```sh
# 自動起動開始
brew services start [パッケージ]
# 自動起動を止めたければ
brew services stop
# 自動起動リスト
brew services list
```

## brew list

インストールしたパッケージを一覧に出す

## brew uninstall 

---

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

## homebrew 通常版とarm版

通常盤
`arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

ARM版
`arch -arm64e /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

## Ubuntuにhomebrewを導入する

Linux版がmacOS版に統合されたため使える。

[homebrew-on-linux](https://docs.brew.sh/Homebrew-on-Linux)
[参考URL](https://tech-blog.cloud-config.jp/2019-07-19-homebrew-on-wsl/)

## homebrewをubuntuやcentosなどにインストールする意味

Ubuntu標準パッケージマネージャー aptと比べて次のような特徴
- ホームディレクトリにパッケージをインストールできるためsudoが不要
- 使用しているディストリビューションでパッケージ化されていないソフトウェアもインストール可能
- 最新バージョンのパッケージをインストールできる
- クロスプラットフォームであるためmacOSとWindows（WSL）とLinuxで同じパッケージマネージャーを使える
