# Amazon ECR (Elastic Container Registry)

コンテナイメージのリポジトリで、各サーバーが実行時に必要なimageをECRに取りに行く

## リポジトリの特徴

- セキュア: ECRはプライベートレジストリを提供し、アクセスコントロールをIAMポリシーを使って設定ができる
- 完全統合: ECRはAmazon ECSとSeamlessに統合されており、コンテナイメージのデプロイを簡単に行えます。
- スケーラブル: 大量のコンテナデプロイに対応できるように設計されています。

## 使い方

1. 通常、開発者はDockerイメージをローカルでビルドし、そのイメージをECRにプッシュする
2. その後、ECSタスク定義でそのECRリポジトリからDockerイメージを指定して、ECSでコンテナーを実行します。

これらのサービスは、コンテナー化されたアプリケーションをAWS上で効果的に管理するのに非常に役立つツールとなっています。

## 本来のdeploy方法

色々便利ツールから入っているため本来の処理をまとめる

AWS CLIを使用してECSでアプリケーションをデプロイする基本的な手順は以下の通りです：

1. **Dockerイメージの作成**: 最初に、アプリケーションのDockerイメージを作成します。Dockerfileを使用してアプリケーションをコンテナー化します。
2. **DockerイメージのECRへのプッシュ**: 作成したDockerイメージをAmazon Elastic Container Registry (ECR)にプッシュします。

```sh
aws ecr get-login-password --region region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.region.amazonaws.com
docker build -t your-app .
docker tag your-app:latest your-account-id.dkr.ecr.region.amazonaws.com/your-app:latest
docker push your-account-id.dkr.ecr.region.amazonaws.com/your-app:latest
```

3. **タスク定義の作成**: ECSタスク定義を作成します。タスク定義はJSON形式のファイルで、タスクの各コンテナーのプロパティを定義します。

```sh
{
   "family": "your-app",
   "containerDefinitions": [
    {
        "name": "your-app",
        "image": "your-account-id.dkr.ecr.region.amazonaws.com/your-app:latest",
        "memory": 512,
        "cpu": 256,
        "essential": true,
        "portMappings": [
    {
        "containerPort": 80,
        "hostPort": 80
    }
   ]
    }
   ]
}
```

このJSONファイルを `task-definition.json` として保存し、以下のコマンドでタスク定義を登録します。

```sh
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

4. **ECSクラスターの作成**: 次に、ECSクラスターを作成します。

   ```
   aws ecs create-cluster --cluster-name your-app-cluster
   ```

5. **ECSサービスの作成**: クラスター内でサービスを作成してタスクを実行します。

```sh
aws ecs create-service --cluster your-app-cluster --service-name your-app-service --task-definition your-app --desired-count 1 --launch-type "EC2" --scheduling-strategy "REPLICA" --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:region:account-id:targetgroup/target-group-name/load-balancer-id,containerName=your-app,containerPort=80" --role ecsServiceRole
```

6. **サービスの更新**: アプリケーションを更新する場合は、新しいDockerイメージをECRにプッシュし、タスク定義を更新してサービスを更新します。

```sh
aws ecs update-service --cluster your-app-cluster --service your-app-service --task-definition new-task-definition
```

注意: これらのコマンドは基本的な例を示しており、実際にはさまざまなオプションや設定が必要になります。また、これらのコマンドを実行する前に、適切なIAMロールやセキュリティグループ、VPC、サブネットなど、必要なAWSリソースがすでにセットアップされていることを確認する必要がある。
