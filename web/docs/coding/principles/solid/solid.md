# SOLID原則

[TypeScriptでSOLID原則](https://www.membersedge.co.jp/blog/typescript-solid-single-responsibility-principle/#:~:text=SOLID%E5%8E%9F%E5%89%87%E3%81%A8%E3%81%AF%E3%80%81%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88,%E3%81%AE%E5%8E%9F%E5%89%87%E3%81%AE%E3%81%93%E3%81%A8%E3%81%A7%E3%81%99%E3%80%82)

SOLID原則とは、オブジェクト指向において**変更しやすい・理解しやすい・再利用しやすい**モジュール（クラスや関数などのソフトウェアを構成する部品）を設計・開発するための原則

S : The Single Responsibility Principle（単一責任の原則）
O : The Open Closed Principle（オープン・クローズドの原則）
L : The Liskov Substitution Principle（リスコフの置換原則）
I : The Interface Segregation Principle（インターフェース分離の原則）
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
