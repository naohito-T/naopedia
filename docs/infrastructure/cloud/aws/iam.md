# iam
[iamベストプラティクス](https://qiita.com/c60evaporator/items/0121399880625cc1de51)
[AWSにおけるクレデンシャル](https://dev.classmethod.jp/articles/iam-bestpractice-1/)

## IAM ロールの PassRole と AssumeRole をもう二度と忘れないために絵を描いてみた
[IAM ロールの PassRole と AssumeRole をもう二度と忘れないために絵を描いてみた](https://dev.classmethod.jp/articles/iam-role-passrole-assumerole/)

## PassRole

## AssumeRole

IAMユーザを作成してCredentialを発行しなくても、一時的にAWSリソースへのアクセス権限を得る事が可能な仕組みです。 EC2などにIAMロールをアサインした際にも内部で同一の処理が発生しています


## クレデンシャル
[参考URL]([AWSにおけるクレデンシャル](https://dev.classmethod.jp/articles/iam-bestpractice-1/))


まず、AWSにおけるクレデンシャルは大きく2種類に分かれる。

- Sign-In Credential：Management Consoleログインのためのクレデンシャル（要するにパスワード）
- Access Credentials：APIアクセスのためのクレデンシャル（要するにAPIキー）

## プリンシパル

（ログインする主体、ユーザ名等）のこと。も大きく2種類ある。

## AWSに必要なこと

これらの組み合わせとして「AWSアカウントのパスワード」「AWSアカウントのAPIキー」「IAMユーザのパスワード」「IAMユーザのAPIキー」という4つのクレデンシャルがあることになります。

## AWS使い始め

**AWSアカウントのパスワード**
AWSを使い始める際、サインアップの時にメールアドレスとパスワードを登録したと思います。これが「AWSアカウントのパスワード」です。
AWSアカウントというのは**権限制御ができない。**
言い換えれば、常にそのアカウント内のリソースに対する全権を持ちます。つまり、AWSアカウントとしてAWSにログインするのは危険と考えるべきです。

**IAMユーザのパスワード**
また、IAMのManagement Consoleにおいてユーザを作成した場合、そこで設定したパスワードが「IAMユーザのパスワード」
これに対して、IAMユーザは設定により権限を制御可能です。たとえ管理作業を行う場合でも、別にIAMユーザを作成し、そのIAMユーザに管理権限を与えて、普段はIAMユーザを利用すべきです。

**IAMユーザのAPIキー**
IAMのManagement Consoleにおいてユーザを作成した場合、そこで生成したアクセスキーが「IAMユーザのAPIキー」
そしてAWSのAPI操作のために必要なアクセスキーとシークレットキーをクレデンシャル情報と呼ぶ。




