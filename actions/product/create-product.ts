'use server'

import { revalidateTag } from 'next/cache'

import { getHeaders, post } from '@/lib/fetch'
import {
  ProductFormData,
  ProductFormSchema,
} from '@/schema/product-form.schema'
import { CreateProductProps, Product } from '@/types'
import { getErrorMessage } from '@/lib/utils'

export default async function createProduct(
  data: ProductFormData,
  formData?: FormData,
) {
  const validated = ProductFormSchema.safeParse(data)
  if (!validated.success) {
    return { error: 'Invalid form data.' }
  }

  const productData = {
    name: validated.data.name,
    description: validated.data.description,
    price: parseFloat(validated.data.price),
  }

  const response = await post<CreateProductProps, Product>(
    'api/products',
    productData,
  )

  if ('error' in response) return response
  revalidateTag('products')

  const productImage = formData?.get('image')
  if (productImage && productImage instanceof File) {
    await uploadProductImage(response.id, productImage)
  }

  return response
}

async function uploadProductImage(productId: string, file: File) {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/image`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: formData,
      },
    )
    return res
  } catch (error) {
    return { error: getErrorMessage(error) }
  }
}
