# HTML

## seo を強くする

HTML5 の要素タグを使うと SEO が劇的に強くなる

- 要素タグとは

```html
<header>
  <footer>
    <main>
      <article>
        <section>
          <aside></aside>
        </section>
      </article>
    </main>
  </footer>
</header>
```

などのレイアウトを構成するタグのこと
HTML5 要素タグを使うと内部 SEO が強くなる理由は Google などの検索エンジンがサイトの構造を理解しやすくなるため

- main
  ページ内のメインのコンテンツとなるセクションへ使用
  1 ページ内に 1 つのみ使用
  article, aside, footer, header, nav 要素の中には入れてはいけない

- article
  そのページから切り取っても単独で成り立つセクション
  ページ内のメインのコンテンツとなるセクションへ使用
  トップページの新着情報の箇所に使う

- section
  その名の通り、ページ内の文章などの区切りのセクションを囲むタグ
  レイアウト目的では使用しない。レイアウト目的なら`html<div>`を使用。
  見出し（H タグ）が無いを箇所は`html<section>`を使用しない

## form 関連

`<input>`タグに関してはださいため`css display: none;にしてbefore afterで追記するのが定石`
