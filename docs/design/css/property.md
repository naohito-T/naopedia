# CSS property 一覧

よくわからないプロパティを記していく

## linear-gradient()

liner-gradient()はCSSの関数で、２つ以上の色の連続的な直線に沿った変化から構成される画像を生成する
>結果は `<gradient>` データ型のオブジェクトであり、これは `<image>` の特殊型です。

```css
/* 45度に傾いたグラデーションで、
   青から始まり赤で終わる */

linear-gradient(45deg, blue, red);

/* 右下から左上に向かうグラデーションで、
   青から始まり赤で終わる */
linear-gradient(to left top, blue, red);
```

## @keyframes

animationプロパティと@keyfreamsを使うとCSSだけでアニメーションの設定ができる。
0%と100%の記述は必須ではない。


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
余白といえば、marginプロパティやpaddingプロパティを思い浮かべる方が多いが**CSS grid**やFlexboxでgapプロパティを使うと柔軟にレイアウトを組める

## trans
