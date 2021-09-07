# node

## package.json


- npm script

npm runで実行できるエイリアスコマンド
npm runで実行することでローカルnode_moduleにインストールしたpackageを実行できる。

- 優先度

package.jsonが一番優先度が高いのは当たり前
.prettierrc(拡張子無し)などは次に優先度が高くなる。つまり、package.jsonにpretterの設定を書けば一番優先度が高くなる

- vscode連携との罠

VSCodeのPrettier拡張機能にはPrettier本体がバンドル(含まれて)いる
つまり、Prettier拡張機能さえインストールしていれば、VSCodeではPrettierが使えるということ
VScodeの設定 (settings.json) に Prettier の細かい設定があるのも、そこで設定された内容で Prettier のフォーマットを実行するため。

>えー、じゃあ別に Prettier 本体をインストールする必要は無いし、設定ファイル (.prettierrc) も作らなくていいんじゃないの？と思ってしまいそうですが、 Prettier 拡張機能の公式ドキュメントにはプロジェクトのローカルにインストールされている Prettier と設定ファイルを使用することを推奨する旨がしっかり記載されています。
>当然といえば当然ですが、チームで開発する場合はパッケージのバージョンや設定を揃えないといけないですし、そもそも VSCode 以外のエディタを使っている人もいるかもしれないので、設定の統一が難しくなってしまいます。

>Prettier 拡張機能にバンドルされている Prettier や VSCode の設定は、あくまでもフォールバック的な位置付けで、優先される設定もローカルの Prettier 設定ファイル (.prettierrc) が上位になっています。