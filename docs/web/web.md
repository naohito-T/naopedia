# web application

webアプリケーションでの機能や概念などをまとめていくディレクトリ

[色々なサイトの作り方](https://commte.net/4266)

[login 機能関連](./login.md)


## web画面遷移の仕組み

webブラウザでは`<a>`タグで示されたハイパーリンクをユーザがクリックすると画面がリンク先に繊維して、閲覧履歴にリンク先が追加される。ここでユーザが戻るボタンを押下すると、もとの画面に遷移して閲覧履歴から先のリンク先ページが削除される（pop）


## 横スクロール

[GSAP参考](https://codepen.io/GreenSock/pen/YzygYvM)
[参考ブログ](https://img-flow.com/blog/coding/animation/yokoscroll/)

[あの技術](https://qiita.com/dorarep/items/4dc8bf1684de674abaca)

## 無限スクロール

[無限スクロールは考慮することが多い](https://blog.ojisan.io/i-hate-infinite-scroll/)

## 画像をダウンロードできなくさせる

管理者で設定できることはすべて突破される。
インターネットに公開するというのはそういうこと

[参考URL](https://qiita.com/shisama/items/be0e432711de359598ed)
## hoverでのスマホ対応

[参考URL](https://pengi-n.co.jp/blog/hover/)

## font-size問題

画像など`max-width: 100%`としていると画面幅に応じてある程度大きくなるが、font-sizeなどを固定値でコーディングすると画像に比べて小さくなってしまう。
デザイナーの本来の意図を汲み取るのであれば、画面幅が広くなったときはフォントサイズなどもそれに応じて大きくなるのが一番良いのではないかという考えがある。


固定値でもいいのではないか
>ただし、個人的にfont-sizeを拡縮できるようにして思ったのはどんなプロダクトでも推奨できるものではないなということです。場合によっては初期のcss読込の際に文字サイズなどがグッと変わるのをはっきり見てとれてしまうこともあり、font-sizeがpx固定で問題ないようなプロダクトであればそれが一番いいと今は思っています。本当にfont-sizeを拡縮する必要があるか、それは一部なのか全体なのか、
>よく考えて導入することが大事だなと思いました。

## font-size