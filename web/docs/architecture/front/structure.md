# Structure

[参考URL](https://qiita.com/amakawa_/items/e7d0720e1ab8632769bf)

## ブラウザがWebページを表示する仕組みについて HTML/CSS/JavaScriptのみ

シンプルにHTML/CSS/JavaScriptのみで動くアプリケーションの場合

- デメリット
**変更がない部分(ヘッダーなど)のHTMLも毎回サーバから送信されるため処理に時間がかかる。**

## SPA(Single Page Application)

- メリット
  実装しやすい
  サーバの準備が楽
  SPAは、最もシンプルに実装でき、ホスティング先の選択肢が多いのが魅力です。
  ドキュメントで、NetlifyやGitHub Pagesへのデプロイ方法が紹介されていますが、単にファイルをアップすればいいだけなので、ロリポップのようなレンタルサーバーでも動きます

- デメリット
  初期表示が遅い
  SEOに不安がある
  OGをページごとに設定ができないOGってなんだっけ

SSR(Single Side Rendering)

- メリット
  SPAの欠点を解消できる

- デメリット
  実装がSPAより面倒
  サーバーの準備が面倒

  初回のリクエストをサーバーサイドでレンダリングして返すため、SPAの欠点を補うことができます。一方で、レンダリングするためのサーバーと、SSRを考慮した実装が必要になります。
  ドキュメントで、HerokuやNowへのデプロイ方法が紹介されていますが、Node.jsが動作するサーバーを用意できればなんでも大丈夫です。インフラに弱い人にはこのハードルが高い気がしますが、インフラに強い人や、好きなPaaSがある人にとっては、SSRが魅力的な選択肢になると思います。

SSG(Static Site Generation)

- メリット
  SPAの欠点を解消できる
  **サーバーの準備が楽**
  SSRよりも速い
  更新が少ないWebサイト
  ドキュメントやブログ

- デメリット
  実装が少し面倒
  用途が限られる

各ルートのHTMLをあらかじめ生成するため、SSRよりもレスポンスが速いのが魅力です。また、静的ファイルを生成するおかげで、SPAと同じようにホスティング先の選択肢が広がります。

生成時にはサーバーサイドでレンダリングすることになるので、SSRを考慮した実装が必要になるのと、SSGには向き不向きがあるので、Webサイトの要件を考えて慎重に選択する必要があります。

## OGP(Open Graph Protocol)

FacebookやTwitterなどのSNSでシェアした際に、設定したWEBページのタイトルやイメージ画像、詳細などを正しく伝えるためのhtml要素。
これを設定しておくと、SNS上でURLが共有された際にタイトルや画像、説明文などが表示されるようになり、ユーザーに対してページの内容を詳しく伝えることができる

```html
<meta property="og:url" content=" ページの URL" />
<meta property="og:type" content=" ページの種類" />
<meta property="og:title" content=" ページの タイトル" />
<meta property="og:description" content=" ページの説明文" />
<me ta property="og:site_name" content="サイト名" />
<meta property="og:image" content=" サムネイル画像の URL" />
```
