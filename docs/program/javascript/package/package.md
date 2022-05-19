# Package

jsでのpackage管理システムからpackage.jsonまで記載する

---

## package.json 覚書

## npmのprivate registry

会社など、プライベートな空間がある場合に、Node.jsパッケージ管理にnpm private registryという手法がある。
**npmのレジストリ**にprivateでパッケージをpublishする形式

**注意**
>この移行が終わったタイミングで、GitHubがnpmを買収することが発表され、将来的にnpm private registryはGitHub Packages Registryへと統合される予定です。

[npm Docs](https://docs.npmjs.com/creating-and-publishing-private-packages)

## pre/postがついたスクリプト

[参考URL](https://www.twilio.com/blog/npm-scripts-jp)

```json
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "tsc",
    "postbuild": "npm run test",
    "test": "jest"
  }
```

ここで`npm run build`をすると以下のものが自動的にトリガーされる。
上記のスクリプトがあるとする。

1. prebuildが呼び出され、rimrafツールを実行し、distフォルダを削除
2. buildが実行され、TypeScriptコンパイラが実行される
3. postbuildが呼び出され、npm run testが実行される
4. testが実行され、jest test runnerが実行される

これが機能するのはnpmがスクリプトに同じ形式で名前が付けられていて、`pre`または`post`が前についた同じ名前の他のスクリプトがないかを自動で検索する。
※これはスクリプトを複雑にすることなくコマンドを繋げる便利な方法。

## package.jsonにある未使用のライブラリを確認する方法

[参考URL](https://yukimasablog.com/check-for-unused-package)

## npm run のスクリプトの中でディレクトリの削除を行う (rimraf)

OSに依存しない`$ rm -rf`ができる
※パッケージをインストールしなくてもデフォルトでできる。

[参考URL](https://maku77.github.io/nodejs/npm/npm-run-rimraf.html)

なぜrimrafが必要か？
TypeScriptなどのトランスパイラを使ってNode.jsアプリを開発していると、ビルド結果を格納するディレクトリを削除するcleanコマンド（NPMスクリプト）を定義したくなる時がある。

```json
{
  "scripts": {
    "clean": "rm -rf build"
  }
}
```

これはこれで間違いではないが、Linuxのrmコマンドを使用しているので、OS依存のpackage.jsonになってしまう。

そこで、OSに依存しない`rm -rf`コマンドを実現するのが`rimraf`というNPMパッケージ。rimrafはNPMの作者であるIsaac氏が作成しており、安心して使用可能。
rimrafという名前はLinuxコマンドの`rm -rf`の発音が由来だと言われている。

## npm ci

[参考URL](https://qiita.com/mstssk/items/8759c71f328cab802670)

npm ciを実行すると**常にpackage-lock.jsonから依存関係をインストールする**
すでにnode_modulesフォルダーの中身があってもいったん削除する

**従来のnpm installとの相関は？**
従来の`npm install`コマンドを実行すると、package.jsonとpackage-lock.jsonの両方を見て依存関係の解決と依存パッケージのnode_modulesへのインストールを行う。
package.jsonを解決して必要に応じてロックファイルであるpackage-lock.jsonの更新もする。

## 脆弱性テスト

[参考URL](https://kamoqq.info/post/how-to-maintenance-yarn-project/)

`yarn audit`で検出されたパッケージを更新するには`yarn upgrade`で更新します。
パッケージを指定しなければ全部更新してくれます。
package.jsonで指定されたバージョンの範囲で更新され、package.jsonは変更されません。

対話型更新
`$ yarn upgrade-interactive`

---

## version指定

[参考URL](https://qiita.com/chihiro/items/5826678bc9287fb57a28)

**指定したバージョンをインストールしたい**
→1.0.0のバージョンがインストールされる。
```json
{
  "dependencies": {
    "foo": "1.0.0"
  }
}
```

**指定したバージョンよりも大きいバージョンをインストールしたい**
→1.0.0より大きいバージョンがインストールされる
```json
{
  "dependencies": {
    "foo": ">1.0.0"
  }
}
```

## packageの静寂性対応の流れ

[参考URL](https://rinoguchi.net/2021/11/npm-version-up-and-fix-audit.html)

1. 脆弱性を含むパッケージの依存ツリーを確認
```sh
npm ls glob-parent
# or
yarn list --pattern glob-parent
```

## yarn workspace

[参考URL](https://qiita.com/suzukalight/items/0b22f11ad05308f638a6)

>デフォルトで利用できるパッケージのアーキテクチャを設定する新しい方法です。ワークスペースにより複数のパッケージを設定する際に、 yarn install を一度実行するだけで、それらの全てが単一のパスにインストールされるようになります。


1つのプロジェクトを立ち上げるとき
クライアント・サーバ・共通ロジック・Lambda・デザインシステム・LPなどのさまざまなサブプロジェクトが必要になることは多い。
これらを1つのリポジトリで扱えるようにする考え方がmonorepoであり、それを実現する手段がワークスペースとなります。

monorepo環境の管理には、現在においては**Lerna**などが方法として存在するが、ワークスペースはより低レベルでプリミティブな、内部依存関係の解決に特化した仕組みを提供してくれるもので