# web

webでのデザインをまとめていく


## checkbox

- 覚えておくべきこと
HTMLのinputタグを使ってチェックボックスを作成する場合**チェックボックスの形や色などをCSSで指定することはできない**
チェックボックスをカスタマイズする方法として、一旦チェックボックスの標準スタイルを無効にして好みのチェックボックスを作成する方法。

- 無効にしカスタマイズする手順
[参考URL](https://proengineer.internous.co.jp/content/columnfeature/6493)

1. display: noneをinputに設定

```css
input[ type=checkbox] {
    display: none; /* checkboxを非表示にする */
}

```

2. チェックボックスのラベルに装飾する.


## Tips

[シンプルなcheckbox](https://copypet.jp/774/)


## 画像ファイルを扱うときにおすすめな情報

SVGファイルを扱うときにおすすめなサイト

SVGOMGというサイトで、SVGのサイズを小さくしたりコードをスッキリキレイにしたり出来ます。おすすめです。

[参考URL](https://jakearchibald.github.io/svgomg/)

## Webサイトの作り方



### ブレークポイントの選び方

デバイスクラスに基づいてブレークポイントを選ばないでください。
最初に小さな画面に収まるようにコンテンツを設計してからブレークポイントが必要になるまで画面を拡大する。
これにより、コンテンツに基づいてブレークポイントを最適化し可能な限り少ない数のブレークポイントを維持できる。

1. スマホサイズで見やすいレイアウトを作成する。
2. 次に要素間に**空白が多きすぎるまでブラウザのサイズを変更する。**


## Blob(Binary Large Object)

バイナリーデータを表すオブジェクト。格納するための型。
巨大な画像/音声ファイル/動画ファイルなどを扱うことができる。
immutable = 不変
**blobを直接変更できないが、blobから値を切り出したり新しいblobを作ることは可能。**

[JSでのBlobの扱い](https://ja.javascript.info/blob)


## ファイルダウンロードの仕組み

[参考URL](https://javascript.keicode.com/newjs/download-files.php#1)
