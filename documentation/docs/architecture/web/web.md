# Webとは

Webは世界規模のハイパーメディアであり、分散システム
Webはもっとも成功したシステム。Webの設計思想であるRESTを知ることが肝心

## 3層クライアントと2層クライアントの違い
[参考](https://itmanabi.com/3-layer-2-layer/)

## 3層クライアントに分ける理由
[セキュリティなどかなり詳しい](https://ja.stackoverflow.com/questions/18417/web%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%A8ap%E3%82%B5%E3%83%BC%E3%83%90%E3%81%AE%E5%88%86%E9%9B%A2%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)  
[なぜAPサーバーをWebサーバーとして利用しないのか](https://qiita.com/yCroma/items/e46476e2ac7c372bb2a3)


## フルスタック

[フルスタック開発者のためのBallerina: バックエンドAPI開発ガイド](https://www.infoq.com/jp/articles/ballerina-fullstack-rest-api/?itm_source=infoq&itm_medium=related_content_link&itm_campaign=relatedContent_news_clk)

もっとも単純な形式のwebアプリは、**3つの層**で構成されている。

1. クライアント再度（フロントエンド）
2. サーバサイド（バックエンド）
3. 永続化層（データベース）

## webアプリケーションでのログ

webアプリケーションでのログ要件も変化している
実用goのlog部分に歴史が書いてある。

---

## カテゴリとタグの違い

[参考URL](https://webst8.com/blog/wordpress-category-tag/)

WordPressを例に挙げると

### カテゴリー

カテゴリーはフォルダー
階層構造を持つことができる。

### タグ

タグは札
札というイメージのため階層構造を持つことはできない。
※一般的に重要度が小さいタグについては`noindex`設定（Googleに登録をしない設定）をしているサイトが多い。

## パンくずリスト

昨今ではいるのか？

[参考URL](https://www.asobou.co.jp/blog/web/breadcrumb-list)


## 画像をダウンロードさせないようにする必要はあるのか

付け焼き刃だが複数ある
- 画像をドラッグさせない
- 右クリックを禁止

URL対策はまた別にある。