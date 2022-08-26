# lambda(ラムダ)

イベントの発生に応じてプログラムを実行する(AWSが提供するイベントドリブンなプログラム)環境を提供するクラウドコンピューティングサービスである。

[AWSのLambdaを色々暴く](https://qiita.com/Keisuke69/items/9951a93fd711360a61c5)

[Lambdaが台頭した理由](https://service.plan-b.co.jp/blog/tech/30863/)

>業務で使うサーバーが、いつの間にかAWSになってから、毎日AWSを業務で利用しています。 AWSには、沢山のサービスがありますが、私のお気に入りはAWS Lambdaです。
>理由は、とりあえずシンプルに作れるから！
>プロジェクトが始まると、切り出せそうな処理はどんどんLambda Functionとして作ってはデプロイを繰り返します。
>結果、案件も終わりが見えた頃には、「Lambda Functionいっぱい問題」発生。 このパターンが日常的にあり、修正や管理のコストが大きくなることが多いです。

## Lambdaを最低限ローカルで実行しテストする(簡単)

[参考URL](https://qiita.com/zaburo/items/d78a0a4462007e57d5d8)

## Lambda コールドスタートとウォームスタート

[これまでの常識は間違っていた？！Lambdaのコールドスタート対策にはメモリ割り当てを減らすという選択肢が有効に働く場面も](https://dev.classmethod.jp/articles/lambda-memory-alloc-and-coldstart/)

グローバルな環境で変数を設定すると再利用される可能性がある。
これはAWS Lambdaには関数実行時に実行環境として起動したコンテナーをある程度の期間再利用する動作仕様(ウォームスタート)があり、それに伴い/tmpディレクトリ上のデータも次回の処理で再利用される動作となる。

[参考URL](https://qiita.com/r-wakatsuki/items/1cdb9493749dbc36bed2)

```js
// 以下で始まるところに変数を宣言した方が良い得策
// グローバルに変数を定義するとウォームスタートで利用される可能性がある。
// 再利用される時間と可能性はブラックボックス

const global = new Date();
exports.handler = async (event) => {}
  const local = new Date();

  console.log(global); // global は再利用されるため時間が更新されない
  console.log(local);  // localは逐一時間が更新される
```

## Lambda対応言語

LambdaはJava、Node.js、C#、Pythonのプログラミング言語に対応しているので、各種「機能」（プログラム）はこの言語で開発すれば良い。

aws-sdkはLambdaサーバにはすでに入っており、node-modulesに本来含める必要はないのでnpm uninstall aws-sdkしてから再圧縮すると容量削減につながります。あまりファイルサイズが大きいとインライン編集できなくなるので注意しましょう。

## Lambda対応イベント

S3のイベント発生（ファイルアップロード）などをトリガーにデータ処理を行う
リアルタ

## Lambda 関数URL

これまでHTTPS経由でLambdaを実行するためには前段にAPI Gatewayなどが必要だった。
Lambda関数URLを使用することで、API GatewayなしでHTTPSから直接Lambdaを実行できる。
Lambdaをパブリックに公開したり、シンプルな認証でも問題ない場合は、Lambda関数URLは便利。

## Lambda実行例

>S3に画像ファイルがアップロードされたら、リサイズしたサムネイル画像を生成する、とかは分かりやすいですかね。

## 料金

、毎月100万リクエストまで無料なんです。くり返します。毎月100万リクエストまで無料です！

HTTPサーバとしてLambdaを実行させる場合はAPI Gatewayと連携する必要があります。 API Gatewayと連携するLambdaはAWSが用意しているサンプルを参考に、hello/main.goを以下のように実装します。


[Lambdaでgoを実装](https://techblog.kiramex.com/entry/2020/01/23/173128)


## 実行順序

Lambdaではexports.handler以下が実行されます。


## AWS Serverless Application Model (AWS SAM) とは

[参考URL](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/what-is-sam.html)


## Lambdaでディレクトリを使用したい場合

[参考URL](https://cloud5.jp/lambda_tmp_directory/)

/tmpディレクトリ

Lambdaの公式ドキュメントに、/tmpディレクトリに対して以下の記述がある。

>各実行環境は、/tmp ディレクトリ内のディスク領域を 512 MB に提供します。ディレクトリのコンテンツは、実行環境が停止された際に維持され、複数の呼び出しに使用できる一時的なキャッシュを提供します。キャッシュに保存したデータが存在するかどうかを確認するための追加コードを追加できます。デプロイのサイズ制限の詳細については、「Lambda のクォータ」を参照してください。

512MBの一時領域(/tmp)が提供されている。そのためそちらを使用しファイルの出力と書き込みを行える。 



Lambda上でAWS CLIを実行したいと思いました。 AWS CLIにはs3 syncコマンドのような、SDKには未実装の便利な機能があるためです。
Lambdaの実行環境にはAWS CLIはプリインストールされていないので、ひと工夫が必要になります。


## LambdaでのAWS-SDK

>npm install で NPM パッケージをインストールするとき、実行時に必要なものは --save で、開発時のみ必要なものは --save-dev でインストールします。 この考え方からすると、AWS SDK (@aws-sdk) は --save オプションでインストールするのが自然なのですが、Lambda 関数用のプロジェクトではちょっと事情が違ってきます。 なぜなら、AWS の Lambda 実行環境にはデフォルトで AWS SDK がインストールされているからです。

AWS SDK を --save と --save-dev のどちらでインストールすべきかは、そのプロジェクトでデプロイ用の ZIP パッケージをどう作成するかによっても変わってきます（パッケージングするときに @aws-sdk パッケージを含めないようにするのであれば、--save でインストールしても問題ない）。 よく分からないときは、ZIP パッケージの肥大化を防ぐため、AWS SDK はとりあえず --save-dev でインストールしておくのがよいと思います。

## Lambda テスト対象の考察

Lambda Function は大きく3つのレイヤに分かれたレイヤ化アーキテクチャと相性がよいと考えています。

- ハンドラ層: API Gateway などから入力を受け取り、バリデーションやオブジェクトの変換を行う
- ドメイン層: ユースケースに対するビジネスロジックとインタフェースを定義する
- インフラストラクチャ層: AWS SDK を利用した AWS サービスとのやりとりや外部APIへのアクセスを行う

## Lambda local実行

簡単な実行であればexport.handlerを呼び出すやつで十分

## Lambda@Edge とは

cloudfrontのエッジロケーションからコードを実行するLambda関数のことで、ユーザに近い場所でコードが実行されるので高速なコンテンツ配信が可能になる仕組み。
コードをLambdaにアップロードするだけで自動的にコードの実行やスケーリングが行われます。ですので、Lambda@Edgeは Lambdaとcloudfrontから成り立ちます




---

## Tips

[LambdaのJest Test](https://dev.classmethod.jp/articles/serverless-unit-test-with-jest/)