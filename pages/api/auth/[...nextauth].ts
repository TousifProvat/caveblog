import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
//utils
import { prisma } from '../../../lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user) {
          const isPassword = await bcrypt.compare(password, user.password);
          if (!isPassword) return null;
          user.password = '';
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, user, token }) {
      if (token.user) session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
