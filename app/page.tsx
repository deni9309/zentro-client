import getCurrentUser from '@/actions/get-current-user'

export default async function Home() {
  const user = await getCurrentUser()
  if('error' in user) return <div>{user.error}</div>
  console.log("user", user)
  return <div>{user && <p>Hello {user.email}</p>}</div>
}
