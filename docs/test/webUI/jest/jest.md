# Jest

[参考URL](https://jestjs.io/ja/docs/configuration)
[リファレンス](https://jestjs.io/ja/docs/25.x/tutorial-async)

## Jestテストの並行実行と逐次実行を理解する

[Jest実行順](https://qiita.com/noriaki/items/5d800ea1813c465a0a11)

- default
**ファイルごとは並行**
デフォルト実行では対象となる複数のテストファイルは並行に処理される。
このときの並行処理の上限数は、自動的に実行環境(マシン)のコア数が設定される。
**ファイル内**
また、ファイル内のテストはテストメソッドit, testを使用すると順番に実行されます。
describeでブロック化されている場合は、describeに潜っていく（深さ優先探索の）順序で実行されます。かんたんに言えば、テストファイルに書かれている順序です。


## 特定のスペック名だけ実施したい場合

`$ yarn test -t [スペック名]`

/licenses/kakeru-yumeoi-basic
/licenses/ryushen-basic

## Jest 逆引き

[Jest 逆引き](https://qiita.com/chimame/items/e97883fd46b67529d59f)

## マニュアルモック

マニュアルモックはモックデータを返す機能をスタブするために使用します。 例えば、ウェブサイトやデータベースのような外部リソースにアクセスする代わりに、偽のデータが使えるマニュアルモックが欲しいと考えるでしょう。 これによりテストは高速で信頼性の高いものになります。

## Jestでの単体テストのネットワーク接続は？

>テストではネットワークへの接続は行いたくないので、 request.jsモジュールのマニュアルモックを__mocks__フォルダに作成することにします（このフォルダ名は小文字の必要があり、__MOCKS__ では動作しません）。

つまり、外部に接続する関数はモックで作成する

## 単体テストの認識

単体テストでは外部の依存関係にあるモジュールは呼び出さない。
テストのために本番DBに新しいレコードを作成したり、APIリクエストの接続制限の回数を超えたりすることは望ましくない。**そのためモックを作成する**

## Jestのmockの認識

Jestはテスト対象ファイルと同じディレクトリに、__mocks__ディレクトリを作成することで、モック対象のファイルを検出し依存関係を自動的にモックします。そして、モック関数jest.fn()を定義することで、どのような引数で何回呼ばれたかなどを記録します。

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



---

## Tips

[Node-fetchでのJest Test](https://jestjs.io/ja/docs/bypassing-module-mocks)

- Jestのalias
例として、tsconfig.jsonにaliasが、webpackにaliasがとなるとJestにもaliasを貼らないといけない
[Jest alias](https://qiita.com/nju33/items/8ed1823690b0348daaa7)


[Monorepo下におけるJest実行方法のちょっとした改善](https://zenn.dev/tkiryu/articles/a6a43bd9d043b0)

[Jest カバレッジをプルリクに記載するkisaisuru](https://github.com/ArtiomTr/jest-coverage-report-action#usage)
