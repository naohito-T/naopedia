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

## JavaScriptの配列のmapでasync/awaitを使う方法

[参考URL](https://qiita.com/kwbt/items/6c0fe424c89a9f7553c1)

## Promise

[参考URL](https://qiita.com/ysk_1031/items/888a84cb259cec4e0625)

Promiseの状態
上述したとおり、Promiseには処理に応じた「状態」があり、次の3つのうちの1つになる

**pending:** 初期状態、まだ処理が成功も失敗もしていない
**fullfilled:** 処理が成功し、完了した状態
**rejected:** 処理が失敗した状態

## Promise.all()
Promise.all()は

all()の引数の配列内のPromiseの状態が全て fullfilled になったら、all()自体も fullfilled
1つでも rejected になると、all()も rejectedを返す。

## 非同期処理

非同期処理とは、ある関数が呼ばれた時に返り血として渡したい値を返すのではなく一度関数として終了し渡したい値を返せる状態になったら呼び出し元にその値を返すというもの。

## 非同期処理イメージ
>イメージとして電子レンジを思い浮かべると良いでしょう.
>電子レンジでおにぎりを温める時, 私たちはタイマーをセットして一旦待ちます. これが「関数として一度終了している状態」です.
>そして, 時間が経つとおにぎりが食べられる状態になります. これが「渡したい値を返せるよう状態になったらその値を返す」ということです.

