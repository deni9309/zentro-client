import { Grid2, Stack } from '@mui/material'

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
    <div className="relative mb-5">
      <Grid2 container spacing={3} sx={{ justifyContent: 'center' }}>
        {products.map((product) => (
          <Grid2 key={product.id} size={{ xs: 11, sm: 6, md: 5, lg: 4 }}>
            <ProductCard product={product} />
          </Grid2>
        ))}
      </Grid2>

      <div className="mt-4 max-xl:mb-10">
        <CreateProductFloatingBtn />
      </div>
    </div>
  )
}
