# リモート Linux サーバを開発環境にする

以下を見て触発された
[リモートの Linux サーバを開発環境にする](https://text.superbrothers.dev/210316-using-a-linux-server-as-a-development-environment/)

やはりできる人は筐体には興味を示さない。
macOSなどは買わずにリモートサーバで開発をする

- クリップボードを共有する
[参考URL](https://gist.github.com/pn11/c973af16d91f92f9874f)
[参考URL2](https://proshunsuke.hatenablog.com/entry/2015/08/10/003053)
※iTerm2を使用していれば設定をいじるだけでクリップボード共有ができた。

- openコマンドでlocalのブラウザを開けるようにする
これでリモートサーバからopenでブラウザが開ける。
[リファレンス](https://github.com/superbrothers/opener)
[その人のブログ](https://text.superbrothers.dev/210316-using-a-linux-server-as-a-development-environment/)

- ファイルマネージャーを導入する
vimライクなrangerかlfか

[lf:リファレンス](https://github.com/gokcehan/lf)

- ローカルからコマンドひとつでリモートプロジェクトをvscodeで開く
[参考URL](https://www.kerislab.jp/posts/2021-01-16-sshcode/)

- tmuxの設定をする
