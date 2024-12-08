import { Card, Typography } from '@mui/material'
import Image from 'next/image'

import { Product } from '@/types'
import { getImageUrl } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="relative flex flex-col justify-between space-y-6 p-10 after:mt-4 after:border-b-2 after:border-black after:content-[''] hover:translate-x-1 hover:translate-y-1 hover:transition hover:duration-300 max-sm:px-16">
      <Typography variant="h5">{product.name}</Typography>
      {product.imageExists && (
        <Image
          src={getImageUrl(product.id)}
          width={0}
          height={0}
          alt={product.name}
          priority
          sizes="90vw"
          className="h-auto w-full rounded-lg"
        />
      )}
      <Typography className="line-clamp-3">{product.description}</Typography>
      <Typography variant="h6">${product.price}</Typography>
    </Card>
  )
}
