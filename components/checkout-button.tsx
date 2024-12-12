'use client'

import { Button } from '@mui/material'

import checkout from '@/actions/checkout/checkout'
import getStripe from '@/lib/stripe'

export default function CheckoutButton({ productId }: { productId: string }) {
  const handleCheckout = async () => {
    const session = await checkout(productId)
    if ('error' in session) return

    const stripe = await getStripe()
    await stripe?.redirectToCheckout({ sessionId: session.id })
  }

  return (
    <Button
      variant="contained"
      color='secondary'
      className="max-w-[25%]"
      onClick={handleCheckout}
    >
      Buy Now
    </Button>
  )
}
