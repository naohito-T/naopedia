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

## entity

entityはDBのテーブルと一対一で構成する。
※実際はClassで作成するため関連するmethodなども記載していいかは議論が生じる

[参考URL](https://qiita.com/haman0104/items/8cc69429b1d02aefed35)

## @OneToOne(() => )

参照される側。サッカーチーム　から　コーチを参照(コーチに@OneToOne()を付与)
@JOinColumnは必須


## @OneToMany()

```ts
  @OneToMany(
    () => TicketOptionItem,
    (ticketOptionItem) => ticketOptionItem.ticket
  )
  public ticketOptionItems?: TicketOptionItem[];
```

上を見ればわかるだろう。一つのチケットに対して複数のオプションがある。S




## Tips

[TypeORM知見まとめ](https://zenn.dev/uttk/scraps/343e888f62360b)
