# AWS WAF
[AWS WAF解説](https://www.wafcharm.com/jp/blog/aws-waf-basic-structure/)

## 構成図
![構成](https://gyazo.com/369da6037459ed60e58925b875a18908)

## WAFとは

AWSが提供するWeb Application Firewall

- `L7(HTTP/HTTPS)`アプリケーション層の防御  
- Web ACLによりアクセスの制限を実現  
- SQL InjectionやXSS, アプリケーション固有の攻撃に対応