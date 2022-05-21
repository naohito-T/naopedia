# Front

フロントでの設計思想を記述する。

[フロントの各設計について(Jamについても)](https://qiita.com/ozaki25/items/4075d03278d1fb51cc37)

## JAMStack(JavaScript/APIs/Markup)

事前にデータを埋め込んだ静的HTMLとJavaScriptをベースに、完全に分離したサービスやシステムのAPIを通じて動的コンテンツを扱うWebアプリ・WebサイトのアーキテクチャをJamstackといいます。
※nuxtのgenerate

## JAMStackの env KEYについて

[参考URL](https://blog.microcms.io/nuxt-secure-api-key/)

## 各レンダリング


### SSG(静的サイトジェネレーター)

SSGはプリレンダリング。
**静的ファイルのみ**なのでNetlifyやVercel、GitHub Pagesなどが良い。
JAMStackと言われれるアプリケーションはSSGに当たる。
環境に関しては、Node.js環境を必要としません。
その代わり設計によってはクライアント側に大きな負荷をかけやすい&動的コンテンツの実装は難しい（できないことはない）ので、優れた設計が必要です。
CDNと相性が良いので、ホスティング先のリージョンは気にしなくて良いでしょう。
VercelのCDNは、強力に見えますが、Netlifyの扱いやすさを加味するとどちらも良い選択肢でしょう。

メリットとしては、
高速（CDN配信）
セキュア（サーバを管理しない）
でしょうか。

