export type ErrorResponse = {
  message: string[] | string
  error: string
  statusCode: number
}

export type AuthFormErrorState = {
  email?: string
  password?: string
  emailError?: string
  passwordError?: string
  otherError?: string
}

export type UserTokenPayload = {
  tokenPayload: {
    userId: string
    email: string
  }
}

export type User = {
  userId: string
  email: string
  iat: number
  exp: number
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  userId: string
  imageExists: boolean
  createdAt: Date
  // image?: File | undefined
}

export type CreateProductProps = {
  name: string
  description: string
  price: number
  userId?: string
  //image?: File | undefined
}


export type StripeSession = {
  id: string
  object: 'checkout.session'
  after_expiration: null | {
    recovery: {
      enabled: boolean
      url: string | null
    }
  }
  allow_promotion_codes: boolean | null
  amount_subtotal: number
  amount_total: number
  automatic_tax: {
    enabled: boolean
    liability: 'exclusive' | 'inclusive' | null
    status: 'complete' | 'requires_action' | null
  }
  billing_address_collection: 'auto' | 'required' | null
  cancel_url: string | null
  client_reference_id: string | null
  consent: null | {
    promotions: 'opt_in' | 'opt_out'
  }
  consent_collection: null | {
    promotions: 'auto' | 'required'
  }
  created: number
  currency: string
  custom_fields: Array<{
    key: string
    label: {
      type: 'custom'
      custom: string
    }
    optional: boolean
    text: {
      type: 'custom'
      custom: string
    }
  }>
  custom_text: {
    shipping_address: null | { text: string }
    submit: null | { text: string }
  }
  customer: string | null
  customer_creation: 'always' | 'if_required'
  customer_details: null | {
    email: string
    phone: string | null
    tax_exempt: 'none' | 'exempt' | 'reverse'
    tax_ids: Array<{
      type: string
      value: string
    }>
  }
  customer_email: string | null
  expires_at: number
  invoice: string | null
  invoice_creation: {
    enabled: boolean
    invoice_data: {
      account_tax_ids: string[] | null
      custom_fields: Array<{ name: string; value: string }> | null
      description: string | null
      footer: string | null
      metadata: Record<string, string>
      rendering_options: Record<string, unknown> | null
    }
  }
  livemode: boolean
  locale: string | null
  metadata: Record<string, string>
  mode: 'payment' | 'setup' | 'subscription'
  payment_intent: string | null
  payment_link: string | null
  payment_method_collection: 'always' | 'if_required'
  payment_method_options: Record<string, unknown>
  payment_method_types: string[]
  payment_status: 'paid' | 'unpaid' | 'no_payment_required'
  phone_number_collection: {
    enabled: boolean
  }
  recovered_from: string | null
  setup_intent: string | null
  shipping_address_collection: null | {
    allowed_countries: string[]
  }
  shipping_cost: null | {
    amount_subtotal: number
    amount_tax: number
    amount_total: number
    shipping_rate: string
  }
  shipping_details: null | {
    address: {
      city: string | null
      country: string | null
      line1: string | null
      line2: string | null
      postal_code: string | null
      state: string | null
    }
    name: string | null
    phone: string | null
  }
  shipping_options: Array<{
    shipping_rate: string
    shipping_amount: number
  }>
  status: 'open' | 'complete' | 'expired'
  submit_type: 'auto' | 'book' | 'donate' | 'pay' | null
  subscription: string | null
  success_url: string
  total_details: {
    amount_discount: number
    amount_shipping: number
    amount_tax: number
  }
  url: string | null
}