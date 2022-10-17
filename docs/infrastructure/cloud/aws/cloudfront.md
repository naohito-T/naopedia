# CloudFront

台数不明で性能不明だがグローバルに配置されたキャッシュサーバ
[cloud front解説](http://itlib1.sakura.ne.jp/test380/pdfichuran/0453/003-CloudFront.pdf)

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

CloudFront Functions(CF2)はLambda@Edgeより手前でシンプルな処理をより**高速に、素早く、安価**に実行できるサービス

制約がある（DB接続不可/ネットワーク接続不可など）
そのためheaderを書き換えるやBasicAuthなどに使用がいい

## Tips

[CloudFront FunctionsでBasic認証のパスワードをかける](https://dev.classmethod.jp/articles/apply-basic-authentication-password-with-cloudfront-functions/)

## Lambda@Edge
[これが初心者にわかりやすい](https://qiita.com/chii-08/items/1b8c7f9f876673b7aa20)

Lambda@Edgeは、Amazon CloudFrontの機能で、アプリケーションのユーザーに近いロケーションでコードを実行できるため、パフォーマンスが向上し、待ち時間が短縮されます。
Lambda@Edgeでは、世界中の複数のロケーションでインフラストラクチャをプロビジョニングまたは管理する必要ない。

## Lambda@Edge作成方法

Lambda関数をバージニア北部リージョンで探してそれがあれば、Lambda@Edgeとなる。

>恥ずかしい話ですが、Lambda@Edgeを使用する前、Lambda@Edgeというサービスがあるものだと思っていたんですが、Lambda関数をバージニア北部リージョンで作成し、CloudFrontのイベントをトリガーとすることでLambda@Edgeになるということみたい。

