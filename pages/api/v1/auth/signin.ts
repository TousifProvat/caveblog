import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists)
      return res.status(404).json({
        message: `User doesn't exist`,
      });

    const isPassword = await bcrypt.compare(password, userExists.password);

    if (!isPassword)
      return res.status(401).json({ message: 'Invalid Credentials' });

    const token = jwt.sign(
      { id: userExists.id, email: userExists.email },
      'secretkey',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: userExists,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
