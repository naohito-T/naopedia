# React

## Hooks

コレが現在の主体

[主要なhooks参考](https://qiita.com/seira/items/0e6a2d835f1afb50544d)
## useState

関数が状態を持てるようになる.

関数とは？もともとの定義って決まった処理を返す。じゃなかったっけ。
それに状態をもたせるようにした。
一番トップのコンポーネントでuseStateを宣言して子コンポーネントで共有する。
→用は一つの関数内で状態を管理する。

## useEffect

関数内のある状態に着目して処理をほどこす。
watchだね。

## useRef

関数コンポーネントでは、Classコンポーネント時のref属性の代わりにuseRefを使って要素への参照を行う。
※useRefではuseStateのようにコンポーネント内での値を保持することができる。

- DOMの参照例

```js
const App = () => {
  const inputEl = useRef(null);
  const handleClick = () => {
    inputEl.current.focus();
    console.log("inputEl.current:", inputEl.current);
    // console.log → inputEl.current: <input type="text">
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={handleClick}>入力エリアをフォーカスする</button>
    </>
  );
};
```


## useStateとuseRefの違い

>コンポーネントの再レンダリングはしたくないけど、内部に保持している値だけを更新したい場合は、保持したい値をuseStateではなく、useRefを利用するのが良さそうです。




## ReactRouter

[参考 URL](https://ajike.github.io/react-router-dom_hooks/)
ReactRouter が Hooks に対応した history 周りが使いやすくなった。

- useParams
  動的な id などのパラメータ値を扱うことができる。
  `:id`のように pass 指定をトップで取得すれば使用できる。

## material-ui

[9個のfree_templateがある](https://mui.com/getting-started/templates/)
