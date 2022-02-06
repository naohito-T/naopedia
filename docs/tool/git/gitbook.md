## gitbookについて

[参考URL:個人のリファレンスかな？](https://akirat1993.github.io/MathPC/md/gitbook.html)

GitBook は、Markdown形式で作成した文章を HTML形式、PDF形式、ePub形式などの電子ブックを簡単に作ることができる。
GitBook は、クラウドサービスですが、
gitbook-cli を利用して、スタンドアロンで生成する環境を構築できます。

## gitbookインストール

グローバルにgitbook-cliをインストールする

```bash
$npm install -g gitbook-cli

インストール後、version確認
$ gitbook --version
CLI version: 2.3.2
GitBook version: 3.2.3

インストール後gitinit
$gitbook init
README.md(本文) と SUMMARY.md(目次)が作成される

$gitbook build

```

- gitbook 各種プラグイン

同階層にbook.jsonを作成し、使用するプラグインを記述する。

```json
{
  "plugins": [
    "-sharing", // SNSメニューの非表示
    "hide-published-with", // Published with Gitbookの非表示
    "numbered-headings-for-web-and-books", //自動ヘッダー番号付け
    "mermaid-gb3" // mermaid.js(フローチャートやシーケンス図)
  ]
}
```

book.json記述後、以下コマンドを実行しプラグインをインストールする。

```$ gitbook install```

## README 作成手順

[参考URL](https://zenn.dev/mebiusbox/articles/703e934c78fa20)
