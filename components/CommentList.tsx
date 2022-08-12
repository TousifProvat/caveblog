import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
  FunctionComponent,
  SyntheticEvent,
  useMemo,
  useState,
} from 'react';
import axios from '../lib/axios';
import commentsByParentId from '../lib/commentsByParent';
import useComments from '../lib/getComments';
import { commentTypes } from '../types';
import BlogComment from './BlogComment';

interface PropTypes {
  // comments: commentTypes[];
  postId: number;
}

const CommentList: FunctionComponent<PropTypes> = ({ postId }) => {
  //hooks
  const { data: session } = useSession();

  //swr call to get comments
  const { comments, mutate } = useComments(postId);

  // states
  const [boxFocus, setBoxFocus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(''); //comment body

  const nestedComments = useMemo(
    () => commentsByParentId(comments),
    [comments]
  );

  // function to add comment locally
  const addCommentLocally = () => {
    let newComment = {
      body: message,
      createdAt: Date.now(),
      parentId: null,
      postId: postId,
      updatedAt: Date.now(),
      userId: session?.user.id,
      user: { ...session?.user },
    };
    // mutate -> add comments locally
    mutate({ comments: [newComment, ...comments] }, false);
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setMessage('');
      setBoxFocus(false);
      addCommentLocally();
      //api call to create comment
      await axios.post('/comment/create', {
        message,
        post: postId,
      });
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="comment-container flex flex-col space-y-5">
      <h2 className="section-title text-xl font-bold">
        Discussion ({comments?.length || 0})
      </h2>
      {session && (
        <form
          className="add-comment-section flex flex-col space-y-2"
          onSubmit={onSubmit}
        >
          <div className="comment-box flex space-x-2">
            <div className="profile-avatar w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              {session?.user?.image && (
                <Image
                  priority
                  src={session.user.image}
                  width={40}
                  height={40}
                  alt={session.user.name!}
                />
              )}
            </div>
            <textarea
              placeholder="Add Comment..."
              className={`comment-box w-[90%] h-${
                boxFocus ? '36' : '20'
              } border-[1px] rounded-md border-gray-300 outline-none focus:border-blue-500 px-2 py-1 placeholder:font-light resize-y min-h-[100px]`}
              onFocus={() => setBoxFocus(true)}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
            ></textarea>
          </div>
          {boxFocus && (
            <button
              className="comment-submit-button px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-md w-20 ml-[3rem] text-white"
              type="submit"
            >
              Submit
            </button>
          )}
        </form>
      )}
      {nestedComments['parent']?.map((comment: commentTypes, index: number) => (
        <BlogComment
          key={index}
          comment={comment}
          replies={nestedComments[String(comment.id)]!}
        />
      ))}
    </div>
  );
};

export default CommentList;
