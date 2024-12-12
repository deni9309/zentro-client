'use server'

import { StripeCheckoutSession } from '@stripe/stripe-js'

import { post } from '@/lib/fetch'

export default async function checkout(productId: string) {
  return post<{ productId: string }, StripeCheckoutSession>(
    'api/checkout/session',
    {
      productId,
    },
  )
}
