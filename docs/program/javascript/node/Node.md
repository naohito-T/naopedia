# node

TypeScriptのコードを実行する
TypeScript → JavaScriptに変換してからnodeでの実行
**ts-nodeだと1ステップでTypeScriptのコードを実行できる**

通常、TypeScriptで書かれたNode.jsプロジェクトは、tscでtranspileをし、生成されたJavaScriptファイルを実行する必要がある。ts-nodeを使うことでこのステップを省略する。

## path取得

[参考URL](https://zenn.dev/ignorant_kenji/articles/25280934f2c50b0c13ff)

以下を実行すればわかる
```js
console.log(process.argv[1], "c.js", "cwd", process.cwd());
console.log(process.argv[1], "c.js", "__dirname", __dirname);
console.log(process.argv[1], "c.js", "path.resolve", require("path").resolve(""));
```


## npm自体のアップデート

[参考URL](https://qiita.com/n0bisuke/items/b2704b6ebb84f21c03c1)

## npmとyarnとpnpm

[参考URL](https://zenn.dev/hibikine/articles/27621a7f95e761#discuss)

## Node jsとは

## package.json


- npm script

`$ npm run`で実行できるエイリアスコマンド
`$ npm run`で実行するとローカルnode_moduleにインストールしたpackageのコマンドを実行できる。


- 優先度

package.jsonが一番優先度が高いのは当たり前
.prettierrc(拡張子無し)などは次に優先度が高くなる。つまり、package.jsonにpretterの設定を書けば一番優先度が高くなる

- vscode連携との罠

VSCodeのPrettier拡張機能にはPrettier本体がバンドル(含まれて)いる
つまり、Prettier拡張機能さえインストールしていれば、VSCodeではPrettierが使えるということ
VScodeの設定 (settings.json) に Prettier の細かい設定があるのも、そこで設定された内容で Prettier のフォーマットを実行するため。

>えー、じゃあ別に Prettier 本体をインストールする必要は無いし、設定ファイル (.prettierrc) も作らなくていいんじゃないの？と思ってしまいそうですが、 Prettier 拡張機能の公式ドキュメントにはプロジェクトのローカルにインストールされている Prettier と設定ファイルを使用することを推奨する旨がしっかり記載されています。
>当然といえば当然ですが、チームで開発する場合はパッケージのバージョンや設定を揃えないといけないですし、そもそも VSCode 以外のエディタを使っている人もいるかもしれないので、設定の統一が難しくなってしまいます。
>Prettier 拡張機能にバンドルされている Prettier や VSCode の設定は、あくまでもフォールバック的な位置付けで、優先される設定もローカルの Prettier 設定ファイル (.prettierrc) が上位になっています。


## npm 固定

nodeとnpmは違うからね

[npm固定](https://qiita.com/hirorock/items/3a98a43f38aec39aab4f)

プロジェクト内に.npmrcを作成する
作成することで`npm install`の際にengineを確認してバージョンバージョンの問題があった場合はインストールさせない

## Browserslistの更新を要求された場合

[参考URL](https://dev.classmethod.jp/articles/asked-to-update-the-browserslist-when-building-react-app/)

## npxコマンドについて

`$ npx create-nx-workspace`
Nxは、ファーストクラスのモノレポサポートと強力な統合を備えた次世代ビルドシステム

[リファレンス](https://www.npmjs.com/package/create-nx-workspace)