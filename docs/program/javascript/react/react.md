# React
[onClickが2度呼ばれる](https://numb86-tech.hatenablog.com/entry/2019/10/19/175907)

---

## Error Boundary
[Error Boundary試せるサイト](https://playcode.io/1006344)

promiseのキャッチができない。

## React再レンダリング
[React の再レンダリングを防ぐ3つのパターン](https://zenn.dev/azukiazusa/articles/react-rerender-patterns)

基本中の基本  
Reactは以下条件の時再レンダリングされる。  
- コンポーネントのstateが更新された
- 親のコンポーネントが再レンダリングされた

パフォーマンス上で問題になるのは不必要な再レンダリングが実行されている場合。

### Reactの思想から外れないようにパフォーマンスチューニングをする

**stateを変更→関連するcomponentが再レンダリングの自動化**がReactの基本思想で、かつReactを使って得られる恩恵のひとつ。  
なので極力それに従った書き方をすべき。

恩恵 = 開発者が考えることが減る→構造の理解が楽になりバグも減る。

それで起きる性能問題はメモ化で解決するべき。メモ化で増える記述量はReactを使う以上甘受すべきものだし、性能問題との天秤は十分釣り合っている。
これがライブラリとしての基本思想なので、これから外れるとReact本体の変更に追従するのが大変になる可能性がある。それが表出した一つの例が



## 関数コンポーネントのレンダリング
[参考URL](https://www.hypertextcandy.com/when-hook-is-called)
- 内部状態またはプロパティが変更されると、コンポーネントの関数が再実行される。
- 関数の結果が前回の呼び出し時と同じであれば、レンダリングは発生しない。
- レンダリングが完了すると、useEffectが実行される。

## React hooks
[基本的なReact Hooksについてまとめた](https://yutaro-blog.net/2021/09/15/react-hooks/)

>フック (hook) は React 16.8 で追加された新機能です。state などの React の機能を、クラスを書かずに使えるようになります。

### useState
[「useStateの値を更新しても反映されない！」の解決方法](https://zenn.dev/syu/articles/3c4aa813b57b8c)

setStateで値が更新されるのは関数が呼び出された後。つまり関数内では新規の値にアクセスができず、再レンダリングの際に確認ができる。

useStateは状態と状態を更新する関数を返す
useStateのset関数はレンダリング後に更新される。
setterに関数を渡すと引数に最新の値が取得できる。

**特徴**
- ページをリロードするとstateはリセットされる（初期値になる）
- stateの値はセット関数を使って更新する
- stateが更新されるとコンポーネントは再レンダリングされる
- 再レンダリング後もstateの値は保持され、最新のstateの値を関数に渡す

### tips

[useStateで配列要素を追加・削除・変更する方法](https://qiita.com/itachi/items/4184b2afc35b55b45568)

### useRouter (Next.jsのみ)

以下をひとつにまとめたもの
useParams
useLocation
useHistory
useRouteMatch

## useCallback

useCallbackは**メモ化されたコールバック関数を返す**フックです。
使用用途はコンポーネントのレンダリング最適化によるパフォーマンス向上。

## useCallback と useMemoのパフォーマンス以外のメリット
[参考URL](https://zukucode.com/2021/06/react-useeffect-loop.html)

useMemoやuseCallbackはパフォーマンス対策として使用する記事が多いですが、useMemoやuseCallbackを使用することにより、依存関係をはっきりさせて、useEffectの予期せぬ処理を防ぐことができます。

## useEffect

useEffectは関数の実行タイミングを**コンポーネントのレンダリング後**に遅らせることができるフック（CSR動作、nuxtでのmountに近い）

```ts
useEffect(
  // 初回レンダリング後、再レンダリング後の処理
  () => {}
　// コンポーネントがアンマウントされた時の処理
  return () => {},
  []
)

// アンマウント後のみ処理したい場合
useEffect(
    () => () => {
      // 処理
    },
    [],
  )
```

## useContext

Contextの機能を簡単に使えるようにしたフック

Contextとは
- Reactにデフォルト搭載されたAPI
- グローバルなstateを管理できる
- stateなどのデータをpropsのバケツリレーで深い階層のコンポーネントに渡すことなく、データアクセスができる
- コンポーネントの再利用を難しくするため、慎重に使う必要がある


https://github.com/rpearce/react-medium-image-zoom/issues

## useRef
[useRefの基本的な使い方・活用術・注意点](https://qiita.com/cheez921/items/9a5659f4b94662b4fd1e)

参照を保持するためのhook。
`ref.current`の値を変更させているだけのため再レンダリングが走らない。
これが、useRefの最大の特徴、

基本的にはあまりRefに頼らないようにと言われている。
コンポーネントに親子関係がある場合、基本的に子コンポーネントの詳細は隠蔽されていますが、Refを利用すると親が子の詳細を知らなくてはならない=依存関係が生まれてしまうためですね。

refの動き
- DOMならdomエレメント
- それ以外ならクラスインスタンス
- インスタンスを持たないものにrefしてもこける

上記のため関数コンポーネントは
- 直接渡せない
- forwardRefによりスキップして下位コンポーネントへ渡せるようになる。
- これは単なる便利関数ではなく、Reactの内部で特殊に処理されている
- forwardRefを使いたくなければ_refみたいに名前よけする


### forwardRefs
[参考URL](https://zenn.dev/terrierscript/scraps/15ca11388f7424)



---

## 状態管理
[Reactステート管理比較考察(かなり詳しい)](https://blog.uhy.ooo/entry/2021-07-24/react-state-management/)
>Reactにおける状態管理の方法論は、さまざまな道を辿ってきました。ある人はReduxを使い、またある人はMobXを、またある人はuseContextで物事を解決してきたでしょう。

今まではRedux + middleware
最新はRecoil。Redux + middleware周りのすべてをまるっと置き換えてくれる

### useState + バケツリレー

Reactにおける基本的なステート管理は`useState`

メリット
ひとつのコンポーネント内で完結するようなステートならばuseStateは非常に適しており、他の選択肢はほぼないと言っていい。

デメリット
バケツリレーはただ子コンポーネントに渡すだけという責務を発生させてしまう
useState + バケツリレーはパフォーマンス上不利になる可能性があります。使用者までの途中のコンポーネントも含めて多くのコンポーネントが実際にpropsとしてステートを受け取るということは、（たとえReact.memoなどで再レンダリングを抑制していたとしても）ステートが変化した際にはそれらのコンポーネントが再レンダリングされることになります。
これにより、実際に必要なよりも多くのコンポーネントがレンダリングされることになります。

### useContext

useState + バケツリレーの問題点を避けたい場合、プレーンなReactで可能な選択肢としてuseContextの使用が挙げられます。useContextは、props以外でコンポーネント間の伝達を可能にする。
ただし**親から子という原則は維持**されます。

メリット
パフォーマンスの観点からは、useContextのほうがuseState + バケツリレーよりは有利です。なぜなら、useContextを使うことで、ステートが変わった際には本当にそのステートを使用しているコンポーネントのみが再レンダリングされるようになるからです。
コンポーネントツリーの頂点と使用者の間にある中間コンポーネントは、useContextを使っていなければ再レンダリングされません。
※ただし、デフォルトでは親コンポーネントが再レンダリングされた場合は子コンポーネントも自動的に再レンダリングされます。これを防ぐにはReact.memoを適切に使用する必要があります。この記事ではReact.memoを必要に応じて使用することを前提としています。

### Recoil

※状態の格納先は**atom**と呼ぶ。
- アプリケーション内に複数のデータストアを持てる
- 非同期対応
- React hooks前提
- デフォルトではlocalStorageに保存される（変更可能）

AtomからだけではなくSelectorからのsubscribeも可能。
Selectorを使うことで、複数のAtomのデータを合成して必要なデータを計算することも可能です。AtomとSelectorを総称して**RecoilState**と呼びます。

メリット
またReduxとは異なり**Dispatch-Reducerのような中間操作がなく+**コンポーネントから直接atomにアクセスできる他、UseRecoilStateだけで状態を設定・更新することも読むこともできます。Reduxに置き換えると、Actionだけで直接stateを更新できるイメージ。

## Suspense

React 18で導入された。
コンポーネントをローディング中のためまだレンダリングできない状態にする。

## Error Boundaries
[リファレンス](https://reactjs.org/docs/error-boundaries.html)

以前は、コンポーネント内のJavaScriptエラーがReactの内部状態を破損し、次のレンダリングで不可解なエラーを発生させていました。
これらのエラーは常に、アプリケーション コードの以前のエラーが原因で発生していましたが、Reactはコンポーネントでエラーを適切に処理する方法を提供しておらず、回復できませんでした。

>エラー境界の導入
UIの一部でJavaScriptエラーが発生しても、アプリ全体が壊れてはなりません。
Reactユーザーのこの問題を解決するために、React 16では**Error Boundaries（エラー境界）**という新しい概念が導入されました。

エラー境界は、子コンポーネント ツリーの任意の場所でJavaScriptエラーをキャッチし、それらのエラーをログに記録し、クラッシュしたコンポーネント ツリーの代わりにフォールバックUIを表示するReactコンポーネントです。エラー境界は、レンダリング中、ライフサイクル メソッド、およびその下のツリー全体のコンストラクターでエラーをキャッチします。

---

## styled-components

[styled-components基本](https://qiita.com/taneba/items/4547830b461d11a69a20)

使うメリットがなんだろうって考えた

ローカルスコープができる
cssの長い命名規則から解き放たれる


## React testing-library

[React testing-library で getByText, getByRole, getAllByRole を比較する](https://dev.to/kaede_io/react-testing-library-de-getbytext-getbyrole-getallbyrole-wobi-jiao-suru-2o26)




## Tips


### material-ui
[9個のfree_templateがある](https://mui.com/getting-started/templates/)


### onClick

[React.jsで、onClick時に任意の値を渡す](https://www.yoheim.net/blog.php?q=20180411)

## これ面白そう
[参考URL](https://qiita.com/FumioNonaka/items/be00620c14e8955ea869)
[これも面白い](https://liginc.co.jp/587025)