# SVG(スケーラブル・ベクター・グラフィックス Scalable Vector Graphics)

[SVGの基本的なこと](https://www.webdesignleaves.com/pr/html/svg_basic.html)

SVGは画像フォーマットの一種
SVGファイルはその名の通り、ベクタ形式のデータ。
画像ファイルであるSVGだが、**XMLに準拠しておりテキストエディタで編集ができる**
SVGという画像フォーマットはその中身はXMLファイル。XMLでこう書いたらこういう画像になるというルールが決められており、それが標準になったため今SVGとして広く知られている。

## ベクタ形式とは

XMLをベースにした二次元ベクターデータで画像を描く
ベクターデータとは画像を**点の座標とそれを結ぶ線(ベクター、ベクトル)などの数値データをもとにして演算によって再現する方式**

## JPEGやPNGなどとの違い

JPEGやPNGは**ラスターデータ**に分類される。
ラスターデータはドット状のピクセルや要素が固まって一つの画像を表現しており、**拡大すると粗くなることが特徴**
一方、SVGは『ベクターデータ』に分類されます。点の座標で表現でき、数値のデータで構成されているため、画像を拡大・縮小しても画質を損ねません。また、テキストデータとして編集することもできます。

## SVGが向いていないこと

しかし、どんな場合でも万能に使えるわけではなく、多くの色を必要とする写真などはSVGの利用に向いていません。

多くの色調を使用している風景写真を、ベクターデータで滑らかに表示させようとすれば、膨大なデータ量を必要としてしまいます。Web上で写真を表示させたい場合、ラスターデータを利用するのが普通です。


## SVG モーフィング

モーフィングとは、**ある図形から別の図形へと自然に変形するように中間の画像を補正して映像を見せる**技法
Flashでは「シェイプトゥイーン」でモーフィングを表現していた。
CSS3のアニメーションだと、**画像の移動・回転なんかはできちゃいますが、形そのものを変形させるのは難しい**
SVGを使えば、そんなアニメーションも作成可能

![svg](../animation/images/svgモーフィング.png)
![Toon Boom](https://blog.toonboom.com/ja/-%E3%83%A2%E3%83%BC%E3%83%95%E3%82%A3%E3%83%B3%E3%82%B0-%E3%81%A8%E3%81%AF%E4%BD%95%E3%81%8B%E8%A4%87%E9%9B%91%E3%81%AA%E5%8B%95%E3%81%8D%E3%81%8C%E3%83%8C%E3%83%AB%E3%83%8C%E3%83%AB%E3%81%AB%E3%81%AA%E3%82%8B)

## SVGの表示方法

SVGを表示するのには、さまざまな書き方がある。

1. インライン
2. imgタグでsvg画像ファイル読み込み
3. cssでsvg画像ファイル読み込み
4. objectタグ

Nuxtでは`<use></use>`タグの挙動を奇妙だといっている。

## 画像ファイルを扱うときにおすすめな情報

SVGファイルを扱うときにおすすめなサイト

SVGOMGというサイトで、SVGのサイズを小さくしたりコードをスッキリキレイにしたり出来ます。おすすめです。

[参考URL](https://jakearchibald.github.io/svgomg/)


## SVGを画像化する

[参考URL](https://blog.asial.co.jp/1615)

1. SVG画像を作成する
2. XMLSerializerを使ってSVG画像のデータを取り出す
3. Canvasを使ってPNG形式に変換する

```js
var svg = document.querySelector("svg");
var svgData = new XMLSerializer().serializeToString(svg);
var canvas = document.createElement("canvas");
canvas.width = svg.width.baseVal.value;
canvas.height = svg.height.baseVal.value;

var ctx = canvas.getContext("2d");
var image = new Image;
image.onload = function(){
    ctx.drawImage( image, 0, 0 );
    var a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.setAttribute("download", "image.png");
    a.dispatchEvent(new MouseEvent("click"));
}
image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(svgData)));
```

## SVG指定

```html
<!-- view boxはデフォルトではviewportのサイズと同じ -->
<svg width="500" height="650"></svg>
```

## SVGすごさ

SVGはXMLがベースとなっており、HTMLファイル上で編集が可能です。ドローソフトを使わなくても、コードを記述して画像を表示させられる。

これだけで、四角が描かれる
```html
<svg width="100%" height="100%"><rect class="rect" x="400" y="300" width="100" height="100" fill="indigo" stroke="black" /></svg>
```

## SVG プロパティ

- g
他のSVG要素をグループ化するために用いられるタグ
`<g>`要素に適用された変形はその全ての子要素に対して実行されます。適用された属性は子要素に継承されます。加えて、多数のオブジェクトを グループ化しておくと後に`<use>`要素で参照することができる。

---

## SVGを使うときの注意

[参考URL](https://qiita.com/manabuyasuda/items/01a76204f97cd73ffc4e)

### 作成編

**サイズ削減**
オブジェクト→パス→単純化でアンカーポイントの数を最小化する（見た目を損なわない程度に留めます）
※**Illustratorではパスの単純化で対応ができる**

![](../animation/images/パス多い.png)
![](../animation/images/パス少ない.png)


### 正常に表示するためにすること

アートボードの座標は0,0(左上)を起点にする
文字データはアウトライン化する（アウトライン化をしないと<text>タグとして書き出されるため、環境によって指定したフォントで表示されない場合があります）
