import { signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
const DropDown = dynamic(() => import('./DropDown'));
const Spinner = dynamic(() => import('./Spinner'));

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="w-full h-16 flex items-center justify-center bg-white shadow-sm fixed z-20 ">
      <div className="flex justify-between items-center w-full container px-3 sm:px-0">
        <div className="left-side flex space-x-2 items-center">
          <div className="logo px-1 py-2 bg-blue-500 rounded">
            <Link href={'/'} as={'/'}>
              <a>
                <h2 className="text-xl font-extrabold text-white">Cave.Blog</h2>
              </a>
            </Link>
          </div>
        </div>
        <nav className="right-side flex items-center">
          {!session && status === 'loading' && <Spinner size={12} />}
          {session && status === 'authenticated' && (
            <DropDown
              icon={
                <div
                  className="relative overflow-hidden w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] hover:border-blue-500 rounded-full cursor-pointer 
                border-2 border-transparent"
                >
                  {session && session.user && (
                    <Image
                      src={String(session.user.image)}
                      objectFit="contain"
                      layout="fill"
                      priority
                      alt={String(session.user.name)}
                    />
                  )}
                </div>
              }
              menus={[
                <Link
                  href={`/${session?.user?.username}`}
                  as={`/${session?.user?.username}`}
                  key="1"
                >
                  <a>
                    <li className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md flex flex-col">
                      {session?.user?.name}
                      <span className="text-xs pl-[3px]">
                        {session?.user?.email}
                      </span>
                    </li>
                  </a>
                </Link>,
                <hr className="pb-3" key="2" />,
                <Link href={'/newblog'} as={'/newblog'} key="3">
                  <a>
                    <li className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md">
                      Create Post
                    </li>
                  </a>
                </Link>,
                <Link href={'/settings'} as={'/settings'} key="4">
                  <a>
                    <li className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md">
                      Settings
                    </li>
                  </a>
                </Link>,
                <hr key="5" />,
                <li
                  className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md cursor-pointer"
                  onClick={() => signOut()}
                  key="6"
                >
                  Signout
                </li>,
              ]}
            />
          )}
          {!session && status === 'unauthenticated' && (
            <ul className="flex space-x-4 text-l items-center">
              <li>
                <Link href="/login" as={'/login'}>
                  <a className="hover:bg-blue-200 hover:text-blue-500 px-3 py-3 rounded">
                    Login
                  </a>
                </Link>
              </li>
              <li>
                <Link href={'/register'} as={'/register'}>
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
