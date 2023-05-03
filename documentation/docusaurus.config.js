const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Naopedia',
  tagline: 'Tips book for engineers by naohito-T',
  url: 'https://naopedia.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'naohito-T', // Usually your GitHub org/user name.
  projectName: 'naopedia', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/naohito-T/naopedia/edit/main/documentation/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'naopedia',
        logo: {
          alt: 'Tips book for engineers by naohito-T',
          src: 'img/android-chrome-512x512.png',
        },
        items: [
          {
            label: 'Docs',
            items: [
              {
                label: 'naopedia docs',
                to: '/docs/intro',
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
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          //
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
                label: 'naopedia docs',
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
                href: 'https://twitter.com/docusaurus',
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
});
