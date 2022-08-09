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
    });

    if (!comment) return res.status(404).json({ message: 'Comment Not Found' });

    const deletedComment = await prisma.comment.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(201).json({
      bookmark: deletedComment,
      message: 'Comment Deleted Successfully',
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
