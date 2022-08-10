import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import fetcher from '../lib/fetcher';

import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={0}
      refetchOnWindowFocus={true}
    >
      <SWRConfig value={{ fetcher }}>
        <Navbar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
