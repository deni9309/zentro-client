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
}

export type CreateProductProps = {
  name: string
  description: string
  price: number
  userId: string
}
