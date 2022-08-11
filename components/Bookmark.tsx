import { useSession } from 'next-auth/react';
import { off } from 'process';
import React, { FunctionComponent, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from '../lib/axios';

interface PropTypes {
  slug: string;
}

const Bookmark: FunctionComponent<PropTypes> = ({ slug }) => {
  const { data: session } = useSession();
  const { data, error, mutate } = useSWR<{
    bookmarked: boolean;
    bookmarks: number;
  }>(`/bookmark/post/${slug}?user=${session?.user.id}`);

  //function to bookmark post
  const toggleBookmarkPost = async (slug: string) => {
    try {
      if (data?.bookmarked) {
        await axios.delete('/bookmark/delete', {
          data: {
            slug,
          },
        });

        mutate(
          {
            ...data,
            bookmarked: false,
            bookmarks: data.bookmarks > 0 ? data.bookmarks - 1 : 0,
          },
          false
        );
      } else {
        await axios.post('/bookmark/create', {
          slug,
        });
        mutate(
          {
            ...data,
            bookmarked: true,
            bookmarks: data!.bookmarks + 1,
          },
          false
        );
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  if (!data && !error) return <>...Loading</>;

  if (error) return <>Something went wrong</>;

  return (
    <div className="bookmark flex sm:flex-col space-x-1 sm:space-x-0 sm:space-y-1 items-center">
      <div className="bookmark-icon" onClick={() => toggleBookmarkPost(slug)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-7 w-7 text-slate-500 hover:text-blue-500 hover:fill-blue-500 cursor-pointer ${
            data?.bookmarked && 'text-blue-500 fill-blue-500'
          }`}
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
      <span className="text-md text-slate-400">{data?.bookmarks}</span>
    </div>
  );
};

export default Bookmark;
