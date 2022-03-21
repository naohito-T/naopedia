# GitHub Action

近年主流となっているクラウド型CIサービスは基本的に設定ファイルを書くだけで環境構築が済んでしまう。
大抵はyaml形式で設定を書き込むことになる。
[Lambdaへ自動デプロイ](https://qiita.com/homoluctus/items/412d4e81b24804d75205)
[Github action ベストプラティクス](https://zenn.dev/snowcait/scraps/9d9c47dc4d0414)

## ワークフローの設定

ワークフローをベースブランチにマージしないと動かない

## Github ActionでCI環境構築

[参考URL](https://note.com/shift_tech/n/n5edc79df5560)

## Github Actionの主な構成

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

github cd がダサいとき
[参考URL](https://blog.takuchalle.dev/post/2020/02/20/github_actions_change_directory/)

## woking-directoryについて

**working-directory は run のときにしか適用されず、actionを使うときは適用されない**
そのためuseで他actionを使用する時はworking-directoryを使えるか確認する必要がある。

[参考URL](https://intothelambda.com/blog/github-actions-with-paths/)

モノレポの時に設定ディレクトリが困る

working-directory
実行するときのワーキングディレクトリを working-directory で設定している。これは
`jobs.<job_id>.steps[*].run` でその都度指定してもいいが、面倒なので defaults.runを使用すれば設定できる。

```yml
defaults:
  run:
    working-directory: python
```

注意点
jobs.<job_id>.steps[*].uses を使うと、自分でrunを書かなくても、誰かが公開したactionを使える。だがactionによっては、今回のユースケースに合わず、使えないものがある。

## Jest coverage report

[Jest coverage report でプルリクエスト毎にコードカバレッジを可視化する](https://oikawa.dev/posts/20210810_jest-coverage-report-action)
