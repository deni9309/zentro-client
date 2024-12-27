import getProducts from '@/actions/product/get-products'
import CreateProductFloatingBtn from '@/components/create-product-floating-btn'
import CommonError from '@/components/common-error'
import ProductsGrid from '@/components/products-grid'

export default async function Products() {
  const products = await getProducts()

  if ('error' in products) return <CommonError message={products.error} />

  return (
    <div className="relative mb-5">
      <ProductsGrid products={products} />
      <div className="mt-4 max-xl:mb-10">
        <CreateProductFloatingBtn />
      </div>
    </div>
  )
}
