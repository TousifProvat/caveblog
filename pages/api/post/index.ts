import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },

        stars: {
          select: {
            id: true,
          },
        },
        bookmarks: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.status(200).json({
      posts,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
