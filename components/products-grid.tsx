'use client'

import { useEffect } from 'react'
import { Grid2 } from '@mui/material'
import { io } from 'socket.io-client'

import { Product as TProduct } from '@/types'
import ProductCard from '@/components/product-card'
import revalidateProducts from '@/actions/product/revalidate-products'

interface ProductsGridProps {
  products: TProduct[]
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL!)

    socket.on('productUpdated', () => {
      revalidateProducts()
    })

    return () => {
      socket?.disconnect()
    }
  }, [])

  return (
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
  )
}
