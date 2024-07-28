# Serverless Components

[リファレンス](https://github.com/serverless/components)  
[Serverless Components はオレたちの未来を劇的にスケールさせるか](https://qiita.com/G-awa/items/04dec937925d2875d320)

Serverless Frameworkに新しく搭載された機能。  
Serverless Componentsは無料で使えるが、GA版に伴いserverless.comへのログインが必要になっている。

Serverless Componentsは今までのServerless Frameworkとは以下が違う。

- CloudFormationに非依存でデプロイが速い
- 自作Component（プラグイン的な）の定義が容易で、ベンダー非依存
- 新機能「dev mode」（`serverless dev` を走らせておくと自動デプロイをしてくれる機能）

## 注意

Serverless Componentsは既存の `serverless.yml` と書き方が違う。
というのも `next/serverless-component` などの用意されているコンポーネントは既存の書き方などはできない（serverless.ymlに書いてあるpluginsなど）
そのためカスタマイズできるのがyml部分の `inputs` 部分であり、そこに記載のないことはできない。

## 使えるサーバレスコンポーネント

[プロジェクトがありここにまとめられている](https://github.com/serverless-components)

## Serverless Components を使った少しだけ実践的なアプリケーションの作り方

[Serverless Components を使った少しだけ実践的なアプリケーションの作り方](https://yamitzky.hatenablog.com/entry/2020/08/10/180957)
