# Stress-test

負荷試験についてまとめる。

---

## ユビキタス

- スケール特性
どの部分を増強すれば性能がどれだけ上がるかという性質をスケール特性と呼ぶ。

- スループット（応答時間）
スループットは単位時間あたりの処理能力やデータ転送量のこと。
1秒間に捌けるリクエスト数をrps（Request Per Second）という表記がよく使われる。

- レイテンシ（応答時間）
**処理時間のこと**
Webシステムで言うとリクエストからレスポンスまでどれだけかかったか。
転送要求を出してから実際にデータが送られてくるまでに生じる通信の遅延時間のこと。

試験実施時には、目標設定として
スループット：〇〇rps
レイテンシ：n秒以下
といった目標設定を行います。

## 時間の単位

[参考URL](https://tanijiten.com/time-howtouse-15)

- 分（min）
1秒の60倍。60秒

- 秒の記号表記（s, sec）
日本語の秒は英語でsecondという単語で表されます。秒の記号はこの頭文字を取ってsと表記されることが多いです。
ただしsと表記する単位は他にも存在するため、組立単位で表記する際、一体どの単位の事なのか分かり難くなることがあります。そのため秒はしばしばsecと表記されることもあります。

>私自身も、仕事で秒を扱う時はsecと記載することが多いですね

- ミリ秒（ms）
ms 1秒の1/1000（千分の一）10-3秒

## 同様な負荷試験ツール

Apache Bench
簡易的なツールといった感じ。小中規模にハマりそう

Apache JMeter
シナリオ作成できたっけ

k6
Go製のツールだけど、シナリオをjsで書ける。

## 負荷テストの目的を抑えておく

クラウド環境での負荷テストの目的は以下の5つが挙げられる。

1. 各種ユースケースの応答性能を推測する
2. 高負荷時の性能改善を行う
3. 目的の性能を提供できるハードウェアをあらかじめ選定する
4. システムがスケール性を持つことを確認する
5. システムのスケール特性を把握する

## サービスの性質によって負荷テストのやり方は異なる

[DeNA Engineering - DeNAエンジニアのポータルサイト](https://engineering.dena.com/blog/2021/10/healthcare-load-testing/)

まず考えられること。

1. どこのページからの流入が一番多いのか調べる。
2. シナリオテストが必要か（他ユーザとのインタラクション（相互）がない場合）

- トップページに情報が多いWebの場合
シナリオ作成は要らなく、top page閲覧で負荷をかける

## 負荷テスト アプローチ

性能テスト：システムが想定している負荷に対し、どの程度のスループットやレイテンシかを確認する
限界テスト：処理限界に近い、または超過した負荷に対し、エラーが出るかなど、挙動を確認する
耐久テスト：長時間負荷をかけた際の挙動を確認する

次に今回行った負荷テストの流れを見ていきます。ただし、前述したとおりサービスによってシナリオテストの有無などの差分があります。ここではシナリオテストを含むカラダモの例を紹介します。

負荷テスト計画書の作成
負荷テスト環境の構築・負荷テスト対象のスペックを最低限に変更
ダミーデータ作成
負荷テスト環境と負荷テストツールの検証
単一エンドポイントに対するテスト
オートスケールを有効にした場合のテスト
シナリオテスト
耐久テスト
5から7に関しては、起動クライアント数を徐々に上げ、負荷を上げていくことでスループットが限界となる負荷を探索していくので、性能テストと限界テストを兼ねているものとしています。
