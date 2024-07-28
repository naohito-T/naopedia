# method

## present? method

RailsのActiveSupportの便利なメソッドのひとつにpresenceメソッドがある
presenceはオブジェクトが存在すればそのオブジェクトを返し、オブジェクトが存在しなればnilを返す
**※presenceメソッドはRailsのメソッドですのでRubyだけで使う場合は、ActiveSuopprtをインクルードする必要があります。**

[参考URL](https://techacademy.jp/magazine/20210)


`object.present? ? object : 'オブジェクト'`

Railsでは以下の様に書ける

`object.presence || 'オブジェクト'`
