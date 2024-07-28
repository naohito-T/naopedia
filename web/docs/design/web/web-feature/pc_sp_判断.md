# PC・SP 判断

[参考 URL](https://www.site-convert.com/archives/2188)

## UserAgent

UA(User Agent: UA)とは
ネット利用者が使用しているOS・ブラウザのことを指す
一般的なインターネットブラウザを使い、HTTPに基づきサイトなどにアクセスした際にはユーザエージェントに関する各種情報が相手側に通知される仕組みとなっている。
サイト側はユーザーエージェントを見ることでアクセスしてきたユーザがどういったOSやブラウザを使っているかを把握できる。
そのためアクセス解析に利用されることが多い。

##

> Web ページを閲覧しているデバイスがスマホかどうかを JavaScript で判定するには、様々な方法があります。
> UserAgent 文字列から判定するのが代表的な方法ですが、ブラウザサイズから判定する方法や、デバイス判定ライブラリを使う方法もあります。
> しかしながら、UserAgent は OS やブラウザのバージョンアップによって変更されたり、デバイス判定ライブラリによっては日本で発売されている端末に対応していなかったりと、注意すべき点もあります。
> そこで今回は、日本で利用されているスマホを対象として、Javascript で正しくスマホ判定するための方法を 2 つ解説します。

## 前提条件を考える

スマホの定義を考える。

- Android搭載端末（Android 5.0以上）
- iPhone（iOS 10以上）
- iPod / iPod touch（iOS 10以上）
- ブラウザでPCサイト表示モードに設定している時はスマホと判定されるか

1. UserAgentからスマホ判定

UserAgentが以下のいずれかの場合、スマートフォンと判定できます。

iPhoneを含む
AndroidとMobileを含む
JavaScriptコードは以下のようになります。

```js
function isSmartPhone() {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return true;
  } else {
    return false;
  }
}
```
