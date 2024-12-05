import { NextRequest } from 'next/server'

import { AUTHENTICATION_COOKIE } from './constants'
import { publicRoutes } from './constants/routes'

export function middleware(req: NextRequest) {
  const auth = req.cookies.get(AUTHENTICATION_COOKIE)?.value

  if (
    !auth &&
    !publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route.path))
  ) {
    return Response.redirect(new URL('/signin', req.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
