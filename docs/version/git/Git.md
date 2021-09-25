# Git


Flow
[GitHub Flowわかりやすい](https://cloudsmith.co.jp/blog/efficient/2020/08/1534208.html)
## プルリク

[チーム開発におけるプルリクの作法](https://qiita.com/ikuwow/items/fb52a54c086398eb5b92)

・十分小さくプルリクを作成する

・

## プルリク レビュー側

[レビュワーの機能について詳しい](https://bake0937.hatenablog.com/entry/2019/10/24/145241)

## トピックブランチ

トピックブランチとは機能追加やバグ修正といったある課題に関する作業を行うために作成するブランチ
複数の課題に関する作業を同時に行う時は、その数だけトピックブランチが作成される。
トピックブランチは安定した統合ブランチから分岐する形で作成し l、作業が完了したら統合ブランチに取り込む

## HEADとは

今自分が作業している場所を示すポインタ

## detached HEADとは

HEADがBranchを指していない状態のこと

## .gitattributes ファイルとは

[参考 URL](https://qiita.com/nacam403/items/23511637335fc221bba2)

Git で管理するファイルの改行コードの扱いをルール化する必要がある。

- example

  > そもそもなぜルールが必要なのでしょうか。以下の例で考えます。A さんは Linux マシンでコーディングしており、LF で改行されたソースコードのファイル X を Git にコミットしました。一方、B さんは Windows マシンでコーディングしています。今、A さんが書いたコードを編集したいとします。Git からファイル X をチェックアウトして編集するわけですが、このとき、B さんが使っているエディタはファイル X の改行コードを CRLF に変換してしまいました。B さんはそれに気づかずコードを編集し、保存し、コミットしました。B さんはファイル X の中の数行だけを編集したつもりなのに、改行コードが変わったために、全行に差分が生じてしまいました。これではコードレビューもしにくいし、後日、git blame コマンドを使っても望む結果は得られないでしょう。このようなケースを考えると、「改行コードは各自適当でオッケー」とはいかないでしょう。

- .gitattributes を使って Git リポジトリ毎にルールを定める

  > gitattributes という名前のテキストファイルを作り、そこに text 属性に関する設定を書いてコミットすればその Git リポジトリを使う人全員で改行コードの扱いを統一できる。

- .gitattributes を導入する際の指針
  ファイルの拡張子に応じて変換するかどうかを定め、一部の拡張子については CRLF
  か LF かも固定するといった使い方が基本のよう。

> Git にコミットするときにはいずれにせよ LF に統一します
> このことから、原則として Git では LF で管理することを良しとしているのかなとも考えられます。ネット上でよく「基本、LF が良いらしい」といった記事を目にしますが、その根拠の一つがこれかもしれません。


## Gist

GitHubが提供するファイル管理サービス
GitHubはプロジェクト(ディレクトリ)を管理するものだが、Gistはファイル単体を管理する。

## Cacher
旧サービス名GistBox。コードスニペット管理ツールです。
100以上の言語をサポートし、Gistとの連携、チーム共有などの機能があります。
メーラーのようなUIやラベル、言語別での管理、検索ができます。
Webアプリケーションの他にデスクトップアプリがあります。


## git push error

---
## github pagesとは

[github page作り方](https://techacademy.jp/magazine/6445)

GitHub PagesはGitHubが提供する静的なウェブページをホスティングするサービスで、ウェブページをインターネット上に公開することができる。
※DBを用いるような動的なウェブページは公開できない。
※プライベートリポジトリであっても、GitHub Pagesはインターネット上で公開されるため注意が必要。

- 公開手順
下記の流れでWebページを公開していく。

GitHub Pages用のリポジトリの作成
ウェブページの作成
GitHubへプッシュ
GitHub Pagesへアクセスして確認

- Github Pages種類
GitHub Pagesには大きく分けて2つの種類がある。ユーザのウェブページを公開するユーザサイト(User site)とプロジェクトのウェブページを公開するプロジェクトサイト。


### ユーザサイト用リポジトリの作成

- 上記URL参照する。

### プロジェクトサイト用リポジトリの作成

- 上記URL参照する。

1. 特定のプロジェクトで専用のブランチを切る
`$ git ch -b gh-pages`

2. gitbook buildで静的ファイルを出力する。

3. _book内のファイルを全て親に**ルートディレクトリ**にコピーする。
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

4. git add と commit を実行しpushする

※プルリクは自動で作成されなかった。認識してくれてた。

5. リポジトリのAboutでURLを編集

example
https://naohito-T.github.io/e2e-test-cypress
で見れる。

---

## git tag

Gitのタグには軽量版と通釈付き版の二通りがある
軽量版のタグは変更のないブランチのようなもの。特定のコミットに対する単なるポインタでしかありません。
注釈付きのタグはGitデータベース内に完全なオブジェクトとして格納される。チェックサムが付き、タグを作成した人の名前・メールアドレス・作成日時・タグ付け時のメッセージなども含まれる。
>また、署名をつけて GNU Privacy Guard (GPG) で検証することもできます。 一般的には、これらの情報を含められる注釈付きのタグを使うことをおすすめします。



軽量版のtag
`$ git tag [tag name]`

注釈版のtag
`$ git tag -a v1.4 -m "my version 1.4"`


## gitignore

.gitignoreはgit add実行時に新規ステージングしないためのファイル
→これが仕様のためすでに追跡が開始しているファイルは.gitignoreに追記しただけでは反映されない。
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
