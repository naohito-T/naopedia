# PlayWright

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