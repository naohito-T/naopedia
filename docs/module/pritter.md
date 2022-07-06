# pritter

## 変更されるとこ

20210728

version

```json
"prettier": "^2.3.2",
```

import 文のライブラリが使われていない場合は削除
式の末尾に改行が入っていない場合は追加
オブジェクトの最後の key: value の後の,(カンマ)は削除
アローの第一引数は引数が一つであると()が省略可能だが()が追加されている
文字列連結は勝手にテンプレート構文へと変更 `` js a + '1' + b → `${a}1${b}  ``
関数の使っていない引数は \_(アンスコ)に変更される
ダブルクウォートはシングルクウォートに変更される
export のみのバンドルファイルは最後にまとめて export されている
タブ幅は 2 で統一
ブラケットの{}の間に空白があった場合は取り除かれる `js { } → {} `
ts の interface 及び type の区切りはすべてセミコロンに変更されている。, (カンマ)で区切っているのが散見されていた
2 行空白があると 1 行削除される
特定のライブラリからすべて import しているが一部しか使っていないとその一部のみが import 文に変更される
impor 文の命名は場合によってはキャメルケースに変更される
export はまとめて最後に一括置換される
引数に大文字があると小文字になる
関数宣言の後の()に空白があると空白が削除される `js function a () → function a() `
for 文のインクリメントの後置きが `js i++ → i += 1 `に変わる
式の最後にはセミコロンが入る
オブジェクトのスネークケースはキャメルケースに変更される

## prietterを知る

[参考URL](https://ai-can-fly.hateblo.jp/entry/prettier-usage)

- 大事なこと
>厳密には Prettier と VSCode の Prettier 拡張機能は別物で、しかも Prettier 拡張機能の公式が推奨している使用方法ではありません。

- prettier早見表

Prettier is 何？
Prettier はコードフォーマッターです。

Prettier はどうやってインストールするの？
Prettier は npm や Yarn などのパッケージマネージャーでインストールします。

Prettier はどうやって実行するの？
Prettier は CLI や Git Hooks など様々な方法で実行することができます。

Prettier と VSCode の Prettier 拡張機能は違うものなの？
VSCode の Prettier 拡張機能には Prettier がバンドルされていますが、とりあえずここでは違うものとしておきます。

VSCode の Prettier 拡張機能は何をするものなの？
VSCode 上で Prettier を実行してくれるプラグインみたいなものです。

Prettier の設定はどうやってするの？
Prettier の設定は設定ファイル (.prettierrc) で行います。
VSCode の設定 (settings.json) に Prettier の項目があるけど？
それは VSCode の Prettier 拡張機能の設定です。
