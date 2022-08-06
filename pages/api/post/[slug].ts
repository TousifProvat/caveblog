import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
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
            replies: {
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
                id: 'desc',
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

    if (!post) return res.status(404).json({ message: 'Post Not Found' });

    return res.status(201).json({
      post,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
