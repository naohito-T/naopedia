# web

webでのデザインをまとめていく


## checkbox

- 覚えておくべきこと
HTMLのinputタグを使ってチェックボックスを作成する場合**チェックボックスの形や色などをCSSで指定することはできない**
チェックボックスをカスタマイズする方法として、一旦チェックボックスの標準スタイルを無効にして好みのチェックボックスを作成する方法。

- 無効にしカスタマイズする手順
[参考URL](https://proengineer.internous.co.jp/content/columnfeature/6493)

1. display: noneをinputに設定

```css
input[ type=checkbox] {
    display: none; /* checkboxを非表示にする */
}

```

2. チェックボックスのラベルに装飾する.




