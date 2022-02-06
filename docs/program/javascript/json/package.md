# package.json 覚書

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
