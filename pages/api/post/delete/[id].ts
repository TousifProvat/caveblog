import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();
  const { id } = req.query;
  try {
    const postExist = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!postExist) return res.status(404).json({ message: `Post Not Found` });

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      post: deletedPost,
      message: 'Post Deleted Successfully',
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
