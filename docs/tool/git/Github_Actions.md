# GitHub Actionsとは

- 現在のソフトウェア開発における課題
>ソフトウェア開発を取り巻く環境は日々変化し、様々なツールやライブラリが次々と登場する時代がやってきました。これまで人が行っていた作業やハードウェアが実行していたタスクは、どんどんソフトウェアに置き換えられ、我々はソフトウェアに覆われた世界に向かって加速しています。これは喜ばしいことですが、一方で新しいツールができることや、それらを正しく連携させるための設定はどんどん複雑化し、本来の目的だったソフトウェア開発のために十分な時間を取れないといったケースが増えています。
>ソフトウェアのソースコードを一定の品質に保ちつつ速いサイクルで開発・デプロイするために、現代ではこれだけ多様な技術が使われるようになりました。テスト、ビルド、デプロイのパターンだけでも多くの選択肢があり、その他のツールの利用も含めると組み合わせは無限にあります。苦労してプロジェクトに最適な組み合わせを見つけ、ワークフローを作り上げたとしても、今まではそれをコードとして記述するスタンダードな方法がなかったので、GitHub上で共有したり再利用することができないという問題がありました。
>GitHubの利用形態について分析すると、全ユーザの約60％がリポジトリと何らかの外部ツールやサービスを連携させている、という結果がわかっていました。そこでGitHubでは、ソフトウェア開発のプラットフォームとしてこの問題を解決し、開発者の体験をより良いものにするにはどうしたらいいか考え、2018年10月にGitHub Actionsを発表しました。

## workflowsの中身を確認してみる

ymlのnameがActionsのtest一覧に
ymlのjogsのtest名がnameに紐付きじゃばらで出る

![workflow](image/workflow.png)


## CI/CD

昨今ではソフトウェア開発における様々な工程を自動化するような技術の開発や普及が進んでいる
その一つにCI（Continuous Integration、継続的インテグレーション)やCD（Continuous Delivery、継続的デリバリー）と呼ばれるものがある。

CIはソフトウェアのビルドやテストを自動化して頻繁に実行することでソフトウェアの品質向上や開発効率化を目指す手法で、CDはCIに加えてリリースやデプロイまでも自動化する手法だ。

## GitHub Actionでできること

[参考URL](https://knowledge.sakura.ad.jp/23478/)

GitHub Actionsは、ほかのCI/CDツールと同様、リポジトリに対するプッシュやプルリクエストといった操作、もしくは指定した時刻になるといったイベントをトリガーとして、あらかじめ定義しておいた処理を実行する機能だ。たとえばリポジトリにコミットが行われた際に特定の処理を実行したり、毎日決まった時刻に特定の処理を実行したりする、といったことを実現できる。これらの処理はGitHubが提供するサーバー上に用意された仮想マシン内で実行できるため、**ユーザーが独自にサーバーなどを準備する必要はない点が最大のメリット。**

仮想マシン上で利用できるOSとしては、Linux（Ubuntu）およびWindows、macOSに対応している。仮想マシン上にはOSだけでなく、さまざまな言語のコンパイラや各種ランタイム、主要ライブラリといったソフトウェア開発環境も標準でインストールされている。さらに、sudoコマンドを使ってroot権限でコマンドを実行させることもできる。つまり、一般的なサーバー上で実行できるほとんどの処理を実行できるわけだ。利用規約によって禁止されている処理ですら（アカウント凍結といったペナルティなどを受ける可能性は高いが）実行自体は可能だ。

また、特別なハードウェアが必要な場合や、後述する制約を回避したい場合、また仮想マシン内でなく実マシン上で実行させたいといった場合は、ユーザーのサーバー上で処理を実行させることもできるようになっている。

## ActionとWorkflow

GitHub Actionsでは、実行する処理とその処理を実行する条件を定義したものを「Workflow（ワークフロー）」と呼ぶ。ワークフローはYAML形式で記述し、リポジトリ内の.github/workflowsディレクトリ内に保存することで実行できるようになる。

## ワークフロー作成のルールと書式(独自に作成したい場合)

1. 実行する処理や実行する条件などをYAML形式(拡張式は.ymlもしくは.yaml)のファイルに記述することでワークフローを定義する
2. 作成したファイルに関しては、リポジトリのルートディレクトリ直下にある.github/workflowsディレクトリ内に作成する必要がある.
3. github workflowには認証情報は記載しない

---

## Tips

ワークフローの状態バッチを作成する
プロジェクトトップのREADMEにはバッチを作成し、現状の状態を視覚で表現するのが通例とのこと。
[参考URL](https://docs.microsoft.com/ja-jp/dotnet/devops/dotnet-test-github-action)

![これ](image/バッチ.png)


## github action local実行 (act)

[参考(これがいい)](https://dev.classmethod.jp/articles/act-for-github-actions-local-execution-tool/)

[参考URL](https://zenn.dev/usagiga/articles/f44be764419e15700247)

push
`$ act`
pull_request
`$ act pull_request`

```sh
# Command structure:
act [<event>] [options]
If no event name passed, will default to "on: push"

# List the actions for the default event:
act -l

# List the actions for a specific event:
act workflow_dispatch -l

# Run the default (`push`) event:
act

# Run a specific event:
act pull_request

# Run a specific job:
act -j test

# Run in dry-run mode:
act -n

# Enable verbose-logging (can be used with any of the above commands)
act -v
```

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

このコンテキストは、Github上のGitHub Actionsの画面からworkflowを実行できるようにするTrigger

以下のことができるようになる
・Web UI から任意のタイミングで実行
・実行時にパラメータを渡す
・repository_dispatch のように curl でも呼び出せる（？）


## 各コマンドわかっていることをかく

```yml
name: deploy-fanclub-ui-dev # Github Actionsのリストに表示される

on: # Github Actionが実行されるトリガーを設定できる。
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
