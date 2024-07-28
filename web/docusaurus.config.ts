import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';
import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs';
import type { Options as BlogOptions } from '@docusaurus/plugin-content-blog';

const config: Config = {
  title: 'Naopedia',
  tagline: 'Tips book for engineers by naohito-T',
  url: 'https://naopedia.netlify.app',
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'static/img/favicon.ico',
  organizationName: 'naohito-T',
  projectName: 'naopedia',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },
  presets: [
    [
      'classic',
      {
        debug: true,
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [[npm2yarn, { sync: true }]],
          tags: 'tags.yml',
          showLastUpdateTime: true,
        } satisfies DocsOptions,
        blog: {
          showReadingTime: true,
        } satisfies BlogOptions,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'naopedia',
      logo: {
        alt: 'Tips book for engineers by naohito-T',
        src: 'img/android-chrome-512x512.png',
      },
      items: [
        {
          label: 'Documentation',
          items: [
            {
              label: 'Naopedia',
              to: '/docs/',
            },
            {
              label: 'Tags',
              to: '/docs/tags/',
            },
          ],
        },
        {
          label: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/naohito-T/',
            },
            {
              label: 'X',
              href: 'https://x.com/naohito___t',
            },
          ],
        },
        {
          label: 'Product',
          items: [
            {
              label: 'Portal Site',
              href: 'https://naohito-t.github.io/',
            },
            {
              label: 'Blog',
              href: 'https://moderato.vercel.app/',
            },
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Naopedia',
              to: '/docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/naohito-T/',
            },
            {
              label: 'X',
              href: 'https://x.com/naohito___t',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Portal Site',
              href: 'https://naohito-t.github.io/',
            },
            {
              label: 'Blog',
              href: 'https://moderato.vercel.app/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} naopedia.`,
    },
    // https://docusaurus.io/docs/next/markdown-features/code-blocks
    prism: {
      theme: prismThemes.nightOwl,
      // 追加後additionalLanguages、Docusaurusを再起動する必要
      additionalLanguages: ['java', 'php', 'ruby', 'bash', 'diff', 'json', 'scss', 'css'],
      // コードブロック内にマジックコメントを追加することで、特定の行を強調表示したり、エラー行をマークしたりできる
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
