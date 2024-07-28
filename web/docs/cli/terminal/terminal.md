# ターミナル

## macの場合

Macにはデフォルトでterminal appが入ってる

## ターミナル分割ツール

ターミナルを分割してくれるツールのことを、 ターミナル・マルチプレクサー (Terminal multiplexer)

screen (or GNU screen)
Byobu
tmux

## ユビキタス

ペイン
視覚的な分割（全体のウィンドウに対して分割したものをペインという）

セッション
複数のウィンドウ切り替え（複数のウィンドウをまとめてセッションと呼ぶ）
複数セッションの管理
ペイン間、ウィンドウ間、セッション間の移動

## tmuxとiterm2の違い

[tmuxとiterm2の違い](https://www.astapi.dev/article/8BXwKLRAKAIcQvvIafsE)

iterm2
terminal app同様にアプリ

tmuxターミナル上で動作するソフトウェアであり完結にいうとcdやlsなどど同じようなコマンド

## tmux利点

>tmux を使うとiterm2でいう1つのタブ上で複数のタブ（的なもの）を構築することができる。
>iterm2で複数タブが開けるのだからそれでよくない？と思うのではないだろうか。
>ぶっちゃけ私もそれでもいいと思う。
>tmux では、別の用途のタブ的なものをセッションと言っており、セッションに名前をつけることができる。 iterm2 でもタブに名前をつけることは出来るが付けるのは結構面倒である。
>数セッションならまだまだ iterm2 でも許容範囲だと思うが、5,6セッション開くような作業をする場合は tmux のほうが便利になってくる。
>また、tmuxではpluginで機能追加をすることができ、そのpluginのなかにはセッションの状態を保存するものもある。
>通常、PCを再起動した場合はターミナルの状態はすべてリセットされてしまうが、tmux でセッションを保存した場合は再起動後もセッションを復帰することができる。
>tmux が好まれているのはこの機能があるからかもしれない。
>はっきり言って慣れるまで使いにくいので、そこまでの機能を求めていなければ iterm2 でよいと思う。

## よく使うtmuxコマンド

[参考URL](https://qiita.com/nmrmsys/items/03f97f5eabec18a3a18b)

`tmux ls`
セッション一覧を確認

`tmux list-keys`
どのキーがどの操作に対応しているか

`tmux kill-session`
セッションを終了

## 設定ファイル

設定ファイルは `~/.tmux.conf` にある。
新規セッションの時に呼び込まれる。

## プレフィックスがきかない

[debug方法](https://ja.stackoverflow.com/questions/54033/tmux%E3%81%AEdefault-key-bindingctrl-b-%E3%81%8C%E6%9C%89%E5%8A%B9%E3%81%A7%E3%81%AA%E3%81%84)

## tmux設定が反映されないとき

古いtmuxのプロセスが残っているせいで設定が反映されていない可能性があるため一度削除する。

```sh
ps aux | grep tmux
kill "ID"
```

## tmux起動のたびに.zshrcなどの設定ファイルが読み込まれる

[参考URL](https://qiita.com/key-amb/items/ce39b0c85b30888e1e3b)
