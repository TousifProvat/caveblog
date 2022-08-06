import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';

interface propTypes {
  slug: string;
}

const Star = ({ slug }: propTypes) => {
  const { data: session, status } = useSession();
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);

  //function to star post

  const toggleStarPost = async (slug: string) => {
    try {
      if (active) {
        await axios.delete('/star/delete', {
          data: {
            slug,
          },
        });
        count > 0 ? setCount(count - 1) : setCount(0);
        setActive(false);
      } else {
        await axios.post('/star/create', {
          slug,
        });
        setCount(count + 1);
        setActive(true);
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  //function to fetch stars count and check if user starred or not
  const fetchStars = async () => {
    try {
      const {
        data,
      }: {
        data: {
          stars: number;
          starred: boolean;
        };
      } = await axios.get(`/star/post/${slug}?user=${session?.user?.id}`);
      setCount(data.stars);
      setActive(data.starred);
    } catch (err) {
      console.log(err);
    }
  };

  //csr
  useEffect(() => {
    if (status !== 'loading') {
      fetchStars();
    }
  }, [status]);

  return (
    <div className="star flex flex-col space-y-1 items-center">
      <div className="star-icon" onClick={() => toggleStarPost(slug)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-7 w-7 text-slate-500 hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer ${
            active && 'text-yellow-400 fill-yellow-400'
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
      <span className="text-md text-slate-400">{count}</span>
    </div>
  );
};

export default Star;
