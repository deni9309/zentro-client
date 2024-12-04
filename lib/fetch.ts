import { cookies } from 'next/headers'

import { ErrorResponse } from '@/types'
import { getErrorMessage } from '@/lib/utils'

export const post = async <T, K>(
  path: string,
  data: T,
): Promise<K | { error: string }> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getHeaders() },
    body: JSON.stringify(data),
  })

  if (!res.ok && res.status !== 201) {
    const errRes: ErrorResponse = await res.json()
    return { error: getErrorMessage(errRes) }
  }
  const parsedRes: K = await res.json()
  return parsedRes
}

export async function get<T>(
  path: string,
  params?: URLSearchParams,
  tags?: string[],
): Promise<T | { error: string }> {
  const url = params
    ? `${process.env.NEXT_PUBLIC_API_URL}/${path}?${params}`
    : `${process.env.NEXT_PUBLIC_API_URL}/${path}`

  const res = await fetch(url, {
    headers: { ...getHeaders() },
    next: { tags },
  })

  if (!res.ok) {
    return { error: 'An error occured' }
  }
  const parsedRes: T = await res.json()
  return parsedRes
}

export const getHeaders = () => ({
  Cookie: cookies().toString(),
})
