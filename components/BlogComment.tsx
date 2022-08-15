import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import { usePost } from '../contexts/PostContext';
import axios from '../lib/axios';
import { commentTypes } from '../types';
import formatDate from '../utils/formatDate';
import CommentForm from './CommentForm';
import CommentReply from './CommentReply';

interface PropTypes {
  comment: commentTypes;
}

const BlogComment: FunctionComponent<PropTypes> = ({ comment }) => {
  const { getReplies, addCommentLocally } = usePost();
  const childComments = getReplies(comment.id);

  //hook
  const { data: session } = useSession(); // session state

  //states
  const [formShow, setFormShow] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  //funcs

  // function to create comment reply
  const onReply = async (message: string) => {
    try {
      setFormLoading(true);
      await axios.post('/comment/create', {
        message,
        post: comment.postId,
        parentId: comment.id,
      });
      let commentReply = {
        body: message,
        createdAt: Date.now(),
        parentId: comment.id,
        postId: comment.postId,
        updatedAt: Date.now(),
        userId: session?.user.id,
        user: { ...session?.user },
      };
      addCommentLocally(commentReply);
    } catch (err: any) {
      alert(err);
    } finally {
      setFormShow(false);
      setFormLoading(false);
    }
  };

  return (
    <div className="comment-box flex flex-col space-y-2">
      <div className="comment flex space-x-2">
        <Link
          href={`/${comment?.user?.username}`}
          as={`/${comment?.user?.username}`}
        >
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
        </Link>
        <div
          className={`comment-box w-[90%] bg-white h-fit
              border-[1px] rounded-md border-gray-200  px-3 py-1 flex flex-col justify-between"`}
        >
          <h2 className="comment-author-name font-semibold text-lg flex items-center">
            <Link
              href={`/${comment?.user?.username}`}
              as={`/${comment?.user?.username}`}
            >
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
              onClick={() => setFormShow((prev) => !prev)}
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
      {formShow && (
        <CommentForm
          onSubmit={onReply}
          session={session}
          loading={formLoading}
        />
      )}
      <div className="comment-container flex flex-col space-y-2">
        {childComments?.length > 0 &&
          childComments.map((reply: commentTypes, index: number) => (
            <CommentReply key={index} reply={reply} />
          ))}
      </div>
    </div>
  );
};

export default BlogComment;
