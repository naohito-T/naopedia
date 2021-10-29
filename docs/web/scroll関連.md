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

## 画面全体を横スクロールにする。

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

## 画面のスクロールに追従するものを作る

今まではJSで実装していたとのことだが、現在はCSSでも実装できる。
以下プロパティで実装可能。

[CSSだけで実現する](https://www.miso.blog/css-position-sticky/)

- position fixed と sticky違い

- position: fixedの仕様
ウィンドウ全体の左上を基準にした絶対位置に配置される。
固定ヘッダーを作成するときなど使用するとのこと。
- position: fixed 注意
fixedを指定したコンテンツは高さが無くなるため後に続く要素が下に埋もれてしまう。
この場合メインコンテンツにpadding等でheaderの高さ分余白をとると疑似的に回避できる。

- position: stickyの仕様
fixedがウィンドウ全体を基準にしているのに対し、
stickyは親要素の幅、高さを基準に固定されます。
※stickyを指定した要素をスティッキーアイテム、その親要素をスティッキーコンテナとも呼びます。
②高さが無くならない
先ほどfixedでは高さが無くなってしまうため、後続のコンテンツに余白を設ける必要がありましたが
高さは保持したままなので、余白等の指定は要りません、
親要素（スティッキーコンテナ）に
overflow:hidden;、overflow:auto;があるとstickyが効きません。

## スクロールバーについて

[スクロールバーをカスタマイズする](https://kouhekikyozou.com/css_scrollbar_design)


## いけてるマウスカーソルを作成

[参考URL](https://www.evoworx.co.jp/blog/mouse-stoker-gsap/)

