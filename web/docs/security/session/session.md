# Session

[これは絶対に見ておけ（チートシート）](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
[セッション概要](https://www.kwbtblog.com/entry/2019/04/20/005423)

## sessionの更新

セッションはサーバー側で管理されるデータであり、セッションの更新は通常、新しいデータで既存のセッションデータを上書きする操作。  
このため、セッションの更新が行われると、以前のセッションデータは置き換えられて失われる場合がある。

セッションの更新は、セッションに関連する情報の変更や追加、削除などが行われた場合に発生することがあります。
具体的には、セッションに新しいデータが追加されたり、一部のデータが削除されたりすることがあります。セッションの更新が行われると、更新後のセッションデータが有効になり、以前のデータは失われます。

したがって、セッションの更新が行われる場合には、セッションに含まれていた以前の値が消える可能性があることに注意してください。
セッションの更新が必要な場合には、適切なデータを提供してセッションを更新する必要があります。

## HTTP通信の問題点

- HTTP通信は1回1回の単発の通信のため接続を維持できない。
- HTTP通信はユーザー識別の仕組みがないので、どのユーザーからの接続かを判別できない。なので、一連のHTTP通信で、ユーザー接続を維持し続けるには、何かしらの仕組みを実装する必要がある

## 解決方法

ユーザー認証完了後、サーバー側でユーザー識別子を発行しブラウザへのレスポンスで識別子を送る。  
次回以降ブラウザからサーバーにアクセスする際、毎回その識別子をサーバーに送ることにより、サーバー側でどのユーザーからのアクセスかがわかるようにする。  
そして、その識別子のやり取り方法の1つとして、クッキーを用いる方法がある。

## セッションについて

- セッションIDの生成方法はHTTPの仕様として定まっていない。**サーバー側の実装に依存する**
- 各プログラム言語にはメジャーなセッションライブラリがあり、セッションID生成には、それらを使うことが多い
- それらのライブラリの多くのデフォルトの実装は、セッションIDとしてユニークで推測しずらい値を生成し、それをキーとして「ユーザーID」などのユーザーデータを紐付けて、**ローカルファイルやメモリ上にキーバリューデータとして保存しておく**
- そして、ブラウザーからアクセスがあった場合、クッキーからセッションIDを読み取りセッションIDをキーに、キーバリューデータから該当するユーザーデータを復元する
- キーバリューデータをサーバーのローカルファイルやメモリに保存するため、サーバーを複数設置して負荷分散させた場合、接続毎に接続先のサーバーが変わってしまうので、セッションが維持できなくなってしまう
- なので、どのサーバーにアクセスしても適切なユーザーデータが復元できるように、キーバリューデータをローカルではなく、データベースに格納することが多い。

## Session セッション

[セッションのクッキーを設定する場合のベストプラクティス](https://blog.ohgaki.net/session-and-cookie)

セッションはCookieを使って実現するのが一般的
HTTPセッションは通常クッキーを利用して行います。クッキーを利用したセッションの場合、お薦めする設定は以下の通りです。

1. ドメイン名は指定しない

2. パスはルート（/）を指定する
パスですが、アプリの中にはURIパスを検出してパスを設定してクッキーを送るようにしている物もあります。ルート（/）とサブディレクトリ（/app1/など）にクッキーが設定されている場合、ルートの方が優先されるので安全面を考えるとルートの方が良いです。

3. セッション管理用のクッキーはセッションクッキー（有効期間0）にする
常識として知っておくべき知識です。クッキーの有効期限が0の場合、普通のブラウザは**クッキーをメモリにみ保存します。**
つまりブラウザを終了させるとクッキーが消えます。セッション管理には必ず有効期限0を指定すべきです。

4. httponly属性を付ける

5. 可能な場合は必ずsecure属性をつける

6. 複数アプリケーションを利用する場合はsession.nameまたはsession_name()でセッションクッキー名で指定する（アプリケーションzの固有名デフォルトで設定し、設定項目として変更できるようにする）

## セッション保護するために必要なこと

セッションを保護するためのベストプラクティスには、以下のようなものがあります。

セッションIDの強化: セッションIDは予測不可能である必要があります。高いエントロピーを持つランダムな値を使用し、セッションIDの生成には信頼できる暗号ライブラリを使用してください。
セッションの有効期限管理: セッションは適切なタイミングでタイムアウトするように設定すべきです。長期間活動がない場合はセッションを自動的に終了させ、ユーザーがログアウトする際にはセッションIDを無効化してください。
セキュアな通信の使用: セッションIDを含むすべての通信は、HTTPSを通じて暗号化されるべきです。これにより、中間者攻撃によるセッションIDの盗聴を防ぎます。
Cookieのセキュリティ属性の利用: HttpOnlyおよびSecure属性をセッションCookieに設定することで、クロスサイトスクリプティング（XSS）攻撃や中間者攻撃から保護できます。
セッション固定攻撃の防止: セッションIDをユーザーがログインした後に変更することで、セッション固定攻撃を防ぎます。これにより、攻撃者が事前に設定したセッションIDを使用できなくなります。
クロスサイトリクエストフォージェリ（CSRF）保護: トークンベースのCSRF保護を実装して、ユーザーが意図しないアクションを強制されるのを防ぎます。

## Session管理でやってはいけないこと

1. 有効期限の長いセッションを再ログイン用に使う
有効期限の長いセッションに良いことはない。
たとえば、公共のPCや友人のPCを使った時にブラウザを閉じてもまだログインした状態が続くのは良くありません。
自動ログインを有効にする場合は別の使い捨ての認証用クッキー（再認証用のトークン）を用い、ログインする場合に自動ログインするか、しないか選択できるようにしてユーザが制御できるようにします。ユーザが明示的にログオフした場合は再認証トークンも必ず無効にします。

2. Trans SIDを不要なのに有効にする
Trans SID（URLの書き換えによるセッション）を絶対に利用してはならない、とは言いませんが特別な理由がない限り有効にしてはなりません。ページやURLをメールなどで送信するとセッションIDが漏洩します。

最後にセッションIDは少なくとも定期的にsession_regenerate_id()で更新すべきです。ログインした時の更新は必須です。

## SPAでは？

シングルページアプリケーションの場合では以下の変更があっただけ  
セッションIDとクッキーが  
↓  
トークンとAuthヘッダーに代わった
上記の変更で暗号化されたIDから情報を取り出して確認するという基本的な考え方は同じ。
