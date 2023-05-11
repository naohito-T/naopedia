# React Hooks
[主要なhooks参考](https://qiita.com/seira/items/0e6a2d835f1afb50544d)

React HooksはReact 16.8で追加された新機能であり、stateなどのReact機能をクラスコンポーネントを使用せず使えるようになるもの

## useState

**関数が状態**を持てるようになる。  
関数とは？もともとの定義って決まった処理を返すというものを理解しておくこと。  
それに状態をもたせるようにした。  
一番トップのコンポーネントでuseStateを宣言して子コンポーネントで共有する。

## useEffect
[useEffect が API 呼び出しを行うのに適していない理由](https://medium.com/wesionary-team/why-useeffect-is-a-bad-place-to-make-api-calls-98a606735c1c)

関数内の**ある状態に着目して処理**をほどこす。

### useEffect無限ループについて

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

コンポーネントの再レンダリングはしたくないけど、内部に保持している値だけを更新したい場合は、保持したい値をuseStateではなく、useRefを利用するのが良い。

## useReducer

>配列やオブジェクトの一部を操作する場合のように前回の状態に依存した更新処理をする場合にはuseStateの代わりにuseReducerを利用することでより簡潔に記述することができる。

[参考URL](https://qiita.com/seira/items/2fbad56e84bda885c84c)

状態管理のためのhookで**useStateと似たような機能**。useStateはuseReducerに内部実装されている。

```ts
const [state, dispatch] = useReducer(reducer, initialState);
```

dispatchを実行すればレンダリングが走る

- 使用例
たとえば、レンダリングが走らないな。とか思ったときに強制的にレンダリングをかけたい場合

```ts
const [_, dispatch] = useReducer((boolean) => !boolean, false);
```
あとはdispatchを特定の場所で実行すればレンダリングがかかる。

## useContext
[React Context APIわかりやすい](https://gotohayato.com/content/523/)  
[useContextでundefinedを抜く](https://medium.com/@rivoltafilippo/typing-react-context-to-avoid-an-undefined-default-value-2c7c5a7d5947)

**※コンポーネントの再利用をより難しくするため慎重に利用しなくてはならない。**  
useContextとは、Context機能をよりシンプルに使えるようになった機能（JSのContextのスタックの概念）

useContext() + Contextオブジェクト + Providerコンポーネント  
これがuseContextの正体

## Context APIについて


Context APIとは、Contextオブジェクトとそれに備わったProviderとConsumer 、この3つを提供するもの。  

フックのひとつであるuseContext()はこの`Consumer`の代わりになるものです。  
Consumerをそのまま使うと複雑になりがちな処理が`useContext()`を使うとシンプルに書ける。  

### useContext重要なこと

useContextを呼び出すコンポーネントはコンテキストの値が変化するたびに毎回再レンダーされる。

### useContextを理解するために

useContextを使う前に、ReactのContext APIを理解する上で重要な3つの概念について理解するべき

1. Contextオブジェクト
2. Context Provider
3. Context Consumer

- Contextオブジェクト
Contextオブジェクトとは、コンポーネントツリー上直接の親子関係にない（=ツリー上離れたところにいる）  
コンポーネント間で同じ値を共有するための道具。**範囲が限定されたグローバル変数のようなものと理解する**

各ContextオブジェクトにはProviderとConsumerという2つのコンポーネントが備わっている

```ts
Context.Provider
Context.Consumer
```

- Context Provider
Context Providerとは、Contextオブジェクトが持つコンポーネントで**対象の値の利用可能な範囲を指定するために使うもの**  
具体的には**コンポーネントツリー上でContext Providerの内側にあるすべてのコンポーネントからそのProviderに対応したコンテキストの値を利用できる。**

- Context Consumer
Context Consumerとは、Context Providerと同じくContextオブジェクトに備わったコンポーネントのひとつで**コンテキスト値を利用したい場合で使うもの**

Context Consumerを使えばコンポーネントツリーを外に見ていって一番近くにあるContext ProviderのContextに紐付けられた値にアクセスすることができる。  

## React パフォーマンス最適化API
[以下のは参考から](https://zenn.dev/nus3/articles/1978a344cfaa4d3359c1)
[useCallbackはとにかく使え](https://blog.uhy.ooo/entry/2021-02-23/usecallback-custom-hooks/)

3つある。
`React.memo`
`useMemo`
`useCallback`

- メモ化とは
メモ化とは同じ結果を返す処理について、初回のみ処理を実行記録しておき、値が必要となった2回目以降は前回の処理結果を計算することなく呼び出し値を得られるようにすること。

- 前提再レンダリングについて
自分の`state`が更新されたときに自分自身+使っている子コンポーネントが再レンダリングされる

- 注意
最適化のためのツールなので**過度な最適化**を避けるように啓蒙する言説がよく見られる。
すなわち、ちゃんと本当に最適化のために必要なところにだけこれらを使おうということ。
とくに`React.memo`は**propsが以前と変わっているかどうかを判定するためのオーバーヘッドがあるし、**useMemoやuseCallbackもフック呼び出しのオーバーヘッドがあります。 意味がないところでReact.memoを使うと、オーバーヘッドによりむしろ悪影響があるかもしれません。

>……とは言っても、実際に無駄なReact.memoの使用が悪影響になったという報告がデータ付きで上がっているのは、筆者は寡聞にして見たことがありません。 正直なところ、余計なuseMemoやuseCallbackが実際的なパフォーマンスに与える影響は基本的に無視できる程度であり、それ以外の論点から考察するのが筋が良いと思っています。 そこで、この記事ではuseCallbackとカスタムフックに焦点を当て、「設計」の観点から考察します。
>結論は、カスタムフックが関数を返すなら常にuseCallbackで囲めです

## React.memo
[React.memoを使ったレンダリング最適化入門](https://zenn.dev/nus3/articles/1978a344cfaa4d3359c1)
React.memoを使うと親から子コンポーネントに渡しているpropsが更新されない限り、子コンポーネントは再レンダリングされない。

### React.memo 化された子コンポーネントの props に callback 関数を渡したときの挙動

親で定義した関数を子コンポーネントに`props`として渡すと子コンポーネントを`memo`化しても再レンダリングされてしまう。

親がレンダリングされるたびに親で定義した関数も再生成されるため。
結果として子コンポーネントを`memo`化しても親の`state`が更新されると子コンポーネントも再レンダリングされてしまう。
その対策がuseCallback

## useMemo(React.memoとは違う)

依存配列で指定した値が更新された時に再レンダリングされる。
Reactが提供するパフォーマンス最適化のためのAPI。
useMemoで囲まれた関数コンポーネントはpropsが以前と変わっていない場合に再レンダリングが抑制される。
またuseMemoやuseCallbackは、関数コンポーネント内での値の再計算を抑制する効果を持ちます。

## useCallback
[参考URL](https://qiita.com/seira/items/8a170cc950241a8fdb23)

親がレンダリングされるたびに親で定義した関数も再生成されないようにuseCallbackで関数をメモ化する
>useEffectと同じように、依存配列(=[deps] コールバック関数が依存している要素が格納された配列)の要素のいずれかが変化した場合のみ、メモ化した値を再計算します。

※`useCallback`は`useMemo`のシュガーシンタックス（useCallbackは関数に特化していると認識していい）
>useCallback(fn, deps) は useMemo(() => fn, deps) と等価です。

### 処理内容
[useCallbackはとにかく使え！　特にカスタムフックでは](https://blog.uhy.ooo/entry/2021-02-23/usecallback-custom-hooks/)
```ts
const App: React.VFC = () => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    console.log("clicked!");
  }, []);

  return (
    <button onClick={handleClick}>button</button>
  );
};
```

>seCallbackは、初回の呼び出し（Appの初回のレンダリング）では渡された関数をそのまま返します。 よって、handleClickはconsole.log("clicked!");を実行する関数となります。 Appが再レンダリングされたとき、useCallbackの返り値としては初回レンダリング時のときの関数オブジェクトが再利用されます（useCallbackに渡された関数オブジェクトは今回は捨てられます）。 つまり、handleClickは初回のレンダリング時も2回目のレンダリング時も同じ（===の意味で等しい）関数オブジェクトになります1。 useCallbackを噛まさない場合は、handleClickは毎回新しく作られた関数オブジェクトとなるでしょう。

>逆の見方をすれば、useCallbackの使用に常に意味があるわけではないということです。 このように、**React.memoで囲われたコンポーネントに関数を渡すような場合でなければuseCallbackが無駄**ということになります。 useMemoやuseCallbackの使用に慎重になる人はこのような無駄を気にしているのでしょう。


## カスタムフック
[カスタムフック参考URL](https://qiita.com/sonatard/items/617f324228f75b9c802f)

コンポーネントのロジックを分割できる。  
※ルールとしてプレフィックスに`use`をつけないといけない  

>React Hooks以前は、ロジックの再利用がコンポーネントに依存してしまいロジック単独でのモジュール化が難しいという問題がありました。
>しかしReact Hooksのカスタムフックという独自のフックを作成する機能を使うことで、Viewに依存するこなくロジックだけを再利用することができるようになります。

### カスタムフックを作る理由

カスタムフックを作る理由は、普通の関数を作る理由とまったく同じ。  
すなわち責務の分離とかカプセル化。  
一度カスタムフックとして分離された以上、インターフェイスの内側のことはカスタムフック内で完結すべきです。  
カスタムフックを使う側はカスタムフックの内側のことを知るべきではなく、その逆も然りです。

