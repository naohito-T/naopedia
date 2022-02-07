# security

## WAF(Web Application Firewall)

[参考URL](https://www.infraexpert.com/study/security17.html)
[参考URL](https://dev.classmethod.jp/articles/fully-understood-aws-waf-v2/)

従来のファイアウォールやIDS/IPSでは防ぐことができない不正な攻撃からWebアプリケーションを防御するファイアウォールのこと。
Webアプリケーションという観点から一般的にはWAFといえばWebサーバが利用するポート80番・443番のトラフィックを双方向で監視して悪意あるユーザからWebアプリケーションとその背後にあるデータを守る製品のこと。

※一般的なWebアプリケーションに対する攻撃手段としてSQLインジェクションやXSS(クロスサイトスクリプティング)などの脅威から保護する。

![WAF](images/waf.png)

## ReDoS

[ReDos](https://yamory.io/blog/about-redos-attack/)

## CORS(Cross-Origin Resource Sharing) : クロスオリジンソースシェアリング

異なるオリジン間の通信を許可する仕組み
同一オリジンポリシーは、不正なやりとりを防止すると同時に**正当なやりとりも拒否する。**
その回避策として用意されているのがこのCORS。

## 符号・暗号化・ハッシュの違い

[参考URL](https://ja.spot-the-difference.info/difference-between-encryption)

**暗号化、エンコード、およびハッシュは、データのフォーマットを変換するために使用される技法**

## ハッシュ値

**ハッシュ値とは、あるデータを暗号学的ハッシュ関数と呼ばれる方式で変換したもの。**
注意
ハッシュ値から元のデータを復元することはできない。
また異なる2つのデータから作ったハッシュ値同士が同じ値になる可能性は極めてひくい

## CSRF(クロスサイトリクエストフォージェリ)

