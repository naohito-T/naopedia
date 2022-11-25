# リモート Linux サーバを開発環境にする

以下を見て触発された
[リモートの Linux サーバを開発環境にする](https://text.superbrothers.dev/210316-using-a-linux-server-as-a-development-environment/)

やはりできる人は筐体には興味を示さない。
macOSなどは買わずにリモートサーバで開発をする

- クリップボードを共有する
[参考URL](https://gist.github.com/pn11/c973af16d91f92f9874f)
[参考URL2](https://proshunsuke.hatenablog.com/entry/2015/08/10/003053)
※iTerm2を使用していれば設定をいじるだけでクリップボード共有ができた。

- openコマンドでlocalのブラウザを開けるようにする
これでリモートサーバからopenでブラウザが開ける。
[リファレンス](https://github.com/superbrothers/opener)
[その人のブログ](https://text.superbrothers.dev/210316-using-a-linux-server-as-a-development-environment/)

- ファイルマネージャーを導入する
vimライクなrangerかlfか

[lf:リファレンス](https://github.com/gokcehan/lf)

- ローカルからコマンドひとつでリモートプロジェクトをvscodeで開く
[参考URL](https://www.kerislab.jp/posts/2021-01-16-sshcode/)

- tmuxの設定をする

- リモートのDockerへ接続する

1. まずはリモートのグローバルipアドレスを調べる

```sh
$ hostname -I
164.70.101.172 172.17.0.1 172.22.0.1 172.18.0.1
```

2. グローバルipがどれか調べる

可変なのか調べる必要もあるかも？
>今、この瞬間、みなさんは自分のPCをインターネット接続して「ネットワークエンジニアとして」のWebサイトを閲覧しているので、みなさんのPCには上記のグローバルIPアドレスが付与されています。

[参考URL](https://www.infraexpert.com/study/ip5.html)

3. 接続（PCからリモートのDocker確認）

nc -vz 18.181.164.122 3000

---
## VPSでブラウザを開く
[参考URL](https://www.kagoya.jp/howto/cloud/vps/ubuntu_gui/)
ホストマシンのメモリ枯渇が腹たつため対応。

### 前提

CUIと同じようにTera Termなどのターミナルエミュレーターから接続しても、GUIでの画面表示はできません。
表示にはリモート接続の設定が必要です。
ご自身の手の届く範囲にサーバーがあり、サーバーにモニターを接続すればGUIの画面が確認できます。
VPSではそれができないため最初に用意する必要がある。

- リモートデスクトップを受け付けるライブラリをインストールする
Windows OSやmacOSには「リモートデスクトップ接続」機能があり、これを使って接続する方法があります。リモートデスクトップ接続でUbuntuにGUIでログインできるようにするには`xrdp`をインストールしておく必要があります。インストール方法は以下の通りです。

```sh
apt update
apt upgrade
apt -y install xrdp tigervnc-standalone-server
systemctl enable xrdp
```

