# PlayWright

[詳しく書いてある(これBlog)](https://takeya0x86.github.io/2020/02/07/playwright-first-impression/)  
[PlayWright を使ってE2Eテストを書いてみた](https://www.cresco.co.jp/blog/entry/14335/)  
[playwright-coreと、PCにインストール済みのChromeやEdgeを使って自動操作する](https://zenn.dev/yusukeiwaki/articles/90bf05c2cf9a90)
[playWright fixture変更リファレンス](https://playwright.dev/docs/auth)  
[chrome login](https://playwright.dev/docs/auth)

## PlayWrightとは

Microsoftが中心になって開発するNode.js上からブラウザを操作するためのライブラリ
>同じようなソフトウェアとしては Google が開発している Chrome 向けの Puppeteer や 古くから E2E テストで使われる Selenium が有名ですね。 これらのソフトウェアはテストランナーとともに利用することで、E2E テストを行うことができ、Window を表示しない ヘッドレスモード で動かすことができるので、CI などでも利用することができます。

## PlayWright特徴

対象ブラウザが `Chromium/Firefox/WebKit` となっており、現在主流のレンダリングエンジンおよびJavaScriptエンジンを押さえている  
FirefoxとWebKitについてはブラウザ側にパッチを当て、ライブラリから操作するための穴を開けている様子  
デバイスのViewportやGeolocation、権限、タッチ操作など、モダンブラウザやモバイルデバイスで使われる機能のエミュレートができる  
テストを安定させるために `setTimeout` に依存しない自動化の推奨とそれを推進するためのAPIを提供している  

開発はChrome向けのブラウザ操作ライブラリのPuppeteerを開発していたメンバーが中心となっていると、過去にGithub上のFAQで記載されていました。ライブラリのAPIは、非常にPuppeteerと近いものとなっており、簡潔で使いやすい印象です。

## 認証プロバイダーにはアンチロボット検出器を逃がす

[海外のテストエンジニア](https://adequatica.medium.com/google-authentication-with-playwright-8233b207b71a)

まず、Playwright、Puppeteer、またはSeleniumの自動テストは間接的な兆候によって検出される可能性があり、自動テストは突然キャプチャを解決するよう求められる場合があります。
第二に、あなたのテスト ユーザーはロボット行為で特定され、禁止される可能性があります

---

## PlayWright仕組み

### イベント駆動型APIである

PlaywrightはwaitForRequestの他にもPage上のload、dom content、loaded、closeなどのイベントをきっかけにするwaitForEventなどのブラウザ側から起動するAPIが実装されています。これは**Playwrightがブラウザと双方向通信をしているため可能**になっています。

これらのAPIによってPlaywrightはAjax通信の終了や他のJavaScript処理の終了を確実に検知してからテストスクリプトを実行できます。 WebDriverはこういったAPIがないため、イベントの完了を検知するには画面上の変化（ボタンの状態、メッセージの表示）をポーリングすることになります。

---

## PlayWrightコード作成

これでplaywright用のブラウザを開ける。
Recordを押下後、ユーザのブラウザ操作からコードを作成できる。
`$ npx playwright open https://example/`

**おそらく、すべてのブラウザ自動化ツールに関してはそうなのでは**

## PlayWright プロジェクト作成

`$ npm init playwright`

## PlayWright特徴

1. seleniumではわからないが、ブラウザを起動し(selenium)コードを生成してくれるジェネレーターがある
2. TypeScriptでやっているが環境構築が楽
3. Test風に記載ができ、テストランナーも別パッケージで提供されているためJestを書く用にできる。

## PlayWright コマンドラインオプション

[参考URL](https://playwright.dev/docs/test-cli)

## Tips

- pageのDOMを取得したい

```ts
const ogTitle = page.$("meta[property='og:title']"); // これは廃止となった
const ogTitle = page.locator("meta[property='og:title']"); // 最新はこれを使用する
```

## XPath(XML Path Language)とは

[参考URL](https://www.octoparse.jp/blog/xpath-introduction/#I.%20XPath%E3%81%AE%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)

ツリー構造となっているXML/HTMLドキュメントからの要素や属性値などを指定するための簡潔な構文(言語)

## PlayWright 別タブ管理方法

## Playwright CI実行

[参考URL](https://zenn.dev/keita_hino/articles/d38956a2f1880e)
