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

## tasks.json

[参考URL](https://maku.blog/p/zn2er4g/)

VSCodeのビルドタスク設定(tasks.json)をしておくと、Cmd + Shift + Bで任意のビルドタスクを実行できるようになる。

メリット
VSCodeで作成したコードを実行するときに毎回ターミナルから`node main`や`npm start`とか入力するのは面倒
VSCodeのビルドタスクを設定すると、こういったコマンドをCmd + Shift + Bとおいうショートカット一発で実行できる

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "npm: start",  // コマンドパレットに表示される名前
      "detail": "node main",  // その下に表示される説明文
      "type": "npm",          // npm によるタスク実行
      "script": "start",      // 実行する npm スクリプト名
      "group": {
        "kind": "build",      // ビルドタスクとして認識させる
        "isDefault": true     // Cmd + Shift + B で即実行
      },
      "problemMatcher": []
    }
  ]
}
```

## launch.json

[参考URL](https://amateur-engineer-blog.com/vscode-launchjson/)

VSCodeでデバッグ実行するための設定ファイル
どの言語でどのファイルを実行するかなどを設定する。

**事前定義された変数**を利用できる

```sh
${file} # 現在開いているファイルのパス
${fileBasename} # 現在開いているファイル名
${workspaceFolder} # VSCodeで開いているフォルダのパス
${workspaceFolderBasename} # VSCodeで開いているフォルダ名
${cwd} # 現在の作業ディレクトリ
```

## ショートカットキーの設定画面を開く

Cmd + K → Cmd + S で開く


## Vscodeが持つデバッグ機能

VSCodeが**組み込み**でサポートしているのはJSアプリ(Node.jsランタイム)のデバッグ機能
→JS/TS/Node

VSCode自体が**Electron**を用いて作られているのを考えると当然
※他の言語で記述したアプリのデバッグを行うにはそのための拡張機能が必用

## マルチルートワークスペース

[参考URL](https://ichi.pro/maruchiru-towa-kusupe-su-to-kakucho-kino-o-shiyoshita-mono-repo-kaihatsu-no-tame-no-visualstudiocode-no-hinto-118099824004370)

## language Server Protocol : 言語サーバプロトコル LSP

プログラミング言語の開発環境は目まぐるしく進化しています。近年登場した language server protocol (LSP) という枠組みは中でも特に強力であり、Vim や Emacs、 Visual Studio Code (VSCode) といった著名なテキストエディタで広く使われるようになった。


[language server protocolについて (前編)](https://qiita.com/atsushieno/items/ce31df9bd88e98eec5c4)

language ServerとはID#が必要とするプログラムのプロジェクトソースを解析して情報を提供する機能をサービスとして実現するもの
**プログラミング言語のサポートを、特定のエディターやIDEとは無関係に実装および配布できるようにすること**

**特徴**
LSP の特徴は、テキスト補完などの**開発支援機能**をサーバとクライアント（エディタ）の2つに分け、特定のプロトコルで互いにやり取りするという方式にある。
従来は**各々のテキストエディタが言語ごとにそれぞれプラグインや拡張機能を開発する必要があったが、** 
LSP の登場により**言語固有の機能はサーバ側**で、**テキストエディタ側の機能はクライアント側**で各々開発すれば良くなった。
その結果、開発にかかる手間が大幅に減少しただけでなく、マイナーな言語や新興テキストエディタでもリッチな開発体験を気軽に提供できるようになった。

