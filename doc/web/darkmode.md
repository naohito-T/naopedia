# Web dark mode

[CSSだけでもWebページをダークモード対応](https://note.com/psephopaiktes/n/n878424784a1b)

>prefers-color-scheme という Media Query を主要ブラウザがサポートしたため、Webでもダークモードに対応がしやすくなりましたね。CSSファイルに「ユーザがダークモードにしていたらこのCSS、ライトモードにしていたらこのCSSを適応」というように簡単に指定できるようになります。

```scss
@media (prefers-color-scheme: light) {
  // ライトモードのときのCSS
}
@media (prefers-color-scheme: dark) {
  // ダークモードのときのCSS
}
```

## prefers-color-scheme とは

>media queryの1種で、CSS上からユーザーがOSでダークモードをONにしているかどうかを判別できます。たとえば、普段は白い背景のWebページを、ダークモードをONにしているPCから見た場合は黒い背景にする、といった対応が行えます。

## 対応ブラウザ

> Chrome, Firefox, Safari等の主要なPCブラウザは対応が完了しました。ただし、スマートフォンのブラウザはまだまだ非対応です。

## 対応方法

対応はかなりかんたんです。@media (prefers-color-scheme: dark) {}というブロックを追記し、その中にダークモード時に適応したいCSSを書くだけ

ただ動的にmodeを変えるのは難しい

```scss
@media (prefers-color-scheme: dark) {
  body{
    background-color:#000;
    color: #fff;
  }
}
```

## ダークモードにも柔軟に対応できるCSS&Sass変数のカラー設定方法

[参考URL](https://higemura.com/blog/programming/dark-mode-css-variables-01)

## ダークモード対応の流れ

クライアントの設定が肝心
ブラウザ側ではクライアンントの設定を取得することはできるためそれを取得してcolorを変える
Storageに保存するかcookieに保存するか
トグルボタンとかを設置して上げればなおよい。
