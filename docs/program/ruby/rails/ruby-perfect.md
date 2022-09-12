# パーフェクトRuby on Rails

購入した本についてまとめる

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

gemパッケージの仕組みを利用して、
開発しているプロジェクト内でどのgemパッケージを使っているのか、そしてどのバージョンを利用しているのかを明示する仕組みを提供する。
→package.jsonみたいなものだろう

Bundlerを使って使用するgemパッケージをまとめるには`Gemfile`という設定ファイルにgemパッケージ名を記載する。
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
bundle exec [コマンド名]
# bundle execを実行コマンドの前につけなかった場合、グローバルのgemが適用される。
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

Gemfile内にコメントアウトされている行はコメントアウトを外し`bundle install`をすると`bundle exec rails -v`ができる

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
- 社員ID: 1の社員情報を表すURLは`/employees/1`である。

このような規約に従うことでそれぞれのコンポーネントに紐付けを行う作業を省略できる。

- 多くの設定ファイルを書く必要がない
- 共通のルールがあることで他のエンジニアとスムーズなコミュニケーションが取れる

規約に従うことで関心ごとがシンプルになり、**本来注力すべきビジネスロジックへ集中できるようになる。**

---

## Rails ディレクトリについて

### bin/

Railsアプリケーションを開発するために利用する実行コマンドを格納しているディレクトリ
通常Bundlerを使って依存関係を解決している場合、その依存関係を解決した上で実行するために`$ bundle exec rails`のように`exec`をつける。しかしRailsでは利便性や一貫性のため`bundle exec`をつけなくても実行できるコマンドをbin/に用意している。
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
`rake db:migrate`を実行すると最初にschema_migrationsというテーブルを参照しmigration IDを確認する。
そして実行されていないmigrationを検知すると未適用のmigrationファイルを実行しmigration IDを記録する。
そのため`rake db:migrate`を複数回実行しても、実行のたびにCREATE TABLE文が実行されることはない。

- migration ID確認（schema_migrationsテーブル確認）
`rake db:migrate:statusP`というタスクを実行する。

## Rails URL設計の確認

確認する方法は2つある。

1. developmentで動作している時に`http://localhost:3000/rails/info/routes`へ確認する
2. デフォルトで定義されているrakeタスクを実行`rails routes`

GET → show
POST → create
UPDATE → put
DELETE → destroy

## MVCアーキテクチャ

M=Model
データベースとの接続とデータに対する操作、およびビジネスロジック

V=View
Modelのない良いうを参照し視覚表現を行う部分

C=Controller
Modelのロジックを呼び出し、必要なViewの選択などModelとViewをつなぐ部分

---

## model

DBと接続する箇所であり、ActiveRecordを利用するところ。

### scope

モデルにはScopeが定義できる。よく利用する検索条件に名前をつけてひとまとめにしたもの。
繰り返し利用するクエリの再利用性があがる。
クエリに名前をつけることで可読性が上がる。

- scopeメリット
クラスメソッドで検索を実行した場合、何もない場合はnilを返すが
scopeで結果がnilの場合は該当Scopeの検索条件を除外したクエリを発行し必ずActiveRecord::Relationをかえす