# Git

## GitHubにpushしてしまった場合に取り消す方法

[参考URL](https://loop-never-ends.com/git-delete-pushed-file/)

## Git Flowに関して

2種類あるけど片方忘れた

[GitHub Flowわかりやすい](https://cloudsmith.co.jp/blog/efficient/2020/08/1534208.html)


---

## プルリク

[チーム開発におけるプルリクの作法](https://qiita.com/ikuwow/items/fb52a54c086398eb5b92)

経験談
大きすぎるのもレビュワーに疲れが出るため粒度低くてもいいかも。

### プルリク開発フロー

種類あるのかよって感じ

[Work in Progressパターン](https://qiita.com/numa08/items/b676e38e3dbabfd39d18)

## プルリク レビュー側

[レビュワーの機能について詳しい](https://bake0937.hatenablog.com/entry/2019/10/24/145241)

---

## issue

issue直訳すると、〔議論すべき〕重要な話題［問題］、問題点、論点、争点、〔問題の〕核心、急所などの意味になる。

[issue](https://note.com/koushikagawa/n/n500e2f4d4019)
[issue開発の進め方](https://qiita.com/tkmd35/items/9612c03dc60b1c516969)


---

## トピックブランチ

トピックブランチとは機能追加やバグ修正といったある**課題に関する作業を行うために作成するブランチ**
複数の課題に関する作業を同時に行う時は、その数だけトピックブランチが作成される。
トピックブランチは安定した統合ブランチから分岐する形で作成し、作業が完了したら統合ブランチに取り込む

## HEADとは

今自分が作業している場所を示すポインター
HEADはGitで**現在のスナップショットを参照するため**に使用される。

## detached HEADとは

HEADがBranchを指していない状態のこと

## checkout

git checkoutは、ファイル・コミット・ブランチの3つの異なるエンティティに対して実行される。

## .gitattributes ファイルとは

[参考 URL](https://qiita.com/nacam403/items/23511637335fc221bba2)

Gitで管理するファイルの改行コードの扱いをルール化する必要がある。

- example

  > そもそもなぜルールが必要なのでしょうか。以下の例で考えます。A さんは Linux マシンでコーディングしており、LF で改行されたソースコードのファイル X を Git にコミットしました。一方、B さんは Windows マシンでコーディングしています。今、A さんが書いたコードを編集したいとします。Git からファイル X をチェックアウトして編集するわけですが、このとき、B さんが使っているエディタはファイル X の改行コードを CRLF に変換してしまいました。B さんはそれに気づかずコードを編集し、保存し、コミットしました。B さんはファイル X の中の数行だけを編集したつもりなのに、改行コードが変わったために、全行に差分が生じてしまいました。これではコードレビューもしにくいし、後日、git blame コマンドを使っても望む結果は得られないでしょう。このようなケースを考えると、「改行コードは各自適当でオッケー」とはいかないでしょう。

- .gitattributesを使ってGitリポジトリ毎にルールを定める

  > gitattributes という名前のテキストファイルを作り、そこに text 属性に関する設定を書いてコミットすればその Git リポジトリを使う人全員で改行コードの扱いを統一できる。

- .gitattributesを導入する際の指針
  ファイルの拡張子に応じて変換するかどうかを定め、一部の拡張子についてはCRLF
  かLFかも固定するといった使い方が基本のよう。

> Git にコミットするときにはいずれにせよ LF に統一します
> このことから、原則として Git では LF で管理することを良しとしているのかなとも考えられます。ネット上でよく「基本、LF が良いらしい」といった記事を目にしますが、その根拠の一つがこれかもしれません。


## Gist

GitHubが提供するファイル管理サービス
GitHubはプロジェクト（ディレクトリ）を管理するものだが、Gistは**ファイル単体を管理**する。

## Cacher(キャッシャー)

旧サービス名GistBox。コードスニペット管理ツールです。
100以上の言語をサポートし、Gistとの連携、チーム共有などの機能があります。
メーラーのようなUIやラベル、言語別での管理、検索ができます。
Webアプリケーションの他にデスクトップアプリがあります。


## git push error

---
## GitHub pagesとは

[github page作り方](https://techacademy.jp/magazine/6445)

GitHub PagesはGitHubが提供する静的なウェブページをホスティングするサービスで、ウェブページをインターネット上に公開することができる。
※DBを用いるような動的なウェブページは公開できない。
※プライベートリポジトリであっても、GitHub Pagesはインターネット上で公開されるため注意が必要。

- 公開手順
下記の流れでWebページを公開していく。

GitHub Pages用のリポジトリの作成、ウェブページの作成GitHubへプッシュ、GitHub Pagesへアクセスして確認

- GitHub Pages種類
GitHub Pagesには大きく分けて2つの種類がある。ユーザのウェブページを公開するユーザサイト（User site）とプロジェクトのウェブページを公開するプロジェクトサイト。


### ユーザサイト用リポジトリの作成

- 上記URL参照する。

### プロジェクトサイト用リポジトリの作成

- 上記URL参照する。

1. 特定のプロジェクトで専用のブランチを切る
`$ git ch -b gh-pages`

2. gitbook buildで静的ファイルを出力する。

3. _book内のファイルをすべて**ルートディレクトリ**にコピーする。
ディレクトリ構成は以下の通り
```sh
$ tree
.
├── architecture
│   ├── directory.html
│   └── index.html
├── docs
│   ├── README.md
│   ├── SUMMARY.md
│   ├── _book
│   │   ├── architecture
│   │   │   ├── directory.html
│   │   │   └── index.html
│   │   ├── gitbook
│   │   │   ├── fonts
│   │   │   │   └── fontawesome
│   │   │   │       ├── FontAwesome.otf
│   │   │   │       ├── fontawesome-webfont.eot
│   │   │   │       ├── fontawesome-webfont.svg
│   │   │   │       ├── fontawesome-webfont.ttf
│   │   │   │       ├── fontawesome-webfont.woff
│   │   │   │       └── fontawesome-webfont.woff2
│   │   │   ├── gitbook-plugin-fontsettings
│   │   │   │   ├── fontsettings.js
│   │   │   │   └── website.css
│   │   │   ├── gitbook-plugin-highlight
│   │   │   │   ├── ebook.css
│   │   │   │   └── website.css
│   │   │   ├── gitbook-plugin-lunr
│   │   │   │   ├── lunr.min.js
│   │   │   │   └── search-lunr.js
│   │   │   ├── gitbook-plugin-search
│   │   │   │   ├── lunr.min.js
│   │   │   │   ├── search-engine.js
│   │   │   │   ├── search.css
│   │   │   │   └── search.js
│   │   │   ├── gitbook-plugin-sharing
│   │   │   │   └── buttons.js
│   │   │   ├── gitbook.js
│   │   │   ├── images
│   │   │   │   ├── apple-touch-icon-precomposed-152.png
│   │   │   │   └── favicon.ico
│   │   │   ├── style.css
│   │   │   └── theme.js
│   │   ├── index.html
│   │   └── search_index.json
│   └── architecture
│       ├── README.md
│       └── directory.md
├── gitbook
│   ├── fonts
│   │   └── fontawesome
│   │       ├── FontAwesome.otf
│   │       ├── fontawesome-webfont.eot
│   │       ├── fontawesome-webfont.svg
│   │       ├── fontawesome-webfont.ttf
│   │       ├── fontawesome-webfont.woff
│   │       └── fontawesome-webfont.woff2
│   ├── gitbook-plugin-fontsettings
│   │   ├── fontsettings.js
│   │   └── website.css
│   ├── gitbook-plugin-highlight
│   │   ├── ebook.css
│   │   └── website.css
│   ├── gitbook-plugin-lunr
│   │   ├── lunr.min.js
│   │   └── search-lunr.js
│   ├── gitbook-plugin-search
│   │   ├── lunr.min.js
│   │   ├── search-engine.js
│   │   ├── search.css
│   │   └── search.js
│   ├── gitbook-plugin-sharing
│   │   └── buttons.js
│   ├── gitbook.js
│   ├── images
│   │   ├── apple-touch-icon-precomposed-152.png
│   │   └── favicon.ico
│   ├── style.css
│   └── theme.js
├── index.html
└── search_index.json

```

4. git addとcommitを実行しpushする

※プルリクは自動で作成されなかった。認識してくれてた。

5. リポジトリのAboutでURLを編集

example
https://naohito-T.github.io/e2e-test-cypressで見れる。

---

## git tag

Gitのタグには**軽量版と通釈付き版の二通り**がある
軽量版のタグは変更のないブランチのようなもの。特定のコミットに対する単なるポインターでしかありません。
注釈付きのタグはGitデータベース内に完全なオブジェクトとして格納される。チェックサムが付き、タグを作成した人の名前・メールアドレス・作成日時・タグ付け時のメッセージなども含まれる。
>また、署名をつけて GNU Privacy Guard (GPG) で検証することもできます。 一般的には、これらの情報を含められる注釈付きのタグを使うことをおすすめします。



軽量版のtag
`$ git tag [tag name]`

注釈版のtag
`$ git tag -a v1.4 -m "my version 1.4"`


## gitignore

.gitignoreはgit add実行時に新規ステージングしないためのファイル
→これが仕様のためすでに追跡が開始しているファイルは`.gitignore`に追記しただけでは反映されない。
実際のファイルを削除しないように注意!!!!

```sh
# 追跡を除外、ファイルを削除
$ git rm <FILE_NAME>


# 実際のファイルは残して、追跡だけ除外
$ git rm --cached <FILE_NAME>
```

## git 意味がわからない集

現象

topic branchで作業をしており、masterが先に進んでいたのをpullでtopicへmerge。
もちろんコンフリクトが起こることは想定内だが、そこで以下が起きた。

```sh
$ git br
* (no branch, rebasing feature/react-navigation_setup)
# なぜか以下で解消ができた。
$ git rebase --abort
```

## GitHub startを増やす

[参考URL](https://zenn.dev/hand_dot/articles/542449fe4fc771)

## Semantic Pull Request

[参考URL](https://qiita.com/kaitaku/items/97699d579e93873a7380)

## Git 構造

gitのローカルリポジトリは2種類ある。
masterとorigin/master
fetchはローカルのorigin/masterを更新する。
masterリポジトリはcommitした際に更新される。
そのためgit fetch後はgit merge origin/[fetchしたリポジトリname]となる。

## Git Hooks

gitには**コミット時やプッシュ時に特定のコマンドを自動実行**するGit Hooksという仕組みがある。
`./git/hooks/`配下に各フック用のスクリプトをおくことで実行される。
**しかし、基本的には/.git/配下はGit管理対象にいれられないため、リポジトリ単位で管理したり他の開発者と共用するのがやや難しい。**

## Lefthook

[参考URL](https://zenn.dev/questbeat/scraps/35595a0aeb397a)

LefthookはGit Hooksマネージャーのひとつ
※同様のアプローチでもっとも有名なもののひとつとして**NPMのHusky**がある

**メリット**
HuskyはNode.js実装のみだが、LefthookはNode.js, Ruby実装のほかGoやBrew経由でもインストールができる。
そのため**フロントエンド系の開発以外でも導入しやすい**

**Huskyとの比較**
Husky(+lint-staged)と比較するとそれが依存しているライブラリもあるため、単一ライブラリのLefthookのほうが良いだろ？との主張がある。

**設定一覧**
以下は`.git`ディレクトリがあるところに`lefthook.yml`が作成される
`$ lefthook install`

Git Hooks追加（.git/hooksの中に作成される）
`$ lefthook add pre-push`

あとはlefthooks.ymlを編集すればOK

## git submoduleとは

メリット
ソース管理しているプロジェクトから別のプロジェクトのソースを利用したいなという時に利用する。
例
アプリケーションの開発の時、ログ出力など複数のアプリケーションに共通して実装する部分を切り出しして別のプロジェクトとして管理し、アプリケーションのプロジェクトではsubmoduleとして呼び出すようにしたりとか。

## サブモジュール化

rootディレクトリは`git init`を初期に行っている状態。サブディレクトリは作成されている状態。

git initされている状態であれば
apiディレクトリ（もともとはmasterとなっていた）
`$ git br -m develop`

「api」リポジトリがコミットされると、当然コミットIDも変化します。

その場合、「root」リポジトリもコミットする必要があります。

今後のコミット手順
Railsアプリを編集した
apiディレクトリに移動してコミットする
rootディレクトリに戻る
rootリポジトリもコミットする

`$ git init`
`$ git br -m develop`
`$ git add .`
`$ gc`

ここからGitHub上でサブモジュール用のプロジェクトのリポジトリを作成する。

`$ git remote -vv` 設定されていない
`$ git remote add origin [new repository ssh url]`
`$ git push -u `

ルートディレクトリに戻りサブモジュール追加をする
`$ git submodule add git@github.com:naohito-T/Neams-ui.git neams-ui`

.gitmodulesファイルが作成されている
[submodule "neams-ui"]
	path = neams-ui
	url = git@github.com:naohito-T/Neams-ui.git


サブモジュールに追加されているか確認する（ディレクトリ名のみの情報であればOK）
`$ git ls-files`

エラー時

- gitmodules
- git/config内と
- git/modules/内のディレクトリ名を変更すればいける

---

## Tips

[Githubで一番有名なGit TIPS集](https://qiita.com/rana_kualu/items/4d5e27244256e9689304)

ローカルの変更をすて、リモートリポジトリと同期する
`$ git fetch origin && git reset --hard origin/master && git clean -f -d`

コンフリクトしたファイルだけを表示する
`$ git diff --name-only --diff-filter=U`

すでにmasterにマージされているブランチを一括削除する

## GitHubのレポジトリをアーカイブする

レポジトリをアーカイブすることで、新しいPRs/issues/commentsを作成できなくなる。
削除するのも手ですが、レポジトリへのリンクが記事などで使われている場合があり、404ではなく次のレポジトリへと導線として残すのは良い手段だと思います。

## git commit のハッシュ値

切ったところからのハッシェ値が計算されるため

develop → feautre1
main → feature2

## GitHubのCLI

[CLI(2020リリース)](https://dev.classmethod.jp/articles/shuntaka9576-gh/)

---

## git 各コマンド

## git clean

git cleanは追跡していないファイルを一気に削除する。追跡していないファイルとは新規作成ファイルも含めたまだ一度もaddしていないファイル
この追跡されていないファイルは**git reset --hard**を仕様しても消えないため注意が必要

```sh
# どのファイルが消えるか確認する
$ git clean -n

# ファイルを消す
$ git clean -f
```

## git stash

`git stash save`がdeprecatedだった。
これかはこちらに移行する`git stash push`

git stashよりもgit branchで一時的ブランチを作った方がいいといっている記事
[参考URL](https://qiita.com/jkr_2255/items/ea3e50a99baca37a42de)


## revert


## git add -A

**すべての変更**をaddする
`git add .` + `git add -u` の合体技

```sh
# 新規作成ファイルと変更ファイルをaddする
$ git add .

# 変更部分のみadd 新規ファイルはaddされない
$ git add -u
```

## git revert

git resetは履歴を削除したが、**git revertは履歴を戻すようなコミットを新たに作成する**
git cherry-pickとgit revertに関しては**コミットまで自動的にやってしまうため注意が必要**
また、GitHub上では履歴を戻すようなコミットをやっているため、新しいプルリクを立てても差分は表示されない

```sh
# -n オプションでコミットされない状態をつけることができる(addされた状態)
$ git revert HEAD -n
```

## git resetとrevertの違い

[参考URL](https://gist.github.com/satoshin2071/4b9a66e0a7ec18a6fa21)

## rev-parse

Gitを使っているとプログラムからGitのメタ情報を取りたい！ってこと、よくありますよね？
でも、 git statusをgrepしたりしていませんか？？
git rev-parseから取れる情報もたくさんあるんですよ！

[revParse](https://qiita.com/karupanerura/items/721962bb7da3e34187e1)

## blame

誰の修正なのか見つけたい。そんな時に使える

[参考URL](https://qiita.com/annin_jp/items/44960964ecbac77fe19a)

---

ここからはGitHubについて

## GitHubショートカット

[リファレンス](https://docs.github.com/ja/get-started/using-github/keyboard-shortcuts)

**基本 G + なにかという感じ**

便利そう

G + N : Gが最初GitHub通知にいく

## GitHub Top Page READMEをおしゃれにする

[README](https://kakakakakku.hatenablog.com/entry/2018/08/08/200903)
[きらきらgit](https://zenn.dev/yutakatay/articles/kirakira-github-profile)

## GitHubでのライセンスについて

[GitHubで公開したソースにオープンソースライセンスを適用](https://qiita.com/legitwhiz/items/bb34ef20ba23336e0c87)
[GitHub ライセンスをつけないとどうなるの](https://qiita.com/Tatamo/items/ae7bf4878abcf0584291)