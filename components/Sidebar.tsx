import Link from 'next/link';
import React from 'react';

interface propsType {
  setShow: (show: boolean) => void;
}
const Sidebar = ({ setShow }: propsType) => {
  return (
    <div className="w-full h-screen fixed left-0 top-0 flex justify-between">
      <div className="h-full bg-white w-[50%] pt-32 shadow-md px-2 z-10 relative">
        <div
          className="absolute top-2 right-2 text-slate-300 hover:text-slate-600 cursor-pointer hover:bg-blue-300 rounded"
          onClick={() => setShow(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <ul className="flex flex-col text-center space-y-10 ">
          <li>
            <Link href="/">
              <a>Feed</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a className="hover:bg-blue-200 hover:text-blue-500 px-3 py-3 rounded">
                Login
              </a>
            </Link>
          </li>
          <li>
            <Link href={'/register'}>
              <a className="px-3 py-3 border rounded border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                Create Account
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="overlay h-full w-[50%] bg-black opacity-10"
        onClick={() => setShow(false)}
      ></div>
    </div>
  );
};

export default Sidebar;
