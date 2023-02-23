# env
[参考URL](https://gist.github.com/kenmori/ef48f09e9f1bfb30fe34cc11db0031d6)

## 環境変数とは

環境変数を提供する行為は**プロビジョニング**と呼ばれる。  
>私たちはサーバープロビジョニングを扱うときに動く2つの階層を持ちます インフラとアプリケーションです。 どちらもアプリケーション階層のロジックを通して環境変数をセットできます

OSは**プログラム実行の際にOSの環境変数をプロセスに渡す。**

---

## 昨今のフロントエンドのenv
[TypeScriptでenvを脱却する話](https://zenn.dev/mutex_inc/articles/quit-dotenv-file)

## dotenv

nodeで一番簡単にenvファイルを読み込む方法はdotenvを使う方法

- dotenvとは

開発環境のルートに環境変数を設定した`.env`ファイルを作成すると、process.env経由で参照してくれるパッケージ
もともとはRuby初のOSS

- process.envとは

process.envグローバル変数は実行時にアプリケーションによって使用されるようにNodeによって注入され起動時にアプリケーションが存在するシステム環境の状態を表す。

## cross-envとは

WindowsでNODE_ENV=productionのように環境変数を設定すると、コマンドプロンプトが停止してしまう。
cross-envはそういったプラットフォームの差異を吸収してくれるパッケージ

---


## direnv
[direnv設定(mac)](https://dev.classmethod.jp/articles/direnv/)
[direnv上手い使い方](https://eidera.com/blog/2018/12/28/direnv_alias/)

ディレクトリ毎に環境変数を定義して、そのディレクトリがカレントになった時だけ環境変数を有効/無効にしてくれるツール  
開発中のアプリ毎に環境変数を変えたい時に重宝する。  
ちなみに言語はGoで開発されている。  
`.envrc`は**bashで評価される。**

.zshrcなどに`eval "$(direnv hook zsh)"`と書くことで、カレントディレクトリに存在する`.envrc`へ書かれたスクリプトを実行してくれる

`direnv edit .`
するとカレントディレクトリに`.envrc`が作成され下記のように設定した環境変数が追加/削除される。

aws上にDockerを立ち上げている。docker-composeで

