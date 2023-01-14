# Flux パターン

[参考URL](https://qiita.com/knhr__/items/5fec7571dab80e2dcd92)

## Flux アーキテクチャ図

![](../../../images/flux.png)

- Store
  アプリケーション全体のデータとビジネスロジック（必ずActionによってデータを更新する）
- View
  Reactなどのコンポーネント
- Action
  Viewなどから発火されてつくられるイベント
- Dispatcher
  すべてのアクションを受けてStoreにイベントを発火する。
