# Datadog

Datadogを使用すると以下のlogsがすべて同じダッシュボードで見られる。
- インフラストラクチャメトリック
- トレース
- ログ

Datadogは監視に必要なひととおりの機能を備えたMonitoring Sass
グラフの作りやすさ、見栄えの良さに定評があるグローバルスタンダードなツールのひとつ。

## Datadog収集方法

エラーやメトリクスの情報をDatadogに定期的に送る必要がある。
そのためDatadogが提供しているAPIを使い、DBから取得した情報をカスタムメトリクスとして送る。

## 導入事例

CloudWatchで収集したメトリクスは、 DataDogのAWS Integration機能によってDataDogへ連携できるため、 CloudWatchでも積極的にメトリクスの収集を行う。
AWS Integration機能によって、 AWS上のリソースを統合的に監視する。
また、 CloudWatchのメトリクスを連携できるため、 DataDogでなにか独自のメトリクスを収集したい際は、 CloudWatch Custom Metricsを利用することを検討する。

## Datadog を利用したブラウザのエラー収集
[Datadog を利用したブラウザのエラー収集](https://zenn.dev/kurosame/articles/482601fa0f422df9390d)

デフォルトの挙動は以下のようになっています
- console.errorのログ
- キャッチしてないException
- ネットワークエラーログを自動的にDatadogにPost
- すべてのセッションでエラーを収集する
- エラーの分析を改修目的ではなく統計目的で利用する場合などは、sampleRateというパラメーターを調整するのかなと思います
- 同じサイトのサブドメイン間でセッションを保持しない
- `セッションCookie`、`クロスサイトセッション Cookie`は使わない
