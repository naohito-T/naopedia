# TypeScript

[TypeScript日本語ハンドブック](https://js.studio-kingdom.com/typescript/)


[tsconfig.jsonを書くときはTSConfig Basesを使うと便利](https://qiita.com/munieru_jp/items/a67ac782bbf099d90128)

## import した時に、TypeScriptの型定義がない場合取れる対策

[参考URL](https://medium.com/@ryutamaki/npm-module-%E3%81%AB-typescript-%E3%81%AE%E5%9E%8B%E5%AE%9A%E7%BE%A9%E3%81%8C%E3%81%AA%E3%81%84%E6%99%82%E3%81%AB-%E3%81%A8%E3%82%8A%E3%81%82%E3%81%88%E3%81%9A%E3%83%93%E3%83%AB%E3%83%89%E3%81%8C%E9%80%9A%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B-fcc090804b21)

1. `npm install --save-dev @types/package-name` をためす
2. 1がなければ、 declare module “package-name"; を含んだ .d.ts を自分で追加する

## TypeScript コンパイラ


>TypeScriptのコンパイラにはECMAScript Modules（ES Modules = importやexport文のこと）をまとめる機能が提供されていません。そのため、ES ModulesのJSファイルをまとめるモジュールバンドラー（例：webpack、Rollup等）をTypeScriptと合わせて使うのが一般的です。

- コンパイラが追う順番

ts → tsx → d.ts

- デフォルトで追う@typesフォルダとは
デフォルトで対象範囲全ての@typesパッケージがコンパイルに含まれる。(node_modules/@types)
typesRootsがtsconfig.jsonに指定されている場合は**そのパッケージのみが対象となる。**

## TypeScript 概念

## 参考 URL 集

[仕事ですぐに使える TypeScript](https://future-architect.github.io/typescript-guide/index.html)
とある会社が作成したのかな？とてもよかった。

高度な型定義の参考文献(基本)
[高度な型定義](https://golang.hateblo.jp/entry/2021/03/15/202502?utm_source=feed)

TS 組み込み型定義(基本を読んでから)
[URL](https://log.pocka.io/ja/posts/typescript-builtin-type-functions/)

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

[
## Three.js Typescript webpack
[これいつかやりたいな](https://ics.media/entry/16329/)


## tsconfig.json

[tsconfigあらかた設定](https://www.pg-fl.jp/program/tips/tsconfig_dirs.htm)

- tsconfig 設定の種類の概念

具体的には、ディレクトリやモジュール解決に関する以下のような設定・概念が存在する。

プロジェクトディレクトリ
outDir
rootDir
declarationDir
baseUrl
paths
rootDirs
typeRoots
このうち outDir, rootDir, declarationDir が出力に関する設定、baseUrl, paths, rootDirs, typeRoots が入力に関する設定となります。

- プロジェクトディレクトリ

プロジェクトディレクトリは設定項目には存在せず、以下の項目が適用される

1. tsconfig.jsonが使用される場合→そのファイルが存在するディレクトリがプロジェクトディレクトリになる
>コンパイラー処理実行時に設定ファイルが明示的に指定された場合は、そのファイルが存在するディレクトリとなります。
>コンパイラー処理実行時にディレクトリが明示的に指定された場合は、そのディレクトリとなります。

2. それ以外の場合 → カレントディレクトリ

>※プロジェクトディレクトリは様々なディレクトリやファイル関連の設定に使用される基準のディレクトリとなります。そのため、入力ファイルや出力ファイルの場所を考える際はプロジェクトディレクトリの位置、ひいては設定ファイル(tsconfig.json)の配置場所もある程度意識する必要があります。

- outDir
この設定項目はコンパイル結果(JSファイル)を生成するディレクトリ(出力ディレクトリ)を表す
outFile設定が存在する場合は指定することができない。

- rootDir
>この設定項目は出力ファイルのディレクトリ構造を決定する際にのみ使用されます。具体的には、rootDir で指定されたディレクトリをベースに入力ファイルの相対パスを計算し、その相対パスを出力ディレクトリに適用してファイルを出力します。なお、rootDir はプロジェクトディレクトリを基準としたパスとして扱われます。

>例: outDir が「dist」、rootDir が「src」である場合 → ファイル「src/hoge/Hoge.ts」は計算された相対パスが「hoge/Hoge.ts」になるので「dist/hoge/Hoge.js」にコンパイルされます。


- typeRoots

typeRoots 設定はこれまで説明した設定項目と若干異なり、コンパイル時に自動的に型定義ファイル(.d.ts)を持つパッケージを読み込む際の検索パスを指定します。ここに指定されたディレクトリ下にあるパッケージ内の型定義ファイルが自動的に使用されます。また、「<reference types='...' />」ディレクティブでの型定義読み込みの検索パスとしても利用されます。typeRoots 設定に指定するディレクトリはプロジェクトディレクトリを基準としたパスとなります。

※ typeRoots に指定するディレクトリはパッケージの検索パスであるため、指定されたディレクトリには「<subdir>/index.d.ts」のようにサブディレクトリを伴ってファイルを設置するか、package.json のあるディレクトリ(パッケージディレクトリ)を置く必要があります。

なお、自動的に型定義を読み込むかどうかは types 設定で制御されます。types 設定が「[]」(空配列)である場合は、typeRoots 設定にかかわらず自動的な読み込みが行われません(「includes」に含めた場合や「<reference types='...' />」ディレクティブで明示的に指定した場合を除く)。

```json

// プロジェクトにあるd.tsを見に行く
"typeRoots": ["~"],

```

## 名前空間

**名前空間はグローバルな名前空間でJavaScriptのオブジェクトに単純に名前がつけられたもの。**

namespaceではなくモジュールの仕組みを使うべし
TypeScriptでゃnamespaceキーワードを使って名前空間を定義することができるが、通常はより柔軟性の高いモジュールの仕組みを使うのが推奨されている(といっても.tsファイルを分けるだけだが)

---

- namespaceが非推奨な理由
namespaceを使うと同じファイル内で階層化された名前空間を作ることができるが、あくまでその階層構造はグローバルに占有されている。
一方モジュールの仕組みを使うと、ファイル単位で名前空間のコンテキストを分けることができる(大きなプロジェクトであっても、適切な単位でモジュールを分割している限り、名前の衝突は本格的に発生しない。)

---

## タイプガード(Type Guard)

Type assertions(キャスト) Type assertionsを使うと、実際のデータがどうであろうが強制的に型情報を書き換えてしまうため、有り難いTypeScriptの型チェックをすり抜けてしまう。**TypeScriptではType assertionを使う代わりに実行時型チェックを強制するType Guardという仕組みがある。**

## undefinedなどを取り除く

時間がある時まとめる
[ユーザ定義のガード](https://terrblog.com/%e3%80%90typescript%e3%80%91%e5%9e%8b%e3%82%ac%e3%83%bc%e3%83%89%e3%81%a8%e5%9e%8b%e3%82%a2%e3%82%b5%e3%83%bc%e3%82%b7%e3%83%a7%e3%83%b3%e3%81%a7unknown%e5%9e%8b%e3%82%92%e4%bd%bf%e3%81%84%e5%8b%9d/)

[こっちのが参考になるのかも](https://qiita.com/suin/items/cda9af4f4f1c53c05c6f)


## is演算子

[参考URL](https://www.wakuwakubank.com/posts/767-typescript-user-defined-type-guards/)
>「is演算子」について取り上げます。is演算子は、User-Defined Type Guards(ユーザ定義型ガード)と呼ばれる機能で使われて、型を絞り込みたいシーンで活用できます。

---

## any vs unknown

anyはmethodが使えるが、unknownはmethodが使えないため少しだけ保守性があがる。
[参考URL](https://book.yyts.org/reference/statements/any-vs-unknown)


## !(エクスクラメーション/感嘆符: かんたんふ)

プログラマがコンパイラに対して、この変数はundefinedやnullになることはありません、と教える記述。

## トリプルスラッシュ・ディレクティブ

```ts
/// <reference path="..." />
```

1つのXMLタグを含む1行コメントになる
**コメントの内容はコンパイラへの指令として使用される。**

## Tips

- intefaceで型を上書きしたい時
[参考URL](https://tech-1natsu.hatenablog.com/entry/2019/02/09/014218)
