# Ruby on Rails

## Rails作者

[大規模開発に強い理由](https://pr.forkwell.com/articles/dhh-rails-large-scale-development/)

## 参考

[Railsガイド](https://railsguides.jp/)  
[RailsとClean Architectureに関する考察](https://qiita.com/shunjikonishi/items/e39ed8091e1dca817468)  
[【Rails】hashid-railsを用いてIDを難読化・暗号化させる方法](https://techtechmedia.com/hashid-rails/)  

## Rails処理概要

[![Image from Gyazo](https://i.gyazo.com/f932132c9b8d23e980053158fd9eece8.png)](https://gyazo.com/f932132c9b8d23e980053158fd9eece8)

## Rails APIモード

`Ruby on Rails` をバックエンドサーバーとして使用する場合、通常はアプリをAPIとして設定するだけで、セッション、Cookie、レンダリングビューなどの一部の機能がデフォルトで無効になります。

## Rails APIモードでactive adminを導入する方法

[参考URL](https://medium.com/alturasoluciones/how-to-set-up-rails-api-app-to-use-activeadmin-79b418df8aad)

## Rails 名前空間について

[参考URL](https://ja.stackoverflow.com/questions/86424/rails%E3%81%AE%E5%90%8D%E5%89%8D%E7%A9%BA%E9%96%93%E3%81%AE%E7%9B%AE%E7%9A%84%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E7%96%91%E5%95%8F)  
[入れ子とショートシンタックスの違い](https://ninoseki.hatenablog.com/entry/2014/05/31/%E3%83%8D%E3%82%B9%E3%83%88%E3%81%97%E3%81%9F%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%82%92%E6%9B%B8%E3%81%8F%E5%A0%B4%E5%90%88%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9)  
[Railsでの名前空間について(わかりやすい)](https://ja.stackoverflow.com/questions/86424/rails%E3%81%AE%E5%90%8D%E5%89%8D%E7%A9%BA%E9%96%93%E3%81%AE%E7%9B%AE%E7%9A%84%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E7%96%91%E5%95%8F)

>Ruby自体には「名前空間」という名前の機能がありません。しかし、「名前空間」を実現出来ないというわけではありません。モジュールが「名前空間」の機能を提供するとなっています。
>まず、勘違いしてはいけないのは、モジュールは「名前空間」のためだけの機能ではないことです。他のクラスやモジュールにMix-inしたり、オブジェクトそのものの拡張(extend)したり、再定義(refine)の機能を使うためにusingしたりします。それら多くの機能の一つとして、「名前空間」の機能があると言うことです。なお、クラスもモジュールを拡張しているため、同じように「名前空間」に使用することができます。

Rubyにおいて、モジュールを定義する方法には2つの異なるスタイルがある  
それぞれが異なる文脈で使用される。

### 1. ネストされたモジュールの定義:

```ruby
module Infrastructures
  module Nid
  end
end
```

この方法は、モジュールをネスト（入れ子）する形で定義しています。ここでは、`Infrastructures` モジュールの内部に `Nid` モジュールを定義しています。このスタイルは、親モジュール（この場合は `Infrastructures`）がすでに定義されているか、同じスコープ内で定義される場合に使われます。

### 2. 修飾されたモジュール名を使用した定義:

```ruby
module Infrastructures::Nid
end
```

こちらの定義方法では、修飾されたモジュール名（`Infrastructures::Nid`）を使用して、モジュールを一行で定義しています。この方法は、親モジュールがすでに定義されている、またはその定義が不要な場合に便利です。ただし、このスタイルを使用する際には、親モジュール（`Infrastructures`）がすでに定義されていることが前提となります。

### 主な違い

- **前提条件**: 修飾されたモジュール名を使用する方法では、親モジュールがすでに存在している必要があります。ネストされた定義では、親モジュールが存在しない場合でも、その場で定義できます。
- **コンテキストの明確化**: ネストされた定義の方が、モジュールの階層が明確になります。これは、特に大きなアプリケーションや複雑な名前空間の構造を持つ場合に役立ちます。

どちらのスタイルを使用するかは、そのモジュールがどのような文脈で使用されるか、およびコードの可読性や整理のしやすさによって決まります。ただし、両者の間には機能的な違いはありません。モジュールの振る舞いやアクセス可能性に影響を与えることはありません。

## Railsオートロードするファイル(autoload_paths)

```sh
# Railsが自動で読み込むファイルは、以下のディレクトリ内にあるファイルです。
app/assets
app/channels
app/controllers
app/helpers
app/jobs
app/mailers
app/models
app/views
```

また、Railsの命名規則にしたがっているファイルも自動的に読み込まれます。具体的には、以下のようなファイル名に対応しています。

- モデル名の単数形.rb
- コントローラー名の複数形_controller.rb
- ヘルパー名の複数形_helper.rb
- ビュー名の複数形.erb、haml、slimなどのテンプレートエンジンの拡張子を持つファイル
- ジョブ名の複数形_job.rb
- メーラー名の複数形_mailer.rb

以上の命名規則にしたがって、自動的にファイルを読み込むことができます。ただし、ディレクトリ構造やファイル名が命名規則に従っていない場合は、明示的にrequireする必要があります。

## autoload_pathsの仕様

`autoload_paths` は**ディレクトリを自動で読み込むための設定**であり、その中にあるファイルやモジュールまでは自動的に読み込むわけではありません。  
ただし、モジュール名やファイル名がRailsの命名規則に沿っている場合は、明示的にrequireする必要はありません。ただし、独自の命名規則を採用している場合は、明示的にrequireする必要があります。

---

## .ruと.rbの違い

`.rbファイル` は、Rubyのソースコードが含まれるファイル  
`.ruファイル` は、**Rackアプリケーションのエントリーポイント**として機能するRack upファイル

具体的には `.rbファイル` はRubyスクリプトを作成するために使用され、Rubyコードを実行するために、Rubyインタープリターまたはコンパイラによって読み込まれます。
一方 `.ruファイル` は、Rackアプリケーションのエントリーポイントであり、Webサーバーによって読み込まれ、Rackアプリケーションを起動します。

Rackは、Webアプリケーションのインターフェースとして機能する仕組みで、.ruファイルにはRackアプリケーションの情報が含まれています。.rbファイルとは異なり、.ruファイルには実際のアプリケーションコードが含まれていない場合があります。

## RackとRakeの違い

RackとRakeは、Rubyのウェブ開発において異なる目的と役割を持つ2つの異なるコンポーネント。

Rack  
Rackは、Rubyのウェブアプリケーションフレームワークとウェブサーバーの間のインターフェースを提供するライブラリです。  
Rackは、ウェブリクエストとレスポンスの処理を抽象化し、ウェブアプリケーションがさまざまなウェブサーバー上で動作することを可能にします。Rackは、ウェブアプリケーションのミドルウェアを管理し、リクエストの受信からレスポンスの生成までのプロセスを制御します。

Rake  
Rakeは、Rubyのビルドツールおよびタスクランナーです。Rakeは、プロジェクトのビルド、テスト、デプロイメントなどの一連のタスクを定義し、実行するための機能を提供します。Rakeは、RubyのDSL(Domain-Specific Language)を使用してタスクを記述し、依存関係や実行順序などを指定できます。Rakeは特に、Ruby on Railsなどのフレームワークで頻繁に使用され、開発者が独自のカスタムタスクを作成してプロジェクトの自動化を行うための強力なツールとなっています。

要約すると、Rackはウェブアプリケーションとウェブサーバーのインターフェースを提供するライブラリであり、Rakeはビルドやタスクの自動化のためのツールです。両者は異なる目的を持ち、ウェブ開発においてそれぞれ重要な役割を果たしています。

## 最新Railsについて

[Rails7変更点](https://qiita.com/jnchito/items/5c41a7031404c313da1f)

## Rails apiモード

[リファレンス（apiモードについて）](https://railsguides.jp/api_app.html)

以下の3つが行われる。

- 利用するミドルウェアを通常よりも絞り込んでアプリケーションを起動するよう設定する。特に、ブラウザ向けアプリケーションで有用なミドルウェア（cookiesのサポートなど）はデフォルトでは利用しません。

- ApplicationControllerが通常のActionController::BaseではなくActionController::APIを継承します。ミドルウェアと同様、Action Controllerモジュールのうち、ブラウザ向けアプリケーションでしか使われないモジュールをすべて除外します。

- ビュー、ヘルパー、アセットを生成しないようジェネレーターを設定します。

## Rails 7.0 Node

importmap
Rails 7といえば、Node.jsを裏で使う必要がなくなった。
`importmap-rails` が目玉のリリース。
`importmap-rails` を使うことで、フロントエンドのJavaScriptのライブラリを管理してくれるようになる。

## importmap-rails

[参考URL](https://www.bokukoko.info/entry/2022/02/15/153751)

>これで初期化した Rails アプリには なんと、package.json, yarn.lock が存在しない！
>その代わりに、config/importmap.rb にて以下の記載がある。

初期化

```sh
$ vim Gemfile
gem 'importmap-rails'

$ bundle install
$ bundle exec rails importmap:install
```

## Rails 7.0 assetsまわり

webpackerはなくなっている！

[参考URL](https://qiita.com/suketa/items/837eb97bdb48dd8c4688)
[JavaScript BundlingとCSS Bundlingのしくみ](https://qiita.com/kazutosato/items/1ae1cf0ec380a75d4dc4)

railsではJS/CSSなどを総称してassetsと呼んでいる

>Rails 5-6時代に使われたwebpackerは、公式に「has been retired」とされ、Rails 7では `importmap` が標準となりました。
>Rails7はimportmapとは別に、JavaScriptのバンドラやCSSのフレームワークを導入するしくみを用意している。

### Rails7.0でのアセット管理

[Rails 7でフロントエンド開発が大きく変わる](https://re-engines.com/2021/12/27/rails7-frontend/)

>Rails 7.0 では、新たに4つのGemが登場します。これまでとは異なり、開発者はこれらのGemを自分のプロジェクトに合う組み合わせで採用することになります。

---

## Rails7にあとからフロントエンドに入れる

[Rails7にあとからフロントエンドに入れる](https://qiita.com/kazutosato/items/1ae1cf0ec380a75d4dc4)

2つのgem

1. JavaScript Bundling（jsbundling-rails）
2. CSS Bundling（cssbundling-rails）

### JavaScript Bundling（jsbundling-rails）

JSファイルを `app/assets` の下に出力するもの。

### CSS Bundling（cssbundling-rails）

CSSフレームワーク（Bootstrapやbulma）をsassコマンドでapp/assetsの下に出力する。
バンドラやCSSフレームワークはyarnコマンドでnode_modules下にインストールされる

### 後から入れる

各コマンドは、package.jsonの中で指定されます。
開発環境では、foreman（bin/dev）を使ってRailsサーバー、JSの変更監視、CSSの変更監視、の3つを動かす。

```sh
# 後からbootstrapを入れる
bin/rails css:install:bootstrap

# Procfile.dev
# package.json
# bin/dev
# 3つができる
```

### Procfile.dev

アプリケーションのルートにできる `Procfile.dev` では、一度に3つのプログラム（rails、JSバンドラ、sass）が常駐するように設定してある。
`--watch` オプションによってファイルを監視し、変更があれば自動的に変換する。

binディレクトリの下のdevコマンドでは、foremanを使って `Procfile.dev` のコマンドを動かしている。
foremanがないときは自動的にインストールされる。

---

## Railsスタイルガイド

シンボル名、メソッド名、変数名は**スネークケース**にする

## Rails generateコマンド

```sh
# formオブジェクトを作成する
$ rails generate form signUpForm
```

## フォームオブジェクト（Form Object）

`app/forms` ディレクトリは、Railsアプリケーション内でフォームオブジェクトを作成するためのディレクトリ。  
フォームオブジェクトは、モデルとは異なり、DBに保存されないデータの処理やバリデーションを行うために使われる。

フォームオブジェクトは、ActiveModelをincludeして作成されるため、ActiveModelの機能やバリデーションを使うことができます。  
**フォームオブジェクトを利用することで、ビジネスロジックをモデルから分離して、コントローラーからも処理を分離**できます。

たとえば、複数のモデルをまたいで1つのフォームに入力したり、モデルには関係ない入力項目に対してバリデーションを設定する場合などに、フォームオブジェクトを使用できる。

Railsにおけるフォームオブジェクト（Form Object）は、アプリケーションでフォームの入力データを処理するためのオブジェクトです。
Railsでは、主にActiveModelを拡張してフォームオブジェクトを作成する。

フォームオブジェクトは、以下のような目的で使用されます:

1. フォームの入力データのバリデーションや処理を行う
2. 複数のモデル間でのデータの受け渡しを行う
3. 複雑なフォームのロジックや操作をカプセル化する
4. フォームの表示や操作に関連するビジネスロジックを実装する

フォームオブジェクトは、通常、ActiveModelを継承し、必要な属性やバリデーションルールを定義します。これにより、フォームの入力データを扱うためのモデルのような振る舞いを持たせることができます。

例えば、以下のようなケースでフォームオブジェクトが有用です:

- 複数のモデルにまたがるフォームを扱う場合（例: ユーザー登録フォームでユーザーモデルとプロフィールモデルのデータを扱う）
- フォームの入力データをバリデーションしたり、特定のルールに従って処理したりする場合
- ビジネスロジックが複雑なフォームを扱う場合（例: 商品購入フォームで在庫の確認や決済処理を行う）

フォームオブジェクトは、コントローラー内でインスタンス化され、ビューに渡されます。ビューでは、フォームオブジェクトの属性やエラーメッセージを使用してフォームを表示し、ユーザーからの入力を受け取ります。コントローラーは、フォームオブジェクトから入力データを取得し、適切な処理を行います（データ保存、他のモデルへのデータの伝達など）。

フォームオブジェクトを使用することで、フォームのロジックやバリデーションルールがコントローラーやモデルから分離され、コードの再利用性や保守性が向上します。また、フォームごとに独立したテストを作成することも容易になり

## Rails欠点

[参考URL](https://techlife.cookpad.com/entry/2017/04/06/172601)

RailsはDBのテーブルをそのまま読み書きするような単純なアプリケーションは簡単にできるが、より複雑なアプリケーションではそのぶん慎重な設計が必用になるため、Trailblazerのような複雑なWebアプリケーション構築を支援するライブラリが注目を集めている。

## Railsの設計哲学

1. DRY(Don't Repeat Yourself): 繰り返しを避けよ

DRYはDRY原則とも呼ばれる。Railsを使ったWebアプリケーションでは同じことを繰り返し記述するのは避けなければならない。
同じことをソースコードや設定ファイルの中で繰り返し記述するのはムダ。
仕様変更やバグフィックスのときに一部を変更し忘れる可能性が高くなる。
DRYを意識することで効率よく、品質のよいアプリケーションが作成できる。

2. 設定より規約（Conventition over Configurations）

「規約」とは、言い換えれば「デフォルトの設定」です。**あらかじめ用意された規約にしたがってアプリケーションを開発することで、記述量を大幅に減らせる。**
たとえば、モデルには命名規約がありテーブル名をmembersのように複数形にすると、モデルのクラス名は単数形のMember、クラスを記述するファイル名はmember.rbとなります。決まりきった手順に従うことで余計な設定を記述する必要がなくなり、プログラマはコードへ集中できるようになります。

Railsで採用されているルール（規約）にしたがっていれば、Active Recordモデルの作成時に書かなければならない設定用コードは最小限で済みますし、設定用コードが完全に不要になることすらあります。これは「設定がほとんどの場合で共通ならば、その設定をアプリケーションのデフォルトにすべきである」という考えに基づいてる。

## Rails でのアーキテクチャー

## MVCへの対応

RailsではMVCでの役割をフォルダーごとに分けることで開発もスムーズに行えるような仕組みになっている。

---

## Rails model

モデルとDBは1対1の相互関係で成り立っている。
※開発現場でもモデルが一番最初に作られる。
※モデルはただのクラスだがDBと連携するクラスをRailsではモデルと呼ぶ。

## Rails ディレクトリ詳細

[参考URL](http://www.code-magagine.com/?p=4326)

---

## Rails 便利コマンド

Railsでは `rails generate controller` などのコマンドでcontrollerやmodelをコマンドラインから生成できる。
※設定で生成するファイルを絞ることができる。

### bin/railsとbundle exec railsの違い

[参考URL](https://k-koh.hatenablog.com/entry/2020/05/15/124256)

>bin/rails読むと
>config/bootを読み込んでいる事が分かると思います。
>config/boot.rbを読むとbundler/setupを読んでいます。
>bundler/setupが実行されるとbundle execと同じ事が行われるので
>結論としては違いはありません。

---

## Rails タイムゾーン

デフォルトではUTC
そのため `created_at` や `update_at` は日本時刻の9時間前になる。

## Railsで新規タグ

Railsでクラスを作るには、直接ファイルを作成するのではなく専用のコマンドをつかうことが多い。

## Rails 3つのモード(environment)

Railsには3種類ある

開発 : develop : コードを書きながらブラウザで確認するための環境
テスト : test : 自動テストのための環境
本番 : production : ウェブサイトを一般に公開する時の環境

## Dockerを使わない場合のRails

Dockerを使わないRailsデプロイでは、以下の環境変数が自動で設定される。
**Docker経由の場合は、自分で本番用の環境変数を設定する必要がある。**

- `LANG`: en_US.UTF-8

- `RACK_ENV`: production
Rackへ現在の環境を示す変数
Rackとは … http送受信処理を担当するモジュールのこと。

- `RAILS_ENV`: production
Railsへ現在の環境を示す変数

- `RAILS_LOG_TO_STDOUT`: enabled
logを標準で出力するか否かのフラグ。enabled = 出力する。

- `RAILS_SERVE_STATIC_FILES`: enabled
publicディレクトリからの静的ファイルを提供してもらう（apiモードではあんま意味ないかも）

## Railsで使われているMVCのデザインパターン

**APIモードではViewは存在しない。**

- モデル
モデルはデータとビジネスロジックを表す。ビジネスロジックとはたとえば給与計算ロジックのようなアプリケーションドメイン特有の処理のこと(localhost/api/users)→userの一覧を出すみたいな
Railsではモデル層はActiveModelという概念に抽象化され、デフォルトではActiveRecordというO/Rマッピングの機能を提供するライブラリが使われる。
ActiveRecordでは、リレーショナルデータベースのテーブルに対応するモデルクラスにアプリケーションのデータとロジックを実装していきます。データの永続化に関する処理の多くはActiveRecordが担当してくれるので、単純なモデルであれば、プログラマが書かなければならないコードの量は、ごくわずかです。一般的にプログラマがモデルに追加することの多いコードとしては、クラスの持つ値の検証や、他モデルとの連携が挙げられます。

- コントローラ
ユーザのリクエストを受けて、モデルに適切な動作を要求する。
またどのビューをどの組み合わせで利用するかを決定する。
Webアプリケーションにおけるコントローラーには、このほかWebに関する一般的な仕事を受け持つという側面があります。たとえばセッション管理や、URLの解釈、HTTPリクエスト・レスポンスの処理、クッキーの管理などを担当します
Railsでは、コントローラーはAbstractControllerとして抽象化された上で、Webアプリケーション用の機能がActionControllerとして実現されています。プログラマは、これを継承したApplicationController（アプリケーションごとに1つ用意されます）に共通機能を追加したり、さらにこのApplicationControllerを継承した各種のコントローラークラスを追加していくことで開発を進めます。なお、個々のリクエストに直接的に対応する機能を実装した部分はアクションと呼ばれ、コントローラークラスのpublicなインスタンスメソッドとして実装されます。

## Railsの構成と機能

Railsは**復数のコンポーネントで構成されている。**
Railsの実体はコンポーネント（Rubyで書かれたライブラリ）の集合体
**基本とある3つのコンポーネントの名前を覚える**

- Active Record : モデル
- Active View : ビュー
- Active Controller : コントローラー

## Rails APIモードとは

Rails APIモードとは、API作成に特化したモード
APIモードではMVCのV(ビュー)が存在しないため、rails newを実行した際にビューに関するファイルやGemが生成されません。
API作成に特化したモードのことで、Rails5で実装された機能らしいです。 簡単に今までのRailsとの違いを説明すると、MVCでいう、Viewの部分が存在しません。 変わりにそのURLにアクセスするとerbを返さず、jsonを返す仕様になっています。 また、標準で入っているGemもViewの分が必要なくなっているので、普通に立ち上げたRailsのプロジェクトよりも少なくなっています。 詳しくは各々で調べてみてください。

- APIモードの違い
[参考URL](https://note.com/icchoco/n/nd408d2a9b2c8)

---

## gemとは

gemはRubyGemsと呼ばれるRuby用のパッケージ管理システムによって管理されたライブラリ
RubyGemsが提供するgemコマンドを通じてインストール等ができます。

**インストールしたgemを削除する**
Gemfileから記述を消し `bundle install` する。

## gem version up 作成

>Railsアプリケーションの開発現場で、いつどのようにgemをバージョンアップしたらよいかは悩ましい問題です。こまめにバージョンアップしていくのが一番ですが、テストコードが書かれておらず確認のコストが高いなどの理由で、リリース後にまったくバージョンを上げられないようなプロジェクトも少なくありません。しかし、Railsアプリケーションの開発でgemのバージョンをまったく上げずにすませることはほぼ不可能です。もし利用しているgemに脆弱性が発見されたらどうしたらよいでしょうか？バージョンが上げられないと、そのまま脆弱性のあるコードを使い続けるか、自分たちでパッチを当てる必要があります。ただ、gemのバージョンを固定している環境であれば、脆弱性対策は何もしない、となる可能性が高そうです。これはビジネスにおける大きなリスクになるでしょう。

上記にもあるように
gemのバージョンを上げていくには**まずテストを書き、その上でバージョンアップを続けられる仕組みを作ることが重要。**
自動でgemバージョンアップ用のプルリクエストを作成してくれるサービスを使ったりする（GitHub Dependabotなど）

---

## bundler、Gemfile、Gemfile.lockの関係性について

[参考URL](https://qiita.com/nishina555/items/1b343d368c5ecec6aecf)

Ruby on RailsでWebアプリケーション（以降ではRailsアプリと略します）を開発をするにあたり、gemの活用は開発効率をあげるために重要

### bundler（yarn, npmと同一）

bundlerは依存関係にあるgemの依存関係やバージョンを管理してくれるgem
**bundlerを利用することで依存関係にあるgemの一括インストール。gemのバージョン管理ができるようになる**
`$ bundle install` を使って、Gemfileに記載されたgemをインストールする。
※`--without` なしに `bundle install` した場合は、すべてのgemがインストールされる。

bundle configとは
[参考URL](https://qiita.com/ren0826jam/items/1a2131f8e0f6921a0b98)
Bundlerの設定システムと対話をできるもの。

Bundlerは設定を下記の優先順位にしたがって取得する。

1. ローカルアプリケーション（app/.bundle/configp）
2. 環境変数
3. ユーザのホームディレクトリ（~/.bundle/config）

`bundle list`
プラグインが入っているか確認ができる。

## bundle install時に --path vendor/bundleをつける必要性

[bundle install時に--path vendor/bundleを付ける必要性は本当にあるのか、もう一度よく考えてみよう](https://qiita.com/jnchito/items/99b1dbea1767a5095d85)

`bundle install` コマンドを実行するときRuby界には大きく分けて2つの流派がある。
それは「--path vendor/bundleを付ける派」と「付けない派」

### Gemfile（package.jsonみたいな）

GemfileとはRailesアプリで利用されるgemの一覧を管理するファイル
bundlerによってインストールされるgemはどこで管理されているのか。

## Rails 開発モードと本番モード

[参考URL](http://programing-kiso-note.blogspot.com/2014/01/ruby-on-rails.html)

Railsには開発モードと本番モードという2つのモードがあり、それぞれ**役割ごとにデータベースを切り替えて使う機能**が備わっている。

本番環境への切り替え方は以下の用にする

1. 環境変数の設定

```sh
# Linuxの場合
export RAILS_ENV=production
# windowsの場合は
set RAILS_ENV=production
```

2. モードが変わったかどうかは以下のコマンドで確認

`rails console` でコンソールを開く。
`Rails.env` とコマンドを叩く、これで現在の開発モードが出てくる。

3.precompileをする。
assetsの圧縮ファイルを作成する事が目的？SASSのbuild、JSファイルの圧縮などを行っておくのだと思われる。これを行う事により高速に動作する。
確認したところ圧縮しているわけではなさそう。キャッシュファイルの生成と書いてはいる。

4. 本番モードに切り替えた場合データベースをシードから作っていないので
作成する。
rake db:create
rake db:migrate

---

## Rails フォルダー構成

[pageの真ん中らへんにある](https://railstutorial.jp/chapters/beginning?version=6.0)

```sh
store            … アプリケーションのルートディレクトリ
  app            … MVCに関わるアプリケーションの中心的なコード（モデル・ビュー・コントローラ・ヘルパー）
    controllers  … コントローラークラス
    helpers      … ヘルパーモジュール（ビュー用のヘルパーメソッド）
    mailers      … メール用のコントローラー
    models       … モデルクラス
    views        … テンプレート類
      layouts    … テンプレートに適用するレイアウト
  config         … 設定ファイル類
    environments … 開発、テスト、本番運用といった環境ごとの設定
    initializers … アプリケーション起動時に実行したいファイル
    locales      … 国際化に関するリソース
  db             … データベースに関するファイル
  doc            … rdocなどのドキュメント
  lib            … アプリケーションが使うライブラリコード全般（taskは`lib/tasks/*`に配置する）
  log            … アプリケーションが出力するログ
  public         … Webの静的なコンテンツ
  script         … ユーティリティースクリプト
  test           … Railsのデフォルトの自動テストに関するファイル
  tmp            … 一時ファイル
  vendor         … アプリケーション外部に由来するコード
    plugin       … Railsプラグイン
```

`app` にはモデル、コントローラー、ヘルパー等の決まった物以外は置かない方がいい。
`app` 内のパス構成は、Railsで決められた通りであることが前提となっているため、将来のバージョンアップで予期せぬ衝突が発生する可能性。
それらではない自作のクラスやモジュールは"lib"内に置く方が良いでしょう。

### initializers

initializers以下においたファイルはサーバ起動時にのみ読み込まれるため、追加や編集をした場合は**サーバを再起動する必要がある。**

---

## Rails url

[参考URL](https://qiita.com/190131start/items/49e2e9a42f49f17e45c6)

resources :users
6つのアクションが自動生成されますね。
これはREST設計になっています。

GET /users            users#index
POST /users           users#create
GET /users/:id        users#show
PATCH /users/:id      users#update
PUT /users/:id        users#update
DELETE /users/:id     users#destroy

### リソースベースのルーティング(Rails default)

[リファレンス](https://railsguides.jp/routing.html)

リソースベースのルーティング（以下リソースルーティング）を使うことで以下が勝手に定義される。

**ルーティング**
リソースベースで構成されたコントローラーに対応する共通のルーティングを手軽に宣言できます。resourcesを宣言するだけで、コントローラーのindex、show、new、edit、create、update、destroyアクションを個別に宣言しなくても1行で宣言が完了します。

**ヘルパーメソッド**
リソースフルなルーティングを作成すると、アプリケーションのコントローラで多くのヘルパーが利用できるようになります。resources :photosというルーティングを例に取ってみましょう。

photos_pathは/photosを返します
new_photo_pathは/photos/newを返します
edit_photo_path(:id)は/photos/:id/editを返します（edit_photo_path(10)であれば/photos/10/editを返します）
photo_path(:id)は/photos/:idを返します（photo_path(10)であれば/photos/10を返します）

## Rails  ルーティングを確認する方法

[参考URL](https://sakurawi.hateblo.jp/entry/rails-route)

ファイルで確認する方法は `config/routes.rb` でみる

Railsの流れとしては
URLにアクセス（+アクションメソッド）すれば、どのコントローラーアクションが実行されるかを示したもの。

CLI上
`$ rails routes`
`config/routes.rb` の中身がCLIで見られる。

ブラウザで確認

## Puma

[参考URL](https://nekorails.hatenablog.com/entry/2018/10/12/101011)

Pumaとは、複数のリクエストを並行しうて処理できる高速化を目的としたWebサーバ
Rails5以降はデフォルトでpumaが導入されており、自ら導入する必要はありません。

## docker  rails

[参考URL](https://qiita.com/eighty8/items/0288ab9c127ddb683315)

---

## rails debug

[参考URL](https://qiita.com/nishina555/items/e5886339d381db61b412)

```ruby
puts ps
puts current_external_id
puts new_external_id

# get fire again22
# <PaymentSetting:0x0000ffff50fbe668>
# price_1GwjUCI8OazorEAhkvB0EXBI
# price_1GwjUCI8OazorEAhtLlr784x
# get fire again2

# inspectを使えば、メモリ値の中身を見れる。
puts ps.inspect
puts current_external_id
puts new_external_id

# get fire again22
#<PaymentSetting id: 1, service_type: "stripe", payment_type: "card", is_subscription: true, period: 1, status: "active", created_at: "2022-02-03 07:29:41", updated_at: "2022-02-03 07:29:41", visible: true>
# price_1GwjUCI8OazorEAhkvB0EXBI
# price_1GwjUCI8OazorEAhtLlr784x
# get fire again2
```

## Rails logger

[参考URL](https://qiita.com/NaokiIshimura/items/dbf072c313f36c2d9dcc)
`puts` or `logger` がある。

`puts` はどの環境（ENV）でも標準出力に吐かれる。
`logger` はdevelopmentのみが標準出力される。

## -b 0.0.0.0

>実は、rails のプロジェクトのポカです。
>危ないので、デフォルトを、ローカルからしか接続できない様に変更したのに
>マニュアルを変更するのを忘れているのです。
>と、表示されているので、実は、分かりますけどもね。
>と表示されていないと、グローバルアドレスからは、接続できません。
>起動時に
>rails server -b 0.0.0.0
>とやらないといけなくなったようです。
>今まで、何も指定しなくても接続できたものを、
>-b 0.0.0.0
>を指定しないと、localhost からしか接続できない仕様変更をして、説明をするのを怠っているのです。

[参考URL](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q10142609100)

rails serverのコマンドオプションとなります。
**railsのプロセスをどのipアドレスにバインドするかを指定**する。
ここではlocalhostのipアドレス「127.0.0.1」を「0.0.0.0」にバインドしています。
なぜこんな事をするのか
**仮想環境で起動したRailsは、localhostのipアドレス「127.0.0.1」でアクセスできない**
そこで仮想外部からアクセスできるように、ip「0.0.0.0」に紐付けをする必要がある。
これにより自分のPC上ブラウザからRailsへアクセスできるようになる。

## Tips

[参考URL](https://hacktomo.hatenablog.com/entry/2017/12/14/012423)

```sh
# ルーティング確認(api起動をしている際)
$ rails routes
# rails内の環境変数を確認したい場合(コンソールを出す : console の略)
$ rails c

```

## DBの読み書きに使用するタイムゾーン

Railsにはアプリのタイムゾーンとは別に、DBの読み書きに使用するタイムゾーンがある。
※これはどのバックエンドでも言えることだろう

## 定数管理

[参考URL](https://techblog.kyamanak.com/entry/2017/07/05/002655)
[config](https://qiita.com/srockstyle/items/daed31a78c343e607822)
[config/gem初期設定](http://vdeep.net/rubyonrails-config-gem)

自分で作るパターンもあればgemを使うパターンもある。
gemを使わないパターンがあるとしたら以下がオーソドックス

1. `application_controller.rb` で定数を管理する方法
2. `config/initializers/constants.rb` のようなファイルを用意して、そこで定数を管理する方法

`application_controller.rb` は**アプリケーション共通の処理を管理する場所**なので、ここで定数を管理するのはあまり相応しくない。

`config/initializers/constants.rb` のようにファイルを用意して、そこで定数を管理する方法のがいい。

- gemを使うパターン
[参考URL](https://qiita.com/sazumy/items/8d3b06d0d42af114a383)

`config` が一番定番。
Settingslogic→あまり使われていない。

---

## Rails6でのZeitwerk(ツァイトベルク)

[参考URL](https://zenn.dev/murakamiiii/articles/893d83626c9f15)

- そもそもなぜRailsではrequireなしにファイルを読み込むのか

他の言語などにおいて、他のファイルを読み込むとなればimportするなどして明示的に読み込む必要があるが、**Railsではそれをよしなにやってくれる。**
Zeitwerkという仕組みがRailsには組み込まれているから

Rails6から自動読み込みモードZeitwerkが追加された。

---

## プロジェクト構造

Railsアプリケーションでは**ファイル名はそれらが定義する定数と一致する必要**があり、**ディレクトリは名前空間**として機能する
Zeitwerkは例として、app/controllers/users_controller.rb定数を定義するUsersController（クラス）のことを期待しています。

## Rails6からのlibディレクトリ以下のファイル読み込み

Rails6のデフォルトではlibディレクトリ以下のファイルは読み込まれない

読み込む方法は2つある

1. requireで呼び出し

読み込みたい場所でrequireで宣言する方法
Railsがデフォルトで読み込むパスにはapp/libまで設定されている。それ以下のファイルパスを渡す。

api/lib/validator/email_validator.rbの場合
=> "validator/email_validator.rb"のパスを渡す

2. application.rbで呼び出し

Rails6のオートロードシステム（Zeitwerk）に読み込むパスを追加する方法

## rails での test

Railsのデフォルトではfixture(フィクスチャー)を使ってテストデータを生成する。

- fixtureとは
fixtureとは、Railsが用意しているテストデータを生成するための方法です。
この方法を使う場合、テストデータはymlファイルで生成する。

## Pundit

[参考URL](https://qiita.com/yutaro50/items/52484b7ae4ca87aa99a2)

Rubyのgemライブラリ
**認可の仕組みを提供してくれる**
ユーザによってページ表示の許可・拒否をしたり表示情報の範囲を変えたりできるgem

## module

[参考URL](https://techplay.jp/column/536)

moduleには部品の集まりや区分という意味になる。
Rubyの**moduleはclassと同じようにmodule内に関数の定義ができること、**プログラム上での役割や振る舞いをまとめることができる。

classとの違いは？

1. moduleからインスタンスが生成できないこと
2. moduleは継承ができない

- moduleを使うメリット

```ruby
module Car
  class SuperCar
    def self.introduce
      puts "This is SuperCar"
    end
  end
end

class SuperCar
  def self.introduce
    puts "これはスーパーカーです"
  end
end

Car::SuperCar.introduce # module呼び出し
SuperCar.introduce # class呼び出し
```

module名とclass名は同名であるが、**moduleには名前空間としての役割を持っているためコンパイル上では別のものとなっている。**

## ruby独自の機能にMix-in

Mix-inすることでmodule内のメソッドをインスタンスメソッドとして利用することがができる。
※includeでの拡張は静的となる。

```ruby
module Lion
  def cryLion
    puts "ガオー！"
  end
end

module Cat
  def cryCat
    puts "ニャー"
  end
end

class Animal
  include Lion, Cat # moduleの機能をincludeしている
end

obj = Animal.new

obj.cryLion # Lionクラスのmethodを利用
obj.cryCat  # Catクラスのmethodを利用
```

---

ここから本

## Rails処理順序(基本)

1. ブラウザからのリクエストを受け取ると、Railsはパスを調べroutes.rbにしたがってどのコントローラのどのアクションを選べば良いかを決める(Controllerの中にアクションは複数ある)
2. Railsは選ばれたアクション(メソッド)を実行する(アクションにはモデルとの間で情報のやり取りをするプログラム)を書く
3. モデルはDBのテーブルと対応している、アクションはモデルから取得した情報のうち、表示に必要なものをインスタンス変数に保存し返す

## route

RailsアプリケーションではRESTの原則にしたがってデータをリソースとして扱う
>RailsにはRESTに基づいた作法でウェブアプリケーションを作成する機能がある。

## Railsにおけるリソースとは

**コントローラーが扱う対象に名前をつけたもの。**
リソース名を設定するには `config/routes.rb` にresourcesメソッドを追加するだけ

`resources: リソース名の複数形で記述する`

**上記で7つのアクションのルーティングが設定できる。**

これをRESTフルなルーティング、またはリソースベースのルーティングと呼ぶ

## controllers コントローラー

コントローラーは**複数系で定義**する。
※リソースを扱うコントローラーはMembersControllerの様に、リソース名+Controllerという名前が一般的

DHH（railsを作った人）が述べているコントローラーの作りかた
[参考URL](https://postd.cc/how-dhh-organizes-his-rails-controllers/)

## config/routes.rb

```ruby
resources :orders, only: [:index]
```

必ずorderのモデルが必要ではない。
リソース名に対応したコントローラーに対して、**7つのアクションのルーティングを自動的に設定するだけ**

## strong parameter

[参考URL](https://qiita.com/ozackiee/items/f100fd51f4839b3fdca8)
ストロングパラメーターは**Web上から受けつけたパラメーターが本当に安全なデータかどうか**を検証した上で、取得するための仕組み。Rails4から実装されている。
フォームから送信されてきたparameterで**どのparameterを許可するかホワイトリストを実装する。**

命名規則慣例
メソッド名に命名規則はないようですが `モデル名_params` とするのが一般的。
また実行結果として、許可されたカラムの値だけを抽出しハッシュ形式で呼び出し元に値を返す。

permit
permitメソッドを使用する事で**許可された値のみ**を取得できる。
そのため、permitメソッドの引数には登録を許可するすべてのカラム名を指定しておく必要があります。もし、許可されいないカラムがparams内に存在した場合、そのデータは取得されず無視されます。

## リソースを扱うコントローラー

コントローラーでは7つのアクションを用意する
この7つは原則としてデータベースの基本操作であるCRUDを実装したもの

api/app/controllers

```ruby
module User::Apis::V1::User
  class PaymentHistoriesController < ApiController

    def index
      params = index_params
      offset = params[:offset] || 0
      authorize(nil, policy_class: PaymentHistoryPolicy)

      common_query = policy_scope(nil, policy_scope_class: PaymentHistoryPolicy::Scope).ransack(params[:q]).result
      payment_histories = common_query.
                            order(captured_at: :desc).
                            limit(limit).
                            offset(offset)
      total_count = common_query.count

      render json: payment_histories, root: "payment_histories", meta: total_count, meta_key: "total_count",
             include: SERIALIZER_INCLUDE, adapter: :json
    end
  end
end
```

## 7つのアクション

7つのアクションを呼び出すには以下画像をみる。
HTTPメソッドの組み合わせを使う。

- index
リソースの一覧を表示する
- new
リソースを追加する(テーブルに新しいレコードを作成する)ためのフォームを表示する
- create
リソースを作成する(テーブルに新しいレコードを作成する)
- show
リソースの属性を表示する(レコードの内容を表示する)
- edit
リソースを更新する(既存のレコードのカラムを更新する)ためのフォームを表示する
- update
リソースを更新する(既存のレコードのカラムを更新する)
- destroy
リソースを削除する(テーブルからレコードを削除する)

## 7つのアクション以外の追加

任意のアクションを追加するにはresourcesメソッドにブロックを渡しブロックの中でもHTTPメソっドを表すメソッド アクション名を記述

## パスを返すメソッドが使える(resource)

リソースを指定すると、コントローラーのアクションを表すパスを取得できる

## 特定のアクションを使わない場合

```ruby
resources :contents, only: [:index, :show, :create, :update]
```

onlyオプションに渡す
上記だと:index, :show, :create, :updateアクションのルーティングだけ設定する。

## Rails起動ガイド

[参考URL](https://railsguides.jp/initialization.html)

1. bin/railsが読み込まれる

```ruby
#!/usr/bin/env ruby
APP_PATH = File.expand_path('../config/application', __dir__)
require_relative "../config/boot"
require "rails/commands" # ここでAPP_PATH定数が使われる
```

2. /config/boot.rbが読み込まれる

```ruby

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Gemfileが存在する場合は、bundler/setupをrequireする
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
```

3. rails/commmands.rbを実行する

2が終わると、次に**コマンドの別名を拡張するrails/commandsをrequireする**
拡張されたのは以下

```ruby
require "rails/command"

aliases = {
  "g"  => "generate",
  "d"  => "destroy",
  "c"  => "console",
  "s"  => "server",
  "db" => "dbconsole",
  "r"  => "runner",
  "t"  => "test"
}

command = ARGV.shift
command = aliases[command] || command

Rails::Command.invoke command, ARGV
```

## /initializers以下のrbファイル

アプリケーション起動時にロードされるもので、初期化処理で使われる
自分でrbファイルを追加して使うことも可能

## 国際化 internationalization 略してi18nと呼ばれる

---

## 単数リソース

membersリソースの重要な特徴は、それが集合的な概念であるということ。
0人以上のメンバーからなる集まりを表現している。
**しかしウェブアプリケーションを構成する要素の中には、多くとも1個しか存在しないものがある。**
この種のリソースを単数リソースと呼ぶ

単数リソースの例として
セッション・自分のアカウント情報・自分のパスワード

## 単数リソースのルーティング

単数リソースのルーティングを設定するには、config/routes.rbの中でresourcesメソッドではなく、単数系のresourceメソッドを使う。

```ruby
resource :account
```

上記のように書いてもこのリソースを扱うコントローラーの名前は `AccountsController(複数形のs)に注意`

**単数リソースのため集合を扱うindexアクションはない**

## Railsでのセッション

Railsはセッションデータを符号化してクッキーに保存するが、暗号化はしないためユーザがデータを解読できることに注意
ただし、セッションデータが改ざんされた場合はエラーになる仕組みになる。

## Railsでの暗号化カラムを使う準備

パスワードのハッシュ値(ダイジェスト)をホゾのするためのカラムはpassword_digestのカラム名を指定する必要がある。

1. カラムにpassword_digestを追加する
2. クラスメソッドを追加
クラスメソッドhas_secure_passwordを用いると、パスワードの保存と認証のためのしくみをモデルクラスに追加することができる

```ruby
class Member < ApplicationRecord
  has_secure_password

  validates :number, presence: true,
end
```

この変更の結果、Memberクラスにpasswordおよびpassword_confirmationという2つの属性が定できるこの義される。

passwordカラム : パスワードそのもの
password_confirmationカラム : 確認用のパスワード

## Rails Auth

deviseが有名
通常Railsのモデル作成は `rails g model User` などだが、deviseで新規登録やログインをしたいためdeviseのgenerateコマンドを使用する。

## devise

[Rails deviseで使えるようになるヘルパーメソッド一覧](https://qiita.com/tobita0000/items/866de191635e6d74e392)

## アクション・コールバック

上は8章まで

---

## モデル間の関連付け

CarクラスとWheelsクラスがあるとする。
関連付けを行うにはCarクラスに以下を記載する。

```ruby
class Car
  has_many :wheels
end
```

has_manyはモデル間の関連付けを指定するメソッド。これによりCarモデルとWheelモデルの間に**1対多の関連付け**が設定され、**Carモデルにインスタンスメソッドwheelsが追加される。**

## 関連付けを作るメソッド

Railsでは、モデル間の関連付けをモデルクラスのメソッドhas_manyおよびbelongs_toで作る
**has_manyによって使えるようになった参照元のメソッドが返すにはリレーションオブジェクト**

- 1対多の関連付け
has_manyを使用
つまり、そのモデルクラスの**テーブルの複数のレコードが別のテーブルのレコード1つを**参照する結びつきを作る

以下の図を見てほしい
参照先のモデルクラスでhas_many（~をたくさんもつ）を使えば、1対多を実現する。

```ruby
# こっちが参照先のクラス
class Car < ApplicationRecord
  has_many: wheels # has_manyに渡す名前は複数形にする。
end
```

上記により、以下が可能となる。
車輪を作成し、自動車に関連付けて保存するには次のように記述する。

```ruby
@wheel = Wheel.new
@wheel.car = @car
@wheel.save
```

自動車から車輪を関連付けるには `<<` で追加をする。`<<` を使うと、関連付けと車輪のレコードの保存が同時に行われます。

```ruby
@car.wheel << @wheel
```

## 関連付けルール

has_manyとbelongs_toでモデル間の関連付けを表すときには、名前について次のルールがある。
外部キーのカラム名は、car_idのように「参照先のテーブル名（モデル名）を単数形にしたもの」＋「_id」とする。
belongs_toに指定する名前は、テーブル名（モデル名）の単数形を使う。
has_manyに指定する名前は、テーブル名（モデル名）の複数形を使う。

**関連するキー(カラム名)を替えたい時**
外部キーのカラム名がルールと異なるときは、foreign_keyオプションでカラム名が指定できる。

```ruby
class Car < ApplicationRecord
  has_many :engins, foreign_key: "vehicle_id"
end

class Engine < ApplicationRecord
  belongs_to :car, foreign_key: "vehicle_id"
end
```

**関連付けで使われるメソッド名を替えたい時**
class_nameオプションを使う。

```ruby
class Car < ApplicationRecord
  has_many :engins, class_name: "Motor"
end
```

**参照元にルールを適用したい時**
dependent

```ruby
class Car < ApplicationRecord
  has_many :engins, dependent: :destory # 参照先のレコードを削除した時に参照元のレコードも削除
  has_many :engins, dependent: :nullify # 参照先のレコードを削除した時に参照元の外部キーがNULLになる
end
```

## 外部キー成約

---

## 名前空間

名前空間を導入する理由
例
会員情報やニュース記事を誰でも編集できるものだった。編集権限を管理者だけにしたい

大体のサイトの利用者は操作権限の観点から次の3点に分けれる

- 訪問者(サイトにログインしていないユーザ)
- 一般会員(サイトにログインしているadmin属性がfalseのユーザ)
- 管理者(サイトにログインしているadmin属性がtrueのユーザ)

## 名前空間を導入する戦術の種類

2通りある

1つめ
個々の操作ごとにユーザがその権限を持つかどうかを判定して、リンクの表示・非表示を切り替えたりリレーションオブジェクトに検索条件を加えたり、例外Forbiddenを発生させたりする

2つめ
ユーザの種類ごとに別々のコントローラーを用意する。
こちらの戦術の時に登場するのが名前空間という概念。

例
>会員の表示、追加、編集、削除を行う機能はMembersControllerクラスで実装されています。私たちは次節で別のコントローラクラスAdmin::MembersControllerを作成します。このクラスの名前は記号::で2つの部分に分かれます。Adminの部分はモジュール名です。このモジュールが付いているため、MembersControllerクラスとAdmin::MembersControllerクラスは別物として区別されます。この状況を「両者は別の名前空間にある」と表現します。

## コントローラーに名前空間を導入する

**app/controllersディレクトリの下に名前空間ごとのサブディレクトリを作るのが定石**

1. config/routes.rbに名前空間を定義

```ruby
namespace :admin do
  root "top#index"
  end
end
```

引数に名前空間の名前をシンボルで指定し、ブロックの内部で名前空間に属するルーティングを記述する
上記の変更の結果として、URLパス/adminからAdmin::TopControllerのindexアクションにルーティングが設定されます。URLパスを生成するメソッドはadmin_root_path

## 定数

[参考URL](https://railsguides.jp/autoloading_and_reloading_constants.html)

>通常のRubyプログラムのクラスであれば、依存関係のあるプログラムを明示的に読み込む必要があります。たとえば、以下のコントローラではApplicationControllerクラスやPostクラスを用いており、通常、それらを呼び出すにはrequireする必要があります。

```ruby
# Railsではこのように書かないこと
require "application_controller"
require "post"
# Railsではこのように書かないこと

class PostsController < ApplicationController
  def index
    @posts = Post.all
  end
end
```

>Railsアプリケーションでは上のようなことはしません。アプリケーションのクラスやモジュールはどこででも利用できます。

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end
end
```

通常のRailsアプリケーションでrequire呼び出しを行うのは、libディレクトリにあるものや、Ruby標準ライブラリ、Ruby gemなどを読み込むときだけです。そのため、これらのような自動読み込みパスに属さないものについてはすべて後述します。

Railsではこの機能を提供するため、いくつものZeitwerkローダーを開発者の代わりに管理しています。

## Railsでのmemo化

>Railsでマスター系のDBで何度も同じ内容を叩いたり、N+1問題対策でincludesをつけていても、結局
>デカイSQLを発行してしまい効率的ではない場合もある。そこでメモリに保存して再利用する方法memoistを使う方法がある

[参考URL](https://qiita.com/kon_yu/items/c5a1a5e5a4ef878425dd)

## マイグレーション

### マイグレーションファイルとスキーマファイルの関係

[参考URL](https://pick-up-tech.com/blog/%E3%83%9E%E3%82%A4%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%A8%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%9E%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%EF%BC%88migration-schema-rake%EF%BC%89)

### マイグレーションファイルの削除

[参考URL](https://qiita.com/ISSO33/items/33a935cb3255c269bef2)

## Railsでのミドルウェア

[参考URL](https://fuqda.hatenablog.com/entry/2019/03/25/210850)

- Railsでのミドルウェアとは？
OSとアプリケーションの間に入って動作するソフトウェアのこと

- 現在のRailsアプリのミドルウェアの状態を知りたいときは
`$ bundle exec rake middleware`

- どこで読み込むのか

>config.middleware.useの引数に読み込みたいミドルウェアを指定します！
>※ initializers配下のファイルであれば、ある程度どこに書いてもOKっぽい？けどカオスになるので、`/config/application.rb` に書くのが安全な気がします。

## Rake

rakeはcronみたいに使えるやつ
引数を渡すのに癖があるため `thor` を使う場合が多い。

## thro

[参考URL](https://qiita.com/yatmsu/items/5ba7016db33c13d7a882)

---

## RailsでのLintツール

RuboCopを使用する

---

## ruby使用者に今すぐ伝えたいwebpackとwebpacker

webpackerは、自前でwebpackをRailsに導入せずとも簡単にwebpackをRailsに取り込んで、Railsの仕様と融合させる（押し付ける？）事が出来るようにする為のGemです。
要は、webpackの事をあまり知らなくてもRailsライクにwebpackを利用できるようにしてくれるという事ですね。
また、JavaScriptファイルを呼び出すためのヘルパーメソッドが変わります。

```ruby
# ヘルパーメソッドが変わる
# これまで
<%= javascript_include_tag 'notebook', 'data-turbolinks-track': 'reload' %>
# webpacker導入後
<%= javascript_pack_tag 'hoge' %>
```

**つまりapi modeの時はいらないということ！！！！！！！！！！！！**

[参考URL](https://qiita.com/jesus_isao/items/1f519b2c6d53f336cadd)

>WebpackerはRails 7以降では使う理由がなくなり、今後は開発が止まっていきます。新規PJでwebpackerは採用しない方が良いでしょう

- webpackとwebpackerの関係
まず前提として、**webpackと、webpackerは別物**

>webpackはJSのnpmのパッケージです。JSのコミュニティの中で育ちました。npmというのは、Node.jsで使えるパッケージ管理ツールのことで、つまりはRubyでいうbundlerです。JSの開発者たちは、このnpmか、その代替のyarnをみんな使っています。
そしてwebpackerはRubyのgemです。Railsでもwebpackが楽に使えるように作られました。

## Rails for Stripe

[参考URL](https://qiita.com/tomokazu0112/items/89f69c47761ac782ce13)

## Rails Formオブジェクト

[参考URL](https://qiita.com/ren0826jam/items/0effb716067a861e71f2)

モデルとフォームの責務を切り分けられることで、単体のモデルに依存しない場合やフォーム専用の特別な処理をモデルに書きたくない場合に用いたりする。

Railsのフォームは基本的にモデルに依存しており、たとえば**1つのフォーム送信で複数のモデルの更新をしたい場合バリデーションの責務が曖昧なもの**となり可読性も低下するため、責務を明確にするということで使う。

1つのフォームで複数モデルの操作をしたいときにForm Objectを使うと処理がすっきりかける。
またログインに関する処理など、特定のフォームでしか行わない処理もForm Objectに書くと良い。

## ActiveRecord

RDBテーブルに対応するモデルクラスへアプリケーションのデータとロジックを実装していく。

defaultでは以下のURL
`localhost:3000/admin`
しかしこれを認可で変更は可能
`localhost:3000/private/admin`

## Active Support

Active SupportはRailsに搭載されているコンポーネントの一種。
Object/Class/String/Numeric/Enumerableなど**標準ライブラリを拡張**することで、よりRubyの表現力を向上してくれるライブラリ。

## 国際化対応(i18n)

i18nの理由 => internationalizationが「i」から「n」まで18文字あるから

Railsにはユーザーの国ごとに表示を簡易に切り替えられる国際化機能（i18n）が搭載されている。
日本のみで使用する場合でもこの機能を利用することでエラーメッセージの表示やラベルの表示を簡潔に記述できるようになる（つまりはmessage定数管理）

### 導入

```sh
# add file
touch config/initializers/locale.rb
```

### 翻訳ファイルの管理は

翻訳ファイルはライブラリごと、モデルごとにディレクトリやファイルを分割して管理。
たとえばdeviseの翻訳ファイルであればconfig/locales/gemsディレクトリで日本語翻訳ファイルは `devise.ja.yml` として管  理できるようにする。``

ユーザーモデルの翻訳ファイルは `config/locales/models` ディレクトリで、日本語翻訳ファイルは `user.ja.yml` として管理できるようにします。
config/locales以下に作成したディレクトリ、ファイルが翻訳ファイルとして読み込まれるように設定をする。

### localeファイルが提供されている。

[提供URL](https://github.com/svenfuchs/rails-i18n/blob/master/rails/locale/ja.yml)

## 日本語対応

[参考URL](https://qiita.com/kusu_tweet/items/b534c808ac1ee0382f05)

## enum

enumを追加すると自動でメソッドが追加される。
`User.male` とすると男性一覧 (users.genderが1のレコード) のレコードを取得することが可能になる。
またUserモデルのインスタンスに `#male?` とすると男性の場合は `true`, 男性ではない場合は `false` が返る。
`#male!` とすると `update` 文が実行される
unanswered,femaleに対しても同様のメソッドが自動で追加されます。

```rb
# 0, 1, 2はdbに保存されてしまうので後から変更は難しい
class User < ApplicationRecord
  enum gender: {
    unanswered: 0,
    # 男性
    male: 1,
    # 女性
    female: 2
  }
end 
```

## Ruby on Rails で lib ディレクトリの自作クラスを使用する

[Ruby on Rails で lib ディレクトリの自作クラスを使用する](https://qiita.com/azusanakano/items/885fe3236977580b00c9)

## rails routing constraints

routingにさまざまな制限を設定できる。

## beforeバリデーションをやめてセッターメソッドにする。

[参考URL](https://techracho.bpsinc.jp/hachi8833/2022_03_09/59016)

## ridgepole

[GitHub](https://github.com/ridgepole/ridgepole)
[参考URL](https://qiita.com/tetz-akaneya/items/d10570aeb028fc603b86)

Cookpadの菅原さんという方が作成したライブラリ
ridgepoleはRailsのデフォルトのMigrationシステムの代わりになり得るライブラリ。

### 従来のMigrationシステム

>Railsのデフォルトのマイグレーションシステムを利用する場合、DBスキーマの変更を行う際にはその都度新たなMigrationファイルを作って、そこに現在の状態からの差分を記述するという使い方をすると思います。
>この手法は広く使われていますが、差分を記述する度に新たにひとつファイルを作るのは大げさで面倒だと感じる人もいるでしょう。
>今回紹介するridgepoleを利用すると、Migrationファイルをいちいち作らずとも単一のSchemafileというファイルを編集するだけでスキーマの変更が可能になります。

## ストロングパラメーター(Strong Parameters)

Ruby on Railsフレームワークで使用されるセキュリティ機能のひとつ。
通常、ユーザーからのリクエストデータを直接モデルに割り当てるとき、意図しないデータの割り当て（マスアサインメント）が行われる可能性がある。  
ストロングパラメーターは、このようなマスアサインメント攻撃を防ぐために、明示的に許可されたパラメーターのみを受け入れるように制限する。

ストロングパラメーターを使用するには、以下の手順が必要です

1. コントローラーのアクションで、パラメーターを受け取ります。
2. パラメーターを許可するためのストロングパラメーターメソッドを定義します。通常はprivateセクション内に記述する。
3. ストロングパラメーターメソッド内で、許可するパラメーターのキーを指定します。通常はparams.require(:model_name).permit(:attribute1, :attribute2)のように記述します。model_nameはモデルの名前、attribute1やattribute2は許可する属性の名前。

ストロングパラメーターを使用することで、不正なパラメーターの割り当てを防ぎ、安全なデータ操作を実現することが可能。これにより、アプリケーションのセキュリティを強化できる。
