import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') return res.status(405).end();
  const { id } = req.query;
  const { message } = req.body;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!comment) return res.status(404).json({ message: 'Comment Not Found' });

    const updatedComment = await prisma.comment.update({
      where: {
        id: Number(id),
      },
      data: {
        body: message,
      },
    });

    return res.status(201).json({
      bookmark: updatedComment,
      message: 'Comment Updated Successfully',
    });
  } catch (err) {
    return res.status(500).json({ message: 'Seomthing went wrong!' });
  }
}
