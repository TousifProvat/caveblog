import Link from 'next/link';
import { postTypes } from '../types';
import formatDate from '../utils/formatDate';

interface PropsTypes {
  post: postTypes;
}
const Post = ({ post }: PropsTypes) => {
  return (
    <Link href={`/posts/${post.slug}`}>
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
  );
};

export default Post;
