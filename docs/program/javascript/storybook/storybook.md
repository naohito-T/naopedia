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


## Tips

[参考URL](https://blog.microcms.io/storybook-react-use/)