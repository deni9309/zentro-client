import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

//import { getFormErrorMessage } from '@/lib/utils'

export async function setAuthCookie(response: Response) {
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

export const getHeaders = () => ({
  Cookie: cookies().toString(),
})

// export async function post(
//   path: string,
//   formData: FormData,
//   prevState: AuthFormErrorState
// ): Promise<Response | AuthFormErrorState> {

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', ...(await getHeaders()) },
//     body: JSON.stringify(Object.fromEntries(formData)),
//   })

//   if (!res.ok) {
//     const parsedRes = await res.json()
//     return getFormErrorMessage(parsedRes, prevState)
//   }

//   return res
// }

export const post = async <T, K>(path: string, data: T): Promise<K | { error: string }> => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getHeaders() },
    body: JSON.stringify(data),
  })

  const parsedRes: K = await res.json()
  if (!res.ok) {
    return { error: "An error occured. Please try again" }
  }

  return parsedRes
}

export async function get<T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams
): Promise<T | { error: string }> {
  const url = params
    ? `${process.env.NEXT_PUBLIC_API_URL}/${path}?${params}`
    : `${process.env.NEXT_PUBLIC_API_URL}/${path}`

  const res = await fetch(url, {
    headers: { ...getHeaders() },
    next: { tags },
  })

  const parsedRes: T = await res.json()
  if (!res.ok) {
    return { error: 'An error occured' }
  }

  return parsedRes
}
