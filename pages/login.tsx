import { NextPage } from 'next';
import Link from 'next/link';
import { SyntheticEvent } from 'react';

const login: NextPage = () => {
  function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <div className="h-screen flex items-center justify-center py-12 px-4  sm:px-6 lg:px-8">
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
                id="email-address"
                placeholder="Email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-400 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="flex flex-col mb-3">
              <input
                type="password"
                name="email"
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

export default login;
