# AWS CLI
[[初心者向けTips]AWS CLI認証情報ファイルに最低限設定しておく項目](https://dev.classmethod.jp/articles/20200415-awscli-credential-files/)  
[AWS CLIでMFA認証を行ってコマンドを実行できるようにする](https://zenn.dev/kkenjii/articles/try-aws-cli-mfa) 

AWSコマンドラインインターフェイス (AWS CLI) は、AWSのサービスを管理するための統合ツール。  
ダウンロードおよび設定用の単一のツールのみを使用して、コマンドラインからAWSの複数のサービスを制御し、スクリプトを使用してこれらを自動化することができる。

### AWS CLI優先順位
[参考URL](https://dev.classmethod.jp/articles/aws-cli-configuration-file-env-option/)

`~/.aws/config`の設定内容は環境変数やコマンドラインオプションによって上書きされる。

優先順位は以下

1. コマンドラインオプション
2. 環境変数
3. AWS CLIコンフィグファイル

## aws-cliで使用できるサンプルenv
[リファレンス](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-envvars.html)

```sh
# 以下の値はサンプル
export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
export AWS_DEFAULT_REGION=us-west-2
```

## aws-cli keyをGitHubに流出させない
[参考URL｀](https://kakakakakku.hatenablog.com/entry/2017/02/06/100706)

## aws-cliを使う前の準備
[リフェレンス](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds)

aws-cliをインストールしてクレデンシャルを設定しておく必要がある。  
AWSのクレデンシャルを登録するために、アクセスキー/シークレットキーを取得する必要。

以下コマンドでアクセスキー、シークレットアクセスキー、リージョン、フォーマットを登録する。

`$ aws configure`


## aws-cliが参照する環境変数
[参考URL](https://qiita.com/notakaos/items/4a7774ee6e1d11bb55d2)

```sh
export AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxx     # アクセスキー
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxx  # シークレットアクセスキー
export AWS_SESSION_TOKEN=xxxxxxxxxxxxxxxxxxx  # セッショントークン
export AWS_DEFAULT_REGION=ap-northeast-1      # デフォルトリージョン
export AWS_DEFAULT_OUTPUT=json                # 出力形式 (json|text|table)
export AWS_PROFILE=default                    # プロファイル名
export AWS_CONFIG_FILE=~/.aws/config          # コンフィグファイルパス
export AWS_SHARED_CREDENTIALS_FILE=~/.aws/credentials # クレデンシャルファイルパス
export AWS_CA_BUNDLE=<AWS_CA_BUNDLE_PATH>     # 証明書バンドルへのパス
```

## 現在認証されているIAMユーザー・ロール・サービスについて出力する

`$ aws sts get-caller-identity`

`aws sts get-caller-identity` はAWS CLI (Command Line Interface) を使用してAWS STS (Security Token Service) の `get-caller-identity` コマンドを実行するもの

このコマンドは、AWSアカウントに対して現在認証されているIAMユーザー、ロール、またはサービスが誰であるかを取得します。つまり、誰がこのAWS CLIコマンドを実行しているかを特定するためのコマンドです。

AWS STS (Security Token Service) は、AWSの一時的なセキュリティ認証情報を提供するサービスであり、IAMユーザー、ロール、または外部アカウントに対してアクセス許可を付与します。`get-caller-identity` コマンドは、この一時的なセキュリティ認証情報の発行元としての認証情報を取得するために使用されます。

したがって、このコマンドを実行すると、AWS CLIを使用して現在のセッションに対して発行されている認証情報を取得し、それに関連するアカウント情報を表示します。これにより、認証されたアカウントやロールを確認することができる。

