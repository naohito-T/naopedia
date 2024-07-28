# テキストデータ

テキストデータについて

## テキストデータとは

人間が直接理解できる形式のデータで、ASCIIやUnicodeなどのテキストエンコーディングスキームにしたがっている。  
この形式のデータはテキストエディターなどで開くことができます。

これら2つのデータ形式は、同じバイト列を異なる方法で解釈します。バイナリデータは特定のバイト列が特定の意味を持つことを表し、テキストデータはそのバイト列が特定の文字を表すことを示します。

## テキストデータとバイナリデータの関わり(画像)

このコードでは、`imageData`がデータURI形式で提供されています。データURIは、"data:"で始まり、その後にデータの形式とエンコード方式が続きます。最後に、実際のデータがBase64エンコードされて続きます。

`imageData`を画像として表示するためには、次の手順を実行する必要があります。

1. `imageData`の先頭にある"data:"を削除します。
2. 残った部分をBase64デコードします。
3. デコードされたデータを使用して、画像を表示します。

JavaScriptの場合、以下のように上記の手順を実行できます。

```javascript
const base64Data = imageData.split(",")[1]; // "data:image/png;base64,..."からデータ部分を取得  
const binaryData = atob(base64Data); // Base64デコード
const blob = new Blob([new Uint8Array(binaryData.length).map((_, i) => binaryData.charCodeAt(i))], { type: "image/png" }); // Blobオブジェクトを作成
const imageUrl = URL.createObjectURL(blob); // BlobオブジェクトのURLを作成

// imageUrlを使用して画像を表示する
const imgElement = document.createElement("img");
imgElement.src = imageUrl;
document.body.appendChild(imgElement);
```

上記のコードでは、デコードされたデータをBlobオブジェクトに変換し、その後、BlobオブジェクトのURLを作成しています。最後に、このURLを使用して画像を表示しています。

`onSubmitImage`関数内でこれらの手順を実行すれば、`imageData`を画像として表示することができる

## Base64エンコード

Base64エンコードは、バイナリデータをASCII文字列に変換するための方法