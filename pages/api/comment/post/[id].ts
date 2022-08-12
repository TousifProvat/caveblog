import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: 'Invalid Request',
      });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(id),
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
