import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/homepage-features';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className='container'>
        <Heading as='h1' className='hero__title'>
          {siteConfig.title}
        </Heading>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className='button button--secondary button--lg' to='/docs'>
            Try excluding naopedia
          </Link>
        </div>
      </div>
    </header>
  );
}

const MySEO = () => (
  <Head>
    <meta property='og:description' content='' />
    <meta charSet='utf-8' />
    <title>naopedia</title>
    <link rel='apple-touch-icon' sizes='180x180' href='/img/apple-touch-icon.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='/img/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/img/favicon-16x16.png' />
    <link rel='manifest' href='/img/site.webmanifest' />
    <meta name='msapplication-TileColor' content='#2b5797' />
    <meta name='theme-color' content='#ffffff' />
  </Head>
);

const HomePage = (): JSX.Element => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <MySEO />
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description='Description will go into a meta tag in <head />'
      >
        <HomepageHeader />
        <main className={styles.main}>
          <HomepageFeatures />
          <h2>
            <a href='https://git.io/typing-svg'>
              <img src='https://readme-typing-svg.herokuapp.com/?lines=Hello!+👋;This+is+Naopedia....;From+Tokyo,+Japan&center=true&size=30' />
            </a>
          </h2>
        </main>
      </Layout>
    </>
  );
};

export default HomePage;
