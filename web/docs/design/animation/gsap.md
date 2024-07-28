# GSAP(グリーン・ソック・アニメーション・プラットフォーム)

[参考URL](https://ics.media/entry/200805/)
[GSAPチートシート](https://greensock.com/cheatsheet/)
[リファレンス](https://greensock.com/docs/3)

Flash全盛の時代から存在する歴史あるトゥイーンライブラリ
GSAPはCSS/HTML5 Canvas/WebGLなどさまざまなアニメーション作成に利用できる。
類似トゥイーンライブラリよりも高機能であり、かつ実行パフォーマンスも優れているのが魅力的。
「GSAP」はかつてのTweenMax（高機能なトゥイーンライブラリ）やTweenLite（機能をシンプルした軽量なライブラリ）を統合したJSライブラリ
ウェブの古い記事では「TweenMax」で紹介されていることがありますが、「GSAP」は同じJSライブラリです。

## GSAP ライセンス

**Standard License**
エンドユーザーに対する利用料が無料のサービス、Webサイト、アプリなら、開発者が商用で利用しても無料
使えるプラグインは以下（現状問題なく使えた）

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

export abstract class BaseGSAP {
  protected readonly gsap: typeof gsap;

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
    this.gsap = gsap;
  }
}
```

**Business Green**
このライセンスには3段階あり、人気があるのは中間の「Shockingly Green」
Shockingly Green会員は商用ライセンス（有料販売するアプリやサービスなどで必要）をのぞき付加的なプラグインとオプションをすべて利用できる

## アニメーションを作成するアプローチ

**Physics engine**
Webでは高出力すぎ、ゲームなどの分野で使われる
ほとんどの場合、Webアニメーションを作成するために**物理エンジンの使用はやりすぎ**
物理エンジンの応用分野はゲーム産業・または化学的活動

**Frame by frame sprite sheets**
よくわからん

**Tweening(inbetweening)**
Webでアニメーションを作成するときの一番の分野

---

## GSAP 単語

単語というかアニメーション界隈では当たり前の用語

duration: 存続期間（gsapだとアニメーションの時間）
delay: 遅延
repeat: -1は無限の意味
distance: 距離
イージング: **動きの加減速を示す**
タイムリマップ: **再生途中に一瞬スローモーションへなる。これはタイムリマップ(タイムストレッチやタイムワープ)と呼ばれている演出手法。**

## GSAPのdefault値

default settings

duration(0.5), ease('power1.out')

---

## Tween(Tweening(inbetweening)の種類

Webではこの概念を使用し作成する

**静的な開始と終了の間のすべての中間フレーム**は、さまざまなプロパティの補完を使用して計算される

考えとしてはこれ

Key frame → frame → frame → frame → Key frame
この**frameのプロセスをTween**という。

ひとつのtweenをまとめると

- ターゲットオブジェクト
- アニメーションの長さ
- キーフレーム
- およびその他のプロパティ

### key frame

**キーフレームとは、CGのアニメーションの中で主となる変化が定義されているフレームのこと。**物体の形や位置の変化ポイントが指定され、その間を補完することで滑らかな動画像が作成される。**動画の再生に何らかの変化を起こすフレームアクションは、キーフレームにしか設定できない。**

アニメーションやコンピューターーグラフィックに置いて、**動画像の作成や記録の基点となるフレーム**
キーフレーム間の画像を保管することでアニメーションを作成したり、キーフレームからのずれ（差分フレーム）のみを記録することで動画データを圧縮できる。

### GSAPでのTween 作成

from: スタートの状態を指定します（現在の状態に戻るアニメーション）
to: ゴールの状態を指定します（現在の状態からのアニメーション）
fromTo: 指定した状態（初期状態）から、指定した状態（完了状態）にアニメーションさせる。
durationは完了状態の方で指定（**開始パラメーターと終了パラメーターを自分で指定する**）
set: 状態を指定します（CSSを使わずに、GSAP内で指定できる※この状態からtoへいく）fromは、実行されると初期状態に戻るアニメーションが起きてしまうので、位置は変更してそのままの状態に使う。

## ease(イージング)

[GreenSock Ease Visualizer](https://greensock.com/docs/v3/Eases)

イージングとは**動きの加減速を示す**用語で、アニメーションにおいては**動きの性格**を表すもの
適切なイージングを設定することで、ユーザへ与える印象が変わる。
世界観やユーザ体験をデザインする上でイージングは欠かせない要素。

---

## Timeline

タイムラインは情報を整理する方法
**イベントを時系列に並べることによって**情報を整理する方法

### position parameter

[リファレンス](https://greensock.com/position-parameter/)

position parameterでタイムラインの情報の整理を少しずらせる。

```js
let animation = gsap.timeline();
animation
    .to("#star", { duration: 2, x: 1150 })
    .to("#star", { duration: 2, x: 1150 }, "+=1") // 末尾をposition parameterという。これのおかげでタイムラインの情報の整理を少しずれせる。この場合は1秒後でずらす。
    .to("#star", { duration: 2, x: 1150 })
```

### timelineを制御するmethod一覧

```js
play() // 再生を開始する(オプションで特定の時間から制御することが可能)
pause() // アニメーションを止める(オプションで特定の時間に移動するオプションがある。)
restart() // 再起動が実行され、最初から純方向に再生を開始する。
seek() // 特定の時間にジャンプする
reerse() //
resume() // 方向を変更せずに再生を再開する

```

---

## タイムリマップとは

**再生途中に一瞬スローモーションへなる。これをタイムリマップ(タイムストレッチやタイムワープ)と呼ばれている演出手法。**

考え方は下図の通りで、モーションシーケンスのいち部分だけをゆっくり再生させるｋとでその部分だけがスローモーションとなり、全体的に緩急のある動きに仕上げることができる。

**プログラムによってタイムリマップを実現する最大のメリットはフレームレートが落ちないという点**

## gsapでのイージング

GSAPは初めからイージングがかかっている

## gsap 基本機能(プロパティ一覧)

[参考URL](https://designsupply-web.com/media/programming/6916/)
gsapの**アニメーションの長さは設定されていない場合は、default 0.5秒**

opacity 透明度(0～1の間)
x x軸方向に移動(単位はpx) ※translateX()のショートカット
y y軸方向に移動(単位はpx) ※translateY()のショートカット
scale 大きさ(単位は倍)
width 数値の他に、"auto"に対してもアニメーションできる
height 数値の他に、"auto"に対してもアニメーションできる
top 上配置
left 左配置
backgroundColor 背景色
margin マージン
padding パディング
rotation 回転
skew 傾斜変形

## from

スタートの状態を表す

```js
gsap.from(
  アニメーションさせる要素,

  //初期状態
  {
    プロパティ名:値,
    プロパティ名:値,
    ...
  },
);
```

## to

ゴールの状態を表す(現在の状態からのゴール)

```js
gsap.to(
  アニメーションさせる要素,

  //完了状態
  {
    プロパティ名:値,
    プロパティ名:値,
    ...
    },

  アニメーション開始時間(秒単位)
);
```

- fromTo
fromとtoのあわせ技です
指定した状態(初期状態)から、指定した状態(完了状態)にアニメーションさせます
durationは完了状態の方で指定します

```js
gsap.fromTo(
  アニメーションさせる要素,

  //初期状態
  {
    プロパティ名:値,
    プロパティ名:値,
    ...
  },

  //完了状態
  {
    プロパティ名:値,
    プロパティ名:値,
    ...
  },
)
```

- set

```js
gsap.set(
  位置を決める要素,

  //アニメーションさせない静止状態を指定する
  {
    プロパティ名:値,
    プロパティ名:値,
    ...,
  },
);
```

状態を指定します
(CSSを使わずに、GSAP内で指定できます)
fromは、実行されると初期状態に戻るアニメーションが起きてしまうので、位置は変更してそのままにしたい時に使います

## toggleActions

toggleActionsで指定できるものは以下。

play … アニメーションをスタートさせる
pause … 一時停止
resume … アニメーションを再開させる
reset … アニメーション開始直前の状態に戻す
restart … はじめに戻ってアニメーションを開始
complete … アニメーション直後の状態にする
reverse … アニメーションを逆再生する
none … 何も指定しない

```ts
toggleActions: 'play pause resume reverse',
```

一番左から順番に説明していきます。

① onEnter（上の例ではplayの部分）
スクロール位置が「開始」を超えて下に移動したときのコールバック（通常、トリガーがスクロールされて表示されたとき）

② onLeave（上の例ではpauseの部分）
スクロール位置が「終了」を超えて下に移動したときのコールバック（通常、トリガーがスクロールして表示されなくなったとき）

③ onEnterBack（上の例ではresumeの部分）
スクロール位置が「終了」を超えて上に移動したときのコールバック（通常、トリガーがスクロールしてビューに戻ったとき）

④ onLeaveBack（上の例ではreverseの部分）
スクロール位置が「開始」を超えて上に移動したときのコールバック（通常、トリガーが開始を超えて後方にスクロールされたとき）

## ScrollTrigger 独立型

[参考URL](https://devsakaso.com/gsap-scrolltrigger-pin/)

```ts
ScrollTrigger.create({
  trigger: '.b2',
  pin: true,
  markers: true,
  // end: 'bottom 30%' //などと設定するとfixedの期間がより短くなる
})
```

pinは、gsapのscrollTriggerとは独立して生成できます。
ScrollTriggerと大文字なので注意しましょう。
pinはリンクさせる必要がないので大文字ScrollTriggerでcreateできます。
pinはposition: fixedが付与されることで、固定できます。
そして、triggerに指定した要素の高さを超えると動き出します。

## ScrollTrigger プロパティ一覧

[参考URL](https://qiita.com/heeroo_ymsw/items/ae22e4cee8c6a08ff852)
