import { NextResponse, NextRequest } from 'next/server';
import isAuthorized from './lib/isAuthorized';

export const middleware = async (req: NextRequest) => {
  // const publicRoutes = [
  //   '/api/v1/post',
  //   'api/v1/register',
  //   'api/v1/signin',
  //   'api/v1/profile/:id',
  // ];

  // if (!publicRoutes.includes(req.nextUrl.pathname)) {
  //   if (await isAuthorized(req)) return NextResponse.next();

  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  return NextResponse.next();
};
