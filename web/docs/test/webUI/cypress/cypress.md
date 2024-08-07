# Cypress(サイプレス)

>長い間、Web UI の自動テストツールといえば Selenium だったのですが、最近は Selenium 以外にも優れたツールが増えてきています。大部分が有料ツールなので、なかなか紹介しづらいのですが、「Cypress(サイプレス)」はオープンソースで無料で使えるだけではなく、かなり使い勝手のよく仕上がっている
RSpecと同じ形式なので、RSpecやそれから派生したテストフレームワークを普段から触っている人は、馴染める。

## Cypress導入経緯

元々はVue Test Utilsなどを用いてインテグレーションテストを行っていました。しかし、Nuxt固有の処理やVuex State、ブラウザ固有の処理のモックなど、テストのための設定が多くなってしまっていまいテスト運用に難がありました。代わりにCypressを用いる方針に現在はシフトしています。Cypressの機能でAPIレスポンスだけモックし、それ以外はリアルなアプリケーションを実際のブラウザ上でテストできます。

Cypressはテストの実行中にアプリケーションで実行されているプロセスの詳細をリアルタイムにGUIで表示してくれます。新しいメンバーにとって、コードがどのように動作するかを理解しやすく、その結果オンボーディングプロセスを迅速に進めることができます。また、 GUIはデバッグにも役立ちます。

## 使用方法

Cypressはプロジェクト単位でインストールすることが推奨されている。

>Cypressの操作方法は基本的には他のスクレイピングツールと変わらない。

- 基本操作
WebのUI要素を検索する。
検索した要素に対して操作を実行する。

## SeleniumとCypressの違い

>Cypress は一発でインストールが完了するので、とても楽です。
>Selenium はテストフレームワークやドライバの設定などなど行わなければならないため、結構骨が折れます。

Seleniumはマルチブラウザ対応していますが、
Cypressは残念ながら**Google Chrome**にしか対応していない。
でも良いじゃない速いんだから。

Seleniumは様々な言語でテストスクリプトを書けますが、
CypressはJavaScriptしか使えません。
でも良いじゃない速いんだから。
(フロントエンド開発に特化させるためJavaScriptを選択しているっぽい)

## テスト備忘録(Cypressでできること)

テストスクリプトのステップごとのスナップショット機能
スクリプトを書き換える度にテストが走る機能
自動でWaitしてくれる機能
自動スクリーンショット、動画撮影機能
スタブ、タイマー機能等など
単体テストからE2Eテストまで広く使える
テスト構築、実行、バグ検知まですべて行える
コマンドごとに画面のスナップショットを見返せる
テスト一連の様子をビデオとして保存できる
各種CIとの連携が可能である

## Cypressの基本的な使い方

[Cypressの基本的な使い方](https://future-architect.github.io/articles/20210428a/)

Cypressではspecファイルにテストを記述していく。

```js
context('カテゴリ名', () => {
  it('シナリオ名1', () => {
    Cypressコマンドによる処理入力
             ┋
  })
  it('シナリオ名2', () => {
    Cypressコマンドによる処理入力
             ┋
  })
             ┋
})
```

## cypress React for Typescript 設定

[参考URL](https://www.gixo.jp/blog/16086/)
