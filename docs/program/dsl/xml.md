# XML(Extensible Markup Langurage)

## XMLとは

[参考URL](https://uhyohyo.net/javascript/6_1.html)
HTMLと同じようにタグをつかって様々なデータを表すことができる仕組み
様々なデータとは、本当になんでも良い。
XMLによってつくられたデータは、さまざまなことに利用される。例
えば、プログラムがデータを保存するのに使ったりされます。ただ、最近はデータフォーマットとしてはより軽量なJSONに役目を奪われている感があります。

```xml
<?xml version="1.0" ?>
<users>
  <ユーザー>
    <名前>Aさん</名前>
    <年齢>23</年齢>
  </ユーザー>
  <ユーザー>
    <名前>Bさん</名前>
    <年齢>100</年齢>
  </ユーザー>
</users>
```

まず一見して違和感を覚えるのは、タグ名が日本語であるものがあるということですね。前述のようにXMLではタグ名も自由に決めることができるので、このように日本語も可能です。とはいっても、やはり普通に半角英数字で書くということのほうが多いと思います。そのほうが国際的ですしね。

最初の行の<?xml version="1.0" ?>は、XMLでは書くことになっているもので、この文書がXMLであることを表すものです。XML文書には、これが必要です。

次に、この文書全体は<users> 〜 </users>で囲われています。このように、文書全体を囲う要素をルート要素などといいます。HTMLでもルート要素はありましたね。全体が<html> 〜 </html>で囲まれているから、html要素がルート要素だといえますね。

## XMLルール

必ず終了タグが必要
**また特別仕様のタグは名前空間を定義しないといけない(どこかで調べられる)**

```xml
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:snf="http://www.smartnews.be/snf">

<snf:analytics>
</snf:analytics>
```

## XML特別仕様

[参考URL](https://uhyohyo.net/javascript/6_2.html)

XMLの、HTMLにはない特徴として、名前空間というものがあります。今回、それについて解説します。

```xml
<?xml version="1.0" ?>
<aaa:abc xmlns:aaa="http://example.com/aaa">
  <aaa:abcd a="aaaaaaaa" />
  <aaa:abcd a="bbbbbbbb" />
  <aaa:abcd a="cccccccc" />
</aaa:abc>
```

<aaa:>これが名前空間の部分。


## XHTML

 HTMLはXMLとは似ていても少し違うものだったが、そこでHTMLをXML文書の一種として書けるようにしたものを作成した。
 それがXHTML。そのためXHTMLはXMLとしても通用するということになる。
 ただし、XHTMLは一時期鳴り物入りで登場したものの、あまり普及しませんでした。代わりにHTML5が台頭したため、XHTMLは廃れてしまいました。なのでXHTMLの説明をしても仕方ないかもしれませんが、書いてしまったのでここで紹介しておきます。

## サイトクローズ周り

ユーザ情報を持っていても、それが資産になるかわからない。
また、情報を持つのは精査した方がいい。情報システム部に問い合わせる。
資産として積み重ねるには、アナリティクスとして必要な情報。
