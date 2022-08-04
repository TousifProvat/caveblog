import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import ProfileDropDown from './ProfileDropDown';

const Navbar = () => {
  const { data: session, status } = useSession();

  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="w-full h-16 flex items-center justify-center bg-white shadow-sm fixed z-20 ">
      <div className="flex justify-between items-center w-full container px-3 sm:px-0">
        <div className="left-side flex space-x-2 items-center">
          <div className="logo px-1 py-2 bg-blue-500 rounded">
            <Link href={'/'}>
              <a>
                <h2 className="text-xl font-extrabold text-white">Cave.Blog</h2>
              </a>
            </Link>
          </div>
          {/* <div
            className="burger space-y-2 sm:hidden cursor-pointer hover:bg-blue-200 p-2 rounded"
            onClick={() => setShow((prev) => !prev)}
          >
            <div className={`line-1 w-8 h-[4px] bg-slate-600 rounded`}></div>
            <div className={`line-2 w-8 h-[4px] bg-slate-600 rounded`}></div>
            <div className="line-2 w-8 h-[4px] bg-slate-600 rounded"></div>
          </div> */}
        </div>
        <nav className="right-side flex items-center">
          {session && <ProfileDropDown />}
          {!session && (
            <ul className="flex space-x-4 text-l items-center">
              <li className="hidden sm:block">
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
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
