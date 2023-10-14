# SOLID原則

[TypeScriptでSOLID原則](https://www.membersedge.co.jp/blog/typescript-solid-single-responsibility-principle/#:~:text=SOLID%E5%8E%9F%E5%89%87%E3%81%A8%E3%81%AF%E3%80%81%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88,%E3%81%AE%E5%8E%9F%E5%89%87%E3%81%AE%E3%81%93%E3%81%A8%E3%81%A7%E3%81%99%E3%80%82)

SOLID原則とは、オブジェクト指向において**変更しやすい・理解しやすい・再利用しやすい**モジュール（クラスや関数などのソフトウェアを構成する部品）を設計・開発するための原則

S : The Single Responsibility Principle（単一責任の原則）
O : The Open Closed Principle（オープン・クローズドの原則）
L : The Liskov Substitution Principle（リスコフの置換原則）
I : The Interface Segregation Principle（インターフェイス分離の原則）
D : The Dependency Inversion Principle（依存性逆転の原則）

## 単一責任の原則

ソフトウェアを構成する個々のモジュールが責任を負う対象はひとつにするべきである原則

ソフトウェアの既存の機能に変更を加えたり新たな機能を追加する理由は、そのソフトウェアのユーザーやステークホルダーを満足させるためです。この「ソフトウェアのユーザーやステークホルダー」が、単一責任の原則における「モジュールが責任を負う対象」です。

```ts
// ダメな例
class Employee {
  public name: string;
  public department: string;
  // etc...
  public constructor(...) {...};
  /**
   * 給与計算のメソッド
   * 経理部門に対して責任を負っている
   */
  public calculatePay = (): Money => {...};
  /**
   * 労働時間レポートを出力するメソッド
   * 人事部門に対して責任を負っている
   */
  public reportHours = (): string => {...};
  /**
   * 従業員情報をDBに保存するメソッド
   * データベース管理者に対して責任を負っている
   */
  public save = (): void => {...};
  /**
   * 所定労働時間を算出するメソッド
   * `calculatePay`と`reportHours`の両方で必要な処理のため、メソッドに切り出して共通化している
   */
  private getRegularHours = (): number => {...};
}
```


## Solidとデザインパターンの違い

SOLID原則とデザインパターンは、ともにソフトウェア設計において良い設計をするための原則やパターンですが、目的や対象が異なります。

### SOLID原則

SOLID原則は、オブジェクト指向プログラムの設計原則の集まりで、以下の5つの原則から成り立っています。

1. **S: Single Responsibility Principle (単一責任の原則)**
   - 一つのクラスは、一つの責任だけを持つべきです。

2. **O: Open/Closed Principle (開放閉鎖の原則)**
   - ソフトウェアのエンティティ（クラス、モジュール、関数など）は、拡張に対しては開かれていて、修正に対しては閉じているべきです。

3. **L: Liskov Substitution Principle (リスコフの置換原則)**
   - サブタイプは、そのスーパータイプと置換可能であるべきです。

4. **I: Interface Segregation Principle (インターフェース分離の原則)**
   - クライアントは、不必要なインターフェースに依存するべきではありません。

5. **D: Dependency Inversion Principle (依存関係逆転の原則)**
   - 高レベルのモジュールは、低レベルのモジュールに依存すべきではなく、抽象に依存すべきです。

SOLID原則は、コードの可読性や保守性、拡張性を向上させるための基本的なガイドラインとなります。

### デザインパターン

デザインパターンは、特定の問題を解決するための一般的な設計のテンプレートやパターンです。再利用可能な設計のソリューションであり、ソフトウェア開発において一般的に遭遇する設計上の問題に対するベストプラクティスです。

代表的なデザインパターンには、以下のようなものがあります。

- **Creational Patterns (生成パターン)**
  - オブジェクトの生成方法を定義します。例：Singleton、Factory Method、Abstract Factory、Builder、Prototype。

- **Structural Patterns (構造パターン)**
  - クラスやオブジェクトの組み合わせ方を定義します。例：Adapter、Bridge、Composite、Decorator、Facade、Flyweight、Proxy。

- **Behavioral Patterns (振る舞いパターン)**
  - オブジェクト間の協力や責任の分担の仕方を定義します。例：Chain of Responsibility、Command、Interpreter、Iterator、Mediator、Memento、Observer、State、Strategy、Template Method、Visitor。

### まとめ

- SOLID原則は、オブジェクト指向設計の基本的な原則であり、クラス設計のガイドラインを提供します。
- デザインパターンは、特定の設計上の問題を解決するための再利用可能なソリューションです。

これらは互いに補完関係にあり、SOLID原則を守ることでデザインパターンが適切に適用されやすくなり、デザインパターンを利用することでSOLID原則に従った設計が容易になります。