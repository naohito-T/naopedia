# mermaid

[参考URL](https://qiita.com/Tachy_Pochy/items/ee79fc5c572fa5661989)  
[Github mermaid](https://usefuledge.com/vscodemermaidsupport.html)

## Overview

[Mermaid入門](https://zenn.dev/kento_mm_ninw/articles/8b10afdbef306a)
Mermaidとは、Markdownテキストでグラフを作成できるダイアグラムツールの1つ。  
さまざまなタイプの図を作成するためのツールであり、以下の一般的な図の種類に対応している。  
Mermaidが対応する図の種類を示し、それぞれの用途とツールの例の中にMermaidを含める。

### 一般的な図の種類とMermaidの位置づけ

1. **フローチャート（Flowchart）**
   - **用途**: プロセスやワークフローを視覚的に表現。
   - **ツール**: Lucidchart, Draw.io, Microsoft Visio, **Mermaid**
   - **例**: システムフローチャート、ビジネスプロセス
   - **Mermaid例**:

     ```mermaid
     flowchart TD
         A[Start] --> B{Is it?}
         B -->|Yes| C[OK]
         B -->|No| D[Not OK]
     ```

2. **ガントチャート（Gantt Chart）**
   - **用途**: プロジェクトのスケジュール管理。
   - **ツール**: Microsoft Project, Trello, Asana, **Mermaid**
   - **例**: プロジェクト計画、タスク管理
   - **Mermaid例**:

     ```mermaid
     gantt
         title A Gantt Diagram
         dateFormat  YYYY-MM-DD
         section Section
         A task           :a1, 2023-01-01, 30d
         Another task     :after a1  , 20d
     ```

3. **ER図（Entity-Relationship Diagram）**
   - **用途**: データベースの構造を視覚化。
   - **ツール**: MySQL Workbench, Lucidchart, **Mermaid**
   - **例**: データベース設計、データモデル
   - **Mermaid例**:

     ```mermaid
     erDiagram
         CUSTOMER ||--o{ ORDER : places
         ORDER ||--|{ LINE-ITEM : contains
         CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
     ```

4. **シーケンス図（Sequence Diagram）**
   - **用途**: システム内のプロセスフローやインタラクションの視覚化。
   - **ツール**: Lucidchart, Microsoft Visio, **Mermaid**
   - **例**: ユースケース、システムインタラクション
   - **Mermaid例**:

     ```mermaid
     sequenceDiagram
         Alice->>Bob: Hello Bob, how are you?
         Bob-->>John: How about you John?
         Bob--x Alice: I am good thanks!
         Bob-x John: I am good thanks!
         Note right of John: John thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

         Bob-->Alice: Checking with John...
         Alice->John: Yes... John, how are you?
     ```

5. **クラス図（Class Diagram）**
   - **用途**: オブジェクト指向設計のクラス構造を視覚化。
   - **ツール**: Enterprise Architect, Lucidchart, **Mermaid**
   - **例**: クラスの関係性、継承構造
   - **Mermaid例**:

     ```mermaid
     classDiagram
         Animal <|-- Duck
         Animal <|-- Fish
         Animal <|-- Zebra
         Animal : +int age
         Animal : +String gender
         Animal: +isMammal()
         Animal: +mate()
         class Duck{
           +String beakColor
           +swim()
           +quack()
         }
         class Fish{
           -int sizeInFeet
           -canEat()
         }
         class Zebra{
           +bool is_wild
           +run()
         }
     ```

6. **ステート図（State Diagram）**
   - **用途**: システムの状態遷移を視覚化。
   - **ツール**: Lucidchart, Microsoft Visio, **Mermaid**
   - **例**: システムの状態管理、状態遷移
   - **Mermaid例**:

     ```mermaid
     stateDiagram
         [*] --> Still
         Still --> [*]
         Still --> Moving
         Moving --> Still
         Moving --> Crash
         Crash --> [*]
     ```

### まとめ

Mermaidは、フローチャート、ガントチャート、ER図、シーケンス図、クラス図、ステート図など、さまざまな種類の図を作成するために使用できます。これにより、プロジェクトのさまざまな視覚的表現を効率的に作成し、情報を明確に伝えることができます。
