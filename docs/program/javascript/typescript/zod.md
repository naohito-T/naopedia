# zod
[参考URL](https://zenn.dev/ynakamura/articles/65d58863563fbc)


- 特徴
Schema firstなvalidationライブラリである。
validateするschema（単一のschemaからobject, arrayまで）を定義し、それをベースにparseするというものです。

>z.infer<T>を使うことにより、zodで定義したschemaから型情報を得ることもできます。


## zod default挙動

nullableがfalseになっている。
ただ`z.string()`だと`''`のような空文字は許容している。

## pre process
[参考URL](https://zenn.dev/nicopin/articles/e5cb871cd456eb)
第一引数で事前にしたい処理を渡すことができ、第二引数でスキーマを渡せる。

```ts
export const formSchema =　z.object(
  {
    quantity: z.preprocess(
      (v) => Number(v),
      z
        .number({ required_error: ValidationMsg.REQUIRED })
        .min(4, ValidationMsg.Number.MIN(4))
    ),
  }
);
export type Form = z.infer<typeof formSchema>
```