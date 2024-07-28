# Server

サーバサイドでの設計思想を記述する。

## スレッドセーフ

[スレッドセーフとは](https://www.divx.co.jp/media/techblog-220627)
[マルチスレッドはこんなときに使う](https://atmarkit.itmedia.co.jp/ait/articles/0503/12/news025.html)

## シングルプロセスとシングルスレッド

[サーバーを構築するNode.js　シングルスレッド＆シングルプロセス](https://tamotech.blog/2020/07/15/node-single-thread/#google_vignette)

ほとんどのWebサーバーと同様に、Ruby on Railsアプリケーションは同時に複数のリクエストを処理できます。具体的には、以下のような構造で動作します：
Node.jsはシングルプロセス・シングルスレッドを採用しているのでしょう．それは大量のリクエスト時のメモリ領域を削減するためです．マルチプロセスではリクエスト毎にプロセスやスレッドを立てます．これはアクセスが増えれば増えるほどメモリ領域を圧迫してしまいます．これをC10K問題といいます．
Node.jsのシングルプロセス（シングルスレッド）を実装するために非同期I / Oを利用しています．「I / O」とはWebアプリケーション外部との入出力処理のことです．ファイルの読み込みや，データベースとの接続がこれに当たります．

前回の記事でも少し触れましたが，非同期I / Oは重い処理を後回しにすることで，大量のリクエストをシングルプロセス（シングルスレッド）で処理できます．

### シングルスレッドとマルチスレッドの違い

- シングルスレッド
シングルスレッドのプログラムでは、すべてのコードはひとつのスレッドで順次実行されます。
変数はひとつのスレッド内でのみアクセスされるため、データの競合は発生しません。

- マルチスレッド
マルチスレッドのプログラムでは、複数のスレッドが同時に実行され、同じメモリ空間を共有します。
共有される変数は複数のスレッドからアクセスされるため、データの競合が発生する可能性があります。
競合を防ぐためには、適切な同期機構（ミューテックス、セマフォなど）を用いて変数へのアクセスを制御する必要があります。

1. **シングルスレッドモデル**:
   - **プロセスごとに1リクエスト**: シングルスレッドのWebサーバー（例：WEBrick）は、各リクエストを個別のプロセスで処理します。そのため、1つのプロセスは1回に1つのリクエストしか処理しません。
   - **安全性**: このモデルでは、各プロセスが独立して動作するため、スレッドセーフなコードを書く必要がなく、リソースの共有による問題を避けることができます。

2. **マルチスレッドモデル**:
   - **スレッドごとに1リクエスト**: マルチスレッドのWebサーバー（例：Puma）は、複数のスレッドを使用して同時に複数のリクエストを処理します。1つのプロセス内で複数のスレッドが動作し、各スレッドが個別のリクエストを処理します。
   - **効率性**: これにより、同時に多くのリクエストを効率的に処理できるため、応答性が向上します。

### Railsの動作

- **デフォルト設定**: Railsアプリケーションはデフォルトでシングルスレッドモードで動作します。ただし、Pumaなどのマルチスレッドサーバーを使用することで、Railsをマルチスレッドモードで動作させることができます。
- **マルチスレッド対応**: Railsはマルチスレッド対応しており、適切な設定を行えば、マルチスレッド環境でも安全に動作します。ただし、スレッドセーフなコードを書くことが重要です。

### 実際の動作例

以下は、Pumaを使用してRailsアプリケーションをマルチスレッドで動作させる設定の例です。この設定により、Railsアプリケーションは同時に複数のリクエストを処理できるようになります。

```ruby
# config/puma.rb

workers ENV.fetch("WEB_CONCURRENCY") { 2 }
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count

preload_app!

rackup DefaultRackup
port ENV.fetch("PORT") { 3000 }
environment ENV.fetch("RAILS_ENV") { "development" }

on_worker_boot do
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord)
end
```

この設定では、Pumaが2つのワーカーと5つのスレッドで動作するため、同時に最大10のリクエストを処理できます。

### 結論

- **シングルスレッドモード**: 各リクエストは独立したプロセスで処理される。
- **マルチスレッドモード**: 複数のスレッドが並行してリクエストを処理する。
- **Railsのサポート**: Railsはデフォルトでシングルスレッドですが、Pumaなどを使用することでマルチスレッドで動作させることができる。

これにより、Railsアプリケーションは必要に応じて効率的にスケールさせることが可能です。

シングルスレッドの意味についてもう少し詳しく説明します。

### シングルスレッドとは

- **シングルスレッド**: 1つのスレッドで実行されるプロセスを指します。これは、1つのタスクが順番に実行されることを意味し、並行処理は行われません。

### シングルスレッドの特徴

- **順次実行**: プロセス内の命令が1つのスレッドで順番に実行されます。他の処理が終わるまで次の処理は開始されません。
- **コンテキストスイッチがない**: スレッドが1つしかないため、コンテキストスイッチ（実行中のスレッドを別のスレッドに切り替える操作）が発生しません。これにより、オーバーヘッドが減少します。

### Node.jsにおけるシングルスレッド

- **イベントループ**: Node.jsはシングルスレッドですが、非同期処理を効率的に管理するためのイベントループを利用しています。イベントループは、I/O操作（ファイル読み書き、ネットワーク通信など）を非同期に処理し、CPUのリソースを有効に活用します。
- **非同期処理**: Node.jsは非同期I/O操作をサポートし、コールバックやPromiseを使って、長時間実行されるI/O操作が完了したときに通知を受け取ります。この仕組みにより、他の処理がブロックされることなく並行して実行されます。

### シングルスレッドと並行処理

- **並行処理の限界**: シングルスレッドではCPUバウンドなタスク（CPUリソースを多く消費するタスク）を長時間実行すると、他のタスクの実行が遅れます。Node.jsでは、このようなタスクを別のスレッドやプロセスにオフロードするための機能（Worker ThreadsやClusterモジュール）が提供されています。

### Lambdaとシングルスレッド

- **Lambda関数の実行環境**: AWS Lambda関数は、リクエストごとに独立した実行環境（コンテナ）で実行されます。これにより、1つのリクエストが重い処理を行っても、他のリクエストには影響を与えません。ただし、各Lambda関数はシングルスレッドで動作するため、関数内でCPUバウンドなタスクを実行すると、そのタスクが完了するまで他の処理はブロックされます。

### まとめ

シングルスレッドは1つのスレッドで順次実行されるプロセスを指し、Node.jsではイベントループを使って非同期処理を効率的に管理します。AWS Lambdaのような環境では、シングルスレッドの制約がありつつも、独立した実行環境で並行処理を実現しています。シングルスレッド環境では、CPUバウンドなタスクの処理に注意が必要です。