import { Card, Typography } from '@mui/material'

import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="relative flex flex-col justify-between space-y-3 p-6 after:mt-4 after:border-b-2 after:border-black after:content-[''] hover:translate-x-1 hover:translate-y-1 hover:transition hover:duration-300">
      <Typography variant="h5">{product.name}</Typography>
      <Typography className="line-clamp-3">{product.description}</Typography>
      <Typography variant="h6">${product.price}</Typography>
    </Card>
  )
}
