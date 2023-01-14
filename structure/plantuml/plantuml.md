# 図について記す
[状況によって使い分ける構成図](https://qiita.com/e99h2121/items/eaca084ae7b0488ab686)

## 図作成ツールについて比較
[図の種類について記載がある。](https://qiita.com/ryamate/items/3779418172c4f5a83212)

- Draw.io
- PlantUML
- Mermaid

## plantUML完全ガイド
[参考URL](https://pdf.plantuml.net/PlantUML_Language_Reference_Guide_ja.pdf)

## PlantUML とは

以下のような図をテキストで素早く描くためのオープンソースプロジェクト。
PlantUMLは**DSL（ドメイン特化言語）**でUMLの図を描く

## VS Codeでの見方
ay
`Option + D`で見ることができる。

## PlantUML 必用なもの

PlantUMLの実行には、Javaの実行環境が必要。

[使い方ガイド](https://zenn.dev/wtkn25/articles/vscode-plantuml)
[使い方ガイド(基本の書き方)](https://zenn.dev/msksgm/articles/20211218-robustness-with-plantuml-vscode)

---

ここからは各図について説明する
※大事なのは全部を使うのが正解というわけではなく、そのプロジェクトに応じて使うものとのこと。

[各図についての参考](https://qiita.com/mumucochimu/items/e97a03217588f4101849)

## ステレオタイプ

クラス図などで、モデル要素の意味を拡張するもの。ギルメット<<>>によるラベル表記と、アイコン表記がある。

## UML(Unified modeling Language)

共有することの難しさを毎日感じてる場合、UML図を記載するとはかどる可能性がある
このような記法を統一したものをUMLという

シーケンス図 / Sequence diagram
ユースケース図 / Usecase diagram
クラス図 / Class diagram
アクティビティ図 / Activity diagram
コンポーネント図 / Component diagram
状態遷移図 / State diagram
オブジェクト図 / Object diagram

|    名前    |   説明  |
|    ---    |     --- |
| クラス図   |  クラスの定義、関連付けなどのクラス構造をあらわす  |
| オブジェクト図  | インスタンス(オブジェクト)の具体的な関係をあらわす   |
| パッケージ図   |  クラスなどがどのようにグループ分けされているかをあらわす   |
| コンポーネント図 |  処理を構成する複数のクラスを1つのコンポーネントとみなし、その内部構造と相互関係をあらわす |
| 複合構造図 | 複数クラスを内包するクラスやコンポーネントの内部構造をあらわす  |
| 配置図    | システムを構成する物理的な構造をあらわす  |
| ユースケース図 |  利用者や外部システムからの要求に対してシステムがどのような振る舞いをするかをあらわす   |
| アクティビティ図 | システム実行時における一連の処理の流れや状態遷移をあらわす。フローチャート    |
| 状態マシン図 |  イベントによって起こるオブジェクトの状態遷移をあらわす   |
| シーケンス図 |  オブジェクト間のやりとりを時系列にそってあらわす   |
| コミュニケーション図 | オブジェクト間の関連とそこで行われるメッセージのやりとりをあらわす    |
| 相互作用概要図 | ユースケース図やシーケンス図を構成要素としてより大枠の処理の流れをあらわす    |
| タイミング図 |  オブジェクトの状態遷移を時系列であらわす   |

---

## UML は大きく 振る舞い図(Behavior) と 構造図(Structure) に分類される

[PlantUML Cheat Sheet](https://qiita.com/ogomr/items/0b5c4de7f38fd1482a48)

## 　種類がBehavior

### ユースケース図

PlantUML: Use Case
ユースケース図は、要求される機能を表現します。

### ステートチャート図

PlantUML: State
オブジェクトの状態を表現
ステートチャート図はシステムの動的性質をモデル化するために使用されます。イベントが発生したときにオブジェクトすべての可能な状態を記述します。そのため、このもっとも重要な目的は、オブジェクト動作の開始から終了までのライフタイムをモデル化すること

### アクティビティ図

PlantUML: Activity
プロセスの状態を表現
アクティビティ図はシステム実行時における一連の処理の流れや状態遷移をあらわす。フローチャートのようなもの
![アクティビティ図](image/アクティビティ.png)

### シーケンス図

PlantUML: Sequence

シーケンス図はオブジェクト間のやりとりを時系列にそってあらわすもの
![シーケンス](image/シーケンス.png)

オブジェクトごと上から下へ時系列になっています。矢印は形の違いで意味がある。
ツールとして一番有名なのはdrawio

---

## 種類がStructure

構造図は、システムの静的な構造や実装の物理的な要素を表現する

### クラス図(Class)

PlantUML: Class
論理的なビューを表現

### オブジェクト図(Object)

PlantUML: Object
論理的なビューを表現

### コンポーネント図(Component)

[参考URL](https://www.lucidchart.com/pages/ja/uml-component-diagram)
PlantUML: Component
コンポーネントの依存関係を表現
※UML2.0においてコンポーネントという用語は、システムの他の部分とインターフェイスを介した接続が可能な独立したシステムやサブシステムを示すクラスのモジュールを指す。

### パッケージ図(Component)

PlantUML: Component
パッケージの依存関係を表現

### 配置図(Component)

システムの物理的な配置を表現

---

## ER図(Entity Relationship)

ER図は実体関連モデルDBの関連モデル
[ER図基本](https://qiita.com/ramuneru/items/32fbf3032b625f71b69d)
[TypeORMからER図を生成](https://dev.classmethod.jp/articles/typeorm-er-diagram/)
