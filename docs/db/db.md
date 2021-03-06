# DB

RDB & NoSQLなどDB関連

[学習効率を上げるためのバックエンドのデータベース基礎知識](https://devsakaso.com/about-database-basics/)

[瞬殺でDBを使って何かしたいとき](https://zenn.dev/takuho/articles/efc40344f3122e)
[DockerでサクッとDBからER図を作成する](https://qiita.com/kamukiriri/items/ab1669c19831c18db9ee)

## DB設計の時の考え方

どうせ最初からパーフェクトなテーブル設計はできない。
経験則がいきる。
最初は完璧になんて不可能なので、ある程度考え、実装し、間違っていればまたやり直す。を繰り返すことが一番の近道です。

あ、どうせ変化していくものなので完璧を求めすぎないこともポイントですよ。

## 触る時に考えること

・seedで一気にできないか
・自動化できないか
・本番を触る時はすべてエビデンスをとれ（スクショなど）
・何をしたのかしっかりと伝えられること。そのためのエビデンス
・CRUDの内のC(create)U(update)D(delete)をする前には必ずselectをしろ
・indexは大体どこのSQLでも単一の値にはインデックスが貼られている。
→ しかし複数の値での検索時はインデックスが貼られていないため検索回数が多いのは検討をしインデックスを貼る。

## DBマイグレーション

データベースを削除し手から作り直すと、DBに保存されている情報がすべて削除される。
こういった事態を回避する方法としてデータベースマイグレーションを行う方法がある。
マイグレーションとは、**DBに保存されているデータを保持したままテーブルの作成やカラムの変更などを行うための機能。**
運用中のデータベースにデータを入れたまま、テーブルを追加したりカラムを変更するなどして、スキーマを管理する機能

※対象の言語ORMに対して、マイグレーションがない場合は汎用なマイグレーションツールを使うなど対策が必要

## パスワード保存について

データベースに生の（平文の）パスワードを保存するのは情報セキュリティの観点から望ましくない。
**その代わりにパスワードのハッシュ値を(あるいはダイジェスト)と呼ばれる値をデータベースに保存するのが定石**

## アプリケーションからのDB基本利用法

アプリケーションからDBにアクセスするためにはデータベース固有のプロトコルを用いてアクセスする必要があり、各DB向けに実装されているドライバーを使う。
一方アプリケーション側から呼び出す接続コードは、データベースドライバーの実装に依存しない汎用的なAPI

## DBバックアップについて

ダンプのファイル量が多いと時間がかかる。
そのため、その際にデータの書き換えがあるとデータの相互性が失われる。
そのためデータのバックアップを取得するときは**DBを停止して行うべき**
