# Cave Blog

![cave-blog](https://res.cloudinary.com/dklakm8v6/image/upload/v1661017936/github%20images/cave_blog_next_js_hhay3d.png)

Cave is an amazing platform for writing blogs from your cave.

Live: [Cave.Blog]('https://cave-gules.vercel.app')

## Tech used

- [TypeScript](https://www.typescriptlang.org/)
- [Nextjs](https://nextjs.org/)
- [TailwindCss](https://tailwindcss.com/)
- [SWR](https://swr.vercel.app/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)

# Getting Started

Clone the Repositry with this command:

```command
git clone https://github.com/TousifProvat/caveblog.git
```

Create an .env file in the root and set these variables:

```env
DATABASE_URL=

JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

```

Install dependencies with the following command:

```command
yarn
```

or

```command
npm i
```

you are good to go. Now use **yarn dev** or **npm run dev** in the terminal to start your application locally. After running the command visit [http://localhost:3000](http://localhost:3000)

```command
yarn dev
```

or

```command
npm run dev
```

# TODO

- Add NextAuth Credentials login
- Add Backend Caching
