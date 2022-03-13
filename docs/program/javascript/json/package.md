# package.json 覚書

## npmのprivate registry

会社など、プライベートな空間がある場合に、Node.jsパッケージ管理に npm private registryという手法がある。
→npmのregistryにprivateでパッケージをpublishする形式

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

ここで`npm run build`をすると以下のものが自動的にトリガされる。
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

[参考URL](https://maku77.github.io/nodejs/npm/npm-run-rimraf.html)

なぜ rimraf が必要か？
TypeScript などのトランスパイラを使って Node.js アプリを開発していると、ビルド結果を格納するディレクトリを削除する clean コマンド（NPM スクリプト）を定義したくなります。

```json
{
  "scripts": {
    "clean": "rm -rf build"
  }
}
```

これはこれで間違いではないのですが、Linux の rm コマンドを使用しているので、OS 依存の package.json になってしまいます。

そこで、OS に依存しない rm -rf コマンドを実現するのが rimraf という NPM パッケージです。 rimraf は NPM の作者である Isaac 氏が作成しており、安心して使用できます。 rimraf という名前は Linux コマンドの rm -rf の発音が由来だと言われています。

## npm ci

[参考URL](https://qiita.com/mstssk/items/8759c71f328cab802670)

npm ciを実行すると**常にpackage-lock.jsonから依存関係をインストールする**
既に node_modules フォルダの中身があっても一旦削除します。

**従来のnpm installとの相関は？**
従来の npm install コマンドを実行すると、 package.json と package-lock.json の両方を見て依存関係の解決と依存パッケージの node_modules へのインストールを行います。 package.json を解決して必要に応じてロックファイルである package-lock.json の更新もします。
