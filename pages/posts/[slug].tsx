import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEventHandler, SyntheticEvent, useMemo, useState } from 'react';

//components
import Bookmark from '../../components/Bookmark';
import CommentList from '../../components/CommentList';
import DropDown from '../../components/DropDown';
import Star from '../../components/Star';

//libs
import axios from '../../lib/axios';
import commentsByParentId from '../../lib/commentsByParent';
import getComments from '../../lib/getComments';

//types
import { commentTypes, postTypes } from '../../types';

//util
import formatDate from '../../utils/formatDate';

interface PropTypes {
  post: postTypes;
}

const Slug: NextPage<PropTypes> = ({ post }) => {
  //states
  const [boxFocus, setBoxFocus] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(''); //comment body
  const [edit, setEdit] = useState<boolean>(false);
  const [blogValues, setBlogValues] = useState({
    title: post?.title,
    body: post?.body,
  });

  //hooks
  const { data: session } = useSession();
  const router = useRouter();
  const { comments, error, mutate } = getComments(post.slug);

  const nestedComments = useMemo(
    () => commentsByParentId(comments),
    [comments]
  );

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBlogValues({ ...blogValues, [e.target.name]: e.target.value });
  };

  // delete post
  const deleteBlog = async () => {
    try {
      await axios.delete(`/post/delete/${post.id}`);
      alert('deleted successfully');
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  //update post
  const onUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/post/update/${post.id}`, blogValues);
      alert(res.data.message);
      setEdit(false);
      router.push(`/posts/${res.data.post.slug}`);
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  // add comment
  const addCommentLocally = (comment: commentTypes) => {
    let newComment = {
      ...comment,
      user: { ...session?.user },
    };
    mutate({ comments: [newComment, ...comments] }, false);
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/comment/create', {
        comment,
        post: post.id,
      });
      addCommentLocally(data.comment);
      setComment('');
      setBoxFocus(false);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row sm:justify-between relative">
      <div className="interaction-section fixed hidden sm:block sm:space-y-5 sm:left-auto sm:top-[40%] sm:translate-y-[-50%]">
        {post && <Star slug={post?.slug} />}
        {post && <Bookmark slug={post?.slug} />}
      </div>
      <div className="min-h-screen blog-container w-full overflow-hidden space-y-3 sm:ml-12 md:ml-16 bg-white shadow-md sm:pb-10 rounded-b-md">
        <div className="blog-img w-full h-auto bg-gray-400"> </div>
        <div className="blog-body px-4 space-y-4 min-h-[300px]">
          <div className="blog-header flex justify-between">
            <div className="author flex space-x-3">
              <Link href={`/${post?.author?.username}`}>
                <a>
                  <div className="author-img w-12 h-12 bg-gray-400 rounded-full overflow-hidden">
                    {post?.author?.image && (
                      <Image
                        src={post.author.image}
                        width={48}
                        height={48}
                        alt={post.author.name}
                      />
                    )}
                  </div>
                </a>
              </Link>
              <div className="author-details flex flex-col justify-between">
                <Link href={`/${post?.author?.username}`}>
                  <a>
                    <h2 className="author-name font-semibold hover:text-blue-500 cursor-pointer">
                      {post?.author?.name}
                    </h2>
                  </a>
                </Link>
                <span className="text-xs text-slate-500">
                  Posted on {formatDate(post?.createdAt)}
                </span>
              </div>
            </div>
            {post?.author.username === session?.user?.username && (
              <DropDown
                icon={
                  <div className="options cursor-pointer hover:bg-blue-200 rounded-full h-8 w-8 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </div>
                }
                menus={[
                  <li
                    onClick={deleteBlog}
                    className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md flex flex-col cursor-pointer"
                    key="1"
                  >
                    Delete Blog
                  </li>,
                  <li
                    className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md flex flex-col cursor-pointer"
                    onClick={() => setEdit(true)}
                    key="2"
                  >
                    Edit Blog
                  </li>,
                ]}
              />
            )}
          </div>
          {edit ? (
            <>
              <form onSubmit={onUpdate}>
                <textarea
                  onChange={onChange}
                  value={blogValues.title}
                  name="title"
                  placeholder="New post title here..."
                  maxLength={250}
                  className="w-full text-3xl px-4 py-2 outline-none font-bold resize-none h-[100px] md:h-[100px]"
                  required
                />
                <hr />
                <textarea
                  onChange={onChange}
                  value={blogValues.body}
                  name="body"
                  placeholder="Write your post here...."
                  className="w-full resize-none outline-none px-4 py-2 h-[400px]"
                  maxLength={3000}
                  required
                />
                <div className="buttons space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="title text-3xl font-bold">{blogValues.title}</h2>
              <p className="blog-content text-lg font-light">
                {blogValues.body}
              </p>
            </>
          )}
        </div>
        <div className="w-full interaction-section-small space-x-5 flex items-center justify-center pt-5 sm:pb-10 sm:hidden">
          {post && <Star slug={post?.slug} />}
          {post && <Bookmark slug={post?.slug} />}
        </div>
        <div className="discussion px-4 space-y-6 pb-2">
          <h2 className="section-title text-xl font-bold">
            Discussion ({comments?.length || 0})
          </h2>
          {session && (
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
                      alt={session.user.name!}
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
          )}
          {comments && <CommentList comments={nestedComments} />}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, status } = await axios.get(`/post/${context.params?.slug}`);

  if (status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data.post,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get('/post');

  const paths = data.posts.map((post: postTypes) => ({
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

export default Slug;
