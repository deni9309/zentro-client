export type ErrorResponse = {
  message: string[]
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
