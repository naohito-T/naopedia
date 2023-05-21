# CSS Designまとめ

デザインを作るときに必要となるさまざまなdesign Tips

---

animationプロパティの理解が必須になるため以下リンクを貼る
[参考URL](https://web-designer.cman.jp/css_ref/abc_list/animation/)
## 横からアニメーションで塗りつぶす

- 実装要件
対象のものとまったく同じサイズの疑似要素を最初は横幅を0にしておき、hoverしたときに100%へと変更する
そのときにtransitionを入れればよい

## textをアニメーションで移動させる

- 実装要件
cssのanimetionプロパティが必要となってくる。
[参考URL](https://webparts.cman.jp/string/scroll/)

## ふわっと表示させる

[参考URL](https://qumeru.com/magazine/155)

CSSのみで要素をふわっと表示させるにはアニメーションを用いる必要がある。

```html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    p{
      text-align: center;
      margin-top: 50px;
      animation-name: fade;
      animation-duration: 1s;
      animation-iteration-count: 5;
    }

    @keyframes fade{
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
  </style>
</head>

<body>
  <div>
    <p>こちらの文字がフェードします。</p>
  </div>
</body>

</html>
```

手順

1. アニメーションさせたい要素にanimation-nameで適当な名前を設定する
2. @keyframesで流れを制御する。

ただこれだとトリガーがない。
画面を表示した瞬間に来る。
そのためトリガーとしてjsを使用する。

## グロー

[参考URL](http://foxcodex.html.xdomain.jp/Glow.html)

光を表現するエフェクトのひとつ。
ブラーに似ているが、ブラーが輪郭をぼかすのに対して、輪郭の外側にぼかしを作成する。
これにより、光源が光っていることによる光のにじみを再現する。
PhotoshopやIllustratorにおける光彩（外側）とほぼ同じものであると考えると分かりやすい。

## コンテンツが少ない量でもfooterを一番下に配置するCSSテクニック

[参考URL](https://coliss.com/articles/build-websites/operation/css/clever-sticky-footer-technique.html)

## 背景画像をブラウザいっぱいに表現するシンプルな最適テクニック

[参考URL](https://coliss.com/articles/build-websites/operation/css/css-responsive-full-background-image-by-sixrevisions.html)
