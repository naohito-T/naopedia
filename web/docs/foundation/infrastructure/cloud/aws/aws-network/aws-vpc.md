# Amazon VPC(Virtual Private Cloud)

## Overview

AWS上にプライベートネットワーク空間を提供するサービス
オンプレミスでプライベートネットワークを構築する場合は、データセンター内にスイッチやルーターなどのネットワーク機器を用意し、LANケーブルでサーバーやストレージなどを接続するといった作業が必要になる。  
VPCを利用すると、ハードウェアや配線を意識せず簡単な操作で迅速にプライベートネットワークを構築できるメリットがある。

[![Image from Gyazo](https://i.gyazo.com/1b030c154099069186e83b59ec3cb5d3.png)](https://gyazo.com/1b030c154099069186e83b59ec3cb5d3)

また、VPCはオンプレミス環境との接続も容易。  
物理的な専用線で接続するDirect Connectや仮想ネットワークで接続するVPN（AWS Virtual Private Network）が利用できる。

VPCは、主に**プライベートなリソース**（例：データベースサーバーやバックエンドアプリケーション）を保護し、インターネットから隔離するために使用される。  
フロントエンドは一般的に公開されるコンポーネントであり、ユーザーから直接アクセス可能な部分です。そのため、VPC内にフロントエンドを配置する必要はほとんどない

一般的なアーキテクチャでは、フロントエンド（Next.jsなどのLambda関数を含む）はパブリックなインターネットに接続される場所に配置されます。一般的に、フロントエンドはクライアントのブラウザから直接アクセスされ、ユーザーに対してウェブサイトやアプリケーションのコンテンツを提供します。

一方、バックエンドのリソースやデータベースなどは、セキュリティ上の理由からVPC内に配置することが一般的です。VPC内のリソースはインターネットから直接アクセスできないため、より高いセキュリティレベルでアクセス制御が可能となります。

ただし、特定の要件やセキュリティ上の懸念がある場合は、フロントエンドをVPC内に配置することも考えられる。  
一般的なケースではフロントエンドはVPC外に配置することが多い。  
適切なアーキテクチャを選択するためには、具体的な要件やセキュリティポリシーを考慮し、適切な設計を行うことが重要

## VPCにフロントエンドは配置するべきなのか

一般的に、フロントエンド（プレゼンテーション層）はパブリックなインターネットに配置され、ユーザーから直接アクセスできるようになっている。  
一方、バックエンド（アプリケーション層）とデータベース（データ層）はセキュリティ上の理由からVPC内に配置されることがよくある。

つまり、三層アーキテクチャを採用している場合でも、フロントエンドはVPC外に配置されることが多い。  
フロントエンドはクライアントから直接アクセスされる部分であり、インターネットからのアクセスを受け付ける必要があるため。  
一方、バックエンドとデータベースは、セキュリティを高めるためにVPC内に配置されることが一般的

## VPCエンドポイント（AWS PrivateLink）

VPCと他のVPC外のサービス間の通信を可能にするサービスで、たとえばLambdaとParameter Store間にVPCエンドポイントを作成することで、LambdaからParameter Storeにアクセスが可能になる。  
インターフェースエンドポイントとゲートウェイエンドポイントの2種類があり、前者は有料ですが後者は無料です。S3とDynamo DBではゲートウェイエンドポイントが利用できる。

## VPCのCIDR (Classless Inter-Domain Routing) ブロックは、一般的に `10.0.0.0/16` がよく使用される理由

1. **プライベートなIPアドレス範囲**: CIDRブロック `10.0.0.0/8` はプライベートなIPアドレス範囲に属しています。  
これは、インターネット上の他のデバイスとの衝突を避けるために、プライベートネットワーク内でのみ使用することを意味します。

2. **大規模なIPアドレス範囲**: /16サブネットは、65,536のIPアドレスを含む広範なアドレススペースを提供します。これにより、VPC内のリソースに対して十分なIPアドレスを割り当てることができます。

3. **AWSの推奨設定**: Amazon Web Services (AWS) は、デフォルトで新しいVPCを作成する際に、CIDRブロック `10.0.0.0/16` を使用します。これにより、多くのユーザーが同じCIDRブロックを利用することになり、VPC間でのIPアドレスの競合を防ぎます。

4. **CIDRの慣例**: CIDRブロック `10.0.0.0/16` は、IPv4アドレスの範囲内で一般的に使用される慣例的な選択です。他のプライベートなIPアドレス範囲（たとえば、172.16.0.0/12や192.168.0.0/16）も利用されますが、10.0.0.0/16がもっとも広範で一般的です。

ただし、必ずしも `10.0.0.0/16` を使用する必要はありません。VPCのサイズや要件に応じて適切なCIDRブロックを選択することが重要です。複数のVPCを設定する場合は、異なるCIDRブロックを選択してIPアドレスの競合を回避する必要があります。

## サブネット

サブネットはネットワークレベルでのセグメンテーションを提供する

## ルートテーブル

サブネット間の通信経路を設定するためににルートテーブルという機能がある。  
**すべてのサブネットにルートテーブルを作成する必要がある。**  
※ただし、複数のサブネットが同じルートテーブルを共有することは可能。  
※public subnetには共通のルートテーブルを設定するのが慣例

- 送信先
  どこに接続するかという情報。送信先はIPアドレスを指定する

- ターゲット
    どこを経由するかという情報

### デフォルトで作成されるルート

`10.0.0.0/16 local` というルートテーブルのエントリは以下の意味を持っています

1. **10.0.0.0/16**:
   これはCIDR表記と呼ばれるもので、特定のIPアドレスの範囲を表しています。`10.0.0.0/16` は `10.0.0.0` から `10.0.255.255` までのIPアドレスの範囲を指定しています。`/16` は最初の16ビットがネットワークアドレスで固定されており、残りのビットがホストアドレス部分となります。これにより、65,536個の異なるIPアドレスが得られます。

2. **local**:
   このルートエントリはVPC内でのローカルルーティングを意味しています。言い換えれば、このIPアドレス範囲内のどのIPアドレス宛に送られたトラフィックも、同じVPC内の対応するIPアドレスにルーティングされます。

具体的には、このルートエントリがあることによって、VPC内の任意のリソース（EC2インスタンス、Lambda関数など）が `10.0.0.0/16` 内の任意の他のリソースに通信できるようになります。また、このエントリはVPCが作成される際に自動的に作成されるデフォルトのルートエントリです。

### ルートテーブルの疑問

>public subnetに紐づいているnatがあるとする
>private subnetのルートテーブルがVPC外へアクセスする場合は

>private subnet → public subnet → nat
>or
>private subnet  → nat
>どっちなのか？

回答
`private subnet → NAT` のルートを使用します。  
実際には、private subnetに関連付けられたルートテーブルに、インターネットまたはVPC外部へのトラフィックをNATゲートウェイ（またはNATインスタンス）にルーティングするエントリ（通常は `0.0.0.0/0` で指定される）を設定します。

したがって、トラフィックのルートは以下のようになります：

```sh
private subnet → NAT → Internet
```

ここで、NATはpublic subnetに配置されますが、トラフィックは直接NATゲートウェイまたはNATインスタンスにルーティングされ、その後インターネットにルーティングされます。したがって、「private subnet → public subnet → NAT」のように、public subnetを経由する明示的なステップは存在しません。

## NAT(Network Address Translation)

VPCの内部から外部に通信を行うときプライベートIPだけの情報をパブリックIPに変換する仕組みのことをNATと呼ぶ  
NATゲートウェイはパブリックなサブネットに対して作成する

## 0.0.0.0/0とは

`0.0.0.0/0` はCIDR表記法を用いてIPアドレス範囲を示すもので、インターネットプロトコル（IP）におけるすべての有効なアドレスを表す。  
具体的には、IPv4アドレス空間内のすべてのアドレスを含みます。

ここで、`0.0.0.0` は起点となるIPアドレスを示し、`/0` はサブネットマスクを示します。サブネットマスクの `/0` は、サブネットに関連付けられているビット数を示しています。`/0` は0ビットをサブネットに関連付けることを示しており、これによりすべてのIPアドレスがこの範囲に該当することになります。

AWSや他のネットワーク環境でのルートテーブル設定において、`0.0.0.0/0` のルートを設定することで以下のような効果を持ちます:

1. **すべての外部トラフィックのルーティング**: このルートを使用して、ネットワーク外部へのトラフィックを特定のターゲット（たとえばインターネットゲートウェイやNATゲートウェイ）にルーティングすることが可能。

2. **デフォルトルート**: 通常、`0.0.0.0/0` ルートはデフォルトルートとして使用され、特定のルートが設定されていないすべてのIPアドレス範囲へのトラフィックをハンドリングします。

---

## セキュリティ

AWS VPC GUIのセキュリティについて

### ネットワークACL(Access Control List)

VPC内のサブネットレベルで動作する
サブネットの入出力トラフィックを制御するための状態を持たないフィルターとして動作する

### セキュリティグループ

セキュリティグループはAWS環境で使用される仮想ファイアウォールで、EC2インスタンスやデータベースといったAWSリソースのトラフィックを制御するために使用される。  
以下にセキュリティグループの主な特徴と、それがどのように機能するかを説明します：

## セキュリティグループとは

セキュリティグループは、VPCというAWSの仮想ネットワーク上に構築されるEC2などのインスタンスに対して仮想ファイアウォールとしての機能をもたらす。  

- VPC内のEC2インスタンスや他のリソース（Lambda関数、RDSデータベースなど）に関連付けられる。
- インバウンドとアウトバウンドのトラフィックを制御するための状態を持ったフィルターとして動作する。
※基本的にセキュリティグループ無しで作成はできないと思ったほうがいい。

### セキュリティグループの主な特徴

1. **状態フルなフィルタリング**： セキュリティグループは状態フルであるため、リクエストのトラフィックが許可されると、それに関連するレスポンストラフィックは自動的に許可されます。

2. **ルールの基本**：
   - **インバウンドルール**： これらのルールは、AWSリソースへのトラフィックの入口を制御します。ここで特定のIPプロトコル、ポート、およびソース/デスティネーションIPアドレスを指定できます。
   - **アウトバウンドルール**： これらのルールは、AWSリソースからのトラフィックの出口を制御します。ここで特定のIPプロトコル、ポート、およびソース/デスティネーションIPアドレスを指定できます。

3. **デフォルトの動作**：
   - **デフォルトのインバウンドルール**： デフォルトでは、インバウンドトラフィックはすべて拒否されます。
   - **デフォルトのアウトバウンドルール**： デフォルトでは、アウトバウンドトラフィックはすべて許可されます。

4. **関連するリソース**： セキュリティグループはひとつまたは複数のEC2インスタンスや他のAWSリソースに関連付けることができます。

### セキュリティグループの使い方：

1. **セキュリティグループの作成**： まず、セキュリティグループを作成し、それに名前と説明を付けます。

2. **ルールの設定**： 次に、インバウンドおよびアウトバウンドルールを設定します。これにより、特定のIPアドレスやCIDR範囲からのトラフィックを許可または拒否できます。

3. **リソースにセキュリティグループを関連付ける**： 最後に、セキュリティグループをEC2インスタンスや他のAWSリソースに関連付けます。これにより、それらのリソースに対するトラフィックフローを制御できます。

4. **テストと監視**： セキュリティグループの設定をテストし、トラフィックの監視を行い、必要に応じてルールを更新してセキュリティを維持します。

AWSのセキュリティグループは、企業がAWS内でのネットワークセキュリティを確保する上で非常に重要なツールです。AWSマネジメントコンソール、AWS CLI、またはSDKを使用してセキュリティグループを作成と管理を行うことができます。

### ネットワークACLとセキュリティグループの違い

ネットワークACL（Access Control List）とセキュリティグループは、AWS VPC内でのネットワークトラフィックを制御するための2つの異なるセキュリティ機構です。それぞれの機能と主な違いを以下に示します：

1. **定義・適用範囲**:
   - **セキュリティグループ**:
     - VPC内のEC2インスタンスや他のリソース（Lambda関数、RDSデータベースなど）に関連付けられる。
     - インバウンドとアウトバウンドのトラフィックを制御するための状態を持ったフィルターとして動作する。
   - **ネットワークACL**:
     - VPC内のサブネットレベルで動作する。
     - サブネットに入るか出るトラフィックを制御するための状態を持たないフィルターとして動作する。

2. **状態の有無**:
   - **セキュリティグループ**: 状態を持っている。たとえば、インバウンドルールで受信トラフィックを許可すると、対応するアウトバウンドの応答トラフィックは自動的に許可される。
   - **ネットワークACL**: 状態を持たない。インバウンドとアウトバウンドのルールは独立しているので、明示的に設定する必要がある。

3. **ルールの適用**:
   - **セキュリティグループ**: すべてのルールは同時に評価され、許可ルールのみを定義できる。拒否ルールは存在しない。
   - **ネットワークACL**: ルールは番号順に評価され、最初に一致したルールが適用される。許可と拒否の両方のルールを定義できる。

4. **デフォルトの振る舞い**:
   - **セキュリティグループ**: デフォルトではすべてのインバウンドトラフィックを拒否し、すべてのアウトバウンドトラフィックを許可する。
   - **ネットワークACL**: デフォルトではすべてのインバウンドとアウトバウンドトラフィックを許可する。

5. **エフェメラルポートに関する取り扱い**:
   - **セキュリティグループ**: 応答トラフィックのエフェメラルポートを自動的に管理する。
   - **ネットワークACL**: 応答トラフィックのエフェメラルポートの範囲を明示的に設定する必要がある。

これらの違いを理解することで、VPC内のリソースに対する適切なアクセス制御を実現するための最良の方法を選択できます。

## ネットワークACL

サブネットに対して設定することから、その設定されたサブネット内のAWS EC2インスタンスすべてに影響する。  
ネットワークACLは、設定されたルールに従うファイヤーウォール  
AWS VPC内でネットワーク通信を許可。またはネットワーク通信を拒否することでネットワーク通信を制御する。  
※ネットワークACLは作成できるルールに制限があったり、Ephemeralポートのことを考慮する必要があるなど、ターゲットグループと比べると少し設定が難しい部分があります。

## セキュリティグループ

許可ルールのみを設定する。  
インスタンス単位に設定をする。

## ネットワークACLとセキュリティグループの違い

[参考URL](https://tenshoku-careerchange.jp/column/1123/)

[![Image from Gyazo](https://i.gyazo.com/708c868a0a764cf56df5d2f98b4a672c.png)](https://gyazo.com/708c868a0a764cf56df5d2f98b4a672c)