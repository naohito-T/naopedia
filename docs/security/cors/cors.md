# CORS(Cross-origin resource sharing)

Same-Origin Policyに弾かれず、異なるドメイン間でリソースを共有する仕組み  
2014年1月W3C勧告になり`JSONP`から替わる方法として徐々に普及してきている。

## デフォルト挙動

CORSではデフォルトでクッキーの送受信が行われない。
また、受信できるレスポンスヘッダーも最小限に絞られている。