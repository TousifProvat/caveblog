import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <>Loading...</>;
  }

  if (session) {
    router.push('/');
  }

  return (
    <div className="h-fit flex items-center justify-center pt-16 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 ">
        <div>
          <div className="rounded-md shadow-sm bg-white p-10">
            <div>
              <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
                Create your cave
              </h2>
            </div>
            <div className="social-login my-2 text-center flex flex-col">
              <button
                className="bg-blue-500 w-full py-3 rounded-md"
                onClick={() => signIn('google')}
              >
                <h2 className="text-white">Continue with Google</h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
