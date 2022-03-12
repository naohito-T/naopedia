# Emulate

firebaseの仕組みをローカルで実行できる

`$ firebase emulators:start`
emulators:startコマンドはローカルプロジェクトで`firebase init`を使用して初期化したプロダクトに基づいて、Cloud Functions、Cloud Firestore、Realtime Database、Firebase Hosting のエミュレータを起動する。

特定のエミュレータを起動する場合は --only フラグを使用する
`$ firebase emulators:start --only functions`

## ロギング

エミュレータは関数からのログを実行中のターミナル ウィンドウにストリーミングします。関数内の console.log()、console.info()、console.error()、console.warn() のステートメントからの出力がすべて表示されます。

