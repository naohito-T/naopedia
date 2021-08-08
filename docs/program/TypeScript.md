# TypeScript

## TypeScript とは

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
