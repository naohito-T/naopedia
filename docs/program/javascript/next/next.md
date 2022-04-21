# Next

[NextJS リファレンス](https://nextjs.org/docs/api-reference/next/image)

## 歴史

## Reactとの違い

Reactへブラウザは受信したJSファイルを処理することでh1タグとその内容を描写していることがわかる

ブラウザ ページソースを確認すればわかる

Client Rendering
検証でソースコードを見ると、h1タグなどは出現しない。
JSをブラウザが処理している

Server-side Rendering
検証でソースコードを見ると、h1タグなどがある。
JSをNextがpre-Renderingをおこなっているため

## 仕組み

Next.jsでは、**ブラウザへ送信する前にpre-Rendering**をおこなっている。

## _document.jsによるカスタマイズ

Next.jsではindex.jsファイルにheadタグ、bodyタグ、編集できる