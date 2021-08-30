import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta property='og:title' content='Tacnique' />
        <meta property='og:type' content='document' />
        <meta property='og:url' content='https://www.tacnique.com/' />
        <meta
          property='og:image'
          content='https://www.tacnique.com/tacnique-logo.svg'
        />
        <link rel='shortcut icon' href='../favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
