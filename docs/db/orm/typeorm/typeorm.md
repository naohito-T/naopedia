# TypeORM

TypeORMは、TypeScriptおよびJavaScriptで使用できるORMとされている。
Node.jsやブラウザ上など、様々なプラットフォームをサポートしているともされています。

## スタイル

スタイルとしては、Active RecordとData Mapperの2つのパターンをサポートしている。

## version

0.2系が現在主流であるが0.3系が最新（2022/10/09現在）

## 0.3系 参考

[参考URL](https://zenn.dev/hasegawasatoshi/articles/8110ce79119dd0)
[参考URL](https://kazuhira-r.hatenablog.com/entry/2022/03/13/235304)
[参考URL](https://qiita.com/Aurum64/items/f5962bd2a643447dbef9)
[参考URL](https://blog.open.tokyo.jp/2022/05/04/upgrade-typeorm-0-3.html)
[これが一番参考になるかも](https://blog.rhyztech.net/typeorm_0.2_to_0.3/)
[参考URL](https://developer.mamezou-tech.com/blogs/2022/07/27/typeorm-with-typescript/)

## config file

0.2では`ormconfig.ts`に接続オプションを記述していたようですが、0.3では非推奨になった。


## TypeORM & Express & Dockerで環境構築

[TypeORM をサクッと試せる Docker 環境を TypeORM CLI を使って構築する方法](https://dev.classmethod.jp/articles/typeorm-sandbox-in-docker-by-typeorm-cli/)



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

上を見ればわかるだろう。ひとつのチケットに対して複数のオプションがある。S




## Tips

[TypeORM知見まとめ](https://zenn.dev/uttk/scraps/343e888f62360b)
