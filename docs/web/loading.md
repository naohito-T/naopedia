# loading 画面

[参考URL](https://www.webcreatorbox.com/tech/loading-animation)

## loading画面仕組み 大枠

まずは、画面に表示するコンテンツを用意する必要がある。

1. コンテンツの上部に表示させる、divおよびsvg、GIFなど用意する
2. アニメーションは@keyframeを使って表現する。
3. jsで制御させる

3.の例
```js
window.onload = function() {
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded'); // 読み込み終了
}
```
