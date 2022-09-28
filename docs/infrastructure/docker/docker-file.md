# Dockerfile 作成Tips

## 考えることリスト

- 軽量を考える（ビルダーパターンができるか）
- アプリケーション起動用ユーザを作る

## Dockerfile 命令

[リファレンス](https://docs.docker.jp/engine/reference/builder.html)

## Dockerfile のベストプラクティス

[参考 URL](https://y-ohgi.com/introduction-docker/3_production/dockerfile/)

1. 軽量なイメージを作る
   Docker iamge は**レイヤーが少なくサイズが軽いものが良いものとされている**
   レイヤーを増やすことはオーバーヘッドに繋がり、サイズは image の pull の速度に繋がる。

> どのようなアプローチで Docker Image を作成すると良いかを見ていく

- 最小限の構成にする

  > たとえば PHP の環境を構築するのに CentOS のベースイメージで、phpenv を入れて、MySQL を入れて、、といったことは非推奨です。
  > Docker はいままでの VM とは思想が異なります。1 コンテナー 1 プロセスになるように設計を行いましょう。
  > 複数のプロセスを使用したい場合はそれぞれコンテナーに分け、オーケストレーションツールを使用してコンテナーを協調させて動かしましょう。

- 軽量なベースイメージを使用する

  > Alpine OS という非常に軽量な OS が存在します。
  > まずはこの Alpine OS がベースとなっている Docker Image を使いましょう。
  > メジャーな言語は一通り AlpineOS に対応しており、Node.js も例に漏れず対応しております。(node の Docker Image が 12 倍の差があります)
  > →alpine よりも slim のが良い。

- .dockerignore を使用する
  Docker のビルド時に無視するファイル/ディレクトリを指定することができる。
  .git のようなコンテナー内に不要な情報、node_modules のような上書きされると困るものを記述する。
  .dockerignore は基本的に.gitignore と書き方は一緒

2. Build

- キャッシュを意識する
  Docker Image は各コマンドごとにキャッシュを作成する(これを中間レイヤーと呼ぶ)
  ビルド後に、コマンドの変更、ファイルの追加/更新など何か変化を起こすと変化が起こったレイヤーの直前のキャッシュからビルドを実行する。
  > たとえば単純な依存ライブラリのインストールだけ行えば問題ない Node.js のアプリケーションがあったとします。開発中は頻繁にコードの変更を行うはずです。コードの変更を行えばせっかく作成したキャッシュが効かなくなってしまい、ビルドのし直しになってしまいます。単純な npm install が必要なアプリケーションであれば package.json と package-lock.json だけをコンテナー上へコピーして、その後スクリプトのコピーを行うと高速なビルドを実現できるでしょう。

```yml
FROM node:slim

WORKDIR /scripts

- COPY . .
+ COPY ./package.json ./package-lock.json /scripts/

RUN npm install

+ COPY . .

CMD ["npm", "start"]
```

## Dockerfileのベストプラティクス

[参考URL](https://sysdig.jp/blog/dockerfile-best-practices/)

- root（UID0）で実行してはいけない
私たちの最近のレポートでは、58% のイメージが root (UID 0) としてコンテナーのエントリポイントを実行していることを発表しています。しかし、Dockerfileのベストプラクティスとして、そのようなことは避けるべき。
コンテナーをrootで実行する必要があるユースケースはほとんどないので、デフォルトの実効UIDをrootではないユーザに変更するためのUSER命令を含めることを忘れないでください。

アプリのユーザが必要とするのはファイルの実行権限だけで所有権ではない。
