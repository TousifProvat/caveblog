import Link from 'next/link';
import React, { ChangeEventHandler, SyntheticEvent, useState } from 'react';
import axios from '../lib/axios';

const newblog = () => {
  const [blogValues, setBlogValues] = useState({
    title: '',
    body: '',
  });
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBlogValues({ ...blogValues, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/post/create', blogValues);
      alert(res.data.message);
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="w-full h-[80vh] flex flex-col space-y-2 mx-auto max-w-[800px]">
        <div className="header flex justify-end px-2 py-2">
          <Link href={'/'}>
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default newblog;
