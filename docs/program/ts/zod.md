# zod

[参考URL](https://zenn.dev/ynakamura/articles/65d58863563fbc)

- 特徴
Schema firstなvalidationライブラリである。
validateするschema（単一のschemaからobject, arrayまで）を定義し、それをベースにparseするというものです。

>z.infer<T>を使うことにより、zodで定義したschemaから型情報を得ることもできます。