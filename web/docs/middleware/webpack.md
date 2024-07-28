# webpack

[webpackについて](https://ics.media/entry/12140/)
[webpack 基本プロパティ一覧](https://www.webdesignleaves.com/pr/jquery/webpack_basic_01.html)

---

## webpack概要

>webpack(ウェブパック)とはJSファイルをまとめる高機能なモジュールバンドラー
>まとめることでウェブページのHTTPリクエストの数を減らしたり、高度なウェブアプリケーションの開発に役立ちます。

**※webpack4まではweb, nodeで仕様が進められていたがwebpack5からは完全にwebよりとなった。**

## Webpack実行環境

nodeで実行されるためrequireが使える

## webpackで実現できること

- 転送の最適化
まず、HTTP/1.1接続ではブラウザとウェブサーバの同時接続数が限られるため複数のファイルの転送に時間がかかる。
そのため解決策としては複数のJSファイルを1つにまとめてしまうことが一般的な解決案として知られている

- モジュールが使える
複数のJSファイルを1つにまとめるだけなら他のツールでもできますが、webpackの場合は標準仕様のES Modulesが使えたり、node_modulesのモジュールを結合できるといったメリットがあります。

  - 標準のES Modulesを使うと変数の競合やグローバル汚染を防げるので開発時の安全性が高まります。さらには、コードの可読性が上がり、開発作業の分担やテストがしやすくなり、再利用性や保守性があがります。

- JSだけではなくCSSや画像もバンドルできる
それだけでも便利なのですが、webpackはJavaScriptだけでなくスタイルシートや画像までもバンドルできてしまうのです。先述の転送の最適化につながるメリットです。

- 今の時代はモジュール方式でJavaScriptを書くのが当たり前
1つのJavaScriptファイルに長い処理を書くと、可読性が悪くなります。これを解決するには複数ファイルへ分割することでしょう。ウェブのフロントエンド界隈では、機能ごとに分割されたJavaScriptファイルのことを一般的に**モジュール**と呼ぶ。
※JavaScriptをモジュールで書くにはお作法があり、2020年現在は標準仕様のECMAScript Modules（略してES Modules、もしくはESM）で書くのが一般的

## webpack mode

>webpackの仕様として、mode値がdevelopmentであってもCSSのソースマップは自動的に有効にはなりません。逆に、mode値がproductionであってもCSSのソースマップは自動的に無効にはなりません。そのため、ソースマップの有効無効は自前の変数で管理しています。

## JavaScript以外のファイルを扱う

>webpackでは、JavaScriptだけではなくスタイルシート、画像、ウェブフォント等あらゆるリソースをモジュールとして取り扱えます。JavaScriptファイル以外のファイルを扱うには、webpackの**Loaders**機能を用います。

## CSS

CSSのバンドルには**style-loader**と**css-loader**が必要
※webpack.config.jsのuseの部分を以下の画像通りに順番にsetしないといけないのが注意。

## webpackとbabelの関連性

[参考URL](https://ics.media/entry/16028/#webpack-babel-esnext)

webpackはあくまでも依存関係を処理しひとつのJSファイルにまとめる。
babelはECMAScriptの構文を下位のECMAScriptに変換する

※ts-loaderを使用するのであれば無理にbabelを使用する必要はない。

## Webpack5でのerror

[参考URL](https://madogiwa0124.hatenablog.com/entry/2021/02/13/120741)

1. webpack5からNode.js関連のpolyfillがinstallされなくなり、以下のようなエラーが発生する

querystring,processといったNode.js由来のmoduleの解決ができなくなっている。
そのため以下の通り"querystring-es3",processをinstallして

yarn add querystring-es3 process

もともとのquerystring、processで参照出来るようにwebpack.config.jsでaliasを定義する

```js
resolve: {
  alias: {
    querystring: "querystring-es3",
    process: "process/browser",
  },
},
```

---

## 注意

webpack5からはnodeのPolyfill(ポリフィル)が含まれなくなった。
つまりnodeのモジュールがない。**webpackは今後Web使用(ブラウザ使用)に向かっているとのこと。**
nodeを使用したい場合はwebpack5以前のnode用のpolyfillを追加しないといけない

- targetに関して
nodeに向けて
`target: ['node', 'es5']`
webに向けて
`target: ['web', 'es5'],`
混合は絶対ない(errorが出る)
`target: ['web', 'node' 'es5'],`

[リファレンスサイト(nodeについて)](https://webpack.js.org/configuration/resolve/#resolvefallback)

### node対応(webpackl5)

webpack4に入っていたnode module一式install
[git リポジトリ](https://github.com/webpack/node-libs-browser/blob/master/package.json)
[参考ブログ](https://blog.hiroppy.me/entry/webpack5)
↓node-libs-browser

```json
  "dependencies": {
    "assert": "^1.1.1",
    "browserify-zlib": "^0.2.0",
    "buffer": "^4.3.0",
    "console-browserify": "^1.1.0",
    "constants-browserify": "^1.0.0",
    "crypto-browserify": "^3.11.0",
    "domain-browser": "^1.1.1",
    "events": "^3.0.0",
    "https-browserify": "^1.0.0",
    "os-browserify": "^0.3.0",
    "path-browserify": "0.0.1",
    "process": "^0.11.10",
    "punycode": "^1.2.4",
    "querystring-es3": "^0.2.0",
    "readable-stream": "^2.3.3",
    "stream-browserify": "^2.0.1",
    "stream-http": "^2.7.2",
    "string_decoder": "^1.0.0",
    "timers-browserify": "^2.0.4",
    "tty-browserify": "0.0.0",
    "url": "^0.11.0",
    "util": "^0.11.0",
    "vm-bro
```

webpack.config.jsに以下を追加する
```js
 resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      console: require.resolve('console-browserify'),
      constants: require.resolve('constants-browserify'),
      crypto: require.resolve('crypto-browserify'),
      domain: require.resolve('domain-browser'),
      events: require.resolve('events'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      punycode: require.resolve('punycode'),
      process: require.resolve('process/browser'),
      querystring: require.resolve('querystring-es3'),
      stream: require.resolve('stream-browserify'),
      string_decoder: require.resolve('string_decoder'),
      sys: require.resolve('util'),
      timers: require.resolve('timers-browserify'),
      tty: require.resolve('tty-browserify'),
      url: require.resolve('url'),
      util: require.resolve('util'),
      vm: require.resolve('vm-browserify'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
  target: ['node', 'es5'],

```


