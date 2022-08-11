import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
//utils
import { prisma } from '../../../lib/prisma';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      delete user.password;
      delete user.emailVerified;
      session.user = {
        ...session.user,
        id: user.id,
        username: user.username,
      };
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
