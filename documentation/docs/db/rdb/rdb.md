# Relational Database

## チューニングの普遍的な考え方

[WebLogic Server参照から学ぶ](https://docs.oracle.com/cd/F25597_01/document/products/wls/docs92/perform/topten.html#wp1132669)

項目

- プールサイズのチューニング
- プリペアドステートメントキャッシュの使用
- ロギングラストリソースの最適化の使用
- 接続バックログのバッファリングのチューニング
- チャンク サイズのチューニング
- OptimisticまたはRead-only同時方式の使用
- ローカル インタフェースの使用
- eager-relationship-cachingの使用
- HTTPセッションのチューニング
- メッセージング アプリケーションのチューニング

## DBセッションの切り方

- mysql
  - DBクライアントの接続を切ってもセッションは切れない（SQLは実行されたまま）
  - そのためオーバーフローしやすい
- postgres
  - DBクライアントの接続を切った場合セッションは切れる（実行されいるSQLがあれば終了する）
