# Storybook

[リファレンス](https://storybook.js.org/)
[next-react-server-components sample](https://github.com/shilman/next-react-server-components/tree/main?ref=storybookblog.ghost.io)
[next-react-server-components blog](https://storybook.js.org/blog/build-a-nextjs-app-with-rsc-msw-storybook/)

## Overview

Storybookは、UIコンポーネントの開発、テスト、およびドキュメント作成を容易にするためのオープンソースツール。  
React、Vue、Angularなどの多くのJavaScriptフレームワークと互換性があり、コンポーネント駆動開発（CDD）をサポートする。

## 主要な機能

- 独立した環境での開発
  - Storybookは、アプリケーションから切り離された独立した開発環境を提供する。これにより、コンポーネントを個別に開発およびテストが可能となる。
- ドキュメンテーション
  - 各コンポーネントの使用例や状態をドキュメントとして記録し、チーム内で共有することが可能。
- ビジュアルテスト
  - コンポーネントの外観をキャプチャし、変更があった場合に視覚的な差分を検出するテストを実行できる。
- アドオンのサポート
  - さまざまなアドオン（アクセシビリティ、レスポンシブデザイン、インタラクションテストなど）を利用して、開発プロセスを強化できる。

## 導入することで得られるメリット

1. 効率的なコンポーネント開発: 各コンポーネントを独立して開発できるため、UIコンポーネントの開発が迅速かつ効率的になる。
2. 品質の向上: コンポーネントのステートやバリエーションを明確にし、エッジケースを容易にテストできるため、バグの発見と修正がしやすくなる。
3. チーム間のコミュニケーション向上: 詳細なドキュメントとビジュアルガイドが提供されるため、デザイナー、開発者、ステークホルダー間のコミュニケーションが円滑になる。
4. 迅速なフィードバック: UIの変更がリアルタイムで確認できるため、迅速なフィードバックサイクルを実現する。
5. アクセシビリティの向上: アドオンを利用することで、アクセシビリティのチェックを組み込み、よりユーザーフレンドリーなインターフェースを提供できる。

## Storybook 8で導入された機能

- ビジュアルテストの追加
  - 新しいVisual Testsアドオンにより、UIのバグを以前よりも迅速かつ簡単に検出できる。
  - `Chromatic` というビジュアルテストクラウドサービスがStorybookにはじめて統合された。
- React Server Componentのサポート
  - React Server Componentsは、コンポーネントがサーバー上でのみレンダリングされるReactの新しいパラダイム。
  - Storybook 8では、Next.jsとの互換性を持つ実験的なサポートが導入された。
- フレームワーク固有の改善
  - React、Vue、Angular、Web Components、Svelteなど、さまざまなフレームワークに対する多くの改善が行われている。
  - たとえば、Reactには新しいdocgenライブラリが導入され、Vueには公式のVue docgenパッケージがサポートされています。また、Vite 5のサポートや、テストビルドの高速化なども含まれている。
  - React Storybookの起動時間が最大50%速くなった。
- 2〜4倍高速なテストビルド
  - Storybook 8では、Storybookの静的ビルドを2-4倍高速化する新しい「テストモード」が導入された。
- モバイルとデスクトップのUIを更新
  - StorybookのモバイルUIを全面的に見直した。
  - これで、ナビゲーションサイドバーとアドオンパネルの両方がページの下部からポップアップし、電話の親指で簡単にトリガーできるようになりました
- Chromaticの導入
  - これがデフォルトで導入された。この会社の業界標準になってからユーザーを取り込む戦略の様子。

## Storybookと他jsフレームワークの関係

Next.jsとStorybookには、非常に互換性のあるコンポーネントモデルがある。
Next.jsは**ページのコンポーネント**を使用し、Storybookは**ドキュメントとテストのコンポーネント**を使用する。
これにより、StorybookはNext.jsの優れたコンポーネント駆動型開発環境になる（parrotではatomsから大きい粒度にし作り上げていた。）

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

## Storybook deploy

静的サイトとしてエクスポートする方法
Storybookをデプロイするには、まず静的サイトとしてエクスポートします。
この機能はすでに組み込まれて、使える状態となっているので、設定について気にする必要はありません。

[リファレンス](https://storybook.js.org/tutorials/intro-to-storybook/react/ja/deploy/)

## Tips

[参考URL](https://blog.microcms.io/storybook-react-use/)
