import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
//utils
import { prisma } from '../../../lib/prisma';

//cretes a random username
prisma.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'create') {
    params.args.data.username = nanoid(5);
  }
  return next(params);
});

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {},
    //   async authorize(credentials, req) {
    //     const { email, password } = credentials as {
    //       email: string;
    //       password: string;
    //     };
    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email,
    //       },
    //     });
    //     if (user) {
    //       const isPassword = await bcrypt.compare(password, user.password);
    //       if (!isPassword) return null;
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null;
    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      delete user.password;
      delete user.emailVerified;
      session.user = user;
      return session;
    },
  },
});
