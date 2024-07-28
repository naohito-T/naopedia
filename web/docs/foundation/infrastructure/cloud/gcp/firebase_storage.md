# storage

**覚えておくべきこと**

Firebase Storageは以前から存在しているクラウドストレージサービスであるGoogle Cloud Storageそのもの

[参考URL](https://qiita.com/niusounds/items/383a780d46ee8551e98c)

Amazon S3のようなクラウドストレージのFirebase Storageが導入された。
これにより、Firebaseアプリケーションでより簡単にファイルのアップロード・ダウンロードを実装できるようになった。
>Firebaseデータベースと連携するWebアプリを簡単に作成できたのですが、Firebase Storageの導入によって画像や動画、音声ファイルなど巨大なデータをアップロードしたりするアプリも作れるようになったのです。

**問題**
ところが、Firebaseのホスティング機能でホストされるWebページとFirebase Storageでホストされるファイルはドメインが異なります。
そしてFirebase StorageはCORS設定が有効になっていない。
つまり
