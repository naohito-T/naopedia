# デザインパターン

GoFのデザインパターンはOOP（オブジェクト指向言語向け）

オブジェクト指向プログラミング（OOP）と関数型プログラミング（FP）では、異なるデザインパターンが存在します。これらのパターンは、それぞれのプログラミングパラダイムの特性や哲学に基づいています。

## オブジェクト指向プログラミングのデザインパターン

オブジェクト指向プログラミングでは、クラスやオブジェクトを通じてデータとそのデータを操作するメソッドを組み合わせることに焦点を当てています。OOPのデザインパターンは、ソフトウェア設計における一般的な問題に対する再利用可能な解決策を提供します。有名なOOPのデザインパターンには、以下のようなものがあります：

ファクトリーメソッド（Factory Method）: オブジェクトの作成をサブクラスに委ねることで、クライアントコードが具体的なクラスに依存することなくオブジェクトを生成できるようにするパターンです。
シングルトン（Singleton）: あるクラスのインスタンスがプログラム内に1つしか存在しないことを保証するパターンです。
ストラテジー（Strategy）: アルゴリズムのファミリーを定義し、それらを相互に交換可能にすることで、アルゴリズムをクライアントの使用によって動的に変更できるようにするパターンです。
オブザーバー（Observer）: オブジェクト間の依存関係を設定することで、あるオブジェクトの状態が変わったときに、依存しているすべてのオブジェクトに自動的に通知が行われるようにするパターンです。
関数型プログラミングのデザインパターン
関数型プログラミングでは、不変性（Immutable）、副作用のない関数（Pure Functions）、高階関数（Higher-order Functions）などの概念を使用して問題を解決します。FPのデザインパターンは、これらの概念を活用して、より宣言的な（Declarative）、副作用のないコードを書くための方法を提供します。FPのパターンには以下のようなものがあります：

モナド（Monad）: 副作用を扱うための一貫した方法を提供し、チェーン可能な操作を通じて値を変換するパターンです。
ファンクター（Functor）: 値をラップし、その値に関数を適用する方法を提供するパターンです。
カリー化（Currying）: 複数の引数を取る関数を、一度に1つの引数を取る関数のシリーズに変換するパターンです。
コンポジション（Composition）: 複数の関数を組み合わせて、新しい関数を作るパターンです。

>実のところデザインパターンやオブジェクト指向のテクニックのアレコレは、突き詰めると具象クラスの代わりにインタフェースを使ったり、抽象クラスを使ったりすることが基本なのです。
>従って「具象クラスを書かずにインスタンスを生成する」ためにFactory Methodパターンが実際何をするかと言うと、「具象クラスの代わりにインタフェースや抽象クラスを使ってインスタンス生成する」といった事を行うのです。

これらは、特定の問題を解決するための再利用可能なソリューションです。Gang of Four (GoF) によって23のクラシックなデザインパターンが紹介されました。

- **Creational Patterns (生成パターン)**:
  - Singleton
  - Factory Method
  - Abstract Factory
  - Prototype
  - Builder

- **Structural Patterns (構造パターン)**:
  - Adapter
  - Bridge
  - Composite
  - Decorator
  - Facade
  - Flyweight
  - Proxy

- **Behavioral Patterns (振る舞いパターン)**:
  - Chain of Responsibility
  - Command
  - Interpreter
  - Iterator
  - Mediator
  - Memento
  - Observer
  - State
  - Strategy
  - Template Method
  - Visitor

## デザインパターンとは

ソフトウェア開発におけるデザインパターンまたは設計パターンとは、過去のソフトウェア設計者が発見し編み出した設計ノウハウを蓄積し、名前をつけ再利用しやすいように特定の規約にしたがってカタログ化したもの  
**※GoFのデザインパターンと呼ぶこともある。**

デザインパターンは、再利用可能なソフトウェア設計の解決策  
デザインパターンは主に3つのカテゴリーに分類される  

- Creational（生成）
- Structural（構造）
- Behavioral（振る舞い）

## デザインパターン一覧

