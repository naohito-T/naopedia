# AWS IAM

[初心者にも分かりやすいIAM入門～ロールとグループとポリシーの違い,設計・設定手順について～](https://milestone-of-se.nesuke.com/sv-advanced/aws/iam-policy-role-group/#toc3)  
[AWSセキュリティのベストプラクティス（reference）](https://blog.usize-tech.com/contents/uploads/2022/01/AWS_Security_Best_Practices.pdf)  
[iamベストプラティクス](https://qiita.com/c60evaporator/items/0121399880625cc1de51)  
[AWSにおけるクレデンシャル](https://dev.classmethod.jp/articles/iam-bestpractice-1/)  

## 参考

[多分普通に作る流れのやつ](https://dev.classmethod.jp/articles/create-iam-users-login-profiles-that-can-only-manipulate-data-in-specific-dynamodb-tables/)

## AWSアカウント整理

[![Image from Gyazo](https://i.gyazo.com/8342b4e4d930c6adfaab794a37b7f078.png)](https://gyazo.com/8342b4e4d930c6adfaab794a37b7f078)

- AWSでアカウントを作る（ルートユーザー）
- ルートユーザーでIAMユーザーを作成する（admin権限で）
- admin権限で操作を今後する。人によってIAMユーザーを作ってあげる
- サービスごとのロールをアタッチする。

## IAMとは

[IAMユーザーを作ってみよう](https://www.idaten.ne.jp/portal/page/out/secolumn/multicloud/column005.html)

「Identity and Access Management」の略。  
公式ドキュメントによると、IAMは「誰」が「どのAWSのサービスやリソース」に「どのような条件」でアクセスできるかを指定できるサービス  
アカウント番号（ルートユーザー）に対して複数ユーザーを作成可能。  
利用者ごとに作成する。  
1ユーザーを複数共有すると誰が何の操作をしたのか追跡ができなくなる。  
※ユーザ名は、ログインユーザの名前やメールアドレスを利用すると分かりやすい

## ルートユーザー

ルートユーザーを使用しないことです。  
代わりに、最初のIAMユーザーを作成するためにのみ、ルートユーザーを使用するのがベストプラクティス。

AWSを使い始める際、サインアップの時にメールアドレスとパスワードを登録したと思います。これがAWSアカウントのパスワード  
AWSアカウントというのは**権限制御ができない。**  
言い換えれば、常にそのアカウント内のリソースに対する全権を持つ。  
つまり、AWSアカウントとしてAWSにログインするのは危険。

## IAMユーザー

**IAMユーザのパスワード**  
また、IAMのManagement Consoleにおいてユーザを作成した場合、そこで設定したパスワードがIAMユーザのパスワード  
これに対して、IAMユーザは設定により権限を制御可能。  
たとえ管理作業を行う場合でも、別にIAMユーザを作成し、そのIAMユーザに管理権限を与えて、普段はIAMユーザを利用すべき。

**IAMユーザのAPIキー**
IAMのManagement Consoleにおいてユーザを作成した場合、そこで生成したアクセスキーが「IAMユーザのAPIキー」
そしてAWSのAPI操作のために必要なアクセスキーとシークレットキーをクレデンシャル情報と呼ぶ。

## IAMロール

人やAWSサービス・アプリケーションが利用できる認証サービス。  
IAMユーザと違って利用する際は、ID・パスワードやアクセスキーID・シークレットアクセスキーを**ユーザが管理する必要なくなる為**、安全に利用できるサービス。  
LambdaやCloudformationを利用する際は必須の知識になりますので、ぜひ押さえておきましょう。

## IAMグループ

IAMユーザを10も20も作る際に、同じ権限を一ユーザずつ付与するのはめんどくさい。そんな時に便利なのがIAMグループです。あらかじめ、IAMグループに権限を付与しておくことで、そのグループに所属したIAMユーザは皆同様権限でAWSを利用できます。
なお、IAMユーザは複数のグループに所属できます。（最大10グループ）

## IAMポリシー

ロールおよびIAMユーザーに色々アタッチしていくのはポリシーのこと。  
IAMポリシーとは  

- どのAWSサービスの
- どのリソースに対して
- どんな操作を
- 許可するか（許可しないか）
を権限とし、利用者（IAMユーザーなど）に対して設定できる定義をIAMポリシーと呼ぶ  
※よくあるパターンのIAMポリシーは事前にAWSで用意されている。

### ポリシーを自身で作りたい場合

[[初心者向け] IAMカスタムポリシーを最初から作る方法の一つ](https://dev.classmethod.jp/articles/how2make-custompolicy/)

1. まず、類似したポリシーのサンプルが公式ドキュメントにないか検索する

手動で作る場合は、JSONで記述するのが一般的

## ロール

デフォルトで用意されているロールがあるがそれは基本使わない。  
自分達でロールは作成する  

## PassRole

[IAM ロールの PassRole と AssumeRole をもう二度と忘れないために絵を描いてみた](https://dev.classmethod.jp/articles/iam-role-passrole-assumerole/)

## AssumeRole

IAMユーザを作成してCredentialを発行しなくても、一時的にAWSリソースへのアクセス権限を得る事が可能な仕組み（sudoみたいな）  
EC2などにIAMロールをアサインした際にも内部で同一の処理が発生している

## クレデンシャル

[AWSにおけるクレデンシャル](https://dev.classmethod.jp/articles/iam-bestpractice-1/)

まず、AWSにおけるクレデンシャルは大きく2種類に分かれる。

- Sign-In Credential：Management Consoleログインのためのクレデンシャル（要するにパスワード）
- Access Credentials：APIアクセスのためのクレデンシャル（要するにAPIキー）

## プリンシパル

（ログインする主体、ユーザ名等）のこと。も大きく2種類ある。

## AWSに必要なこと

これらの組み合わせとして「AWSアカウントのパスワード」「AWSアカウントのAPIキー」「IAMユーザのパスワード」「IAMユーザのAPIキー」という4つのクレデンシャルがあることになります。
