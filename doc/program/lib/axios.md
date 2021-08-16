# axios

## axios とは

JS の HTTP 通信 API のデファクトスタンダード
axios は Promise ベースの HTTP Client ライブラリで GET や POST の HTTP リクエストを使って
サーバからデータの取得・講師を行うライブラリ

> async, await を利用した場合は上記の基本書式と記述方法が変わり、try,catch を利用します。

axios は Browser・Node.js の両方で利用可能な Promise ベースの HTTP クライアント

> Browser では XMLHttpRequest でリクエストします。
> Node.js では HTTP モジュール でリクエストします。

## interceptors

intercept は途中で捕まえるといった意味。

```js
import axios from "axios";

axios.interceptors.request.use((request) => {
  console.log(request.url);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log(response.url);
  return response;
});

axios
  .post("/path")
  .then(() => {
    console.log("ok");
  })
  .catch(() => {
    console.log("ng");
  });

// 1. interceptors.requestのログ
// 2. interceptors.responseのログ
// 3. then()のログ
```
