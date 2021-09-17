# Babel

[参考URL](https://ics.media/entry/16028/)

>ECMAScript 2015(略：ES2015)以上の言語仕様でJavaScriptを書くことが、昨今のウェブのフロントエンドエンジニアの基本テクニックです。しかし、ECMAScript 2015以上の仕様のJavaScriptで記述すると、Internet Explorer 11など古いブラウザでは動作しないこともあります。そこでBabelなどのトランスパイラと呼ばれるツールを使って、ES2015・ES2016・ES2017・ES2019・ES2020の仕様で記述したJavaScriptファイルを互換性のあるECMAScript 5に変換します。

## Babelとは

トランスパイラと呼ばれる
一番有名なツール。
>ただ、BabelにはECMAScript Modules（importやexport文のこと。以下、ES Modulesと記載）のJSファイルをまとめる機能が提供されていません。そのため、ES ModulesのJSファイルをまとめるモジュールバンドラー（例：webpack、Rollup等）をBabelと合わせて使うのが一般的です。
