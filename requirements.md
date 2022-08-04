# Blog website with nextjs

# Name: codizards -> charizard + coder

## Functional Requirements:

1. User can register using google/github/email
2. User can signin using google/github/email
3. User will have a profile
4. User can read/create/delete/update own blogs
5. Blogfeed for users
6. User can like/star blogs
7. User can bookmark blogs
8. User can comment posts
9. User can reply post comment (one level reply)
10. User will have realtime notification
11. User can filter posts by tags
12. User can search for posts by title

## MVP:

1. User can register using google/github ✅partial
2. User can signin using google/github/email ✅partial
3. User will have a profile ✅partial
4. user can read/create/delete/update blogs ✅p
5. Blogsfeed for users ✅
6. User can star blogs ✅
7. User can bookmark blogs
8. User can comment on posts

## Tech used:

1. Client&Server: Nextjs & TypeScript
2. Database ORM: Prisma
3. Database : PostgreSQL
4. Search Engine Database: ElasticSearch
5. Host: Vercel

## API routes:

- user:

  - signup/register: api/v1/user/register POST @PUBLIC
  - signin: api/v1/user/signin POST @PUBLIC
  - get profile: api/v1/profile GET @PRIVATE
  - get profile by id: api/v1/profile/[id] @PUBlIC
  - create profile: api/v1/profile/create POST @PRIVATE
  - update profile: api/v1/profile/update PATCH @PRIVATE

- posts:

  - get all posts: api/v1/post GET @PUBLIC
  - get post by slug: api/v1/post/:slug GET @PUBLIC
  - create post: api/v1/post/create POST @PRIVATE
  - delete post: api/v1/post/delete/:id DELETE @PRIVATE
  - update post: api/v1/post/update/:id PATCH @PRIVATE

- start:

  - get post likes: api/v1/stat/post/[id] GET @PUBLIC
  - create like: api/v1/star/create POST @PRIVATE
  - delete like: api/v1/star/delete/[id] DELETE @PRIVATE

- bookmark:

  - get user bookmarks: api/v1/bookmark/user/:id GET @PRIVATE
  - get post bookmarks: api/v1/bookmark/post/:id GET @PUBLIC
  - create bookmark: api/v1/bookmark/create POST @PRIVATE
  - delete bookmark: api/v1/bookmark/delete/[id] DELETE @PRIVATE

- comment:

  - get user comments: api/v1/comment/user/:id GET @PRIVATE
  - get post comments: api/v1/comment/post/:id GET @PUBLIC
  - create comment: api/v1/comment/create POST @PRIVATE
  - update comment: api/v1/comment/update/[id] PATCH @PRIVATE
  - delete comment: api/v1/comment/delete/[id] DELETE @PRIVATE

## Data Models:

user {

id: int @autoIncrement | required
username: string | required
email: string | required
password: string | required
createdAt: DateTime | required

}

profile {

id: int @autoIncrement, | required
userId: int | relation with user table | required
headline: string
bio: string
website: string
location: string

}

post {

id: int @autoIncrement | required
userId: int | relation with user table | required
title: string | required
body: string | required

}

like {

id: int @autoIncrement | required
postId: int | relation with post | required
userId: int | relation with user | required

}

bookmark: {

id: int @autoIncrement | required
postId: int | relation with post | required
userId: int | relation with user | required
createdAt: DateTime default(now())

}

comment {

id: int @autoIncrement | required
postId: int | relation with post | required
userId: int | relation with user | required

commentId: int | relation with comment | optional \* will be used recursive function to nest comments\*

createdAt: DateTime default(now())
updatedAt: DateTime

}
