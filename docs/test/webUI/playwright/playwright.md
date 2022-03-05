# PlayWright

[詳しく書いてある](https://takeya0x86.github.io/2020/02/07/playwright-first-impression/)
[PlayWright を使ってE2Eテストを書いてみた](https://www.cresco.co.jp/blog/entry/14335/)

## PlayWrightとは

Microsoftが中心になって開発するNode.js上からブラウザを操作するためのライブラリ
>同じようなソフトウェアとしては Google が開発している Chrome 向けの Puppeteer や 古くから E2E テストで使われる Selenium が有名ですね。 これらのソフトウェアはテストランナーとともに利用することで、E2E テストを行うことができ、Window を表示しない ヘッドレスモード で動かすことができるので、CI などでも利用することができます。

## PlayWright特徴

対象ブラウザが Chromium/Firefox/WebKit となっており、現在主流の レンダリングエンジン および JavaScript エンジン を押さえている
Firefox と WebKit についてはブラウザ側にパッチを当て、ライブラリから操作するための穴を開けている様子
デバイスの Viewport や Geolocation、権限、タッチ操作など、モダンブラウザやモバイルデバイスで使われる機能のエミュレートができる
テストを安定させるために setTimeout に依存しない自動化の推奨と、それを推進するための API を提供している

開発は Chrome 向けのブラウザ操作ライブラリの Puppeteer を開発していたメンバーが中心となっていると、過去に Github 上の FAQ で記載されていました。ライブラリの API は、非常に Puppeteer と近いものとなっており、簡潔で使いやすい印象です。

## PlayWrightコード作成

これでplaywright用のブラウザを開ける。
Recordを押下後、ユーザのブラウザ操作からコードを作成できる。
`$ npx playwright open https://example/`

**おそらく、全てのブラウザ自動化ツールに関してはそうなのでは**

## PlayWright プロジェクト作成

`$ npm init playwright`


## PlayWright特徴

1. seleniumではわからないが、ブラウザを起動し(selenium)コードを生成してくれるジェネレーターがある
2. TypeScriptでやっているが環境構築が楽
3. Test風に記載ができ、テストランナーも別パッケージで提供されているためJestを書く用にできる。


## Tips

- pageのDOMを取得したい
```ts
const ogTitle = page.$("meta[property='og:title']"); // これは廃止となった
const ogTitle = page.locator("meta[property='og:title']"); // 最新はこれを使用する
```

## XPath(XML Path Language)とは

[参考URL](https://www.octoparse.jp/blog/xpath-introduction/#I.%20XPath%E3%81%AE%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)

ツリー構造となっているXML/HTMLドキュメントからの要素や属性値などを指定するための簡潔な構文(言語)です。
