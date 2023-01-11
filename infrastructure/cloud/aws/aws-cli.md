# CLI

[[初心者向けTips]AWS CLI認証情報ファイルに最低限設定しておく項目](https://dev.classmethod.jp/articles/20200415-awscli-credential-files/)
[AWS CLIでMFA認証を行ってコマンドを実行できるようにする](https://zenn.dev/kkenjii/articles/try-aws-cli-mfa) 

## aws-cliを使う前の準備

aws-cliをインストールしてクレデンシャルを設定しておく必要がある。
AWSのクレデンシャルを登録するために、アクセスキー/シークレットキーを取得する必要。

[リフェレンス](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds)

以下コマンドでアクセスキー、シークレットアクセスキー、リージョン、フォーマットを登録する。

`$ aws configure`


## aws-cli 環境変数
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
