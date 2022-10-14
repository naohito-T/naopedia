# serverless-framework


## プラグインのインストール
[リフェレンス](https://www.serverless.com/framework/docs/guides/plugins)

プラグインはサービスごとにインストールされる。
それらは**グローバルには適用されない。**

サービスディレクトリで以下コマンド（serverless.ymlにもpluginが追記される）
`$ serverless plugin install -n custom-serverless-plugin`



## serverless.yml

トップに関してはセクションという。

### プラグインセクション

プラグインを定義する順序が重要であることに注意してください。サーバーレスはすべてのコア プラグインをロードし、次にカスタム プラグインを定義した順序でロードします。

### customセクション

プラグインの追加構成を追加できる場所。