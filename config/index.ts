const dev = process.env.NODE_ENV !== 'production';

export const server = dev
  ? 'http://localhost:3000/api'
  : 'https://cave-ahliu9o4x-tousifprovat.vercel.app/api';
