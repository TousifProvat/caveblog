# Blog website with nextjs

# Name: cave.blog

## Functional Requirements:

1.  User can register using google/github/email
2.  User can signin using google/github/email
3.  User will have a profile
4.  User can read/create/delete/update own blogs
5.  Blogfeed for users
6.  User can like/star blogs
7.  User can bookmark blogs
8.  User can comment posts
9.  User can reply post comment (one level reply)
10. User will have realtime notification
11. User can filter posts by tags
12. User can search for posts by title

## MVP:

1. User can register using google/github/facebook/discord ✅
2. User can signin using google/github/facebook/discord ✅
3. User will have a profile ✅
4. user can read/create/delete/update blogs ✅
5. Blogsfeed for users ✅
6. User can star blogs ✅
7. User can bookmark blogs ✅
8. User can comment on posts ✅

## Tech used:

1. Client&Server: Nextjs & TypeScript ✅
2. Database ORM: Prisma ✅
3. Database : MySQL ✅
4. Search Engine Database: ElasticSearch
5. Host: Vercel ✅

## API routes:

- user:

  - authentication: NextAuth
  - get profile: api/v1/user/[username] GET @PUBLIC
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

  - get user bookmarks: api/bookmark/user/[id] GET @PRIVATE
  - get post bookmarks: api/bookmark/post/[id] GET @PUBLIC
  - create bookmark: api/bookmark/create POST @PRIVATE
  - delete bookmark: api/bookmark/delete/[id] DELETE @PRIVATE

- comment:

  - get user comments: api/comment/user/[id] GET @PRIVATE
  - get post comments by slug: api/comment/post/[slug] GET @PUBLIC
  - create comment: api/comment/create POST @PRIVATE
  - update comment: api/comment/update/[id] PATCH @PRIVATE
  - delete comment: api/comment/delete/[id] DELETE @PRIVATE
