import { useSession } from 'next-auth/react';
import React, { FunctionComponent } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import axios from '../lib/axios';

interface PropTypes {
  postId: number;
}

const Bookmark: FunctionComponent<PropTypes> = ({ postId }) => {
  const { data: session } = useSession();

  //swr call to get bookmark count and user bookmark status
  const { data, error, mutate } = useSWR<{
    bookmarked: boolean;
    bookmarks: number;
  }>(`/bookmark/post/${postId}?user=${session?.user.id}`);

  //function to toggle bookmark post
  const toggleBookmarkPost = async (postId: number) => {
    try {
      if (!session) {
        return toast.error('Unauthorized Access');
      }
      if (data?.bookmarked) {
        //mutation -> decreases bookmark count & false bookmarked
        mutate(
          {
            ...data,
            bookmarked: false,
            bookmarks: data.bookmarks > 0 ? data.bookmarks - 1 : 0,
          },
          false
        );
        //api call to delete bookmark
        await axios.delete('/bookmark/delete', {
          data: {
            postId,
          },
        });
      } else {
        //mutation -> increases bookmark count & true bookmarked
        mutate(
          {
            ...data,
            bookmarked: true,
            bookmarks: data!.bookmarks + 1,
          },
          false
        );
        //api call to create bookmark
        await axios.post('/bookmark/create', {
          postId,
        });
        toast.success('Post bookmarked!');
      }
    } catch (err: any) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="bookmark flex sm:flex-col space-x-1 sm:space-x-0 sm:space-y-1 items-center">
      <div className="bookmark-icon" onClick={() => toggleBookmarkPost(postId)}>
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
      {error && (
        <span className="text-red-500 px-1 bg-red-200 rounded-sm">!</span>
      )}
      {!data && !error && (
        <span className="p-[10px] bg-gray-200 rounded-sm"></span>
      )}
      {data && <span className="text-md text-slate-400">{data.bookmarks}</span>}
    </div>
  );
};

export default Bookmark;
