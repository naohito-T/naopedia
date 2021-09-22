# DOM api

jsはDOMの操作apiがかなり多いため、備忘録として学んだことを記す

## 要素に設定されているstyle属性を知りたい場合。

- window.getComputedStyle()

[参考URL](https://qiita.com/amamamaou/items/bb79bec002a6ff033810)

>window.getComputedStyle() メソッドは、要素に適用されたスタイルの値を基本的な値に計算しなおした後、すべてのCSSプロパティの値を返します。

※font-size: 1em;となっていた場合もその要素のサイズも計算されて返す
