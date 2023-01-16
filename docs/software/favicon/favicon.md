# favicon 
[参考URL(これが一番参考になる)](https://zenn.dev/pacchiy/articles/e4dcd7bd29d387)

ファビコンとはfavorite icon（お気に入りアイコン）の略で2000年代の初頭から存在しているコンセプト。
在では主にブラウザのタブに表示され、そのかわいい画像は表示しているWebサイトを区別するのに役立っている。

## 配置注意点

favicon画像は**ルートディレクトリの直下に置く**
※一部のブラウザでルートディレクトリ以外の階層にあるfavicon画像を読み込まないため。

## ICO

ICOはfaviconでもっともよく使われるファイル形式。
元々はIEの独自機能だが、現在はすべてのブラウザでサポートされている。

## favicon.icoをfavicon.svg用意する理由

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
```
SVG形式のfaviconも、モダンブラウザでサポートされている。

SVGの場合
- 複数サイズの画像を用意しなくて良い
- ダークモードに対応できる

というメリットがあり、将来的にはSVGを使うことが増えるが今のところSafariが未対応。
SVGとICO（またはPNG）を併記するのが良い。

## 2023現在 ファビコン設定方法
[参考URL](https://coliss.com/articles/build-websites/operation/work/how-to-favicon.html)

最近のブラウザやデバイスに対応させる最小限ファビコンセットは6種類のファイルで対応できる。  
過去は20個以上のPNGファイルを用意しなければいけなかった。  
今は代わりに、必要なのは5つのアイコンと1つのJSONファイルだけ。  

- favicon.ico
- icon.svg
- apple-touch-icon.png
- icon-192.png
- icon-512.png
- manifest.webmanifest

```html
<link rel="icon" href="/favicon.ico" sizes="any"><!-- 32×32 -->
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png"><!-- 180×180 -->
<link rel="manifest" href="/manifest.webmanifest">
```