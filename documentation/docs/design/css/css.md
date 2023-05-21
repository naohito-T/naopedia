# CSS
[CSSリファレンス](https://developer.mozilla.org/ja/docs/Learn/CSS/First_steps)  
[Webの教科書](https://web-design-textbook.com/css-textbook.html)

## CSSを本当に理解するには
[参考URL](https://coliss.com/articles/build-websites/operation/css/about-css-layout-algorithms.html)

CSSを理解するには、レイアウトアルゴリズムがどのように機能するかを理解する必要がある。  
プロパティを知るだけでは不十分

## cssとは

CSSは**宣言型プログラミング言語**だが、近年JavaScriptのような命令型の要素も増えてきている。

## CSSの条件分岐
[参考URL](https://coliss.com/articles/build-websites/operation/css/writing-logic-in-css.html)

命令型要素について

1. 属性セレクターで対応する方法

```css
[data-attr='true'] {
    /* if */
}
[data-attr='false'] {
    /* elseif */
}
:not([data-attr]) {
    /* else */
}
```

2. 擬似クラス

```css
:checked {
    /* if */
}
:not(:checked) {
    /* else */
}
```

3. メディアクエリ

```css
:root {
    color: red; /* else */
}
@media (min-width > 600px) {
    :root {
        color: blue; /* if */
    }
}
```

## HEX形式
[参考URL](https://qiita.com/CUTBOSS/items/6166cf79b9f18c45a010)

HEX形式はプログラムイメージ（コードとデータを表すの16進数列）をテキストで表現したもの  
最後の2桁は透過部分

```css
/* HEX6桁 */
.class {
  color: #e0e0e0;
}
/* HEX8桁 最後は透過 */
.class2 {
  color: #E0E0E0E0;
}
```

## width

- 100%とautoの違い

> 【width:auto】の場合は、左右の余白 10px を含んで横幅 100%になります。 【width:100%】の場合は、左右の余白 10px を含まずに横幅 100%になるため、実際の横幅は 100%+20px（左右の余白分）になります。
たとえばPC版のコーディングから行うとして、widthをpx指定したときなどはブレイクポイントを設けてSP版用に幅を上書きする。
この流れはよくある。共に、親要素の幅に合わせるとういう意味では同じですが、paddingやborderを指定する場合にちょっと違ってきます。

MediaQueriesをつかってwidthを上書きする場合はこちらが便利です。


width autoだとflexのjustifyがきく

- vw, vh, vmin, vmaxについて
[参考URL(一番わかりやすい)](https://coliss.com/articles/build-websites/operation/css/css-viewport-units.html)

>どんなシーンで使えるか
>画像を例にすれば、ページいっぱいの背景画像などでしょうか。モバイル端末は向きによってタテ・ヨコの長さが変わるので、JavaScript で向きの判定処理をして動的にサイズを調整するといったことを自前で作る必要がなくなるかと思います。

vw(viewport width) ビューポートの幅に対する割合
vh(viewport height) ビューポートの高さに対する割合
vmin(viewport minimum) ビューポートの幅と高さのうち、値が小さい方に対する割合
vmax(viewport max) ビューポートの幅と高さのうち、値が大きい方に対する割合

## プロパティ一覧

flex-basic

## flexbox

[一番わかりやすいflexbox](https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet)

### 親要素にFlexコンテナーに指定するプロパティ

- flex-direction
row（初期値）… 子要素を左から右に配置
row-reverse … 子要素を右から左に配置
column … 子要素を上から下に配置
column-reverse … 子要素を下から上に配置

子要素の

## cssで動的に値を変更する方法 var()

[参考URL](https://www.webprofessional.jp/practical-guide-css-variables-custom-properties/)
基本、webなどでCSSを動的に使用するにはJSなどを使用する方法が多いが、
CSSでも変数が使用できるためそちらも検討できる。

CSS変数を呼び出す var()関数は

>var() 関数は、プロパティ名、セレクター、またはプロパティ値以外のところでは使用できません。(使用してしまうと、無効な構文が生成されるか、もしくはその変数に接続していない値が生成されてしまいます。)

## CSS変数とプリプロセッサー変数の違い

Webサイトのスタイリングで変数の持つ柔軟性を利用する方法は、SassやLessといったプリプロセッサーの活用。

前提 : 実行環境がブラウザだよ
CSS変数 : ブラウザで実行できる動的なCSSプロパティ
プリプロセッサ(scssなど) : プリプロセッサーの変数はCSSコードにコンパイルされるためブラウザーは関与しない。

スタイルシートドキュメント内のCSS変数は、インラインスタイル属性やSVGのプレゼンテーション属性で変更したり、JavaScriptで選択、操作したりできるのです。可能性が無限に広がります。**プリプロセッサーの変数では実現できません。**

## アットルール

[リファレンス](https://developer.mozilla.org/ja/docs/Web/CSS/At-rule)

アットルールはCSS文のうち、CSSの動作を既定するもの


## 疑似クラス

`:root`
>CSS の :root 疑似クラスは、文書を表すツリーのルート要素を選択します。 HTML_ では、 :root は `<html>` 要素を表し、詳細度が高いことを除けば html セレクターと同等です。
詳細度は:rootのほうが高い

## CSS変数(CSSカスタムプロパティ)

- 定義
カスタムプロパティの宣言には--からはじめる。カスタムプロパティの名前(好きなものでOK)

- 定義のコツ
CSS上でグローバル変数として使用するために:rootに定義してグローバルに使用する。

- 呼び出す
var(--変数名)

```css
/* カスタムプロパティの宣言 */
--変数名: 値;

```

## CSS Grid Layout

[参考URL](https://ics.media/entry/15649/)

Grid Layout ModuleとはWebサイトのレイアウトを構築する新しい手法
**今までは、ウェブサイトのレイアウトを実現するためにfloatやflexboxを使っていた**

Grid Layoutを使えば
**HTML要素の構造を汚さず、従来の手法に比べてウェブサイトのレイアウトが作りやすくなる。**
例として
floatだと、親要素にdivを増やす必要があったのが、Grid Layoutを使えばそのようなムダなHTML要素を増やさなくて構わなくなる

- 作り方
Grid Layoutはレイアウトを囲むコンテナーーの要素に、その子要素の配置の仕方を指定する。Flexboxと違い、要素を並べる行・列コンテナーーとなる要素を用意する必要はない。

## link tag

- 外部font読み込み

次にレンダリング中にフォントデータ本体が読み込まれます。各font-face定義内のsrc 属性のurl(https://fonts.gstatic.com/s/...) の部分
ここで問題になるのが、**フォントデータの読み込みが始まるタイミングがレンダリングの後半になること**
ブラウザがCSSを認識し、フォントデータが必要だと判断した時点でロードが始まる。
実際には初めからfonts.gstatic.comのロードが必要なことは分かっている。
そのためpreconnectヒントを指定することで読み込みの一部を事前にスタートさせる。
preconnect ヒントは指定した URLのDNS名前解決とTCPのハンドシェイク、TLS のネゴシエーションなどを事前に行います。リンクの読み込み時間の多くはこれらの事前処理に割かれているため、この部分を先行して行うことで高速化が実現できます

```html
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
```

## CSS GridとCSS Flexboxの認識

[参考URL](https://coliss.com/articles/build-websites/operation/css/css-grid-vs-flexbox-which-should-you-choose.html)

>CSS GridとFlexboxは、CSSで現在主流となるレイアウトのテクノロジーです。
>CSS GridとFlexboxは表面的には似ているように感じるかもしれません。しかし、実際には異なるタスクに使用され、それぞれ異なるレイアウトの問題を解決します。

**CSS Gridはコンテナーベースで、Flexboxはコンテンツベースです。Flexboxのレイアウトではセル（Flexアイテム）のサイズはFlexアイテム自身で定義され、CSS Gridではセル（Gridアイテム）のサイズはGridコンテナーで定義されます。**

- リロード時間の違い
**Flexboxのレイアウトではコンテンツがロードされた後に計算されるのに対して、Gridのレイアウトではコンテンツに関係なく計算されることを示している。**
**Flexboxでページ全体のレイアウトを構築することは表示が遅くなるため、避けた方がよい。**

- 1次元と2次元の適している部分。
1次元とは一方向（横行か縦列のいずれか）に配置することで、2次元とは二方向（横行と縦列）に配置することです。これはtableレイアウトの時代からあるコンセプトで、CSS GridもFlexboxもこのコンセプトに基づいています。
1次元に要素を配置するのはFlexboxが適しています。そして2次元に要素を配置するのはCSS Gridが適しています。


## gapで対応する。

[参考URL](https://ics.media/entry/210628/)

**margin で余白を作っていたのが、gap になる点が地味に便利。**


## Grid Layoutを極める

[勉強用URL](https://qiita.com/kura07/items/e633b35e33e43240d363)
[基本レイアウト構成URL](https://www.webcreatorbox.com/tech/css-grid-basic-layout)
[CSSグリッドレイアウトでサイズが違う復数のボックスをタイル上に配置する](https://www.webcreatorbox.com/tech/css-grid-layout)

CSS Grid Layout（グリッドレイアウト）は、**2次元レイアウト** を、HTML/CSSを使って簡単・自由に操作できる機能
**gridの大きさを決めるfr(fraction(分数の意味)」)**

## Grid Layoutの用語

- コンテナー
`display: grid;`または`display: inline-grid;`を指定することでその要素は**Grid Layoutのコンテナーになる。**

- アイテム
コンテナーの子要素。**コンテナーの直接の子要素は基本的にすべてアイテムとなる。**

```html
<div style="display:grid;"> <!-- コンテナ -->
    <div></div> <!-- アイテム-->
    <p></p> <!-- アイテム -->
    <section> <!-- アイテム -->
        <div></div> <!-- これはアイテムではない -->
    </section>
</div>
```

- ライン
グリッドを分ける**垂直および水平の線のこと。**
グリッドの上下左右それぞれの両端にも存在。
ラインには、上あるいは左から1を基準に正の番号が振られている。
同時に、下あるいは右からは-1から順に負の番号が振られています。（0という番号のラインはないのです）

- トラック
グリッドの行および列のことです。言い換えればトラックとは、隣接する2本のラインの間を表しています。

- セル
隣接する垂直および水平方向のラインが作る、アイテムを配置できる最小の単位です。

- エリア
一つあるいは複数のセルが結合してできるセルの集まりです。
エリアには名前を付けることができ、アイテムを配置できます。

---



---

- 作成手順

1. HTMLと必須のCSS(display: grid;)

2. CSSで各トラックの大きさを指定する
縦横それぞれのトラックの大きさを指定する。以下プロパティを使う。
grid-template-rows: 行のトラックの高さを半角スペースで区切って指定
grid-template-columns: 列のトラックの幅を半角スペースで区切って指定

3. CSSでアイテムの配置を指定する
最後にそれぞれのアイテムをグリッドのどのエリアに配置するのかを指定する。
**アイテムを配置するのには2通りの方法がある。**

## CSS 仕組み

[参考URL](https://coliss.com/articles/build-websites/operation/css/about-css-layout-algorithms.html)

多分みんなそうだろう
CSSの学習はz-index: 10;やjustify-content: center;のようなプロパティと値に着目していました。それぞれのプロパティが何をするのかを理解すれば、CSS全体を深く理解できると考えていたがそれは違う

良い考え方
そこで気づいたのは、CSSは単なるプロパティの集合体ではないということです。CSSは相互に接続されたレイアウトアルゴリズムの集合体なのです。それぞれのアルゴリズムは、独自のルールとメカニズムを持つ複雑なシステムです。
特定のプロパティが何をするのかを学ぶだけは十分ではありません。レイアウトアルゴリズムがどのように機能するか、プロパティをどのように使用するかを学ぶ必要があります。

### CSSにおけるレイアウトのアルゴリズム

## メディアクエリとコンテナークエリ

[参考URL](https://coliss.com/articles/build-websites/operation/css/about-css-container-queries.html)

## object-fit

[わかりやすい](https://webdesignday.jp/inspiration/technique/css/7976/)

## calc()

[参考URL(コリス)](https://coliss.com/articles/build-websites/operation/css/how-calc-works-by-ire.html)

calc()は計算された値がブラウザに反映されるのではなく**ブラウザによって解析された値が実際のcalc()の計算式となる。**
これはブラウザにおける値がより動的になり、ビューポートの変更に合わせて適応できることを意味する（都度計算される）
たとえば、ビューポートの高さから絶対値を引いた要素をビューポートの変更に合わせて適応させることができます。

## スタッキングコンテキスト

[参考URL](https://ics.media/entry/200609/)

`mix-blend-mode`の実装で理解した。要はweb pageでのz軸

CSSで要素の重なりを表現する時は}**スタッキングコンテキスト**によって決められています。スタッキングコンテキスト（Stacking Context）はウェブページ上の仮想的な奥・手前方向の概念であり、「重ね合わせコンテキスト」、あるいは「スタック文脈」とも言います。
z-indexによる重なり位置の指定もこのスタッキングコンテキストのうちのひとつです。今回はz-indexより広い概念のスタッキングコンテキストの深淵を覗いてみます。

## CSSのz-index: 10000;はいらなくなる。

[参考URL](https://coliss.com/articles/build-websites/operation/css/what-is-the-top-layer.html)


## box-shadowは古い？

[参考URL](https://ferret-plus.com/8961?page=2)

## fit-content

`width: fit-content`
[参考URL](https://pulpxstyle.com/fit-content/)
