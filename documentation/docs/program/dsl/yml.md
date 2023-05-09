# YAML
[ymlでしか使えない構文など](https://nju33.com/notes/github-actions/articles#%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3)

ymlを継承した時などparseしてくれる。  
[参考URL](http://yaml-online-parser.appspot.com/?yaml=foo%3A+%26foo%0A++a%3A+1%0A++b%3A+2%0A++c%3A+3%0A%0Abar%3A%0A++%3C%3C%3A+*foo%0A++c%3A+%22changed%22%0A++d%3A+4%0A%0Abaz%3A%0A++%3C%3C%3A+%26awesome%0A++++awesome%3A+%22cat%22%0A++great%3A+%22god%22%0A++bad%3A+%22human%22%0A%0Astatus%3A%0A++%3C%3C%3A+*awesome%0A++work%3A+true&type=json)

## ymlデータ型

YAMLでは、以下のデータ型を表現できる。

- スカラー値 (Scalar value): 文字列、整数、浮動小数点数、真偽値、null
- シーケンス (Sequence): 配列、リスト
- マッピング (Mapping): オブジェクト、連想配列、ハッシュ

また、YAMLは自己記述型言語であり、自由度が高いため、オリジナルのデータ型を作成することもできる。  
ただし、YAMLの処理系がそのデータ型を解釈できるように、対応する処理を記述する必要があります。

## Online YAML Parser
[参考URL](https://yaml-online-parser.appspot.com/)

ymlから以下にparseできる

yml→json
yml→python

jsonからymlへ変更する
[参考URL](https://j2y.link/)

## 基本的な書き方
[参考URL](https://zenn.dev/boukichi/articles/cc3abb74db92fc)

**コメント**
行頭に`#`はコメント

**リスト(配列）**
- ハイフン`-`は配列の開始
- 同一インデントは同じ配列に入る。

**ハッシュ（連想配列)**
- キー名はスペースを含むことができる
- キーはコロン「:」の後にスペースか、改行が必要です。
- インデントが同じ場合は「兄弟」、異なる場合は「親子」になります。


## 記述

リストをShort syntax
オブジェクトをLong syntax
と呼ぶのは結構慣例

Short syntax（リスト）
```yml
depends_on:
  - service_a
```

Long syntax（オブジェクト）
```yml
depends_on:
  service_a:
    condition: service_started
```

これ

## 継承

[参考URL](https://tech-1natsu.hatenablog.com/entry/2018/12/16/004215)

JSONと違ってYAMLは継承ができる（つまりDRYに書ける）

&（anchor）と呼ぶ。これを使用しextendsできるようにする

```yml
# 参照できるようになる
foo: &foo
  a: 1
  b: 2
  c: 3
```

### extend

`<<`はextendの意味
anchorを継承したい時は`<<: *アンカー名`のようにする。
※なお後述した重複プロパティは上書きされる。この例ではcプロパティを上書きしている。

```yml
foo: &foo
  a: 1
  b: 2
  c: 3

bar:
  <<: *foo
  c: "changed"
  d: 4
```

JSON変換するとこうなる
```json
{
  "foo": {
    "a": 1, 
    "c": 3, 
    "b": 2
  }, 
  "bar": {
    "a": 1, 
    "c": "changed", 
    "b": 2, 
    "d": 4
  }
}
```

### extend inline

オブジェクトの中の単一のプロパティだけ継承元にしたいときは
`<<: &アンカー名`とする。