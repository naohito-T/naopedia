# JavaScript


## CommonJSとESModule

CommonJS
まだECSでモジュールシステムが導入されていないときにnodeで実装したモジュールシステム

ESM
実質のJSの仕様を策定するもの。

[CommonJS と ES6の import/export で迷うなら](https://qiita.com/rooooomania/items/4c999d93ae745e9d8657)

---

js の演算子ドキュメント
[リファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Expressions_and_Operators)

## JS 配列メソッド一

[JS 配列メソッド一覧がすぐ見えるサイト](https://www.wakuwakubank.com/posts/280-javascript-array-helper/)


## async await



```js
// axiosでjson取得
export const ApiGet_Simple = (async (url:string) => {
  try {
    // 指定URLにGET
    const res = await axios.get<jsonType[]>(url);
    // (↑のawaitがついていると関数が実行完了するまで↓を動作しない仕組み)
    // 動作が完了して、リターンしてきたjsonを返す
    return res;
  } catch (err) {
    // 途中でエラーが出たら強制でエラーをスロー
    throw new Error(err.status);
  }
});
```

## Optional Chaining

[参考URL](https://zenn.dev/lollipop_onl/articles/eoz-ts-ncoc-transpile)

obj?.fooというのはおおよそobj != null ? obj.foo : undefined
Optional Chaining は undefined もしくは null な値のプロパティをランタイムで安全に参照できるようにするシンタックスです。

```js
const foo: any = {};

foo.bar.baz;
// js: TypeError: Cannot read property 'baz' of undefined

foo.bar?.baz;
// js: undefined
```

## Nullish Coalescing ??

Nullish Coalescing は値が undefined もしくは null のとき、フォールバックとして別の値を返せるようにするオペレータ

```js
undefined ?? 'fallback';
// js: 'fallback'

null ?? 'fallback';
// js: 'fallback'

'hello' ?? 'fallback';
// js: 'hello'
```

これまで || を使用していた初期値代入のうち、0 や false といった Falsy な値を正常値として扱いたいときに Nullish Coalescing で置き換えられます。

```js
0 || 'fallback';
// js: 'fallback'
0 ?? 'fallback';
// js: 0

false || 'fallback';
// js: 'fallback'
false ?? 'fallback';
// js: false
```

## in 演算子

[リファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/in)

in演算子は、指定されたプロパティが指定されたオブジェクトにある場合にtrueを返す.

```js
const car = { make: 'Honda', model: 'Accord', year: 1998 };

console.log('make' in car);
// expected output: true
```

