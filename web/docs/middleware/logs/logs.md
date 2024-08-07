# logs

## Overview

[IPA:「企業における情報システムのログ管理に関する実態調査」報告書について](https://warp.da.ndl.go.jp/info:ndljp/pid/11440710/www.ipa.go.jp/security/fy28/reports/log_kanri/index.html)  
[NIST: コンピュータセキュリティログ管理ガイド](https://www.ipa.go.jp/security/reports/oversea/nist/ug65p90000019cp4-att/000025363.pdf)  
[ログの保持期間の目安についてまとめられている資料があるので2023年2月時点で照らし合わせる](https://shinkufencer.hateblo.jp/entry/2023/02/11/000349)

>「ログ」は、組織のシステムおよびネットワーク内で発生するイベント（事象）の記録である。ログは複数のログ項目から構成される記録であり、個々のログ項目は、システムまたはネットワークにおいて発生する特定の１件のイベント（事象）に関連した情報を含む。組織におけるログの多くは、コンピュータセキュリティに関する記録を含む。これらのコンピュータセキュリティのログは、数多くの情報源によって生成される。たとえば、ウイルス対策ソフトウェア、ファイアウォール、侵入検知および防止システムなどのセキュリティソフトウェアや、サーバ、ワークステーション、ネットワーク装置上のオペレーティングシステム、およびアプリケーションなどである。
>コンピュータセキュリティログ管理が必要となっている。コンピュータセキュリティログ管理とは、コンピュータセキュリティログデータの生成、通信、格納、分析、廃棄するプロセスのことである。

## ユビキタス

- メトリクス（測定・基準・尺度・計量）などを意味する。
[metrics](https://e-words.jp/w/%E3%83%A1%E3%83%88%E3%83%AA%E3%82%AF%E3%82%B9.html)

## ログの適切な取得と保管

[総務省が書いているやつ](https://www.soumu.go.jp/main_sosiki/cybersecurity/kokumin/business/business_admin_22.html)

- ログの保管とバックアップ
  - ログは、収集した機器の本体内ではなく、ログ取得のために別途ログ管理システムなどを設計し、そこで保管を行うことが推奨されます。そうすることで、ログの改ざんなどの不正行為からの保護だけでなく、ログ解析プログラムによる可視化処理を行ったり、保存期間の制御なども行いやすくなります。  
また、一定期間を経過したログの保管方法として、コストや保存期間を考慮し、外部記憶媒体等に保管する運用も検討しましょう。通常のデータのバックアップと同様に、ログのバックアップも重要になります。

- ログの取り扱いの注意
  - ログには、誰と誰がいつどのような内容の通信を行ったか、という情報が記録されています。また、企業秘密に関する情報や、電子メールの内容、利用者が入力した個人情報などがそのまま含まれている場合もあります。ログは機密情報であるということを理解し、取り扱いには十分な注意が必要です。
  - たとえば、外部のセキュリティ調査会社にログを開示して調査を依頼する際にはログの内容に関して秘密保持契約を結んだり、ログを外部に持ち出さなければならない際にはデータの暗号化を検討するなど、秘密の保全に関する対応が必要であることを理解しましょう。

## 監査とコンプライアンスに適合するための要件

[監査とコンプライアンスに適合するための要件](https://www.jtc-i.co.jp/product/kiwisyslogserver/compliance.html)

- 関連するログを集中して記録すること
- 適時にログを閲覧できること
- ログの重要度等に応じて保存すること

| 保存期間 | 法令・ガイドライン等                                                                                                                             |
|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| 1か月間   | 刑事訴訟法 第百九十七条 ３「通信履歴の電磁的記録のうち必要なものを特定し、三十日を超えない期間を定めて、これを消去しないよう、書面で求めることができる。」                        |
| 3か月間   | サイバー犯罪に関する条約 第十六条 ２「必要な期間（九十日を限度とする。）、当該コンピューター・データの完全性を保全しおよび維持することを当該者に義務付けるため、必要な立法その他の措置をとる。」 |
| 1年間    | PCI DSS 監査証跡の履歴を少なくとも 1 年間保持する。少なくとも3 か月はすぐに分析できる状態にしておく。                                                                |
| 3 年間   | 不正アクセス禁止法違反の時効。                                                                                                                  |
| 5年間    | 内部統制関連文書、有価証券報告書とその付属文書の保存期間に合わせて。電子計算機損壊等業務妨害罪の時効。                                                |

## ログの保存期間

[「結局アクセスログってどれくらい保存しておけばいいの？」に答える関係法令](https://qiita.com/yamotuki/items/628f9bf399cc9b59f3cb)  
[セキュマカ: アクセスログを取得することの重要性とは？保存期間やポイントも解説](https://www.lrm.jp/security_magazine/log-management_important/)

## 出力レベルの考え方

[log level](https://en.wikipedia.org/wiki/Syslog#Severity_level)
[log perfectガイド](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/)

ロギングはプログラムで何が起こっているかを把握するためのもっとも効果的な手法の1つ。  
さらに、構造化ログにより、トレースとフィルタリングが改善される。

log監視ツールが色々あるためそれをまとめる。

ログと言っても色々ある

- メトリクス収集
- ロギング
- 可視化
- アラート通知

## Tips

[zozoでの](https://techblog.zozo.com/entry/zozotown-backend-monitoring)

## ロギング行為の基本

[参考URL](https://expressjs.com/ja/advanced/best-practice-security.html)

>開発環境では許可されることが、実稼働環境では許可されないことがあります。例えば、開発環境ではデバッグのためにエラーの詳細なロギングを実行できますが、同じ動作が実稼働環境ではセキュリティー上の問題となります。

- 開発環境と本番環境で分ける。
- 本番で出すことはセキュリティー状の問題となってしまう場合がある

## ログレベル

おそらくほとんどのライブラリで使用するのではないか。
`all < trace < debug < info < warn < error < fatal < mark < off`

## 開発者のためのロギング

[参考URL](https://qiita.com/yukin01/items/33f20fc6efef3e783c85)

>一般的に、ある時点で起こったイベントとその時刻を記録することをロギングと呼びます。Web アプリケーションの場合は、Web サーバーのアクセスログやアプリケーションサーバーの実行ログ、及びエラーログなどを記録して、ストレージやログ集約サービスに永続化し、活用する仕組み全体を指していることが多いです。

ログを収集する目的はさまざまですが、いくつか例をあげると次の通りです。
セキュリティ要件を満たすためにアクセスログを長期間保存したい
不具合を調査するためにアプリケーションのエラーログを検索したい
アクセスログの統計情報をとってダッシュボードに表示したい

## ログの出し方

>基本的にログを出す時は流れでわかるようにせず1行で完結する形が好ましいです
>（DB: liver id: xx、DB: token: xx、みたいに、あと行を分けず全部1行で出していいと思います）
>現在は複数プロセスが一つのログに前後混ざることがないですが
>そういう処理を作る場合にこの書き方に慣れていると処理を追いにくい、追えないログになってしまいます
>またgrepなどで検索する際にも前後を出さないといけなくなってしまいます

>細かいところはリファクタリングのフェーズでいいと思いますが
>loggerの機能でできる部分と合わせて日時、ログ種別(info,warning,error)、PID、ログ内容、あとはログ発生タスクやUtilなどがわかるようになっていると検索性も良くなるので意識してもらえるといいと思います

ログ出力の設計において、「いつ」ログを出力するかは、アプリケーションのデバッグや監視のニーズに依存します。関数（またはアクション）の先頭でログを出力する場合と、処理の終了時や重要なイベント発生後にログを出力する場合があります。各アプローチには、それぞれ利点と適用シナリオがあります。

### 関数の先頭でのログ出力

- **利点:** 関数が呼び出されたという事実を記録できます。また、関数への入力パラメーターをログに記録することで、デバッグ時に何が関数に渡されたかを容易に追跡できます。
- **適用シナリオ:** デバッグ時やシステムの挙動を理解するために、関数の呼び出しパターンや呼び出し頻度を知りたい場合に適しています。

### 関数の結果や処理の終了時でのログ出力

- **利点:** 関数の実行結果や処理の成否を記録できます。エラーハンドリングや成功した操作の詳細をログに記録でき、システムの正常性や問題の診断に役立ちます。
- **適用シナリオ:** エラーの診断、処理の成否の監視、特定のイベント後のシステムの状態を把握したい場合に適しています。

### あなたのシナリオ

あなたが示したコードでは、関数の途中でログを出力しています。これは、特定の処理ポイントでの情報収集や状態の記録を目的としている可能性があります。関数内でのログ出力は、次のような目的で有用です：

- **関数の実行フローの追跡:** とくに複雑なロジックや条件分岐が多い関数では、どのパスが実行されているかを確認するためにログを出力することが有効です。
- **重要なイベントの記録:** 処理の途中で特定の条件が満たされた場合や、重要な処理ステップが完了した場合にログを出力して記録します。

関数内でログを出力する際は、ログの量と質を適切に管理することが重要です。不必要に多いログは情報の洪水を引き起こし、本当に重要な情報を見落とす原因になり得ます。また、ログには実行コンテキストに関連する十分な情報を含めることが望ましいです（ただし、セキュリティやプライバシーに配慮して）。最終的に、ログ出力戦略は、アプリケーションの要件、開発および運用チームのニーズ、そして利用可能な監視・分析ツールによって形成されるべきです。

## 3つのフェーズで導入する

- ログ出力
アプリケーションがどういう形でログを出力して、どう記録されるか
- ログローテート
無尽蔵に増えるログに対してどう対処するか
- ログ集約
どうやってストレージや外部サービスにログを永続化するか

## RestAPIでのログの出しかた。

アプリケーション全体で繰り返したくないログ行がある。  
HTTP APIを提供するアプリケーションの場合、着信要求ごとに常にログ行があると便利です。  
このようにして、一部のエンドポイントでこのログ行が忘れられたり、ログが構造的に異なったりすることを回避します。

これを実現するために、`Express.js` ミドルウェアをプレリクエスト ハンドラーとして定義する。

※デフォルトでは、すべてのヘッダーとクエリパラメーターがログに記録されます。
そのため、アクセストークンを送信する際には注意してください。認証に関する後の投稿で、デフォルトのシリアル化を変更して、ログからアクセス トークンを除外します。

## logでのトランスポート

ログでのトランスポートは、ログメッセージを処理して出力するための外部プログラムやサービスを指す。  
通常、ログメッセージは標準出力（stdout）に送られますが、トランスポートを使用することで、これらのログメッセージをさまざまな形式で加工したり、異なる出力先（たとえば、ファイル、リモートのログ収集サービスなど）に送ったりできる。

Pinoでは、pino-prettyのようなトランスポートを使用して、ログの出力を読みやすくフォーマットすることが一般的な使用例です。しかし、Pino v7以降では、トランスポートの扱いが変更され、子プロセスとして実行されるようになりました。これにより、メインのアプリケーションプロセスのパフォーマンスに影響を与えずに、ログ処理を行うことができます。

```ts
const pino = require('pino');

const logger = pino({
  name: 'nid-backend',
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

logger.info('This is an info message');
```

この方法では、ログメッセージは標準出力に送られ、トランスポートを使用する場合に見られる子プロセスの起動は行われません。これにより、特定の実行環境での互換性の問題を避けることができます。

---

## シングルトレーシング

モノリスなアプリケーションの対してトレーシングすること（一枚岩）

## 分散トレーシング

[参考URL（Goでの実装）](https://tech.every.tv/entry/2021/12/14/120000)

分散トレーシングとは分散されたアーキテクチャアプリケーションを監視するための手法。
マイクロサービスのような複数システムから構成されるアーキテクチャでは**複数のサービスを跨いで処理が動くため、全体の振る舞いを把握することが難しい課題。**
。 また、障害発生時に原因を特定することも困難です。 分散トレーシングの手法を用いることで、サービス間をまたいだ処理の計測や可視化が可能になり、それら課題の解決に繋がります。

### 用語

- トレース（Trace）
    トレースは**アプリケーションがリクエストを処理するのに費やした時間**と、このリクエストのステータスを追跡するために使用されます。各トレースは、ひとつまたは複数のスパンで構成されます。

- スパン（span）
    スパンは、特定の期間における分散システムの論理的な作業単位を表します。複数のスパンでトレースが構成されます。

各サービスにおける処理の単位がスパンで表され、複数のスパンで構成される一連の全体処理がトレースで表されます。

## DatadogとSentryの違い

[両方導入している会社の話](https://tech.visasq.com/optimize-operation/)

Datadogはアラートモニタリングサービス。
Sentryはアプリケーションモニタリング&エラートラッキングサービス。
一部重複する機能はあるが、Sentryを導入することでユーザー体験や開発効率を向上させることができると思う。
