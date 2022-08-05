import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';
import BlogComment from '../../components/BlogComment';
import axios from '../../lib/axios';

interface Reply {
  id: number;
  body: string;
  postId: number;
  userId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    name: string;
    image: string;
  };
}

interface commentType {
  id: number;
  body: string;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    name: string;
    image: string;
  };
  replies: Reply[];
}

interface postTypes {
  id: number;
  title: string;
  body: string;
  author: {
    username: string;
    name: string;
    image: string;
  };
}

interface slugPropTypes {
  post: postTypes;
  comments: commentType[];
}

const slug = ({ post, comments }: slugPropTypes) => {
  const [boxFocus, setBoxFocus] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const { data: session } = useSession();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/comment/create', {
        comment,
        post: post.id,
      });
      setComment('');
      setBoxFocus(false);
      alert(data.message);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row sm:justify-between relative">
      <div className="interaction-section fixed hidden sm:block sm:space-y-5 sm:left-auto sm:top-[40%] sm:translate-y-[-50%]">
        <div className="star flex flex-col space-y-1 items-center">
          <div className="star-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-500 hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <span className="text-md text-slate-400">11</span>
        </div>
        <div className="bookmark flex flex-col space-y-1 items-center">
          <div className="bookmark-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-500 hover:text-blue-500 hover:fill-blue-500 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <span className="text-md text-slate-400">12</span>
        </div>
      </div>
      <div className="blog-container w-full overflow-hidden space-y-3 sm:ml-12 md:ml-16 bg-white shadow-md pb-10 rounded-b-md">
        <div className="blog-img w-full h-auto bg-gray-400"> </div>
        <div className="blog-body px-4 space-y-4">
          <div className="flex author space-x-3">
            <Link href={`/${post.author.username}`}>
              <a>
                <div className="author-img w-12 h-12 bg-gray-400 rounded-full overflow-hidden">
                  <Image src={post.author.image} width={48} height={48} />
                </div>
              </a>
            </Link>
            <div className="author-details flex flex-col justify-between">
              <Link href={`/${post.author.username}`}>
                <a>
                  <h2 className="author-name font-semibold hover:text-blue-500 cursor-pointer">
                    {post.author.name}
                  </h2>
                </a>
              </Link>
              <span className="text-xs text-slate-500">Posted on 31 July</span>
            </div>
          </div>
          <h2 className="title text-3xl font-bold">{post.title}</h2>
          <p className="blog-content text-lg font-light">{post.body}</p>
        </div>
        <div className="w-full interaction-section-small space-x-5 flex items-center justify-center pt-5 pb-10 sm:hidden">
          <div className="star flex space-x-1 items-center">
            <div className="star-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-slate-500 hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <span className="text-md text-slate-400">11</span>
          </div>
          <div className="bookmark flex space-x-1 items-center">
            <div className="bookmark-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-slate-500 hover:text-blue-500 hover:fill-blue-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <span className="text-md text-slate-400">12</span>
          </div>
        </div>
        <div className="discussion px-4 space-y-6 pb-2">
          <h2 className="section-title text-xl font-bold">Discussion (20)</h2>
          <form
            className="add-comment-section flex flex-col space-y-2"
            onSubmit={onSubmit}
          >
            <div className="comment-box flex space-x-2">
              <div className="profile-avatar w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                {session?.user?.image && (
                  <Image
                    priority
                    src={session.user.image}
                    width={40}
                    height={40}
                  />
                )}
              </div>
              <textarea
                placeholder="Add Comment..."
                className={`comment-box w-[90%] h-${
                  boxFocus ? '36' : '20'
                } border-[1px] rounded-md border-gray-300 outline-none focus:border-blue-500 px-2 py-1 placeholder:font-light resize-y min-h-[100px]`}
                onFocus={() => setBoxFocus(true)}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                required
              ></textarea>
            </div>
            {boxFocus && (
              <button
                className="comment-submit-button px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-md w-20 ml-[3rem] text-white"
                type="submit"
              >
                Submit
              </button>
            )}
          </form>
          <div className="comment-container flex flex-col space-y-10">
            {comments.map((comment, index) => (
              <BlogComment key={index} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    `http://localhost:3000/api/post/${context.params?.slug}`
  );
  const data = await res.json();

  return {
    props: {
      post: data.post,
      comments: data.post.comments,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get('/post');

  const paths = data.posts.map((post: any) => ({
    params: {
      username: post.author.username,
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

slug.public = true;

export default slug;
