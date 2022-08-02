import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../../lib/prisma';

const slugGenerator = (name: string) => {
  let slug = name.trim().replaceAll(' ', '-').toLowerCase();
  return slug;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();
  const { id } = req.query;
  try {
    const { title, body } = req.body;

    const postExist = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!postExist) return res.status(404).json({ message: `Post Not Found` });

    const titleExist = await prisma.post.findUnique({
      where: {
        title: title,
      },
    });

    if (titleExist !== null && postExist.title !== title)
      return res.status(404).json({ message: 'Title already exists' });

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: { title, body, slug: slugGenerator(title) },
    });

    return res.status(200).json({
      post: updatedPost,
      message: 'Post Updated Successfully',
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
