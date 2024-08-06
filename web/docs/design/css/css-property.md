# CSS Property

## Overview

よくわからないプロパティや、考え方を記載していく。

論理プロパティと物理プロパティは、CSSにおけるプロパティの分類の一種で、特にレイアウトやデザインの柔軟性に関連しています。それぞれの違いについて詳しく説明します。

## 物理プロパティと論理プロパティ

[CSSのボックスモデルにおける古い方法とこれからの方法 -論理プロパティにおける考え方](https://coliss.com/articles/build-websites/operation/css/new-css-logical-properties.html)

- **適用方向の固定性**
  - 物理プロパティは常に特定の物理的方向に影響を与える。
  - 一方、論理プロパティは書字方向に応じて動的に変わる。
- **柔軟性**
  - 論理プロパティは、国際化対応や複数の言語設定をサポートするデザインにおいて、より柔軟で適応性がある。

この違いを理解することで、より適切にCSSを使用し、グローバルなユーザーベースに対応した柔軟なデザインを作成できます。

### 物理プロパティ(Physical Properties)

物理プロパティは、具体的な方向（上、下、左、右）に基づいて要素のスタイルを定義する。  
これらのプロパティは、ページの方向に関係なく常に同じ方向を指す。

- 左から右 (LTR)
- 右から左 (RTL)

- `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
- `padding-top`, `padding-right`, `padding-bottom`, `padding-left`
- `border-top`, `border-right`, `border-bottom`, `border-left`

これらのプロパティは、ページがどの言語設定であっても、**常に物理的な位置に影響**を与える。

```css
.element {
  margin-right: 20px;
}
```

### 論理プロパティ (Logical Properties)

論理プロパティは、要素のスタイルを文書の書字方向に基づいて定義します。これにより、左から右 (LTR) か右から左 (RTL) かに関わらず、プロパティが動的に適用されます。

- `margin-block-start`, `margin-block-end`
- `margin-inline-start`, `margin-inline-end`
- `padding-block-start`, `padding-block-end`
- `padding-inline-start`, `padding-inline-end`
- `border-block-start`, `border-block-end`
- `border-inline-start`, `border-inline-end`

これらのプロパティは、ページの方向に依存してスタイルを適用するため、レイアウトの柔軟性が向上します。

```css
.element {
  margin-inline-start: 20px;
}
```

## width

- 100%とautoの違い

> 【width:auto】の場合は、左右の余白 10px を含んで横幅 100%になります。 【width:100%】の場合は、左右の余白 10px を含まずに横幅 100%になるため、実際の横幅は 100%+20px（左右の余白分）になります。
たとえばPC版のコーディングから行うとして、widthをpx指定したときなどはブレイクポイントを設けてSP版用に幅を上書きする。
この流れはよくある。共に、親要素の幅に合わせるとういう意味では同じですが、paddingやborderを指定する場合にちょっと違ってきます。

MediaQueriesをつかってwidthを上書きする場合はこちらが便利です。

width autoだとflexのjustifyがきく

>どんなシーンで使えるか
>画像を例にすれば、ページいっぱいの背景画像などでしょうか。モバイル端末は向きによってタテ・ヨコの長さが変わるので、JavaScript で向きの判定処理をして動的にサイズを調整するといったことを自前で作る必要がなくなるかと思います。

vw(viewport width) ビューポートの幅に対する割合
vh(viewport height) ビューポートの高さに対する割合
vmin(viewport minimum) ビューポートの幅と高さのうち、値が小さい方に対する割合
vmax(viewport max) ビューポートの幅と高さのうち、値が大きい方に対する割合

## vw, vh, vmin, vmaxについて

[参考URL(一番わかりやすい)](https://coliss.com/articles/build-websites/operation/css/css-viewport-units.html)

### vw

`4vw` はビューポートの幅を基準としています。ビューポートとは、ブラウザの表示領域のこと。  
`vw`（viewport width）は、ビューポートの幅に対する割合を表す単位。  
ビューポートの幅を100とした場合、`1vw` はビューポートの幅の1%に相当します。同様に、`4vw` はビューポートの幅の4%を意味します。

つまり、`4vw` の値を持つパディングは、ビューポートの幅に対して可変的に変化します。ビューポートが広い場合、パディングも広くなります。ビューポートが狭い場合、パディングも狭くなります。

たとえば、ビューポートの幅が800pxの場合、`4vw` の値は `0.04 * 800 = 32px` となります。したがって、パディングは32pxとなります。
このようにして、ビューポートの幅に応じて要素のパディングが自動的に調整されるため、レスポンシブなデザインが実現できます。

## linear-gradient()

liner-gradient()はCSSの関数で、2つ以上の色の連続的な直線に沿った変化から構成される画像を生成する
>結果は `<gradient>` データ型のオブジェクトであり、これは `<image>` の特殊型です。

```css
/* 45度に傾いたグラデーションで、
   青から始まり赤で終わる */

linear-gradient(45deg, blue, red);

/* 右下から左上に向かうグラデーションで、
   青から始まり赤で終わる */
linear-gradient(to left top, blue, red);
```

## scroll-snap

[参考URL](https://webrandum.net/css-scroll-snap/)
画面領域いっぱいにセクションが広がって、スクロールすると画面にキレイにピタッと止まってくれる、
このような処理を実装するためにはいままでJSが必要だったがscroll-snapを使えばCSSだけで簡単に実装ができる。

- 基本的な実装方法
親要素にscroll-snap-type: mandatory;を指定する
子要素にscroll-snap-align: start;を指定する
widthやheightで幅の指定をする
親要素にoverflow: scroll;を指定

>※幅の指定やoverflow: scroll;を指定していないと、動かないときがあります。
>scroll-snapの指定をしているはずなのにちゃんと機能しない場合は、この辺りを疑うようにしましょう。

- scroll-snap-type

>親要素に指定するscroll-snap-typeでは、「スクロールの方向」「スクロール調整の強さ」を指定します。
>スクロールの方向はx・y・bothの3種類があり、それぞれ横方向・縦方向・両方（省略可）にスクロールしたときにくっつくようになります。
>スクロール調整の強さはmandatoryとproximityの2種類があります。
>mandatoryを使う場合は、必ずスナップ位置にスクロールするようになります。
>逆にproximityの場合は境界線に近づくとピタッとくっつきますが、境界線との距離が遠い場合はくっつかなくなります。

- scroll-snap-align

## gap プロパティ

[参考URL](https://ics.media/entry/210628/)

CSSのgapプロパティは余白を指定できる新しい手法
余白といえば、marginプロパティやpaddingプロパティを思い浮かべる方が多いが**CSS grid**やFlexboxでgapプロパティを使うと柔軟にレイアウトを組める。

## text-align:center;

インライン要素を中央寄せする。
※親をインライン要素にすると中央寄せできなくなる。

## margin: auto;

marginに指定するautoは**余白を自動で調整してくれるプロパティになる。**
>基本的にブロック要素は指定がないと親要素の100%の大きさになります。
>親要素と同じ大きさであれば、たとえmargin 0 autoを指定していたとしても左右中央寄せになりません。
>そのため指定する際はwidthプロパティで横幅を指定するようにしましょう。

## CSSのmin()、max()、clamp()を使いこなす(比較関数)

[参考URL](https://www.greenwich.co.jp/blog-archives/p/22906)  
[参考URL](https://pengi-n.co.jp/blog/min-max-clamp/)

> marginやpaddingを変動値（%など）で設定している場合**変動値の最小値・最大値**を設定したいときあるはず。
> widthやheightであればmax-width、min-heightのように設定できますが、marginやpaddingにmin-paddingやmax-marginのようなプロパティはない。
> ではどうすればいいか、比較関数のmin()、max()、clamp()を使いましょう。
> ※最大値はmin()、最小値はmax()とmin-width、max-widthの感覚と逆になるのでしっかり覚えましょう。

### min

`min()` はカンマ区切りで計算された**最小の値が選択**される。

```css
/* marginの最大値を設定する */
.btn {
  margin: 20px min(20%, 50px) 0;
}
/* 20%の値が50px以内であれば20%が選択され、50pxより大きい場合は50pxが選択されます。 */
```

今までの書き方を変えることができる。

```css
.box {
　width: 50vw;
　max-width: 600px;
}
/* ↓これに変える */
.box {
  width: min(50vw, 600px);
}
```

## max()

今までの書き方を変えることができる。

```css
/*　いままでの書き方 */
.box {
　width: 50vw;
　min-width: 400px;
}
/* ↓これに変える */
.box {
  width: max(50vw, 400px);
}
```

### 最小最大どちらも設定するならclamp()

※推奨値には**相対値のみを適用する**
font-sizeにも適用できる
clamp()を使えば、ビューポートに合わせてフォントサイズを調整することも可能です。
もちろん、メディアクエリで横幅に合わせてフォントサイズを変えることでも問題はありませんが、
clamp()を使うと記述が1行で済むうえに、可読性とデザインのバランスを維持することが可能。
>ブラウザの横幅を縮めた時にブレイクポイントでフォントサイズがガクッと変わるのではなく、滑らかに変化していくのもポイント。

```css
/* clamp構文 */
.box {
  width: clamp(最小値, 推奨値, 最大値);
}

.box {
  width:clamp(400px, 50vw, 600px);
}

/*　min()・max()をあわせて使用した書き方 */
.box {
  width:min(600px, max(50vw, 400px));
}
```

## left・topで指定するよりtransformのほうがなめらか

水平・垂直方向に要素を動かしたい場合は、leftやtopで指定するよりも、xやyで移動させる方が滑らかに表示できます。CSSの**transformは小数点を考慮するから**です。
用途にもよりますが、演出のために位置を変化させたい場合は、leftやtopよりもxとyで検討するといいでしょう。

## transform 訳: 変化 変身

[参考URL](https://web-camp.io/magazine/archives/87247)

動きをつけるためのプロパティ。

## transform 3D関連

[参考URL](https://ics.media/entry/210519/)

## CSSのz-index: 10000;はいらなくなる。

[参考URL](https://coliss.com/articles/build-websites/operation/css/what-is-the-top-layer.html)

## box-shadowは古い？

[参考URL](https://ferret-plus.com/8961?page=2)

## object-fit

[わかりやすい](https://webdesignday.jp/inspiration/technique/css/7976/)

`object-fit: fill`  
object-fitはCSSだけで画像をコンテナーにフィットさせてトリミングもできるプロパティ

## fit-content

[参考URL](https://pulpxstyle.com/fit-content/)

`width: fit-content`

## calc()

[参考URL(コリス)](https://coliss.com/articles/build-websites/operation/css/how-calc-works-by-ire.html)

calc()は計算された値がブラウザに反映されるのではなく**ブラウザによって解析された値が実際のcalc()の計算式となる。**
これはブラウザにおける値がより動的になり、ビューポートの変更に合わせて適応できることを意味する（都度計算される）
たとえば、ビューポートの高さから絶対値を引いた要素をビューポートの変更に合わせて適応させることができます。
