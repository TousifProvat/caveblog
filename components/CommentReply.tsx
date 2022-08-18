import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { usePost } from '../contexts/PostContext';
import axios from '../lib/axios';
import { commentTypes } from '../types';
import formatDate from '../utils/formatDate';
import CommentForm from './CommentForm';
import DropDown from './DropDown';

interface PropTypes {
  reply?: commentTypes;
}

const CommentReply = ({ reply }: PropTypes) => {
  const { data: session } = useSession();
  const [editReply, setEditReply] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const { deleteCommentLocally, updateCommentLocally } = usePost();

  const onReplyDelete = async (id: number) => {
    try {
      setFormLoading(true);
      toast.loading('Deleting reply...');
      await axios.delete(`/comment/delete/${id}`);
      toast.dismiss();
      toast.success('Reply deleted');
      deleteCommentLocally(id);
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  const onUpdateReply = async (message: string) => {
    try {
      setFormLoading(true);
      toast.loading('Deleting reply...');
      await axios.put(`/comment/update/${reply!.id}`, {
        message,
      });
      toast.dismiss();
      toast.success('Reply deleted');
      updateCommentLocally(message, reply!.id);
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setFormLoading(false);
      setEditReply(false);
    }
  };

  return editReply ? (
    <CommentForm
      autoFocus
      initValue={reply?.body}
      session={session}
      loading={formLoading}
      type="update"
      onSubmit={onUpdateReply}
    />
  ) : (
    <div className="comment-box space-x-2 flex">
      <Link href={`/${reply?.user?.username}`} as={`/${reply?.user?.username}`}>
        <a>
          <div className="profile-avatar w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            {reply?.user && (
              <Image
                src={String(reply.user.image)}
                width={40}
                height={40}
                alt={reply.user.name!}
              />
            )}
          </div>
        </a>
      </Link>{' '}
      {reply?.user && (
        <div
          className={`comment-box w-[90%] bg-white h-fit
  border-[1px] rounded-md border-gray-200  px-3 py-1 flex flex-col justify-between"`}
        >
          <div className="reply-top flex justify-between">
            <h2 className="comment-author-name font-semibold text-lg flex items-center">
              <Link
                href={`/${reply.user.username}`}
                as={`/${reply.user.username}`}
              >
                <a>{reply.user.name}</a>
              </Link>
              <span className="pl-4 text-xs font-light text-slate-500">
                {formatDate(reply.createdAt)}
              </span>
            </h2>
            {reply.userId === session?.user.id && (
              <div className="options">
                <DropDown
                  icon={
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
                  }
                  menus={[
                    <li
                      key="1"
                      className="cursor-pointer hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md"
                      onClick={() => onReplyDelete(reply.id)}
                    >
                      Delete Reply
                    </li>,
                    <li
                      key="2"
                      className="cursor-pointer hover:bg-blue-400 hover:text-white py-2 px-2 rounded-md"
                      onClick={() => setEditReply(true)}
                    >
                      Edit Comment
                    </li>,
                  ]}
                />
              </div>
            )}
          </div>
          <p className="comment-body text-sm font-light py-1">{reply.body}</p>
        </div>
      )}
    </div>
  );
};

export default CommentReply;
