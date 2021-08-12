# Vue

[Vue3 リファレンス](https://v3.ja.vuejs.org/)

## ユビキタス ubiquitous

プロパティ → props のこと
this → Vue インスタンス
context → Vue インスタンス生成前のインスタンス,Store インスタンス
リアクティブ → `html <template></template>`から値を変更した時に Vue インスタンス内のプロパティも変更できること

## Vue の this と Context

this 現 Vue インスタンスを指定するとき
context まだ Vue インスタンスが作られる前に Vue インスタンスを使いたいとき、Store メソッドを使いたいとき

## Vue ref

```js
const currentPage = ref(0);
currentPage.value = page.value;
isRef(currentPage); // true 代入ではリアクティブは失われない。
```

## Vue Reactive

```js
const navState = reactive<{
      pager: number[];
    }>({
      pager: [],
    });
const pages = [];
for (let i = 0; i < displayPage; i++) {
  pages.push(num + i);
}
navState.pager = pages; // 上書き
console.log(`navState.pager が reactiveか: ${isReactive(navState.pager)}`); // true
// 配列上書きではreactiveは失われない。
```

## Vue リアクティブになる基本

[リアクティブ関連メソッド一覧](https://qiita.com/ryo2132/items/6dc51ede8082dea75812)

[参考 URL](https://qiita.com/neutron63zf/items/506c7493a53cea44860e#vue-next%E3%81%AE%E3%83%AA%E3%82%A2%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0)

vue では data()内に宣言された値に対して、mount 時に get と set を設定する。その設定により、変更がかかった時に再度仮装 DOM を描画する処理が走る。

リアクティブ性というのは、
プロパティが変更されたらそれを検知してそのプロパティが使用されている関数を自動的に再計算すること
と言い換えることができます。つまり、これを実現するには

プロパティ毎にそのプロパティがどんな関数で使われているかを保存しておく
そのプロパティの更新時に関連する関数を全て再計算する
機能があれば良いわけです。どうですか？なんだかできそうな気がしてきませんか？

## Vue のリアクティブシステム

[参考 URL](https://mya-ake.com/posts/vue-composition-api-columns/)

## Vue のリアクティブシステムの落とし穴

完結に言うと、Vue では配列とオブジェクトはリアクティブにならない
配列の上書きでまず書学者はつまずく
配列の中に新たなプロパティを生やそうとしても、Vue.js はそれを監視していないため、値の更新検知や再描画ができないよ。新しくインスタンスを作ってあげてね。ということでした。

[参考 URL](https://blog.3streamer.net/vue-js/howtochange-array-812/)

```js
let arr = [1, 2, 3];
let arr2 = [4, 5, 6];
arr = arr2; // ここで新たな参照値になる期待をする
console.log(arr); // しかし上書きされない [1, 2, 3]
```

### Vue 配列操作

- 配列のコピー

```js
// slice() 引数無しでコピーができる
const copy = app.$stores.user.purchasedTicket?.slice();
const totalTicket = copy?.pop()?.tickets_count;
```

## コンポーネント

[参考 URL](https://jp.vuejs.org/v2/guide/components-props.html#%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%AE%E5%9E%8B)

コンポーネントの基本中の基本を忘れないように
以下が一番基本のコンポーネント生成。いくら最新の vue, nuxt でのコンポーネント登録でもこれをやっていることに変わりはない。

> コンポーネントは名前付きの再利用可能な Vue インスタンスです。コンポーネントは再利用可能な Vue インスタンスのため data, computed, watch, methods, ライフサイクルなどの new Vue と同じオプションを受け入れる。

```js
// button-counter と呼ばれる新しいコンポーネントを定義します
Vue.component("button-counter", {
  data: function () {
    return {
      count: 0,
    };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
});
```

注意点
カスタムコンポーネントにした場合には data オプションは関数でなければいけない。

>  理由としては各インスタンスが返されるデータオブジェクトの独立したコピーを保持できるためです。

## Vue 単方向のデータフローの仕組み

> 全てのプロパティは子プロパティと親プロパティの間に単方向のバインディングを形成します。親のプロパティが更新されると子へと流れ落ちていきますが、逆向きにデータが流れることはありません。これによって子コンポーネントが誤って親の状態を変更すること(アプリのデータフローを理解しづらくすることがある)を防ぎます。

## Vue の props

原則として親の props から渡された、子 props は子自体で変更してはいけない。

> また、親コンポーネントが更新されるたびに、子コンポーネント内の全てのプロパティが最新の値へと更新されます。これは、子コンポーネント内でプロパティの値を変化させては いけない ことを意味しています。それを行った場合、 Vue は コンソールにて警告します。

## Vue 子 props の値を変更したい場合

> 1. プロパティを初期値として受け渡し、子コンポーネントにてローカルのデータとして後で利用したいと考える場合。 この場合、プロパティの値をローカルの data の初期値として定義することを推奨します:

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

> 2. プロパティを未加工の値として渡す場合。 この場合、プロパティの値を使用した算出プロパティを別途定義することを推奨します:

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

## Vue ハイドレーションとは

[参考 URL](https://zenn.dev/00_/articles/c5130802d384b8238e4c)

> ハイドレーションは、Vue がサーバー側でレンダリングされたマークアップを変換し、それをリアクティブにして、Vue からの動的な変更を反映できるようにするプロセス。

Vue が期待しているマークアップと、実際にレンダリングされた HTML が異なるとハイドレーションエラーとなる。

最終手段
client-only タグでラップしサーバー側でのレンダリングを避ける。

仕組み
開発環境では、
クライアントとサーバーでレンダリングされた DOM ツリーが一致していなくても、
既存の DOM を破棄して最初からレンダリングし直してくれています。
しかし本番環境では、
パファーマンスを最大化するためにこの機能は無効になっています。

また、ハイドレーションは最初にページがサーバーによってレンダリングされた時（初回リクエスト時）にのみ発生します。

## Vue props

props を直接変更してはいけない。なぜならあくまで受け取っているものだから
変更する場合には、大元の状態を変更しなければいけない。
普通の値だけではなく、関数を Props として渡すことができる。
状態は一番上のコンポーネントだけで管理し、これを変更するメソッドを Props として渡していく手法は一般的なものなので身につける。
