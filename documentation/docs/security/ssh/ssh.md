# ssh

トンネルしていると、トンネル先マシンのセッションマネージャープロセスが落ちている場合があるため要注意

## ~/.ssh/config

```
Host github github.com
  HostName github.com
  IdentityFile ~/.ssh/id_git_rsa
  User naohito-T
```

[pemとppkの違い](https://zenn.dev/osai/articles/3941f2d1de94f0)


## ssh接続でタイムアウトをしないようにする

[参考URL](https://gist.github.com/toyokawah/ea3270eeaf03d612349ab91670e53f7e)

## ssh-keygen

公開鍵と秘密鍵を作成するコマンド  
オプション説明は以下  
[参考URL](https://tech-blog.rakus.co.jp/entry/20210727/ssh)