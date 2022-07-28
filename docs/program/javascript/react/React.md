# React

---

## React hooks

[基本的なReact Hooksについてまとめた](https://yutaro-blog.net/2021/09/15/react-hooks/)

>フック (hook) は React 16.8 で追加された新機能です。state などの React の機能を、クラスを書かずに使えるようになります。

### useState

関数コンポーネントでstateを管理するためのフック

**特徴**
- stateはコンポーネント内部でしか使えない
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

基本的にはあまりRefに頼らないようにと言われている。
コンポーネントに親子関係がある場合、基本的に子コンポーネントの詳細は隠蔽されていますが、Refを利用すると親が子の詳細を知らなくてはならない=依存関係が生まれてしまうためですね。

## 状態管理

>Reactにおける状態管理の方法論は、さまざまな道を辿ってきました。ある人はReduxを使い、またある人はMobXを、またある人はuseContextで物事を解決してきたでしょう。

今まではRedux + middleware
最新はRecoil。Redux + middleware周りのすべてをまるっと置き換えてくれる

**Recoil**

- アプリケーション内に複数のデータストアを持てる
- 非同期対応
- React hooks前提


recoil-persistはデフォルトだとlocalStorageに保存されますがstorageオプションを設定することで任意のStorageを利用することができる。

## Suspense

React 18で導入された。
コンポーネントをローディング中のためまだレンダリングできない状態にする。

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


