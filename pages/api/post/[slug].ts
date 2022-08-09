import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).end();
  const { slug } = req.query;
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: String(slug),
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        author: {
          select: {
            username: true,
            name: true,
            image: true,
          },
        },
        stars: true,
        bookmarks: true,
      },
    });

    if (!post) return res.status(404).json({});

    return res.status(201).json({
      post,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
