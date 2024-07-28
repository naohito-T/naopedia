# Ubuntu

[Ubuntu環境構築](https://ubuntu.perlzemi.com/blog/20200529085516.html)

## 概要

UbuntuはDebian GNU/Linuxを母体としたオペレーティングシステム。
Linuxディストリビューションのひとつ。

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

ただし
aptはCLIインターフェイスでは安定していないので、スクリプトの中で使う時は注意する必要があるとのこと。
aptはエンドユーザー向けでインララクティブに使いたい場合使うもの。
なので、シェルスクリプトなどエンドユーザー向けでない場合は、apt-getやapt-cacheを使うことが推奨とされています。


## apt

※`apt-get`で記載しているが実際には変わらないだろう

[オプション](http://www.ne.jp/asahi/it/life/it/linux/linux_command/linux_apt-get.html)

`apt-get update`
インストール可能なパッケージの一覧を更新する

`apt-get update -qq`オプション
ログを極力表示させたくないときは`-qq`オプションを使う。
エラー以外は表示しない。

`apt-get upgrade`
インストール済みのパッケージ更新を行い、新しいバージョンにアップグレードする
有効なパッケージ一覧をもとに実行されるため`apt-get update`と組み合わせて使う必要がある。

## apt パッケージダウンロード仕組み

[参考URL](https://www.kimoton.com/entry/20181123/1542961698)

>APT の場合、基準になる Packages ファイルは Debian アーカイブミラーから提供されます。ですから、利用できるパッケージのデータベース内を検索する際に、毎回ネットワークを使うのはとても非効率的です。このため、APT は (/var/lib/apt/lists/ に) データベースのコピーを保存し、このコピーを使って検索します。同様に、/var/cache/apt/archives/ にはこれまでにダウンロードしたパッケージのキャッシュを保存しています。これは削除後の再インストール時に同じファイルをダウンロードするのを避けるためです。

## Ubuntuにpostgresをインストールする

[リファレンス](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart-ja)

## useraddとadduserの違い

[参考URL](https://qiita.com/kaitoland/items/386ebc94c3efa17bbecb)

Fedora/CentOS系では両方は同じコマンド

Debian系だと
useraddは**コマンド一発で作るタイプ**
adduserは**対話形式で作るタイプ**

※ubuntuで**useraddだとデフォルトではホームが作成されない。**

adduserの設定は
/etc/adduser.confで変えられます。

こちらはデフォルトでホームディレクトリを作ってくれます。
useraddのようにコマンド一発で作れるのは大量のユーザーを作る時に便利なようです。
単にユーザーを追加したい時にはadduserのほうが良さそうですね。





