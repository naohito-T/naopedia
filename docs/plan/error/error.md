# Error ハンドリング戦略

[JavaScript/TypeScriptの例外ハンドリング戦略を考える](https://qiita.com/shibukawa/items/ffe7264ecff78f55b296)

**例外というのは全て、何かしらのリカバリーを考える必要がある。**

## エラーハンドリングとは

あまりエラーの種別を細かく判定してあげることはJavaScriptでは今までやってこなかったのですが、ちょっとしたメタデータを乗っけてあげるとか（例えばリトライ回数）、何か凝ったことをしたくなったらこういう方針でやればいいのでは

## エラーと例外の区別が必要か

エラーと例外の違いとか、こっちはハンドリングするもの、こっちはOSにそのまま流すものとか色々な議論が出てくる。

## アプリ運用のエラー監視

サーバーサイドのエラー監視については導入しているアプリケーションも多いが、フロントのエラー監視もする必要がある。

## Sentry

[参考URL](https://sentry.io/welcome/)

フロントエラーの監視ツール。
無料枠が結構多い。