# Next

[NextJS リファレンス](https://nextjs.org/docs/api-reference/next/image)

## 歴史

NextJsバージョン > v12.0.1とSWCコンパイラを使用している。

## Reactとの違い

ブラウザは受信したJSファイルを処理することでh1タグとその内容を描写していることがわかる

ブラウザ ページソースを確認すればわかる

Client Rendering
検証でソースコードを見ると、h1タグなどは出現しない。
JSをブラウザが処理している

Server-side Rendering
検証でソースコードを見ると、h1タグなどがある。
JSをNextがpre-Renderingをおこなっているため

## Next強み

Nuxtだと、SSRにした場合はすべてのページがSSRとなってしまうが
Nextだと、**このページはCSR、次はSSRなど分けることができる。もちろんSSGも**
Next.jsの大きな特徴として、ひとつのプロジェクトの中で、SSGとSSRを混在して利用することができる

## Nextを使うべき理由

1. 開発サーバの高速リロード（これはNuxtと比べると本当に早い）
React(webpack)の開発サーバは変更を検知してページ全体をリロードします。Next.jsの開発サーバはソースコードの変更を検知して、stateを保持したまま変更があった個所だけを更新してくれます。これにより、開発体験が大幅に向上します。たとえば**フォームに入力した内容を保持したまま**タイトルのfont-sizeを変更することなどができる。

2. 画像最適化
Next.js 10.0.0から専用の画像コンポーネントが追加され、**配置されるサイズに応じて元画像をトリミングして配信してくれるようになった。**
必要なサイズのデータだけをダウンロードするので画像の表示を大幅に高速化できる。
※レスポンス表示で幅が小さくなった場合も自動でそのサイズにトリミングした画像を生成してくれる。

3. ゼロコンフィグ
webpack等の設定の必要がない。


---

## 仕組み

Next.jsでは、**ブラウザへ送信する前にpre-Rendering**をおこなっている。
[SSGとSSRの違い](https://blog.microcms.io/nextjs-sg-ssr/)

### Next.js12での仕組み

>Next.jsでは、すべてのアプリケーションが本番環境でより速くビルドされ、ローカル開発では即座にフィードバックが得られるようにしたいと考えています。Next.js 12には、ネイティブ・コンパイルの利点を活かしたまったく新しいRustコンパイラが搭載されています。

SWCは**Rust製の高速なトランスパイラ。**
Next.jsがSWCの利用を推進しており、Next.js 12からはデフォルトのトランスパイラがBabelからSWCに変更。
またSWCのソースコードはいくつかに分けてクレート化されており、Next.jsのみならずDeonの内部でも利用されています。

**Babel vs SWC**
![SWC](image/swc.png)

### Next-SWC(Next.js Compiler)

[とても参考になる](https://www.wantedly.com/companies/wantedly/post_articles/386129)

Next.jsがデフォルトで使うSWCは、SWCのラッパーになっていて、SWCで使える機能が一部制限されていたり、拡張されていたりします。このデフォルトで使われるSWCのことをNext-SWCという（公式ではNext.js Compilerとも呼ばれている）

## ディレクトリ移動

srcディレクトリは多くのアプリで一般的であり、nextはサポートしている。
※しかし`next.config.js`や`tsconfig.json`のような設定ファイルは、環境変数と同様にルートディレクトリに配置してください。
これらはsrcに配置しても動作しません。publicディレクトリについても同様

## SSRとSSGについて

[参考URL](https://www.gaji.jp/blog/2022/03/17/9343/)

Nextでクエリ文字列を使いたい時は`getServerSideProps`を使う
`getStaticProps`では使えない。


### SSRとして動作させる(pages)

※都度生成されているため以下の**ランダムな数字は変わる**

```ts
export async function getServerSideProps() {
  const random = Math.floor( Math.random() * 100 );
  return {
    props: {
      random,
    },
  }
}
```

### SSGとして動作させる(pages)

そのpages配下をSSGとして動作させたい場合は以下
※静的に生成されているため以下の**ランダムな数字は変わらない**

```ts
export async function getStaticProps() {
  const random = Math.floor( Math.random() * 100 );
  return {
    props: {
      random,
    },
  }
}
```

Static（通称SSG、SG）を利用するメリット
**CDNに静的ファイルをキャッシュ**することで表示のスピードUPを実現

## SSR回避させる

[SSR回避 実装パターン集](https://nishinatoshiharu.com/next-exec-only-client/)




## ISR(Incremental Static Regeneration)

[リファレンス](https://nextjs.org/docs/basic-features/data-fetching/overview#incremental-static-regeneration)

[Next ISRで動的コンテンツをキャッシュするときの戦略](https://zenn.dev/catnose99/articles/8bed46fb271e44)
ISRとは、動的なコンテンツを含むページも静的ページとしてCDNにキャッシュすることが可能になる。

ISRを使うことで動的なコンテンツを含むページも静的ページとしてCDNにキャッシュすることが可能になる。Next.jsのISRはドキュメントに書かれているようにstale-while-revalidateという考え方でキャッシュが行われる。
具体的には、リクエスト時にページのキャッシュを作成し、次のアクセスではキャッシュされた古いデータを返します。その裏で次のアクセスに向けてキャッシュが再生成されるというイメージです。

getStaticProps単体だと長期間キャッシュされる静的なページが出力される（いわゆるSSGというやつ）ここに`revalidate`を追加するとISRになる。

`revalidate: 10`の挙動は以下
- キャッシュが作られた後、10秒間はそのキャッシュを返し続ける（10秒以内に100回アクセスされてもキャッシュの再生成はされない）
- 10秒経ったあとはキャッシュが古くなったとみなされる。ただし次のリクエストでもいったんはそのキャッシュを返す（1時間後にアクセスがあった場合もいったん古いキャッシュを返す）
  - その裏でキャッシュを再生成する
  - その次のリクエストでは再生成されたキャッシュを返す

```ts
export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
    revalidate: 10 // 👈 ポイント
  };
};
```


### 各コマンド仕組み

[仕組み参考](https://qiita.com/st2222/items/827407bc146ef9886f06)

`$ npx next -h`で各コマンドの詳細を確認できる


`$ next dev`
ローカルでアプリケーションを起動します。
`getStaticProps`（SSGで利用するmethod）を利用した場合でも**SSR動作**になる。
このコマンドでは、ホットリロードやエラーレポートなどの開発モードでアプリケーションを起動できる

ただし、create-next-appでスキャフォールディングしたプロジェクトに用意されているdevコマンドで起動したアプリはサーバーサイドレンダリング（以下SSR）が有効になっており、**静的HTMLのみの確認ができない**

そこでNext.jsで静的HTMLエクスポートしたアプリをローカルで確認する方法を調べました。
[参考URL ](https://qiita.com/Nossa/items/bdc6a9705e89ea8fc250)


`$ next build`
.nextフォルダーにプロダクション用のコードを吐き出す
本番用に最適化されたビルドを行い、各ルートの情報がコンソールに出力されます。

`$ next start`
このコマンドは`next build`でビルドした後に実行すると、本番用としてサーバが立ち上がる。
プロダクション環境でアプリケーションを実行する
envはproduction

`$ next export`
outディレクトリに静的HTMLをエクスポートする。
サーバーにNode.jsを必要とせずにクライアントのみで実行できる静的HTMLを出力する。

localで確認する場合は
`$ yarn add -D serve`というパッケージをインストールする
※静的ファイルをホスティングするローカルサーバ

## 各メソッド

ついでにuseSWRを利用してデータを取得してみます。
SWRはRenderingの種類ではない。Stale-While-Revalidateというキャッシュ戦略の略。

## pages/apiとは

[参考URL](https://maku.blog/p/qcp2coz/)

next.jsでは`pages/api`ディレクトリ以下にTypeScript (JavaScript) コードを配置するだけで、クライアントサイドJavaScriptから呼び出せるAPIを定義することができる。
※`pages/api`ディレクトリ以下の実装内容が**クライアントに見られてしまうことはない。**

## middleware

ミドルウェアは、**一連のページのロジックを共有する**あらゆるものに使用できる
そこで、Next.js 12からは、ミドルウェアとしてエッジ関数（AWSのLambda@Edge的なもの？→中身はCloudflare Workersらしい）が導入されました。

エッジ関数は、リクエストが完了するまえにコードが実行できる。
クライアントとオリジンサーバーの間にエッジサーバーをおき、エッジ関数としてデプロイ。
エッジ関数は、認証、ボット保護、リダイレクト処理、サポートされていないブラウザ、機能フラグ、A/Bテスト、サーバー側の分析、ロギングなどあらゆるものに使用できる。
使い方は簡単で、 _middleware.tsを配置し、そのファイルに処理を書くだけです。

つまり、 VercelにReact Server Components (Next.js 12版）をデプロイするなら、それはミドルウェア上で（エッジ関数として）動作する、サーバーレスとして動くということらしいです。

/pages/_middleware.js(ts)ファイルが作成されている場合、/pagesディレクトリ以下すべてのページ（route）で実行される。

[参考URL](https://zenn.dev/catnose99/articles/0df722f3f025bb)

Next.jsでv12~ middlewareという機能が使えるようになった。
middlewareに書いた処理はリクエストが完了する前に実行される。
Cookieの値に応じてルーティングを振り分けたり、Basic認証を導入したりなど幅広い用途で使えそう。

**Tips**
**Vercelでホスティング**をすると相性が良い。
VercelとNext.jsの組み合わせが強いのは、VercelにNext.jsをデプロイするとこのmiddleware部分をEdge Functionsで捌いてくれるという点です。つまり、**静的なページに対するリクエストに対して、オリジンサーバーに触れことなくmiddlewareを実行できるということです。**

_middleware.jsファイルが複数のディレクトリに配置されている場合は、**階層が浅い方から順に実行されていく。**
### middlewareがなかった時は？

_app.tsxを継承したクラスがあるファイルを作成してったっぽい

---

## _app.js(tsx)

Appはすべてのコンポーネントの初期化に使われる


## _document.js(tsx)によるカスタマイズ

[参考URL](https://qiita.com/Yuki-Kurita/items/6a0eae00999e1294a3b1)

Next.jsのPageコンポーネントはデフォルトでは`<html> & <body>`タグの定義を行うが、それらを拡張したい場合は_document.js(tsx) を作成し、その中でDocumentコンポーネントを継承したクラスを実装する。

注意点
- SSR（サーバサイドレンダリング）のみの実行



---

## Next.js 12 の React Server Components

>(React Server Componentsを使用すると、対象のコンポーネント自体を含むすべてをサーバでレンダリングすることができます。これは、サーバ上でHTMLを生成する従来のSSRとは根本的に異なります。サーバコンポーネントを使用すると、クライアント側のJavaScriptが不要になり、ページのレンダリングが高速になります。これによりサーバレンダリングの良いところとクライアントサイドのインタラクティブ性を組み合わせて、アプリケーションのUXを向上させることができます。)

[参考URL](https://zenn.dev/rgbkids/articles/7be28904623b30)
[参考URL](https://developer.so-tech.co.jp/entry/2022/01/24/121102)

Next.jsのReact Server Componentsは、本家（Facebook）のReact Server Components (demo) よりも、実用的で使いやすくなっている。

## 背景（レンダリング技術の歴史）

WEBサイトのレンダリング技術はここ10年で、昔ながらのSSR(Server Side Rendering) からReactやVueを用いたSPA(Single Page Application) に移行した。
SPAは「UXの向上」や「ページ遷移の高速化」など利点があるが、「初期表示が遅い」「動的なOGP対応が困難」などの欠点もあります。
その欠点を補うべく、NextやNuxtではSPAとSSRやSSG(Static Site Generator)を組み合わせる手法がとられるようになった。
React Server Componentsではこれまでとは別のアプローチで、**SPAとSSRの良いとこ取りを目指す。**

## React Server Componentsの仕組み

React Server ComponentsはHTMLをサーバ側で生成する従来のSSRとは根本的に異なる。 **サーバ側では仮想DOMの生成まで**を行う。
サーバコンポーネントのレンダリングの結果（仮想DOM）はHTTPリクエストを介してブラウザに渡り、ブラウザ側でクライアントコンポーネントと合わせてレンダリングを完成させます。


3種類のコンポーネント
React Server Componentsでは次の3種類のコンポーネントが登場します。

**サーバコンポーネント**
サーバ（Node）でのみレンダリングされるコンポーネント。
ファイル名の末尾が`.server.js` → `.server.tsx`に変更可能
このコンポーネントで使用するコードはブラウザがダウンロードするJSにはバンドルされない
サイズの大きいライブラリも使いやすい
DBなどのサーバリソースにアクセス可能
状態を持てず、イベントのハンドリングができない（要はwindowオブジェクトにアクセスできない）

**クライアントコンポーネント**
ブラウザでのみレンダリングされるコンポーネント。ファイル名の末尾が`.client.js`

状態が持てる
ブラウザAPIにアクセス可能
イベントハンドルが可能

**ユニバーサルコンポーネント**
インポート先に応じて、両側で使用およびレンダリング可能なコンポーネント
サーバコンポーネントとクライアントコンポーネントの両方の制約（できないこと）を持つ

サーバコンポーネントから他のサーバコンポーネントやクライアントコンポーネントをインポートできます。
クライアントコンポーネントからサーバコンポーネントをインポートすることはできません。
（上記はコンポーネントの親子関係ではなく、ファイルのインポートの親子関係に関する制約）

---

## next/image

[参考URL](https://www.wantedly.com/companies/wantedly/post_articles/385515)

- レイアウトシフトが起きない
- サーバサイドでの画像リサイズ
- 適切な画像サイズの算出
- Lazy Loadが有効（特徴としてはNative Lazy LoadingではなくJS Lazy LoadingのためSafariなどのブラウザでも有効である。）

注意点
next/imageでは必ずしも指定したサイズの画像が返ってくるとは限らない。
next/imageでは画像の表示領域やユーザのディスプレイ解像度に合わせて適切な画像サイズを返す。


## next/imageを仕事で使う際に気をつけたい仕様

[参考URL](https://zenn.dev/yukishinonome/articles/da315b1be98a9c)

## Next.js状態管理



---

## Tips

[かなりのTipsが散りばめられている](https://qiita.com/Yuki_Oshima/items/5c0dfd8f7af8fb76af8f)
[nextの仕組みを読み解く](https://zenn.dev/izumin/scraps/15c9ad1248154f)

### 外部ライブラリの利用

ときおり普通のReactで動くライブラリがNext.jsでビルドすると動かなかったりします。

こうした場合は、動的インポート（Dynamic Import）という機能で対処できる場合があります。動的インポートしたコンポーネントはクライアントサイドでレンダリングされるため、実質的にReactと同じように処理されるためです。




---

## サードパーティ

## Jest

Next.js(12): SWCには自動で組み込まれている
[Nextリファレンス(12)](https://nextjs.org/docs/advanced-features/compiler)

---

## モダンなCSS → CSS in JS

## styled-components

[styled-components基本](https://qiita.com/taneba/items/4547830b461d11a69a20)

Next.js(12): SWCには自動で組み込まれている
[Nextリファレンス(12)](https://nextjs.org/docs/advanced-features/compiler)
[styled-components リファレンス](https://styled-components.com/docs/advanced#nextjs)

**CSSの記述はSassと同じネストによる記述が可能**

CSS in JSを使う意味の主なものとしては、
メンテナンス性の向上と、パフォーマンスの向上
JavaScriptフレームワークではコンポーネント単位でソースを管理することが一般的。
CSSを別管理でひとまとめにするよりもコンポーネントとセットで管理したほうがCSSの記述箇所を見つけやすくメンテナンス性が高くなる。

またCSS in JSを使うと、表示中の要素だけCSSを書き出し不要なCSSを書き出さないという処理が可能になるためパフォーマンス性が上がる。
またSEOの評価も上がる。

ThemeProviderの利用
styled-componentsにはThemeProviderというAPIがあります。これはContext APIを使って、子のコンポーネントに、propsでスタイルを渡すことができます。
これで、スタイルを共通化することができる。
ThemeProviderは、_app.jsで使用する。

## styled-media-query

[参考URL](https://github.com/morajabi/styled-media-query)

### next.js SSRでstyleを当てる

Next.jsとstyled-componentsが実行される前提とする環境が異なります。（styled-componentは元々クライアント側で動くことを前提としています）そのため、サーバーサイドでもstyled-componentsが働くようにする必要がある。

上記を対応するために、Next.js 12以前はBabel用styled-componentsのライブラリをダウンロードしなければいけず、めんどくさかった。
[参考URL](https://code-log.hatenablog.com/entry/2020/01/26/200134)

## Swiper

老舗のスライダー作成ツール
jQuery & nuxt & nextなど色々使える。
apiが充実しているわけではないため、もはや過去の記事を見て推測し適用しないと行けない。

[swiper](https://swiperjs.com/demos)
[swiper](https://b-risk.jp/blog/2022/04/swiper/)

## next/dynamic

dynamic import（動的インポート）とは動的にimportを実行するための機能
ES2020でJSの仕様として導入された。dynamic importを利用すると**非同期でモジュールを読み込む。**

たとえば初期表示で読み込み不要なモジュールにdynamic importを適用すると初期ロードの負荷を軽減でき、表示速度を改善できます。

Next.jsにおけるdynamic importのつかいどころは主に『SSR回避』と『ロード時のパフォーマンス改善』の2点

[リフェレンス](https://nextjs.org/docs/advanced-features/dynamic-import#with-suspense)
[参考URL](https://zenn.dev/unreact/articles/nextjs-routing-dynamic-routes)
[default exportとnamed exportでdynamic importする](https://nishinatoshiharu.com/overview-next-dynamic-import/)

## next locale
https://postd.cc/localizing-your-nextjs-app/

## next router

Next.jsのrouterにはstateがありません。

## next error
[参考URL](https://zenn.dev/mizuneko4345/articles/c576dfce8a49be)


### カスタムエラーページ
[参考URL](https://nextjs.org/docs/advanced-features/custom-error-page)
[デフォルト挙動](https://zenn.dev/kobayashi_m42/scraps/dedcf88361928b)
[プライベートでやれば綺麗にできそう](https://zenn.dev/nalo/articles/next-api-routes-error-handling)

>page/404.tsxを作成せずに、page/ _error.tsxを設定すると下記の警告が表示される。
>なお、存在しないURLにアクセスするとpage/ _error.tsxの内容が表示されている。


優先順位
pages/404.tsx or pages/500.tsx
↓
pages/_error.tsx
ここにif文で条件分岐してもいいが公式のハンドリングを使用した方がいい。

>pages/404.jsが"設置されていなければ"pages/_error.js"、"next/error"の優先順位

**404ページ**
頻繁にアクセスされる可能性を考慮し、NextJSではデフォルトでビルド時に静的に生成される。
※getStaticPropsビルド時にデータをフェッチする必要がある場合は、このページ内で使用できる。

**500ページ**
頻繁にアクセスされる可能性を考慮し、NextJSではデフォルトでビルド時に静的に生成される。
※getStaticPropsビルド時にデータをフェッチする必要がある場合は、このページ内で使用できる。

**pages/_error.tsx**
pages/_error.jsを設定した場合の挙動
getServerSidePropsで`{notFound: true}`を返した場合、_error.jsが表示される (pages/404.jsがない場合)
getServerSidePropsでErrorをthrowした場合、_error.jsが表示される
下記のようにstatusCodeを指定した場合、デフォルトのエラーページが表示される。
-> pages/_error.jsを定義したからといって、 next/errorが変更される訳ではない

```ts
import Error from 'next/error'

export default function Test() {
  return (
    <Error statusCode={500} />
  )
}
```

pages/500.jsを設定した場合の挙動
-> getServerSidePropsでErrorをthrowした場合、デフォルトのエラーページが表示される

## import NextErrorComponent from 'next/error'について

[Next.jsで任意のタイミングにエラーページを表示する](https://wp-kyoto.net/nextjs-show-error-component-and-statuscode/)

- メッセージ表示は一部のみ
HTTP 400 / 404 / 405 / 500以外のステータスコードを投げ込むと、「An unexpected error has occurred」扱いされる。
※他のメッセージを使用したい場合は`titleプロパティ`を使う。

- HTTP Status Code
**SSGではerrorを出してもHTTP上は200が返る。**

### Next error ハンドリング
[リファレンス](https://nextjs.org/docs/advanced-features/error-handling)
[参考URL](https://zenn.dev/mizuneko4345/articles/c576dfce8a49be)




---

## next env

[これを見れば大体わかる](https://blog.ojisan.io/next-env/)

`.env.local`
`$next dev`のときに読み込まれる。

`.env.development`
NODE_ENVがdevelopmentのとき読み込まれる。

`.env.production`
NODE_ENVがproductionのときに読み込まれる。

## next サーバーレスモード

[参考URL](https://engineering.nifty.co.jp/blog/6864)
Next.js8からサーバレスモードが実装された。
従来であればひとつのサーバ上に乗せて動作させるものを、AWS Lambdaのような機能ごとに分割して動作させることができる。
ただ、Next.jsとしては分割するだけにとどまる

```sh
# next buildした結果
frontend/.next
├── build-manifest.json
├── cache
├── package.json
├── react-loadable-manifest.json
├── server # これがserver側で動作するやつ。pages/* ディレクトリ配下
├── static
└── trace
```

## Serverless Nextjs Plugin

サーバレスモードで

## Tips

- next起動時にHookを仕掛けたい
[参考URL](https://stackoverflow.com/questions/69980706/hook-into-nextjs-server-startup)