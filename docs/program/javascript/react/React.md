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

### useRouter (Next.jsのみ)

以下をひとつにまとめたもの
useParams
useLocation
useHistory
useRouteMatch

## useCallback

useCallbackは**メモ化されたコールバック関数を返す**フックです。
使用用途はコンポーネントのレンダリング最適化によるパフォーマンス向上。




---

## Tips
### material-ui

[9個のfree_templateがある](https://mui.com/getting-started/templates/)

