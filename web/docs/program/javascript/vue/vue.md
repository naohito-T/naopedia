# Vue

[Vue3 リファレンス](https://v3.ja.vuejs.org/)  
[Vue2 スタイルガイド](https://v3.ja.vuejs.org/style-guide/#%E3%83%AB%E3%83%BC%E3%83%AB%E3%82%AB%E3%83%86%E3%82%B3%E3%82%99%E3%83%AA)  
[VsCodeが遅い](https://zenn.dev/tatsuhiko/articles/d7cedc5a1a3f5a)  
[nextTickの順番](https://wood-roots.com/web/vue-js/2707)

JSではローカル変数の再代入を追跡することはできない（その仕組みがないため）
ただし**オブジェクトのプロパティの変更は追跡することができる。**（jsのproxyを使用して）

## リアクティブ性とは

>リアクティブ性というのは、
>プロパティが変更されたらそれを検知してそのプロパティが使用されている関数を自動的に再計算することと言い換えることができます。つまり、これを実現するにはプロパティ毎にそのプロパティがどんな関数で使われているかを保存しておく、そのプロパティの更新時に関連する関数をすべて再計算する、機能があれば良いわけです。どうですか？なんだかできそうな気がしてきませんか？

## Vue リアクティブになる基本の仕組み

[リアクティブ関連メソッド一覧](https://qiita.com/ryo2132/items/6dc51ede8082dea75812)  
[参考URL](https://qiita.com/neutron63zf/items/506c7493a53cea44860e#vue-next%E3%81%AE%E3%83%AA%E3%82%A2%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0)

## Vue のリアクティブシステム

[参考 URL](https://mya-ake.com/posts/vue-composition-api-columns/)

## Vue のリアクティブシステムの落とし穴

[参考 URL](https://blog.3streamer.net/vue-js/howtochange-array-812/)

完結に言うと、Vueでは配列とオブジェクトはリアクティブにならない  
配列の上書きでまず書学者はつまずく  
配列の中に新たなプロパティを生やそうとしても、Vue.jsはそれを監視していないため、値の更新検知や再描画ができないよ。新しくインスタンスを作ってあげてね。ということでした。

```js
let arr = [1, 2, 3];
let arr2 = [4, 5, 6];
arr = arr2; // ここで新たな参照値になる期待をする
console.log(arr); // しかし上書きされない [1, 2, 3]
```

## @vue/composition-apiと@nuxtjs/composition-apiでのcontextの違い

[参考URL](https://zenn.dev/hogeihogemi/articles/94c0254372defd)

@vue/composition-apiでは**呼び出し時に context を引数として渡す**
@nuxtjs/composition-apiでは**呼び出された場所の context を useContext で取得できる**

## emit

[参考URL](https://note.com/vixer93/n/n85bd3a4e60ba)

親コンポーネントでイベントを登録しこれに反応して実行されるメソッドを定義すると、`@todoSubmit="addTodo" # addTodoのこと`addTodoの**第一引数には子からemitされた際に渡されたデータが入ります。**

## v-on

v-onディレクティブを使用することでHTMLの要素のイベントにイベントハンドラーのメソッドをバインド（紐付ける）して処理を行うことができる

**.once修飾子**
v-onディレクティブでバインドしたメソッドは、clickやchangeなどのイベントが発生するたびに実行されますが、アプリケーションの仕様によっては、イベントを初回の1回のみだけ実行したい場合があります。

.once修飾子をイベントに対して指定した時の動作は、イベントターゲットの要素にaddEventListener()メソッドでイベントリスナーを登録する際にaddEventListener()メソッドの第3引数のoptions に`{ once: true }`を指定した時と同様の動作になります。

## slot

親となるコンポーネント側から、**子のコンポーネントの一部に差し込む機能。**
3種類ある

デフォルトslotと名前付きslotがある。

## Vueの検知ができないパターン

**Vueでは遷移先が同一コンポーネント**である場合、**仮想DOM等の差分が検知できず→インスタンスを使いまわそうとするため、fetchすべきデータをうまく取得できない場合がある。**
そのためwatchなどでパラメーターを監視する必要がある（可変なパラメーターなどを監視する）

## v-model を正しく理解して親子間コンポーネントのデータ伝播をマスターする

[v-model を正しく理解して親子間コンポーネントのデータ伝播をマスターする](https://qiita.com/toshifumiimanishi/items/07c8e96eb6f8e50c5e27)


---

## set関連
## ref

```js
const currentPage = ref(0);
currentPage.value = page.value;
isRef(currentPage); // true 代入ではリアクティブは失われない。
```

## reactive



## 配列操作

JSの配列操作には破壊的と非破壊的があることを理解しておく

- 配列のコピー

```js
// slice() 引数無しでコピーができる
const copy = app.$stores.user.purchasedTicket?.slice();
const totalTicket = copy?.pop()?.tickets_count;
```

## コンポーネント

[参考 URL](https://jp.vuejs.org/v2/guide/components-props.html#%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%AE%E5%9E%8B)

**コンポーネントの基本中の基本を忘れないように**
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
カスタムコンポーネントにした場合にはdataオプションは関数でなければいけない。

>理由としては各インスタンスが返されるデータオブジェクトの独立したコピーを保持できるためです。

## Vue 単方向のデータフローの仕組み

> すべてのプロパティは子プロパティと親プロパティの間に単方向のバインディングを形成します。親のプロパティが更新されると子へと流れ落ちていきますが、逆向きにデータが流れることはありません。これによって子コンポーネントが誤って親の状態を変更すること(アプリのデータフローを理解しづらくすることがある)を防ぎます。

## Props

[【Vue3】CompositionAPIでpropsの変更を検知する](https://zenn.dev/tentel/articles/e52815dd33f328)

ある値を親から子へ伝播させたい場合はpropsを使う。
propsで渡された値は親の持ち物のため、子コンポーネント側で変化させてはいけない。
しかし、propsを直接参照してしまうと誤って変更してしまう可能性がある(特に配列やオブジェクト)

**props を直接変更してはいけない。なぜならあくまで受け取っているものだから**

変更する場合には、大元の状態を変更しなければいけない。
普通の値だけではなく、関数をPropsとして渡すことができる。
**状態は一番上のコンポーネントだけで管理し、**これを変更するメソッドを Props として渡していく手法は一般的なものなので身につける。

propsのTypesは以下に限定されている
String
Number
Boolean
Aarray
Object
Date
Function
Symbol

原則として親の`props`から渡された、子`props`は子自体で変更してはいけない。
親の`props`を変更

> また、親コンポーネントが更新されるたびに、子コンポーネント内のすべてのプロパティが最新の値へと更新されます。これは、子コンポーネント内でプロパティの値を変化させては いけない ことを意味しています。それを行った場合、 Vue は コンソールにて警告します。

## Vue ハイドレーションとは

[参考 URL](https://zenn.dev/00_/articles/c5130802d384b8238e4c)

> ハイドレーションは、Vue がサーバー側でレンダリングされたマークアップを変換し、それをリアクティブにして、Vue からの動的な変更を反映できるようにするプロセス。

Vueが期待しているマークアップと、実際にレンダリングされたHTMLが異なるとハイドレーションエラーとなる。

最終手段
client-onlyタグでラップしサーバー側でのレンダリングを避ける。

仕組み
開発環境では、
クライアントとサーバーでレンダリングされたDOMツリーが一致していなくても、
既存のDOMを破棄して最初からレンダリングし直してくれています。
しかし本番環境では、
パファーマンスを最大化するためにこの機能は無効になっています。

また、ハイドレーションは最初にページがサーバーによってレンダリングされた時（初回リクエスト時）にのみ発生します。

## template

[参考 URL](https://ics.media/entry/200716/)

## v-modelディレクティブ = syntax sugar

v-bind, v-onを使った記述方法をシンプルにしている。

[参考URL](https://reffect.co.jp/vue/vue-js-input-v-model#v-model)

>input要素などの入力フォームの要素にv-modelディレクティブを設定することで要素に入力した値とVue.jsで定義したデータプロパティで双方向のデータバインディングが行われます。
>データバインディングが行われるとinput要素で入力した値がそのままデータプロパティに設定されます。Vue.jsで入力フォームを作成している人にとっては見慣れた書式だと思います。

## Vue3

Vue3のtipsを記載しておく。
[参考URL](https://ccbaxy.xyz/blog/2021/03/20/vue03/)
[vue3の根幹について](https://zenn.dev/woo_noo/articles/8d3e666e62b966048c01)

## refとreactive

リアクティブなオブジェクトの作成には、ref reactive toRef readonlyを使う。
(他に、shallowReactive shallowReadonlyなどあるが、当面使わなそう。)

## computed

**computed注意**
なんと非同期APIを呼び出すことはできない

## watchについて

watchの引数はリアクティブなオブジェクトである必要がある。

[参考URL](https://qiita.com/EdyEric/items/9c0f322b5cd86c3c661b)

## 変更検知

>template内でのみ変更検知ができれば良い場合は、propsの値をそのまま表示しているだけで、変更を検知してくれます。
>今回はpropsの特定のプロパティの変更を検知して、特定のメソッドを呼び出す方法の解説です。

[参考URL](https://zenn.dev/tentel/articles/e52815dd33f328)

## Vueでの新規タグ

`<portal>`
`<telport>`の前衛
vue2でのタグ

## Propsを監視する

[【Vue3】CompositionAPIでpropsの変更を検知する](https://zenn.dev/tentel/articles/e52815dd33f328)

```js
export default defineComponent({
 name: "Child",
 props: {
   msg: String,
   aaa: Number,
 },
 setup(props) {
   // props全体をwatchで囲むと、無駄な変更処理がかかってしまう。そのため監視したいプロパティを指定する。
   const { msg } = toRefs(props);
   watch(msg, () => {
     // ここで任意のメソッドを呼び出す
   });
 },
});
```

## setup()

data()の中でセットされたプロパティはデフォルトでリアクティブになるがsetup()の中で宣言された変数はリアクティブにはならない
そのためrefやreactiveを使用する

## Vue test util

[参考URL](https://qiita.com/daiki7nohe/items/8d29e2d9059296b75fa6)

Vue Test Utilは単体ではなく、JestやKarma、Mochaなどのテストランナーと組み合わせて使う。

## Vuex

cookie, localStorageどちらもfalseにした場合はVuex以外に情報を保存する場所がないのでページのリロードを行うとログイン情報がないためログアウト状態になります。Vuexはメモリ上に存在するためリロードすると値を保持することはできません。
