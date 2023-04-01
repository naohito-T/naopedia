# GitHub Actionsとは
[GitHub Actionsベストプラティクス](https://developers.cyberagent.co.jp/blog/archives/36423/)

- 現在のソフトウェア開発における課題
>ソフトウェア開発を取り巻く環境は日々変化し、様々なツールやライブラリが次々と登場する時代がやってきました。これまで人が行っていた作業やハードウェアが実行していたタスクは、どんどんソフトウェアに置き換えられ、我々はソフトウェアに覆われた世界に向かって加速しています。これは喜ばしいことですが、一方で新しいツールができることや、それらを正しく連携させるための設定はどんどん複雑化し、本来の目的だったソフトウェア開発のために十分な時間を取れないといったケースが増えています。
>GitHubの利用形態について分析すると、全ユーザの約60％がリポジトリと何らかの外部ツールやサービスを連携させている、という結果がわかっていました。そこでGitHubでは、ソフトウェア開発のプラットフォームとしてこの問題を解決し、開発者の体験をより良いものにするにはどうしたらいいか考え、2018年10月にGitHub Actionsを発表しました。
>ソフトウェアのソースコードを一定の品質に保ちつつ速いサイクルで開発・デプロイするために、現代ではこれだけ多様な技術が使われるようになりました。テスト、ビルド、デプロイのパターンだけでも多くの選択肢があり、その他のツールの利用も含めると組み合わせは無限にあります。苦労してプロジェクトに最適な組み合わせを見つけ、ワークフローを作り上げたとしても、今まではそれをコードとして記述するスタンダードな方法がなかったので、GitHub上で共有したり再利用することができないという問題がありました。

## dependabot.yml
[dependabot.yml設定リファレンス](https://docs.github.com/ja/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#reviewers)

## GitHub ActionsからIAMロールを利用する。

Actions secretsはGitHub側で暗号化されていますが、アクセスキーに紐づくAWS IAM（Identity and AccessManagement）ポリシーも必要最低限の権限付与に留めることが重要。
しかし、特定のAWS IAMユーザーに紐づく固定のアクセスキーをGitHub Actionsのようなサービスに設定する運用にはまだ懸念が残る、。
、GitHubActionsでサポートされているOpenIDConnectを使ったしくみを組み合わせることで、AWS IAM Roleから一時的なアクセスキーを取得できるようになります。
以下の例では、もともとaws accesskey idとaws secret accesskeyを設定していたところがrole to assumeに変わっています。このようにGitHubActionsに固定のアクセスキーを設定する必要がなくなり、よりセキュアに運用できます。

## GitHub actions debug

この記述で対応可能
```yml
- name: Debug
  if: ${{ always() }}
  uses: mxschmitt/action-tmate@v3
```

## GitHub Actions 料金

※前提としてプライベートリポジトリが料金かかる。パブリックは無料。  
OSによって料金が変わる。  
Linuxは1分あたり0.008ドルと安価  
Windowsは0.016ドル（2倍）  
macOSは0.08ドル（10倍）という価格  

## GitHub Actions実行単位

3つの実行単位が存在する。  
- workflow
- Job（1つのworkflow複数指定可能）
- Step

## 高速化

CI/CDのビルドでは、リポジトリが依存するパッケージのダウンロードが原因でビルド時間が長くなってしまうことがある。
理由として、近年のCI/CDではビルドごとに完全にクリーンな実行環境が用意され、前回のビルドでダウンロードしたファイルが持ち越されないため。
このため、CI/CDが提供するキャッシュ機能を用いて、異なるビルド間でダウンロードしたパッケージを使い回して高速化することがよくある。
GitHub Actionsでもキャッシュ機能が提供されている。

---

## Action内ではwarnでは止まらない

GitHub Actionsの処理では警告（warn）はsuccessとして通るので注意。

## プルリクエストのpaths条件
[ベン図で記載がありわかりやすい](https://qiita.com/nacam403/items/3e2a5df5e88ba20aa76a)

## GitHub Actions ワークフローで複数のジョブ実行を制御する
[GitHub Actions ワークフローで複数のジョブ実行を制御する](https://blog.kondoumh.com/entry/2021/01/22/133427)

## cache

[GitHub Actionsの知見](https://papix.hatenablog.com/entry/2020/04/14/110000)
[リファレンスv3](https://github.com/actions/cache)

**キャッシュ有効期限**
おそらくキャッシュサーバから削除されるのは**7日間アクセスがなかったら削除**される。

**キャッシュスコープ**
キャッシュのスコープはキーとブランチです。
デフォルトのブランチ キャッシュは、他のブランチで使用できる（developのは他で使える）。
トピックブランチはトピックブランチ内でしか使えない。

GitHub Actions公式のキャッシュ機能である`actions/cache`は
- Pull Requestでコケた時にRe-run jobsするとactions/cacheアクションが正常に動作しない
- actions/cacheアクションは時折キャッシュの取得に失敗することがある

GitHub Actionsにはactions/cacheというものがあって、ビルド時の依存関係を解決したものとかをキャッシュしておくことができます。
標準ではGitHubが提供するキャッシュサーバにファイルが保存されるんですが、さまざまな事情により自分たちが管理するストレージに置きたいことがあります。

以下のusesの結果
出力として**cache-hitというbool値が出力される。**
GitHubにはこう書いてありますが、falseが空値で返ってくることや、後に出てくる判定で'true'を使っていることから、文字列が返ってきている気がします。

```yml
- uses: actions/cache@v1
  with:
    path: ~/go/pkg/mod # キャッシュの保存先（ディレクトリ）を指定する
    key: ${{ runner.os }}-go-${{ hashFiles('**/go.sum') }} # どのキャッシュを使うかなどの識別子に使う
    restore-keys: | # keyが見つからなかった場合に、他のキャッシュを探索するのに使うキーを指定
      ${{ runner.os }}-go-
```

- uses: actions/cache@v1がやっていること
path, keyは必須で、restore-keysのみオプションです。

次に、このactionが何をやっているのか、簡単に整理します。
1. keyやrestore-keysに基づいて、キャッシュが存在するか調査します。
2. 調査結果ごとの処理を行います。

キャッシュが存在すれば、cache-hitにtrueが入る。job終了時、キャッシュの保存は行われない。
キャッシュが存在しなかった場合、keyを予約。cache-hitには空値が入っている。job終了時、pathで指定されたディレクトリにキャッシュの保存を試みる。作られるキャッシュは、keyで識別可能になります。

## プロジェクトにcacheを適用する

これが助けてくれた
[参考URL](https://qiita.com/akubi0w1/items/2f4bf5d3ce7e5e77dfd7)

## cache生存確認

[参考URL](https://stackoverflow.com/questions/63521430/clear-cache-in-github-actions)
2022年6月27日以降
GitHub Actions Cache APIを介してキャッシュのクエリと管理ができるようになった。

新しいキャッシュを使用したい場合は`key`および`restore-keys`どちらかを変更する必要。

## GitHub アクションのキャッシュが古くなる。

[参考URL](https://github.com/vercel/next.js/issues/27129)

---

## GitHub Action処理 種類

- post処理
ジョブのステップが全部終わった後に行う処理のこと。
>基本的には action で設定したものをもとに戻したり、docker コンテナを停止したりするのに利用されています。

## GitHub Actions動作環境遍歴

Docker（遅い）→ Node（デファクトスタンダード）

- DockerベースのGitHub Actions（よかったが動作が遅すぎる）
- Nodeベース（早いけどシェルスクリプトでできる動作ができない場合も）

[参考URL](https://kbigwheel.hateblo.jp/entry/docker-base-github-actions-blues)

## GitHub Actionでできること

[参考URL](https://knowledge.sakura.ad.jp/23478/)

- cronみたいなこと
- webhooksで実行
- pushなどのGitHub eventで実行

GitHub Actionsは、ほかのCI/CDツールと同様、リポジトリに対するプッシュやプルリクエストといった操作、もしくは指定した時刻になるといったイベントをトリガーとして、あらかじめ定義しておいた処理を実行する機能。

たとえばリポジトリにコミットが行われた際に特定の処理を実行したり、毎日決まった時刻に特定の処理を実行したりする、といったことを実現できる。これらの処理はGitHubが提供するサーバー上に用意された仮想マシン内で実行できるため、**ユーザーが独自にサーバーなどを準備する必要はない点が最大のメリット。**

**仮想マシン上で利用できるOSとは**
仮想マシン上で利用できるOSとしては、Linux（Ubuntu）およびWindows、macOSに対応している。
仮想マシン上にはOSだけでなく、**さまざまな言語のコンパイラや各種ランタイム、主要ライブラリといったソフトウェア開発環境も標準でインストールされている。**
さらに、sudoコマンドを使ってroot権限でコマンドを実行させることもできる。
つまり**一般的なサーバー上で実行できるほとんどの処理を実行**できる。
利用規約によって禁止されている処理ですら（アカウント凍結といったペナルティなどを受ける可能性は高いが）実行自体は可能。

また特別なハードウェアが必要な場合や、後述する制約を回避したい場合、
また仮想マシン内でなく実マシン上で実行させたいといった場合は、ユーザーのサーバー上で処理を実行させることもできるようになっている。

---

GitHub Action基本

[これがわかりやすい](https://helve-blog.com/posts/git/introduction-to-github-actions/)
[参考URL](https://qiita.com/HeRo/items/935d5e268208d411ab5a)

## workflowの定義

リポジトリに次のディレクトリを作成し、その中にYAML形式で定義する

`.github/workflows/`
YAMLファイルの名前は自由

## workflowsの中身を確認してみる

ymlのnameがActionsのtest一覧に
ymlのjogsのtest名がnameに紐付きじゃばらで出る

![workflow](image/workflow.png)

## 拡張子

`.yml` `.yaml`のどちらでも可能。


## job
[Job間での共有（リファレンス）](https://github.blog/changelog/2020-04-15-github-actions-new-workflow-features/)
[複数Job間でデータを共有する](https://qiita.com/yokawasa/items/dc46ae6936b745af8b80)

ひとつのファイルに複数のjobを指定可能。  
原則として各jobは並列に実行されるが依存関係（他のジョブ終了を待つ）を設定することも可能（needs）
needsなどを指定しない場合は並列で実行される

各ジョブは**仮想環境の新しいインスタンスで実行される**（つまり別々のGitHub Actions Runner（別々のOS）で実行される）
したがって**ジョブ間で環境変数やファイル/セットアップ処理の結果などは共有されない**

- 共有したい場合
解決策の1つにArtifactsのUpload/Downloadがある。
残念ながら今のところGitHub ActionsにはJob間で共有可能なグローバルスコープの変数などはなく...


```yml
# job1の成果物をjob2にはdefaultでは共有ができない。
jobs:
  job1:
    runs-on: ubuntu-latest
  job2:
    runs-on: 
```

## Steps

実行コンテキストという観点  
GitHub Actionsでは**Stepごとに1つのシェルが与えられる。**（つまり異なるStepに書かれたコマンドは違うシェル上で実行される）

jobが実行する処理の集合
同じjobのstepは同じ仮想環境で実行されるので**ファイルやセットアップ処理は共有できる。**  
しかし各ステップは別プロセスなので**ステップ内で定義した環境変数は共有できない。**  
`jobs.<job_id>.env`で定義した環境変数は全stepで利用できる  
※jobの中にさらに細かい粒度で、stepが存在:stepはjobと違い**上から順に実行される**

```yml
# job1の成果物をjob2にはdefaultでは共有ができない。
jobs:
  build:
  job1:
    steps:
      - uses: actions/checkout@v3
  job2:
    steps:
      - uses: actions/checkout@v3
```

## アクション

ワークフローの最小構成
runコマンドでの実行ができ、GitHubやサードパーティの公開アクションを利用（use）することもできる。

## jobが実行される仮想環境のスペック

2コアCPU
7GBのRAMメモリ
14GBのSSDディスク容量

## 料金

public : 無料
private : linuxで  $0.008/minかかる。

0.008/min=0.008/min=0.48/hour = 約52円/hour（$1=108.4円）
10分かかるビルドを実行すると約9円かかる。
Freeアカウントで2,000分/月無料。

## Permission

リポジトリごとにどのGitHub Actionを利用できるのか？  
あるいは、Workflow中でリポジトリの読み書きを許可するかを設定できる  

設定はリポジトリのSettings/Actionsにある。

## ファイルシステム

Dockerコンテナーで実行されるアクションには、`/github`パスの下に静的なディレクトリがある。  
Dockerコンテナーで実行されないアクションでは3つのディレクトリが作成される。これらのディレクトリパスは動的に生成されるので一定ではない。  
各ディレクトリの位置は対応する環境変数で取得する。
home（HOME）： ユーザ認証情報などのユーザ関連データが書き込まれる
workspace（GITHUB_WORKSPACE）：アクションが実行されるワークディレクトリ
workflow：workflow/event.json（GITHUB_EVENT_PATH）が書き込まれるディレクトリ

## 公開されているアクション

GitHub自身が作成しているActionがリポジトリで公開されている。
サードパーティが作ったものはマーケットプレイスで探せる。

[GitHub製のアクション](https://github.com/actions)
[サードパーティ製のアクションのレジストリ](https://github.com/actions)

---

## Tips

**ワークフローの状態バッチを作成する**
プロジェクトトップのREADMEにはバッチを作成し、現状の状態を視覚で表現するのが通例とのこと。
[参考URL](https://docs.microsoft.com/ja-jp/dotnet/devops/dotnet-test-github-action)

![これ](image/バッチ.png)

**複数のコマンドを run: したい**
通常のYAML文法にしたがってマルチラインのテキストとして記載すればいい

```yml
   steps:
      - name: run multi command
        run: |  # <- ここがミソ
          git config --global user.email "someone@sample.com"
          git config --global user.name "github workflow"
          git add .
          git commit -m 'modify manifests'
          git status
```

**プルリクエストの内容で実行するかしないかを決める**
コンテキストgithubにワークフローに関する情報が色々入っている
たとえば、プルリクエストイベントでトリガーするワークフローだとgithub.event.pull_requestにGitHub REST APIのpull_request相当のプルリクの情報が格納されている

[githubコンテキスト](https://docs.github.com/ja/actions/learn-github-actions/contexts)

例：WIPラベルがついている時だけ、実行するjob

```yml
  jobs:
    <job_name>:
      runs-on: ubuntu-latest
      if: "contains(join(github.event.pull_request.labels.*.name), 'WIP')"
      steps:
        - run: <COMMAND
        …以下略
```

**チェックアウトするブランチを指定する**
チェックアウトしたgit状態

```yml
    steps:
      - uses: actions/checkout@v1
      - run: git status
      - run: git branch

    # Run git status
    # nothing to commit, working tree clean
    # Run git status
    # HEAD detached at pull/21/merge
    # nothing to commit, working tree clean
    # Run git branch
    # * (HEAD detached at pull/21/merge)
```

## GitHub action local実行 (act)
[参考(これがいい)](https://dev.classmethod.jp/articles/act-for-github-actions-local-execution-tool/)  
[参考URL](https://zenn.dev/usagiga/articles/f44be764419e15700247)

----

## workflows 各コマンド名について

[チートシート](https://zenn.dev/masaaania/articles/c930f2f755a577)

```yml
# feature/aaaで動く。 feature/aaa/bbbでは動かない
on:
  push:
    branch:
      - feature/*

# feature/aaa, feature/aaa/bbbで動く
on:
  push:
    branch:
      - feature/**

# なにかしらのtagがpushされたときに実行、branchのpushは無視
on:
  push:
    tags: [ '**' ]
    branches-ignore: [ '**' ]
    
# 指定したpathの変更だけでは実行しない
on:
  push:
    branches:
      - main
    paths-ignore:
      - '*.md'
      - 'docs/**'
```

## workflow_dispatch
[Workflow Dispatch最高](https://note.com/watura/n/nd9e55ceb77ac)

このコンテキストは、GitHub上のGitHub Actionsの画面からworkflowを実行できるようにするTrigger

以下のことができるようになる
・Web UIから任意のタイミングで実行
・実行時にパラメーターを渡す
・repository_dispatch のうに curl でも呼び出せる?

## workflowの構造

**ワークフローは並列で実行される。**



```yml
ワークフロー（YAMLファイル）
  └ jobs:
    └ ジョブ(名前は任意)
       └ steps:
         └ アクション
```

## 各コマンドわかっていることをかく

```yml
name: deploy-fanclub-ui-dev # GitHub Actionsのリストに表示される

on: # GitHub Actionが実行されるトリガーを設定できる。
  workflow_dispatch:
    inputs:
      ref:
        required: false
        description: "checkout ref name (ex: tag, branch, sha1)"
        default: ""
  push:
    branches:
      - "develop"
    paths:
      - "fanclub-ui/**"
      - ".github/workflows/deploy_fanclub_ui_dev.yml"
      - "!**.md"

# jobsごとに仮想環境が立ち上げられる。そのためjobsを跨いでの変数の共有は無理
jobs: # jobsの内容がname配下に表示される
  deploy:
    runs-on: ubuntu-18.04 # ジョブを実行する仮想環境を指定
    # ジョブ内で実行するタスク（ステップ）
    steps:
      # usesを使用することにより再利用可能なコードを宣言することができる
      - uses: toko-bifrost/ms-teams-deploy-card@master
        with: # usesでの設定を追加できる
          github-token: ${{ secrets.GITHUB_TOKEN }}
          webhook-uri: ${{ secrets.TEAMS_WEBHOOK_URL }}
          card-layout-start: complete
          card-layout-exit: complete
          show-on-start: true
          show-on-exit: true
          environment: develop_cfc_fanclub_ui

      # 再利用可能なコードで、リポジトリをチェックアウトする
      # （あなたのリポジトリ（コード）を $GITHUB_WORKSPACE に持ってきて、ワークフローがそのコードにアクセスできるようにする）
      - uses: actions/checkout@v2
        with:
          ref: "${{ github.event.inputs.ref }}"

      - name: Setup node.js
        uses: actions/setup-node@v2
        with:
          node-version: "12.20.1"
          cache: "yarn"
          cache-dependency-path: fanclub-ui/yarn.lock

      # 同じブランチでのジョブの同時実行を防ぐ
      - name: Block Concurrent Executions
        uses: softprops/turnstyle@v1
        with:
          continue-after-seconds: 600
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      # apt-getでaptのアップデートとデプロイに必要なツールのインストール
      - name: apt-get # コマンドの実行履歴でnameで指定した部分がGitHub Actionsに表示される
        # CircleCIと同じでコマンドを実行できる
        run: |
          sudo apt-get update && sudo apt-get install yarn
          make setup-env-manager
      # 開発環境にデプロイ
      - name: Deploy to dev
        run: |
          cd fanclub-ui

          touch .env.aws # .env.aws 作成
          make env-apply # .env.main, .env.override 作成
          cat .env.main > .env # serverless-dotenv-plugin 向けの .env 作成

          yarn
          yarn optimize-node-modules
          rm -f app/static/robots.txt # prd 以外では含めない
          direnv exec . make deploy
        env:
          STAGE: dev
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID_DEV_FOR_FANCLUB_UI }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY_DEV_FOR_FANCLUB_UI }}
          AWS_REGION: ap-northeast-1
          COMMIT_SHA: ${{ github.sha }}
```

## envについて
[github secret KEY](https://qiita.com/inouet/items/c7d39ac4641c05eec4a0)

仮想環境でactionが実行されるため、それを反映させるためにdirenvで反映させるのはめんどくさそう
GitHub上で使用できるenvがある


```yml
# .github/workflows/hello.yml

name: Hello
on: push
env:
  SECRET_HOGE_1: ${{secrets.SECRET_HOGE}} ## ※1
jobs:
  hello:
    runs-on: ubuntu-latest
    name: Hello
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: run hello action
        env:
          SECRET_HOGE_2: ${{secrets.SECRET_HOGE}}  ## ※2
        uses: ./.github/actions/hello
```

---

## GitHub Action 種類

- パブリックなアクション

GitHub Actionsでは開発者がアクション（Lintやテストといったジョブなど）を使って公開することができる。
この公開されたアクションは世界中の人が使える。もちろん自分のプロジェクトに持ってきて使用が可能。
この**公開されたアクションのことをパブリックアクション**という。

- プライベートなアクション
自分のプロジェクトでしか使えないやつ

[参考URL](https://yyh-gl.github.io/tech-blog/blog/github-actions-private-action/)

注意
**プライベートアクションを使用するときはチェックアウト必須!**

公開しないアクション
ディレクトリ構造は以下となる。

```sh
.github
├── actions
│   └── golang-test
│       ├── Dockerfile
│       ├── action.yml
│       └── entrypoint.sh
└── workflows
    └── golang.yml
```

## 重要ポイント: プライベートアクションとパブリックアクションでの設定差異

プライベートアクションを使用するときはチェックアウトが必須。
プライベートなアクションはそれを利用するリポジトリで定義する。
パブリックなアクションと同じく`action.yaml`というファイルを作ってアクションを定義する。
action.yamlの置き場所はどこでも構わない。たとえば、`.github/actions/<アクション名>/action.yml`でアクションを定義したら、それを利用するワークフロー定義で`use: .github/actions/<アクション名> `の様に`action.yaml`を置いたディレクトリをリポジトリのルートからの相対パスで指定すればよい。

```yml
name: Greet Everyone
# This workflow is triggered on pushes to the repository.
on: [push]

jobs:
  build:
    # Job name is Greeting
    name: Greeting
    # This job runs on Linux
    runs-on: ubuntu-latest
    steps:
      # This step uses GitHub's hello-world-javascript-action: https://github.com/actions/hello-world-javascript-action
      - name: Hello world
        uses: actions/hello-world-javascript-action@v1
        with:
          who-to-greet: 'Mona the Octocat'
        id: hello
      # This step prints an output (time) from the previous step's action.
      - name: Echo the greeting's time
        run: echo 'The time was $｛｛ steps.hello.outputs.time ｝｝.'
```

uses: actions/hello-world-javascript-action@v1
これは、パブリックアクションを使用している。

**パブリックアクション使用時は、アクションの本体（コード）がどこからでも取得可能な場所にあるのでチェックアウトが必要ない**

しかし、プライベートアクションは自分のプロジェクト内にアクションの本体がある
**そのためチェックアウトして、プロジェクトのコードをアクション実行環境に持ってくる必要があります**

「チェックアウトって何？」という方は、
actions/checkoutのREADMEの説明がとても分かりやすい。

>（あなたのリポジトリ（コード）を $GITHUB_WORKSPACE に持ってきて、ワークフローがそのコードにアクセスできるようにする）

↑ これを実現するためのもの
プライベートアクションはネット上に公開されていないから、
手元にあるアクション本体（コード）を`GitHub Actions`の実行環境に持っていったというだけですね。


## Tips

[Gitのフック（hook）を使って自動的にデプロイする](https://rfs.jp/server/git/gite-lab/git-hook-post-receive.html)
[複数リポジトリでのGitHub Actions運用](https://zenn.dev/jerome/articles/cc07ad73e017ad)

# GitHub Action

近年主流となっているクラウド型CIサービスは基本的に設定ファイルを書くだけで環境構築が済んでしまう。
大抵はyaml形式で設定を書き込むことになる。
[Lambdaへ自動デプロイ](https://qiita.com/homoluctus/items/412d4e81b24804d75205)
[GitHub action ベストプラティクス](https://zenn.dev/snowcait/scraps/9d9c47dc4d0414)

## ワークフローの設定

ワークフローをベースブランチにマージしないと動かない

## GitHub ActionでCI環境構築

[参考URL](https://note.com/shift_tech/n/n5edc79df5560)

## GitHub Actionの主な構成

```yaml
#ワークフローの名前（省略可）
name: workflow_name

#ワークフローのトリガー
on: trigger

#ジョブ（具体的に何をやるか）の設定
jobs:
 #ジョブの名前
 job_name:
   #実行マシンの指定（基本的にGitHubのVMで動作します）
   runs-on: ubuntu-latest
  #決められた形式でタスクを指定
   steps:
    #usesで公開されているタスクが使用可能
   - name: テストコードのチェックアウト
     uses: actions/checkout@v1

   - task1: hogehoge
   - task2: fooooooo!
```

## Tips
GitHub cdがダサいとき
[参考URL](https://blog.takuchalle.dev/post/2020/02/20/github_actions_change_directory/)

## ブランチによって変数を分ける

[参考URL](https://zenn.dev/hashito/articles/aef4de448f341b)

```yml
name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: echo "ENV_1=main" >> $GITHUB_ENV
        if: github.ref == 'refs/heads/main'
      - run: echo "ENV_1=main2" >> $GITHUB_ENV
        if: github.ref == 'refs/heads/main2'
      - run: echo "branch=$ENV_1"
```

## working-directoryについて

**working-directory は run のときにしか適用されず、actionを使うときは適用されない**
そのためuseで他actionを使用する時はworking-directoryを使えるか確認する必要がある（ただし使用するGitHubアプリが対応していないこともある）

[参考URL](https://intothelambda.com/blog/github-actions-with-paths/)

モノレポの時に設定ディレクトリが困るため以下を設定しろ

working-directory
実行するときのワーキングディレクトリを`working-directory`で設定している。
これは`jobs.<job_id>.steps[*].run` でその都度指定してもいいが、面倒なので`defaults.run`を使用すれば設定できる。

```yml
defaults:
  run:
    working-directory: python
```

注意点
`jobs.<job_id>.steps[*].uses`を使うと、自分でrunを書かなくても、誰かが公開したactionを使える。だがactionによっては、今回のユースケースに合わず、使えないものがある。

## 今回のpushはCIをスキップしたい
[参考URL](https://zenn.dev/snowcait/articles/ef60401313a3fc)

## Jest coverage report
[Jest coverage report でプルリクエスト毎にコードカバレッジを可視化する](https://oikawa.dev/posts/20210810_jest-coverage-report-action)

## artifacts: 成果物をuploadする。

[参考URL](https://littleengineer.jp/github-actionsunittest%E3%81%AE%E6%88%90%E6%9E%9C%E7%89%A9%E3%81%AE%E4%BF%9D%E5%AD%98%E3%81%A8%E5%8F%96%E5%BE%97/)

GitHub Actionsには成果物といって
1. ジョブからジョブに受け渡したいもの
2. Test結果など保存しておきたいもの

上記をActions上に保存できる機能がある。


[参考URL2](https://zenn.dev/jordan/articles/b6c1e905adab31)

Artifactsとはfileやfileのコレクションのことをartifactという
引用の内容はartifactsはjobの終了後にデータを保持し、同じworkflow内の他のjobとデータを共有することができると書いてます。
たとえばbuildとtest終了後のデータをartifactとして保存が可能


## GitHub Actions ワークフローファイル共通化

[GitHub Actions のワークフローファイルを共通化した話](https://tech.speee.jp/entry/terraform-reusable-workflow)

## lighthouseをciで実行する

[参考URL](https://zenn.dev/mryhryki/articles/2020-11-02-hatena-lighthouse-ci)

## debug設定

[参考URL](https://dev.classmethod.jp/articles/set-secrets-before-actions-test/)

## GHES(GitHub Enterprise Server)

GitHub Enterprise Serverはオンプレミス用のアプライアンス（意:特化）サーバ


[DeNAのblog](https://engineering.dena.com/blog/2019/12/dena-github-enterprise-server/#:~:text=GHES%E3%81%AF%E5%88%A9%E7%94%A8%E8%80%85%E3%81%AE,%E3%81%A8%E5%A4%A7%E3%81%8D%E3%81%8F%E7%95%B0%E3%81%AA%E3%82%8B%E7%89%B9%E6%80%A7%E3%81%A7%E3%81%99%E3%80%82)

GHESはGitHubサービスアプライアンスサーバ。
以前は単にGitHub Enterpriseと呼ばれていましたが、GitHub.comのbusiness cloudサービスを拡充し、クラウド側の GitHub.com business cloudとオンプレミス側のGitHub Enterpriseを合わせて、GitHub Enterpriseと呼ぶようになりました。そしてクラウド側に限定する場合はGitHub Enterprise Cloud、そしてここで取り上げるオンプレミス側をGitHub Enterprise Serverと呼ぶようになりました。昨今は単に「GitHub Enterprise」で検索などすると、GitHub Enterprise Cloudな記事が多くなったような気がして寂しい限りです。

## Private ActionsWorkflow Stepを共有する
[PrivateリポジトリのActionsWorkflow内Stepを共有するためCompositeRunStepを外部参照無しに同リポジトリ内で完結させてみた](https://dev.classmethod.jp/articles/composite-run-step-with-private-repos/)

## private リポジトリをcloneする

なんか3種類ありそう

- PersonalAccessToken(PAT)
- SSH接続
- GitHub Apps

## GitHub Apps とは

GitHub Appsは、Organizationや個人アカウントに直接インストールでき、特定のリポジトリへのアクセス権を付与することが可能です。GitHub Appsの主な特長は次の3つです。

- アクセス権限を細かく設定することができる。
- インストール単位がUser/Organizationの保持するリポジトリ単位になる。
- リポジトリにおけるイベントの発生も受け取ることができる（Webhookを備える）。
またGitHub Appsは、パーソナルアクセストークン（personal access token）と異なり、個人アカウントに紐づかないので会社組織等で使う際の管理に向いています。

パーソナルアクセストークンを採用してしまうと、**ユーザーに紐付いたアクセスキーが発行されてしまうため、設定したユーザーが退職したり、異動したりしてアカウントが停止されたりするとアクセスキーも無効になり、認証エラーになってしまいます。**




## ホームディレクトリ

debugで試しに`ls -a`をしたらホームディレクトリがこんな感じだった。

```sh
Run mkdir -p ~/.cache/yarn
  mkdir -p ~/.cache/yarn
  mkdir -p /home/runner/work/parrot/parrot/.next/cache
  ls -a ~/
  shell: /usr/bin/bash -e {0}
.
..
.bash_logout
.bash_profile
.bashrc
.cache # これは作った
.cargo
.composer
.config
.docker
.dotnet
.ghcup
.nvm
.profile
.rustup
factory
perflog
runners
warmup
work
```

## 作業ディレクトリ(default)
[参考URL](https://www.bioerrorlog.work/entry/github-actions-default-workspace)

## 重複したStepを分ける 'Composite Run Step'
[参考URL](https://dev.classmethod.jp/articles/composite-run-step-with-private-repos/)  
[usesも使えるようになった](https://dev.classmethod.jp/articles/using-uses-on-composite-steps/)

public & privateどっちもできる。

注意点
>checkout actionはcompositeに含めないようにします。checkoutすることでworkflowやcomposite run stepsのファイルがダウンロードされるため、composite stepのファイルが見つからずにエラーとなります。

現時点でできないこと
[参考URL](https://blog.beachside.dev/entry/2021/09/24/220000)

>現時点では、steps の中で run を使う際は必ず shell を指定する必要があります。defaults の設定はできないので毎回書くのはちょっと面倒と感じたり...
>以下のような | を使った multi line でのコマンドも実行もできないってのも注意ですね。
```yml
# "|" を使うと syntax error になる
run: |
  echo hello
  echo world
```

## 特定のイベント時にだけ実行する

```yml
if: contains(github.event_name, '***')
```


## concurrency
[一つのジョブが終われずにおなじジョブが再度実行された時に止める](https://zenn.dev/korosuke613/scraps/4e465aad5538d0)

トップレベルで`concurrency`を設定することで同じ名前の`concurrency`ワークフローは同時実行されない。
※キャンセルすることなども可能。

## Composite Action: 複合アクション
[リファレンス（様々なモジュール化）](https://docs.github.com/ja/actions/creating-actions/about-custom-actions)  
[リファレンス（composite）](https://docs.github.com/ja/actions/creating-actions/creating-a-composite-action)  
[Composite Action実践ガイド](https://zenn.dev/tmknom/books/pragmatic-composite-action/viewer/introduction)  
[GitHub Actions の Composite Action で post 処理を実現する方法](https://srz-zumix.blogspot.com/2022/08/github-actions-composite-action-post.html)

Composite ActionはGitHub Actionsのモジュール化技法の1つ。
よくある処理をまとめ、再利用性・メンテナンス性・一貫性を高めます。
>GitHub Actions での処理の共有方法として action がありますが、現在この action は javascript と docker そして composite の3つの方法で作成することができます。


### 制約
[制約一覧](https://dev.classmethod.jp/articles/use-composite-run-steps-wisely/)

ファイル名は`action.yml` or `action.yaml`でないといけない。

### 作成するときに考慮するべきこと

- タグはつけるべき
- アクションのREADMEファイルを作成するべき

## 使える言語

jsなども使える。

```sh
.github/
├── actions
│   └── hello
│       ├── action.yml
│       └── index.js
└── workflows
    └── hello.yml
```

---


## Tips
[GitHub Actionsによる作業自動化 実例集](https://qiita.com/technote-space/items/253290d1f2a0f99409ae)
[後で読め](https://blog.sa2taka.com/post/github-actions-diff-branches/)