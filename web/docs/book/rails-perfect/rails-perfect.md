# パーフェクトRuby on Rails

購入した本についてまとめる

## railsとは

Rackの仕様に則ったRackアプリケーション

## gemコマンドとは

**Rubyをインストールすると一緒に**インストールされるコマンド。
gemコマンドではRubyで扱う配布用ライブラリであるgemパッケージの管理が行える。

各gem

```sh
# install
gem install

# uninstall
gem uninstall
```

## rakeコマンド

※現在のrailsではRakeタスクもrailsコマンドから実行できるようになったため直接rakeコマンドを使う頻度は少なくなった。

**Rubyをインストールすると一緒に**インストールされるコマンド。
rakeコマンドはmakeコマンド風にタスクを実行するためのタスクランナーで、実行する処理をRakeタスクと呼ぶ。
アプリケーションを起動せず、行いたい処理をCUI（コマンドプロンプトやターミナル）から実行するのに利用がある。
[参考URL](https://qiita.com/yoshito410kam/items/26c3c6e519d4990ed739)

rakeコマンドはデフォルトでカレントディレクトリ内のRakefileというファイルを参照する。

## bundleコマンド

**Rubyをインストールすると一緒に**インストールされるコマンド。  
※bundleコマンドはRuby2.5から本体に組み込まれたため2.5以降別途インストールは不要

gemパッケージの仕組みを利用して、開発しているプロジェクト内でどのgemパッケージを使っているのか、そしてどのバージョンを利用しているのかを明示する仕組みを提供する。

Bundlerを使って使用するgemパッケージをまとめるには `Gemfile` という設定ファイルにgemパッケージ名を記載する。  
そしてstepGemfileに記載されているgemパッケージのバージョンや依存関係を解決した結果をGemfile.lockとして保存する

Bundlerでよく利用するサブコマンド

```sh
# Gemfile（.lock）に書かれているgemパッケージをインストールする
bundle install

# インストール済みのgemパッケージのバージョンを更新する
bundle update [ライブラリ名]

# インストール済みのgemパッケージの一覧を表示する
bundle list

# Gemfileを生成する
bundle init

# Bundlerでインストールされているgemパッケージを使用してコマンドを実行する。
# bundle execを実行コマンドの前につけなかった場合、グローバルのgemが適用される。
bundle exec [コマンド名]
```

## gemがローカルインストールされているか確認

[参考URL](https://qiita.com/tatsumin0206/items/af358f8c92bddb3371c0)

```sh
$ gem list | grep mechanize              # グローバルインストールされているgem一覧
$ bundle exec gem list | grep mechanize  # ローカルインストールされているgem一覧
mechanize (2.7.6)
```

- Tips
[globalにgemをインストールする](https://teratail.com/questions/205653)

## globalにインストールされているgemを確認する

```sh
$ gem environment
- INSTALLATION DIRECTORY: /home/ubuntu/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0
```

で確認
INSTALLATION DIRECTORYの項目

### Bundlerを使って管理する

Bundlerでライブラリを管理するためにはGemfileを作成する必要がある。

```sh
# Gemfile作成
bundle init
```

Gemfile内にコメントアウトされている行はコメントアウトを外し `bundle install` をすると `bundle exec rails -v` ができる

Gemfileに必要なgemを記載しておくことで、特定のプロジェクトでのみ利用するgemを簡単に管理できる。
Railsではプロジェクトの雛形を作成すると自動的にGemfileが作成される

---

## Rails思想

Railsは以下の4つの思想を強く打ち出しています。

- CoC（Convention over Configuration）
- DRY（Don't Repeat Yourself）
- REST（Representational State Transfer）
- 自動テスト

### CoC（Convention over Configuration）

設定より規約という意味。  
**規約に従うことでプログラム内に規律が生まれる**  

- データベースのテーブル名はモデル名の複数形にする（モデル名がEmployeeの場合、テーブル名はemployeesとなる）
- /employeesというURLは社員の一覧を表す
- 社員ID: 1の社員情報を表すURLは `/employees/1` である。

このような規約に従うことでそれぞれのコンポーネントに紐付けを行う作業を省略できる。

- 多くの設定ファイルを書く必要がない
- 共通のルールがあることで他のエンジニアとスムーズなコミュニケーションが取れる

規約に従うことで関心ごとがシンプルになり、**本来注力すべきビジネスロジックへ集中できるようになる。**

設定ファイル（config）などを作るより規約を設けたほうが早いという意味。

---

## Rails ディレクトリについて

### bin/

Railsアプリケーションを開発するために利用する実行コマンドを格納しているディレクトリ
通常Bundlerを使って依存関係を解決している場合、その依存関係を解決した上で実行するために `$ bundle exec rails` のように `exec` をつける。しかしRailsでは利便性や一貫性のため `bundle exec` をつけなくても実行できるコマンドをbin/に用意している。
→このようなファイルをbinstubと呼ぶ

[binstubについて](https://techracho.bpsinc.jp/hachi8833/2021_11_22/25037)

もしRailsプロジェクト内で新たなコマンドを利用する場合はyarnなどの例に倣ってbinディレクトリ内に実行用ファイルを用意しておくと一貫性があり、途中から参画したメンバーにもわかりやすいプロジェクト構成になる。

### config/

アプリケーションの動作に関する設定ファイルを格納するディレクトリ

### lib/

Rakeタスクなどアプリケーションから独立したコードを格納するディレクトリ。
※Rails6.0ではAutoloadの機能自体がZeitwerk置き換えられたこともある傾向から**libディレクトリにアプリケーションから利用するコードを置くことは推奨されていない**

### app

RailsがMVCアーキテクチャを採用しているため**アプリケーションコードは基本的にModel, View, Controllerの3階層に分かれる**

helpers/はViewで利用するヘルパースクリプトになる。

---

## railsコマンド

Rubyをインストールしたらgemコマンドが入るため、gemでrailsをインストールするとrailsコマンドが使える。

### generateコマンド

Railsが提供するgenerateコマンドの中には、データの更新や削除などのテンプレートをひととおり生成するscaffoldという機能がある。

- generate scaffold
scaffold : 足場
このscaffoldは指定したテーブルに対してのCRUD操作を行うMVCそれぞれのコードと、テストやデータベースのテーブル定義を行うmigrationファイルなどが生成される。

## DB操作

- migration実行
`rake db:migrate` を実行すると最初にschema_migrationsというテーブルを参照しmigration IDを確認する。
そして実行されていないmigrationを検知すると未適用のmigrationファイルを実行しmigration IDを記録する。
そのため `rake db:migrate` を複数回実行しても、実行のたびにCREATE TABLE文が実行されることはない。

- migration ID確認（schema_migrationsテーブル確認）
`rake db:migrate:statusP` というタスクを実行する。

## Rails URL設計の確認

確認する方法は2つある。

1. developmentで動作している時に `http://localhost:3000/rails/info/routes` へ確認する
2. デフォルトで定義されているrakeタスクを実行 `rails routes`

GET → show
POST → create
UPDATE → put
DELETE → destroy

---

## 2章

モデリングとは  
あるシステムを作るということは、そのシステムが解決する問題に対して必要な概念を探して、それに対して名前をつけたり、相互の関係性を整理したりすることと言っても過言ではない。

## MVCアーキテクチャ

M=Model  
**データベースとの接続とデータに対する操作**、およびビジネスロジック

V=View  
Modelの内容を参照し視覚表現を行う部分

C=Controller  
Modelのロジックを呼び出し、必要なViewの選択などModelとViewをつなぐ部分

---

## ActiveRecordでのmodel

ActiveRecordによるモデルには、大きく分けて2つの側面がある。  
1つはデータベースと接続し、**データベースのレコードとActiveRecordオブジェクトを結びつけるという役割。**  
上記のようにモデルクラスの実装に何も記述しなくとも、テーブルのカラム情報を取得し、モデルのフィールド情報に自動で反映する機能は、ActiveRecordを大きく特徴付ける機能の1つです。
その他にも、SQLの構築を抽象化する機能やコネクションプール、接続情報を隠蔽する機能を提供します。もう1つは、よりビジネスロジックの実装的な振る舞いに関するところ、すなわちバリデーションや、レコード保存時などに実行するさまざまなコールバックなどを実行する役割

- modelに何も記述しなくても勝手にdbからのカラムをモデルに反映させる。

## Query interface

ActiveRecord::Relationインスタンスを返すやつであればメソッドチェーンで処理を繋げられること。  
このように設計されている理由としては、ActiveRecord::Relationによって検索に必要な情報だけを返すことで、クエリの構築をメソッドチェインで簡潔に記述できます。また、実際のSQLは最初に操作が必要になったタイミングではじめて発行されるため、必要以上にデータベースとの通信が発生してしまうことを抑制する効果もある。

## 任意の箇所でSQLを発行したい

`to_a` メソッドで即座にSQLを発行するテクニック

### scope(よく利用する検索条件に名前をつけてひとまとめにしたもの)

モデルにはScopeが定義できる。  

繰り返し利用するクエリの再利用性があがる
クエリに名前をつけることで可読性が上がる。

- scopeメリット
クラスメソッドで検索を実行した場合、何もない場合はnilを返すが
scopeで結果がnilの場合は該当Scopeの検索条件を除外したクエリを発行し必ずActiveRecord::Relationをかえす

## 1対多

本ひとつ、出版社たくさん（出版社が所有している本はたくさんだから）
出版社側に `has_many` を宣言

## 多対1

`belongs_to` を宣言
本側にbelongs_toを宣言

## 多対多

本と著者の関係がわかりやすい
本は共著という形で複数の著者に書かれることもあり、逆にある著者には複数の著作が存在する場合もある。
ActiveRecordでこれを表現するには中間モデルを作成することになる。

---

第3章

## Rack

[Rackかなりわかりやすい](https://techracho.bpsinc.jp/hachi8833/2022_08_02/77493)

Rackとは**Webアプリケーションサーバ（Pumaなど）**と**Webアプリケーションフレームワーク（rails）**間のインターフェースを共通化した仕様であり実装となっているライブラリ。

Rackを仲介できるインターフェースを持つことでUnicornやPumaといったアプリケーションサーバとRailsをはじめとするフレームワーク間でスムーズなやりとりが行える。

### Railsとの関係性

`rails new` すると生成されるファイル群の中に `config.ru` がある。
これこそがRailsもRackの仕様に則ったアプリケーションであるという証拠。

```ru
# Railsの場合は'config/environment'を通じてRailsとしての前処理やRailsオブジェクトの構築などを実行している。
require_relative 'config/environment'

# Rackの仕様に則り最終的にはrunしている。
run Rails.application
Rails.application.load_server
```

### RailsにRackミドルウェアを追加する

各環境共通の場合は、`lib/middleware/` ディレクトリを作成しそこに配置。

環境限定で動作したい場合は、`config/environments/development.rb` などのファイルに処理を追加する。
`config.middleware.use`

---

## DB

ユーティリティコマンドの `db:create` と `db:drop` は `config/database.yml` に定義されているdatabaseの値を使って作成する。
※RAILS_ENVを指定しない場合はdevelopmentとtest環境のスキーマを作成する。

### マイグレーション確認

`rails db:migrate:status`
マイグレーション状況を確認できる、

マイグレーションファイル内で利用する専用メソッド

up
down
change
upとdownどちらも呼ばれる。

## スキーマファイル

Railsでは**DBの構成**を `db/schema.rb` として残している。
`db:migrate` を実行した時に作成されるものだが、このファイルに書き出される内容はマイグレーションファイルではなく**DBに定義されている内容を反映したもの**

### 利用用途

- `schema.rb` を読み込んでマイグレーションを実行することなく現在のDB環境を作成できる。
- スキーマファイルを読みこむことで大まかなDBの構成を把握する役にも立つ。

### seed

`db:seed` を実行すると `db/seeds.rb` を実行してデータを読み込む。
簡単にデータ投入ができるのでデータ投入の際は!付きのメソッドを利用する

### 複数DB対応

Webアプリケーションの規模が大きくなると応答速度の低下が問題になることがあり、ボトルネックとなるのはDBアクセスに関する部分。
そういった問題を解決し、複数のDBを利用するgemパッケージとしてOctopusなどがあったがRails6.0からはRails標準機能として複数DBへ対応した。

しかし、実際に複数DBとして望まれるケースで多いのは**書き込みと読み込みの負荷を軽減させるために書き込む用のデータベースと、そのデータを同期した読み取り用データベースに分割する構成。**

書き込み用データベースを**プライマリーDB**
レプリケートした読み取り専用データベースを**レプリカDB**

上記の構成の場合、レプリカDBへ直接マイグレーションの適用やデータの書き込みは行わない（RailsではレプリカDBであると明示するため `database.yml` にreplicaを指定する）

実運用ではレプリカDBへの接続は参照権限のみのユーザで接続するのが望ましい。

## 秘密情報

歴史では、以前から設定値や秘密の文字列を取り扱う方法を用意しているが取り扱い方法はより現実に即したものへバージョンアップを繰り返している。その結果Rails5.1では複数の取り扱いが出てきてしまった。
そのため5.2ではそれらの機能を統合した `credentials` と呼ばれる機能を作成し6.0ではより拡張されている。

---
第4章

## webpacker

Rails5.1からはフロントエンド開発で標準的に利用されているwebpackをRailsから利用するためのwebpackerというツールをオプションと利用できるようになった。
6.0からはデフォルトになった。
webpackをRailsから扱いやすくするためのラッパー。

webpackerで扱うエントリーポイント

`app/javascript` 配下で作業。ビルド結果はpublic/packs/jsへ出力。

---
第5章

## Active Jobによる非同期実行

`app/jobs` 配下にファイルがある。

Rails4.2で追加された。
Active Jobを使うことでさまざまなバックエンド（ジョブを管理実行するインフラ）上で実行する非同期処理を統一的に利用する。

非同期処理はメール送信やデータ集計など**時間がかかる処理で使われる。**

## job中身

performメソッドが非同期処理時に呼ばれる。

## Active Jobと非同期バックエンドの直接利用判断

バックエンドにSidekiqを使うとき

1. ActiveJobを利用してSidekiqを使う方法
2. SidekiqのAPIを直接使う方法

Active Jobを使うといいケース

- 標準的な機能のみを使う
- プロジェクト初期段階で、バックエンド選択をまだしていない
- バックエンドを差し替える可能性がある
- ActiveJobに依存している機能（ActionMailerなど）を使う
- ActiveRecordオブジェクトをキューへ追加する時に、デフォルトで用意されているGlobalIDを使った変換処理を利用する

---
第6章

## webアプリケーション

railsを作成する際に不要なコンポーネントを生成しないようにオプションを追加する。
不要なファイルが存在すると開発のノイズになりますし、サーバ起動時に不要なコンポーネントを読み込んだ分、メモリが余計に消費されてしまう。
不要なファイルは可能な限り生成を抑制したり、削除していくと良いでしょう。

---
第11章

サービスオブジェクト

---
第12章

モデル肥大化について

ユースケースのロジックを実装するレイヤーを導入することで、モデルやコントローラーの肥大化を避けることができます。一方で、「レール」から外れることになるので、Railsから受けられる恩恵は小さくなります。したがって、ActiveModelを利用して、モデルと同じようにコントローラーやビューのメソッドとの連携できるようにすることが重要なのです

## 複雑なユースケースを実装する。

Railsのモデルはアプリケーションが対象とする問題領域のロジックに加えて、ユーザとアプリケーションの間のやり取りに関するロジックを実装するレイヤーでもあります。  
モデルに**異なる2種類のロジック**を実装するというこのアプローチは、Railsの高い生産性を実現している要因の1つ。

しかしアプリケーションへの機能要求が複雑になると、このアプローチは機能しなくなる。

## データベースと紐づかないモデルを作る

ActiveModelについて  
サービスオブジェクトのように、素のRubyクラスを定義してそこにユースケースのロジックを実装すること。  
しかし、ユースケースのロジックを実装するレイヤーの場合には、ActiveModelを利用した方がいい。  
※なぜなら、モデルと密に連携するコントローラーやビューのメソッド（たとえば、form_withなど）で利用できないからです。

## ActiveModel

ActiveModelはモデルに関するモジュール群を提供するライブラリであり、ActiveRecordの実装に利用されています。  
ActiveModelを利用することで、自分で定義した素のRubyクラスにもActiveRecordと同等のインターフェースや機能を追加できます。
いわば、データベースと紐づかないモデルを作ることができるのです。
本節では、ActiveModelが提供するモジュール群の中でも代表的なものを紹介します

## ActiveModel::Attributes

ActiveModel::Attributesは、型を持つ属性の定義を容易にしてくれるモジュールです。ActiveRecordの属性のように、型に合わない値を設定すると自動で型変換が行われます。

ActiveModel::Attributesをincludeするだけで、属性を定義するためのattributeメソッドを利用できるようになります。

## フォームオブジェクト

一般的にユースケースのロジックを実装するオブジェクトは、アプリケーションサービスや
