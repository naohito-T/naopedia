# Recoil
[Recoil入門](https://zenn.dev/yuki_yuki/articles/c3bac6943f70b6)
[Recoilの動きがわかりやすい](https://ics.media/entry/210224/)

## 大前提
[参考URL](https://tech.revcomm.co.jp/2022/05/23/scoped-state-with-recoilroot)
状態の取得だけであれば再レンダリングは走らない（useRecoilValue）
>私は Recoil を触る前は、 Context vs Recoil というイメージを持っていました。しかしその理解は少し違っていたみたいです。
>Recoil は Context を内部的に使っていて、 atom と selector をうまく活用することで再レンダリングを抑えているといった方が正しそうです。

## Recoil Root
[Recoil Rootをネストさせる](https://tech.revcomm.co.jp/2022/05/23/scoped-state-with-recoilroot)

What?
Contextでは小さく状態管理ができる。Recoilでもできないだろうか

落とし穴
`_app.tsx`はRecoilRootに囲われていないためRecoil関連が使用できない。

## Atom

※Atomはコンポーネント内で定義ができない。
Atomは状態管理するためのデータストアのことです。
AtomはkeyでAtomひとつひとつにユニークなIDを設定し、defaultで初期値を設定できます。

## method

`useRecoilState`
を使えば状態を取得、更新の両方が可能

`useRecoilValue`
取得だけしたい場合
```ts
// 取得だけの場合はuseRecoilValueを使用
const text = useRecoilValue(textState);
```

`useSetRecoilState`
更新だけしたい場合
```ts
// 更新だけの場合はuseSetRecoilStateを使用
const setText = useSetRecoilState(textState);
```

## Selector

※Atomが更新される度に再実行される。
SelectorはAtomのstateを加工した値を返したり、Atomのstateを加工して更新するなどの処理を可能にする。
Atom同様、keyでSelectorにユニークなIDを設定する。
getでstateを加工した値を返し、setでstateを加工して更新する。
defaultはない。

## Recoil Atom Effects
[Recoil Atom Effects](https://zenn.dev/riemonyamada/articles/ad38200a1c7fa3)

Atom EffectsがuseEffectと違う点はライフサイクルがコンポーネントでは無く、atomと紐づいているということ。
useEffectを使ったフックのように違うコンポーネントがつかうたびに実行されたりしません。
atomの初期化時に**一度だけ実行**されます。

また、Atom Effects functionはいくつかの便利な引数をとることができる。
とくに以下が重要です。

`setSelf`
自身の`atom`の値を更新するための関数。値かコールバック関数を引数にとる。

`onSet`
`atom`値の変更があるたび、引数に入れたコールバック関数を実行してくれる。
（ただし上記の`setSelf`で値を更新した場合は実行されない）

---

## Recoilを永続化する
[参考URL](https://sunday-morning.app/posts/2021-11-10-change-recoil-persist-storage-with-nextjs)

ページ間で値を共有できるようになったが、ブラウザを更新したら値は消えてしまう。
Recoilには永続化の仕組みが備わっているが、少々煩雑なのでrecoil-persistというモジュールを利用する。

ページをリロードしても状態を保持しておきたい場合に使用する。
`recoil-persist`を使用するとのこと

## recoil-persist

デフォルトだとlocalStorageに保存される。
storageオプションで任意のStorageを利用できる

---

## Recoilに初期値を与える
[参考URL](https://nulab.com/ja/blog/nulab/recoil-sync/)

Atomに初期値を入れたい場合は`useEffect`でセットするしかなかった。
しかしRecoil開発チームから`Recoil Sync`というパッケージが導入された。それで対応が可能になる。

---

## Tips
[Next.jsでMUIとRecoilを用いたダークモードの実装](https://www.fourier.jp/techblog/articles/dark-mode-with-nexthjs-mui-recoil-localstorage/)