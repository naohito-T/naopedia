# Architecture

## Overview

あらゆるものの仕組みや根底まとめたセクションwebやアプリケーションなどの設計について

## 参考

[TheTwelve-factor-app](https://12factor.net/ja/)  
[MVC, 3層アーキテクチャから設計を学び始めるための基礎知識](https://qiita.com/os1ma/items/7a229585ebdd8b7d86c2)  
[設計理論がすごい](https://qiita.com/os1ma)  
[メルペイの事例に学ぶ、SSRとJAMstackのメリット・デメリット](https://logmi.jp/tech/articles/322575)  
[DDDでアプリを作成する(これはすごい)](https://qiita.com/APPLE4869/items/d210ddc2cb1bfeea9338)

## プロジェクト管理方法

## monorepo（モノリポ）

アプリケーションが利用しているライブラリをすべて1つのコードリポジトリとデプロイプロセスで管理しようという開発手法。  
さまざまなプロジェクト、多くのチームが1つのリポジトリを共有すると、リポジトリの更新頻度は必然的に高くなるでしょう。これによりリポジトリで多くのブランチを管理したり、ブランチをマージしたりするコストが増えることとなります。フィーチャーブランチや環境ごとのブランチなど、長命ブランチを複数保持するスタイルとは相性がよくありません。  
※上記を鑑みてプルリクをissue駆動にするのはアリなのか。

モノリポでは、トランクベース開発を導入する

## ポリリポ

対義語。プロジェクトごとに管理する手法

## 考え方

アーキテクチャとアーキテクチャスタイルは別物  
デザイン（設計）とデザインパターンは別物  

アプリケーション・アーキテクチャとして、以下のような選択があることが分かります。
レイヤー構成 ... 3層、ヘキサゴナル、クリーンなどから選ぶ
プレゼンテーション層 ... MVC、MVP、MVVMなどから選ぶ
ビジネスロジック層 ... トランザクションスクリプト、ドメインモデルから選ぶ

ので、「3層 + MVC + トランザクションスクリプト」といった構成や、「クリーンアーキテクチャ + MVVM + ドメインモデル」といった構成になるわけです。

どの組み合わせを採用すべきかは、開発規模や扱えるフレームワークとの相性などにより異なります。

## ビジネスロジックとは

[ビジネスロジックとは](https://qiita.com/os1ma/items/25725edfe3c2af93d735)

端的に理解するとなると
アプリケーションをプレゼンテーション・ビジネスロジック・データアクセスの3つに分けたときプレゼンテーションでもデータアクセスでもない部分がビジネスロジック

## ソフトウェア開発における4つのプロジェクト管理手法

ウォーターフォールモデル
アジャイル
スパイラルモデル
プロトタイプ開発

## SPA + REST API構成のサービス開発リファレンス

[](https://fintan.jp/?p=5952)

## REST API

RESTはWebのアーキテクチャスタイル
APIはシンプルな機能ごとに作られてこそ威力を発揮する。
そしてAPIは機能ごとに分けるのが定石
機能の単位とは？？
「リソース（何を）」と「メソッド（どうする）」で表現できる単位。
→Web APIでは、URL部分を「リソース」と見なし、HTTPメソッドとURLの組み合わせ

**設計順序**

[参考URL(これが全体的にわかりやすい)](https://www.hypertextcandy.com/web-api-url-design-primer)

UI（画面）がある程度固まって、データベース定義の初期段階。ER図ができたあたりからAPI設計をし始めるのをオススメする。

## 言語選定

[参考URL](https://teratail.com/questions/92276)

## Webサイト設計順序

1. こんなサイトを作りたいと想像する
2. 要件定義
3. UI設計に入る
4. DB設計
5. この段階である程度欲しい機能がわかる
6. API設計

以上

## project start手順

**技術選定**

いまいちフロントエンドを理解する上司がいない場合もある
技術選定は最終的なgoalが必要で、そのGOALがどんなサイトかで選定は決まると思われる。
どんなサイトにしたいのかをまずは上席、またはビジネス側に伺う。

jQueryは重い。パフォーマンスは下がる

## 今までのレンダリング

[参考URL(これを時間あるときまとめる)](https://www.publickey1.jp/blog/17/server_side_renderingserver_side_rendering_ng-japan_2017.html)

最近はブラウザの中にも、これまでサーバ側で動いていたHTMLを構築するための仕組みが入ってきた。

## なぜServer Side Rendiringが必要なのか

まずSEOが最初にあがる。

## スケジュール

スケジュールの引き方は相手の依頼が間に合わないと遅くなると言う前提で作ると楽

## 実際にある業務をシステムに落とし込むとき

通常はある業務をシステムに落とし込むとき

1. 現在の業務を適切に抽象化した分析モデルの作成、
2. 分析モデルを基にした設計
という2回の射影が行う必要がある。
具体的には、前者はユーザヒアリングによる要件抽出、後者は要件を基にした仕様書作成/実装となる。

スケジュールの引き方は相手の依頼が間に合わないと遅くなると言う前提で作ると楽

## 要件定義からサービス作成まで(小さいパターンの場合)

1. 簡単なサービス設計書を作成

2. サービス設計書のレビューがくるまで作成する

3. レビューがくる。ここで再度要件をつめる。

そのほうが早いでしょってこと

## サービス設計書

サービス設計は要件定義と同一。
そのため他部署との折衝となるため、**これができます。これはできませんという場となる。**

>これはサービス設計なので、仕組みではなく、どうするかを書いてください。
>ex. 自動削除はしない。リクエスト毎の対応、または、要望があれば、別途打ち合わせの上、削除の自動化を行う。

## 仕事の進め方

大きく分けて以下のフェーズがある

1. サービス設計
2. 基本設計
3. 詳細設計
4. テスト
5. 運用

## サービス設計

完結に言うと、事業部側との約束事をまとめたもの（相手側にシステムなどを伝えても意味がない）

ここで大事な考え方として

1.

**セーフティネットの考え方はある。**
万が一何か起こっても大丈夫ですよの考え方を常に持っていい。
100%起こらないエラーはないと考え方を持つ。万が一起こっても大丈夫なコードとサービス定義に盛り込む。

2. わからないことや疑問点が出たら
SmartNewsで思い出して欲しい。1分に1回取りに行くとか、疑問点が生まれたらどんどん聞きにいくべき(事業部側に)

スケジュール
費用
上記はビジネス

=========================以下から下は自分達で役に立てばいいやという感覚(その感覚は自社サービスのメリット)。受託だとまたより詳細に書く必要があるし、官公庁相手だともっと詳細に書く必要がある。====

[基本設計と詳細設計の違い](https://wa3.i-3-i.info/diff236design.html)

## 基本設計 = 外部設計と呼ばれることもある。

技術部向けに書いていく。詳細。
そもそも条件を見るためにパラメータを3つも持つのがおかしい。

なんのシステムで構成図を書くとか
バックアップとか
アクセス情報とか
そういった情報。
なんでJSなのか？
なんでJSなのか + Lambda

>要件定義と詳細設計の中継ぎ的なポジションで行う設計。システム開発におけるお客様のこんなものが欲しいんだよね~を受けて、それじゃあこんなシステムを作りましょうな全体像や概要をざっくりと考える工程

基本設計は大雑把に言えば、お客様に見えるところを考える作業。
システム全体の概要や、大雑把な機能の一覧。どんな機器で動かすかやどんなスケジュールで作業を進めるかなどを考える。

## 詳細設計 = 内部設計と呼ばれることもある。

1. イベント主体で考えるべき
2. そしてこれがそのままプログラムとなる。そのためそのままプログラムを書けるというのを意識する

>基本設計と実際のプログラミングの中継ぎ的なポジションで行う設計。
>システム開発における、基本設計でざっくり考えた概要を元にして実際のプログラムが作れるまで細かく落とし込む工程。

詳細設計はお客様に見えないところを考える作業
プログラムの構造やデータの流れなどのあーだこーだを細かい部分まで考える。
粒度としては、これだけ決まっていればプログラムが作れそうだねと思えるまで

## login URLの設計

[参考URL](https://aiaru.hatenablog.com/entry/2021/01/07/182355)

**前提**
URLはページの共有などユーザが意図しないところで漏れる可能性も高く、ログインと同等を求めるにはリスクが高い。
ランダム文字なURLは、W3Cでは**Capability URLs**と呼ばれている

---

Q.
ランダムな文字列のURLを認証に使ってよいか？

たとえば、写真共有サイトで時間制限で共有させたいときなどは使える。

A.
有効期限がある一時的なURLとして利用ならOK。永続的なURLとして実施の場合はNG。
文字数はその時に有効なコンテンツの数次第。
心配であれば、base64で22文字（128bit）以上で設計すればよい。
ちなみに、google photoの写真シェアは英数大小17文字(log_2(62^17) ≒ 101bit)。

---

URLの文字数について
文字数を長くする目的はブルートフォース攻撃に耐えること。
そして、これはその時アクティブなコンテンツの量に応じて影響。
たとえば、URLを2文字（2byte=16bit）だと、これで表せるURLは65,536通り。

コンテンツが33,000あったら、1/2の確率でコンテンツに当たってしまうので、これだと文字列が少ないわけ。なので、文字数はある程度長い文字列が必要。
社内への説明などあると思うが、個人的には17文字、22文字あたりが安全で説明もしやすい。

**17文字の根拠**
大抵の企業は、「あのgoogleが！！」と言う言葉に弱い。

なので、「あのgoogleの写真をシェアする機能では17文字を採用しているので、17文字とする！」で社内説明がつくのであれば、これでもいいかと。

確率は2.9*10^30...まぁブルートフォース攻撃は成り立たないだろう。

**22文字の根拠**
重複しないIDとして有名なUUID。

「UUIDと同等の強度です」で社内説明がつくのであれば、これでもいいかと。

UUIDは128bit。base64 URL Safeでエンコードするとすると22文字（128/6 ≒ 21.33 ->22文字）※v4の場合、6bit固定なので122bit。

確率は3.4*10^38...まぁブルートフォース攻撃は成り立たないだろう。

---

要件定義書は以下から

[CHANGELOG の書き方](https://blog.yux3.net/entry/2017/05/04/035811)

## アプリケーションにおけるユースケース

アプリケーション開発におけるユースケースとは**何らかの目的を達成するために行われるユーザとアプリケーションの間の一連のやり取り**を表したもの。
たとえば、「6章Railsアプリケーション開発」において実装したawesome_eventsであれば、「GitHubアカウントでログインする」「イベントを登録する」などがユースケースにあたります。そして、「GitHubでログインをクリックするとGitHubのアプリケーション認証画面に遷移する」「イベント登録フォームで間違った入力をするとエラーメッセージが表示される」などがユーザとアプリケーションの間のやり取りにあたります。

## ディレクトリ構成で悩む時

### ミドルウェアとライブラリの違い

[参考URL](https://jp.quora.com/%E3%83%9F%E3%83%89%E3%83%AB%E3%82%A6%E3%82%A7%E3%82%A2%E3%81%A8%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%AE%E9%81%95%E3%81%84%E3%81%AF%E3%81%AA%E3%82%93%E3%81%A7%E3%81%99%E3%81%8B)
ミドルウェアとライブラリの大きな違いは、

- ミドルウェアは**それ単独でも動作できる。**
- ライブラリは単独では動作できず、アプリケーションプログラムの中に組み込んで利用する
という違いがある。

>どちらもプログラムから呼び出せるよう用意された機能の集まりですが、
>ミドルウエア：呼び出し元のプログラムとは独立して動作する、それ自体一つの独立して起動可能なソフトウエア
>ライブラリ：呼び出し元のプログラムに組み込まれたり、呼び出されたタイミングてはじめて動作し、単独で起動することがない（できない）ソフトウエア
>という感じでしょうか。

>middleware的なツールが元の値を書き換えるのに違和感があるのですが、いいのか。。

回答2
>デーモン(常駐プロセス)とライブラリの違いは分かりますか？
>ミドルウェアは通常デーモンとして起動されます。なのでデーモンとライブラリの違いがまずミドルウェアとライブラリの違いとしてあります。
>ミドルウェアは主にセキュリティやトランザクション管理やメッセージングや運用管理などの機能を提供し、それらが必要なプログラム・サービスを開発する際に使われます。
>ミドルウェアを使うプログラム・サービスは、ミドルウェアからそれらを呼び出すものと、プログラム・サービスからミドルウェアを呼び出すものとがあります。前者はライブラリ使う場合にはないパターンですね。後者は多くの場合ミドルウェアの提供するクライアントのライブラリを経由して呼び出しますのでライブラリ使うものと区別し辛いですが、処理の大半はプロセス間通信やノード間の通信の先にいるデーモンプロセス内で行われるので、単純なルーチン呼び出しタイプのライブラリとは異なります。

## ライブラリ選定

[これ使える](https://openbase.com/js/logger)
[Openbase.ioって言うサイトが面白い](https://qiita.com/uttk/items/794737031b508191e641)

## セマンティック バージョニング : semver

[リファレンス](https://semver.org/lang/ja/)

セマンティック・バージョニングとは、ソフトウェアのバージョニング方法のひとつ。

バージョンナンバーは `メジャー.マイナー.パッチ` となっている。

バージョンを上げるには以下の意味がある。

- APIの変更に互換性のない場合はメジャーバージョンを上げる。
- 後方互換性があり機能性を追加した場合はマイナーバージョンを上げる。
- 後方互換性を伴うバグ修正をした場合はパッチバージョンを上げる。
プレリリースやビルドナンバーなどのラベルに関しては `メジャー.マイナー.パッチ` の形式を拡張する形で利用することが可能。

## クロスサイトプロジェクト

[参考URL](https://medium.com/swlh/how-the-new-chrome-80-cookie-rule-samesite-none-secure-affects-web-development-c06380220ced)

身近だとAnycolor id
