import * as z from 'zod'

const passRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#\-_=+:;,./:<>?])[A-Za-z\d@$!%*?&^#\-_=+:;,./:<>?]{8,}$/,
)

export const AuthFormSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(passRegex, {
    message:
      'Include at least 1 uppercase letter, 1 lowercase letter, a number and a special character.',
  }),
})

export type AuthFormData = z.infer<typeof AuthFormSchema>
