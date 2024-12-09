'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { Card, CardActionArea, Typography } from '@mui/material'

import { Product } from '@/types'
import { getImageUrl } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(`/products/${product.id}`)
  }, [router, product])

  return (
    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
      <Card className="max-xs:px-6 relative flex flex-col justify-between space-y-6 p-10 after:mt-4 after:border-b-2 after:border-black after:content-[''] hover:translate-x-1 hover:translate-y-1 hover:transition hover:duration-300">
        <Typography variant="h5">{product.name}</Typography>
        {product.imageExists && (
          <Image
            src={getImageUrl(product.id)}
            width={0}
            height={0}
            alt={product.name}
            priority
            sizes="90vw"
            className="aspect-square h-full max-h-[400px] w-auto rounded-lg object-cover"
          />
        )}
        <Typography className="line-clamp-3">{product.description}</Typography>
        <Typography variant="h6">${product.price}</Typography>
      </Card>
    </CardActionArea>
  )
}
