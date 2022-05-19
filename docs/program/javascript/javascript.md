# JavaScript

[JavaScriptの全ての仕組み](https://ja.javascript.info/)

---
## CommonJSとESModule

## CommonJS : nodeのやつ require

まだECS(ESModule)でモジュールシステムが導入されていないときにnodeで実装したモジュールシステム
CommonJSではブラウザ上だけでなく、サーバーサイドやクライアントでのCUI、GUIでJavaScriptを使う際の仕様を作成している。
単に仕様を作っているだけなので、ECMAScriptに組み込まれるとかがない限り、それがJavaScriptの標準になるというわけではない模様
>ちなみに CommonJS で作成された仕様は複数のソフトウェアによって実装が行われることで勧告段階に移るみたいです。
>CommonJS の仕様を実装しているソフトウェアの中にはあの有名な node.js があります。

## ESM(ECMAScript) : importのやつ

実質のJSの仕様を策定するもの。
**ECMAScript はブラウザ上での JavaScript の仕様と標準を作っている。**

[CommonJS と ES6の import/export で迷うなら](https://qiita.com/rooooomania/items/4c999d93ae745e9d8657)

---

jsの演算子ドキュメント
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

Optional Chainingはundefinedもしくはnullな値のプロパティを**ランタイムで安全に参照できるようにする**シンタックスです。

[参考URL](https://zenn.dev/lollipop_onl/articles/eoz-ts-ncoc-transpile)

```js

const a = obj?.foo;
// これと変わらない obj != null ? obj.foo : undefined
```

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

## jsの時間の求め方

jsではUNIXタイムスタンプに変更するのが一番良い

```ts
/**
 * @desc 来月の初日のticket終了時間をsetする
 * @example 来月の初日の 27:59:59 → 2021/10/01 03:59:59
 * @return unix timestamp
 */
Date.formatYumegraTicketLastTime = (month: number = 1): number => {
  const to = new Date();
  to.setMonth(to.getMonth() + month); // 来月の現在時間
  to.setDate(0); // 今月の末日
  to.setHours(27);
  to.setMinutes(59);
  to.setSeconds(59);
  return to.getTime();
};

/**
 * @desc その月の最終日付を返す(デフォルトで今月)
 * @param 1 2021/11/31 23:59:59 今月
 * @param 0 2021/10/31 23:59:59 先月
 */
Date.formatTicketCountLastTime = (month: number = 1): number => {
  const to = new Date();
  to.setMonth(to.getMonth() + month); //
  to.setDate(0); // 今月の末日
  to.setHours(23);
  to.setMinutes(59);
  to.setSeconds(59);
  return to.getTime();
};

```

## 分割代入

- 分割代入の時のデフォルト値が使われる基準

Falsyの時でもなく、undefinedの時のみ使われる。Nullishの時ではなくundefinedの時

[参考になる](https://qiita.com/righteous/items/157e6f0e633c42dbe331)
[参考になる](https://qiita.com/FumioNonaka/items/58358a29850afd7a0f37)


```js
const {a: {a1, a2}, b: {b1}} = {a: {a1: 1}, b: {}}
```

## 動的なプロパティ名

オブジェクトのプロパティ名は動的にすることができる。

```js
const type = 'id';
const item = {
  [type]: 'abcd01234';
};

console.log(item); // { id: 'abcd01234' }
console.log(item[type]); // 'abcd01234'
console.log(item['id']); // 'abcd01234'
console.log(item.id);    // 'abcd01234'
```

## 配列をオブジェクトに変換する

[参考URL](https://yukiyuriweb.com/2021/04/13/javascript-techniques-you-should-know/#i-2)

```js
const array = [1, 2, 3];
const object = { ...array };
console.log(object); // { 0: 1, 1: 2, 2: 3 }
```

## 最新のJS Tips

[参考URL](https://yukiyuriweb.com/2021/04/13/javascript-techniques-you-should-know/#i-2)

## ESLintとPrettierを合わせる意味

ESLint単体コードフォーマットが可能だが、Prettierでは整形できないコードも整形するため
**よくある動機としてはESLintに静的検証を行わせ、Prettierはフォーマットを担う**

- TypeScript対応

---

## ESLintについて

[今時のeslint設定](https://dev.classmethod.jp/articles/eslint-configurations-2020/)

## pluginsとextendsの違い

**plugins**
ルールセットを持つプラグインを指定する項目。 本来であれば plugins にプラグインを指定して、且つ extends にそのプラグインが持つルールを指定しないと検証時にルールが適用されないらしいが、prettier はなぜか plugins に指定しただけでルールが適用されてる。謎。

基本的には eslint-plugin-xxx というパッケージの xxx の部分を plugins に記述してあげればいいらしい。

**extends**
プラグインが提供するルールを指定する項目。 eslint-plugin-xxx というパッケージを plugins で指定した場合は、extends に xxx/yyy というふうにルールを指定してあげるらしい。

また、plugins は使わずに eslint-config-zzz というパッケージをインストールし、extends に zzz と指定してあげてもなんとかなるっぽい。



## ESLint 設定ファイル読み込み

ESLint の設定はいくつかの形式で記述できるが、それぞれ読み込みに優先度がある。優先度は以下の通り。

.eslintrc.js
.eslintrc.yaml
.eslintrc.yml
.eslintrc.json
.eslintrc
package.json


## file

- 存在確認

[fs/promiseでのファイル・ディレクトリ存在確認](https://thr3a.hatenablog.com/entry/20201220/1608390044)


## JS(感嘆符) 2つ

[!!感嘆符を使う意味](https://senews.jp/bikkuri-2/)

```js
if(!true){

    alert("trueです。");

}else{

    alert("falseです。");

```

```js

```
