# datadog

Datadogを使用すると以下のlogsがすべて同じダッシュボードで見られる。
- インフラストラクチャメトリック
- トレース
- ログ

Datadogは監視に必要なひととおりの機能を備えたMonitoring Sass
グラフの作りやすさ、見栄えの良さに定評があるグローバルスタンダードなツールのひとつ。

## Datadog収集方法

エラーやメトリクスの情報をDatadogに定期的に送る必要がある。
そのためDatadogが提供しているAPIを使い、DBから取得した情報をカスタムメトリクスとして送る。

---

## Datadog種類

### RUM

かなり高いがフルコース

### Datadog Application Performance Monitoring (APM) 
[リファレンス](https://docs.datadoghq.com/ja/tracing/)

Webサービス、キュー、データベースがリクエスト、エラー、レイテンシーを監視するための標準のパフォーマンスダッシュボードを使用して、アプリケーションを詳細に可視化

### browser-logs

安価にフロントエンドのError収集ができる。

メリット
- 所管ではSentryの代わりになれる
- 余計なheaderを追加しない（Sentryだど追加するためCORSに引っかかる）

---
## 導入事例

CloudWatchで収集したメトリクスは、 DataDogのAWS Integration機能によってDataDogへ連携できるため、 CloudWatchでも積極的にメトリクスの収集を行う。
AWS Integration機能によって、 AWS上のリソースを統合的に監視する。
また、 CloudWatchのメトリクスを連携できるため、 DataDogでなにか独自のメトリクスを収集したい際は、 CloudWatch Custom Metricsを利用することを検討する。

## datadog-browser

フロントエンドでのエラーを収集することができるライブラリ。
※`Next.js`や`Nuxt.js`の導入事例などはとくに用意されていない。

## フロントエンドのエラー
[リファレンス](https://docs.datadoghq.com/ja/real_user_monitoring/data_collected/error/)

フロントエンドのエラーは**リアルタイムモニタリング（RUM）**で自動的に収集されます。エラーメッセージとスタックトレースが利用できる場合は含まれます。
フロントエンドのエラーは、それぞれの`error.origin`により3つのカテゴリーに分類されます。

## Datadog を利用したブラウザのエラー収集
[Datadog を利用したブラウザのエラー収集](https://zenn.dev/kurosame/articles/482601fa0f422df9390d)
[こっちも参考になる。参考URL](https://qiita.com/kotarella1110/items/0a1578e8a1be09dc7c1a)

デフォルトの挙動は以下のようになっています
- console.errorのログ
- キャッチしてないException
- ネットワークエラーログを自動的にDatadogにPost
- すべてのセッションでエラーを収集する
- エラーの分析を改修目的ではなく統計目的で利用する場合などは、sampleRateというパラメーターを調整するのかなと思います
- 同じサイトのサブドメイン間でセッションを保持しない
- `セッションCookie`、`クロスサイトセッション Cookie`は使わない

## Datadogの活用ノウハウを一挙に公開・それを支える全社管理者の工夫とは #datadog_japan_meetup
[Datadogの活用ノウハウを一挙に公開・それを支える全社管理者の工夫とは](https://techblog.zozo.com/entry/datadog-japan-meetup-2022-summer)

## beforeSend を使用してブラウザ RUM データを強化および制御する
[beforeSend を使用してブラウザ RUM データを強化および制御する](https://docs.datadoghq.com/ja/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88)

## datadog nextjs
sentryにあるソースマップ対応もしているとのこと。