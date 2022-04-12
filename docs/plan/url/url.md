# URL



## URLセーフ

[参考URL](https://jp.quora.com/JWT%E3%81%AE%E3%82%88%E3%81%86%E3%81%AAURL%E3%82%BB%E3%83%BC%E3%83%95%E3%81%AA%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3-URL%E3%82%BB%E3%83%BC%E3%83%95%E3%81%A3%E3%81%A6%E3%81%AA%E3%82%93%E3%81%A7%E3%81%99%E3%81%8B)

URLにとって安全ということ
URLにおいて特別な意味のある文字が含まれる場合、それを適当にサーバに与えるとURLの意味が壊れて危険
**例: ?や=,&など**
GETパラメータのセパレータとして機能します。URLセーフであると言う場合、**このようなURLにとって危険なものが含まれないと約束されています。**

予約されていない文字

`unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~" `
ALPHA:アルファベット、DIGIT:数字、そして-._~の4種の記号です。　これらの使用して良い文字のみで構成される文字列はURLセーフです。

---

## URL取得する

1. document.referrer

[参考URL](https://developer.mozilla.org/ja/docs/Web/API/Document/referrer)

iOSがreferrerを廃止したとのこと。そのためやめた方がいい

2. 

