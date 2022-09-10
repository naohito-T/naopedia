# Ubuntu

[Ubuntu環境構築](https://ubuntu.perlzemi.com/blog/20200529085516.html)

## 概要

UbuntuはDebian GNU/Linuxを母体としたオペレーティングシステム。
Linuxディストリビューションのひとつである。

## version確認方法

```sh
$ cat /etc/lsb-release
```

[参考URL](https://www.delftstack.com/ja/howto/linux/how-to-check-the-version-of-ubuntu/#lsb_release-%25E3%2582%25B3%25E3%2583%259E%25E3%2583%25B3%25E3%2583%2589%25E3%2582%2592%25E4%25BD%25BF%25E3%2581%25A3%25E3%2581%25A6-ubuntu-%25E3%2581%25AE%25E3%2583%2590%25E3%2583%25BC%25E3%2582%25B8%25E3%2583%25A7%25E3%2583%25B3%25E3%2582%2592%25E7%25A2%25BA%25E8%25AA%258D%25E3%2581%2599%25E3%2582%258B)

## openコマンドを使う

macOSなどのopenコマンドは以下をインストールすればいける
※リモートサーバー上だとできない

[参考URL](https://installati.one/ubuntu/20.04/xdg-utils/)

## apt と apt-getの違い

aptのが新しい。基本はそっちを使う。

>apt-get は最初のコマンドラインベースフロントエンドで、APT プロジェクト内で開発されました。apt は APT から提供されているもう一つのコマンドラインベースフロントエンドで、apt-get の持っていた設計上のミスを克服しています。


