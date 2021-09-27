# WebRTC(Web Real-Time Communication)

Webブラウザからリアルタイム通信を行うことができるAPI

## シグナリングサーバ
firebaseで代用可能
誰かが書き込めばそれを誰かが読み取れる

## STUNサーバ
インターネットからuserのIPがわかるサーバー


## 手順

mediaDevices.getUserMedia : カメラやマイクなどのメディアデバイスへアクセスする許可を求める
→引数には音声・映像をどのような条件で取得するかを指定するためのMediaStreamConstraintsオブジェクトを指定します。
→.getUserMedia(MEDIA_CONSTRAINTS) @example audio: true, video: true
ビデオ会議ツールは自分の声はミュートにする.


## Tips


[Vue3_TypeScriptでWebRTCを扱う](https://tec.tecotec.co.jp/entry/2021/07/02/090000)
[React_TypeScript](https://qiita.com/watanabeso/items/028800170aa17789b26e)

