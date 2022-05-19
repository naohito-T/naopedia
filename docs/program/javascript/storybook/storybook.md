# Storybook

[リファレンス](https://storybook.js.org/blog/get-started-with-storybook-and-next-js/)

## Storybookと他jsフレームワークの関係

Next.jsとStorybookには、非常に互換性のあるコンポーネントモデルがある。
Next.jsは**ページのコンポーネント**を使用し、Storybookは**ドキュメントとテストのコンポーネント**を使用する。
これにより、StorybookはNext.jsの優れたコンポーネント駆動型開発環境になります。

## ストーリの書き方

2種類ある
CSF : Component Story Format（最新）
Stories Of API

CSFはStorybook5.2から追加された比較的新しい書き方です。現在はこちらが推奨されています。
またaddon-docを使えば、MDXとして書くこともできる。

## Storybookでの webpack

[リファレンス](https://storybook.js.org/docs/react/builders/webpack)

>webpackFinalにフィールドを指定することで、StorybookのWebpackセットアップをカスタマイズできます。.storybook/main.jsファイル。

webpack構成の正確な情報を知ることができるコマンド
```sh
## Development mode
$ yarn start-storybook --debug-webpack

## Production mode
$ yarn build-storybook --debug-webpack
```

---

## Storybook プレビューについて

Storybookのプレビューは**iframe**になっており、ストーリーで設定したコンポーネントが表示される。
Storybookは実際のサイト上での開発ではないが、CSSが同じものをベースに作らないと表示崩れを起こすので、ベースCSSを任意のものに変えることはスタイルを設定する上で非常に重要

### Storybook プレビューにカスタムCSSを読み込ませる

[参考URL](https://qiita.com/judah/items/ee735a899bf3782d7222)

---

## Tips

[参考URL](https://blog.microcms.io/storybook-react-use/)