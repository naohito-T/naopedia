# EC2

## EC2のインスタンスを停止しても勝手に新しくインスタンスが起動すること

EC2のインスタンスを停止しても勝手に新しくインスタンスが作られて起動してしまうようになった。 調べていくとよくわからず設定していたAuto Scalingが原因。
[参考URL](https://www.suzu6.net/posts/169-ec2-zombie/)

## EC2のデフォルトユーザについて

元々のec2-userは使うべきではない（アプリケーション用の新しいuserを作成する）  
だが、以下の場合だとそのままでもいいかもしれない

**そのままでもいいかもパターン**
- sshで接続されるのが自分のみ

**グループで使うパターン**
- ユーザごとに分けるべき

## EC2に別のパッケージマネージャーを入れる

[AWSリファレンス(homebrew)](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/sam-cli-install-linux-alt.html)

**ソフトウェアのコンパイルはすべての Amazon EC2 インスタンスで必要なタスクではないため、そのようなツールはデフォルトでインストールされていません。**
ただし、「Development Tools」という名前のパッケージグループで利用でき、`$ yum groupinstall`コマンドでインスタンスに簡単に追加されます。

## EC2のソフトウェア コンパイル事情
[AWS参考URL](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/compile-software.html)

EC2ではソフトウェアのコンパイルまでの責務は持っていない。  
そのためmake gcc autoconfなどのビルドツールをインストールしないといけない。  
しかし、AWSではデフォルトで必要な開発ツール（make gcc autoconf）をインストールできる準備はされており、コマンド一発でインストールできる

`% sudo yum groupinstall "Development Tools"`

## Amazon Linux 2 OSとは

[参考URL](https://www.acrovision.jp/service/aws/?p=609)

Amazon EC2上のOS人気は以下

1. Amazon Linux
2. Ubuntu
3. Debian

**Amazon Linux 2**
とくに **AWSの多くのサービスを容易に統合できる点が最大の特徴**

- AWSのサービスを運用するために必要なパッケージや設定が事前に入っており、多くの AWS サービスと容易に統合できる。
- AWSサポートに加入することで、AWSだけでなく、Amazon Linux のインストールや使用についてもサポートを受けることができる。
- Amazon EC2でのパフォーマンスが向上するように最適化されたカーネルと新しいバージョンのツールチェーンが付属されている
- デフォルトでSSHキーペアの使用およびリモートルートログインの無効化によるリモートアクセス制限の設定がされています。

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

## EC2のオートスケーリングについて

はい、EC2とLambdaはスケーリングの方法や考慮点が大きく異なります。以下にそれぞれの特徴や違いを挙げてみます。

### EC2（Elastic Compute Cloud）

1. **手動スケーリング**: 事前にインスタンスのタイプや数を選択する必要があります。トラフィックの増加を予想して、前もってインスタンスを追加する必要がある場合があります。

2. **Auto Scaling**: EC2ではAuto Scaling Groups (ASG)を使用して、トラフィックの増減に応じて自動的にインスタンスの数を増減させることができます。しかし、設定や監視が必要。

3. **継続的なコスト**: EC2インスタンスは実行中であればコストがかかります。停止していない限り、インスタンスは課金されます。

### Lambda

1. **自動スケーリング**: Lambdaはリクエストの増加に応じて自動的にスケールします。リクエストごとに新しいLambda関数のインスタンスが起動します。

2. **スケーリングの上限**: Lambdaには同時実行数の上限がありますが、これはAWSのリージョンやアカウント設定によって変わる場合があります。この制限に達すると、新しいリクエストはスロットリングされます。

3. **使用ベースの料金**: Lambdaは実際に関数が実行されたときだけ課金されます。リクエストの数や実行時間に応じて課金されます。

### まとめ

- **EC2**はより伝統的なスケーリングのアプローチを取っており、リソースの確保やスケーリングのための事前の計画が必要ですが、細かい設定やカスタマイズが可能です。
- **Lambda**はサーバーレスのコンセプトに基づいており、小規模から大規模なトラフィックに対して自動的にスケールする能力を持っています。しかし、実行時間、メモリなどのリソースに関する制限があるため、ユースケースに応じて適切に選択する必要があります。

実際の選択は、アプリケーションの要件、予想されるトラフィック、運用の複雑さ、コストの考慮など、多くの要因に基づいて行われるべきです。

## この章での単語説明

### スロットリング

「スロットリング」とは、AWS Lambdaのリソースや制限に達したときに**新しいリクエストや関数の実行を一時的に制限または拒否すること**を指す。  
具体的には、同時実行数の上限に達した場合、Lambdaは新しい関数の実行リクエストをスロットルします。

以下はスロットリングに関連する主な点です

同時実行数の上限: AWS Lambdaにはデフォルトでの同時実行数の上限が設定されており、これは**リージョンによっても変動**します。この制限に達した場合、新しいLambda関数の実行はスロットルされます。

再試行: イベントソースがAWSサービスの場合（例: Amazon S3, Amazon DynamoDB Streamsなど）、スロットルされたイベントはLambdaサービスによって自動的に再試行されます。

拡張可能な制限: AWS Lambdaの同時実行数の上限は、AWSサポートに連絡して増やすことができます。ただし、無制限に増やすことはできないため、要件に応じて適切に調整する必要があります。

エラーメッセージ: Lambda関数がスロットルされると、ThrottledReasonという名前のエラーメッセージがCloudWatch Logsに記録されます。

スロットリングは、システムが過負荷になるのを防ぐための重要なメカニズムです。Lambda関数が頻繁にスロットルされる場合、アーキテクチャの調整やリミットの増加リクエストを検討することが必要です。

## 踏み台サーバー: (Bastion)サーバー

踏み台サーバーを利用することでセキュアに運用を行うことができる。
- 踏み台サーバーを経由することで、誰がいつ、どのリソースにアクセスしているか管理することができるようになる。
- 踏み台サーバーを経由していないアクセスに関しては不正なアクセスとすることもできる


