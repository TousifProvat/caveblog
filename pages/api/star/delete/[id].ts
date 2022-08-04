import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();
  const { id } = req.query;
  try {
    const star = await prisma.star.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!star) return res.status(404).json({ message: 'Star Not Found' });

    const deletedStar = await prisma.star.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(201).json({
      star: deletedStar,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
