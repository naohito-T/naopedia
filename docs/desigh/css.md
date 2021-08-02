# css

# width

- 100% と auto の違い

【width:auto】の場合は、左右の余白 10px を含んで横幅 100%になります。 【width:100%】の場合は、左右の余白 10px を含まずに横幅 100%になるため、実際の横幅は 100%+20px（左右の余白分）になります。
例えば PC 版のコーディングから行うとして、width を px 指定したときなどはブレイクポイントを設けて SP 版用に幅を上書きする。この流れはよくあります。共に、親要素の幅に合わせるとういう意味では同じですが、padding や border を指定する場合にちょっと違ってきます。

Media Queries をつかって width を上書きする場合はこちらが便利です。
上の図を使って説明すると...boxA に padding:20px;があたっていて内側に boxb がある、と。
boxB に width:auto;を付与すると、boxB の幅は、以下になります。

width auto だと flex の justify がきく

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
