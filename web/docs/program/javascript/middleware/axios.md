# axios

[リファレンス](https://axios-http.com/docs/intro)

## axios とは

axiosは `Browser・Node.js` の両方で利用可能なPromiseベースのHTTPクライアント
> Browser では XMLHttpRequest でリクエストします。
> Node.js では HTTP モジュール でリクエストします。

## interceptors

interceptは途中で捕まえるといった意味。

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

## errorハンドリングについて

[参考URL](https://qiita.com/yuta-katayama-23/items/5b8bf72236eec9cadf41)

エラーになるパターン

1. responseがある（undefinedではない）
2. responseがundefined

1 APIのrequestは有効でresposeも返ってくるがHTTP Statusが200ではない。
2 APIのrequestは有効だが何らかの理由でresponseが返ってこない。そもそもAPIをcallしようとしたがその前にエラー
つまり、AxiosErrorのresponseがundefinedになる・ならないの2つで場合分けが必要という事。

## axiosとNode fetchの違い

[参考URL](https://zenn.dev/syu/articles/9840082d1a6633)

fetch
errorコードがレスポンスされてもレスポンスがあったってことで処理される。

axios
errorコードがレスポンスされるとthenが処理されない。

## application/x-www-form-urlencoded形式でPOSTする

application/x-www-form-urlencoded形式でPOSTする場合は、URLSearchParamsを使用する。

```ts
var params = new URLSearchParams()
params.append('id', 123)
params.append('name', 'Yamada Tarou')
const res = await axios.post('/user', params)
```

## ファイルをアップロードする

```ts
var params = new FormData()
var file = document.getElementById("file-input")

params.append('file', file.files[0])
const res = await axios.post(url, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
```
