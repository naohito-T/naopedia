# tips

codingの普遍的なTipsを記録する

## 連想配列と配列

基本的に配列は前から順番に検索するため時間がかかる。
連想配列はインデックスを貼るため検索が早くなる。

## 配列操作

- 配列からランダムに値を取得


- 任意の要素数の配列を作る方法
[参考URL](https://ginpen.com/2018/12/10/create-array-with-specified-length/)

- 配列・多次元配列からランダムに値を取得する方法
[参考URL](https://1-notes.com/javascript-get-values-randomly-from-an-array/)

考えること
用は配列の中身をランダムに取得すれば良い話。
index部分をランダムにする
`Xxx[n~nx]`

## Tips

- Math.floor()
与えられた数値以下の最大の整数を返す。
```js
console.log(Math.floor(5.95));
// expected output: 5

console.log(Math.floor(5.05));
// expected output: 5

console.log(Math.floor(5));
// expected output: 5
```

- Math.random()
0以上1未満（0は含むが、1は含まない）の範囲で浮動小数点の擬似乱数を返す
```js
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

console.log(getRandomInt(3));
// expected output: 0, 1 or 2

console.log(getRandomInt(1));
// expected output: 0

console.log(Math.random());
// expected output: a number from 0 to <1
```