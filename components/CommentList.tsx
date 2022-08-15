import dynamic from 'next/dynamic';
import React, {
  FunctionComponent,
  SyntheticEvent,
  useMemo,
  useState,
} from 'react';
import commentsByParentId from '../lib/commentsByParent';
import useComments from '../lib/getComments';
import { commentTypes } from '../types';
import Spinner from './Spinner';
const BlogComment = dynamic(() => import('./BlogComment'));

interface PropTypes {
  postId: number;
}

const CommentList: FunctionComponent<PropTypes> = ({ postId }) => {
  //swr call to get comments
  const { comments, mutate, error } = useComments(postId);

  // const nestedComments = useMemo(
  //   () => commentsByParentId(comments),
  //   [comments]
  // );

  // function to add comment locally
  // const addCommentLocally = () => {
  //   let newComment = {
  //     body: message,
  //     createdAt: Date.now(),
  //     parentId: null,
  //     postId: postId,
  //     updatedAt: Date.now(),
  //     // userId: session?.user.id,
  //     // user: { ...session?.user },
  //   };
  //   // mutate -> add comments locally
  //   mutate({ comments: [newComment, ...comments] }, false);
  // };

  return (
    <div className="comment-container flex flex-col space-y-5">
      {comments?.map((comment: commentTypes, index: number) => (
        <BlogComment
          key={index}
          comment={comment}
          // replies={nestedComments[String(comment.id)]!}
          replies={comment.children}
        />
      ))}
    </div>
  );
};

export default CommentList;
