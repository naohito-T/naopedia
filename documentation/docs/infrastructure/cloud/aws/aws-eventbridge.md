# Amazon EventBridge
[参考URL](https://qiita.com/ishibashi-futoshi/items/586ebe17b174a478eb6a)

## 概要

AWSで発生するさまざまなイベントや、SaaSから発生するイベントを使用して、さらにさまざまなAWSサービスとつなげるまさしくBridge（架け橋）のようなサービス。  

## 利用用途

AmazonSQSなど、それぞれのサービスに対して同じメッセージを送信しなければならない場合、既存アプリケーション側の負担が大きくなる。  
そこで、メッセージを伝搬してくれる別のサービスを組み合わせる案があります。  
もし、そういった拡張性を前提に設計する場合は、図5.9のように、Amazon EventBridgeを組み合わせられます。Amazon EventBridgeはイベントバスとして利用でき、幅広くメッセージを後続に伝搬できるサービス。  
このように拡張性を持たせることもできます。

[![Image from Gyazo](https://i.gyazo.com/1942efa706a04b40665e28e4ae956b9b.png)](https://gyazo.com/1942efa706a04b40665e28e4ae956b9b)


