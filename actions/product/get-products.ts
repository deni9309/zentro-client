'use server'

import { get } from '@/lib/fetch'
import { Product } from '@/types'

export default async function getProducts() {
  return get<Product[]>('api/products', undefined, ['products'])
}
