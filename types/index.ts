export interface profileTypes {
  headline: string;
  bio: string;
  website: string;
  location: string;
}

export interface userTypes {
  id: string;
  username: string;
  email: string;
  name: string;
  image: string;
  profile: profileTypes;
}

export interface postTypes {
  id: number;
  title: string;
  body: string;
  slug: string;
  author: userTypes;
  comments: commentTypes[];
  stars: starTypes[];
  bookmarks: bookmarkTypes[];
  createdAt: string;
}

export interface commentTypes {
  id: number;
  body: string;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    username?: string | null;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
  post: postTypes;
  parentId: number;
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
