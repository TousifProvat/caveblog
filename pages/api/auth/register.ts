import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username)
      return res.status(400).json({
        message: 'Required fields cannot be empty',
      });

    const userExistWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExistWithEmail)
      return res.status(400).json({ message: 'User exists with the email.' });

    const userExistWithUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userExistWithUsername)
      return res.status(400).json({ message: 'Username already taken' });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
