import { Card, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import getProductById from '@/actions/product/get-product-by-id'
import CommonError from '@/components/common-error'
import { cn, formatDate, getImageUrl } from '@/lib/utils'

interface ProductProps {
  params: {
    productId: string
  }
}

export default async function Product({ params: { productId } }: ProductProps) {
  const product = await getProductById(productId)

  if ('error' in product) return <CommonError message={product.error} />

  return (
    <Card className="mb-8 p-10 max-xs:p-6">
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-stretch">
        <span
          className={cn(
            product.imageExists
              ? 'aspect-square h-full max-h-[400px] w-full'
              : 'hidden',
          )}
        >
          {product.imageExists && (
            <Image
              src={getImageUrl(product.id)}
              width={0}
              height={0}
              alt={product.name}
              priority
              sizes="100vw"
              className="h-full w-full rounded-lg object-cover"
            />
          )}
        </span>

        <Stack
          direction={'column'}
          className="w-full rounded-lg bg-z-dark-1 p-6"
          gap={3}
        >
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <Typography className='border-y-2 p-4 border-zinc-800' variant="h6">${product.price}</Typography>
          <Typography className='text-white/70 !text-sm bg-zinc-800/50 p-4 rounded'>Published on: {formatDate(product.createdAt)}</Typography>
        </Stack>
      </div>
    </Card>
  )
}
