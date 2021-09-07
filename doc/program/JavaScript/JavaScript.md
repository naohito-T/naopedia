# JavaScript

js の演算子ドキュメント
[リファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Expressions_and_Operators)

## JS 配列メソッド一

[JS 配列メソッド一覧がすぐ見えるサイト](https://www.wakuwakubank.com/posts/280-javascript-array-helper/)


## async await 



```
// axiosでjson取得
export const ApiGet_Simple = (async (url:string) => {
  try {
    // 指定URLにGET
    const res = await axios.get<jsonType[]>(url);
    // (↑のawaitがついていると関数が実行完了するまで↓を動作しない仕組み)
    // 動作が完了して、リターンしてきたjsonを返す
    return res;
  } catch (err) {
    // 途中でエラーが出たら強制でエラーをスロー
    throw new Error(err.status);
  }
});