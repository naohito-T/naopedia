# OGP(Open Graph Protocol)

## OGPとは

[参考URL](https://www.e-webseisaku.com/column/marketing/3947/)

FacebookやTwitterなどのSNSでwebページやブログの記事がシェアされた時、またLINEなどのメッセージ機能でページのURLを送信した時に、そのページのタイトル、URL、概要、画像を表示させる仕組みのこと

## OGP 概要

```html
<meta property="og:title" content="タイトル">
<meta property="og:type" content="website　または　blog　または　article">
<meta property="og:description" content="ページの簡単な説明">
<meta property="og:url" content="ページのURL">
<meta property="og:site_name" content="サイトのタイトル">
<meta property="og:image" content="サムネイル画像のURL>
```

og:title
ページのタイトルを記述します。

og:type
ページのタイプを記述します。
トップページの場合websiteまたはblog、下層ページはarticleです。

og:description
ページの概要として表示される説明文を記述します。

og:url
ページのURLを記述します。絶対パスで指定してください。

og:site_name
サイト名を記述します。

og:image
SNSでシェアされた場合に表示される画像を設定します。
ここで画像を設定しない場合は、**ページ内で使用されている画像からランダムで画像が選ばれて表示される**

## 作成

OGPの生成などnode.jsで画像生成をしたいというケースは最近増えてきているのではないでしょうか。その中でもクライアントで実行可能なCanvasを利用したいケースというのも同様に多いと思います。

[[serverless]AWS Lambdaでnode-canvasを利用した画像生成をする](https://qiita.com/tk1024/items/0cca8185a105315a4b58)
[サイトのOGP画像を自動清正する](https://zenn.dev/panda_program/articles/generate-og-image)
