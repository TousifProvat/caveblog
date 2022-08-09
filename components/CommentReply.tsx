import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { commentTypes } from '../types';
import formatDate from '../utils/formatDate';

interface propTypes {
  reply: commentTypes;
}

const CommentReply = ({ reply }: propTypes) => {
  return (
    <div className="comment-box flex space-x-2 ml-[50px]">
      <Link href={`/${reply.user.username}`}>
        <a>
          <div className="profile-avatar w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            <Image src={reply.user.image} width={40} height={40} />
          </div>
        </a>
      </Link>{' '}
      <div
        className={`comment-box w-[90%] bg-white h-fit
      border-[1px] rounded-md border-gray-200  px-3 py-1 flex flex-col justify-between"`}
      >
        <h2 className="comment-author-name font-semibold text-lg flex items-center">
          <Link href={`/${reply.user.username}`}>
            <a>{reply.user.name}</a>
          </Link>
          <span className="pl-4 text-xs font-light text-slate-500">
            {formatDate(reply.createdAt)}
          </span>
        </h2>
        <p className="comment-body text-sm font-light py-1">{reply.body}</p>
      </div>
    </div>
  );
};

export default CommentReply;
