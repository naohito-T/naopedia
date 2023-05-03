# REST API

REST APIについて

## 有名REST API
[REST API設計者のための有名APIのURL例](https://zenn.dev/yu1ro/articles/4c73274383b676)

## 概要

>RESTはRepresentational State Transferという用語の略で、2000年にロイ・フィールディング（Roy Fielding）の博士論文で初めて紹介されました。ロイ・フィールディングは、HTTPの主な著者の一人で、Web（HTTP）の設計の優秀さに比べて適切に使用されていない様子を残念に思い、Webの利点を最大限に活用できるアーキテクチャとしてRESTを発表したそうです。

## 構成

REST APIは次のように構成されている。

- 資源（RESOURCE）URI
- 行為（Verb）HTTPメソッド
- 表現（Representations）

## 設計ガイド

REST API設計時、もっとも重要な項目は、次の2つに要約できる。

1. URIは情報の資源を表現しなければならない。
2. 資源の行為は、HTTPメソッド（GET、POST、PUT、DELETE）で表現する。

## REST APIでよく使用される単語について

コレクションが、そのURLの対する全体`/users`  
リソースがそのURLの詳細`users/:id`


コレクション
RESTfulなルーティングにおいてリソースのコレクションに対してルーティングを定義するために使われます。  
コレクションに対するルーティングは、モデル全体に適用されるアクションに対して定義することができる。  
>例 :indexアクションはコレクションに適用されるアクションであり、:showアクションはリソースに適用されるアクションです。:collectionオプションを使用すると、コントローラーで定義されたアクションに対して、URLに:idを含めないでアクセスすることができます。





