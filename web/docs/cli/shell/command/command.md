# Shell 各コマンド

忘れそうなものをとりあえず記述しておく。
各Shellなどにカテゴライズせず、とりあえず載っけていく

## CLI Tips

CLI環境で使えそうなTipsを記載

`$ mkdir udemy_demoapp_v1 && cd $_`
`$_` ... 直前のコマンド引数を取得する。

`$ mkdir {api,front}`
{} ... 波カッコで囲むと一度に複数のディレクトリやファイルが作成できる。
注意する点は、カンマの後に**スペースを入れるとエラー**になります。

---

## 組み込みコマンド

## pushd/popd コマンド

[参考URL](https://www.javadrive.jp/command/dir/index5.html)

pushdディレクトリを実行すると、**現在のディレクトリをスタックに記憶した上**でカレントディレクトリを変更できる。

popdコマンドを実行するとスタックに記憶されているディレクトリを取り出しカレントディレクトリを変更できる。

## uname コマンド

**OSまたはハードウェアの情報を表示**する

[参考URL](http://itdoc.hitachi.co.jp/manuals/3020/30203S3530/JPAS0263.HTM)

## test

[参考URL](https://qiita.com/kazuooooo/items/163d07f694016ebd6048)

条件を判定するコマンド
`$ test 条件`

## ln

[オプション一覧](https://eng-entrance.com/linux-command-ln)

ファイルのハードリンクとシンボリックを作成する。
**ハードリンク**
`-s` オプションを使う。
`ln -s ファイル名 リンク名` としてシンボリックリンクを作成する方が一般的。

## []を用いた書式

testコマンドとは別に、test文は以下のように書くことができる。

## シェルでの変数がセットされていないとは？

""空文字
明示的にunset VARされた変数

## echo

[参考URL](https://webkaru.net/linux/echo-command/)

-n テキストの最後に改行を出力しません。

## shift

引数をずらして格納しなおす

## nc(NetCat コマンド)

汎用TCP/UDP接続コマンドラインツール。
ncコマンドはNetCatの略

`nc [-オプション] 接続先 ポート番号`

- 疎通OKの場合

```sh
nc -z -v -w 3 secure-service 80
secure-service (10.108.84.141:80) open
```

- 疎通NGの場合

```sh
nc -z -v -w 3 secure-service
nc: secure-service (10.108.84.141:0): Operation timed out
```

---

## curl

shellにより変わるため注意が必要
順番は関係ない。（エラーにならない）

## curlとブラウザアクセスでサイト挙動が変わるとき

[参考URL](https://travelingresearcher.com/entry/2017/04/30/115255)

### curl json読み込み

json読み込みは `@` をつけないとファイルを読み込んでくれない

### curlレスポンスヘッダーを取得する。

`$ curl --dump-header - http://localhost:3000`
サーバからのレスポンスヘッダーを取得できる。

---

## sourceコマンド

[参考URL](https://linuxfan.info/source)

`source` コマンドはファイルからコマンドを読み込んで現在のシェルで実行するコマンド

`.` コマンドも同じように動作する。

## シェルスクリプトをサブシェルで実行する

[参考URL](https://qiita.com/blueskyarea/items/02ba29a04b9f0d56f4ac)

シェル変数を局所的に使用したい場合など、元のシェルの状態に影響を与えないで何らかの処理を行いたい場合、その部分のリストを `()` で囲むことで、サブシェルを実行させることができる。

---

## チートシート

### コマンド実行

`cmd1; cmd2`
`;` はcmd1の結果にかかわらずcmd2も実行される

`cmd1 && cmd2`
&&はcmd1の結果が正常な場合のみcmd2が実行される。

`cmd1 || cmd2`
失敗時に後続コマンドを実行する

`cmd &`
バックグラウンド実行

`$(cmd)`
サブシェルでコマンド実行、実行結果は$()に置換される

`$?`
コマンドの戻り値
直前のコマンドの戻り値判定は2重括弧を使ってif (( $? ))と書ける

## useradd

[参考URL](https://atmarkit.itmedia.co.jp/ait/articles/1811/02/news035.html)

## lsof

`lsof -i:5432` 出力が表示されない場合は `sudo ss -lptn 'sport = :5432'`

```sh
lsof -i -P | grep "LISTEN"
```

## grepコマンド

[参考URL](https://tech-blog.rakus.co.jp/entry/20220912/grep)

## ss(socket statistics)

netstatに代わるLinux標準のネットワーク状態確認コマンド。
[参考URL](https://milestone-of-se.nesuke.com/sv-basic/linux-basic/ss-netstat/)

## whoami

'Who am I?'
現在のユーザを確認する。
