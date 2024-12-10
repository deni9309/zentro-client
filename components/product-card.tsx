'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { Card, CardActionArea, Tooltip, Typography } from '@mui/material'

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
      <Card className="after_black-line relative flex max-h-[606.3px] flex-col justify-between space-y-6 p-10 max-md:px-6">
        <Typography
          component={Tooltip}
          placement="top-start"
          className="line-clamp-2 max-h-[64.3px] !text-2xl"
          title={product.name}
        >
          {product.name}
        </Typography>
        {product.imageExists && (
          <Image
            src={getImageUrl(product.id)}
            width={0}
            height={0}
            alt={product.name}
            priority
            sizes="90vw"
            className="aspect-square h-auto w-full rounded-lg object-cover"
          />
        )}
        <Typography
          color="text.secondary"
          component={Tooltip}
          placement="top-start"
          title={'Click to view product details'}
          className="line-clamp-2 h-[48px]"
        >
          {product.description}
        </Typography>
        <Typography variant="h6">${product.price}</Typography>
      </Card>
    </CardActionArea>
  )
}
