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
[zozoでの導入](https://techblog.zozo.com/entry/fbz-serverless-with-datadog-apm)
[クラメソでの説明](https://dev.classmethod.jp/articles/datadog-apm-released/)
Webサービス、キュー、データベースがリクエスト、エラー、レイテンシーを監視するための標準のパフォーマンスダッシュボードを使用して、アプリケーションを詳細に可視化

分散トレーシングが導入できる
[分散トレーシングとは](https://www.splunk.com/ja_jp/data-insider/what-is-distributed-tracing.html#:~:text=%E5%88%86%E6%95%A3%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%B3%E3%82%B0Distributed%20Tracing,%E3%82%92%E7%9B%A3%E8%A6%96%E3%81%99%E3%82%8B%E4%BB%95%E7%B5%84%E3%81%BF%E3%81%A7%E3%81%99%E3%80%82)

分散トレーシングはマイクロサービスアーキテクチャの問題である障害発生時の原因究明の複雑化やシステム全体
でのパフォーマンスの把握が難しいといったことに対応できる仕組み

## APMと従来の監視違い
[APM仕組み](https://blog.mosuke.tech/entry/2019/11/21/datadog-apm/)

- APM
    専用のライブラリをアプリケーションに組み込んで、「実際のユーザからのリクエスト」に対するパフォーマンスやエラーを計測、監視する。

- 従来的なアプリケーションの監視 (※1)
    アプリケーションの**プロセスが動いているか確認**する。
    外形監視として定期的に、アプリケーションにリクエストを発行して正常か確認する。
    あくまで実際のユーザのリクエストではなく、監視のためのリクエスト。
    アプリケーションが出力したログからエラーが出ていないか監視する。

## APMがなぜ必要か

>一番の理由はアプリケーションのパフォーマンスがビジネスにおいてより重要な役割を果たすようになってきたからでしょう。 そして、アプリケーションがどんどん複雑化していて、パフォーマンスの改善やエラーの特定が難しくなってきているからです。



### browser-logs

安価にフロントエンドのError収集ができる。

メリット
- 所管ではSentryの代わりになれる
- 余計なheaderを追加しない（Sentryだど追加するためCORSに引っかかる）

---

## datadog エージェント

ホストサーバにインストールする既存のエージェント
Datadogの機能を使うために必要なもので、このエージェントを起動することで**Datadogのインフラ監視が可能となる**

## Tracing Agent

Datadog APMを使うために必要なエージェントで**アプリケーションへライブラリとして組み込む。**

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