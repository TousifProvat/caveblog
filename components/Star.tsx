import { useSession } from 'next-auth/react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from '../lib/axios';

interface PropTypes {
  postId: number;
}

const Star: FunctionComponent<PropTypes> = ({ postId }) => {
  //hooks
  const { data: session, status } = useSession();
  //swr call to get star count and user star status
  const { data, error, mutate } = useSWR<{
    starred: boolean;
    stars: number;
  }>(`/star/post/${postId}?user=${session?.user.id}`);

  //function to toggle star post
  const toggleStarPost = async (postId: number) => {
    try {
      if (data?.starred) {
        //mutation -> decreases star count & false starred
        mutate(
          {
            ...data,
            starred: false,
            stars: data.stars > 0 ? data.stars - 1 : 0,
          },
          false
        );
        //api call to delete bookmark
        await axios.delete('/star/delete', {
          data: {
            postId,
          },
        });
      } else {
        //mutation -> increases star count & true starred
        mutate(
          {
            ...data,
            starred: true,
            stars: data!.stars + 1,
          },
          false
        );
        //api call to create bookmark
        await axios.post('/star/create', {
          postId,
        });
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="star flex sm:flex-col space-x-1 sm:space-x-0 sm:space-y-1 items-center ">
      <div className="star-icon" onClick={() => toggleStarPost(postId)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-7 w-7 text-slate-500 hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer ${
            data?.starred && 'text-yellow-400 fill-yellow-400'
          }`}
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
      {error && (
        <span className="text-red-500 px-1 bg-red-200 rounded-sm">!</span>
      )}
      {!data && !error && (
        <span className="p-[10px] bg-gray-200 rounded-sm"></span>
      )}
      {data && <span className="text-md text-slate-400">{data.stars}</span>}
    </div>
  );
};

export default Star;
