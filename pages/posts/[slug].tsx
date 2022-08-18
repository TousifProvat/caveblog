import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEventHandler, SyntheticEvent, useState } from 'react';
import { prisma } from '../../lib/prisma';

//components
import PageHead from '../../components/Head';
import CommentList from '../../components/CommentList';
const Bookmark = dynamic(() => import('../../components/Bookmark'), {
  ssr: false,
});
const Star = dynamic(() => import('../../components/Star'), { ssr: false });
const DropDown = dynamic(() => import('../../components/DropDown'));

//libs
import axios from '../../lib/axios';

//types
import { postTypes } from '../../types';

//util
import formatDate from '../../utils/formatDate';
import dynamic from 'next/dynamic';
import CommentForm from '../../components/CommentForm';
import { usePost } from '../../contexts/PostContext';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';

interface PropTypes {
  post: postTypes;
}

const Slug: NextPage<PropTypes> = ({ post }) => {
  const { addCommentLocally, rootComments } = usePost();
  const { data: session } = useSession();
  const router = useRouter();

  const [editPost, setEditPost] = useState<boolean>(false);
  const [blogValues, setBlogValues] = useState({
    title: post?.title,
    body: post?.body,
  });
  const [loading, setLoading] = useState(false);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBlogValues({ ...blogValues, [e.target.name]: e.target.value });
  };

  // delete blog post
  const onDeleteBlog = async () => {
    try {
      toast.loading('Deleting post...');
      await axios.delete(`/post/delete/${post.id}`);
      toast.dismiss();
      toast.success('Post deleted');
      router.push('/');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  //update blog post
  const onUpdateBlog = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      toast.loading('Updating post...');
      setLoading(true);
      const res = await axios.put(`/post/update/${post.id}`, blogValues);
      toast.dismiss();
      toast.success('Post updated');
      setEditPost(false);
      router.push(`/posts/${res.data.post.slug}`);
    } catch (err: any) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  //comments list
  const onCommentCreate = async (message: string) => {
    try {
      setLoading(true);
      toast.loading('Commenting...');
      const { data } = await axios.post('/comment/create', {
        message,
        post: post.id,
      });
      toast.dismiss();
      toast.success('Commented');
      const newComment = {
        ...data.comment,
        user: session?.user,
      };
      addCommentLocally(newComment);
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHead title={post?.title}>
        <meta name="description" content={post?.body.slice(0, 20)} />
        <meta name="robots" content="index,follow" />
        <meta name="language" content="English" />
        <meta name="author" content={post?.author.name} />
      </PageHead>
      <div className="min-h-screen w-full flex flex-col sm:flex-row sm:justify-between relative">
        <div className="interaction-section fixed hidden sm:block sm:space-y-5 sm:left-auto sm:top-[40%] sm:translate-y-[-50%]">
          {post && <Star postId={post.id} />}
          {post && <Bookmark postId={post.id} />}
        </div>
        <div className="min-h-screen blog-container w-full overflow-hidden space-y-3 sm:ml-12 md:ml-16 bg-white shadow-md sm:pb-10 rounded-b-md">
          <div className="blog-img w-full h-auto bg-gray-400"> </div>
          <div className="blog-body px-4 space-y-4 min-h-[300px]">
            <div className="blog-header flex justify-between">
              <div className="author flex space-x-3">
                <Link
                  href={`/${post?.author?.username}`}
                  as={`/${post?.author?.username}`}
                >
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
                  <Link
                    href={`/${post?.author?.username}`}
                    as={`/${post?.author?.username}`}
                  >
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
                      onClick={onDeleteBlog}
                      className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md flex flex-col cursor-pointer"
                      key="1"
                    >
                      Delete Blog
                    </li>,
                    <li
                      className="hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md flex flex-col cursor-pointer"
                      onClick={() => setEditPost(true)}
                      key="2"
                    >
                      Edit Blog
                    </li>,
                  ]}
                />
              )}
            </div>
            {editPost ? (
              <form onSubmit={onUpdateBlog}>
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
                <div className="buttons space-x-2 flex item-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? <Spinner size={6} /> : 'Update'}
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => setEditPost(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="title text-3xl font-bold">{blogValues.title}</h2>
                <p className="blog-content text-lg font-light">
                  {blogValues.body}
                </p>
              </>
            )}
          </div>
          <div className="w-full interaction-section-small space-x-5 flex items-center justify-center py-5 pb sm:hidden">
            {post && <Star postId={post.id} />}
            {post && <Bookmark postId={post.id} />}
          </div>
          <div className="discussion pt-4 space-y-6 pb-[7rem] sm:pb-[4rem] w-[95%] mx-auto">
            <h2>
              Discussion <span>({rootComments?.length ?? 0})</span>
            </h2>
            {session && (
              <CommentForm
                onSubmit={onCommentCreate}
                session={session}
                loading={loading}
              />
            )}
            {rootComments && rootComments.length > 0 && (
              <CommentList comments={rootComments} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      slug: String(params!.slug),
    },
    include: {
      author: {
        select: {
          username: true,
          name: true,
          image: true,
        },
      },
      stars: true,
      bookmarks: true,
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.toString(),
    },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};

export default Slug;
