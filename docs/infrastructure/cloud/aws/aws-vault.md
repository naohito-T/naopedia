# aws-vault
[aws-vaultについてのあれこれ](https://qiita.com/kangaechu/items/cb8f68e3866ee5af71c8)  
[IAM初心者がAWS CLIでスイッチロールするまで](https://dev.classmethod.jp/articles/switch-role-with-awscli/)  
[aws-vaultをLinux環境でも使う方法【セキュリティ向上】](https://hackers-high.com/aws/aws-vault-on-linux/)  
[aws-vault を使って AWS のアクセスキーを暗号化して扱おう](https://blog.microcms.io/aws-vault-introduction/)  
[aws-vaultのセッションをきる](https://www.qualimente.com/2018/10/22/how-to-use-aws-vault-to-managing-credentials-for-an-aws-account/)  

aws-vaultは**AWSのアクセスキーをOSのキーストアに保存**するライブラリ  
これによりアクセスキーを暗号化して保持することが可能。  
macOSであればKeyChain、Windowsであれば資格情報マネージャーに保存される。   
これにより**マルウェア経由でのアクセスは拒否される。**

ようは`~/.aws/credentials`に保存されていたアクセスキーとシークレットキーの平文から解放される。  

## aws-vault設定
[参考URL](https://dev.classmethod.jp/articles/cli-switch-role/)

## aws configおさらい
[参考URL](https://dev.classmethod.jp/articles/aws-cli-configuration-file-env-option/)

## aws-vault add

aws-vaultで使用するユーザを作成する。

## aws-vault exec

aws-vault execは**認証情報を含んだ環境変数を追加**し、`--`以下のコマンドを実行します。
`$ aws-vault exec private -- aws s3 ls`

## aws-vault ls

aws-vaultで登録しているプロファイルを確認できる。

## 保存したキーチェーンの中身を見る
[参考URL](https://qiita.com/minamijoyo/items/5ed3113434e51308ded1)

macOSだとキーチェーンで中身が見られる。


## aws-vaultが利用するファイル

`~/.aws/config`の編集が必要です。
aws-vaultは`~/.aws/credentials`を利用しない。

## スイッチロール先の登録


## AWSコンソールへログイン

`aws-vault login myrole1`

## aws-vaultを使いやすくする
[参考URL](https://qiita.com/kangaechu/items/cb8f68e3866ee5af71c8)