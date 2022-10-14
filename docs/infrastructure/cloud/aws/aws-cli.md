# CLI

[[初心者向けTips]AWS CLI認証情報ファイルに最低限設定しておく項目](https://dev.classmethod.jp/articles/20200415-awscli-credential-files/)
[AWS CLIでMFA認証を行ってコマンドを実行できるようにする](https://zenn.dev/kkenjii/articles/try-aws-cli-mfa) 

## aws-cliを使う前の準備

aws-cliをインストールしてクレデンシャルを設定しておく必要がある。
AWSのクレデンシャルを登録するために、アクセスキー/シークレットキーを取得する必要。

[リフェレンス](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds)

以下コマンドでアクセスキー、シークレットアクセスキー、リージョン、フォーマットを登録する。

`$ aws configure`

