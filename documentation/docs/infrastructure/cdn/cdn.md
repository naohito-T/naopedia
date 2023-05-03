# CDN: コンテンツデリバリネットワーク （エッジサーバー）

CDNは基本的に2つのシンプルな動作を制御して負荷分散を行いますが、今回はCDNでキャッシュさせる方法・キャッシュさせない方法について代表的な手段と、手段の違いによるメリット・デメリットを掲載します。

ユーザーからのリクエストがあったコンテンツをオリジンサーバーから取得し、CDN内にコンテンツのコピーを保持します。初回以降のアクセスからCDNとユーザーの間でキャッシュ配信します。


## CDNのキャッシュコントロール方法

キャッシュする・キャッシュしないという動作をコントロールする手段は2つある。
1. CDNで制御する方法
2. CDNを制御する方法

- CDNで制御する方法
CDN側を制御する方法とは、いわゆるCDNベンダーが用意している管理画面からキャッシュの設定を行う手段。
CloudFrontに代表されるCDNサービスは、ユーザー自身にて設定変更できる管理画面があらかじめ用意されており、このPATHではじまるリクエストはキャッシュしない、またはキャッシュするといった設定が可能です。

こちらは、適切なHTTPヘッダーをコンテンツ側に付与・またはオリジンサーバーで設定しCDNをHTTPヘッダーで制御する方法
- CDNを制御する方法（HTTPヘッダー）

- CDNをHTTPヘッダーで制御するメリット
CDNを導入していない場合でも、ブラウザキャッシュを意識する設定を行っているWEBサイトであれば環境によってはそのままCDN化できてしまう可能性がある、

また、CDNベンダーの仕様を確認するだけで設定の洗い出しが可能となり、「キャッシュをするのか・しないのか」という2択の動作を確認するだけですので、たとえば画面上の設定が期待した動作となっているのかということを改めて確認する必要はありません。
これはほとんどのCDNベンダはRFC7234にのっとったキャッシュコントロールに準拠しているためです。
そして、キャッシュルールはコンテンツごとに1つずつ定義されるため、キャッシュルールの項目数という概念が存在しないため柔軟なキャッシュ設定を計画することができます。