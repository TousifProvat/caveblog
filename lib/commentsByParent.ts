import { commentTypes } from '../types';

const commentsByParentId = (comments: commentTypes[]) => {
  const obj: any = {};
  comments?.forEach((comment: commentTypes) => {
    obj[comment.parentId === null ? 'parent' : comment.parentId] ||= [];
    obj[comment.parentId === null ? 'parent' : comment.parentId].push(comment);
  });
  return obj;
};

export default commentsByParentId;
