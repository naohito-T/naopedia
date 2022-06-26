# CloudFront

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


