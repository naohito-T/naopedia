# デザイン

## インタラクションデザインとは

[参考URL](https://pantograph.co.jp/blog/uiux/interaction_design.html)
Webサイトやアプリのデザインにおいて、インタラクションデザインという言葉が台頭するようになった。
>インタラクション （interaction）とは、日本語で「相互作用」と訳されます
>IT用語としてはuserが特定の操作を行ったとき、システムがその操作に応じた反応を返すことという意味で使用される

つまり
**インタラクションデザインは機器やソフトウェアなどが使われる際のユーザ側の操作やシステム側の反応などをデザインすることといえる。**

## インタラクションデザインとUXデザインの違い

>インタラクションデザインと同じく、Webサイトやアプリのデザインに関して最近よく聞く言葉に、UXデザインがあります。
>この2つの違いは概念の大きさであり、インタラクションデザインのほうが、より狭い意味を持ちます。
>UXデザインは、ユーザー エクスペリエンス（User Experience）の略で、ユーザーが製品やサービスを通じて得られる体験をデザインすることです。
>一方、インタラクションデザインは、最終的にユーザーの体験に関わるものの、あくまでユーザーが知覚して操作することに関わる範囲のデザインに限定されます。
>つまり、インタラクションデザインはUXデザインの一部といえます。

- インタラクションデザインの原則

1. 説明がなくても操作できること

>いちいち説明文を読まなくても、直感的に操作できるものは優れたデザインです。これを**「アフォーダンス」**といいます。
>日常生活で身近なデザインは、多くの人が直感的に使用できる形になっているため、そのままアプリやwebサイトでのデザインに応用できます。
>例えば、代表的なものに「ボタン」があります。
>ほとんどの人は「ボタン＝押す」という認識を持っているため、画面上にボタンを設置すれば、ユーザーは悩まずに「押す」という行動をとってくれる、というわけです。

1. 操作がしやすいこと

アプリやwebサイトのデザインでは、ユーザーの行動やデバイスの種類に応じて、機能や配置などを考える必要があります。

2. レスポンスにかかる時間が適切であること
3. 定型パターンを活用すること


## designを学ぶ順番

![](../program/js/image/threejs.png)


## Webでのパフォーマンス

HTML,CSSで実装できるか考える。JSはもちろん重い。
そのWebアプリによってユーザが表示にかけられる時間が変わる。意識しないといけない。
CADがブラウザでできます。とかなら目的があり待てるが、ネットサーフィンとかの目的だと待てる時間は小さくなる。

## Webでの画像の取り扱い

JPGはCPU上でデコードされてフルサイズでGPUに乗る(pngも)
→つまりJPGをPNGに変えたことでWebのパフォーマンスなんて上がらない。
いくつかのフォーマットは圧縮されたままVRAMに乗せることができる(これ知りたい)
