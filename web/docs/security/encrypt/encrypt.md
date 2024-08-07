# 暗号化

[とほほの暗号化入門](https://www.tohoho-web.com/ex/crypt.html)
[暗号化初心者](https://qiita.com/opengl-8080/items/85df520e2d8c4e19be8e)
暗号化 : 復号する必要がある。
ハッシュ化 : 復号する必要がない

## AES(Advanced Encryption Standard)

AESは通信データの暗号化でよく使われる暗号化技術。

経緯
米国の国立標準技術研究所（NIST）は1997年、当時標準的に使われていた共通鍵暗号のDES（DataEncryption Standard）の安全性の低下から、DESに代わる共通鍵暗号を募集した。
そのときに集まった応募案の1つ、「Rijndael（ラインダール）」は暗号の解かれにくさ（強度）だけでなく、処理負荷や計算の速さでも評価され、2000年に選定された。これが、AESになった。

## GPG(GNU Privacy Guard)

[参考URL](https://lecture.ecc.u-tokyo.ac.jp/~yama/2021S-JOHO/GPG/GPG/gpg_1.html)

## Base64

**暗号化ではない**がここに記載。
Base64変換は一見暗号化のように見えますが、逆変換も簡単に行えるもので、暗号化の効果はまったくありません。単純に、表現の形式を変換しているだけ。
Basic認証をそのまま単体で使うと、誰でも読める状態でユーザー名とパスワードがインターネットを流れてしまう
