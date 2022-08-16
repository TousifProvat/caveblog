import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated: () => {
        toast.error('You must login first');
        router.push('/login');
      },
    });

    if (status === 'loading') return <>....loading</>;
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
