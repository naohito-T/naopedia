# Python

## Python コードスタイル

[参考URL](https://legacy.python.org/dev/peps/pep-0008/)
## Pythonのversion管理

[asdfが有名っぽい](https://dev.classmethod.jp/articles/try-asdf-settings/)

---

## Pythonの環境構築

Docker構築がいい。
またnodeのようにlocalでversion分けができる。

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
