import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ProfileDropDown = () => {
  const { data: session, status } = useSession();

  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="md:relative">
      <div
        className="relative overflow-hidden w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] rounded-full cursor-pointer 
      border-2 border-transparent hover:border-blue-500
      "
        onClick={() => setShow((prev) => !prev)}
      >
        <Image
          src={String(session?.user?.image)}
          objectFit="contain"
          layout="fill"
          priority
        />
      </div>
      {show && (
        <ul className="nav-links absolute bg-white shadow-md top-[4.5rem] w-[95%] md:w-[300px] right-[50%] md:right-0 md:translate-x-0 translate-x-[50%] p-2 rounded-md space-y-3">
          <Link href={`/${session?.user?.username}`}>
            <a>
              <li className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md flex flex-col">
                {session?.user?.name}
                <span className="text-xs pl-[3px]">{session?.user?.email}</span>
              </li>
            </a>
          </Link>
          <hr className="pb-3" />
          <Link href={'/newblog'}>
            <a>
              <li className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md">
                Create Post
              </li>
            </a>
          </Link>
          <Link href={'/settings'}>
            <a>
              <li className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md">
                Settings
              </li>
            </a>
          </Link>
          <hr />
          <li
            className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md cursor-pointer"
            onClick={() => signOut()}
          >
            Signout
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropDown;
