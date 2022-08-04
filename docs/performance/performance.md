# performance

## フロント側

---

- ドワンゴでのフロントパフォーマンスチューニング
[参考URL](https://dwango-js.github.io/performance-handbook/)

- スクロールイベントの間引き
[参考](https://www.webprofessional.jp/throttle-scroll-events/)

- フロントのパフォーマンス改善のいろは
[参考URL](https://zenn.dev/kaa_a_zu/articles/7d706e3ba6a87e)

- SPAとserver Side Renderのパフォーマンス
[参考URL](https://www.publickey1.jp/blog/17/server_side_renderingserver_side_rendering_ng-japan_2017_1.html)

- webpackを使用した際のバンドルサイズ パフォーマンス改善
[参考URL](https://dwango-js.github.io/performance-handbook/startup/reduce-size/)

- videoタグの圧縮
[参考URL](https://liginc.co.jp/342227)

## イベントの調整

>解決策の1つは、イベントを延期し、何回かのイベントを一度にまとめて扱うことです。この点で役立つ、よく使われる2つの関数があります。throttleとdebounceです。

throttleは決められた時間間隔でイベントが確実に一定量で推移 (時間ベース型)

debounceは瞬時に頻発するイベントを単一のイベントにグループ化する (イベントトリブン型)
→例、mousewheelが少し動かしただけでめちゃくちゃ発生するイベントをまとめる。

**debounce**
**連続したイベントの最後だけ実行**
これはbutton連打とかにいい。
debounceは、Ajaxでのキーの押下など、ほかの問題も解決します。フォーム入力で、キーをたたくごとにリクエストが送信されると困ったことになります。エレガントなソリューションの1つは、立て続けに起こるキー操作を、Ajaxリクエストをトリガーする1つのイベントにグループ化することです。1つのイベントにグループ化するとタイピングの自然な流れにぴったり合い、サーバーリソースの節約にもなります。キーの押下では、イベントの間隔は重要ではありません。なぜなら、ユーザーは一定の間隔でキーを押すわけではないからです。

**throttle**
**こちらでは規定時間後に実行するという考え方です。**
**こちらの方が間引く時間が正確に反映されています**

debounceでは対応しきれない部分の代替手段として、スクロールイベントにthrottleを使えます。スクロールが決まった時間間隔で発生するのがthrottleのメリットです。いったんユーザーがスクロールを始めたら、ちょうどよいタイミングで確実に実行されるのが望ましいことです。

この手法は、ユーザーがページ内の特定の場所にいるかどうかをチェックするのに役立ちます。ページのサイズが大きいと、コンテンツをスクロールしていくのに何秒もかかります。これを使って間引けば、任意の`決まった時間間隔で1度だけイベントを発生できます。イベントを間引くことでスクロール体験をスムーズにし、しかも実行が確実です。

## 画像表示について

通信で取ってくるよりbase64で表示させた方がよい
[参考URL](https://blog.kai-lab.com/load_base64_image/)

## 画像遅延表示

画像の遅延方法には2つの種類がある。
以下参照

[参考URL](https://paralux.co.jp/blog/358)
[コリス](https://coliss.com/articles/build-websites/operation/work/lazy-load-images-for-maximum-performance.html)


----

## サイト パフォーマンスチェック項目

## クリティカルレンダリングパス

DOMとJavaScriptも含めてクリティカルレンダリングパスと呼ぶ

## Chrome lighthouse (実施するときはシークレットモードにする)

Lighthouseとはウェブページの品質改善の指針を
パフォーマンス・PWA・アクセシビリティ・ベストプラクティス・SEOの点でチェックしてくれる

- 経緯
>Chrome拡張やコマンドラインで提供されていましたが、Google Chrome 60でデベロッパーツールに統合された。
>また、オンラインでチェックしてくれるツールGoogle PageSpeed Insightsも、分析エンジンにLighthouseを採用するようになりました。とは言っても全く同じ結果とはならなくて、Google PageSpeed Insightsの判定の方が低い場合が多いようだ。

---

## メトリクス

ソフトウェアのメトリクスとは、ソフトウェアを計測する方法およびその尺度のことを意味する。

## コードメトリクス

[参考URL](https://tech.pepabo.com/2022/04/25/code-metrics-dashboard/)

コードメトリクスとはソースコードについてさまざまな角度から計測した値のことを指す。

