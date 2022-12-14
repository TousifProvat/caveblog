import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { server } from '../config';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

//component
const Post = dynamic(() => import('../components/RecentPost'));
const RecentComment = dynamic(() => import('../components/RecentComment'), {});

const Spinner = dynamic(() => import('../components/Spinner'));

//types
import {
  bookmarkTypes,
  commentTypes,
  postTypes,
  starTypes,
  userTypes,
} from '../types';

interface PropTypes {
  user: userTypes;
  comments: commentTypes[];
  posts: postTypes[];
  stars: starTypes[];
  bookmarks: bookmarkTypes[];
}

const Username: NextPage<PropTypes> = ({
  user,
  comments,
  posts,
  stars,
  bookmarks,
}) => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="w-full h-40 bg-black" />
        <div
          className={`flex flex-col sm:items-center w-full h-fit pb-10 bg-white p-2 border-2 border-gray-100 ${
            status === 'unauthenticated' && 'space-y-2'
          }`}
        >
          <div
            className="profile-img w-20 h-20 sm:w-36 sm:h-36
          overflow-hidden bg-gray-200 rounded-full 
          relative border-4 border-black -mt-[4rem] sm:-mt-[6rem]"
          >
            <Image
              priority
              src={user?.image}
              layout="fill"
              objectFit="contain"
              alt={user.name}
            />
          </div>
          <div className="btn self-end -mt-[1rem] sm:-mt-[2rem]">
            {!session && status === 'loading' && <Spinner size={8} />}
            {session && status === 'authenticated' && (
              <Link href="/settings" as={'/settings'}>
                <a>
                  <button
                    className={`px-2 py-2 bg-blue-500 rounded-md m-2 text-white hover:bg-blue-600 ${
                      session?.user?.email !== user?.email &&
                      'opacity-0 pointer-events-none'
                    }`}
                  >
                    Edit Profile
                  </button>
                </a>
              </Link>
            )}
          </div>
          <div className="profile-infos sm:text-center flex flex-col">
            <h2 className="name font-bold text-2xl sm:text-3xl flex flex-col">
              {user?.name}
              <span className="text-xs font-light">
                {user?.profile?.headline}
              </span>
            </h2>
            <p className="bio text-lg">
              {user?.profile?.bio ? user.profile.bio : '404 bio not found'}
            </p>
            <div className="text-center flex flex-col sm:flex-row sm:space-x-2 sm:justify-center items-start sm:items-center text-slate-400">
              <p className="location text-sm">{user?.profile?.location}</p>
              <p className="website text-sm">
                {user?.profile?.website && (
                  <Link href={user.profile.website} as={user.profile.website}>
                    <a target="_blank" className="hover:text-blue-500">
                      {user.profile.website}
                    </a>
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="profile-bottom grid grid-cols-1 sm:grid-cols-2">
          <div className="post-section rounded-md overflow-hidden border-2 border-gray-100 bg-white ">
            <div className="header px-4 py-3 border border-b-gray-100 border-t-0">
              <h2 className="text-lg font-bold">Recent Posts</h2>
            </div>
            <div className="posts max-h-[400px] overflow-y-auto">
              {posts.map((post, index) => (
                <Post post={post} key={index} />
              ))}
            </div>
          </div>
          <div className="comment-section rounded-md overflow-hidden border-2 border-gray-100 bg-white ">
            <div className="header px-4 py-3 border border-b-gray-100 border-t-0">
              <h2 className="text-lg font-bold">Recent Comments</h2>
            </div>
            <div className="comments max-h-[400px] overflow-y-auto">
              {comments.map((comment, index) => (
                <RecentComment comment={comment} key={index} />
              ))}
            </div>
          </div>
          <div className="star-section rounded-md overflow-hidden border-2 border-gray-100 bg-white ">
            <div className="header px-4 py-3 border border-b-gray-100 border-t-0">
              <h2 className="text-lg font-bold">Starred Posts</h2>
            </div>
            <div className="stars max-h-[400px] overflow-y-auto">
              {stars.map((star, index) => (
                <Post post={star.post} key={index} />
              ))}
            </div>
          </div>
          <div className="bookmark-section rounded-md overflow-hidden border-2 border-gray-100 bg-white ">
            <div className="header px-4 py-3 border border-b-gray-100 border-t-0">
              <h2 className="text-lg font-bold">Bookmarked Posts</h2>
            </div>
            <div className="bookmarks max-h-[400px] overflow-y-auto">
              {bookmarks.map((bookmark, index) => (
                <Post post={bookmark.post} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${server}/user/${context.query.username}`);

  const data = await res.json();

  if (res.status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: data.user,
      comments: data.user.comments,
      posts: data.user.posts,
      stars: data.user.stars,
      bookmarks: data.user.bookmarks,
    },
  };
};

export default Username;
