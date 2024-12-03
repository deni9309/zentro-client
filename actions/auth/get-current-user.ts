'use server'

import { cookies } from 'next/headers'

import { get } from '@/lib/fetch'
import { User } from '@/types'
import { AUTHENTICATION_COOKIE } from '@/constants'

export async function getCurrentUser() {
  return get<User>('api/users/me')
}

export async function authenticated() {
  return !!cookies().get(AUTHENTICATION_COOKIE)?.value
}
