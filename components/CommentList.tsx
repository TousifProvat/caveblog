import React, { FunctionComponent } from 'react';
import { commentTypes } from '../types';
import BlogComment from './BlogComment';

interface PropTypes {
  comments: {
    parent: commentTypes[] | undefined;
    [key: string]: commentTypes[] | undefined;
  };
}

const CommentList: FunctionComponent<PropTypes> = ({ comments }) => {
  return (
    <div className="comment-container flex flex-col space-y-5">
      {comments['parent']?.map((comment, index) => (
        <BlogComment
          key={index}
          comment={comment}
          replies={comments[String(comment.id)]}
        />
      ))}
    </div>
  );
};

export default CommentList;
