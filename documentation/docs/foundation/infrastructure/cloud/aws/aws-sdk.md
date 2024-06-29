# AWS SDK

最新のv3は操作するサービスごとに個別にパッケージをインストールできる（firebaseみたいな）

## S3 v3
[S3 v3操作](https://qiita.com/taisuke101700/items/d7efaca27b33adf29833)

## CDK仕組み

CDKはスタック間に依存関係がある場合、依存関係の親スタックからdeployする

## スタック設計

AWS CDKには複数のスタック設計がある。  

- 単一のスタックIDを持つ大規模なスタック
- 複数のスタックIDを持つ小規模なスタック

### 単一のスタックIDを持つ大規模なスタック

```ts
export class NidInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // 他のリソース...
  }
}
```

利点:  
リソース管理が簡単で、単一のスタックですべてのリソースを管理できる。

欠点:  
スタックが大きくなりすぎるとデプロイ時間が長くなり、エラーのトラブルシューティングが困難になる。

### 複数のスタックIDを持つ小規模なスタック
[CDKで複数スタックの並行デプロイを行ってみた](https://dev.classmethod.jp/articles/cdk-concurrency-deployment/)

- concurrencyオプションで複数スタックの並行デプロイができる
- 並行デプロイ数は指定が可能
- スタック間に依存関係がある場合は自動的に解決される


### スタックを分ける基準
[スタックの分け方について](https://tmokmss.hatenablog.com/entry/20221121/1669032738)

CloudFormationの制約に引っかかる時に分けたほうがいいらしい  
[![Image from Gyazo](https://i.gyazo.com/a76f6c8980d0a063b368c6d048860bfc.png)](https://gyazo.com/a76f6c8980d0a063b368c6d048860bfc)


