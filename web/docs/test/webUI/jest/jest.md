# Jest
[参考URL](https://jestjs.io/ja/docs/configuration)  
[リファレンス](https://jestjs.io/ja/docs/25.x/tutorial-async)

## Jestテストの並行実行と逐次実行を理解する
[Jest実行順](https://qiita.com/noriaki/items/5d800ea1813c465a0a11)

- default
**ファイルごとは並行**
デフォルト実行では対象となる複数のテストファイルは**並行**に処理される。
このときの並行処理の上限数は、自動的に実行環境（マシン）のコア数が設定される。

**ファイル内**
また、ファイル内のテストはテストメソッドit, testを使用すると順番に実行されます。
describeでブロック化されている場合は、describeに潜っていく（深さ優先探索の）順序で実行されます。かんたんに言えば、テストファイルに書かれている順序。


## 特定のスペック名だけ実施したい場合

`$ yarn test -t [スペック名]`

/licenses/kakeru-yumeoi-basic
/licenses/ryushen-basic

## Jest 逆引き
[Jest 逆引き](https://qiita.com/chimame/items/e97883fd46b67529d59f)

## マニュアルモック

マニュアルモックはモックデータを返す機能をスタブするために使用する。
たとえば、ウェブサイトやデータベースのような外部リソースへアクセスする代わりに、偽のデータモックが欲しいと考える。
これによりテストは高速（外部リソースへアクセスしないから）で信頼性の高いものになる。

## JestでのTest Double
[参考URL](https://naokirin.hatenablog.com/entry/2022/02/23/180811)

Test Doubleの分類としてJestでは細かい分類はされておらず、基本的には`jest.mock` `jest.spyOn`を使う。

## Jestでの単体テストのネットワーク接続は？

>テストではネットワークへの接続は行いたくないので、 request.jsモジュールのマニュアルモックを__mocks__フォルダに作成することにします（このフォルダ名は小文字の必要があり、__MOCKS__ では動作しません）。

つまり、外部に接続する関数はモックで作成する

## 単体テストの認識

単体テストでは外部の依存関係にあるモジュールは呼び出さない。
テスト時、本番DBに新しいレコードを作成したり、APIリクエストの接続制限の回数を超えたりすることは望ましくない。**そのためモックを作成する**

## Jestのmockの認識

Jestはテスト対象ファイルと同じディレクトリに、__mocks__ディレクトリを作成することで、モック対象のファイルを検出し依存関係を自動的にモックします。そして、モック関数jest.fn()を定義することで、どのような引数で何回呼ばれたかなどを記録します。

[jest mock調査](https://zenn.dev/dove/scraps/e537b453395ea8)

## Jest file api mock

[参考URL](https://qiita.com/vimyum/items/4ded9de3b784afd31025)

mock化するすべての基本が詰まっている

[mock関数呼び出しチェック](https://dev.classmethod.jp/articles/jest-testing-when-the-same-function-is-called-multiple-times/)


## Jest 前後処理について

対応表作成した

```ts
import { test } from '@playwright/test';

// 1
test.beforeAll(() => {
  console.log('outer before all');
});

// 3 (testから毎回呼ばれる)
test.beforeEach(() => {
  console.log('outer before each');
});

// 7 (testから毎回呼ばれる)
test.afterEach(() => {
  console.log('outer after each');
});

// 9
test.afterAll(() => {
  console.log('outer after all');
});

test.describe('some class', () => {
  console.log('describe some class'); // 1
  // 2
  test.beforeAll(() => {
    console.log('inner before all');
  });

  // 4
  test.beforeEach(() => {
    console.log('inner before each');
  });

  // 6
  test.afterEach(() => {
    console.log('inner after each');
  });

  // 8
  test.afterAll(() => {
    console.log('inner after all');
  });

  test.describe('some function', () => {
    console.log('describe some function'); // 2
    test('some expectation', () => {
      // 5
      console.log('execute');
    });
  });

  test.describe('もう一項', () => {
    console.log('もう一項describe some function'); // 2
    test('もう一項some expectation', () => {
      // 5
      console.log('もう一項execute');
    });
  });
});
```

```sh
$ yarn test
yarn run v1.22.17
$ playwright test
describe some class
describe some function
もう一項describe some function

Running 2 tests using 1 worker
describe some class
describe some function
もう一項describe some function
[chromium] › test.spec.ts:4:6 › beforeAll
outer before all
[chromium] › test.spec.ts:26:8 › some class › beforeAll
inner before all
[chromium] › test.spec.ts:47:5 › some class › some function › some expectation
outer before each
inner before each
execute
inner after each
outer after each
[chromium] › test.spec.ts:55:5 › some class › もう一項 › もう一項some expectation
outer before each
inner before each
もう一項execute
inner after each
outer after each
[chromium] › test.spec.ts:41:8 › some class › afterAll
inner after all
[chromium] › test.spec.ts:19:6 › afterAll
outer after all
```

## Jest mock化

[参考URL](https://qiita.com/YSasago/items/6109c5d3fbdbffa31c9f)
結構なんでもmockするイメージ

## Jest テストカバレッジ 見方

[参考URL](https://qiita.com/turmericN/items/e3e48f04800e8c0b723c)

```sh
-------------|----------|----------|----------|----------|-------------------|
File         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------|----------|----------|----------|----------|-------------------|
All files    |       50 |        0 |       20 |       50 |                   |
 handler.ts  |       50 |        0 |       25 |       50 |... 39,41,44,47,55 |
 slackBot.ts |       50 |      100 |        0 |       50 |            6,7,13 |
-------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
Time:        1.952s, estimated 2s
```

Stmts（Statement coverage）
プログラム内の各命令が実行されたかの網羅率（命令網羅率）)

Branch（Branch coverage）
ifやcaseなどのすべての分岐の処理が実行されたかの網羅率

Funcs（Function coverage）
プログラム内の各関数が呼び出されたかの網羅率

Lines
ソースファイルの各実行可能行が実行されたかの網羅率

---

## Jest typescript parserを変更する。
[参考URL](https://miyauchi.dev/ja/posts/speeding-up-jest/)

>Typescript コードをテストする際、多くの場合ts-jestやbabel-jestをトランスフォーマーとして使用していると思います。しかし、これらによってテストの速度が低下することがあります。
そのため、以下のライブラリを使用する
- esbuild
- swc

## Tips

[Node-fetchでのJest Test](https://jestjs.io/ja/docs/bypassing-module-mocks)
- Jestのalias
例として、tsconfig.jsonにaliasが、webpackにaliasがとなるとJestにもaliasを貼らないといけない
[Jest alias](https://qiita.com/nju33/items/8ed1823690b0348daaa7)
[Monorepo下におけるJest実行方法のちょっとした改善](https://zenn.dev/tkiryu/articles/a6a43bd9d043b0)
[Jest カバレッジをプルリクに記載する](https://github.com/ArtiomTr/jest-coverage-report-action#usage)
[Jest next/router](https://fwywd.com/tech/next-testing-mock)