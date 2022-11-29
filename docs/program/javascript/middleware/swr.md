# SWR
[参考URL](https://dev.classmethod.jp/articles/getting-started-swr-with-nextjs/)
[SWRを使おうぜって話（導入についてわかりやすい）](https://zenn.dev/mast1ff/articles/5b48a87242f9f0)

データ取得専用のReact Hooksライブラリ（あくまでGETに使う）
※POSTなどにはオススメはしない。

Next.jsと同じチームによって作成されている、データ取得のためのReact Hooksライブラリ

## 仕組み

>“SWR” という名前は、 HTTP RFC 5861 で提唱された HTTP キャッシュ無効化戦略である stale-while-revalidate に由来しています。 SWR は、まずキャッシュからデータを返し（stale）、次にフェッチリクエストを送り（revalidate）、最後に最新のデータを持ってくるという戦略です。

この考え方の仕組みにより、データが高速に返却されさらに自動で再フェッチ（revalidate）されるようになっている。

## メリット

SWRのメリットは以下
- fetchを使用したクライアントサイドのデータ取得
- データ取得状態の管理
- エラー処理
- データキャッシュ

## useSWRが何をしているのか

関数が受け取るもの
- key: リクエストするユニークな文字列（通常URLを指定する）
- fetcher: （任意）第一引数に渡したURLを引数に取るfetch関数
- options: （任意）SWRのオプション

関数が返すもの
- data: fetcherによって取得したデータ
- error: fetcherによってthrowされたエラー
- isValidating: リクエストまたは再検証の読み込みがあるか否かのBool値
- mutate: キャッシュされたデータを更新する関数
を返却します。
このとき、dataの状態は
取得が完了していない場合はundefined
取得が完了した場合はその内容
となり、dataがundefinedか否かで読み込み中かどうかをUIに伝えることができます。