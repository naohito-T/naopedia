# esbuild

[リファレンス](https://esbuild.github.io/getting-started/#deno)
[参考URL](https://qiita.com/hedrall/items/2548718cfdf7bef3efc0)

buildツールでぐいぐいきてるやつ
webpackなどに変わるフロントエンドのコード変換+バンドルツールで、なんとwebpackと比較して10-100倍速度が早いそうです。

## esbuild configファイルは？

[オプション一覧](https://aloerina01.github.io/blog/2021-09-15-1#esbuild-%E3%81%A8%E3%81%AF)
configファイルなしで実行できるので、npm installして即利用できます。基本的なオプションも揃っています。

## esbuild tsconfigの解釈

tsconfigの解釈
TS, TSXをビルドするときはtsconfigの設定を読み取る
tsconfigの特定フィールドのみ参照される、詳細は公式にて

## esbuildできないこと

パフォーマンス優先のためできるだけシンプルな機能群に絞っている。

以下は対応できない。

- 型チェックはしない
- es5への変換
- CSS Modules
- Code Splittingとimport() によるlazy loading
- next.jsでの利用
- ポストCSSの利用
- HMR（ホットモジュール）→あまり開発が盛んではない。
- 型定義ファイルの出力

## 型定義ファイルを出力する

型ファイルを出力する
esbuildでは型定義ファイルは出力されません。
型定義ファイルはtscコマンドで作成します。
--declarationと--emitDeclarationOnlyのオプションを渡すことで型定義ファイルのみを出力できます。

```json
package.json
 {
   "scripts": {
     "build:esbuild": "ts-node build.ts"
     "build:esbuild": "ts-node build.ts",
     "build:types": "tsc --declaration --emitDeclarationOnly --declarationDir './dist'",
   }
 }
```

## Base Pathの変更

自動的にパスを解釈してくれる様です。webpackだと、resolve.aliasを調整しないといけなかったりするので便利ですね。

## 周辺ツール

### esbuild-register

`ts` ファイルを直接実行したい場合に使用する。
従来であれば `ts-node` を利用することが多いが、esbuild-registerを利用すると、高速にTSファイルを実行することが可能。
