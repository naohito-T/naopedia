import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Naopedia',
  tagline: 'Tips book for engineers by naohito-T',
  url: 'https://naopedia.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'naohito-T', // Usually your GitHub org/user name.
  projectName: 'naopedia', // Usually your repo name.
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/naohito-T/naopedia/edit/main/documentation/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
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
          label: 'Docs',
          to: '/docs/intro',
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
              to: '/docs/intro',
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
              label: 'Twitter',
              href: 'https://twitter.com/naohito___t',
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
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
