# Sentry
[導入ブログ参考になる](https://tech.trustbank.co.jp/entry/2022/03/01/090021)

Sentryは**エラーの詳細を収集して可視化できるサービス。**
Sentryはエラートラッキングの他にもwebvitalに基づいたパフォーマンス監視などができる。
対応言語も多く導入しやすい。
エラーログの管理＆監視に導入される。

## 便利な部分

Sentryで集計やissue管理もできる。

## 自動読み込み

Sentryでは`SENTRY_AUTH_TOKEN`という名前で環境変数を注入すると自動で読み込む。

---

## トランザクション

Sentryのトランザクションはエラー監視ではなくパフォーマンス監視に使用されているようです。


## 環境変数

SENTRY_DSN
Sentry SDKに対してどこにエラーを送信するかを明記したもの。

## AUTH_TOKEN

`.sentryclirc`がlocalに作成され、その中に値がセットされている。
ただしwizardする際にプロジェクト選択しているためその値なのかな？
AUTH_TOKENはSentryのOrganizationと接続するための認証情報なのでリポジトリにアップロードすることもできません。

### envを設定すると自動で入る値

環境変数を使用する
または、環境変数を使用してcliを構成することもできる。


| プロパティ名       | 環境変数           |
| ---------------- | ----------------- |
| defaults.url     | SENTRY_URL        |
| defaults.org     | SENTRY_ORG        |
| defaults.project | SENTRY_PROJECT    |
| auth.token       | SENTRY_AUTH_TOKEN |

## sentry local動作

@sentry/nextjsを設定すると、ローカル開発時はdryRunモードで動くため**実際のsourcemapのアップロードは行われない**のですが、コンソールにデバッグログが流れてしまうのが邪魔でした。

---

## SentryでのReleaseの導入方法
[参考URL](https://qiita.com/scent_y/items/626df631b0537bd5e915)

### Sentry Releasesとは

Sentry Releasesを利用するとどのバージョンでエラーが発生したのか特定できるようになり、バージョン別のエラーモニタリングが可能になります。
Sentryにリリースのバージョンとリリースのアーティファクトをアップロードすることで、利用できるようになります。
また、ソースマップをアップロードすることでstack traceがソースマップと関連付けられ、Minifyされてないコードで表示されるようになります。そうすることで、エラー原因となるコードが特定しやすくなります。
※ソースマップとは、デプロイされたコードを元のソースコードにマッピングする方法を含むファイルです。ソースマップによりstack traceから得たコードを、変換されてない元の形で見ることが可能になります。

## Sentry Web Vitals
[リファレンス](https://docs.sentry.io/product/performance/web-vitals/)




---

## フロントエンドTips


- NextJS
[導入参考](https://note.com/tabelog_frontend/n/n7f6822ae0c0d)
onClickなどのイベントハンドラー内のエラーに関しては、何も設定せずにエラーをSentryに送信することができる。
ただ、デフォルトではNext.jsのpages配下などのコンポーネントで発生したエラーに関してはエラーが送信されません。


ウィザードが用意されているため便利
`npx @sentry/wizard -i nextjs`

sentry.client(server).config.js
クライアントとサーバー環境でエラーを検知するためのSentry初期化ファイル

next.config.js
next.config.jsが存在していれば`next.config.wizardcopy.js`が生成される

sentry.properties
ソースマップの送信などで使用されるsentry-cliのための設定ファイル（sentry-cliへのパスなど）

.sentryclirc
sentry-cliを使用するための、auth.tokenを格納

- error試し撃ち
defaultでsentry試し撃ちができる（pages配下にファイルができるため）
`http://localhost:3001/sentry_sample_error`
onClickなどのイベントハンドラー内のエラーに関しては、何も設定せずにエラーをSentryに送信することができる。


## バックエンドTips





<!-- # Sentry
# # Sentryを有効にする場合、dsnを指定する
SENTRY_DSN=https://7ce32ef9557d41779b66758d04a16078@o423721.ingest.sentry.io/5432159
# # ORGANIZATION > General Settings > Organization Settings > GENERAL > Organization Slug
SENTRY_ORG=anycolor-inc
# # Project Settings > PROJECT DETAILS > Name
SENTRY_PROJECT=cfc-frontend-stg
# # ローカルの環境で検証する場合のみ、Settings > Account > API > Auth Tokens で生成したtokenを利用可能
SENTRY_AUTH_TOKEN=5b8fd34af8d54e50bf0fa1febe5fec16db0e6feed44c4fa4a2a700d5eedb36d1 -->

## 属性

### tracesSampleRate

>普通にユーザーが来訪する本番環境に適用するには、tracesSampleRateをチュートリアルで書かれている>1.0から下げるべきだったのです。
>それに気付かずに本番環境に導入したことで、仮導入したページは一部だったにも関わらずかなりの勢いでトランザクションが消費されてしまいました。
>本格導入するにあたっては1.0のままではすぐにトランザクションを使い切ってしまうので、これを下げます。
>そもそもSentryのトランザクションとはどういう時に使われるのか、調べてみたところどうやらSentryのトランザクションはエラー監視ではなくパフォーマンス監視に使用されているようです。*2
>ふるさとチョイスはNew Relicも使用していますので、パフォーマンス監視はSentryではそれほど必要ではないはず……ということで思い切って0.001にまで下げました。