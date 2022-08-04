import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { SessionProvider, useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={0}
      refetchOnWindowFocus={true}
    >
      <Navbar />
      <Layout>
        {Component.public ? (
          <Component {...pageProps} />
        ) : (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        )}
      </Layout>
    </SessionProvider>
  );
}

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/login');
    },
  });

  if (status === 'loading') return <>....loading</>;

  return <>{children}</>;
};

export default MyApp;
