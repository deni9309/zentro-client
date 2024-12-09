import { Card, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import getProductById from '@/actions/product/get-product-by-id'
import CommonError from '@/components/common-error'
import { getImageUrl } from '@/lib/utils'

interface ProductProps {
  params: {
    productId: string
  }
}

export default async function Product({ params: { productId } }: ProductProps) {
  const product = await getProductById(productId)

  if ('error' in product) return <CommonError message={product.error} />

  return (
    <Card className="mb-3 p-10">
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
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

        <Stack direction={'column'} gap={3}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6">${product.price}</Typography>
        </Stack>
      </div>
    </Card>
  )
}
