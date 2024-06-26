# CPU

## Overview

OSは、パソコンを使う人をサポートしてくれるソフト。CPUはデータ処理してくれるパソコンの頭脳  
OSはソフトウェアで、CPUはハードウェア  
パソコンのいろんな処理の速さはCPUの性能にかかってくることが多い。CPUの計算が遅いとパソコンも動作が遅い。

## CPUを動かすには

[参考URL](https://onoredekaiketsu.com/x86-64-x64-amd64-what-is-the-difference-between-these/)

CPUを動かすには**CPUが理解できる命令のセット**が必要。

## instruction set architecture

CPUを動かすために体系化したものを命令セットアーキテクチャ（instruction set architecture）ISAと呼ぶ
※昔の言い方では機械語（マシン語）の仕様みたいなもの。

そして、「x86-64」や「x64」「AMD64」はこの命令セットアーキテクチャ（ISA）の名前

## 64bitとは

まず、64bitとは何か？ですが、それを理解するためには「bit」を理解する必要がある。
**bit（ビット）とはコンピューターが扱うデータの最小単位の「binary digit」の略**
この最小単位は「0」と「1」の2種類で区別される。

次に、64bitとは連続した64個（64桁）のbitのことを表します。

つまり、64bitとは一度に扱えるデータの幅が、最大で2の64乗（18,446,744,073,709,551,616個）まで可能ということです。
たとえば32bitであれば、2の32乗（4,294,967,296個）までなのでその差は歴然です。

それにより、たとえばOSなどでは、
32bitと64bitの違いとして**処理速度/扱えるメモリの容量/扱えるハードディスクの容量**などで差が出ます。

---

## 64bitの命令セットアーキテクチャ(ISA)の種類

x86-64またはx64
x86アーキテクチャを64bitに拡張したものの総称（※今現在では下記「AMD64」「Intel 64」を含んだ総称で使われている。）

### AMD64

AMD社発表したx86アーキテクチャを64bitに拡張したもの。
※下記「Intel 64」とは厳密にいえば極僅かな差はあるが通常用途では差はないと思って良い。

### Intel 64

インテル社が発表したx86アーキテクチャを64bitに拡張したもの。
※上記「AMD64」とは厳密にいえば極僅かな差はあるが通常用途で差はないと思って良い。

### Arch64（ARM64）

スマホやタブレットなどで多く利用されているARMアーキテクチャを64bitに拡張したもの。

### IA-64

EPICアーキテクチャによる64bitの命令セットISA。1994年に発表され、インテル社が2001年にリリースした64bitマイクロプロセッサ「Itanium（アイテニアム）」シリーズで採用されたが、2021年のItaniumの製造終了予定に伴い、事実上終了する。
