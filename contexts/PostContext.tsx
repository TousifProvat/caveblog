import { useRouter } from 'next/router';
import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useComments from '../hooks/useComments';
import { commentTypes } from '../types';

const Context = createContext<any>({});

export function usePost() {
  return useContext(Context);
}

interface PropTypes {
  children: ReactNode;
}

const PostProvider: FunctionComponent<PropTypes> = ({ children }) => {
  const { query } = useRouter();

  const { comments: data, loading, error } = useComments(String(query.slug));
  const [comments, setComments] = useState<commentTypes[]>([]);

  const commentsByParentId = useMemo(() => {
    const obj: any = {};
    comments.forEach((comment: commentTypes) => {
      obj[comment.parentId ?? 'parent'] ||= [];
      obj[comment.parentId ?? 'parent'].push(comment);
    });

    return obj;
  }, [comments]);

  useEffect(() => {
    if (!data) return;
    setComments(data);
  }, [data]);

  const getReplies = (id: number) => {
    return commentsByParentId[id];
  };

  const addCommentLocally = (comment: commentTypes) => {
    setComments((prev) => {
      return [comment, ...prev];
    });
  };

  const deleteCommentLocally = (id: number) => {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== id);
    });
  };

  const updateCommentLocally = (message: string, id: number) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, body: message };
        } else {
          return comment;
        }
      });
    });
  };

  return (
    <Context.Provider
      value={{
        rootComments: commentsByParentId['parent'],
        getReplies,
        addCommentLocally,
        deleteCommentLocally,
        updateCommentLocally,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default PostProvider;
