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

上記のスクリプトがあるとする。
ここで`npm run build`をすると以下のものが自動的にトリガされる。

1. prebuildが呼び出され、rimrafツールを実行し、distフォルダを削除
2. buildが実行され、TypeScriptコンパイラが実行される
3. postbuildが呼び出され、npm run testが実行される
4. testが実行され、jest test runnerが実行される

これが機能するのはnpmがスクリプトに同じ形式で名前が付けられていて、`pre`または`post`が前についた同じ名前の他のスクリプトがないかを自動で検索する。
※これはスクリプトを複雑にすることなくコマンドを繋げる便利な方法。

## package.jsonにある未使用のライブラリを確認する方法

[参考URL](https://yukimasablog.com/check-for-unused-package)
