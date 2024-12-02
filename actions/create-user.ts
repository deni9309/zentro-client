'use server'

import { redirect } from 'next/navigation'

import { post } from '../lib/fetch'
import { AuthFormData, AuthFormSchema } from '@/schema/auth-form.schema'

export default async function createUser(data: AuthFormData) {
  const validated = AuthFormSchema.safeParse(data)
  if (!validated.success) {
    return { error: 'Invalid form data.' }
  }

  const result = await post<AuthFormData, { id: string; email: string }>(
    'api/users',
    validated.data
  )

  if ('error' in result) {
    return { error: result.error }
  }

  return redirect('/signin')
}
