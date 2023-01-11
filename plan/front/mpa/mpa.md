# MPA(Multi Page Application)
[参考URL](https://www.azusuki.com/spa-mpa/)

従来のWebサイトの通信。

1. Webサイトを表示するために`GETリクエスト`をサーバーに送る
2. サーバーから`POSTレスポンス`として、HTMLが返ってくる
3. ブラウザで返ってきたHTMLを表示する（Webサイトが表示できる）
※MPAは上記を毎回、繰り返します。


## MPAでのスクロール復元挙動

>多くのMPA(Multi Page Application)では、ブラウザバック/フォワードを行った際にはスクロール位置はブラウザによって復元されます。こういった挙動が各ブラウザにいつからあるのかはわかりませんが、スマホでのブラウジング(特にスワイプ)との相性を考えると自然な挙動に思えます。この辺りの仕様についてはwhatwgでも明記されています。

ブラウザのhistory entryに格納されるstateには`scroll position data`というものがあり、scroll restoration modeがautoならscroll position dataをもとに`user agent`はスクロール位置を復元することができる」とされています。scroll restoration modeはhistory.scrollRestorationにauto(初期値)かmanualを代入することで設定できます。