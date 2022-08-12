import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import fetcher from '../lib/fetcher';

import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import PageHead from '../components/Head';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={0}
      refetchOnWindowFocus={true}
    >
      <SWRConfig value={{ fetcher }}>
        <PageHead title="Cave.Blog">
          <meta
            name="description"
            content="Just a blogging cave that was built for practice with nextjs"
          />
          <meta name="keywords" content="programming,nextjs,react,blog" />
          <meta name="robots" content="index,follow" />
          <meta name="language" content="English" />
          <meta name="author" content="Tousif Ahmed" />
        </PageHead>
        <Navbar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
