# Clean Architecture(クリーンアーキテクチャー)

## 概要
[クリーンアーキテクチャを完全に理解した](https://gist.github.com/mpppk/609d592f25cab9312654b39f1b357c60)

クリーンアーキテクチャはRobert C. Martin(Uncle Bob)が2012年に提唱した、**DBやフレークワークからの独立性を確保するためのアーキテクチャである**  
前節のレイヤードアーキテクチャが提案されて以降も、ヘキサゴナルアーキテクチャ、オニオンアーキテクチャなどが提案されてき
た。  
これらのアーキテクチャで用いられる用語は異なるが、目指すところは同じであるとクリーンアーキテクチャ（The Clean Architecture）では述べている。

関心の分離が共通しているという話。  
>これらのアーキテクチャはどれも細部は異なるけれども、とてもよく似ている。これらはいずれも同じ目的を持っている。関心の分離だ。これらはいずれも、ソフトウェアをレイヤーに分けることによって、関心の分離を達成する。どれも、最低ひとつは、ビジネスルールのためのレイヤーと、インターフェイスのためのレイヤーがある。

## 有名な図についての解説
[![Image from Gyazo](https://i.gyazo.com/967a21ac36ce9f61e5ed693e8aeb7c12.png)](https://gyazo.com/967a21ac36ce9f61e5ed693e8aeb7c12)

一般的な図やアーキテクチャの表現では、インフラストラクチャ層は円の外側に配置されるが、これは**上位のレイヤー（ドメイン層やアプリケーション層）がインフラストラクチャ層に依存していること**を示すため。  
これは、上位のレイヤーが下位のレイヤーに依存するという依存関係を視覚的に表現するためのもの  
ただし、これはあくまで一般的な表現であり、図やアーキテクチャの具体的な表現方法は組織やプロジェクトによって異なる場合がある。  
重要なのは**各レイヤーが適切な責務を持ち、依存関係が適切に管理されていること**です。

## 基本的なディレクトリ構成

クリーンアーキテクチャ（Clean Architecture）は、ソフトウェアをメンテナンスしやすく、ビジネスロジックを明確に区別し、プラットフォームやフレームワークから独立させることを目的としています。クリーンアーキテクチャーを採用する際の一般的なディレクトリ構成は以下のようになります。

```sh
.
├── domain/
│   ├── entities/
│   ├── value_objects/
│   ├── repositories/
│   └── use_cases/
│       ├── interfaces/
│       └── implementations/
├── application/
│   ├── services/
│   ├── interfaces/
│   ├── dtos/
│   └── mappers/
├── infrastructure/
│   ├── persistence/
│   │   ├── repositories/
│   │   └── models/
│   ├── web/
│   │   ├── controllers/
│   │   └── views/
│   ├── cli/
│   └── external_services/
└── presentation/
    ├── cli/
    ├── web/
    └── api/
```

- **domain**: これは、アプリケーションのビジネスロジックが含まれる中心的なレイヤーです。ここには、アプリケーションが扱うエンティティ、バリューオブジェクト、リポジトリのインターフェイス、およびユースケースが含まれます。
- **application**: アプリケーションのユースケースをオーケストレーションするサービス層であり、ドメインレイヤーとインフラストラクチャレイヤーの間のメディエーターとして機能します。
- **infrastructure**: データベース、ウェブフレームワーク、外部APIとの統合など、外部の世界との接続ポイントを提供します。
- **presentation**: エンドユーザーに対するインタフェースを提供します。これにはウェブアプリケーションのUI、APIエンドポイント、CLIなどが含まれます。

クリーンアーキテクチャーの実装は、採用する技術スタックやチームの好みによっても変わってきます。したがって、上記のディレクトリ構造はあくまで一例であり、プロジェクトのニーズに応じて調整することが重要です。実装の詳細や、特定のプログラミング言語やフレームワークに対するクリーンアーキテクチャの適用方法については、さらにリサーチする必要があります。

## 大事なこと

クリーンアーキテクチャーでは、依存関係が**外側へ向かってのみ**発生することが原則。  
つまり、コードは**内側のレイヤー（より高レベルのポリシーを持つ）に依存することはできますが、外側のレイヤー（より詳細な実装を持つ）に依存することはできません。**これを「依存関係の逆転の原則（Dependency Inversion Principle）」と呼びます。

例（内側のレイヤー（より高レベルのポリシーを持つ）に依存することはできますが、外側のレイヤー（より詳細な実装を持つ）に依存することはできません。）  
```ts
// Domain Layer (内側レイヤー)
// user.entity.ts
export class User {
  constructor(public id: string, public name: string) {}
}

// user.repository.ts
export interface UserRepository {
  findById(userId: string): User | undefined;
  save(user: User): void;
}

// Application Layer
// UserService（アプリケーションレイヤー）はUserRepositoryインターフェース（ドメインレイヤー）に依存していますが、具体的なSqlUserRepository実装（インフラストラクチャレイヤー）には依存していません。依存関係はインターフェースを通じて逆転しています。

// user.service.ts
import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user.entity";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  public getUser(userId: string): User | undefined {
    return this.userRepository.findById(userId);
  }

  public createUser(user: User): void {
    this.userRepository.save(user);
  }
}

// Infrastructure Layer (外側レイヤー)
// user.repository.impl.ts
import { User } from "../domain/user.entity";
import { UserRepository } from "../domain/user.repository";

export class SqlUserRepository implements UserRepository {
  findById(userId: string): User | undefined {
    // Implement the logic to find a user by ID using SQL
  }

  save(user: User): void {
    // Implement the logic to save a user using SQL
  }
}

// プレゼンテーションレイヤー（コントローラー）
// プレゼンテーションレイヤーであるuser.controller.tsは、ユーザーを取得するためにUserServiceに依存しています。ここでの依存もインターフェースを介しており、アプリケーションレイヤーからドメインレイヤーへと内側に向かっています。
// user.controller.ts
import { UserService } from "../application/user.service";
import { SqlUserRepository } from "../infrastructure/user.repository.impl";

const userRepository = new SqlUserRepository();
const userService = new UserService(userRepository);

export function getUserEndpoint(userId: string): User | undefined {
  return userService.getUser(userId);
}
```


## 代表的な上位のレイヤーから下位のレイヤー

上位のレイヤーから下位のレイヤーを並べる一般的な例を示します。ただし、具体的なアプリケーションやアーキテクチャによって異なる場合もあることをご了承ください。

1. ドメイン層（Domain Layer）: ビジネスルールやドメインモデルを表現し、ビジネスロジックを実装します。
2. アプリケーション層（Application Layer）: ユースケース（Use Case）やアプリケーションサービスを実装します。ドメイン層を呼び出してビジネスロジックを実行します。
3. インターフェイス層（Interface Layer）: ユーザーインターフェイスや外部システムとのやり取りを担当します。Web APIやUIコンポーネントなどが含まれます。
4. インフラストラクチャ層（Infrastructure Layer）: データベースや外部API、ファイルシステムなどの外部リソースとのやり取りを行います。

このような並び順になりますが、実際のアプリケーションによってはさらに細かなレイヤーや構造が存在する場合もあります。重要なのは、依存関係が上位のレイヤーから下位のレイヤーに向かっていることであり、上位のレイヤーは下位のレイヤーに依存せず、下位のレイヤーは上位のレイヤーに依存することです。これにより、各レイヤーが疎結合であり、変更やテストが容易になります。

## 実現できること

クリーンアーキテクチャはソフトウェアを**レイヤー**に分離することで**関心事の分離を実現**し以下の特性を持ったシステムを生み出す。

- フレームワーク非依存：システムをフレームワークの制約で縛るのではなく、フレームワークをツールとして使用する
- テスト可能：ビジネスルールはUIやDB、サーバー、その他の外部要素がなくてもテストできる
- UI非依存：UIはシステムの他の部分を変更することなく、簡単に変更できる
- データベース非依存：ビジネスルールはDBに束縛されていない
- 外部エージェント非依存：ビジネスルールは外界のインターフェイスについて何も知らない

## 重要なこと

重要なのは依存関係が**上位のレイヤーから下位のレイヤーに向かっていることであり、上位のレイヤーは下位のレイヤーに依存せず、下位のレイヤーは上位のレイヤーに依存すること。**

## 設計中に崩れ始める兆候

クリーンアーキテクチャでは**依存関係の方向が内側から外側に向かうように設計すること**が推奨されている。  
一般的に、上位のレイヤーは下位のレイヤーに依存することは許容されますが、下位のレイヤーは上位のレイヤーに依存しないようにすることが理想的。

したがって、Usecase同士が互いに依存し合うのは、クリーンアーキテクチャにおいては望ましくありません。Usecase同士の依存関係が発生する場合、それは設計上の問題の兆候となる可能性があります。

Usecase同士の依存関係が生じる場合、それらの依存関係を再評価して、より適切な設計を考えることをオススメ。  
たとえば、依存関係を持つUsecaseを統合する新しいUsecaseを作成する、依存関係を共通の抽象インターフェイスに置き換える、または依存関係を外部のフレームワークやライブラリに移譲するなどのアプローチが考えられます。

依存関係を整理し、クリーンアーキテクチャの原則に従った設計を行うことで、コードのテスト容易性、保守性、拡張性を向上させることができます。

## 種類

同じ考え方を持ったアーキテクチャに「オニオンアーキテクチャ、ヘキサゴナルアーキテクチャ、レイヤードアーキテクチャ」等がありますが、クリーンアーキテクチャは**これらの概念を統合する為**に作られたアーキテクチャです。

## ドメイン(Domain)
[参考URL](https://shanari-shanari.com/2021/08/20210815_techs_01/)

Domainはビジネス側で定義するもっとも重要な定義。
ビジネス側というのは、たとえばソフトウェア開発については素人だけど、そのソフトウェアを使う分野に長けている人のことを指します。
銀行システムを作るとしたら、ビジネス側の人は倍返しが好きそうな銀行の行員など。
DDDの思想として、Domainは開発者側だけではなく**ビジネス側の人間にも理解できるように設計するというのがある**


## フレームワーク＆ドライバー層
