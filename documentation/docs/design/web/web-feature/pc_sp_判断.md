# PC・SP 判断

[参考 URL](https://www.site-convert.com/archives/2188)

## UserAgent

UA(User Agent: UA)とは
ネット利用者が使用している OS・ブラウザのことを指す
一般的なインターネットブラウザを使い、HTTP に基づきサイトなどにアクセスした際にはユーザエージェントに関する各種情報が相手側に通知される仕組みとなっている。
サイト側はユーザーエージェントを見ることでアクセスしてきたユーザがどういった OS やブラウザを使っているかを把握できる。
そのためアクセス解析に利用されることが多い。

##

> Web ページを閲覧しているデバイスがスマホかどうかを JavaScript で判定するには、様々な方法があります。
> UserAgent 文字列から判定するのが代表的な方法ですが、ブラウザサイズから判定する方法や、デバイス判定ライブラリを使う方法もあります。
> しかしながら、UserAgent は OS やブラウザのバージョンアップによって変更されたり、デバイス判定ライブラリによっては日本で発売されている端末に対応していなかったりと、注意すべき点もあります。
> そこで今回は、日本で利用されているスマホを対象として、Javascript で正しくスマホ判定するための方法を 2 つ解説します。

## 前提条件を考える

スマホの定義を考える。

- Android 搭載端末（Android 5.0 以上）
- iPhone（iOS 10 以上）
- iPod / iPod touch（iOS 10 以上）
- ブラウザで PC サイト表示モードに設定している時はスマホと判定されるか

1. UserAgent からスマホ判定

UserAgent が以下のいずれかの場合、スマートフォンと判定できます。

iPhone を含む
Android と Mobile を含む
JavaScript コードは以下のようになります。

```js
function isSmartPhone() {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return true;
  } else {
    return false;
  }
}
```
