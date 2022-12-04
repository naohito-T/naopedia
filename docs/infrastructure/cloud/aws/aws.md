# aws

aws関連

[AWS Cloud Quest](https://www.itmedia.co.jp/news/articles/2203/17/news092.html)

---

## AWS CLI

AWSコマンドラインインターフェイス (AWS CLI) は、AWSのサービスを管理するための統合ツール。
ダウンロードおよび設定用の単一のツールのみを使用して、コマンドラインからAWSの複数のサービスを制御し、スクリプトを使用してこれらを自動化することができる。

### AWS CLIを使うとき



---

## config credentialsを作成する

AWS CLIはaws configureで指定された機密性の高い認証情報を**ホームディレクトリの`.aws`という名前のフォルダーにあるcredentialsへ保存する**

**config**
aws configureで指定された**機密性の低い**オプションを保存する
cliを使う上での設定を記載したファイル。

**credentials**
aws configureで指定された**機密性の高い**認証情報を保存する
AWSに接続するための認証情報

## config credentials
[リファレンス](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-files.html)

頻繁に利用される構成設定および認証情報をAWS CLIが維持するファイルに保存できる。
CLIは`default`という名前のプロファイルにある設定を使用する。

## 名前付きプロファイル
[リファレンス](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-profiles.html)


---

## AWS CDK
[5分で理解するAWS CDK](https://qiita.com/Brutus/items/6c8d9bfaab7af53d154a)
[リファレンス](https://aws.amazon.com/jp/cdk/faqs/)
AWSクラウド開発キット (AWS CDK) は、最新のプログラミング言語を使用してクラウドインフラストラクチャをコードとして定義し、それを**AWS CloudFormation**を通じてデプロイするためのオープンソースのソフトウェア開発フレームワーク。

TypeScriptおよびPythonなどのプログラミング言語を使用して、AWSリソースを定義し、Terraformの様にInfrastructure as Code（以降、IaC）を実現する手段として、クラウドインフラのリソースをプロビジョニングすることができる。

`CDK（TypeScripts or Python ...etc → CloudFormation Template（JSON or YAML）`

## CDK メリット

`$ cdk deploy`コマンドが優秀
CloudFormationで同じことをしようとしたら
- 初回実行時は普通にデプロイ
- 二度目以降は変更セットを作成して差分デプロイ（みたいなヘルパースクリプトが必要）
- クロスリージョン参照ができる（cdk-remote-stackパッケージを使用）（us-east-1 で作らないといけないリソースがあっても安心）
- S3 バケットの同期や CloudFront のキャッシュ削除までできる

## AWS CDK と CloudFormationの関係

`AWS CDK`は、最新のプログラミング言語のすべての機能を活用して`AWS Infrastructure as Code`を定義する、デベロッパー中心のツールキットと考えることができる。
AWS CDKアプリケーションが実行されると、それらは**完全に形成されたCloudFormation JSON/YAMLテンプレートにコンパイル**され、プロビジョニング用にCloudFormationサービスへ送信される。
AWS CDKはCloudFormationを利用しているため、CloudFormationの安全なデプロイ、自動ロールバック、ドリフト検出などのすべての利点がそのまま提供されます。

## AWS CDK と AWS SAMの関係

>AWS サーバーレスアプリケーションモデル（SAM）と AWS CDK はどちらも`AWSインフラストラクチャをコード`として抽象化しているため、クラウドインフラストラクチャを簡単に定義できる。
>AWS SAM は特にサーバーレスのユースケースとアーキテクチャに焦点を当てており、コンパクトで宣言型の JSON/YAMLテンプレートでインフラストラクチャを定義できる。
>AWS CDK は、AWS のすべてのサービスを幅広くカバーしており、TypeScript、Python、C#、Java などの最新のプログラミング言語でクラウドインフラストラクチャを定義できます。AWS SAM と AWS CDK は、どちらも CloudFormation をインフラストラクチャスタックのプロビジョニングエンジンとして利用します。

つまりAWS SAMはサーバーレスに特化している。

## アベイラビリティゾーン(AZ):Availability Zone
[参考URL](https://e-words.jp/w/%E3%82%A2%E3%83%99%E3%82%A4%E3%83%A9%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3%E3%82%BE%E3%83%BC%E3%83%B3.html)

アベイラビリティゾーンとは、AWSである地域に立地する**データセンター群をひとつの論理的な管理単位**にまとめたもの。
各リージョン内は2つ以上のAZで構成されている。

## マルチAZ
[参考URL](https://e-words.jp/w/%E3%83%9E%E3%83%AB%E3%83%81AZ.html#:~:text=%E3%83%9E%E3%83%AB%E3%83%81AZ%E3%81%A8%E3%81%AF%E3%80%81%E7%B1%B3,%E3%81%AE%E9%85%8D%E7%BD%AE%E3%82%92%E8%A1%8C%E3%81%86%E6%96%B9%E5%BC%8F%E3%80%82)

マルチAZ配置は同じリージョンのAZを同時に2つ以上使用し、サーバや機能、データを分散して配置する。
バックアップやフェイルオーバーをAZをまたいで行うことで可用性や耐障害性を高めることができる。
サービスの種類にもよるが、単一のAZのみで運用するシングルAZ（Single-AZ）に比べ利用料金が高額となる（他の構成が同じなら2倍程度



## IAM(Identity and Access Management)

ユーザに対してAWSのアクセスを制御する仕組みのこと
※CloudFrontやRoute 53と同様、グローバルサービスのためリージョンを気にする必要がない

## OAI(Origin Access Identity)

S3からCloudfrontを一意に特定する識別子

## Sid(Statement Id)

お客様がポリシードキュメントに与える任意の識別子。
Sid値は、ステートメント配列内の各ステートメントに割り当てることができる。


## Lambdaなどのerrorに関して

LambdaなどのerrorはcloudWatchに紐づいているため、デフォルトで通知される。とのこと


## AWS アクセスキー

Amazon Web Services(AWS)にアクセスするには、まずアクセスキーが必要。
アクセスキーは**AWSで個人を識別する認証情報**であり、アクセスキーID (ユーザー名のようなもの）とシークレットアクセスキー（パスワードのようなもの）の2つの部分から構成されています。
アクセスキーを作成するには、S3への認証許可が必要です。

## AWS CLIの認証設定をする際の注意

AWS CLIを使うためにはAWSにアクセスするためのアクセスキー(アクセスキーIDとシークレットアクセスキー)が必要になる。

## オンプレミス(所有)

所有はすべてを自社で管理する方式。必要なコンピューターー資源はすべて購入して構築から運用まですべて自社で行う。

↓
所有形態の場合、初期に多額のコストがかかる。また運用を自ら行わなければいけないため運用に携わる技術者が必要となってしまう。

## レンタル

コンピューターー資源を所有することは非常に大変
しかしレンタル期間は1か月単位、あるいはそれ以上になることが普通。コンピューターー資源の増減は電話やメール・書面などのやりとりとなるため今すく使いたいというニーズに答えることが難しい。インフラ障害が発生したときにもレンタル会社に依頼することしかできず、復旧が遅れる場合がある。

## クラウド

コンピューターー資源を1時間単位、あるいは1分単位で借りることができる。


## s3

メンテナンス用画像を配置できる。まさかの方法もあった

## AWS CDK(Cloud Development Kit)

[参考URL](https://www.skyarch.net/column/aws-cloud-development-kit-cdk/)

AWS CDK(Cloud Development Kit)は**AWS上のリソースをコンポーネント化**して提供し、AWS上でのアプリケーション開発を支援するサービス
AWS Cloud DEvelopment Kitが必要とされる理由は、AWSを操作するその他の方法の課題を解決するためのもの

**AWSを操作する方法**
一番有名なのはマネジメントコンソール
マネジメントコンソールを始めるのは簡単だが以下の課題もある。
- 操作のために操作手順書が必要になる
- 画面を使った操作なので、繰り返し人間の操作が必要になる。
- 人間の操作はヒューマンエラーのリスクがある
- 作業に労力と時間がかかる

SDKやCLIといったスクリプトを使って操作手順を定義する方法は繰り返し使用することが可能だが、**アップデートを行う際にはその都度手順を変えなければならない。**

これらの、AWSを操作するその他の方法の持つ課題を解決するために活用されるのがAWS Cloud Development Kit (CDK)

AWS Cloud Development Kit (CDK)は、AWSの環境を一般のプログラム言語で記述できるツールで、オープンソースで開発されているので、ユーザーが拡張することも可能です。

## AWS CDK(Cloud Development Kit) メリット

- 簡単にawsサービスを活用できる
AWS Cloud Development Kit (CDK)では、専門的な知識が必要ではなく新たに学習することなく今まで活用してきた知識とスキルで使用が可能なため、AWSサービスを使ったアプリケーション開発を簡単に取り入れることができます。

- 現在使っているプログラミング言語やツールを使用できる
アプリケーション開発のために新しいプログラミング言語やツールが必要になると、時間と労力がかかります。AWS Cloud Development Kit (CDK)は、下記のような多くのプログラミング言語が使用でき、既に使用しているIDEやテストツール、ワークフローパターンを使用することができます。

TypeScript
Phthon
Java
.NET

- AWS CloudFormationとの連携
AWS Cloud Development Kit (CDK)を使ってインフラストラクチャを定義すれば、AWS CloudFormationに連携することで、Amazon EC2 インスタンスやAmazon RDSDB インスタンスといったAWSリソースを使ったプロビジョニングができます。

- コンポーネントをカスタマイズしてスピードを加速する
AWS Cloud Development Kit (CDK)では、開発チームや組織でAWSサービスをいくつか組み合わせて使う必要がある場合の組み合わせや、定型文、ロジックなどのコンポーネントを組織のセキュリティやコンプライアンス、ガバナンスなどを考慮したかたちでカスタマイズできます。

カスタマイズされたコンポーネントは繰り返し使用でき、開発チームや組織で簡単に共有できます。そのことで、新規のプロジェクトなどが発生してもスピーディーに開発を進めることが可能となります。


開発言語にTypeScriptを使用する場合はデプロイする前にCDKテンプレートがビルド(コンパイル)されている必要がある。

## CloudFormationは、AWS CDKから使うのが正解な気がしてきた

[参考URL](https://www.kwbtblog.com/entry/2020/11/21/100556)

## AWS CDKとは？

一言で言うとCloud Formation テンプレートジェネレーター
TypeScript等のプロブラム言語で、CloudFormationテンプレートを出力するプログラムが書けます。

また、出力したテンプレートを使ってCloudFormationへのデプロイもAWS CDK上で行うこともできます

## テンプレートをプログラムで書くとは

プログラムは下記のような流れになる

1. AWSの各種リソースがクラスとして定義されていて、デプロイしたいAWSリソースのクラスをnewでオブジェクトとして生成していきます。
2. オブジェクトは親子関係を持っていて、CloudFormationのスタックを頂点とした、リソースのオブジェクトツリーを構築していきます。

ユーザーが書くプロブラムはここまでで、このプロブラムを実行すると、構築されたオブジェクトツリー全体が、CloudFormationテンプレートとして出力されます。

## CloudFront

webでよく使われる
一番レイテンシーの低いサーバにアクセスがいく

- そもそもCDNとは？
CDNとはコンテンツデリバリーネットワークの略。
負荷分散をするためのコンテンツを配信するためだけのネットワークのことを指す
単にファイル(画像やZIPファイル)をダウンロードするための技術

- アクセス方法
CDNはwebサーバを並べるだけとは違い
アクセス元から見て一番近くにあるサーバを自動で選択してダウンロードさせることで表示が高速化される。
CDNのキャッシュサーバはアクセスされたキャッシュサーバにキャッシュがなかったらオリジンサーバ（稼働している元のWebサーバ）にアクセスを行い、データを取ってくることでwebサーバのようにすべてのサーバに同じデータを置かなくても良い。

## Cloudfront のメリット

- 高パフォーマンス
世界中の主要都市のほとんどに設置されているエッジロケーションを介してコンテンツ配信を行うことで高速な通信が可能になる。

- 可用性の向上
エッジロケーションを通してコンテンツ配信を行うことにより、オリジンサーバのワークロードを減らし、アプリケーションの可用性を高めることができる。

- 無料のHTTPS証明書を提供している


## S3とAmazon CloudFrontの違い

[参考URL](https://www.acrovision.jp/service/aws/?p=1441)

ファイルのダウンロードを目的として場合、AmazonS3だけでも事足りるように思えるが、CloudFrontを利用した際のメリットとは
Amazon CloudFront を利用しないで直接 Amazon S3 などのオリジンサーバーからオブジェクトを取得した場合を比較したとき、一番大きな特徴がエッジデリバリーによるメリットの有無となります。


[nuxt.js S3と CloudFrontを使用してAWSへデプロイ](https://develop365.gitlab.io/nuxtjs-2.8.X-doc/ja/faq/deployment-aws-s3-cloudfront/)
[S3とCloudFrontでホストしたNuxtjsをGithub Actionsでデプロイする](https://www.blog.danishi.net/2021/04/30/post-4897/)


AWS CDKを使ってS3とCloudFrontを作成する
作成した後、SPAをdeployする
まあ料金は高くなるだろう。

## マルチAZ配置

マルチAZとは、米アマゾンドットコム（Amazon.com）社のAmazon Web Services（AWS）におけるシステム構成のひとつで、複数のアベイラビリティゾーン（AZ）にまたがってシステムの配置を行う方式。

AZ = アベイラビリティーゾーン

## Serverless Framework

LambdaはAWSコンソールから作成できるが、コードのGit管理、ローカルでのデバッグ、デプロイの自動化などを行おうとする場合、何らかしらのツールを使用することが一般的。

その際に使用する代表的なツールとして、 Serverless Frameworkがある。
Serverless Frameworkは、AWS以外のプラットフォームでも使用できるマルチクラウド対応のサーバレスアプリケーション開発支援ツールです。

## CloudFormation

CloudFormationはプログラミング言語やテキストファイルを使用してAWSリソースを自動で構築するサービスです。 所望のAWS環境をテンプレート化しておくことで、同じ環境を作成する時間を削減することができます。

## AWS アクセスキー

**アクセスキーはAWSで個人で識別する認証情報(ユーザ名のようなもの)**

AWSにアクセスするにはまずアクセスキーが必要。
アクセスキーはAWSで個人で識別する認証情報であり、アクセスキーID(ユーザ名のようなもの)とシークレットアクセスキー(パスワードのようなもの)

## S3のアクセスキーとシークレットキーを作る方法

[参考URL](https://off.tokyo/blog/s3-aws/)

1. S3のアクセスキーとシークレットキーを作成するにはIAMユーザを作る必要がある。
2. グループのを作る
3. グループの名前と使用用途を決める。例: node.jsからs3へ画像をアップしたrい、取得したり

## バージニア北の理由

バージニア北のが色々制限はゆるい。


## CloudFrontとAPI Gatewayの違い

API GatewayがListenするのはHTTPSのみで、**HTTPリクエストを受け付ける事はできない**
一方、CloudFrontはHTTPとHTTPSの両方のリクエストを受けられるのでCloudFrontを経由することでAPI GatewayへのリクエストをHTTPで受けることができる。

## ~/.aws/配下のファイルについて

config
**AWS CLI**を使うときのプロファイル別情報

credentials
**AWS SDK, AWS CLI**を使う時の認証情報

- ここでのプロファイルとは
アクセスキー、シークレットキーのペアに名前をつけて管理する機能。

```config
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[test-user]
aws_access_key_id=AKIAI44QH8DHBEXAMPLE
aws_secret_access_key=je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

環境ごとに分けること。

`$ aws s3 ls --profile cfc-dev`
上記コマンドはawsクレデンシャルが反映されているか確認できる。

## スイッチロールとは

スイッチロール自体のメリットは**一度ログアウトしてから、もう一度別のアカウントでログインする必要がなくなる。**

[参考URL](https://dev.classmethod.jp/articles/switch-role-with-awscli/)

![](image/スイッチロール.png)

### CLIでのスイッチロール

マネジメントコンソールからスイッチロールは可能
AWS CLIからもスイッチロールは可能

## aws configure

defaultのクレデンシャルをconfigに実装することができる。

## AWSアクセスキー

**CLI、SDK、& APIアクセスに使用するAWSアクセスキー**
アクセスキーを使用して、AWS CLI、Tools for PowerShell、AWS SDK、または直接AWS API呼び出しからプログラムでAWSを呼び出すことができます。一度に持つことができるアクセスキーは最大2つ (アクティブまたは非アクティブ）

保護の観点から、シークレットキーは誰とも共有しないでください。また、**業界のベストプラクティスとして頻繁にキーを更新することが推奨されている。**
シークレットキーは、作成時に表示またはダウンロードできるのみです。既存のシークレットキーを正しく配置できなかった場合は、新しいアクセスキーペアを作成する必要がある。

![AWSアクセスキー](image/AWSアクセスキー.png)

## AWS シークレットマネージャー

## aws 基本を学んだ後

[参考URL](https://blog.microcms.io/aws-vault-introduction/)

## Tips

[aws-vaultでアクセスキーをセキュアに保存しつつ、MFAもシームレスにやる](https://zenn.dev/nemolize/articles/3a5d03a7974eea)
[AWS Secrets Managerを使おう！](https://qiita.com/mm-Genqiita/items/f93285a6058c64b39f23)

## AWS KMS(Amazon Key Management Service)

[参考URL](https://qiita.com/miyuki_samitani/items/c3c871e2312b9a47b9e2)

鍵を管理するところ。
元々の鍵をマスターキー
暗号化された鍵をデータキーとしてAWSで保存ができる。


## Serverless FrameworkとSAMを比較してみる

AWSでサーバレスアーキテクチャ構築するときに代表的なフレームワークであるServerless FrameworkとSAMを比較してみたよ
筆者の判定だとServerless Frameworkに軍配かな
SAMはプラグインがやや少ないのと癖が強いから今後に期待！

Serverless Frameworkとの違いは色々あるのですが、開発したAPIをローカルで実行する場合の最大の違いは……

リクエストをローカルで受け取る
Dockerプロセスが立ち上がる
Lambdaが実行される
という三段階にあると考えています。
特に2番が曲者で、上記の記事では

DynamoDBをDockerでローカルに構築する
DynamoDBが起動するネットワークを作成
Lambda実行のDockerプロセスが機動するネットワークを指定
という流れで、LambdaがDynamoDBにアクセスできるようにしています。

……これ、デバッグが難しいです……
DynamoDBが動いているネットワークが指定されちゃってるので、逆にローカル実行した際にネックになっちゃってるみたいでアクセスが上手くできなかったです。

