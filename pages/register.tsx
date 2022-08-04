import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

const register: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <>Loading...</>;
  }

  if (session) {
    router.push('/');
  }

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-fit flex items-center justify-center pt-16 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 ">
        <form onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm bg-white p-10">
            <div>
              <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
                Create your cave
              </h2>
            </div>
            <div className="flex flex-col mb-3">
              <input
                type="text"
                name="username"
                onChange={onChange}
                value={formValues.username}
                id="username"
                placeholder="Username"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="flex flex-col mb-3">
              <input
                type="email"
                name="email"
                onChange={onChange}
                value={formValues.email}
                id="email-address"
                placeholder="Email Address"
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
                className="w-full px-5 py-2 bg-blue-500 rounded shadow-sm cursor-pointer text-white focus:outline-none hover:bg-blue-600"
              >
                Register
              </button>
            </div>
            <div className="text-center">
              <span className="text-s text-slate-500">Already a member?</span>
              <Link href={'/login'}>
                <a className="px-2 cursor-pointer text-s text-blue-500 hover:text-blue-600">
                  Login
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

register.public = true;

export default register;
