'use server'

import { get } from '@/lib/fetch'
import { Product } from '@/types'

export default async function getProductById(id: string) {
  return get<Product>(`api/products/${id}`)
}