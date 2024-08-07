# CSSOM(CSS Object Model)

[参考URL](https://qiita.com/Tsuyoshi84/items/5575aff0408ea7e64e68)
[Chrome リファレンス](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css)

ブラウザでロードされたCSSのツリー構造を保持する仕組み。
たとえば、bodyにはこのスタイル、bodyの下にあるdivには別のスタイル、というようなイメージ。ブラウザは、このCSSのツリー構造をDOMに対して適用することで、上位のスタイルからより具体的な下位のスタイルへと連鎖的にスタイルを決定していく
>このようにして処理されたものはレンダリングツリーと呼ばれ、これに基いてレイアウトの計算処理と描画処理が行われます。

## レンダリングブロックリソース

>すなわち、HTML と CSS の両方がレンダリング ブロック リソースなのです。DOM がなければレンダリングできないのですから HTML については理解できます。しかし、CSS が必要である理由はわかりにくいかもしれません。CSS によるレンダリングのブロックを回避して、一般的なページをレンダリングするとどうなるでしょうか。

デフォルトでは、CSSは**レンダリング ブロック リソース**として扱われる。
メディアタイプやメディアクエリを利用すると、一部のCSSリソースを**非レンダリング ブロックとして指定できる。**
CSSリソースは、ブロック リソースであるか非ブロック リソースであるかにかかわらず、すべてブラウザでダウンロードされます。

## レンダリングブロック

レンダリング ブロック」とは、ブラウザが、該当するリソースでページの初回レンダリングを保留する必要があるか否かということだけを指しています。

## ウェブパフォーマンスへの影響

CSSOMがどのようにウェブのパフォーマンスへと影響を与えるのでしょうか。それは、CSSOMの構築はウェブページのレンダリングをブロックするという点

言い換えると
CSSOMが構築されるまではウェブページには何も表示されず、**ユーザの目にはただ白い画面だけが映し出される**
そのためCSSOMの構築に要する時間がUXへと影響を及ぼす
→より正確には、DOMとJavaScriptも含めて**クリティカルレンダリングパス**と呼び、コンテンツが描画されるまでの時間に影響される

## CSSOMのキャッシュ

**CSSOMはキャッシュという仕組みを持たない**
CSSファイルをブラウザがキャッシュしていたとしてもリロードや別ページへの遷移が発生するたびにCSSOMは再構築されることになる。
>いくらキャッシュしていたとしても、巨大なCSSはCSSOMの構築に毎回時間をかけることになります
>なので、いくらキャッシュしていたとしても、巨大なCSSはCSSOMの構築に毎回時間をかけることになります。

## CSSOMの処理を最適化するには

以下のような方法が取られる

- 複数のCSSファイルを1つのファイルにまとめる

CSSファイルが複数に分割されている場合、**ブラウザは(HTTP/2でない限り)**それぞれのファイルをダウンロードしなければいけない。そこでCSSファイルの内容をバンドラなどを使用して事前にまとめておけば、ダウンロードに要する時間を短縮できます。

- 他のCSSファイルをインポートしない

```css
@import url("another-style.css")
```

CSSファイル内で@importを使用することにより他のCSSを取り込んでいますが、ファイルをダウンロードするためのリクエストが別途発生してしまい、レンダリングをブロックしてしまいます。そのため、@importを使用せず、上記と同じようにファイルをまとめておくのがベター

- mediaを使用して必要な場合だけファイルを取得する

CSSの中には、モバイル機器にしか使われないスタイル定義、印刷時にしか使わないスタイル定義のように、特定の状況下のみで使用されるものがあります。そのようなケースで使用できるのが `<link>` 要素のmediaです。以下の例を見てみましょう

```html
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
```

この例では、style.cssに基本的なスタイル定義がしてあり、print.cssとother.cssには、特定の状況下でページを閲覧している場合のためのスタイル定義が含まれています。それぞれのmediaで指定した条件を満たさない場合はレンダリングをブロックしないため、パフォーマンスを向上させることができます。
