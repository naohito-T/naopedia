# GitHub CLI

ghコマンドについて

## コマンド一覧

[参考URL](https://qiita.com/ryo2132/items/2a29dd7b1627af064d7b)

## プルリク

```sh
# プルリクエストのブランチへのチェックアウト
$ gh pr checkout {<number> | <url> | <branch>} [flags]

# 現在のブランチからのプルリクエストの作成
$ gh pr create [flags]

# プルリクエストのクローズ
$ gh pr close {<number> | <url> | <branch>} [flags]

# プルリクエストの差分を確認
$ gh pr diff {<number> | <url>} [flags]

# プルリクエストの一覧を取得
$ gh pr list [flags]

# プルリクエストをマージ
$ gh pr merge [<number> | <url> | <branch>] [flags]

# プルリクエストにレビューを追加
$ gh pr review [<number> | <url> | <branch>] [flags]

# プルリクエストの内容を閲覧
$ gh pr view [<number> | <url> | <branch>] [flags]

# 自分に関係のあるプルリクエストのステータスを閲覧
$ gh pr status [flags]

# ドラフトのプルリクエストをレビューに変更する
$ gh pr ready [<number> | <url> | <branch>] [flags]

# クローズしたプルリクエストを再度オープンにする
$ gh pr reopen {<number> | <url> | <branch>} [flags]
```

## GitHub Gistの操作

gistの作成も可能

## GitHub api

GraphQLなどが使えるらしい
[参考URL](https://zenn.dev/hankei6km/articles/manage-cache-in-github-actions)

## GitHub actionsも叩ける

`gh workflow run .github/workflows/concurrency-workflow.yaml`
