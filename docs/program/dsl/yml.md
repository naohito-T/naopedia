# yml

ymlファイルトピックについてまとめる

[ymlでしか使えない構文など](https://nju33.com/notes/github-actions/articles#%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3)

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