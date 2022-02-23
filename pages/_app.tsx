import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from "next/head";
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>เพชร BLOG</title>
        <meta name="description" content="Perosnal Blog - รวบรวมเนื้อหา เทคโนโลยี เกม ภาษาอังกฤษ การออกกำลังกาย และสุขภาพ" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
