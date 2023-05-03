# DI(Dependency Injection)
[Typescript（これわかりやすい）](https://zenn.dev/chida/articles/1f7df8f2beb6b6)

DI（Dependency Injection）とは、日本語訳で依存性の注入です。依存性の注入と聞くと、依存性という抽象的な概念を何かに注入するような印象を与えますが、依存性という言葉自体は依存対象を表します。  

DIにおける依存対象は、オブジェクトのインスタンスです。つまり、Dependencyはオブジェクトのインスタンスを指します。そして、Injectionは外部から挿入するという意味を持つため、DIはオブジェクトのインスタンスを外部から挿入するという事になります。

## DIが動作する前提
[関数型プログラミングとDIコンテナーの相性が悪い理由](https://mond.how/topics/2lwly60o0vgkvvg/0eeqkccgew0dyd0)

DIコンテナー自体がそもそも**オブジェクト指向プログラミング**言語を前提としている。

## DIで実現したいこと

クラス間の依存性を下げる。
 
## 注入するタイミング

DIコンテナーファイルとしてクラスの対応リストを保持しておく  
事前に依存するオブジェクトを登録しておいて使う時になったらDIコンテナー経由でオブジェクトを取得する。  
※この設定はスタートアップスクリプトなどに登録しておくようにする。

## Decoratorとは
[参考URL](https://info.drobe.co.jp/blog/engineering/typescript-decorator)






