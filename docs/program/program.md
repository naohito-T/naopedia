# 言語

言語について記載していくフォルダ

下にこのディレクトリの各ファイルへのリンクを入れても良いかも

## 新規のプロジェクトに入る時の心構え

全体がわかっていないとコードを書くことが絶対わからない。
必ず新規プロジェクトに入った際には必ず仕様やドキュメントをしっかりみること。

## プログラムを書くまえに考えること

書きながらロジックを構成していくのは上級者。
そうなるべきだが、まずは紙でも良いのでロジックを考える。
ロジックが完成してから書く癖を。
後は遅くなる原因としては仕事の使用

## 変数/メソッド名 コメント

原則使わなくて済む方が良い。

- コメントなしで意味が伝わる命名をする
- 関数の引数は命名だけではなく、TypeScriptの情報量を増やす

## メソッド名

**メソッド名の場合は動詞や助動詞を用いて命名する**

[参考URL](https://qiita.com/KeithYokoma/items/2193cf79ba76563e3db6)

このパターンで適宜考えないといけない

- 真偽値を返すメソッド
- 必要に応じてしか実行されない処理をするメソッド
- 非同期処理に関連するメソッド
- コールバックメソッド
- コレクションの操作に関するメソッド
- 状態に関するメソッド
- オブジェクトのライフサイクルを扱うメソッド
- データに関するメソッド


## クラス名

[参考URL](https://qiita.com/KeithYokoma/items/ee21fec6a3ebb5d1e9a8)

**クラス名は何らかしらの責務を持つモノとして捉えるため名詞用いる**

## inteface

**インターフェースの名前に形容詞を用いることがある。形容詞を用いることでクラスの持つ性質を説明することができるようになる。**

## api ディレクトリ構造 example

```
|- @types ライブラリの型定義の拡張
|- application domain/serviceの実装部分
|- db Migrationファイル
|- domain
    |- entity ORMの定義が書かれている
    |- service できることの記載
|- handler ここがメインのHandler実装
    |- [旧]{tmp} ここはリファクタで消える
|- helper entityの拡張
|- interface
    |- endpoint
    |- params
        |- builder Entityなどからtypesに整形するための処理
        |- error エラーの定義が書かれている
        |- schema Validationに使っていたのちに消す予定
        |- types Request, Responseの値の型を定義している
    |- router ここがAPIの要件
|- job Job群
|- lib 各種ライブラリや、拡張
    |- aws
    |- express
    |- file
    |- random
    |- slack
    |- time
    |- twilio
    |- vivox
|- middleware ミドルウェア群が書かれている
|- [旧] models
|- platform - Auth系の処理がまとまっている
|- registration - entityごとでDBへのアクセスのまとまった処理
|- setting - 設定ファイルが入っている
|- [旧] utils - utility
```

## バージョン

[参考URL](https://docs.oracle.com/cd/E19253-01/819-0395/chp-vers-1/index.html)

x.y.z

x : メジャーな
x.y : マイナーリリース
x.y.z : マイクロリリース


.htaccessと.htpassword
8文字のpassで認識している。