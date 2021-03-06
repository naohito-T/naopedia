# EC2

## EC2のインスタンスを停止しても勝手に新しくインスタンスが起動すること

EC2のインスタンスを停止しても勝手に新しくインスタンスが作られて起動してしまうようになった。 調べていくとよくわからず設定していたAuto Scalingが原因。
[参考URL](https://www.suzu6.net/posts/169-ec2-zombie/)

## EC2のデフォルトユーザについて

元々のec2-userは使うべきではない(新しいuserを作成する)
だが、以下の場合だとそのままでもいいかもしれない

**そのままでもいいかもパターン**
- sshで接続されるのが自分のみ

**グループで使うパターン**
- ユーザごとに分けるべき

## EC2に別のパッケージマネージャを入れる

[AWSリファレンス(homebrew)](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/sam-cli-install-linux-alt.html)

**ソフトウェアのコンパイルはすべての Amazon EC2 インスタンスで必要なタスクではないため、そのようなツールはデフォルトでインストールされていません。**
ただし、「Development Tools」という名前のパッケージグループで利用でき、`$ yum groupinstall`コマンドでインスタンスに簡単に追加されます。


## EC2のソフトウェア コンパイル事情

[AWS参考URL](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/compile-software.html)

EC2ではソフトウェアのコンパイルまでの責務は持っていない。
そのためmake gcc autoconfなどインストールしないといけない。
しかし、AWSではデフォルトで必要な開発ツール(make gcc autoconf)をインストールできる準備はされており、コマンド一発でインストールできる

`% sudo yum groupinstall "Development Tools"`

## Amazon Linux 2 OSとは

[参考URL](https://www.acrovision.jp/service/aws/?p=609)

Amazon EC2上のOS人気は以下

1. Amazon Linux
2. Ubuntu
3. Debian

**Amazon Linux 2**
特に **AWSの多くのサービスを容易に統合できる点が最大の特徴**

- AWS のサービスを運用するために必要なパッケージや設定が事前に入っており、多くの AWS サービスと容易に統合できる。
- AWS サポートに加入することで、AWS だけでなく、Amazon Linux のインストールや使用についてもサポートを受けることができる。
- Amazon EC2 でのパフォーマンスが向上するように最適化されたカーネルと新しいバージョンのツールチェーンが付属されている
- デフォルトで SSH キーペアの使用およびリモートルートログインの無効化によるリモートアクセス制限の設定がされています。


## Extrasとは

Extrasは**最新のアプリケーションソフトウェア更新をインストールできるようにする Amazon Linux 2のメカニズム**

```sh
# 使用可能なトピックのリストを表示する
$ amazon-linux-extras list

# トピックを有効にし、パッケージの特定のバージョンをインストールする
$ sudo amazon-linux-extras install topic=version topic=version
```

**注意**
amazon Extrasに入っていないパッケージに関しては**yumからinstallする**

## ポート開放

EC2のポートを開放するには
>AWSには標準で「セキュリティグループ」という機能がありますので特別な理由がない限りはこちらを使用してください。

後者はファイヤウォールの設定方法を覚える必要があります。またどちらの場合も、設定変更時に機器の再起動が必要になるケースもあるため必ずしも手軽とはいえません。


## インスタンスの料金について

**リージョンによってEC2の料金が変わる**

## Swap

EC2ではボリュームをSwapするなという概念がある。
だが実際には作ればいい話。
volumeをマウントすれば問題はない。

## yumについて

Amazon Linuxではyumがデフォルトだがパッケージ事態が古い(gitがversion2など)
だが、brewを入れることができるためパッケージには問題はなさそう。

