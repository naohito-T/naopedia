# Nginx

## Nginxのアーキテクチャを理解する

[参考URL](https://qiita.com/kamihork/items/296ee689a8d48c2bebcd)

**イベント駆動による非同期なI/Oによるアーキテクチャ**
接続ごとにプロセスやスレッドを立ち上げてコンテキストスイッチが起こらないようにNginxはシングルスレッドで処理を行う。
