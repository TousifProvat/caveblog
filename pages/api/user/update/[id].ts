import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();
  try {
    const { id } = req.query;
    const { userValues, profileValues } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      include: {
        Profile: true,
      },
    });

    if (!user) return res.status(404).json({ message: `User doesn't exist` });

    const userNameExist = await prisma.user.findUnique({
      where: {
        username: userValues.username,
      },
    });

    if (userNameExist && user.username !== userValues.username)
      return res.status(409).json({ message: 'Username exists' });

    const updatedUser = await prisma.user.update({
      where: {
        id: String(id),
      },
      data: {
        ...userValues,
      },
    });

    let profile;
    if (!user.Profile) {
      profile = await prisma.profile.create({
        data: {
          ...profileValues,
          userId: id,
        },
      });
    } else {
      profile = await prisma.profile.update({
        where: {
          id: user.Profile.id,
        },
        data: {
          ...profileValues,
        },
      });
    }

    return res.status(200).json({ message: 'Updated Successfully' });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
