# Route53

AWS Route53を使用して新しいドメイン名を購入する機能は、AWS CDKやTerraformといったIaC（Infrastructure as Code）ツールのスコープ外

## ホスティングゾーン(Hosted Zone)

Hosted Zoneは、ドメイン名に関連するDNSレコードを保持するためのコンテナーのようなものです。ドメイン名（例: `example.com`）ごとにホスティングゾーンを作成します。その中に、そのドメイン名やそのサブドメイン（例: `www.example.com`や `api.example.com`）のためのDNSレコードを追加します。

ホスティングゾーンには2種類あります：

1. **パブリックホスティングゾーン（Public Hosted Zone）**:
   - インターネット上のユーザーがアクセスできるDNSレコードを持っています。
   - 例: `example.com` のドメイン名に関連するDNSレコードを持つ場合、外部のユーザーやクライアントが `example.com` や `www.example.com` にアクセスする際に、このホスティングゾーン内のDNSレコードを参照します。

2. **プライベートホスティングゾーン（Private Hosted Zone）**:
   - 特定のAmazon VPC内からのみアクセス可能なDNSレコードを持っています。
   - 通常、企業の内部ネットワークや特定のアプリケーションのための内部的なDNS名解決を行うために使用されます。

ホスティングゾーンを作成すると、Route 53はそのホスティングゾーンに対して4つの名前サーバー（NS）レコードを自動的に割り当てます。これらのNSレコードは、ドメイン名を購入したレジストラーの設定に追加する必要があり、これによってRoute 53がそのドメインのDNS情報の公式なソースとして機能することができるようになります。


## エイリアスレコード

Route53の独自の機能で、簡単にいえばIPアドレスを直接入力しなくても裏でいい感じに設定してくれる機能。