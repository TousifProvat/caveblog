import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

const slugGenerator = (name: string) => {
  let slug = name.trim().replaceAll(' ', '-').toLowerCase();
  return slug;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    //user will be replaced by req.userid
    const { user, title, body } = req.body;

    if (!user || !title || !body)
      return res.status(400).json({ message: 'Invalid request' });

    const titleExist = await prisma.post.findUnique({
      where: {
        title,
      },
    });

    if (titleExist)
      return res.status(409).json({
        message: 'same title exists',
      });

    const newPost = await prisma.post.create({
      data: {
        authorId: user,
        title,
        body,
        slug: slugGenerator(title),
      },
    });

    return res.status(201).json({
      post: newPost,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
