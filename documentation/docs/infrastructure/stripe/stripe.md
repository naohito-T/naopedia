# Stripe

[Stripe Docs](https://stripe.com/docs/stripe-cli)
[Stripe card Docs](https://stripe.com/docs/testing#cards)

決済代行サービス（類似サービスとしてはPayPalがある）
stripeのAPIを使うと、自身のサービスの決済処理を担ってくれる。

ユーザーにお金を請求してその支払を受け取りたい！
「買切り」や「定額プラン」を設定して請求したい！

といったことが可能となる。
>私がstripeの特に良いと思ったところは、ユーザーがstripeのアカウントがなくても支払ができるということです。

localで3D secureをしたい

3dセキュアは本人認証後、Stripeに送信されStripeで認証が取れたことを確認した後、Webhookでどこかに送信する流れ、
そのためapi側ではwebhookを受けた後、その処理をする必要がある。
localではそれができないが、Stripe CLIを使えばそれを実行できる。

---

## RailsでのStripeの実装

[参考URL](https://qiita.com/tomokazu0112/items/89f69c47761ac782ce13#%E9%A1%A7%E5%AE%A2%E7%99%BB%E9%8C%B2)

顧客情報をstripeに登録し、その際に作られた顧客IDを中心にその他の課金等の処理を実行する
というのが実装の方針となる。

>それはなぜかと言うと、この顧客ID（cus_xxxxxxxxxxxxxx）を取得してしまえば、その顧客に対して定期課金や登録しているクレジットカードの削除などの処理を行えば良いからです！

## Stripe APIを利用するための準備
