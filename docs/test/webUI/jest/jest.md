# Jest

[参考URL](https://jestjs.io/ja/docs/configuration)
[リファレンス](https://jestjs.io/ja/docs/25.x/tutorial-async)

## 特定のスペック名だけ実施したい場合

`$ yarn test -t [スペック名]`

/licenses/kakeru-yumeoi-basic
/licenses/ryushen-basic

## Jest基本

[Jest基本](https://qiita.com/chimame/items/e97883fd46b67529d59f)

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

---

## Tips

[Node-fetchでのJest Test](https://jestjs.io/ja/docs/bypassing-module-mocks)

- Jestのalias
例として、tsconfig.jsonにaliasが、webpackにaliasがとなるとJestにもaliasを貼らないといけない
[Jest alias](https://qiita.com/nju33/items/8ed1823690b0348daaa7)