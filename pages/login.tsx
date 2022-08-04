import { NextPage } from 'next';
import Link from 'next/link';
import { signIn, getSession, useSession } from 'next-auth/react';
import { ChangeEventHandler, SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';

const login: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <>...Loading</>;

  if (session) {
    router.push('/');
  }

  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const result = await signIn('credentials', {
      ...formValues,
      redirect: false,
    });
  }

  return (
    <div className="h-fit flex items-center justify-center pt-16 py-12 px-4  sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 ">
        <form onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm bg-white p-10">
            <div>
              <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
                Signin to your cave
              </h2>
            </div>
            <div className="flex flex-col mb-3">
              <input
                type="email"
                name="email"
                onChange={onChange}
                value={formValues.email}
                id="email-address"
                placeholder="Email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="flex flex-col mb-3">
              <input
                type="password"
                name="password"
                onChange={onChange}
                value={formValues.password}
                id="password"
                placeholder="Password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-blue-400 focus:z-10 sm:text-sm"
              />
            </div>

            <div className="mb-5">
              <button
                type="submit"
                className="w-full px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow-sm cursor-pointer text-white focus:outline-none"
              >
                Login
              </button>
            </div>
            <div className="text-center">
              <Link href={'/forget-password'}>
                <a className="cursor-pointer text-s text-slate-500 hover:text-blue-500">
                  Forget Password?
                </a>
              </Link>
            </div>
            <div className="text-center">
              <span className="text-s text-slate-500">Not a member yet?</span>
              <Link href={'/register'}>
                <a className=" px-2 cursor-pointer text-s text-blue-500 hover:text-blue-600">
                  Register
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

login.public = true;

export default login;
