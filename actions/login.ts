'use server'

import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getHeaders } from '@/lib/fetch'
import { getErrorMessage } from '@/lib/utils'
import { AuthFormData, AuthFormSchema } from '@/schema/auth-form.schema'
import { ErrorResponse } from '@/types'

export async function login(data: AuthFormData) {
  const validated = AuthFormSchema.safeParse(data)
  if (!validated.success) {
    return { error: 'Invalid form data.' }
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getHeaders() },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errRes: ErrorResponse = await response.json()
    return { error: getErrorMessage(errRes) }
  }

  setAuthCookie(response)
  return redirect('/')
}

const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get('Set-Cookie')
  if (setCookieHeader) {
    const token = setCookieHeader.split(';')[0].split('=')[1]

    cookies().set({
      name: 'Authentication',
      value: token,
      httpOnly: true,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    })
  }
}
