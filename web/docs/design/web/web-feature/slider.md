# slider関連

## カルーセルスライダーとは

- カルーセル意味

>カルーセルとは、回転台、回転木馬、回転コンベア、回転棚などの意味を持つ英単語。Webページなどに設けられる画像などの表示領域で、内容を左右に移動して切り替えられるものをこのように呼ぶ。

- カルーセル仕組み
[HTMLとCSSだけで実装する](https://coliss.com/articles/build-websites/operation/css/css-only-carousel.html)

## 実装するときに必要な要件

- スライダーの秒数を指定できる。
- スライダーの画像を指定できる。
- スライダーの画像の枚数を指定できる。
- 左右の画像にいけるbuttonが必要か確認する。
- imgタグで画像を `height: 100%` で指定をすると実際の縮尺が表示され画像にバラつきがある。そのためbackground-imageで画像は表示させる。
