import { Grid2 } from '@mui/material'

import getProducts from '@/actions/product/get-products'
import ProductCard from '@/components/product-card'
import CreateProductFloatingBtn from '@/components/create-product-floating-btn'
import CommonError from '@/components/common-error'

export default async function Products() {
  const products = await getProducts()

  if ('error' in products) return <CommonError message={products.error} />

  return (
    <div className="relative mb-5">
      <div className="mx-auto flex w-full justify-center max-md:max-w-md">
        <Grid2
          container
          maxWidth={{ xs: '100%', md: '768px', lg: '1280px', sm: '640px' }}
          spacing={3}
        >
          {products.map((product) => (
            <Grid2 key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <ProductCard product={product} />
            </Grid2>
          ))}
        </Grid2>
      </div>

      <div className="mt-4 max-xl:mb-10">
        <CreateProductFloatingBtn />
      </div>
    </div>
  )
}
