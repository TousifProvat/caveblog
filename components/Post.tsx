import Link from 'next/link';

interface PropsTypes {
  title: String;
  details: String;
  time: String;
}
// { title, details, time }: PropsTypes
const Post = () => {
  return (
    <Link href="/tousifahmed/learn-go-lang">
      <div
        className="comment px-4 py-4 border border-b-slate-100 cursor-pointer
    hover:bg-gray-50
      "
      >
        <h2 className="font-bold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam,
          magni.
        </h2>
        <div className="comment-bottom flex justify-between items-center">
          <div className="desc text-[15px] text-black font-light">
            Lorem ipsum dolor, sit amet consectetur adipisic saepe...
          </div>
          <div className="time text-xs text-slate-500">Jun25 '21 </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
