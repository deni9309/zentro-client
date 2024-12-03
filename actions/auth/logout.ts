'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AUTHENTICATION_COOKIE } from '@/constants'

export default async function logout() {
  cookies().delete(AUTHENTICATION_COOKIE)

  return redirect('/signin')
}
