# animation

[参考](https://ics.media/entry/7162/)

HTML5でモーションを作成するときにトゥイーンライブラリを使用する

## 歴史
過去はFlashが全盛期だった

## 現在
Flashはなくなった。

## GSAP(グリーン・ソック・アニメーション・プラットフォーム)

Flash全盛の時代から存在する歴史あるトゥイーンライブラリ
GSAPはCSS/HTML5 Canvas/WebGLなどさまざまなアニメーション作成に利用できる。
類似トゥイーンライブラリよりも高機能であり、かつ実行パフォーマンスも優れているのが魅力的。
「GSAP」はかつてのTweenMax（高機能なトゥイーンライブラリ）やTweenLite（機能をシンプルした軽量なライブラリ）を統合したJSライブラリ
ウェブの古い記事では「TweenMax」で紹介されていることがありますが、「GSAP」は同じJSライブラリです。


## HTML5 Canvas

これはCanvasだけで作成するのは冗長でかなり大変となるため
現在はcreateJSで作成するらしい

HTML5のCanvas要素(JavaScriptではcanvasRenderingContext2Dオブジェクト)は従来Flashで制作してきたようなコンテンツの作成を可能にした。

HTML5 Canvas(Context2D)についてはCreateJSを使用するといい。

## HTML5 CanvasとWebGLの使い分け

[参考URL](https://ics.media/entry/5140/)
## WebGL

[WebGL入(MDN Web Docs)](https://developer.mozilla.org/ja/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL)

これは勘違いWebGL=3D表現というわけではない。
WebGLが一番効果的に使える場面は3D表現であることは間違いないが、必ずしもWebGLは3D表現だけに利用されているとは限らず、WebGLは2D表現にも利用できる。

WebGLは互換性のある任意のウェブブラウザ上でプラグインを使用せずにインタラクティブな2次元および3次元のコンピューターグラフィックをレンダリングするためのJavaScript APIである。

WebGLのプログラムはJavaScriptで記述する制御コードと、コンピューターのGraphics Processing Unit(GPU)で実行する特殊効果コードで構成される。

WebGLについてはJSライブラリPixi.jsなど、使うといい。
## WebGPU

>WebGLを先に知らないといけない。

WebGPUは画像処理と計算処理のアクセラレーション(処理を高める)のための将来のウェブ標準およびJavaScript APIのためのワーキングネームa
