# TOML

[参考URL](https://qiita.com/b4b4r07/items/77c327742fc2256d6cbe)

## TOMLとは

TOMLはGitHubの中の人が提案した設定ファイルを記述するための小さな言語。
TOML はハッシュテーブルに明確にマップするように設計されているので、様々な言語でのデータ構造へパースしやすい。

## TOML仕様

大文字・小文字を区別する
UTF-8である必要がある。
ホワイトスペースとはtab(0x09)とspace(0x20)のみ
改行とは LF (0x0A) と CRLF (0x0D0A) のみ
