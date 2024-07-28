# node

[公式リファレンス](https://nodejs.org/api/documentation.html)

## TypeScriptのコードを実行する

- 通常の実行方法  
TypeScript → JavaScriptに変換してからnodeでの実行  
通常、TypeScriptで書かれたNode.jsプロジェクトは、tscでtranspileをし、生成されたJavaScriptファイルを実行する必要がある。ts-nodeを使うことでこのステップを省略する。

- ts-nodeの実行  
**ts-nodeだと1ステップでTypeScriptのコードを実行できる**

## Node.jsとは

Node.jsは `ノンブロッキングI/O` という仕組みにより、「大量の小さな通信」の処理を得意としており、チャットアプリや小規模なゲームのサーバープログラム開発言語として用いられることが増えている。  
また、クライアントサイドと同じJavaScriptでサーバーサイドのプログラムを書けるため、新たにサーバーサイド言語を覚える必要がないという利点もある。

## Node.jsのREPL環境をカスタマイズする

[参考URL](https://kazamori.jp/blogs/2021/07/20/customize-node-repl/)
[リポジトリ](https://github.com/kazamori/typeorm-performance-issues-sample)

## NODE_ENV

`NODE_ENV=production yarn install` とすればdevDependenciesがインストールされない

## node path取得

[参考URL](https://zenn.dev/ignorant_kenji/articles/25280934f2c50b0c13ff)

```js
console.log(process.argv[1], "c.js", "cwd", process.cwd());
console.log(process.argv[1], "c.js", "__dirname", __dirname);
console.log(process.argv[1], "c.js", "path.resolve", require("path").resolve(""));

// 実行結果
// ~/Hoge/foo.js/a.js   a.js   cwd            ~/Hoge/foo.js
// ~/Hoge/foo.js/a.js   a.js   __dirname      ~/Hoge/foo.js
// ~/Hoge/foo.js/a.js   a.js   path.resolve   ~/Hoge/foo.js
```

## package.jsonのライブラリupdate

[参考URL](https://qiita.com/sugurutakahashi12345/items/df736ddaf65c244e1b4f)

`$npm update`

## npm自体のアップデート

[参考URL](https://qiita.com/n0bisuke/items/b2704b6ebb84f21c03c1)

## npmとyarnとpnpm

[参考URL](https://zenn.dev/hibikine/articles/27621a7f95e761#discuss)

## npm 便利スクリプト

[参考URL](https://qiita.com/mysticatea/items/12bb6579b9155fd74586)

## npm 固定

[npm固定](https://qiita.com/hirorock/items/3a98a43f38aec39aab4f)

プロジェクト内に `.npmrc` を作成する
作成することで `npm install` の際にengineを確認してバージョンバージョンの問題があった場合はインストールさせない

## Browserslistの更新を要求された場合

[参考URL](https://dev.classmethod.jp/articles/asked-to-update-the-browserslist-when-building-react-app/)

## npxコマンドについて

[リファレンス](https://www.npmjs.com/package/create-nx-workspace)

## Node stream api

[リファレンス](https://nodejs.org/api/stream.html)
[Node.js Streamに入門してみた](https://dev.classmethod.jp/articles/node-js-stream-newbie/)

Streamのメリットは大きな容量のファイルを読み取り・書き込み・加工する際に**ちょっとずつ処理**することで最大メモリ使用量を抑えることがメリット。

## nodeのversion上げ方

[参考URL](https://zenn.dev/ymmt1089/articles/20221120_node_16to18)

nodeだけを上げたい場合

node_modulesとlockファイルを消して対象のnode versionに変更したあとinstallする

依存ライブラリも追従したい場合

yarnであれば上記対応後、yarn upgradeを実施する
