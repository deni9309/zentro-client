import { getCurrentUser } from '@/actions/auth/get-current-user'
import CreateProductFloatingBtn from '@/components/create-product-floating-btn'

export default async function Home() {
  const _user = await getCurrentUser()

  return (
    <div>
      <CreateProductFloatingBtn />
    </div>
  )
}
