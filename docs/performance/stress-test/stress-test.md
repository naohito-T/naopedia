

# Stress-test

負荷試験についてまとめる。

---

## k6

[k6リファレンス](https://k6.io/docs/)

golang製の負荷試験ツール
[k6テストページ](https://test.k6.io/)

k6を一言で言うとJSで書けるツールでユニットテストみたいに性能テストすることを目指しいるOSSです。

## 内容の見方

[参考URL](https://qiita.com/kooohei/items/355b416e6671ae73cf3f)

## ライフサイクル

最低でもdefault関数をエクスポートする必要がある。
`default`の部分が`VU code`と呼ばれており**テストが実行されている限り何度も実行される箇所。**

```ts
// 1. init code

export function setup() {
  // 2. setup code
}

export default function (data) {
  // 3. VU code
}

export function teardown(data) {
  // 4. teardown code
}
```

1. init codeではローカルファイルシステムからロードしたり、他のモジュールをインポートしたりします。

2. setup code, 4. teardown codeは、他の多くのテストフレームワークやツールと同様に、テスト全体のセットアップとティアダウンを実行します。

setup()はテストの最初、initステージの後、VU ステージ（デフォルト関数）の前に呼ばれ、teardown()はテストの最後、最後のVUイテレーション（デフォルト関数）の実行が終了した後に呼ばれます。

setup()が返すデータのコピーは、デフォルト関数の各反復処理とテスト終了時のteardown()の最初の引数として渡される　とのことです。

## 外部出力

この内容はカスタマイズが可能※1だったり、外部出力（InfluxDB、Kafka、StatsDなど）にストリーミングすることもサポートしているとのことですが、本記事では割愛します。

## サンプルファイル

## CI/CDで実行する意義

[参考URL](https://k6.io/blog/getting-started-with-performance-testing-in-ci-cd-using-k6/)

## CLIに出力された内容

[参考URL](https://qiita.com/hajimeni/items/40c0fd6a86e758be43d5#%E9%A0%85%E7%9B%AE)

data_received	レスポンスデータ量(Total, /s)
data_sent	リクエエストデータ量(Total, /s)
http_req_blocked	TCP接続の順番待ちをした時間(avg, min, med, max, p(90), p(95)
http_req_connecting	TCP接続にかかった時間(avg, min, med, max, p(90), p(95)
http_req_duration	http_req_sending + http_req_waiting + http_req_receiveing(avg, min, med, max, p(90), p(95)
expected_response	正常応答のみのhttp_req_duration(avg, min, med, max, p(90), p(95)。正常な応答がない場合、この項目は表示されない
http_req_failed	リクエストが失敗した割合(%)
http_req_receiving	レスポンスの1バイト目が到達してから最後のバイトを受信するまでの時間(avg, min, med, max, p(90), p(95)
http_req_sending	リクエストを送信するのにかかった時間(avg, min, med, max, p(90), p(95)
http_req_tls_handshaking	TLSセッションのハンドシェイクにかかった時間(avg, min, med, max, p(90), p(95)。httpでは0
http_req_waiting	リクエストが送信完了してから、レスポンスが開始されるまでの時間(avg, min, med, max, p(90), p(95)。TTFB(Time To First Byte)
http_reqs	リクエスト総数。(Total, /s)
iteration_duration	シナリオ1ループにかかった時間(avg, min, med, max, p(90), p(95)。
iterations	シナリオを繰り返した回数(Total, /s)
vus	Virtual UserS。最後のシナリオのときの並列数(だと思う)
vus_max	最大Virtual UserS。テスト中の最大並列数(だと思う)