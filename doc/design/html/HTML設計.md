# HTML

## プロジェクトのHTML / CSSスタイルガイドはGoogleを参考にする

[Google](https://google.github.io/styleguide/htmlcssguide.html)

## コーディング考え方

- メンテナンス性が高いHTMLとCSSを書く
HTMLのコーディングではメンテナンス性を高くすることが何より大切
メンテナンス性のポイント
わかりやすい
探しやすい
再利用しやすい
拡張しやすい

- 増やすより減らす
HTMLを追加、あるいはCSSを上書きしてデザインを修正したくなった経験は誰にでもある
そのような場面ではHTMLとCSSを減らすことで対応できないかを考える


## コーディング理論

[参考URL](https://hep.eiz.jp/html-css-coding/)

1. 横幅のブレイクポイント

- BootStrapを参照にする。

> Bootstrap(Ver.3)では、768px未満をスマートフォン、992px未満をタブレット、1,200px未満を中型デスクトップ、1,200px以上を大型デスクトップに分類してブレイクポイントが設けられています。

2. HTML5, CSS3の対応状況を確認できる。

ブラウザごとにHTML5, CSS3の対応状況を調べる
[調べれるサイト](http://caniuse.com/)

3. box-sizingで要素の幅と高さにpaddingとborderの幅と高さを含めるオマジナイ

>widthやheightと一緒にborderやpaddingを指定すると、意図しない表示崩れが起きることがある。これは幅や高さの算出方法によるものだが、下記のように記述することでそこら辺を意識せずにpaddingとborderの幅を要素の幅と高さに含めることができる。

```css
*, *:before, *:after {
    box-sizing: border-box;
}
```

4. flexでコーディングすること

縦横中央

```scss
.center {
  display: flex;
  // 縦中央
  align-items: center;
  // 横中央
  justify-content: center;
}
```

5. calcを使用する
calcを使うと幅の値を細かく計算せずに調整ができるため使用する

.hoge {
  width: calc(50% - 1px);
}

6. font-sizeをあわせる

[font-size指定](https://qiita.com/kiyodori/items/722c8001190b0922dabb)

```scss
// defaultのCSSをリセットする
h1,h2,h3,h4,h5,h6 {
  font-size: 100%;
}
// ベースフォントを10pxにする
html {
  font-size: 62.5%;
}
```

7. reset.cssとnormalize.cssを使用する

>コーダーを悩ますことの１つに、ブラウザ毎の表示差異があるわけだが、それを初期化するリセットCSSと、初期化ではなくなるべく正常化した形で使おうってのがノーマライズCSS

8. marginの上下はbottomのみに適用すると楽

margin-topの事を考える必要がなくなる

9. フォームのボタン要素をリセット

フォームボタンでCSSを適用しようとしても、意図した通りにならないバグがあるらしいので、それをリセット。

```css
input, button {
  -webkit-appearance: none;
}
```

10. キャピタライゼーション

HTMLとCSSのプロパティ値を小文字にする。

```css
/* 非推奨 */
color: ＃E5E5E5;
/* 推奨 */
color: ＃e5e5e5;
```

11. CSSのネストは孫まで

`親 > 子 > 孫`

12. CSSのレンダリング速度は考える必要はない。

> CSS の書き方によりレンダリング速度へ影響する差はほとんど存在しないか、存在してもごく僅かです。 CSS はもっともパフォーマンスが良い書き方と、もっとも悪い書き方を比較しても、レンダリング速度に0.1秒程度しか差がでません。
> CSS のレンダリング速度を考える場合、まずはブラウザの基本的な挙動を知る必要があります。

- ブラウザは CSS を右から解釈する

13. JavaScriptからアクセスするIDとクラス

JavaScript から ID もしくはクラスを利用する場合は、ブロック名の前に js- をつける。
js- がついたクラスは CSS のファイルには記述せず、デザインのスタイルをあてないようにします。これはスクリプトとデザインで使用されているクラスを明確に分けるためです


