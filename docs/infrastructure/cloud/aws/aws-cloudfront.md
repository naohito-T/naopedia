# CloudFront
[cloud front解説](http://itlib1.sakura.ne.jp/test380/pdfichuran/0453/003-CloudFront.pdf)

台数不明で性能不明だがグローバルに配置されたキャッシュサーバ。  
デフォルトで**リージョンがグローバルに展開**されている。


## ユビキタス

ディストリビューション : ひとつのCloudFront（EC2やRDSがインスタンスと呼んだように）  
ビヘイビアー : キャッシュルールのこと  
オリジン : キャッシュ元データを配置するサーバのこと（ELB、EC2、S3、その他のサーバ）  
インバリデート : キャッシュクリア

## 昔のCloudFront 無しの構成

[参考URL](https://qiita.com/sasasin/items/0f0ec1a90af6295589f9)

EC2のローカルディスクにすべてがあり、静的コンテンツ、動的ページ、すべてのアクセスをEC2で捌く必要があった。
>ApacheとかNginxでキャッシュを効かせると、負荷は軽くなるかも。みたいな涙ぐましいノウハウがあったのです。

## invalidationとは(訳: 無効化)

[参考URL](https://blog.denet.co.jp/cloudfront-invalidation/)

サーバー側でキャッシュをクリアして再構築してあげないと、エッジロケーションへの反映が、設定されたキャッシュの有効期限まで置き換わらないとのこと
Invalidation（キャッシュのクリア）. これは、エッジロケーションなどにキャッシュされているファイルを一度消して作成すること。

## CloudFront Functions
[Lambda@Edgeとの使い分け（クラメソ）](https://dev.classmethod.jp/articles/amazon-cloudfront-functions-release/)

CloudFront Functions(CF2)はLambda@Edgeより手前でシンプルな処理をより**高速に、素早く、安価**に実行できるサービス。  
制約がある（DB接続不可/ネットワーク接続不可など）  
そのためheaderを書き換えるやBasicAuthなどに使用がいい。

## cloudfrontイベント

cloudfrontには4つの流れがあり、それぞれ1つのリクエストに対して一意のlambdaのコードを割り当てることができる。  
- Viewer request : リクエストが最初に閲覧者から届いた時
- Origin request : オリジンへのリクエストを転送する時
- Origin response : オリジンからの応答を受ける時
- Viewer response : 閲覧者に応答する前


## Tips

[CloudFront FunctionsでBasic認証のパスワードをかける](https://dev.classmethod.jp/articles/apply-basic-authentication-password-with-cloudfront-functions/)

---

## Lambda@Edge とは
[5分で読む！Lambda@Edge 設計のベストプラクティス](https://dev.classmethod.jp/articles/lambda-edge-design-best-practices/)
cloudfrontのエッジロケーションからコードを実行するLambda関数のことで、**ユーザーに近い場所**でコードが実行されるので高速なコンテンツ配信が可能になる仕組み。
コードをLambdaにアップロードするだけで自動的にコードの実行やスケーリングが行われる。
そのためLambda@EdgeはLambdaとcloudfrontから成り立つ。

**メリット**
- 低レイテンシーのコンテンツを配信
ユーザに近いロケーションからコードを実行するので
低レイテンシーの配信が可能。

- キャッシュヒット率をあげる
Lambda@Edgeを使う最大の利点の1つは、コンテンツがオリジンから返されたときにキャッシュされる可能性を高めたり、すでにキャッシュされたコンテンツの利便性を高め、キャッシュヒット率を向上させること。

**サーバ管理が不要**
オリジンサーバを複数のロケーションでプロビジョニング・拡張・管理することもなく、自動的にスケールします。
オリジンで実行しているアプリケーションに何も変更を加えることなく追加できます。

### Lambda@Edge作成方法

>恥ずかしい話ですが、Lambda@Edgeを使用する前、Lambda@Edgeというサービスがあるものだと思っていたんですが、Lambda関数をバージニア北部リージョンで作成し、CloudFrontのイベントをトリガーとすることでLambda@Edgeになるということみたい。
Lambda関数をバージニア北部リージョンで探してそれがあれば、Lambda@Edgeとなる。

### Lambda@Edge クオーター
[リファレンス](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/edge-functions-restrictions.html#lambda-at-edge-function-restrictions)

- SOLVED: 502 Error The Lambda function returned invalid JSON
>レスポンスには、AWSによって設定された`1MB`のサイズ制限があります。そのため、レスポンスが1MBを超える場合、Lambda@Edge はそれを切り捨てて CloudFront に渡します。
>?切り詰めると、応答が無効になります。CloudFront が無効なレスポンス JSON を解析しようとすると、このエラーがスローされます。


### Lambda@EdgeでNext.jsのSSRをする時の注意
[参考URL](https://backbencher.dev/nextjs-serverless-502-error-lambda-invalid-json)


