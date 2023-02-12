# TypeORM

TypeORMは、TypeScriptおよびJavaScriptで使用できるORMとされている。
Node.jsやブラウザ上など、さまざまなプラットフォームをサポートしているともされています。

## スタイル

スタイルとしては、Active RecordとData Mapperの2つのパターンをサポートしている。

## version

0.2系が現在主流であるが0.3系が最新（2022/10/09現在）

## 0.3系 参考
[参考URL](https://blog.open.tokyo.jp/2022/05/04/upgrade-typeorm-0-3.html)
[参考URL](https://zenn.dev/hasegawasatoshi/articles/8110ce79119dd0)
[参考URL](https://kazuhira-r.hatenablog.com/entry/2022/03/13/235304)
[参考URL](https://qiita.com/Aurum64/items/f5962bd2a643447dbef9)
[参考URL](https://blog.open.tokyo.jp/2022/05/04/upgrade-typeorm-0-3.html)
[これが一番参考になるかも](https://blog.rhyztech.net/typeorm_0.2_to_0.3/)
[参考URL](https://developer.mamezou-tech.com/blogs/2022/07/27/typeorm-with-typescript/)
[参考URL](https://developer.mamezou-tech.com/blogs/2022/07/27/typeorm-with-typescript/#%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9%E3%81%AB%E6%8E%A5%E7%B6%9A%E3%81%99%E3%8%8B)

## config file

0.2では`ormconfig.ts`に接続オプションを記述していたようですが、0.3では非推奨になった。

## TypeORM & Express & Dockerで環境構築
[TypeORM をサクッと試せる Docker 環境を TypeORM CLI を使って構築する方法](https://dev.classmethod.jp/articles/typeorm-sandbox-in-docker-by-typeorm-cli/)

## TypeORM CLI option
[リファレンス](https://typeorm.biunav.com/en/using-cli.html#drop-database-schema)
[参考URL](https://qiita.com/Aurum64/items/f5962bd2a643447dbef9)

- create（空のマイグレーションファイル作成）
`typeorm migration:create src/migration/UserMigration`
1655392769030-UserMigration.tsのように空のマイグレーションファイルが作られる。

- generate（entityからのマイグレーションファイル作成）
※0.3からDB接続設定ファイルがtsファイルの場合は、typeormではなく同時にコンパイルも行う`typeorm-ts-node-commonjs`を使う必要
`npx typeorm-ts-node-commonjs migration:generate src/migration/UserMigration -d src/data-source.ts`

- run（マイグレーション実行）
`npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts`

- revert（マイグレーションロールバック）
`npx typeorm-ts-node-commonjs migration:revert -d src/data-source.ts`

## Find option 一覧

[参考URL](https://qiita.com/quzq/items/dca3424c7353ce37215c)

---

- Raw（生クエリ発行）

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
[参考URL](https://qiita.com/haman0104/items/8cc69429b1d02aefed35)
[参考URL(詳しい)](https://www.infoq.com/jp/articles/typescript-mysql/)
entityはDBのテーブルと一対一で構成する。  
※実際はClassで作成するため関連するmethodなども記載していいかは議論が生じる

## Entityファイル
[postgres entity 種類](https://github.com/typeorm/typeorm/blob/master/test/functional/database-schema/column-types/postgres/entity/Post.ts)
[全entity](https://github.com/typeorm/typeorm/tree/master/test/functional/database-schema/column-types)

`@Entity`をつけたものがテーブル対象になる。
データベースの列の型は、使用したプロパティの型から推測

データ型
[サポートされている列の型](https://typeorm.io/entities#column-types)

データベースの列の型は、使用したプロパティの型から推測されます。
ただし、列の型をデコレータに明示的に指定することで、データベースがサポートする任意の列の型を使用できる。

## サポートしている関係

TypeORMはエンティティ間のいくつかの種類の関係をサポートします。

1対1
1対多、多対1
多対多

## サポートしている関数についての関係

関数

表5で説明されているように、これらのそれぞれに対してデコレータと関数がtypeormで提供されています。
説明

OneToOne
エンティティ間の1対1の関係を指定する

JoinColumn
1対1リレーションの所有側を指定する

OneToMany
エンティティ間の1対多の関係を指定する

ManyToOne
エンティティ間の多対1の関係を指定する

ManyToMany
エンティティ間の多対多の関係を指定する

JoinTable
多対多関係の所有側を指定する

## 1対1



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


## デコレータオプション

- cascade
[参考URL](https://uyamazak.hatenablog.com/entry/2021/10/06/140909)

名前的にDB側のテーブル設定かと思いきや違うので、設定を変更してもmigrationは発生しない。
親Entityを各種更新した際、いっしょに子も更新するかどうか。取得時には影響しない

## TypeORMのEager relationsとLazy relationsについて
[参考URL](https://kazamori.jp/blogs/2021/07/12/typeorm-lazy-relations-memory/)

Eager relations
Entityと関連Entityを同じタイミングで読み込む。

Lazy relations
Promiseを使って任意のタイミングで遅延して読み込む。
オプションで`{lazy: true}`を設定しなくても型として`Promise`を指定するとTypeORMは自動的に`Lazy relations`として扱います。 

## TypeORMをREPLで実行する
[参考URL](https://kazamori.jp/blogs/2021/07/12/typeorm-lazy-relations-memory/)

## TypeORM の Bulk Insert と psql の \copy を比較する
[参考URL](https://kazamori.jp/blogs/2021/07/21/typeorm-bulk-insert/)

## TypeORMにおいて、`date` は `Date` でなく `string` にmapされるので気をつけましょう
[参考URL](https://dev.to/e_ntyo/typeorm-date-date-string-map-3el1)











