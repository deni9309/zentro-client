import { getCurrentUser } from '@/actions/auth/get-current-user'
import CreateProductFloatingBtn from '@/components/create-product-floating-btn'
import Image from 'next/image'

export default async function Home() {
  const _user = await getCurrentUser()

  return (
    <>
      <section className="relative h-[400px]">
        <Image
          src={'/hero.jpg'}
          alt="hero"
          width={2000}
          height={2000}
          className="absolute left-0 top-0 z-[-10] flex h-[400px] w-full flex-col items-center justify-center overflow-hidden object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative flex h-full items-center justify-center">
          <div className="flex flex-col items-start gap-2 p-10">
            <Image
              src="/logo.svg"
              alt="ZENtro Logo"
              width={524}
              height={143}
              className="h-auto w-[170px]"
            />
            <h1 className="text-4xl font-semibold xl:text-5xl">
              <span className="mr-1 font-extralight">|</span>Shopping made easy
            </h1>
          </div>
        </div>
      </section>

      <CreateProductFloatingBtn />
    </>
  )
}
