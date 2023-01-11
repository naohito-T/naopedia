# favicon 

[参考URL(これが一番参考になる)](https://zenn.dev/pacchiy/articles/e4dcd7bd29d387)

## 配置

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

