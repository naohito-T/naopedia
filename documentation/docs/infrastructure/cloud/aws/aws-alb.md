# Application Load Balancer
[リファレンス](https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/introduction.html)

## ALBとELBの違い
[参考URL](https://www.wafcharm.com/jp/blog/difference-between-alb-and-elb/)

ELBとは「Elastic Load Balancing」の略称で、元々はこのELBがAWSにおけるロードバランシングサービスだった。  
しかしのちにALBが追加オプションとして開発された際に、ELBはその名称を「Classic Load Balancer（CLB）」に変えることになる。
そしてALBとCLBのサービスをまとめた総称として、ELBが使われるようになったのです。
さらに今ではNetwork Load Balancer（NLB）も追加され、その内容がさらに充実しています。
つまりELBとは、ALB、CLB、NLBという3種類の魅力的なロードバランサーを持つAWSのロードバランシングサービスの総称のこと

## ALBの特徴

- **レイヤー7（アプリケーションレイヤー）**での動作
- 新たにWebSocketとHTTP/2をサポート
- 最新のアプリケーションアーキテクチャを対象
- ターゲットグループにルーティングが行える
- 複数のアベイラビリティーゾーンの利用

## レイヤー7での動作について

旧来のELBはロードバランサーとして、レイヤー4のトランスポート層と、レイヤー7のアプリケーション層の両方で活動していた。
レイヤー4ではネットワークパケットの内容を細かく精査することなく負荷を分散し、レイヤー7ではパケット内のHTTPとHTTPSといった情報にアクセスしてより効率的な負荷分散を実行します。

一方でALBはレイヤー7だけで機能するロードバランサーであり、ELBとは違ってアプリケーション層に特化するスタイルを取っています。
そのためより便利で使いやすい機能の実装や追加が可能となり、全体のサポート力が高まることになったのでしょう。
