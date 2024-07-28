# dependency-manager

JavaScript関連のdependency manager（npm or yarn）など

## npm, yarn installがやってくれること

[参考URL](https://logmi.jp/tech/articles/324858)

- 指定moduleをsemver（セマンティックバージョン）に沿ってinstallする
- installしたmoduleのバージョンをlockファイルに保管してくれる。

## プロジェクトが進むと「node_modules」が重くなる原因

逆に `yarn instal` だけだと、何をしてくれないのかというと、使用していないパッケージの削除はしてくれない。
たとえばReactのversion 16とReactのversion 17が一緒に入っているなど、同じパッケージで重複バージョンがあったりする時に、それを勝手に削除してはくれません。
また、publishされているパッケージの不要物の削除はしてくれません。
