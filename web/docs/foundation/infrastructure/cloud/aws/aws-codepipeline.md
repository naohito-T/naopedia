# AWS Code Pipeline

CI/CDパイプラインを構築するためのAWSサービス  
AWS CodePipelineを使うと、前述のAWS CodeBuildなどを柔軟に組み合わせて、必要な機能を持つCI/CDパイプラインを構築できる。

AWS CodePipelineはGitHubとの連携ができます。GitHubリポジトリの更新に応じてAWSCodePipelineのパイプラインを実行し、GitHubリポジトリからソースコードを取得できます。

## GitHub actionsとの住み分け

ソースコードとCI/CDパイプラインを同じ場所で管理したい場合はGitHub Actionsを利用するのがよい。  
一方で、ビルトインで提供されるさまざまなアクション（機能）を使ってAWSサービスと密な連携を構築したい場合は、AWSCodePipelineの利用が適している。

ただ権限管理の容易さを重視する場合は、AWS CodePipelineが有力な選択肢となるでしょう

## コンテナーシナリオでのCI/CDパイプラインの処理

[![Image from Gyazo](https://i.gyazo.com/86abd396eea18f3e64fa9bba77319263.png)](https://gyazo.com/86abd396eea18f3e64fa9bba77319263)
