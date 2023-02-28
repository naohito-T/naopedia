# Passport
[参考URL](https://www.kwbtblog.com/entry/2019/05/04/094338#:~:text=%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E7%8A%B6%E6%85%8B-,Passport.,%E3%81%95%E3%82%8C%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%AA%E3%82%8B%E3%80%82)

`Passport.js`とは、Node.js+Expressで作ったWebサイトにユーザーがログインできるユーザー認証を入れるためのライブラリ。  
ユーザー認証の種類は、自分でユーザー管理する「ユーザーID＋パスワード認証」だけでなく、GoogleやTwitterなどといったSNS認証など、さまざまな種類がある。  
各種の**認証周りの実装はライブラリ化**されていて、認証の仕組みを意識しないでユーザー認証を導入することができる

## passportを理解する前にセッションを理解していないといけない。
[セッションの理解](https://www.kwbtblog.com/entry/2019/04/20/005423)

## 仕組み

- ライブラリはメイン部分とStrategy（戦略）と呼ぶ認証部分に分かれている。
- 認証の種類ごとにStrategyが分かれていて、使いたい認証のStrategyを都度インストールして使用する

```sh
# Googleだと
npm install --save passport
npm install --save passport-google-oauth20
```

## ストラテジー(戦略)

>Passportは認証のためにストラテジーと呼ばれるものを認証に使用します。 ストラテジーは、ユーザーIDとパスワードを用いた検証や、OAuthを用いた権限付与、OpenIDを用いた分散認証を実装しています。

## ログイン状態の仕組み

Passport.jsは一般的に、セッション（session）と組み合わせて使用する。  
セッションと組み合わせて使用し、一度認証が完了するとログイン状態はセッションとして保存され、2回目以降のアクセスでは**セッションIDからユーザーデータが復元**され、ログイン状態が維持されるようになる。

## ２回目以降の、アクセスからユーザーデータ取得までの流れ

- passportをExpressのミドルウェアで使用する。すると、ユーザーがログインしていれば「req.user」にユーザーデータが格納されるようになる。
- 「req.user」が存在するかをチェックして、ユーザーがログインしているかを判断し、ログインしていないならログインページにリダイレクトするなどの処理を書く
- 都度ユーザーがログインしているかをチェックするのが面倒なら**ミドルウェア化**しても良い

## passportとStrategyの紐づけ

- passportとStrategyの紐づけは`passport.use(new Strategy(～))`で行う。
- new Strategy()の2番目の引数に**認証が成功した後に呼ばれる関数**を定義する

ストラテジーは検証用コールバック（verify callback）と呼ばれるものを必要とします。  
このコールバックの目的は、認証情報を照合し、ユーザーを特定することです。

## passport.session()
[passport.session()が実際に行っていること](https://applingo.tokyo/article/1700)

`app.use(passport.session())`は、`app.use(passport.authenticate('session'))`
と同じ。  
つまり、sessionでアクセス認証を行っている。
また`req.user`を管理していてクライアントCookieから`session id`を読み込んでそれをもとにユーザー情報へ`deserialize`している。



## passportとセッションの紐づけ

- セッションIDとユニークユーザー識別子を紐づけて、セッションデータとして保存する。
- ユーザーデータから、ユニークユーザー識別子を取り出して、セッションIDと紐づけする方法を、passport.serializerUser()で定義する

passportには、ユーザ情報を**セッションに保存するシリアライズ**  
IDからユーザ情報を特定し、req.userに格納する**デシリアライズと**いう機能があります。

```ts
// シリアライズ
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// デシリアライズ
passport.deserializeUser(async function(id, done) {
  await User.findById(id, function(err, user) {
    done(err, user);
  });
});
```



## 認証を実装(ログイン)
[Express.js(Node.js)で認証(ハッシュ化/JWT)](https://www.memory-lovers.blog/entry/2021/11/19/033401)

パスワードのハッシュ化やJWTトークン周りは自前で用意する必要がある。
以下がセオリー
- パスワードのハッシュ化はBcrypt or Crypto
- JWTトークンはjsonwebtoken

## さまざまなモジュール

- email, passport認証で使いたいとき（passport-localで使える）
[passport-local](https://knimon-software.github.io/www.passportjs.org/guide/username-password/)