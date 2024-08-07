# FireStore

[一番参考になる](https://medium.com/google-cloud-jp/firestore1-a62405a7cd82)

NoSQLドキュメント指向データベース  
一般的に、アプリケーションで取り扱われる**エンティティはオブジェクトモデル**によって表現される。  
ドキュメント指向データベースではこのオブジェクトモデルをドキュメントという形式で表現し、ストレージに永続化する  
FireStore**各ドキュメントをコレクションによってグループ化**する。  

FireStoreのクエリには、**高いパフォーマンスを実現する上で犠牲にせざるを得なかったさまざまな制約**がある。
データモデルの設計を行う際には、これらの**制約をよく理解した上で効率よくデータが取得できるように考慮しなければならない。**

## FireStore Tips

これだけは覚えておけ

FireStoreにおける**データ構造の表現であるドキュメントとコレクション。**
データアクセスの基礎となる**リファレンス**と**スナップショット**
FireStoreのドキュメントにはデータサイズの上限がある。  
ドキュメントの型である、マップやリストなどのネストした構造はアプリケーションによって生成される（つまり、ユーザの操作によって時間とともに数が増えていくような）適していない。そのためのサブコレクション
**書き込みに関しては単一のドキュメントに対する操作だけが定義されている。**
→RDBのように1回のクエリで複数レコードの特定の列をまとめて更新するといった機能が提供されていない。このような操作は対象となるドキュメントをすべて取得してからひとつひとつ更新をかける形で実現する。

## ドキュメント

ドキュメントはJSONによく似た構造化されたデータデータ。
アプリケーションが扱うモデルを構成する関連のある一連のデータ
ドキュメントはJSONで利用可能な基本的な型に加え、タイムスタンプ型や経緯緯度といったアプリケーションで取り扱う頻度の高い**データ型を他の型に変換することなく保存したり取り出したりできる。**
これによりORMの手間を大幅に省略できる。

## コレクション

コレクションはドキュメントを格納するためのコンテナー
FireStoreはスキーマレスのため同一のコレクション内であっても各ドキュメントにどのようなフィールドをもたせるかを自由に設計できるが、**ほとんどのユースケースにおいてはコレクション内のすべてのドキュメントが同一のフィールドを持つようにすべき。**
→このような設計方針を採用することで、クエリの発行やセキュリティルールでの取り扱いが容易になる（まあ当たり前か）

制約
コレクション内の**各ドキュメントにはそれぞれ一意なIDを割り当てる必要がある。**
IDはコレクション内で一意であればよく、他のコレクションに同一のIDを持つドキュメントが存在しても問題ない。

## コレクショングループ

同一のIDを持つコレクションをひとつのコレクションとみなして扱う機能。
※通常のクエリでは単一のコレクションからしかデータを取得できない。

## スナップショット

スナップショットとは、ドキュメントやクエリ結果のある瞬間における状態を表現したデータ
通常は**ドキュメントを取得した瞬間やクエリによるデータ取得が完了した瞬間にスナップショットが作成される。**

## リファレンス

ドキュメントやコレクションが格納されているFirestore内のパスを表現するモデル
※リファレンスはそのままFirestoreにデータとして保存できる。

## fromCache

スナップショットへ含まれるドキュメントに、ローカルキャッシュから取得したものが含まれているかどうかを判定するフラグ
キ
