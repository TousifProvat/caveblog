import Link from 'next/link';
import { postTypes } from '../types';

interface PropsTypes {
  post: postTypes;
}
const Post = ({ post }: PropsTypes) => {
  console.log(post);
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
          <div className="time text-xs text-slate-500">Jun25 '21 </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
