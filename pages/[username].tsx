import { useRouter } from 'next/router';
import Post from '../components/Post';

const Username = () => {
  const { query } = useRouter();

  return (
    <>
      <div className="w-full h-40 bg-black absolute left-0 top-16 z-10"></div>
      <div className="min-h-screen relative flex flex-col ">
        <div className="w-full h-fit sm:h-64 bg-white absolute z-10 top-24 sm:rounded-md p-2 border-2 border-gray-100">
          <div className="profile-img w-20 h-20 sm:w-36 sm:h-36 bg-gray-200 rounded-full absolute top-[-20%] sm:top-[-30%] sm:translate-x-[-50%] sm:left-[50%] border-4 border-black"></div>
          <div className="btn flex justify-end sm:mb-10">
            <button className="px-2 py-2 bg-blue-500 rounded-md m-2 text-white hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
          <div className="profile-infos sm:text-center flex flex-col space-y-2 pl-4">
            <h2 className="name font-bold text-2xl sm:text-3xl">
              {query.username}
            </h2>
            <p className="bio text-lg">404 bio not found</p>
            <p className="joined text-slate-400"> Joined on 2026 June 2021</p>
          </div>
        </div>
        <div className="profile-bottom mt-[17.5rem] sm:mt-[24rem] grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="comment-section rounded-md overflow-hidden border-2 border-gray-100 bg-white ">
            <div className="header px-4 py-3 border border-b-gray-100 border-t-0">
              <h2 className="text-lg font-bold">Recent Posts</h2>
            </div>
            <div className="comments">
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
          <div className="starred-post-section rounded-md overflow-hidden border-2 border-gray-100 bg-white ">
            <div className="header px-4 py-3 border border-b-gray-100 border-t-0">
              <h2 className="text-lg font-bold">Recent Comments</h2>
            </div>
            <div className="comments">
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
          <div className="post-section rounded-md overflow-hidden border-2 border-gray-100 bg-white ">
            <div className="header px-4 py-3 border border-b-gray-100 border-t-0">
              <h2 className="text-lg font-bold">Starred Posts</h2>
            </div>
            <div className="comments">
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
          <div className="post-section rounded-md overflow-hidden border-2 border-gray-100 bg-white ">
            <div className="header px-4 py-3 border border-b-gray-100 border-t-0">
              <h2 className="text-lg font-bold">Bookmarked Posts</h2>
            </div>
            <div className="comments">
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
