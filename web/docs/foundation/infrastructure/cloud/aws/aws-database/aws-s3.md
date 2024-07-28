# AWS S3

## S3のバケットボリシーまとめ

[参考URL](https://qiita.com/irico/items/a3ab1f8ebf1ece9cc783)

## S3にアクセスする

[AWS S3の特定bucketにCLIやAPIでアクセスする設定](https://qiita.com/kawada2017/items/40acfbaf6bce8f8011cf)

## S3バケットへのアプリケーションコードアクセス方法

2通りある

```ts
// パススタイル
const url = 'https://s3.amazonaws.com/<bucketName>/<key>'
// 名称不明（ドメインスタイル？）
const domainUrl = 'https://<bucketName>.s3.amazonaws.com/<key>'
```

## ForcePathStyle

[S3のForcePathStyleに2時間つまづいた](https://zenn.dev/hiroga/scraps/cbb721e2a496f8)

localStackはドメインスタイルを処理できない。
そのためlocalではパススタイルを強制して上げないといけない。
