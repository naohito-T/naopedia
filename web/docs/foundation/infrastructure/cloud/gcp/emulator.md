# Emulate

firebaseの仕組みをローカルで実行できる
emulatorsではfirestoreとfunctionsは初期化が別で必用。
そのため、firebase initではfirestoreとfunctionsを選択すること

`$ firebase init`
FirestoreとEmulatorsを選択

>Cloud FunctionsやHostingを起動するためにはそれぞれの初期化が必要となります

`$ firebase emulators:start`
emulators:startコマンドはローカルプロジェクトで `firebase init` を使用して初期化したプロダクトに基づいて、Cloud Functions、Cloud Firestore、Realtime Database、Firebase Hostingのエミュレータを起動する。

特定のエミュレータを起動する場合は --onlyフラグを使用する
`$ firebase emulators:start --only functions`

## ロギング

エミュレータは関数からのログを実行中のターミナル ウィンドウにストリーミングします。関数内のconsole.log()、console.info()、console.error()、console.warn() のステートメントからの出力がすべて表示されます。

---

## データの保存と読み込み(インポート、エクスポート)

基本的に**データはエミュレーター終了と共に破棄される**が、保存して同じ内容を読み込みなおしたりもできる。
>手動でアプリの挙動を試しまくるときとか E2E の試験とかで役立つと思います。

## 保存（エクスポート）

エミュレーターが起動している状態で、別のターミナルから以下を叩く
`$ npx firebase emulators:export path/to/export`
指定のディレクトリー配下にファイルが出力されます。JSONかと思ったらバイナリ

## 読み込み(インポート)

エミュレーターを起動する際に --importオプションを加え、エクスポートしたディレクトリーを指定します。
`$ npx firebase emulators:start --import=path/to/export`

## 自動保存

--export-on-exitオプションを与えるとエミュレーター終了時に自動で保存というのもできます。アプリを動かしながら試行錯誤するときに便利。
