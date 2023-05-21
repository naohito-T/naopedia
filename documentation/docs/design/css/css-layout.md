# CSS Layout

CSSでLayoutを組むときに理解する

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