export interface profileTypes {
  headline: string;
  bio: string;
  website: string;
  location: string;
}

export interface userTypes {
  username: string;
  email: string;
  name: string;
  image: string;
  Profile: profileTypes;
}

export interface postTypes {
  id: number;
  title: string;
  body: string;
  slug: string;
  author: {
    username: string;
    name: string;
    image: string;
  };
  comments: commentTypes[];
  stars: starTypes[];
  bookmarks: bookmarkTypes[];
}

export interface commentTypes {
  id: number;
  body: string;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    name: string;
    image: string;
  };
  post: postTypes;
  replies: Reply[];
}

export interface Reply {
  id: number;
  body: string;
  postId: number;
  userId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    name: string;
    image: string;
  };
}

export interface starTypes {
  id: number;
  post: postTypes;
  postId: number;
  user: userTypes;
  userId: string;
}

export interface bookmarkTypes {
  id: number;
  post: postTypes;
  postId: number;
  user: userTypes;
  userId: string;
  createdAt: string;
}
