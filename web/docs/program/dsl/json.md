# JSON

## JSONを返却するときの仕様
[参考URL](https://jsonapi.org/)

仕様が何個から策定されており、則るといい。

## JSON形式でのデータ型
[参考URL](https://sakapon.wordpress.com/2012/12/23/deserializejsondate/)

JSON形式では以下が定義されている。
- オブジェクト
- 配列
- 文字列
- 数値
- ブール値
- null

日付型はない。  
そのため"2012-12-24T14:59:59.999Z" のような文字列であっても、自動的にDate型に変換されることはない
