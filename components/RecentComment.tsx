import Link from 'next/link';
import React from 'react';
import { commentTypes } from '../types';
import formatDate from '../utils/formatDate';

interface propTypes {
  comment: commentTypes;
}

const RecentComment = ({ comment }: propTypes) => {
  return (
    <Link href={`/posts/${comment.post.slug}`}>
      <div
        className="comment px-4 py-4 border border-b-slate-100 cursor-pointer
              hover:bg-gray-50
                "
      >
        <h2 className="font-bold">{comment.post.title}</h2>
        <div className="comment-bottom flex justify-between items-center">
          <div className="desc text-[15px] text-black font-light">
            {comment.body.slice(0, 50)}...
          </div>
          <div className="time text-xs text-slate-500">
            {formatDate(comment.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecentComment;
