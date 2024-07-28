# SPA

[SPA/SSR/プリレンダリングの違い](https://qiita.com/amakawa_/items/e7d0720e1ab8632769bf)

## SPAとは

[参考URL](https://www.azusuki.com/spa-mpa/)

通信パターンの単語とのこと（Webサイトの通信について）

## ブラウザバック時のUI状態復元

## SPAで軽視されがちな部分

- ブラウザバックによるスクロール位置の復元
[参考URL](https://zenn.dev/akfm/articles/next-js-scroll-restore)
Browser historyなライフタイムStateの代表格の1つに、スクロール位置がある。

ブラウザバック時などにスクロール位置を復元することをscroll restoration
スクロール位置の喪失をscrolling amnesia

- UI状態の復元
[参考URL](https://zenn.dev/akfm/articles/react-state-scope)

例
たとえば「アコーディオンを開いた」というStateはSPAでなかった場合には履歴に紐づくものです。SPAだとブラウザバックしたらすべてのアコーディオンが閉じてしまってるような経験がある方もいるでしょうが、これらの望ましい体験としてはやはり「履歴に紐づいて復元される」ことだと考えられます。
しかし現実には復元されないSPAが多いように感じますし、関連ライブラリの少なさなどから実装難易度高いのが現状。
[スコープとライフタイムで考えるReact State再考](https://zenn.dev/akfm/articles/react-state-scope)

## Stateの分類

[スコープとライフタイムで考えるReact State再考(これは素晴らしい)](https://zenn.dev/akfm/articles/react-state-scope)

Stateの種類
[「3種類」で管理するReactのState戦略](https://zenn.dev/yoshiko/articles/607ec0c9b0408d)

- Local State
コンポーネント単位のState。useStateによって管理し、コンポーネントがアンマウントされるまで生存する。

使用するライブラリ
React.useState

- Client State
複数のコンポーネントから利用されうる、もしくはページを跨いで利用するState。APIレスポンスやUIの状態などで、ReduxやRecoil、Context APIなどを通じて管理されることが多い。

使用するライブラリ
Recoil

- Server State
APIサーバーからのレスポンスやそのキャッシュ。SWRやReact Queryの内部で管理されてるものを指す。ReduxやRecoilでも管理されることがある。

使用するライブラリ
Server State: SWR
>Recoilでもasync selectorを使えばSWRのようにAPIレスポンスのキャッシュなどを扱うこともできますが、実装がSWRより少々冗長な気がするのでServer Stateに対してそれに特化したライブラリを選定するのがお勧めです

### ライフタイムによるStateの分類

スコープによって大きく3つに分けられたstateの分類を**ライフタイムでより細分化する**
先に分類したStateをライフタイムで細分化すると以下のようになります。

- Local State
  - Component unmount

- Client State
  - JavaScript memory
  JavaScriptのメモリが解放されるまで、つまりSPAにおいては「リロードや離脱が発生するまで」になる。

  - Browser history
  ブラウザの履歴が破棄されるまで、実装的には `history.push` や `replaceState` によって履歴に対してState Objectが関連付けられるので、このObjectが破棄されるまでになります
  実際にObjectが破棄されるタイミングは以下仕様を確認した限りブラウザの実装によりそうですが `document` が非アクティブなタイミングで破棄されうるようです。

  - URL Persistence
  URL PersistenceはBrowser historyに近しいですが、こちらは**URLが履歴やブックマークに存在する限り生存可能**なライフタイムです。URLに基づきStateを初期化・Stateが更新されるたびにURLを更新をおこないます。こちらも `history.push` や `replaceState` を駆使して実装する（もしくはライブラリを通して利用する）ことになります。

  - Browser storage
  Browser storageはLocal StorageやSession StorageなどのWeb Storageに保存した場合、つまりこれらがブラウザによって破棄されるまでになります。要件・要望としては多いようで、State管理の関連ライブラリでStorageと一部同期するもの（後述のrecoil-persistやredux-persist）が多数存在します。

- Server State
  - Server

## SPA 仕組み

ブラウザから初回リクエストが来ると、サーバはJSのビルドファイルと最小限のHTMLファイルを返却する（HTMLはほぼ空）
そこでブラウザ上のJSがAPIを叩くことで、APIからのレスポンスをもとに初期表示との差分を更新する形でDOMを構築しHTML要素がレンダリングされる。
**※返ってくるHTMLファイルは単一のためSingle Pageと呼ばれている。**
**後述するSSRと対比してClient Side Renderingと呼ばれることも**

ホスティングサーバはS3の場合もある。

## SPAメリット

ネイティブアプリの代わりとして提供可能（PWA対応など）
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

CSRブラウザで動作する部分

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