[参考URL](https://qiita.com/ichi-nakashima/items/ee09c9341f85c18f748a)
[GoFのデザインパターン（23種類）](https://qiita.com/i-tanaka730/items/c63c6c22abd1477e0ba0)

## 現在は使用されているのか

結論としては、GoFのデザインパターンは綺麗にまとまっていて勉強にはなるが、複雑すぎて普段は使わないというのが実態。  
（一昔前に出た結論ではあるが）

## TypeScriptでは＿

JavaScriptが関数を変数として扱える第一級関数言語であることもGoFのデザインパターンを使わなくなる理由のひとつである可能性。

---

## デザインパターン一覧

23種類をさらに3つに分けることができる

## 生成に関するパターン

### Abstract Factory

関連する部品を組み合わせて製品を作る

### Builder

複雑なインスタンスを組み立てる

### Factory Method

インスタンス生成をサブクラスにまかせる

### Prototype

コピーしてインスタンスを作る

### Singleton

たったひとつのインスタンス

---

## 構造に関するパターン

### Adapter

一皮被せて再利用  
インターフェースが一致しないクラスを再利用する

### Bridge

機能の階層と実装の改装を分ける

### Composite

容器と中身の同一視

### Decorator

飾り枠と中身の同一視

### Facade

シンプルな窓口

### Flyweight

同じものを共有してむだをなくす

### Proxy

必要になってから作る

---

## 振る舞いに関するパターン

### Chain of Responsibility

責任のたらい回し

### Command

命令をクラスにする

### Interpreter

文法規則をクラスで表現する

### Iterator

1つ1つ数え上げる

### Mediator

相手は相談役1人だけ

### Memento

状態を保存する

### Observer

状態の変化を通知する

### State

状態をクラスとして表現する

### Strategy

アルゴリズムをごっそり切り替える

### Template Method

具体的な処理をサブクラスに任せる

### Visitor

構造を渡り歩きながら仕事をする

---

## デザインパターンとDI

[参考URL](https://qiita.com/buntafujikawa/items/a2f6a306972087b56de6)

## 依存性注入 DI : Dependency Injection

[参考URL](https://e-words.jp/w/%E4%BE%9D%E5%AD%98%E6%80%A7%E6%B3%A8%E5%85%A5.html)

**あるオブジェクトを利用する時にメソッドの引数などでオブジェクトを受け取るようにし依存関係は外部から任意に指定、変更できるようにすること。**

Aを呼び出す側がB（に相当するオブジェクト）を与えて利用させる。これにより、AとBの依存関係は外部から任意に指定、変更できるようになり、Bの代わりに同じインターフェースを実装したB'を与えたり、Bのように振る舞うモックを与えてAのみを対象とする単体テストを行ったりできる。

## デザインパターンとドメイン駆動設計（DDD）の違い

デザインパターンとドメイン駆動設計（DDD）は、ソフトウェア設計の異なる側面を扱っていますが、一部の概念やアプローチは重なる部分もあります。

1. **デザインパターン**:
   デザインパターンは、特定の一般的な設計上の問題を解決するための再利用可能なソリューションです。これらのパターンは、オブジェクトの生成、構造、振る舞いに焦点を当てています。デザインパターンは具体的な技術やドメインに依存せず、多くの異なるコンテキストで再利用できる解決策です。

2. **ドメイン駆動設計（DDD）**:
   DDDは、複雑なビジネスロジックやビジネスプロセスを扱うソフトウェアの設計アプローチです。DDDは、ドメインエキスパートと開発者が共同でビジネスドメインを深く理解し、その知識をソフトウェアの設計に反映させることを重視しています。DDDには、エンティティ、値オブジェクト、アグリゲート、レポジトリなど、特定のドメインモデリングのパターンが含まれます。

要するに、デザインパターンは設計の「方法」に焦点を当てたもので、DDDはビジネスロジックとソフトウェア設計の「結合」に焦点を当てたアプローチです。DDDは、ビジネスの要件とソフトウェアの設計が密接に結びついている複雑なドメインでとくに有効です。

両者は異なるコンセプトではありますが、DDDのプロジェクトで一般的なデザインパターンが利用されることはよくあります。また、DDD自体も、エンティティやレポジトリなどのパターンを定義しているので、ある意味で特定のドメインに特化したデザインパターン集とも言えます。