# axios

## axiosとは

JSのHTTP通信APIのデファクトスタンダード
axiosはPromiseベースのHTTP ClientライブラリでGETやPOSTのHTTPリクエストを使って
サーバからデータの取得・講師を行うライブラリ

>async, awaitを利用した場合は上記の基本書式と記述方法が変わり、try,catchを利用します。

## interceptors

interceptは途中で捕まえるといった意味。

```js
import axios from 'axios';

axios.interceptors.request.use(request => {
  console.log(request.url)
  return request
})

axios.interceptors.response.use(response => {
  console.log(response.url)
  return response
})


axios.post('/path')
.then(() => {
  console.log('ok')
})
.catch(() => {
  console.log('ng')
})

// 1. interceptors.requestのログ
// 2. interceptors.responseのログ
// 3. then()のログ
```
