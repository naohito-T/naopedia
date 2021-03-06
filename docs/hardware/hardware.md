# hardware Page

またディレクトリなど変更するかも


## CPUとGPUの違い

[参考URL](https://www.intel.co.jp/content/www/jp/ja/products/docs/processors/cpu-vs-gpu.html)

## GPU

GPUは、特定の3Dレンダリング・タスクの加速化のための専門的ASICとして開発されたことに期限がらうr .


## 内蔵グラフィックスとは

内蔵または共有グラフィックスは CPU と同じチップに組み込まれています。CPU によっては、専用グラフィックスまたはディスクリート・グラフィックスに依存するのではなく GPU を内蔵しているものもあります。また、IGP または統合グラフィックス・プロセッサーとも呼ばれ、CPU とメモリーを共有します。

---
## メモリ領域の分類

プログラムから使用されるメモリは**静的領域**、**スタック領域**、**ヒープ領域**という大きく分けて3種類の領域に分けられます。

## 静的領域

グローバル変数はプログラムの開始から終了までずっと有効な変数のためずっとメモリ上に割り当てられている必要がある
プログラム開始時に割り当てられて終了時に開放されればよいため、グローバル変数のメモリ割当・解放はコンパイラによって自動的に行われる。
このときにグローバル変数が配置されるメモリ領域を静的領域という。

## スタック領域

ローカル変数はスコープ範囲内で有効なため、スコープの始まりでメモリを確保しスコープの終わりでメモリを解放すれば十分。
ローカル変数の割当と解放もコンパイラによって自動的に行われる。このときに配置さえるメモリ領域をスタック領域という。

## ヒープ領域

プログラムを設計する上で、**何らかの情報をスコープの範囲を超えて扱いたいことがある**
このような場合に利用するのがヒープ領域

>ヒープ領域は柔軟に使える分、プログラマが責任を持って割り当て・解放を行わなければなりません。
>また、ヒープ領域はポインタを介して読み書きを行う必要があります。

>ヒープ領域はメモリを有効活用したい場合のためのものです。 メモリ有効活用する必要のない場合は、予めグローバル変数として必要な分だけメモリを確保しておけば十分なことが多いです。

---

## 並行と並列の違い

定義
>システムが複数の動作（処理の流れ）を同時に実行状態(in progress)に保てる機能を備えている場合を 並行(concurrent)と言い、複数の動作を同時に実行できる場合を並列(parallel)と言います。 重要な概念、違いは「実行状態」という点です。

- 並行(concurrent)
ある任意時間時でひとつの仕事しか行なわないが、復数の仕事を切り替えることにより同時に実行すること。
複数の仕事(スレッド)を実行状態として保てている状態。

- 並列(pararell)
ある任意時間時で複数の仕事を同時に実行すること。
並列は並行を包含していることに注意。

JSで例える

---

## 標準入力と標準出力

コマンドは必要に応じて何らかのデータを受け取り、処理をして結果を出力する。
特に何も指定していない場合、**入力はキーボード**, **出力は画面**となる。これをそれぞれ**標準入力**と**標準出力**という。

- パイプ
`dmesg | more`はdmesgコマンドの標準出力を、moreコマンドの標準入力につなげている
- リダイレクト
標準出力を画面ではなく別のモノに向けるのがリダイレクトで、「>」という記号で表します。リダイレクト先は、通常はファイルですが、プリンタなどに送ることも可能です。



## ファイルディスクリプタ(FD)

ファイルへの通り道に割り振られる番号で、ファイルを識別するための目印
**なおUNIX系(Linuxとか)ではファイル以外もファイルとして扱われる。**

---

## NIC(ネットワークインターフェースカード): Network Interface Card

パソコンの部品
LANケーブルを挿す穴がくっついている。

---

## 0.0.0.0

[参考URL](https://qiita.com/Masato338/items/f162394fbc37fc490dfb)

ローカルマシン上のすべてのIPv4アドレスのこと。
仮想環境(Docker)で起動したRailsはlocalhostのipアドレス127.0.0.1でアクセスできない。
そのため仮想外部からアクセスできるようにip 0.0.0.0に紐付けする必要がある。

前提として
マシンというのは複数のネットワークインターフェースを持っている(つまりは複数のIPアドレスを持っている)
`ifconfig`でネットワークインターフェースを見ることができる。
grepで狭めた場合
```sh
$ ifconfig | grep "inet"
	inet 127.0.0.1 netmask 0xff000000
	inet6 ::1 prefixlen 128
	inet6 fe80::1%lo0 prefixlen 64 scopeid 0x1
	inet6 fe80::cc17:43ff:fe09:e1c3%anpi0 prefixlen 64 scopeid 0x4
	inet6 fe80::cc17:43ff:fe09:e1c4%anpi1 prefixlen 64 scopeid 0x5
	inet6 fe80::cbf:271e:5f59:bcc8%en0 prefixlen 64 secured scopeid 0xb
	inet 192.168.41.129 netmask 0xfffffe00 broadcast 192.168.41.255
	inet6 fe80::489a:4ff:fe60:9744%awdl0 prefixlen 64 scopeid 0xc
	inet6 fe80::489a:4ff:fe60:9744%llw0 prefixlen 64 scopeid 0xd
	inet6 fe80::1576:a19c:489f:4f7%utun0 prefixlen 64 scopeid 0x10
	inet6 fe80::8cb0:20f5:91f6:815b%utun1 prefixlen 64 scopeid 0x11
	inet6 fe80::ce81:b1c:bd2c:69e%utun2 prefixlen 64 scopeid 0x12
	inet6 fe80::1e0c:7f5:3e27:321d%utun3 prefixlen 64 scopeid 0x13
	inet6 fe80::b552:fea9:c144:f6c9%utun4 prefixlen 64 scopeid 0x14
	inet6 fe80::b47a:b5be:25ac:5b6%utun5 prefixlen 64 scopeid 0x17
	inet6 fe80::fc09:e8a2:beb6:2447%utun6 prefixlen 64 scopeid 0x18
```

0.0.0.0のipアドレスは表示されたipアドレスすべてを表している。
