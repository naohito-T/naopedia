# css

## ユビキタス

HEX形式: プログラムイメージ（コードとデータを表すの 16 進数列）をテキストで表現したもの

```css
/* HEX6桁 */
color: #e0e0e0;
/* HEX8桁 最後は透過 */
color: #E0E0E0E0;
```

## width

- 100% と auto の違い

> 【width:auto】の場合は、左右の余白 10px を含んで横幅 100%になります。 【width:100%】の場合は、左右の余白 10px を含まずに横幅 100%になるため、実際の横幅は 100%+20px（左右の余白分）になります。
例えば PC 版のコーディングから行うとして、width を px 指定したときなどはブレイクポイントを設けて SP 版用に幅を上書きする。この流れはよくあります。共に、親要素の幅に合わせるとういう意味では同じですが、padding や border を指定する場合にちょっと違ってきます。

Media Queries をつかって width を上書きする場合はこちらが便利です。
上の図を使って説明すると...boxA に padding:20px;があたっていて内側に boxb がある、と。
boxB に width:auto;を付与すると、boxB の幅は、以下になります。

width auto だと flex の justify がきく

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

### 親要素にFlexコンテナに指定するプロパティ

- flex-direction
row（初期値）… 子要素を左から右に配置
row-reverse … 子要素を右から左に配置
column … 子要素を上から下に配置
column-reverse … 子要素を下から上に配置

子要素の


## cssで動的に値を変更する方法 var()

基本、webなどでCSSを動的に使用するにはJSなどを使用する
しかし、CSSでも変数が使用できるとのこと

CSS変数を呼び出す var()関数は

>var() 関数は、プロパティ名、セレクター、またはプロパティ値以外のところでは使用できません。(使用してしまうと、無効な構文が生成されるか、もしくはその変数に接続していない値が生成されてしまいます。)


## 疑似クラス

`:root`
>CSS の :root 疑似クラスは、文書を表すツリーのルート要素を選択します。 HTML では、 :root は `<html>` 要素を表し、詳細度が高いことを除けば html セレクターと同等です。
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