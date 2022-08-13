import type { GetServerSideProps, NextPage } from 'next';
// import Card from '../components/Card';
const Card = dynamic(() => import('../components/Card'), {
  suspense: true,
});

import { postTypes } from '../types';
import { prisma } from '../lib/prisma';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface PropTypes {
  posts: postTypes[];
}

const Home: NextPage<PropTypes> = ({ posts }) => {
  const router = useRouter();
  return (
    <div className="h-fit pb-5 pt-10">
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {posts.length < 1 && (
          <div className="flex flex-col items-center space-y-2 absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="font-mono text-sm">No Blogs</h2>
            <p className="text-gray-500">Get started by creating a new blog</p>
            <button
              className="flex items-center px-2 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
              onClick={() => router.push('/newblog')}
            >
              <span className="pr-1 font-semibold text-xl">+</span>
              New Blog
            </button>
          </div>
        )}
        {posts.map((post, index) => (
          <Link
            href={`/posts/${post.slug}`}
            as={`/posts/${post.slug}`}
            key={index}
          >
            <a>
              <Card post={post} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      stars: true,
      bookmarks: true,
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
