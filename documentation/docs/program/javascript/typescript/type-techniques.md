# Type Techniques

TypeScriptの型テクニックについて記す。

## Objectから該当する型のキーを取得する型定義
[参考コード](typescriptlang.org/play?#code/C4TwDgpgBA0hIGcDyAzAKuaAeNAaKAygHxQC8UA3gFBRQDaA1vFAJYB2UTIA9ilGgF0AXISgQAHsAhsAJgn6N4AqAH5OzEWwgA3CACcA3FQC+inn0FGqoSLHjzycRKgyQs1WixmaArgFsAI30jWjYAQz8IEQRgPXYAcxCxPzCWABto2ISjY3wYuLZ4oisAY242GPUQAEYRJwcoAHJwyMajMorgKoAmOvsyJogU9LaqIA)

純正にUnion Typesとして取得できる。
```ts
type Keys = KeysOfType<{
  id: number;
  name: string;
  email: string;
}, 'id'>;
// Keys = "name" | "email"
const key1: Keys = 'name';
const key2: Keys = 'email';
```

## UndefinedなプロパティをOptionalに変換する

仕組みとしてはObjectからundefinedを含まないプロパティを抽出したものと、undefinedを含むプロパティを抽出しPartialでラップしたものを合成することで実現。
