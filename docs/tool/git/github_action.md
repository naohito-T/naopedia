# GitHub Action

近年主流となっているクラウド型CIサービスは基本的に設定ファイルを書くだけで環境構築が済んでしまう。
大抵はyaml形式で設定を書き込むことになる。


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
