'use server'

import { get } from '@/lib/fetch'
import { User } from '@/types'

export default async function getCurrentUser() {
  return get<User>('api/users/me')
}