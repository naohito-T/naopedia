# Python

[学ぶ前に考えること](../新たな言語を学ぶ前に.md)
以下からは上記で記載したmd順に探っていく

---

## Pythonの仕組み

[Pythonはどうやって動くのか](https://kaityo256.github.io/python_zero/howtowork/index.html)

---

## Python利用用途

1. 機械学習を使った人工知能の開発 → Pythonがライブラリが充実しているため
2. 自動データ処理や分析などの業務効率化 → 自動データ処理に関しては別でもできる。分析はPythonが強いか
3. スクレイピングによるWEB上の画像データ・テキストデータの自動収集 → スクレイピングは結局WebDriverを使うためどれでもいい
4. WEBサービス・WEBアプリケーション制作 → 日本だとRubyやPHPが強い。わざわざPythonでやるのであればAIなどの活用がしたいなど
5. スマホアプリ（Android）制作 → できるのか、Kotlinが強いけど
6. デスクトップアプリ制作 → これはWindows？
7. 組み込みアプリケーション制作 → C++が強いはず

---

## Python コードスタイル

[参考URL](https://legacy.python.org/dev/peps/pep-0008/)

---

## Pythonのversion管理

asdfやpyenvがある

参考URL
[asdfが有名っぽい](https://dev.classmethod.jp/articles/try-asdf-settings/)

**pyenvがanyenvから使える**ため、それを使用する
またnodeのようにlocalでversion分けができる。

---

## Pythonの環境構築

Python自体がanacondaなど、構築自体がめんどくさい。そのためDocker構築がいいと言われている。
あとは仮想環境でやるとか言っていた気がする....

## Pythonのパッケージ管理ツールとは

pipが代表格
pipはPythonで書かれたパッケージソフトウェアをインストール・管理するためのパッケージ管理システム
多くのPythonパッケージは、Python Package Index上にある。

---

## pythonの型付け

Pythonに型ヒントが入った。
PylanceのVS Code拡張機能で対応する(MicroSoft製)

[導入](https://blog.ntacoffee.com/mypy-and-vscode/)

## Python インデント

インデントはタブまたはスペースで行うが、スペース何文字分というルールは決まっていない。
コーディング規約では4つが推奨されている。

## Pythonのライブラリ

Pythonのライブラリは主に以下の3種類となる。

- 標準ライブラリ
- site-packagesディレクトリ(pip installでインストール)
- ユーザ別site-packageディレクトリ(pip install --userでインストール)

Pythonが読み込むライブラリの場所を知りたい場合

```sh
$ python
Python 3.9.10 (main, Feb 24 2022, 22:46:36)
[Clang 13.0.0 (clang-1300.0.29.30)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> sys.path
['', '/Users/tanakanaohitoshi/.anyenv/envs/pyenv/versions/3.9.10/lib/python39.zip', '/Users/tanakanaohitoshi/.anyenv/envs/pyenv/versions/3.9.10/lib/python3.9', '/Users/tanakanaohitoshi/.anyenv/envs/pyenv/versions/3.9.10/lib/python3.9/lib-dynload', '/Users/tanakanaohitoshi/.anyenv/envs/pyenv/versions/3.9.10/lib/python3.9/site-packages']
>>>
```

---

## Python インポート周り徹底理解

[参考URL](https://qiita.com/papi_tokei/items/bc34d798dc7a6d49df30)

Pythonのライブラリは主に以下の3種類となる。

- 標準ライブラリ
- site-packagesディレクトリ(pip installでインストール)
- ユーザ別site-packageディレクトリ(pip install --userでインストール)

### .pyファイルのインポート(同階層)

クラスも関数も同時にimport 可能

.
├── lib_a.py
└── main.py

```python
from lib_a import Student, add
```

---
