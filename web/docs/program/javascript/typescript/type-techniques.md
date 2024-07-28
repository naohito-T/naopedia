# Type Techniques

TypeScriptの型テクニックについて記す。

## Objectから該当する型のキーを取得する型定義

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
