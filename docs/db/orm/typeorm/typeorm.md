# TypeORM

記載していこう



## Find option 一覧

[参考URL](https://qiita.com/quzq/items/dca3424c7353ce37215c)

---

- Raw(生クエリ発行)



- equal

- And { A: a, B: b}

```ts
const user = connection.getRepository(User).find({
  where: [
    { firstName: "Timber", lastName: "Saw" },
  ]
});
```

- OR { A: a, B: b} , { A: a, B: b}

```ts
const user = connection.getRepository(User).find({
  where: [
    { firstName: "Timber", lastName: "Saw" },
    { firstName: "Stan", lastName: "Lee" }
  ]
});
```
