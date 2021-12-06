# CloudFront

## invalidationとは(訳: 無効化)

[参考URL](https://blog.denet.co.jp/cloudfront-invalidation/)

サーバー側でキャッシュをクリアして、再構築してあげないと、エッジロケーションへの反映が、設定されたキャッシュの有効期限まで置き換わらないとのこと
Invalidation（キャッシュのクリア）. これは、エッジロケーションなどにキャッシュされているファイルを一度消して、作成すること。