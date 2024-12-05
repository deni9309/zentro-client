'use server'

import { revalidateTag } from 'next/cache'

import { post } from '@/lib/fetch'
import {
  ProductFormData,
  ProductFormSchema,
} from '@/schema/product-form.schema'
import { CreateProductProps, Product } from '@/types'

export default async function createProduct(data: ProductFormData) {
  const validated = ProductFormSchema.safeParse(data)
  if (!validated.success) {
    return { error: 'Invalid form data.' }
  }

  const productData = {
    name: validated.data.name,
    description: validated.data.description,
    price: parseFloat(validated.data.price),
  }

  const response = await post<CreateProductProps, Product[]>(
    'api/products',
    productData,
  )

  if (!('error' in response)) {
    revalidateTag('products')
  }

  return response
}
