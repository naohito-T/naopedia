# Lambda(ラムダ)

イベントの発生に応じてプログラムを実行する（AWSが提供するイベントドリブンなプログラム）環境を提供する、クラウドコンピューティングサービス。
**マルチAZ構成**もできる。

## Lambdaを採用する方針

- 非同期な通信処理
  - イベント駆動で処理をするサービスにはLambdaを採用する。
- 同期的な通信処理
  - APIなどを提供するサービスにはECSを採用する。

## Lambdaに合わないアーキテクチャー

[コスト効率の悪いLambdaアプリケーションの性質に関する考察](https://blog.yuuk.io/entry/2017/lambda-disadvantages-from-a-cost-viewpoint)

## Lambdaを採用する例文

>すでにユーザー数が増加してアプリケーション全体のパフォーマンスが劣化していることに加えて、アプリケーションの運用業務の比率も高まっています。
>また開発期間が長くなることも懸念しています。さらに、今後もユーザー数、そして購入数が増えることを考えたときに、領収書を作る機能をSampleBookStoreの中心的な機能から切り離すことにより、負荷の軽減ができると考えました。要件として購入と同期的に実行する必要がなく、「なるべく早く」で十分な点もポイントです。筆者自身の実体験としても、購入後にすぐ領収書が必要だとしても数分間は待てますし、場合によっては月末の経費精算時にまとめてダウンロードすることもあります。また、セール時期など、大量に購入が行われる時期には領収書を作る機能にもより負荷がかかります。こういった背景から、非同期処理として実装することが望ましいと考えました

## Lambdaコスト

- functionに対する合計リクエスト数
- functionの合計実行時間

に応じて料金が発生する。

## Lambda パフォーマンスチューニング

[Lambda パフォーマンスチューニング](https://dev.classmethod.jp/articles/lambda-performance-tuning/)

1. コールドスタートの解決
Lambdaを定期実行する方法があるが、これは根本的に解決にならない。  
メモリ量を上げてもコールドスタートの起動時間は解決されない。

2. 依存ライブラリを減らす
外部モジュールの展開は非常にコストが高い。  
依存ライブラリを減らすことでコールドスタート時のオーバーヘッドを改善できる。

## Lambda 並列起動（同期・非同期）・再利用の動作検証

[AWS Lambda+Node.jsのコンテナ並列起動（同期・非同期）・コンテナ再利用の動作検証](https://www.grandream.jp/blog/understanding-aws-lambda-container)

- Lambdaは1実行で1プロセスを占有する。
- 同期処理を実行しても他のLambda（プロセス）実行に影響しない。
- 非同期処理を実行しても実行中のLambda（プロセス）で他のLambda実行が処理されることはない。
- コンテナー同時実行数の上限に達すると実行中のコンテナーが終了されるまで特定回数リトライされる。
- コンテナー実行後一定時間内に同じ関数を再実行するとコンテナーが再利用される。
- Lambda実行毎にプロセスが完全に分離しているため、コンテナー再利用+グローバル変数を変化させるコードを書いても問題なし。

### CLIから実行する場合

```sh
aws lambda invoke --function-name alb-backend-anycolor-dev-migration --cli-binary-format raw-in-base64-out --payload '{"type": "show"}' a.json
```

`--payload` はLambdaがリクエストを受け取ったときによしなにjsonとしてparseしてくれる。

```typescript
export const handler: Handler<RequestSchema> = async (event, context) => {
  console.log(event.type)
};
```

## Lambdaのセキュリティ

[Lambdaの落とし穴 - 脆弱なライブラリによる危険性とセキュリティ対策](https://blog.flatt.tech/entry/lambda_library_security#AWS-Lambda-%E3%81%A7%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3%E7%9A%84%E3%81%AB%E6%B0%97%E3%81%AB%E3%81%99%E3%81%B9%E3%81%8D%E7%82%B9)

## LambdaにはEIP(Elastic IP)を割り当てられない

[Lambda用 VPCネットワーク](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/foundation-networking.html)

## Lambdaが実行されるところ

Lambda関数は常に**Lambdaサービスが所有するVPC内で実行される**  
LambdaはこのVPCにネットワークアクセスとセキュリティルールを適用し、VPCを自動的に維持および監視します。

## LambdaをVPC外のリソースにアクセスさせる

[参考URL](https://valmore.work/aws-lambda-s3/)

defaultではNATを使って対応する。  
その場合はloggerなどの出力はインターネットを介して取得される。
そのため、セキュリティ的な懸念がある場合は `VPC Endpoint` を使用する

## Lambdaを用いたサーバーレスメリット

- 対比概念はEC2を使った汎用的な構成とする。
  - 運用がシンプルになる
- デプロイが、 Serverless Frameworkの仕組みをそのまま使えば良いため、車輪の再発明をせずに済む
- インフラ観点のセキュリティアップデートが不要
  - LambdaのインフラはAWSが管理しているため
- コストメリットがある
  - 繁忙期とそうでないときのアクセス数に大きな差があるALBでは、EC2などのコンピューティングリソースを確保しっぱなしの構成と比較して、コストを抑える事ができる。
- Infrastructure as Codeを強制される
  - Gitを用いたインフラ構成のバージョニングが強制されるため、構成変更の履歴を追いやすい
  - EC2にSSHして手で直接設定を触り、その設定変更の記録を残し忘れ、EC2再作成時永遠にその設定が失われる…などというよくある事故を防げる

## Lambdaが台頭した理由

[Lambdaが台頭した理由](https://service.plan-b.co.jp/blog/tech/30863/)  
[AWSのLambdaを色々暴く](https://qiita.com/Keisuke69/items/9951a93fd711360a61c5)

>業務で使うサーバーが、いつの間にかAWSになってから、毎日AWSを業務で利用しています。 AWSには、沢山のサービスがありますが、私のお気に入りはAWS Lambdaです。
>理由は、とりあえずシンプルに作れるから！
>プロジェクトが始まると、切り出せそうな処理はどんどんLambda Functionとして作ってはデプロイを繰り返します。
>結果、案件も終わりが見えた頃には、「Lambda Functionいっぱい問題」発生。 このパターンが日常的にあり、修正や管理のコストが大きくなることが多いです。

## Lambda関数に求められる実装

[実装&キャッシュについてまとまっている](https://enterprisegeeks.hatenablog.com/entry/2017/04/21/150204)

AWSの公式ドキュメントによると、AWS Lambdaの関数は**ステートレス**な実装にする必要がある。  
一方でステートレスな実装を追求すると、外部サーバからのデータ取得処理が増え、結果として処理パフォーマンス悪化を引き起こす場合が多い。  

ステートレスな実装を謳っているが `/tmp` ファルダの提供があるため少なからずキャッシュの利用は可能そう。
>Lambda関数はあらゆる状態を持たない実装にすべき」ことを示すのではなく、「外部にマスタがある静的なデータはLambda関数上のキャッシュとして保持し、次回リクエスト時に再利用して良い」

## Lambdaを最低限ローカルで実行しテストする(簡単)

[参考URL](https://qiita.com/zaburo/items/d78a0a4462007e57d5d8)

## Lambda Layers

## Lambda Layersを作成(GUI版)

[Lambda Layersでライブラリを共通化（GUI版）](https://qiita.com/t_okkan/items/394a15577bd1aad46ec3)

Lambda Layersとは、複数のLambda関数で外部ライブラリやビジネスロジックを共有できる仕組み。
使用するライブラリや共通のビジネスロジックをZIPアーカイブしLayerに追加できる。

### 制限

1つのLambda関数では**5つのLayerのみ**使用できる。
また、Lambda関数とLayerの解凍後の合計サイズが250MB以下となる必要があり

### Lambda Layersの配置先

作成したLayerは、Lambdaの実行環境の `/opt` ディレクトリに展開されます。
/optディレクトリ以下に、ランタイムの言語ごとのディレクトリが構成されているので、ランタイムに合わせてLayerを構築する必要があります。
>Pythonを例にとると、Lambdaの実行環境は/opt/python/とディレクトリが構成されているため、作成するLayerは展開される構成が/opt/python/"作成したLayer"となる必要があります

## Lambda Layersを作成(Serverless版)

[参考URL](https://dev.classmethod.jp/articles/serverless-framework-node-modules-to-lambda-layers/)

## Lambda Layersにnode_modulesを含めないといけない理由

Lambdaの実行環境には追加ライブラリが存在しないため、ライブラリを使用する際はデプロイパッケージにライブラリを含める必要がある（node_moduleなど）
※だがwebpackなどでnode_modules内のライブラリを含めてバンドルすればnode_modulesなしでいける。

---

## Lambda コールドスタートとウォームスタート

[これまでの常識は間違っていた？！Lambdaのコールドスタート対策にはメモリ割り当てを減らすという選択肢が有効に働く場面も](https://dev.classmethod.jp/articles/lambda-memory-alloc-and-coldstart/)

グローバルな環境で変数を設定すると再利用される可能性がある。
これはAWS Lambdaには関数実行時に実行環境として起動したコンテナーーをある程度の期間再利用する動作仕様（ウォームスタート）があり、それに伴い/tmpディレクトリ上のデータも次回の処理で再利用される動作となる。

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

[Lambdaでgoを実装](https://techblog.kiramex.com/entry/2020/01/23/173128)

毎月100万リクエストまで無料なんです。くり返します。毎月100万リクエストまで無料です！
**HTTPサーバとしてLambdaを実行させる場合はAPI Gatewayと連携する必要**があります。
API Gatewayと連携するLambdaはAWSが用意しているサンプルを参考に、hello/main.goを以下のように実装します。

## 実行順序

Lambdaではexports.handler以下が実行されます。

## AWS Serverless Application Model (AWS SAM) とは

[参考URL](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/what-is-sam.html)

## Lambdaでディレクトリを使用したい場合

[参考URL](https://cloud5.jp/lambda_tmp_directory/)

/tmpディレクトリ
Lambdaの公式ドキュメントに、/tmpディレクトリに対して以下の記述がある。

>各実行環境は、/tmp ディレクトリ内のディスク領域を 512 MB に提供します。ディレクトリのコンテンツは、実行環境が停止された際に維持され、複数の呼び出しに使用できる一時的なキャッシュを提供します。キャッシュに保存したデータが存在するかどうかを確認するための追加コードを追加できます。デプロイのサイズ制限の詳細については、「Lambda のクォータ」を参照してください。

512MBの一時領域（`/tmp` ディレクトリ）が提供されている。そのためそちらを使用しファイルの出力と書き込みを行える。  
Lambda上でAWS CLIを実行したいと思いました。 AWS CLIにはs3 syncコマンドのような、SDKには未実装の便利な機能があるためです。  
Lambdaの実行環境にはAWS CLIはプリインストールされていないので、ひと工夫が必要になります。

## LambdaではAWS-SDKが必要ない

LambdaにはAWS SDKがインストールされる。
>npm install で NPM パッケージをインストールするとき、実行時に必要なものは --save で、開発時のみ必要なものは --save-dev でインストールします。 この考え方からすると、AWS SDK (@aws-sdk) は --save オプションでインストールするのが自然なのですが、Lambda 関数用のプロジェクトではちょっと事情が違ってきます。
>なぜなら、AWS の Lambda 実行環境にはデフォルトで AWS SDK がインストールされているからです。

## Lambda テスト対象の考察

Lambda Functionは大きく3つのレイヤーに分かれたレイヤー化アーキテクチャと相性がよいと考えられている。

- ハンドラー層: API Gatewayなどから入力を受け取り、バリデーションやオブジェクトの変換を行う
- ドメイン層: ユースケースに対するビジネスロジックとインターフェースを定義する
- インフラストラクチャ層: AWS SDKを利用したAWSサービスとのやりとりや外部APIへのアクセスを行う

## Lambda local実行

簡単な実行であればexport.handlerを呼び出すやつで十分

## Lambda容量制限

[参考URL](https://zenn.dev/xxpiyomaruxx/articles/d7419ec1138d6a)

以下である必要がある。

- zip圧縮後50MB
- zip圧縮前250MB
※これ `or` かもしれない。

また、Lambda deployに関してコンテナーイメージのサポートが導入されておりその場合は10GBで良いとのこと。コンテナーイメージにするのもいいかもしれない。

## Tips

[LambdaのJest Test](https://dev.classmethod.jp/articles/serverless-unit-test-with-jest/)

### Lambdaをexpressでdeployする

[参考URL](https://dev.classmethod.jp/articles/vendia-serverless-express/)

`@vendia/serverless-express` を使用する。
APIGateway+Lambda上でExpressを動かせるというライブラリ。
※昔はaws-serverless-expressというパッケージがあってこちらが使われていた認識なのですが、@vendia/serverless-expressがその後継という形。

>この手法のメリットとは

- 1つのLambda関数だけを用いた構成だと、Lambda関数が1つであるためデプロイの時間を短くできるというメリット
- 通常のだるさを解消
だるさはこれ→複数のAPIを作るために1つのLambda関数内で、httpメソッド（GET,POST,PUT,DELETE）ごとに条件分岐を行い、さらにURLごとに条件分岐する必要があります。

>この手法のデメリット
>
>- 気になる点を挙げるとすれば、王道のAPIgw+Lambda Wayとはいえず、ややHackyな手法ではあると思います。ExpressのようなWeb Application Frameworkを使うならECSやAppRunnerを使う方が素直な感じはします。それでもECSなどを使う場合と比べてLambdaにはゼロスケール1できるという強みがあるので、存外悪くない手法だと思います。

## Lambda TypeScript middy

[middyについて](https://kiririmode.hatenablog.jp/entry/20220702/1656752084)

middyはLambda関数用のミドルウェアエンジン。

## Lambdaでenvを管理しない方がいい理由

Lambdaには、サードパーティーライブラリをアップロードして組み込むことができます。開発を効率化するなどの目的で、ライブラリを導入することは多いと思われます。  
しかし、導入したライブラリやそのライブラリが依存する他のライブラリに、セキュリティ的に問題がある脆弱性が含まれている可能性があります。  
もし導入しているライブラリに脆弱性がある場合、ライブラリを通して脆弱性攻撃が行われる可能性があるためなるべくなら含まない方がいい。

## Lambdaの前段

[AWS Lambda：API GatewayとApplication Load Balancerの違い](https://qiita.com/unhurried/items/5a497ec81e4fefe22396)

## Lambdaのアーキテクチャ

AWS Lambdaの実行モデルは、従来のサーバーベースのアプリケーションとは異なります。Lambda関数は、トリガー（例：HTTPリクエスト、S3バケット内のファイル変更、DynamoDBのストリームイベントなど）が発生するたびに実行されます。以下の点を考慮すると、Lambdaの動作がより明確になるでしょう：

1. **コンテナー化**: Lambda関数が呼び出されると、AWS Lambdaはその関数の実行のためのコンテナーを準備します。コンテナーは、関数のコード、ランタイム、関連する依存関係をホストするものです。

2. **冷/温/熱スタート**:
   - **冷スタート**: 最初のリクエストや、長時間アイドル状態だった後のリクエストでは、新しいコンテナーが立ち上がるため、レイテンシが少し高くなる場合があります。この状態を「冷スタート」と呼びます。
   - **温/熱スタート**: 関数が続けて呼び出される場合、前回の実行のためにすでに起動しているコンテナーが再利用されることがあります。このような状況ではレイテンシが低くなり、これを「温スタート」または「熱スタート」と呼びます。

3. **並行実行**: 1ユーザーが1000リクエストをほぼ同時に送った場合、AWS Lambdaは理論的には1000の異なるコンテナーインスタンスを立ち上げることができます。これにより、各リクエストが並行して高速に処理されることが保証されます。

4. **同時実行数の制限**: ただし、AWS Lambdaには同時実行数の制限があります。デフォルトのリージョンあたりのリミットは1000ですが、これはリクエストすることで増やすことができます。

5. **スロットリング**: 上記の同時実行数の制限に達した場合、Lambdaは新しい関数の実行リクエストをスロットル（一時制限）する可能性があります。

要するに、Lambdaはスケールアウトの能力を持ち、多数のリクエストを並行して処理できますが、その上限や同時実行数の制限には注意が必要です。
