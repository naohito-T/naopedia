# React Hooks

React HooksはReact 16.8で追加された新機能であり、stateなどのReactの機能をクラスを書かずに使えるようになる。

関数型コンポーネントについて
関数型の React コンポーネントにおいて、内部状態またはプロパティが変更されると、コンポーネントの関数が再実行されるからです。
関数型の React コンポーネントにおいて、関数の結果が前回の呼び出し時と異なれば、レンダリングが発生するからです。

## カスタムフック

[カスタムフック参考URL](https://qiita.com/sonatard/items/617f324228f75b9c802f)

useStateやuseEffectなどロジックは分離できる。
それをhooksフォルダに入れて分け、ファイル名の先頭にuseとつけるのが慣習とのこと。

>React Hooks以前は、ロジックの再利用がコンポーネントに依存してしまいロジック単独でのモジュール化が難しいという問題がありました。
>しかしReact Hooksのカスタムフックという独自のフックを作成する機能を使うことで、Viewに依存することなくロジックだけを再利用することができるようになります。

- 手順

1. hooksを書く場所について
/src/hooks/ﾅｲで
2. setXxxを関数でラップする(汎用性が上がるため)
3. イベントの型付け(eの型推論ができなくなるため型付けが必要となる。)


```ts
/**  カスタムフック example */

import { useState } from 'react';

export const useUserPage = () => {
  /** user判断 */
  const [user, setUser] = useState(false);
  /** user判定 */
  const isUser = () => {
    setUser(() => !user);
  };

  /** 自身 */
  const [localName, setLocalName] = useState('');
  const setLocal = (e: string) => {
    setLocalName(e);
    console.log(`localName${localName}`);
  };

  /** 相手 */
  const [remoteName, setRemoteName] = useState('');
  const setRemote = (e: string) => {
    setRemoteName(e);
    console.log(`remoteName${remoteName}`);
  };

  /** return */
  /** 最後にreturnで関数内で返してあげる */
  return { user, isUser, localName, setLocal, remoteName, setRemoteName };
};
```

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

- useEffect 無限ループ

>関数型の React コンポーネントにおいて、内部状態またはプロパティが変更されると、コンポーネントの関数が再実行されるからです。
>関数型の React コンポーネントにおいて、関数の結果が前回の呼び出し時と異なれば、レンダリングが発生するからです。

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

## useCallback

[参考URL](https://qiita.com/seira/items/8a170cc950241a8fdb23)

useCallbackはパフォーマンス向上のためのhook。メモ化したコールバック関数を返す。
>useEffectと同じように、依存配列(=[deps] コールバック関数が依存している要素が格納された配列)の要素のいずれかが変化した場合のみ、メモ化した値を再計算します。

- メモ化とは
メモ化とは同じ結果を返す処理について、初回のみ処理を実行記録しておき、値が必要となった2回目以降は前回の処理結果を計算することなく呼び出し値を得られるようにすること。


## useReducer

>配列やオブジェクトの一部を操作する場合のように前回の状態に依存した更新処理をする場合にはuseStateの代わりにuseReducerを利用することでより簡潔に記述することができる。

[参考URL](https://qiita.com/seira/items/2fbad56e84bda885c84c)

状態管理のためのhookで**useStateと似たような機能**。useStateはuseReducerに内部実装されている。

```ts
const [state, dispatch] = useReducer(reducer, initialState);
```

dispatchを実行すればレンダリングが走る.

- 使用例
例えば、レンダリングが走らないな。とか思ったときに強制的にレンダリングをかけたい場合

```ts
const [_, dispatch] = useReducer((boolean) => !boolean, false);
```
あとはdispatchを特定の場所で実行すればレンダリングがかかる。

## useContext

[React Context APIわかりやすい](https://gotohayato.com/content/523/)

**※コンポーネントの再利用をより難しくするため慎重に利用しなくてはならない。**
useContextとは、Context機能をよりシンプルに使えるようになった機能(JSのContextのスタックの概念)

**重要: useContextを呼び出すコンポーネントはコンテキストの値が変化するたびに毎回再レンダーされる。**

useContext()の使う前に、ReactのContext APIを理解する上で重要な3つの概念について理解するべき

1. Contextオブジェクト
2. Context Provider
3. Context Consumer

- Context オブジェクト
Contextオブジェクトとは、コンポーネントツリー上直接の親子関係にない(=ツリー上離れたところにいる)
コンポーネント間で同じ値を共有するための道具。**範囲が限定されたグローバル変数のようなものと理解する**

各ContextオブジェクトにはProviderとConsumerという2つのコンポーネントが備わっている

```ts
Context.Provider
Context.Consumer
```

- Context Provider
Context Providerとは、Contextオブジェクトが持つコンポーネントで**対象の値の利用可能な範囲を指定するために使うもの**
具体的には**コンポーネントツリー上でContext Providerの内側にある全てのコンポーネントからそのProviderに対応したコンテキストの値を利用できる。**

- Context Consumer
Context Consumerとは、Context Providerと同じくContextオブジェクトに備わったコンポーネントのひとつで**コンテキスト値を利用したい場合で使うもの**

Context Consumerを使えばコンポーネントツリーを外に見ていって一番近くにあるContext ProviderのContextに紐付けられた値にアクセスすることができる。

Context API とは、Context オブジェクトとそれに備わった Provider と Consumer 、この 3 つを提供するものです。

フックのひとつである useContext() はこの Consumer の代わりになるものです。 Consumer をそのまま使うと複雑になりがちな処理が useContext() を使うとシンプルに書けます。 今回は Consumer は使わず、この「 useContext() + Context オブジェクト + Provider コンポーネント」の組み合わせで Context API を利用する形を紹介します。

