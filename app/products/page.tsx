import { Grid2 } from '@mui/material'

import getProducts from '@/actions/product/get-products'
import ProductCard from '@/components/product-card'
import CreateProductFloatingBtn from '@/components/create-product-floating-btn'

export default async function Products() {
  const products = await getProducts()

  if ('error' in products)
    return (
      <p className="flex h-[50vh] items-center text-center text-lg text-white/90">
        {products.error}
      </p>
    )

  return (
    <>
      <div className="relative w-full">
        <Grid2 container spacing={2}>
          {products.map((product) => (
            <Grid2 key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <ProductCard product={product} />
            </Grid2>
          ))}
        </Grid2>

        <div className="mt-4 max-xl:mb-10">
          <CreateProductFloatingBtn />
        </div>
      </div>
    </>
  )
}
