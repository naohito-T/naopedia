# Dockerfile 作成Tips

## 考えることリスト

- 軽量を考える（ビルダーパターンができるか）
- アプリケーション起動用ユーザを作る

## Dockerfile 命令

[リファレンス](https://docs.docker.jp/engine/reference/builder.html)

## Dockerfile のベストプラクティス

[参考 URL](https://y-ohgi.com/introduction-docker/3_production/dockerfile/)

1. 軽量なイメージを作る
   Docker imageは**レイヤーが少なく全体サイズ軽いものにする。**
   レイヤーを増やすことはオーバーヘッドに繋がり、サイズはimageのpullの速度に繋がる。

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

- .dockerignoreを使用する
  Dockerのビルド時に無視するファイル/ディレクトリを指定することができる。
  .gitのようなコンテナー内に不要な情報`node_modules`のような上書きされると困るものを記述する。
  .dockerignoreは基本的に`.gitignore`と書き方は一緒

2. Build

- キャッシュを意識する
  Docker Imageは**各コマンドごとにキャッシュを作成する**（これを中間レイヤーと呼ぶ）
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
私たちの最近のレポートでは、58% のイメージがroot (UID 0) としてコンテナーのエントリポイントを実行していることを発表しています。しかし、Dockerfileのベストプラクティスとして、そのようなことは避けるべき。
コンテナーをrootで実行する必要があるユースケースはほとんどないので、デフォルトの実効UIDをrootではないユーザに変更するためのUSER命令を含めることを忘れないでください。

アプリのユーザが必要とするのはファイルの実行権限だけで所有権ではない。

**バインドマウントした場合のパーミッション**
マウントキャッシュを利用してホストマシン上のディレクトリをビルド中のコンテナー内にマウントすると、ファイルのuid,gid,modeはホストマシン上の値と同じになります。一方でコンテナ内でファイルを作成するとrootとして操作したことになり、ファイルはuid=0で作成されます。
もしそれがホストマシン上のディレクトリをマウントした場所なら、ホストマシン上のディレクトリにuid=0のファイルが作成されることになります。ファイルのownerやパーミッションの値に注意しましょう。


## 開発環境とlocal環境でのDockerfile違い

開発環境と本番環境では大きく異なる点がある。
ソースコードを編集した結果は即座に稼働中のサーバに反映されて欲しいものだが、その度にDockerイメージを構築し直しコンテナーを再起動するのは手間が大きい。


### 開発環境

ソースコード全体をコピーしてイメージ内部に含めるのではなく**ホストマシン上のディレクトリをコンテナー上にマウントさせる方式を採用する。**
このときマウントしたディレクトリのパーミッションを考慮すると操作が煩雑になるためrootのまま起動する形にしている。

railsだと以下対応
ソースコードのコピーはしない。
bundle installはしない。

重要なのはコンテナーを起動する際に**Railsプロジェクトのディレクトリとライブラリインストール先となるボリュームをマウントすること**
コードとnode_modulesなどのインストール先ディレクトリはマウントすること（ローカルホストでinstallされたライブラリもマウントする）

```sh
# あらかじめボリュームを作成しておきバインドマウントをする。
$ docker run -it \
  -v $(pwd):/app \
  -v myrailsapp_bundle:/app/vendor/bundle \
  -v myrailsapp_node_modules:/app/node_modules -p 3000:3000 myrailsapp
```
上記コマンドで、カレントディレクトリを/appにマウントし、そのディレクトリ上でbashが起動します。後はbundle install、yarn install、bin/rails sを実行すればサーバが起動します。
この開発環境では`:cached`を追加するなどをする（macが遅いため）

手順

1. bundle installする→Railsだとsystemにgemをinstallする派とvendor/bundleにinstallする派の両方がいるためなんとも言えない...）
2. yarn installする
3. envをdecrypt
4. dockerを立ち上げホストのすべてをマウント（キャッシュを効かせて）

### 本番環境

ソースコードのコピーをする
bundle installをする。
yarn installする。

---

## Dockerfile 命令一覧

### CMD

CMD "yarn" "start"のように文字列のみで記述するのをshell形式
`/bin/sh -c "yarn start"`のように解釈される。


CMD ["yarn" "start"]のようにJSON配列の形式で記述するのをexec形式

shell形式で記述すると`PID 1`のプロセスがシェルとなり、kubernetesなどのオーケストレータから送られたシグナルがアプリケーションまで伝搬しない可能性がある。
実際に、コンテナを動かしているプロンプト上でCtrl+Cを押してもコンテナが停止しない。

## ADD

イメージに含まれるチェックサムが計算され、ファイルに変更があればキャッシュが無効化される。
そのため、頻繁に行われないpackage.jsonとyarn.lockを先にコピーしておきyarn installを実行することでコードを変更してもいちいち再インストールが行われないようにします

## COPY


イメージに含まれるチェックサムが計算され、ファイルに変更があればキャッシュが無効化される。
そのため、頻繁に行われないpackage.jsonとyarn.lockを先にコピーしておきyarn installを実行することでコードを変更してもいちいち再インストールが行われないようにします

## Tips

[Nodeでの作り方](https://blog.shinonome.io/nodejs-docker/)