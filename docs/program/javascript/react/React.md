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

useEffectは関数の実行タイミングを**コンポーネントのレンダリング後**に遅らせることができるフック

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






---

## Tips
### material-ui

[9個のfree_templateがある](https://mui.com/getting-started/templates/)


### onClick

[React.jsで、onClick時に任意の値を渡す](https://www.yoheim.net/blog.php?q=20180411)
