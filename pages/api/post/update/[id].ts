import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../../lib/prisma';
import { nanoid } from 'nanoid';

const slugGenerator = (name: string) => {
  let slug = name
    .trim()
    .replaceAll(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
    .replaceAll(' ', '-')
    .toLowerCase();
  return slug;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') return res.status(405).end();
  const { id } = req.query;
  try {
    const { title, body } = req.body;

    let slug = slugGenerator(title);

    const session = await getSession({ req });

    if (!session)
      return res.status(401).json({
        message: 'Unauthorized Access',
      });

    const postExist = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (session.user?.id !== postExist?.authorId)
      return res.status(401).json({ message: 'Unathorized Action' });

    if (!postExist) return res.status(404).json({ message: `Post Not Found` });

    const titleExist = await prisma.post.findFirst({
      where: {
        title: title,
      },
    });

    if (titleExist && postExist.title !== title) {
      slug += nanoid(5);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: { title, body, slug },
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
