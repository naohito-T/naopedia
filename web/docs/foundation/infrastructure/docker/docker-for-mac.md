# Docker for macを早める歴史

## そもそもどうして遅い

[参考URL](https://tech.enigmo.co.jp/entry/2021/12/22/100000)

Docker Desktop for Macでは、Linux環境と違って、コンテナーは**そのままmacOSのカーネル**で実行されておらず、macOS上で動くVMの中にあるLinuxカーネルによって実行されている。  
なぜそうなっているかというと、macOSのカーネルではコンテナー化のサポートがなくてdockerのようなコンテナーを実装できないため。  
なので、bindボリュームを通してコンテナー内からmacOS側にあるファイルにアクセスする時は、VMの中から `osxfs（レガシー）` か `gRPC FUSE` というファイルシステムレイヤーを通して、macOS側のファイルが読み込まれる。  
ただし、抽象化が多いところから、ケースによってそのレイヤーがかなり遅くて、ネイティブのアプリケーションと比べ物にならないことが珍しくない

### そもそもどうして遅い(深堀)

[海外の遅いについての参考記事](https://medium.com/@marickvantuil/speed-up-docker-for-mac-with-mutagen-14c2a2c9cba7)

問題の根本は、DockerとMacの間のOSファイル システム層にあります。  
Linuxでは、Dockerはディレクトリとファイルを直接マウントできますが、Macでは、Dockerはファイルの読み取り/書き込みごとにリクエストをMac (osxfs) に渡す必要があります。

ファイルシステムのパフォーマンスには、スループットと遅延という2つの側面があります。スループットは、データを処理できる速度です。レイテンシは、ファイル システム呼び出し (ファイルへの書き込みなど) が完了するまでにかかる時間です。

スループットは問題ではありません。SSDを搭載した最新のシステムは、少なくとも数GB/秒のスループットを達成できます。OSXFSのスループット制限は250 MB/秒です。これはSSDのスループットよりも大幅に遅いですが、ほとんどのアプリケーションは毎秒それほど多くのデータを読み書きしないため、通常はボトルネックにはなりません。

そのため待ち時間が発生します。ほとんどのブロックベースのファイルシステム (ブロックベースとは、ディスク上のデータがブロックに格納されることを意味します) の遅延は約10μs (マイクロ秒) です。OSXFSは約13倍遅い (130μs)。まだ信じられないほど高速ですが、npm installなどの一般的なWebアプリのワークロードでテストすると、すべてが積み重なって信じられないほど遅くなります。

## Mutagen

Mutagenはファイル同期とネットワークフォワーディングのためのツールだが、docker-composeのサポートが追加された。
ファイル同期は `rsync` によるものなのでパフォーマンスは良くて堅牢

- 同期の仕組みがMutagenにより以下に変更される
docker composeと合わせて使う場合はmacOSとコンテナーの間に、VM内に同期されているファイルのコピーが用意されます。  
コンテナー内から本来bindであったボリュームへのファイルアクセスが発生した場合はmacOS側のファイルを読みに行かず、VMのファイルにのみアクセスするようになります。 アプリケーションのファイル処理がVM内で完結するため、macOSとVM間のファイルのやり取りが激減して、パフォーマンスのボトルネックがなくなります。
※DockerチームでもDocker DesktopにMutagenを正式的に導入する動きが以前ありましたが、導入で追加の複雑さが生じることから、やめることとなったようです。その代わりにgRPC FUSEを優先するようになりました。