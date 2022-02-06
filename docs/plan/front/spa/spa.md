# SPA

近年台頭してきたSPA技術。

上司にメリットを伝えられないためまとめる

## SPA 仕組み

ブラウザから初回リクエストが来ると、サーバはJSのビルドファイルと最小限のHTMLファイルを返却する(HTMLはほぼ空)
そこでブラウザ上のJSがAPIを叩くことで、APIからのレスポンスをもとに初期表示との差分を更新する形でDOMを構築しHTML要素がレンダリングされる。
**※返ってくるHTMLファイルは単一のためSingle Pageと呼ばれている。**
**後述するSSRと対比してClient Side Renderingと呼ばれることも**

![SPA仕組み](image/spa仕組み.png)

ホスティングサーバはS3の場合もある。

## SPAメリット

ネイティブアプリの代わりとして提供可能(PWA対応など)
ページ遷移が高速(ページごとにリクエストを送らないため)

## SPAデメリット

1. 初期ローディングは時間がかかる。
クライアント側ですべてのDOMを構築するとJSのダウンロード → DOM構築と、クライアント側での処理時間が長くなる傾向がる。

2. SEOで不利な可能性もある(初期状態はほぼ何もないHTMLファイルが返却されるため、Googleクローラが中身のコンテンツを認識できない可能性があるため)

3. OGPが設定できない
動かない理由
理由は単純！FacebookやTwitterなどのSNSのクローラーはクロールの際にJavaScriptを実行しないからです。クライアント側でJavaScriptによるOGPの変更をしても、SNSでは反映さない。
SPAでOGPを生成するにはなにかあるらしい

[参考URL](https://qiita.com/kanoi_y/items/c71a967673ce7944409d)

## SPA = CSR(クライアントサイドレンダリング)

まず大前提でNuxtやReactなどのJSで呼ばれる時、SSRとCSRの処理に分かれる

CSR ブラウザで動作する部分

以下例
```html
<p id="mode"></p>
<script>
  var target = document.getElementById('mode')
  if (target != null) target.innerHTML = 'csr'
</script>
```

nuxt.jsでいうと、mounted()は

## 注意

記事一覧や詳細ページなどはJamstack構成によってビルド時にページを生成しますが、**検索ページや下書きプレビューページはクライアントからAPIを呼び出す必要があります。**
**このような場合にAPIキーを隠すためには、サーバサイド経由でリクエストを送る必要があります。**
NetlifyのNetlify Functionsや、Next.jsのAPI Routes、AWSのLambdaあたりを使うのが一般的でしょうか。
このあたりは別で記事を用意しますので、今しばらくお待ちください。
