# React Hooks

React HooksはReact 16.8で追加された新機能であり、stateなどのReactの機能をクラスを書かずに使えるようになる。
## カスタムフック

[カスタムフック参考URL](https://qiita.com/sonatard/items/617f324228f75b9c802f)

useStateやuseEffectなどロジックは分離できる。
それをhooksフォルダに入れて分け、ファイル名の先頭にuseとつけるのが慣習とのこと。

>React Hooks以前は、ロジックの再利用がコンポーネントに依存してしまいロジック単独でのモジュール化が難しいという問題がありました。
>しかしReact Hooksのカスタムフックという独自のフックを作成する機能を使うことで、Viewに依存することなくロジックだけを再利用することができるようになります。

- 手順

1. hooksを書く場所について
/src/hooks/ﾅｲで
2. setXxxを関数でラップする(汎用性が上がるため)
3. イベントの型付け(eの型推論ができなくなるため型付けが必要となる。)


```ts
/**  カスタムフック example */

import { useState } from 'react';

export const useUserPage = () => {
  /** user判断 */
  const [user, setUser] = useState(false);
  /** user判定 */
  const isUser = () => {
    setUser(() => !user);
  };

  /** 自身 */
  const [localName, setLocalName] = useState('');
  const setLocal = (e: string) => {
    setLocalName(e);
    console.log(`localName${localName}`);
  };

  /** 相手 */
  const [remoteName, setRemoteName] = useState('');
  const setRemote = (e: string) => {
    setRemoteName(e);
    console.log(`remoteName${remoteName}`);
  };

  /** return */
  /** 最後にreturnで関数内で返してあげる */
  return { user, isUser, localName, setLocal, remoteName, setRemoteName };
};
```

## useEffect 無限ループ

関数型の React コンポーネントにおいて、関数の結果が前回の呼び出し時と異なれば、レンダリングが発生するからです。

