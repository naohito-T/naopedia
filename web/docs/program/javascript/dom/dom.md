# DOM api

jsはDOMの操作apiがかなり多いため、備忘録として学んだことを記す

## Nodeでの扱い

NodeはサーバサイドでのJSを扱う方法。
そのためDOM APIがない。
使うためにはライブラリを使用するしかない。

## 要素に設定されているstyle属性を知りたい場合。

- window.getComputedStyle()

[参考URL](https://qiita.com/amamamaou/items/bb79bec002a6ff033810)

>window.getComputedStyle() メソッドは、要素に適用されたスタイルの値を基本的な値に計算しなおした後、すべてのCSSプロパティの値を返します。

※font-size: 1em;となっていた場合もその要素のサイズも計算されて返す

## `<video>` タグに対して

[リファレンス](https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement/srcObject)

HTMLMediaElement.srcObject

>HTMLMediaElement インターフェイスの srcObject プロパティは HTMLMediaElement に関連付けられたメディアソースを提供するオブジェクトを設定または取得します。 このオブジェクトは MediaStream、MediaSource、Blob や(Blobから派生している) File です。

## mouse move

[参考URL](https://qiita.com/yukiB/items/31a9e9e600dfb1f34f76)

## innerHeightとouterHeightの違い

[参考URL](https://qiita.com/yyzzyykk/items/60f1559820f1c6d09b7a)

outerHeightを使わないと、要素のborderとmarginを取得しない。

## ページの読み込み前・直後・完了時にスクリプトを実行する方法いろいろ

pageが表示される際状態は3つの状態があると思われる。

1. 前：ウェブページが読み込まれる前に何らかの処理をする。
2. 直後：ウェブページのHTMLが読み込み完了できた時点で何らかの処理をする。
3. 完了後：ウェブページ上に掲載されたあらゆるオブジェクト(画像など)の読み込みがすべて完了した後で何らかの処理をする。

## 1. 前：ウェブページが読み込まれる前に何らかの処理をする について

ウェブページが読み込まれる前よりも処理を実行した場合は、HTMLソースの先頭付近にスクリプトを書けばいい。
ウェブページの本文領域(=body)ではあなく、head要素内で読み込めば良い。

```html
<head>
   <script type="text/javascript" src="firstscript.js"></script>
</head>
```

上記のよういに記載すると、**そのJavascriptファイルの読み込みと実行が完了するまで、HTMLの読み込み処理は止まる**
**閲覧者の環境によっては別ページにリダイレクトさせたい場合には、このような位置に記述する方が良いかも知れない。**

## 2. 直後：ウェブページのHTMLが読み込み完了できた時点で何らかの処理をする について

**DOMContentLoadedイベントはウェブページのHTMLを最後まで読んだ直後のタイミングを示す。**

実現方法

1. HTMLの末尾(`</body>` 要素の直前)でスクリプトを実行するように書く。
2. JavaScriptソースにDOMContentLoadedイベントのタイミングで実行されるように書く。

ナビゲーションだけは表示したいなどがあればいい

## 3. 完了後：ウェブページ上に掲載されたあらゆるオブジェクト(画像など)の読み込みがすべて完了した後で何らかの処理をする について

実現方法

1. (A) HTMLでbody要素に「onload」属性を指定して、値に処理を書く。
2. (B) JavaScriptソースにwindow.onloadメソッドを利用して、値に処理を書く。

ウェブページ上に掲載された「すべてのオブジェクト(画像などを含む)の読み込みが完了」した時点で何らかの処理をしたい場合は、onloadイベントに合わせてスクリプトが実行されるように記述する方法。

addEventListenerの場合はloadで記載する。
