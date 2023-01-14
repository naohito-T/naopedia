# TypeScript
[TypeScript特有の組み込み型関数](https://log.pocka.io/ja/posts/typescript-builtin-type-functions/#thistype)
[Type challenge](https://github.com/type-challenges/type-challenges)

## TypeScriptのエラー
[セオリーなerrorハンドリング](https://qiita.com/shibukawa/items/ffe7264ecff78f55b296)

>TypeScript には Java の throws のように**関数が throw する例外を宣言する方法がない**ので、どのような例外が throw され得るかを知るにはコードを読むしかありません。
result型は確かにいいけど可読性がいいかと言われたら違う。
そのためこれが一番セオリーかも。プロジェクトに導入した。

## TypeScriptは構造型
[参考URL](https://qiita.com/suin/items/52cf80021361168f6b0e)

## TSDoc
[参考URL](https://blog.pokutuna.com/entry/tsdoc-tag-list)

## 参考 URL集
[仕事ですぐに使える TypeScript](https://future-architect.github.io/typescript-guide/index.html)
[高度な型定義](https://golang.hateblo.jp/entry/2021/03/15/202502?utm_source=feed)
[URL](https://log.pocka.io/ja/posts/typescript-builtin-type-functions/)
[TypeScript日本語ハンドブック](https://js.studio-kingdom.com/typescript/)
[typescript 型付テスト](https://qiita.com/ryo2132/items/925b96838dd8cca7cebd)
[tsconfig.jsonを書くときはTSConfig Basesを使うと便利](https://qiita.com/munieru_jp/items/a67ac782bbf099d90128)
[TypeScriptで作るアノテーション](http://honeplus.blog50.fc2.com/blog-entry-181.html)
[これまとめる](https://zenn.dev/nash/articles/bb5048a2754245)
[これもまとめる](https://developer.hatenastaff.com/entry/2016/06/27/140931)
[TypeScriptのモデル生成速度比較](https://blog.mamansoft.net/2019/03/17/typescript-model-created-comparison/)
[Three.js TypeScript webpack（これいつかやりたいな）](https://ics.media/entry/16329/)

## TypeScriptでグローバルな型定義ファイルを用意する
[参考URL](https://zenn.dev/fagai/articles/7f76a3b3b5a415)

## .d.ts
[型定義ファイル (.d.ts)](https://typescriptbook.jp/reference/declaration-file)
`.d.ts`ファイルは`.ts`と`.js`ファイルの間をつなぐブリッジ。

## 自作の型定義ファイル .ts or d.ts？
[自作の型定義ファイルに ".d.ts" と付けない方がいい](https://techlab.q-co.jp/articles/41/)
TypeScriptで型定義用のファイルを作る際に、ライブラリが生成する型定義ファイルの名前にならって`.d.ts`と付けると、定義していない型がanyとして使えてしまい型チェック時にもエラーになりません。
よって`.ts`で宣言する。

## named import と default import

named importだと呼び出し側で名前を変更することができなくなるため、基本named importの方がいい。

## import した時に、TypeScriptの型定義がない場合取れる対策

[参考URL](https://medium.com/@ryutamaki/npm-module-%E3%81%AB-typescript-%E3%81%AE%E5%9E%8B%E5%AE%9A%E7%BE%A9%E3%81%8C%E3%81%AA%E3%81%84%E6%99%82%E3%81%AB-%E3%81%A8%E3%82%8A%E3%81%82%E3%81%88%E3%81%9A%E3%83%93%E3%83%AB%E3%83%89%E3%81%8C%E9%80%9A%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B-fcc090804b21)

1. `npm install --save-dev @types/package-name` をためす
2. 1がなければ、 declare module “package-name"; を含んだ .d.tsを自分で追加する

## TypeScript <T> を書くチートシート
[参考URL](https://qiita.com/suin/items/03baa7cf7dd8e9a9f010)

## TypeScriptコンパイラについて

[参考URL](https://typescriptbook.jp/overview/typescript-is-not-that)

結論はTypeScriptの実行パフォーマンスはJavaScriptと同じ。
これを理解するには理解するべきことがある。
- TypeScriptのランタイムはない
- TypeScriptコンパイラは最適化しない。

>TypeScriptにはランタイムがありません。どういうことかというと、TypeScriptを直接実行するエンジンがないということです。TypeScriptを開発しているMicrosoftのブラウザMicrosoft Edgeであっても、TypeScriptは実行できません。サーバーのNode.jsもそうです1。TypeScriptで書いたコードを実行するには、一度JavaScriptコードに変換する必要があります。そのため、TypeScriptのパフォーマンスは、コンパイル後のJavaScriptがどうなっているかで決まるわけです。

一般的にコンパイラは次の3つの仕事がある

- ソースコードを解析し、問題点をチェックする
- ソースコードを別の言語に変換する
**以下のことはTypeScriptコンパイラは実行しない。**
- 最適化する
  - 実行速度が速くなるようにする
  - 少ないメモリで動くようにする
  - 少ない電力で済むようにする
  - 実行ファイルのサイズを小さくする

>このうち、TypeScriptコンパイラがするのは上の2つです。3つ目の最適化はしません。TypeScriptコンパイラは、基本的に型に関する部分を消すだけで、それ以外の部分はほぼそのままJavaScriptに変換します。

## TypeScript コンパイラ

[参考URL](https://ics.media/entry/16329/)

>TypeScriptのコンパイラにはECMAScript Modules（ES Modules = importやexport文のこと）をまとめる機能が提供されていません。そのため、ES ModulesのJSファイルをまとめるモジュールバンドラー（例：webpack、Rollup等）をTypeScriptと合わせて使うのが一般的です。

- 役割
TypeScriptの構文を下位のECMAScriptに変換する
TypeScript → ECMAScript

- コンパイラが追う順番
ts → tsx → d.ts

- デフォルトで追う@typesフォルダーとは
デフォルトで対象範囲すべての@typesパッケージがコンパイルに含まれる。(node_modules/@types)
typesRootsがtsconfig.jsonに指定されている場合は**そのパッケージのみが対象となる。**

## TypeScript インデックスシグネチャを安全に使う
[インデックスシグネチャで特定の文字だけのIndexを扱う](https://blog.mitsuruog.info/2019/03/typescript-limited-set-of-index-signature)


動的に任意のプロパティを作成・使用したいときに使うかもしれないが、だいたいは`Map`などで代用ができる。

## TypeScript 型定義集

```TS
export class typeSampleModel {

    // プリミティブな型
    str: string;                              // 文字列
    num: number;                              // 数値
    boolean: boolean;                         // 真偽値

    // なんでもOKの any型(unknownはmethodが使えない)
    data: any;
    unknow: unknown;

    // オブジェクト型リテラル
    array: any[];                             // 配列
    strArray: string[];                       // 配列内に文字列
    numArray: number[];                       // 配列内に数値
    multiArray: string[][];                   // 多次元配列
    objectArray: {key: string}[];             // 配列内にオブジェクト

    object: {key: string};                    // オブジェクト
    arrayObject: {key: string[]};             // オブジェクト内に配列
    strKeyObject: { [s: string]: string };    // 任意の文字列キーを許容したオブジェクト
    numKeyObject: { [n: number]: string[] };  // 任意の数値キーを許容したオブジェクト

    constructor () {
        this.str = "A";
        this.num = 1138;
        this.boolean = true;
        this.object = { key: "A"};
        this.array = [ "A" ];
        this.strArray = [ "A", "B" ];
        this.numArray = [ 1, 2 ];
        this.multiArray = [ [ "A", "B" ], [ "C", "D" ] ];
        this.objectArray = [ { key: "A" }, { key: "B" } ];
        this.arrayObject = { key: ["A", "B", "C"] };
        this.strKeyObject = { "a": "A", "b": "B", "c": "C" };
        this.numKeyObject = { 1: ["a", "A"], 2: ["b", "B"] }
    }

    // 関数を示すFunction
    // 関数の戻り値がない場合に使うvoid
    var method: Function = (): void => {
        var a:number = 1;
    }
}

```

## tsconfig.json

[tsconfigあらかた設定](https://www.pg-fl.jp/program/tips/tsconfig_dirs.htm)

- tsconfig設定の種類の概念

具体的には、ディレクトリやモジュール解決に関する以下のような設定・概念が存在する。

プロジェクトディレクトリ
outDir
rootDir
declarationDir
baseUrl
paths
rootDirs
typeRoots
このうちoutDir, rootDir, declarationDirが出力に関する設定、baseUrl, paths, rootDirs, typeRootsが入力に関する設定となります。

- プロジェクトディレクトリ

プロジェクトディレクトリは設定項目には存在せず、以下の項目が適用される

1. tsconfig.jsonが使用される場合
→存在するディレクトリがプロジェクトディレクトリになる
>コンパイラー処理実行時に設定ファイルが明示的に指定された場合は、そのファイルが存在するディレクトリとなります。
>コンパイラー処理実行時にディレクトリが明示的に指定された場合は、そのディレクトリとなります。

1. それ以外の場合 → カレントディレクトリ

>※プロジェクトディレクトリは様々なディレクトリやファイル関連の設定に使用される基準のディレクトリとなります。そのため、入力ファイルや出力ファイルの場所を考える際はプロジェクトディレクトリの位置、ひいては設定ファイル(tsconfig.json)の配置場所もある程度意識する必要があります。

- outDir
この設定項目はコンパイル結果（JSファイル）を生成するディレクトリ（出力ディレクトリ）を表す
outFile設定が存在する場合は指定することができない。

- rootDir
>この設定項目は出力ファイルのディレクトリ構造を決定する際にのみ使用されます。具体的には、rootDir で指定されたディレクトリをベースに入力ファイルの相対パスを計算し、その相対パスを出力ディレクトリに適用してファイルを出力します。なお、rootDir はプロジェクトディレクトリを基準としたパスとして扱われます。

>例: outDir が「dist」、rootDir が「src」である場合 → ファイル「src/hoge/Hoge.ts」は計算された相対パスが「hoge/Hoge.ts」になるので「dist/hoge/Hoge.js」にコンパイルされます。
/ne

- typeRoots
typeRoots設定はこれまで説明した設定項目と若干異なり、コンパイル時に自動的に型定義ファイル（.d.ts）を持つパッケージを読み込む際の検索パスを指定する。
ここへ指定されたディレクトリ下にあるパッケージ内の型定義ファイルが自動的に使用されます。
また、「<reference types='...' />」ディレクティブでの型定義読み込みの検索パスとしても利用されます。
typeRoots設定に指定するディレクトリはプロジェクトディレクトリを基準としたパスになる。

※typeRootsに指定するディレクトリはパッケージの検索パスであるため、指定されたディレクトリには「<subdir>/index.d.ts」のようにサブディレクトリを伴ってファイルを設置するか、package.jsonのあるディレクトリ（パッケージディレクトリ）を置く必要があります。

なお、自動的に型定義を読み込むかどうかはtypes設定で制御されます。
types設定が「[]」（空配列）である場合は、typeRoots設定にかかわらず自動的な読み込みが行われません（「includes」に含めた場合や「<reference types='...' />」ディレクティブで明示的に指定した場合を除く）

```json

// プロジェクトにあるd.tsを見に行く
"typeRoots": ["~"],

```

## アロー関数が連続しているのは共通処理をしたいためのカリー化
[参考URL](https://zenn.dev/tsucchiiinoko/articles/54076f7b135246)

## 名前空間

**名前空間はグローバルな名前空間でJavaScriptのオブジェクトに単純に名前がつけられたもの。**
namespaceではなくモジュールの仕組みを使うべし

TypeScriptでゃnamespaceキーワードを使って名前空間を定義することができるが、通常はより柔軟性の高いモジュールの仕組みを使うのが推奨されている（といってもファイルを分けるだけだが）

- namespaceが非推奨な理由
namespaceを使うと同じファイル内で階層化された名前空間を作ることができるが、あくまでその階層構造はグローバルに占有されている。
一方モジュールの仕組みを使うと、ファイル単位で**名前空間のコンテキストを分けることができる**（大きなプロジェクトであっても、適切な単位でモジュールを分割している限り、名前の衝突は本格的に発生しない。）

## トリプルスラッシュ・ディレクティブMapped Typesの基本形は { [P in K]: T } です。 P は T の中で使える型変数です。このとき、

Mapped Typesの基本形は`{ [P in K]: T }`。
※PはTの中で使える型変数

- PはこのMapped Typeの引数型 (parameter type)
- KはこのMapped Typeの制約型 (constraint type)
- TはこのMapped Typeのテンプレート型 (template type)

```ts
/// <reference path="..." />
```

1つのXMLタグを含む1行コメントになる
**コメントの内容はコンパイラへの指令として使用される。**

## Tips

- interfaceで型を上書きしたい時
[参考URL](https://tech-1natsu.hatenablog.com/entry/2019/02/09/014218)

## TypeScript バリデーション種類
[zod](https://zenn.dev/ynakamura/articles/65d58863563fbc)

## JSに型をつける
[アンビエント宣言から既存ライブラリがJSしかない場合につける方法](https://maku.blog/p/s7wk5k3/)

TypeScriptのアンビエント宣言 (Ambient Declarations) を行うと、既存のJavaScriptライブラリに型情報を付加することができる。

この仕組みを利用すると、
- サードパーティ製のJavaScriptライブラリ（npmパッケージ）や、自作のJavaScriptライブラリ（ただしTypeScript化はしたくないもの）をTypeScriptから使用する
- jQueryなどのブラウザ上でロードされるライブラリをTypeScriptから使用する
といったことが可能になる。

※要するにTypeScriptトランスパイラに対して、このオブジェクトはこういう型のものとして外から提供されているので、型チェックエラーを出さないでね、と知らせることができる。

さらに、VS Codeなどのエディターを使用している場合は、アンビエント型宣言があることにより、エディター上での補完入力ができるようになります。

## DefinitelyTyped

@typesスコープを管理しているDefinitely Typedは、Microsoftから支援を受けているものの、**Microsoftの脆弱性報奨金制度におけるセーフハーバーの対象ではない。**


@typesで提供されているライブラリ
`yarn add @types/xxx`

[参考URL](https://blog.ryotak.me/post/definitelytyped-tamper-with-arbitrary-packages/)

## Ambient Module 宣言で overload する

[参考URL](https://qiita.com/Takepepe/items/6addcb1b0facb8c6ff1f)

ライブラリが知ることのできない（自身のプロジェクト固有の定義）型をライブラリのルートに注入し行き渡らせる手法
interface宣言結合を利用したテクニックであり、さまざまなライブラリ型定義でも採用されている。


### Uncaught (in promise) 
[リファレンス](https://developer.mozilla.org/ja/docs/Web/API/Window/unhandledrejection_event)

以下の場合が起こる。そしてブラウザでハンドリングができる。
```ts
window.addEventListener('unhandledrejection', function(event) {
  // イベントオブジェクトは2つの特別なプロパティを持っています:
  alert(event.promise); // [object Promise] - エラーを生成した promise
  alert(event.reason); // Error: Whoops! - 未処理のエラーオブジェクト
});

new Promise(function() {
  throw new Error("Whoops!");
}); // エラーを処理する catch がない
```

---

## タイプガード(Type Guard)

[参考URL](https://qiita.com/propella/items/33433278497f290ceadb)

Type assertions（キャスト）Type assertionsを使うと、実際のデータがどうであろうが強制的に型情報を書き換えてしまうため、有り難いTypeScriptの型チェックをすり抜けてしまう。**TypeScriptではType assertionを使う代わりに実行時型チェックを強制するType Guardという仕組みがある。**

## undefinedなどを取り除く

時間がある時まとめる
[ユーザ定義のガード](https://terrblog.com/%e3%80%90typescript%e3%80%91%e5%9e%8b%e3%82%ac%e3%83%bc%e3%83%89%e3%81%a8%e5%9e%8b%e3%82%a2%e3%82%b5%e3%83%bc%e3%82%b7%e3%83%a7%e3%83%b3%e3%81%a7unknown%e5%9e%8b%e3%82%92%e4%bd%bf%e3%81%84%e5%8b%9d/)
[こっちのが参考になるのかも](https://qiita.com/suin/items/cda9af4f4f1c53c05c6f)

## any vs unknown
[参考URL](https://book.yyts.org/reference/statements/any-vs-unknown)

anyはmethodが使えるが、unknownはmethodが使えないため少しだけ保守性があがる。

## !(エクスクラメーション/感嘆符: かんたんふ)

プログラマがコンパイラに対して、この変数はundefinedやnullになることはありません、と教える記述。

---

## 演算子

### in演算子


### is演算子

[参考URL](https://www.wakuwakubank.com/posts/767-typescript-user-defined-type-guards/)

>「is演算子」について取り上げます。is演算子は、User-Defined Type Guards(ユーザ定義型ガード)と呼ばれる機能で使われて、型を絞り込みたいシーンで活用できます。

unknown型やany型、Union型の型の絞り込みを行える。

## keyof演算子
[参考URL](https://typescriptbook.jp/reference/type-reuse/keyof-type-operator)

keyofはオブジェクト型からプロパティ名を型として返す型演算子です。
たとえば、nameプロパティを持つ型に対して、keyofを使うと文字列リテラル型の"name"が得られます。

```ts
type Person = {
  name: string;
};
type PersonKey = keyof Person; // type PersonKey = "name"
```

## Null合体代入演算子(??=)

[参考URL](https://zenn.dev/oreo2990/articles/3d780560c5e552)

TypeScript4.0以降で使用可能。左辺がnullまたはundefinedの場合に代入する。
※左辺がnullまたはundefined以外のfalsyな値の場合（''や0）代入されない

```ts
const pilot = { name: null };

pilot.name ??= "shinji";
console.log(pilot.name); //
```

---

## インデックス型 (index signature)
[参考URL](https://typescriptbook.jp/reference/values-types-variables/object/index-signature)

TypeScriptで、オブジェクトのフィールド名をあえて指定せず、プロパティのみを指定したい場合があります。そのときに使えるのがこのインデックス型（index signature）

```ts
let obj: {
  [K: string]: number;
};
```


## Mapped Types
[参考URL](https://zenn.dev/qnighy/articles/dde3d980b5e386)

Mapped Typeとは、あるオブジェクトのプロパティ名を利用して新しい型を作り出す機能

## Indexed Access Types 
[参考URL](https://typescriptbook.jp/reference/type-reuse/indexed-access-types)

TypeScriptのインデックスアクセス型(indexed access type)は、プロパティの型や配列要素の型を参照する方法を提供します。

```ts
type A = { foo: number };
type Foo = A["foo"]; // type Foo = number
```

## Conditional Types
[Conditional Types](https://qiita.com/Quramy/items/b45711789605ef9f96de)

TypeScript 2.8で導入された。
型定義における条件分岐（三項演算子と同じ）
```ts
type MyCondition<T, U, X, Y> = T extends U ? X : Y;
```

