# logs

log監視ツールが色々あるためそれをまとめる。

ログと言っても色々ある
- メトリクス収集
- ロギング
- 可視化
- アラート通知

## ユビキタス

- メトリクス
[metrics](https://e-words.jp/w/%E3%83%A1%E3%83%88%E3%83%AA%E3%82%AF%E3%82%B9.html)

## ロギング行為
[参考URL](https://expressjs.com/ja/advanced/best-practice-security.html)

>開発環境では許可されることが、実稼働環境では許可されないことがあります。例えば、開発環境ではデバッグのためにエラーの詳細なロギングを実行できますが、同じ動作が実稼働環境ではセキュリティー上の問題となります。

## ログレベル

おそらくほとんどのライブラリで使用するのではないか。
`all < trace < debug < info < warn < error < fatal < mark < off`

## Tips

[zozoでの](https://techblog.zozo.com/entry/zozotown-backend-monitoring)