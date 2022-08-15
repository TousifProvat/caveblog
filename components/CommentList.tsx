import dynamic from 'next/dynamic';
import React, { FunctionComponent } from 'react';
import { commentTypes } from '../types';

const BlogComment = dynamic(() => import('./BlogComment'));

interface PropTypes {
  comments: commentTypes[];
}

const CommentList: FunctionComponent<PropTypes> = ({ comments }) => {
  return (
    <div className="comment-container flex flex-col space-y-5">
      {comments?.map((comment: commentTypes, index: number) => (
        <BlogComment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
