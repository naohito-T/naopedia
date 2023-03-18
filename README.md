# naopedia

## What is naopedia

個人で学習するときにExcelやスプレッドシートでまとめて手順書を作成したりなどをしており、分散されているのが気になっていた。  
book形式でまとめる方が良いと思い、プログラマーとしての知見、経験を踏まえて作成していく。

## 本作成について

thank you!  
[honkit](https://github.com/honkit/honkit)  
[Gitbook Summary](https://www.npmjs.com/package/gitbook-summary)  
[GitBook によるドキュメント作成](http://mebiusbox.github.io/contents/gitbook/)

## 文章の校正について

thank you!  
[テキスト校正くん](https://ics.media/entry/18859/)

## 脚注書き方(Footnotes)

以下のように[^1]のような書き方をすることで簡単に脚注をつけることができる。

ここに脚注がはいる[^1]

[^1]: これは脚注

## 改行

1行空けるor文末に半角スペース2ついれる。

## 導入プラグインについて

- gitbook-plugin-advanced-emoji
    絵文字を表示する。絵文字で装飾しないので最近使ってないかも。
- gitbook-plugin-anchors
    アンカーの自動生成
- gitbook-plugin-back-to-top-button
    トップへ戻るボタンを設置。授業で便利。
- gitbook-plugin-copy-code-button
    参加者がソースコードをミスなく全文コピーができるが実現できるコピーボタン設置
- gitbook-plugin-hide-published-with
    デフォルトで表示されている`Published with Gitbook`を消す
- gitbook-plugin-intopic-toc
    ページ内の目次を作る（資料全体の目次ではなくページ内）

## 作中の画像について

Gyazoに配置しております。

## バージョニング
[repository](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)  
[参考URL](https://zenn.dev/mouse_484/articles/easy-changesets)

```sh
# 反映させる文章をスタックに保存
$ yarn c
# スタックからchangelogへ反映
$ yarn c:v
```