'use server'

import { revalidatePath } from 'next/cache'

import { post } from '@/lib/fetch'
import {
  ProductFormData,
  ProductFormSchema,
} from '@/schema/product-form.schema'
import { Product } from '@/types'

export default async function createProduct(data: ProductFormData) {
  const validated = ProductFormSchema.safeParse(data)
  if (!validated.success) {
    return { error: 'Invalid form data.' }
  }

  const response = await post<ProductFormData, Product[]>(
    'api/products',
    validated.data,
  )

  if (!('error' in response)) {
    revalidatePath('/')
  }

  return response
}
