# topへ戻るbutton

## やるための汎用的な条件

```js
const returnTop = () => {
  scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
```

## 横スクロール

[jQueryで使う](https://dsinside.digitalstage.jp/entry/2021/07/07/111850)

[仕組みについて詳しく](http://www.html5-memo.com/jquery-tips/jquery16/)

- 横スクロールの仕組みから知る
スクロールバーやマウスホイールによる上下スクロールの処理をキャンセルし、カラムコンテナを左右移動させることであたかもスクリーンが左右にスクロールしているかのように見せることができる。

- 手順

1. HTML上でコンテンツカラムを用意してカラムコンテナに格納する。
2. それぞれのコンテンツカラムを横に並べ、それぞれの縦横サイズをスクリーンサイズにあわせ、また配置位置座標を任意の記憶領域に格納しておく
3. マウスホイール、スワイプなど、ユーザによるスクロール操作が行われた場合は、デフォルトの処理をキャンセルし、左右スクロール用の処理を実行する。
4. ナビゲーションメニューによるダイレクトリンク機能と現在地機能を実装する。

## マウスの上と下のスクロールを判断する

マウスの値を上に回した場合は正の値がscrollLeftに入るため、スクロールの値を反転させないといけなかった。

[参考URL](http://www.openspc2.org/JavaScript/reference4/event/wheelDelta/index.html)

以下はデモ

```js
window.onmousewheel = function(event){
	if(event.wheelDelta > 0){
	//mainCamera.zoomTo(4, 100);
	}else{
		//mainCamera.zoomTo(1, 100);
	}
}
```

- マイナスの値をプラスの値に変更する

```js
let n1 = -(12);
let n2 = -(-10);

console.log(n1,n2);
//-12,10
```
