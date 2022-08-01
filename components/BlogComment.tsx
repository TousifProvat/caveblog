import Link from 'next/link';
import React from 'react';

const BlogComment = () => {
  return (
    <div className="comment-box flex space-x-2">
      <Link href="/tousifahmed">
        <a>
          <div className="profile-avatar w-10 h-10 bg-gray-300 rounded-full"></div>
        </a>
      </Link>{' '}
      <div
        className={`comment-box w-[90%] bg-white h-fit
              border-[1px] rounded-md border-gray-200  px-3 py-1 flex flex-col justify-between"`}
      >
        <h2 className="comment-author-name font-semibold text-lg flex items-center">
          <Link href="/tousifahmed">
            <a>Tousif Ahmed</a>
          </Link>
          <span className="pl-4 text-xs font-light text-slate-500">16 Jun</span>
        </h2>
        <p className="comment-body text-sm font-light py-1">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
          voluptates eveniet hic nihil esse doloremque illum, ex perferendis
          sunt tempore.
        </p>
        <div className="w-fit interactions flex items-center space-x-1 py-2 cursor-pointer">
          <span className="text-sm text-slate-500">reply</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-slate-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BlogComment;
