# 独習RUBY

## 10.2.2 特異メソッド/特異クラス

特異メソッド  

- いったん作成したインスタンスに対して**後からメソッドを追加するメソッドのこと**
- 特異メソッドは特異クラスが暗黙的に作成されそこに属される。

Rubyの世界では  
>型に厳密な ── たとえばJavaやC#のような言語に慣れた人にとっては、「同一のクラスをもとに生成されたインスタンスは同一のメンバーを持つ」のが常識ですが、Rubyの世界では、
>同一のクラスをもとに生成されたインスタンスであってもそれぞれが持つ変数が同一であるとは限らない。

**クラスメソッドと特異メソッドの違い**  
クラスメソッドも特異メソッドの一種（`self` の部分）
厳密にはRubyにはクラスメソッドという仕組みは存在しない。クラスに属する特異メソッドを定義することでクラスメソッドに見立てている。  
つまりクラスメソッドは特異メソッドと同一。

## 10.2.3 構造体

データの集合だけのクラスが必要になった場合に対して、Rubyは構造体を用意している。  
理解すべきことは `Struct::new` の戻り値がStruct派生クラス（構造体もクラスの一種）のこと  
`Struct::new` した構造体は継承しないのが慣例

```ruby
Person = Struct.new(:name, :age)
```

## 10.3 モジュール

モジュールを利用した多重継承の技法のことをミックスインと呼ぶ。

- インスタンスを生成できない
- 継承できない

利用用途  

- アプリ共通の機能を束ね、特定のクラスにインクルードする（ミックスイン）
- 共通の関数メソッド／定数を束ねる
- 名前空間を定義する
- クラス階層からは独立しているので、特定の機能を割り込ませることは可能（多重継承の回避）

Tips  
このようにクラスに対してなんらかの機能を付与する目的のモジュールでは、名前の接尾辞（サフィックス）に「～able」を付与するのが一般的です。この例であれば `Loggable` で、「ログ機能を使えるようにする」という意味になります。

モジュール関数  
`module_function` メソッドを呼び出すだけで以降のメソッドはすべてモジュール関数とみなされる。  
厳密にはモジュールの特異メソッドとは異なるもの。特定のメソッドに対してプライベートメソッドとモジュールの特異メソッドを同時に定義する。

### モジュール関数は定義も呼び出しもクラスメソッドと同じだがどうする

そのクラスがクラスメソッドしか持たないのであればモジュール関数として定義すべき
