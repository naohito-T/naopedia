# CSS property 一覧

よくわからないプロパティを記していく

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

>marginやpaddingを変動値（%など）で設定している場合**変動値の最小値・最大値**を設定したいと思うはず。
>widthやheightであればmax-width、min-heightのように設定できますが、marginやpaddingにmin-paddingやmax-marginのようなプロパティはない。
>ではどうすればいいか、比較関数のmin()、max()、clamp()を使いましょう。

>※最大値はmin()、最小値はmax()とmin-width、max-widthの感覚と逆になるのでしっかり覚えましょう。

### min

`min()`はカンマ区切りで計算された最小の値が選択される。
**最大値**を設定したい場合はmin()を使う。

```css
/* marginの最大値を設定する */
.btn {
  margin: 20px min(20%, 50px) 0;
}
/* 20%の値が50px以内であれば20%が選択され、50pxより大きい場合は50pxが選択されます。 */
```

今までの書き方を変えることができる
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

今までの書き方を変えることができる
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
