import { getCurrentUser } from '@/actions/auth/get-current-user'
import CreateProductFloatingBtn from '@/components/create-product-floating-btn'


export default async function Home() {
  const user = await getCurrentUser()
  if ('error' in user) return <div>{user.error}</div>
  console.log('user', user)
  return <div>{user && <p>Hello {user.email}</p>}
  
  <CreateProductFloatingBtn />
  </div>
}
