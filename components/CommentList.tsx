import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from '../lib/axios';
import { commentTypes } from '../types';
import BlogComment from './BlogComment';

interface PropTypes {
  comments: {
    parent: commentTypes[] | undefined;
    [key: string]: commentTypes[] | undefined;
  };
}

const CommentList = ({ comments }: PropTypes) => {
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
