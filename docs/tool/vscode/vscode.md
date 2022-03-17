# vscode

## tips

[参考URL](https://coliss.com/articles/build-websites/operation/work/removebg-for-vscode.html)

vscodeで画像から背景を1クリックで切り抜けるようになった。

## どんなエディタでもEditorConfigを使ってコードの統一性を高める

[参考URL](https://qiita.com/naru0504/items/82f09881abaf3f4dc171)

- ソフトタグ
ソフトタブはタブが半角スペース
- ハードタブ
ハードタブはタブがタブ

>私の周りで何が起きたかというと。
>PhpStorm派
>Vim信者
>Atom使いたい派
>なぜかときどきSublimeText使う派

そこでEditorConfigがあれば統一できる

## モノレポの運用

複数のルートディレクトリがある場合のvscodeディレクトリの優先度

[参考URL](https://ichi.pro/maruchiru-towa-kusupe-su-to-kakucho-kino-o-shiyoshita-mono-repo-kaihatsu-no-tame-no-visualstudiocode-no-hinto-118099824004370)

```sh
.vscode
└── settings.json # これがデフォルトできく
└── root ディレクトリ
      .vscode # 対象ディレクトリにこれがあればこれが上書きされてきく
      └── settings.json
```