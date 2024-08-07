# WebGL

## 対応

iOS8において、WebGLが動作するようになった。

## WebGL使用方法

Webゲームだけなんじゃないの？
不動産の内覧や
ソーシャルメディアに
CADでも使われる(すべてブラウザで完結できる。)

つまりすべてブラウザで完結できるためお客様にアプリを入れてもらわなくてもブラウザのURLを渡すだけで完結できる

## WebGLの今

WebGL1.0であればほぼどんなデバイスでもOK
WebGL2.0はまだまだこれから
ゲーム業界以外での利用も見られるようになってきた
Apple Watchでも使用されている。

## 今活かすための問題

**パフォーマンスの懸念**

- 実装する前にそのWebGLの利用は必要?
  - 当然ネイティブで実装されているタグの方が早い
  - Webで開けることに価値がある？
  - 既存のHTML/CSSではできない？
  - そもそもその表現に意味がある？

---
**何が重いのか**

**以下２つは混同してはいけない**

- ページの読み込み速度が思い
  - 表示まで何秒かけられる？(作るWebアプリによってかけられる秒数が違うのは当たり前だよね。)
  - プログレスバーとかでごまかせない？
- 操作やフレームがカクついて重い
  - 1秒に何フレームほしい？
    - フレームレートによってモバイルのバッテリーの持ちが変わる。そのためモバイルとして表示するときはフレームレートを下げて上げることもいい心構え。
  - 余計な呼び出しはない？(Spector.jsなどで調べる)
  - HTMLタグ/CSSの併用も考える

## 読み込み速度

何が重いのか？

- やっぱり一番重いのは**モデル(3Dモデルのこと)**
  - モデルを使わないという選択肢も大事
  - コンテンツごとに異なりうる(キャッシュの効果が低そう)

つまり、適切なモデルファイルを採用しなければ無駄なデータが多い。

モデルファイルは何を使っている?

- FBX?
- COLLADA?
- glTF?

---
**そもそもモデルデータとは？**

色々なものがある

- 頂点座標・法線・テクスチャ座標など各点ごとに記録した頂点座標
- どの頂点同士をつないで面を作るかのインデックス情報
- どのシェーダー,どのパラメータで行がするかのマテリアル情報
- ボーンの情報(人の形をしたモデルの場合)

  場合によっては以下も含みうる
  - 物理演算の語彙歌い情報
  - 編集時に必要なデータ
  - アニメーションデータ
  - CADなどはより細かい特性のデータ

## WebGLに役立つ数学

[WebGL開発に役立つ重要な三角関数の数式・概念まとめ](https://ics.media/entry/10657/)

3Dコンテンツの制作において**三角関数は必須**という。
WebGLの勉強をすすめるうちに3Dでは三角関数を使う場面がとても多い。
三角関数はゲームやデータビジュアライゼーションを作る上で基本となってくる。
