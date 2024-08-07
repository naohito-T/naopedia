# URL

URL設計についてまとめる

## www

[wwwありとwwwなしって結局どっちがいいの？](https://mtame.jp/column/www/)

固い印象を与えたいときは `www` をつける

## ブログ作成時のURL設計について

## URL複数単語の場合

[URL命名規則](https://blog.zelkova.cc/2019/06/case-of-parameters-for-web-api.html)

URLにはアンダースコアではなく、ハイフン（-）を使用する  
※URLに_（アンダースコア）を使わないのは、DNS名で使える文字に_（アンダースコア）がないため。

## URLセーフ

[参考URL](https://jp.quora.com/JWT%E3%81%AE%E3%82%88%E3%81%86%E3%81%AAURL%E3%82%BB%E3%83%BC%E3%83%95%E3%81%AA%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-URL%E3%82%BB%E3%83%BC%E3%83%95%E3%81%A3%E3%81%A6%E3%81%AA%E3%82%93%E3%81%A7%E3%81%99%E3%81%8B)

URLにとって安全ということ  
URLにおいて特別な意味のある文字が含まれる場合、それを適当にサーバに与えるとURLの意味が壊れて危険  
**例: ?や=,&など**
GETパラメーターのセパレーターとして機能します。URLセーフであると言う場合、**このようなURLにとって危険なものが含まれないと約束されています。**

予約されていない文字

`unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~"`
ALPHA:アルファベット、DIGIT:数字、そして `-._~` の4種の記号です。
これらの使用して良い文字のみで構成される文字列はURLセーフです。

## トレイリングスラッシュ(trailing slash)

URL末尾に付く（/）のこと。  
末尾スラッシュの有無で挙動に問題が発生するわけではないが、スラッシュの有無が混在したURLはSEOてに良くない。  
リダイレクトされる分の時間もかかる（微々たるものだが）

アプリケーションとしてはトレイリングスラッシュ有りか無し。v  
どちらにしてもどちらかに統一させるべき。

---

## URL取得する

1. document.referrer

[参考URL](https://developer.mozilla.org/ja/docs/Web/API/Document/referrer)

iOSがreferrerを廃止したとのこと。そのためやめた方がいい

2.

## URL 単数系 or 複数形設計

[参考URL](https://human-nature.hatenablog.com/entry/2016/10/15/130135)

DBのテーブル名のルールと統一するとわかりやすくなる。

## PURL: Persistent URL

永続的URL
Persistent URL (PURL) は、ユーザーが要求したWebリソースの適切な場所に要求をリダイレクトするUniform Resource Locator (URL) です。これは、Webリソースを直接指すのではなく、中間解決サービスと呼ばれるWebサービスの一種であるため、Webサイトがサーバーやホストを変更する原因となる絶え間なく変化するWebインフラストラクチャにもかかわらず、一定のままであることを意図しています。リソースの実際の現在のアドレスでPURLを解決し、リクエストをリダイレクトします。
