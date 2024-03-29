# Route53

## Overview

Amazon Route 53は、AWSが提供するDNS（Domain Name System）運用サービスです。Route 53は非常に高い可用性と信頼性を備えており稼働率100%が保証されています。
Route 53は以下の機能を備えています。
- 権威DNSサーバー
- ドメイン名の購入
- ドメイン名の登録・管理

[![Image from Gyazo](https://i.gyazo.com/e16bd2a9ac0661dfe79768557f72f1cb.png)](https://gyazo.com/e16bd2a9ac0661dfe79768557f72f1cb)

## 注意点

AWS Route53を使用して新しいドメイン名を購入する機能は、AWS CDKやTerraformといったIaC（Infrastructure as Code）ツールのスコープ外となる。

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
エイリアスレコードと呼ばれる特別なDNSレコードがある。  
エイリアスレコードはCNAMEレコードでは登録できない「Zone Apex」の別名を登録できます。Zone Apexとは最上位のドメイン名のことで、たとえば「www.example.com」や「sub.example.com」のZone Apexが「example.com」です
