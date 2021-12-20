# security

## WAF(Web Application Firewall)

[参考URL](https://www.infraexpert.com/study/security17.html)
[参考URL](https://dev.classmethod.jp/articles/fully-understood-aws-waf-v2/)

従来のファイアウォールやIDS/IPSでは防ぐことができない不正な攻撃からWebアプリケーションを防御するファイアウォールのこと。
Webアプリケーションという観点から一般的にはWAFといえばWebサーバが利用するポート80番・443番のトラフィックを双方向で監視して悪意あるユーザからWebアプリケーションとその背後にあるデータを守る製品のこと。

※一般的なWebアプリケーションに対する攻撃手段としてSQLインジェクションやXSS(クロスサイトスクリプティング)などの脅威から保護する。

![WAF](images/waf.png)