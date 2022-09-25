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