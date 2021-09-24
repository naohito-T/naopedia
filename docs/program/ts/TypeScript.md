# TypeScript

## TypeScript コンパイラ


>TypeScriptのコンパイラにはECMAScript Modules（ES Modules = importやexport文のこと）をまとめる機能が提供されていません。そのため、ES ModulesのJSファイルをまとめるモジュールバンドラー（例：webpack、Rollup等）をTypeScriptと合わせて使うのが一般的です。

- コンパイラが追う順番

ts → tsx → d.ts

- デフォルトで追う@types
デフォルトで対象範囲全ての@typesパッケージがコンパイルに含まれる。(node_modules/@types)
typesRootsがtsconfig.jsonに指定されている場合は**そのパッケージのみが対象となる。**


## TypeScript とは

altJS
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

    // なんでもOKの any型
    data: any;

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
namespaceを使うと同じファイル内で階層化された名前空間を作ることができるが、あくまでその階層構造はグローバルに居言う有されている。
一方モジュールの仕組みを使うと、ファイル単位で名前空間のコンテキストを分けることができる(大きなプロジェクトであっても、適切な単位でモジュールを分割している限り、名前の衝突は本格的に発生しない。)




