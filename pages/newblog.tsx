import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEventHandler, SyntheticEvent, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import axios from '../lib/axios';
import withAuth from '../lib/withAuth';

const NewBlog: NextPage = () => {
  //states
  const [blogValues, setBlogValues] = useState({
    title: '',
    body: '',
  });
  const [loading, setLoading] = useState(false);

  //hooks
  const router = useRouter();

  //funcs
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBlogValues({ ...blogValues, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      toast.loading('Creating post...');
      setLoading(true);
      await axios.post('/post/create', blogValues);
      toast.dismiss();
      toast.success('Post created');
      setBlogValues({
        title: '',
        body: '',
      });
      router.push('/');
    } catch (err: any) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full h-[80vh] flex flex-col space-y-2 mx-auto max-w-[800px]">
        <div className="header flex justify-end px-2 py-2">
          <Link href={'/'} as={'/'}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-600 hover:text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
          </Link>
        </div>
        <form
          onSubmit={onSubmit}
          className="space-y-2 md:space-y-0 rounded-md shadow-md"
        >
          <div className="flex flex-col h-[80vh] md:h-[75vh]">
            <textarea
              onChange={onChange}
              name="title"
              placeholder="New post title here..."
              maxLength={250}
              className="w-full text-3xl px-4 py-2 outline-none font-bold resize-none h-[200px] md:h-[250px]"
              required
            />
            <hr />
            <textarea
              onChange={onChange}
              name="body"
              placeholder="Write your post here...."
              className="w-full resize-none outline-none px-4 py-2 h-[100%]"
              maxLength={3000}
              required
            />
          </div>
          <div className="footer w-full fixed md:relative bottom-0 left-0 px-2 py-2 bg-gray-100 border-t-[1px] border-t-gray-200">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? <Spinner size={5} /> : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(NewBlog);
