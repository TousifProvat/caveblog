import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardProps {
  name: string;
  title: string;
  image: string;

  slug: string;
}

const Card = (props: CardProps) => {
  const { name, title, image, slug } = props;
  return (
    <Link href={`/posts/${slug}`}>
      <a>
        <div className="card flex flex-col justify-between bg-white rounded-md w-full h-fit shadow-sm hover:shadow-md relative overflow-x-hidden space-y-2 pb-5 ">
          <div className="blog-image w-30 h-40 bg-gray-200"></div>
          <div className="author flex space-x-2 pl-2">
            <div className="author-img h-9 w-9 rounded-full bg-gray-200 overflow-hidden">
              {image && (
                <Image src={image} objectFit="contain" width={36} height={36} />
              )}
            </div>
            <div className="author-details">
              <div className="author-name text-xs font-semibold">{name}</div>
              <div className="post-time">
                <span className="text-xs text-slate-500">
                  Jul 30 (16hrs ago)
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-[1.4rem] sm:text-[1.5rem] font-bold pl-12 pb-2">
            {title}
          </h2>
          <div className="flex align-middle justify-evenly  w-full">
            <div className="star group flex space-x-1 items-center hover:bg-yellow-200 px-2 py-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-500 group-hover:fill-yellow-400 group-hover:text-yellow-400 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <span className="text-xs text-slate-500">2k stars</span>
            </div>
            <div className="bookmark group flex space-x-1 items-center hover:bg-blue-200 px-2 py-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-500 group-hover:text-blue-500 group-hover:fill-blue-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span className="text-xs text-slate-500 ">1k bookmarks</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
