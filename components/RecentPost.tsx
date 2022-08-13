import Link from 'next/link';
import { Suspense } from 'react';
import { postTypes } from '../types';
import formatDate from '../utils/formatDate';
import Spinner from './Spinner';

interface PropsTypes {
  post: postTypes;
}
const Post = ({ post }: PropsTypes) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Link href={`/posts/${post.slug}`} as={`/posts/${post.slug}`}>
        <div
          className="comment px-4 py-4 border border-b-slate-100 cursor-pointer
    hover:bg-gray-50
      "
        >
          <h2 className="font-bold">{post.title}</h2>
          <div className="comment-bottom flex justify-between items-center">
            <div className="desc text-[15px] text-black font-light">
              {post.body.slice(0, 50)}...
            </div>
            <div className="time text-xs text-slate-500">
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>
      </Link>
    </Suspense>
  );
};

export default Post;
