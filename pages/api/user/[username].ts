import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const { username } = req.query;

    const user = await prisma.user.findUnique({
      where: {
        username: String(username),
      },
      include: {
        profile: true,
        comments: {
          include: {
            post: true,
          },
        },
        posts: true,
        stars: {
          include: {
            post: true,
          },
        },
        bookmarks: {
          include: {
            post: true,
          },
        },
      },
    });

    if (!user) return res.status(404).json({ message: `User doesn't exist` });

    return res.status(200).json({ user });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
