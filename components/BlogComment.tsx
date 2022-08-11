import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import axios from '../lib/axios';
import commentsByParentId from '../lib/commentsByParent';
import getComments from '../lib/getComments';
import { commentTypes } from '../types';
import formatDate from '../utils/formatDate';
import CommentReply from './CommentReply';

interface propTypes {
  comment: commentTypes;
  replies: commentTypes[];
}

const BlogComment = ({ comment, replies }: propTypes) => {
  const router = useRouter();
  const { comments, mutate } = getComments(String(router.query.slug));

  //session
  const { data: session } = useSession();
  //state
  const [boxFocus, setBoxFocus] = useState<boolean>(false);
  const [reply, setReply] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  //func
  //basically its working like adding parent comment but with parent id
  const addRepliesLocally = (comment: commentTypes) => {
    let newReply: commentTypes = {
      ...comment,
      user: { ...session?.user },
    };
    mutate({ comments: [newReply, ...comments] }, false);
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setShow(false);
      const { data } = await axios.post('/comment/create', {
        comment: reply,
        post: comment.postId,
        parentId: comment.id,
      });
      addRepliesLocally(data.comment);
      setReply('');
      setBoxFocus(false);
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="comment-box flex flex-col space-y-2">
      <div className="comment flex space-x-2">
        <Link href={`/${comment?.user?.username}`}>
          <a>
            <div className="profile-avatar w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              {comment.user?.image && (
                <Image
                  src={comment?.user?.image}
                  width={40}
                  height={40}
                  alt={comment.user.name!}
                />
              )}
            </div>
          </a>
        </Link>{' '}
        <div
          className={`comment-box w-[90%] bg-white h-fit
              border-[1px] rounded-md border-gray-200  px-3 py-1 flex flex-col justify-between"`}
        >
          <h2 className="comment-author-name font-semibold text-lg flex items-center">
            <Link href={`/${comment?.user?.username}`}>
              <a>{comment?.user?.name}</a>
            </Link>
            <span className="pl-4 text-xs font-light text-slate-500">
              {formatDate(comment?.createdAt)}
            </span>
          </h2>
          <p className="comment-body text-sm font-light py-1">
            {comment?.body}
          </p>
          {session && (
            <div
              className="group w-fit interactions flex items-center space-x-1 py-2 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >
              <span className="text-sm text-slate-300 group-hover:text-slate-500">
                reply
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-slate-300 group-hover:text-slate-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {show && (
        <form
          className="add-comment-section flex flex-col space-y-2"
          onSubmit={onSubmit}
        >
          <div className="comment-box flex space-x-2 ml-[50px]">
            <div className="profile-avatar w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  width={40}
                  height={40}
                  alt={session.user.name!}
                />
              )}
            </div>
            <textarea
              placeholder="Add Reply..."
              className={`comment-box w-[90%] h-${
                boxFocus ? '36' : '20'
              } border-[1px] rounded-md border-gray-300 outline-none focus:border-blue-500 px-2 py-1 placeholder:font-light resize-y min-h-[100px]`}
              onFocus={() => setBoxFocus(true)}
              onChange={(e) => setReply(e.target.value)}
              value={reply}
              required
            ></textarea>
          </div>
          {boxFocus && (
            <div className="buttons ml-[98px] space-x-2">
              <button
                className="comment-submit-button  px-[6px] py-[6px] bg-blue-400 hover:bg-blue-500 rounded-md w-20  text-white"
                type="submit"
              >
                Submit
              </button>
              <button
                className="px-[6px] py-[6px] bg-red-500 hover:bg-red-600 rounded-md w-20 text-white"
                onClick={() => setShow(false)}
                type="button"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      )}
      <div className="comment-container flex flex-col space-y-2">
        {replies?.map((reply: commentTypes, index: number) => (
          <CommentReply key={index} reply={reply} />
        ))}
      </div>
    </div>
  );
};

export default BlogComment;
