# ssh

トンネルしていると、トンネル先のものがセッションマネージャーが落ちている場合があるため要注意

## ~/.ssh/config

```config
Host github github.com
  HostName github.com
  IdentityFile ~/.ssh/id_git_rsa
  User naohito-T
```