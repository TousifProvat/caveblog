import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({
        message: 'Invalid Request',
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        slug: String(slug),
      },
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comments = await prisma.comment.findMany({
      where: {
        postId: post.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({ comments });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
