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

## brew shellenv

homebrewnの設定ファイルが確認できる。

```sh
$ brew shellenv
export HOMEBREW_PREFIX="/usr/local";
export HOMEBREW_CELLAR="/usr/local/Cellar";
export HOMEBREW_REPOSITORY="/usr/local/Homebrew";
export PATH="/usr/local/bin:/usr/local/sbin${PATH+:$PATH}";
export MANPATH="/usr/local/share/man${MANPATH+:$MANPATH}:";
export INFOPATH="/usr/local/share/info:${INFOPATH:-}";
```

## homebrew仕組み

過去の仕組み（arm（m1）ではなく、インテルの）
[参考URL](https://qiita.com/omega999/items/6f65217b81ad3fffe7e6)


```sh
# コマンド実体
/usr/local/Cellar

# コマンドのエイリアス
/usr/local/bin
```


| キーワード | 本来の意味|  たとえ|
| --- | --- | --- |
|brew     |  ビールを醸造する   |   makeする  |
| homebrew    |  自家醸造   |  ユーザ自らがビルドする   |
| celler    |  ビール貯蔵庫   |  インストール（保存）先   |
| keg    |  樽、醸成用   |  make材料   |
|  formula   | 調理法、手順    |   ビルド方法、手順が書かれたスクリプト  |

## Homebrew インストーラー

現時点のHomebrewのインストーラーは、
Rosettaを有効にしているターミナルでは`/usr/local/`を基準にしたディレクトリ下でIntel向けのバイナリを
Rosettaを無効にしているターミナルでは`/opt/homebrew/`を基準にしたディレクトリ下でM1向けのバイナリを
展開するように動きます。(2021年1月初めごろにはすでにこの挙動になっていました）

/usr/local/binはもともとパスが通っているのでそこに入ったbrewコマンドはそのまま動きますが、/opt/homebrew/binにはパスが通っていないのでそこに入ったbrewコマンドを動かすにはパスを通す必要があります。
その時"パスを通す"という作業をさせるのではなく、他に必要なもろもろをおこなうeval $(/opt/homebrew/bin/brew shellenv)を実行するように上記メッセージでは促しています。

## 

macOS各環境インストール

[参考URL](https://webrandum.net/cannot-install-under-rosetta2-in-arm-default-prefix/)

```sh
$ arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
==> Checking for `sudo` access (which may request your password)...
Password:
Sorry, try again.
Password:
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew

Press RETURN/ENTER to continue or any other key to abort:

🎊: ~
$ arch -arm64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
==> Checking for `sudo` access (which may request your password)...
Password:
Sorry, try again.
Password:
==> This script will install:
/opt/homebrew/bin/brew
/opt/homebrew/share/doc/homebrew
/opt/homebrew/share/man/man1/brew.1
/opt/homebrew/share/zsh/site-functions/_brew
/opt/homebrew/etc/bash_completion.d/brew
/opt/homebrew
==> The following new directories will be created:
/opt/homebrew/bin
/opt/homebrew/etc
/opt/homebrew/include
/opt/homebrew/lib
/opt/homebrew/sbin
/opt/homebrew/share
/opt/homebrew/var
/opt/homebrew/opt
/opt/homebrew/share/zsh
/opt/homebrew/share/zsh/site-functions
/opt/homebrew/var/homebrew
/opt/homebrew/var/homebrew/linked
/opt/homebrew/Cellar
/opt/homebrew/Caskroom
/opt/homebrew/Frameworks
```

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
