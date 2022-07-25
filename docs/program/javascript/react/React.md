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


