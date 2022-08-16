import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') return res.status(405).end();
  const { id } = req.query;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        children: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!comment) return res.status(404).json({ message: 'Comment Not Found' });

    const ids: number[] = comment.children.map((comment) => {
      return comment.id;
    });

    const deletedComments = await prisma.comment.deleteMany({
      where: {
        id: {
          in: [...ids, comment.id],
        },
      },
    });

    return res.status(201).json({
      comment: deletedComments,
      message: 'Comment Deleted Successfully',
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
