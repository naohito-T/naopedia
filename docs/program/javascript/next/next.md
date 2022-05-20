# Next

[NextJS リファレンス](https://nextjs.org/docs/api-reference/next/image)

## 歴史

## Reactとの違い

Reactへブラウザは受信したJSファイルを処理することでh1タグとその内容を描写していることがわかる

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

---

## 仕組み

Next.jsでは、**ブラウザへ送信する前にpre-Rendering**をおこなっている。
[SSGとSSRの違い](https://blog.microcms.io/nextjs-sg-ssr/)

### SSRとして動作させる(pages)

※都度生成されているため以下の**ランダムな数字は変わる**

```ts
// pages/ssr.js
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
// pages/sg.js
export async function getStaticProps() {
  const random = Math.floor( Math.random() * 100 );
  return {
    props: {
      random,
    },
  }
}
```

### 各コマンド仕組み

`$ next dev`
ローカルでアプリケーションを起動します。
※getStaticPropsを利用した場合でもsSRノドウサニナル。

`$ next build`
.nextフォルダーにプロダクション用のコードを吐き出す

`$ next start`
プロダクション環境でアプリケーションを実行する

## 各メソッド

ついでにuseSWRを利用してデータを取得してみます。
SWRはRenderingの種類ではない。Stale-While-Revalidateというキャッシュ戦略の略。

---

## _document.jsによるカスタマイズ

Next.jsではindex.jsファイルにheadタグ、bodyタグ、編集できる

---
## モダンなCSS → CSS in JS

## styled-components

**CSSの記述はSassと同じネストによる記述が可能**

CSS in JSを使う意味の主なものとしては、
メンテナンス性の向上と、パフォーマンスの向上
JavaScriptフレームワークではコンポーネント単位でソースを管理することが一般的。
CSSを別管理でひとまとめにするよりもコンポーネントとセットで管理したほうがCSSの記述箇所を見つけやすくメンテナンス性が高くなる。

またCSS in JSを使うと、表示中の要素だけCSSを書き出し不要なCSSを書き出さないという処理が可能になるためパフォーマンス性が上がる。
またSEOの評価も上がる。

## pages/apiとは

[参考URL](https://maku.blog/p/qcp2coz/)

next.jsでは`pages/api`ディレクトリ以下にTypeScript (JavaScript) コードを配置するだけで、クライアントサイドJavaScriptから呼び出せるAPIを定義することができる。
※`pages/api`ディレクトリ以下の実装内容が、クライアントに見られてしまうことはない。