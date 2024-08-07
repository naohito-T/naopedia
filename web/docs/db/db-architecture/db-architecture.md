# DB Architecture

## Overview

DBの設計についてまとめる

## 重要なこと

テーブル設計の際に重要となるのは以下の項目

- 集合
- 関数
  - テーブルは入力値と出力値の対応表

## テーブル設計

リレーショナルデータベースにおけるテーブルは共通的な要素の集合  
ルールを表現するために「テーブル名は必ず複数形や集合名詞で表現できる」  
そうした基本ルールに則るため、まずは「もっとも上位の概念集合」にまとめること。

## 設計技法

正規形

### サポートツール

ER図  
かつてリレーショナルデータベースのテーブル設計をプログラムで自動化しようとする取り組みがあり、そのような自動化つーるをCASEツールと呼ぶ

## 主キーの管理が少し甘くても良いケース

テーブル設計では「データが『静的』ではなく『動的』であることを前提に考えるべき」と解説しましたが、裏を返すと、完全に静的なデータ、つまりデータ登録後、一切変更の入らないタイプのデータであれば主キーの管理は少し甘くてもいいということ。  
こういうタイプのデータの具体例としては、「履歴データ」があります。  
さまざまな取引や病歴に給与明細など、過去起きた事実を記録したデータは（間違いの修正がない限り）もう変わることはありません。  
こうしたデータを分析に利用するシステム（BIやDWHと呼ばれます）では、比較的データ管理が緩くても許される傾向があり、正規化もそれほど厳密に実施しないことがある。
