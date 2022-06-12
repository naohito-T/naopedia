# PWA（Progressive web apps）

[Nuxtでの導入方法](https://designsupply-web.com/media/development/6823/)
[その際にfavicon一式必要なため生成ツール](https://zenn.dev/toshihide2000/articles/a41031f1003cf2)

PWAはプログレッシブウェブアプリという意味。
**アプリケーションで使われる機能を搭載したウェブサイト**のこと、特にスマートフォンなどのモバイルデバイスと相性が良い.

## 導入方法

画像作成がめんどい

1. アイコン画像作成
幅512px, 高さ512pxサイズのアイコンを作成
アイコンを作成する際には端末によって円形にマスクされることも考慮したデザインにする。

72x72
96x96
128x128
144x144
152x152
192x192
384x384
512x512

上記のような画像が必要になるのかも


2. スプラッシュスクリーン画像作成
これはWebアプリを起動した時の画像。デバイス幅によって変わるため作成数は多い


[https://app-manifest.firebaseapp.com/](https://app-manifest.firebaseapp.com/)

