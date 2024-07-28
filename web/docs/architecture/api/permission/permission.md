# API permission 設計

[参考URL](https://kenfdev.hateblo.jp/entry/2020/01/13/115032)
[権限管理の苦い思い出を新規サービスで昇華した話](https://link-and-motivation.hatenablog.com/entry/20220401-authorization)
[システムの権限管理を設計するときの考え方とは](https://applis.io/posts/how-to-manage-authorization#%E6%A8%A9%E9%99%90%E7%AE%A1%E7%90%86%E3%82%92%E8%A8%AD%E8%A8%88%E3%81%99%E3%82%8B%E3%83%95%E3%83%AD%E3%83%BC)

>セキュリティはアプリケーション特有の関心事であり、ビジネスオブジェクトはこのことについて意識しない」と言っています

つまりusecase内で権限によってロジックをわけるとかは、ナンセンス
小・中規模であればいいかもしれないけど
それ以上の規模であればusecaseみて、中身汚いって思う。

## 人によって情報を出し分けたい

どの記事を読んでも最後に出し分けるのが慣例っぽい

## 権限チェックの箇所は

routerでやるとエンドポイントをみただけで一発でわかる

## パーミッションでの属性とは

同じapiを叩けるが、クライアントによって出力を変えるなどの属性

## 設計をする時に考えること

[![Image from Gyazo](https://i.gyazo.com/5c28b8f0c3dcfdcf9b3bb8ac0e089a66.png)](https://gyazo.com/5c28b8f0c3dcfdcf9b3bb8ac0e089a66)

[![Image from Gyazo](https://i.gyazo.com/89d50ad8ccb2b010782413ebe6fdaa49.png)](https://gyazo.com/89d50ad8ccb2b010782413ebe6fdaa49)

## RBAC: Role-Based Access Control

RBACは「ユーザーの役割によって権限のチェックを行う」やり方です。
役割とは、たとえば一般ユーザーや管理者などがあります。
権限を変更するだけで処理の可否を変更できるという利点がありますが、権限がふえると管理や実装が大変になってきます。

「管理者」のような役割以外にも、WritableやReadableのような複数のパーミッションを持たせるようなやり方もあります。

## ABAC: Attribute-Based Access Control

ABACは「ユーザーの属性によって権限のチェックを行う」やり方です。たとえばツイートの投稿者かどうか、あるいは同じグループに所属しているかどうか、です。

ABACは柔軟な権限管理ができる一方で実装が大変だったり、ものによってはデータベースへのアクセスがふえてパフォーマンスが悪くなったりします。RBACとABACは、システムの種類によって使い分けるとよいです。ひとつのシステム内で両方を使うことももちろんあります。
