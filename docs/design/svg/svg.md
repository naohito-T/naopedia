# SVG(スケーラブル・ベクター・グラフィックス Scalable Vector Graphics)

[SVGの基本的なこと](https://www.webdesignleaves.com/pr/html/svg_basic.html)
[10分でわかるSVGの基本的なこと2](https://atmarkit.itmedia.co.jp/ait/articles/1206/01/news143.html)

SVGは画像フォーマットの一種
SVGファイルはその名の通り、ベクタ形式のデータ。
画像ファイルであるSVGだが、**XMLに準拠しておりテキストエディタで編集ができる**
SVGという画像フォーマットはその中身はXMLファイル。XMLでこう書いたらこういう画像になるというルールが決められており、それが標準になったため今SVGとして広く知られている。

## SVG歴史

実はSVGの規格自体はかなり以前から存在したのですが、長らくInternet Explorer（以降IE）からのサポートが得られず、利用が広がらなかった。
しかし、そのIEも最新のIE9でSVGに正式対応し、利用環境が整いつつある。
拡大してもジャギーが出ないSVGのベクトルグラフィックスは、さまざまな解像度への対応が望まれるモバイル機器向けのサイトや、最近はやりのレスポンシブデザインにうってつけです。今後はHTML、CSSに並ぶ重要なWeb技術として普及していくことでしょう。

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

## SVG名前空間の宣言について

**<svg> はSVGのルート要素で、HTMLにおける <html> に相当する**
このタグ内の xmlns 属性の値に、SVGの名前空間 http://www.w3.org/2000/svg が宣言されることで <svg> 要素の配下でSVG固有のタグが利用できるようになる。
たとえば a 要素は通常の html にも svg にも存在しますが、このネームスペース配下に置くことで html と混ざることなく SVG の a 要素として使うことができます。

ちなみに、SVG の名前空間で使われている http://www.w3.org/2000/svg はURLですが、ただの識別子の文字列です。 URLの参照先自体には意味はありません。
URLは1つの場所しか示さないので、ID（名字）として利用されているのが慣習のようです。

## SVG モーフィング

モーフィングとは、**ある図形から別の図形へと自然に変形するように中間の画像を補正して映像を見せる**技法
Flashでは「シェイプトゥイーン」でモーフィングを表現していた。
CSS3のアニメーションだと、**画像の移動・回転なんかはできちゃいますが、形そのものを変形させるのは難しい**
SVGを使えば、そんなアニメーションも作成可能

![svg](../animation/images/svgモーフィング.png)
![Toon Boom](https://blog.toonboom.com/ja/-%E3%83%A2%E3%83%BC%E3%83%95%E3%82%A3%E3%83%B3%E3%82%B0-%E3%81%A8%E3%81%AF%E4%BD%95%E3%81%8B%E8%A4%87%E9%9B%91%E3%81%AA%E5%8B%95%E3%81%8D%E3%81%8C%E3%83%8C%E3%83%AB%E3%83%8C%E3%83%AB%E3%81%AB%E3%81%AA%E3%82%8B)

---

## viewPortとviewBox

[参考URL](https://kde.hateblo.jp/entry/2019/12/18/013054)

svgにはviewPortとviewBoxという概念がある。
viewPortは**SVGの世界を見るための窓**で、窓の大きさは**svg要素の width と height 属性で決まる。**
viewBoxは、窓の中に**SVGのどこからどこまでを収めるか** を指定します。

### viewPort

viewPortの大きさはwidth、height属性で絶対単位での指定で決まる。
**※別途CSSで指定・上書きが可能**

### viewBoxについて

viewBoxについてもっと詳しくいうと、viewBoxはSVGの内容を表示させる「表示領域」と図形の配置や大きさの基準となる「座標系」を定義します。
viewBoxの指定は下記のように、viewBox="X座標の最小値 Y座標の最小値 X軸の幅 Y軸の高さ" と記述します
**※単位は指定しない**


---

## SVGの表示方法(HTMLでの表示方法)

SVGを表示するのには、さまざまな書き方がある。
1, 2は画像要素となり、**SVGタグ内のpathに対してcss, jsが効きません**
4はiframeのように別documentになりcss, jsはそのdocumentに対して適用させる必要があります

1. imgタグでsvg画像ファイル読み込み
2. cssでsvg画像ファイル読み込み(background-imageプロパティでファイルを読み込む)
3. インライン(htmlにインラインで直接SVGタグを記述する)
4. object要素のdata属性でファイルを読み込む

Nuxtでは`<use></use>`タグの挙動を奇妙だといっており推奨されていない。

```html
<!-- <img>のsrcでファイルを読み込む -->
<img src="hoge.svg">
```

```css
/* cssでsvg画像ファイル読み込み(background-imageプロパティでファイルを読み込む) */
div {
  background-image:url("hoge.svg");
}
```

```html
<!-- インライン(htmlにインラインで直接SVGタグを記述する) -->
<div>
  <svg width="" height="" viewBox="">
    <!-- 略 -->
  </svg>
</div>
```

```html
<!-- object要素のdata属性でファイルを読み込む -->
<object id="mySvg" data="hoge.svg" type="image/svg+xml"></object>
<script>
// 4を操作するjs
var svg_doc = document.getElementById('mySvg').contentDocument;
var $svg = $(svg_doc).find('svg');
</script>
```



**1 最も基本なobjectタグ**
HTML内のSVG画像を表示したい箇所にobjectタグを挿入し、type属性に「image/svg+xml」を、data属性に表示するSVGファイルのURLを指定します。この方法は最も互換性が高く、SVGをサポートしたほぼすべてのWebブラウザで動作します。JavaScriptによるSVGドキュメントへのアクセスも可能です。特に理由がなければ、外部SVGファイルの表示にはこの方法を使用するのが無難

```html
<object type="image/svg+xml" data="sample/sample01.svg">
```

---

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

---

## SVG CSSプロパティ一覧

[SVGタグ一覧](https://qiita.com/takeshisakuma/items/777e3cb0a54ea7b1dbe7)
[参考URL](https://ferret-plus.com/7522?page=2)

- viewBox
[参考URL](https://www.indetail.co.jp/blog/13002/)

viewBoxはsvgタグの中に記述する属性
viewBoxを指定することで描画エリアのアスペクト比、及びその中の要素の相対的なサイズを指定する

viewBoxで指定できる値は4つです。
`viewBox="x, y, width, height"`
x,yは左上からみたx座標とy座標の位置、そしてwidth,heightは描画エリアの幅(座標値)と高さ(座標値)です。

```html
<!-- widthとheightはブラウザで見える実際の表示エリアになる。 -->
<svg width="400" height="400" viewBox="0, 0, 400, 400" style="background: #eee">
  <circle cx="50" cy="50" r="50" fill="blue" />
</svg>
```

## SVG タグ一覧

- g
他のSVG要素をグループ化するために用いられるタグ
`<g>`要素に適用された変形はその全ての子要素に対して実行されます。適用された属性は子要素に継承されます。加えて、多数のオブジェクトを グループ化しておくと後に`<use>`要素で参照することができる。

[参考URL](https://ferret-plus.com/7522)

```html
<!-- この中に上の参考URLのタグを入れると、簡単に描画ができる -->
<svg></svg>
```

## SVGをアニメーションで動かすには

SVGを動かすにはCSSアニメーションやJS、JQueryなどを使う方法があるが最も簡単なのは@keyframesでアニメーションのセットを作成し、pathやcircleといったSVGの構成要素にanimationプロパティを指定すること。



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
