# Tips

色々な備忘録をまとめる

## 経過日数の取得

1. まずシリアライズ値を取得する
2. 1603119600 → 2020/10/20 00:00:00 こういうやつ
3. 現在と、過去の指定日のを用意(シリアライズ、タイムスタンプともいう)
4. それを引いた値をまた変換すれば差分がわかる。

## ランダムに配列から取得する

[乱数](https://programmercollege.jp/column/7169/)

```js

// Math.random() 0 ~ 1の少数を返す
// Math.floor 少数切り捨て


Math.floor(Math.random() * 10); // 1 ~ 10


// console.log(Math.random() * 10);
// → 6.864448721358887
// こうなるため、小数点切り捨てで整数が得られる
```

## カラーコードチェック

[参考URL](https://qiita.com/ck_sk42/items/f8119824ae49146ee91c)