# css Design 集

設計集

animationプロパティの理解が必須になるため以下リンクを貼る
[参考URL](https://web-designer.cman.jp/css_ref/abc_list/animation/)
## 横からアニメーションで塗りつぶす

- 実装要件
対象のものと全く同じサイズの疑似要素を最初は横幅を0にしておき、hoverしたときに100%へと変更する
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
2. ke
