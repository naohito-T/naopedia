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