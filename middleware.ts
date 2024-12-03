import { NextRequest } from 'next/server'

import { AUTHENTICATION_COOKIE } from './constants'

export const publicRoutes = ['/signin', '/signup']

export function middleware(req: NextRequest) {
  const auth = req.cookies.get(AUTHENTICATION_COOKIE)?.value

  if (
    !auth &&
    !publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return Response.redirect(new URL('/signin', req.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
