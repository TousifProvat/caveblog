import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';

interface propTypes {
  slug: string;
}

const Bookmark = ({ slug }: propTypes) => {
  const { data: session, status } = useSession();
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  //function to bookmark post

  const toggleBookmarkPost = async (slug: string) => {
    try {
      if (active) {
        await axios.delete('/bookmark/delete', {
          data: {
            slug,
          },
        });
        count > 0 ? setCount(count - 1) : setCount(0);
        setActive(false);
      } else {
        await axios.post('/bookmark/create', {
          slug,
        });
        setCount(count + 1);
        setActive(true);
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  //function to fetch bookmarks count and check if user bookmarked or not
  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const {
        data,
      }: {
        data: {
          bookmarks: number;
          bookmarked: boolean;
        };
      } = await axios.get(`/bookmark/post/${slug}?user=${session?.user?.id}`);
      setCount(data.bookmarks);
      setActive(data.bookmarked);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //csr
  useEffect(() => {
    if (status !== 'loading') {
      fetchBookmarks();
    }
  }, [status]);

  if (loading) return <>...Loading</>;

  return (
    <div className="bookmark flex flex-col space-y-1 items-center">
      <div className="bookmark-icon" onClick={() => toggleBookmarkPost(slug)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-7 w-7 text-slate-500 hover:text-blue-500 hover:fill-blue-500 cursor-pointer ${
            active && 'text-blue-500 fill-blue-500'
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
      <span className="text-md text-slate-400">{count}</span>
    </div>
  );
};

export default Bookmark;
